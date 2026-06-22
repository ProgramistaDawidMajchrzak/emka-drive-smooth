export async function getPayuAccessToken(): Promise<string> {
  const apiUrl = process.env.PAYU_API_URL;
  const clientId = process.env.PAYU_CLIENT_ID;
  const clientSecret = process.env.PAYU_CLIENT_SECRET;
  if (!apiUrl || !clientId || !clientSecret) {
    throw new Error("Missing PayU environment variables");
  }

  const res = await fetch(`${apiUrl}/pl/standard/user/oauth/authorize`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  if (!res.ok) {
    throw new Error(`PayU OAuth failed: ${res.status} ${await res.text()}`);
  }

  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}
