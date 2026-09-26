const encoder = new TextEncoder();

async function getKey(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function createSessionToken(): Promise<string> {
  const SECRET = process.env.ADMIN_SECRET!;
  const payload = `admin:${Date.now()}`;
  const key = await getKey(SECRET);
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  const signature = Buffer.from(signatureBuffer).toString("hex");
  return `${Buffer.from(payload).toString("base64")}.${signature}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;

  const SECRET = process.env.ADMIN_SECRET!;
  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return false;

  const payload = Buffer.from(encodedPayload, "base64").toString("utf8");
  const key = await getKey(SECRET);
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  const expectedSignature = Buffer.from(signatureBuffer).toString("hex");

  return signature === expectedSignature;
}