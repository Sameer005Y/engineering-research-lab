import { cookies } from "next/headers";
import { verifySessionToken } from "./auth";

export async function requireAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  return verifySessionToken(token);
}