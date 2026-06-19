import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getPayuAccessToken } from "../lib/payu-auth";
import { PAYU_COURSES } from "../lib/payu-courses";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+0-9 ]{7,15}$/;

function buyerLanguage(lang: unknown): string {
  return lang === "en" ? "en" : "pl";
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { courseId, firstName, lastName, phone, email, language } = req.body ?? {};

  const course = typeof courseId === "string" ? PAYU_COURSES[courseId] : undefined;
  if (!course) {
    return res.status(400).json({ error: "Unknown course" });
  }
  if (typeof firstName !== "string" || !firstName.trim() || typeof lastName !== "string" || !lastName.trim()) {
    return res.status(400).json({ error: "Missing buyer name" });
  }
  if (typeof phone !== "string" || !PHONE_RE.test(phone.trim())) {
    return res.status(400).json({ error: "Invalid phone" });
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return res.status(400).json({ error: "Invalid email" });
  }

  try {
    const accessToken = await getPayuAccessToken();

    const proto = (req.headers["x-forwarded-proto"] as string) || "https";
    const origin = `${proto}://${req.headers.host}`;
    const customerIp =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.socket.remoteAddress || "127.0.0.1";
    const amountGrosze = String(course.amount * 100);

    const orderPayload = {
      customerIp,
      merchantPosId: process.env.PAYU_POS_ID,
      description: course.name,
      currencyCode: "PLN",
      totalAmount: amountGrosze,
      buyer: {
        email: email.trim(),
        phone: phone.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        language: buyerLanguage(language),
      },
      products: [{ name: course.name, unitPrice: amountGrosze, quantity: "1" }],
      continueUrl: `${origin}/platnosc/dziekujemy`,
      notifyUrl: process.env.VERCEL_AUTOMATION_BYPASS_SECRET
        ? `${origin}/api/payu-webhook?x-vercel-protection-bypass=${process.env.VERCEL_AUTOMATION_BYPASS_SECRET}`
        : `${origin}/api/payu-webhook`,
    };

    const payuRes = await fetch(`${process.env.PAYU_API_URL}/api/v2_1/orders`, {
      method: "POST",
      redirect: "manual",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(orderPayload),
    });

    const redirectUri = payuRes.headers.get("location");
    if (!redirectUri) {
      const body = await payuRes.text();
      throw new Error(`PayU order create failed: ${payuRes.status} ${body}`);
    }

    return res.status(200).json({ redirectUri });
  } catch (err) {
    console.error(err);
    return res.status(502).json({ error: "PayU order creation failed" });
  }
}
