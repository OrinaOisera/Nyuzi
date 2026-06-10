import { getSession } from "@/lib/auth";

const DEMO_BUYER_ID =
  process.env.DEMO_BUYER_ID ?? "b0000000-0000-0000-0000-000000000001";

export async function getBuyerId(): Promise<string> {
  const session = await getSession();
  if (session?.role === "buyer") {
    return session.id;
  }
  return DEMO_BUYER_ID;
}
