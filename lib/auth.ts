import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import type { SessionUser } from "@/lib/auth-types";

export type { SessionUser } from "@/lib/auth-types";
export { DEMO_USERS } from "@/lib/auth-types";

export async function getSession(): Promise<SessionUser | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  return {
    id: session.user.id,
    email: session.user.email ?? "",
    fullName: session.user.name ?? "",
    role: session.user.role,
    artisanId: session.user.artisanId,
    artisanSlug: session.user.artisanSlug,
  };
}
