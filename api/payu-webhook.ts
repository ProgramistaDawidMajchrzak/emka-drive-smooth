import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "node:crypto";
import { Resend } from "resend";

export const config = {
  api: { bodyParser: false },
};

const SCHOOL_EMAIL = "biuro@emka.edu.pl";

interface PayuBuyer {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
}

interface PayuOrder {
  orderId: string;
  description: string;
  totalAmount: string;
  status: string;
  buyer?: PayuBuyer;
}

function readRawBody(req: VercelRequest): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

function verifySignature(rawBody: string, header: string | undefined): boolean {
  if (!header) return false;
  const secondKey = process.env.PAYU_MD5_KEY;
  if (!secondKey) return false;

  const parts: Record<string, string> = {};
  for (const kv of header.split(";")) {
    const [k, v] = kv.split("=");
    if (k && v) parts[k.trim()] = v.trim();
  }
  if ((parts.algorithm || "MD5").toUpperCase() !== "MD5" || !parts.signature) return false;

  const expected = crypto.createHash("md5").update(rawBody + secondKey).digest("hex");
  return expected.toLowerCase() === parts.signature.toLowerCase();
}

function esc(value: unknown): string {
  return String(value ?? "").replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string
  ));
}

async function sendOrderEmails(order: PayuOrder) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.EMAIL_FROM || "eMKA <onboarding@resend.dev>";
  const buyer = order.buyer || {};
  const amountPLN = (Number(order.totalAmount) / 100).toFixed(2);
  const fullName = `${esc(buyer.firstName)} ${esc(buyer.lastName)}`.trim();

  await resend.emails.send({
    from,
    to: SCHOOL_EMAIL,
    subject: `Nowa płatność: ${esc(order.description)} – ${fullName}`,
    html: `
      <p>Nowe zamówienie zostało opłacone przez PayU.</p>
      <ul>
        <li><strong>Kurs:</strong> ${esc(order.description)}</li>
        <li><strong>Kwota:</strong> ${esc(amountPLN)} zł</li>
        <li><strong>Imię i nazwisko:</strong> ${fullName}</li>
        <li><strong>Telefon:</strong> ${esc(buyer.phone)}</li>
        <li><strong>Email:</strong> ${esc(buyer.email)}</li>
        <li><strong>Nr zamówienia PayU:</strong> ${esc(order.orderId)}</li>
      </ul>
    `,
  });

  if (buyer.email) {
    await resend.emails.send({
      from,
      to: buyer.email,
      subject: "Potwierdzenie zapisu na kurs – eMKA",
      html: `
        <p>Dzień dobry${buyer.firstName ? ` ${esc(buyer.firstName)}` : ""},</p>
        <p>Dziękujemy za zapis na kurs <strong>${esc(order.description)}</strong> i dokonanie płatności (${esc(amountPLN)} zł).</p>
        <p>Skontaktujemy się wkrótce, aby ustalić szczegóły rozpoczęcia kursu.</p>
        <p>Pozdrawiamy,<br/>eMKA Ośrodek Szkolenia Kierowców</p>
      `,
    });
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const rawBody = await readRawBody(req);

  if (!verifySignature(rawBody, req.headers["openpayu-signature"] as string | undefined)) {
    return res.status(401).json({ error: "Invalid signature" });
  }

  let order: PayuOrder | undefined;
  try {
    order = JSON.parse(rawBody).order;
  } catch {
    return res.status(400).json({ error: "Invalid payload" });
  }

  if (order?.status === "COMPLETED") {
    try {
      await sendOrderEmails(order);
    } catch (err) {
      console.error("payu-webhook: failed to send confirmation emails", err);
    }
  }

  return res.status(200).json({ status: "OK" });
}
