import type { UserRole } from "@/types/database";

export interface SessionUser {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  artisanId?: string;
  artisanSlug?: string;
}

export const DEMO_USERS: SessionUser[] = [
  {
    id: "b0000000-0000-0000-0000-000000000001",
    email: "demo.buyer@nyuzi.app",
    fullName: "Demo Buyer",
    role: "buyer",
  },
  {
    id: "11111111-1111-1111-1111-111111111111",
    email: "amara@nyuzi.app",
    fullName: "Amara Okafor",
    role: "artisan",
    artisanId: "a1111111-1111-1111-1111-111111111111",
    artisanSlug: "amara-okafor",
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    email: "zinhle@nyuzi.app",
    fullName: "Zinhle Mthembu",
    role: "artisan",
    artisanId: "a2222222-2222-2222-2222-222222222222",
    artisanSlug: "zinhle-mthembu",
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    email: "fatou@nyuzi.app",
    fullName: "Fatou Diallo",
    role: "artisan",
    artisanId: "a3333333-3333-3333-3333-333333333333",
    artisanSlug: "fatou-diallo",
  },
];

export function getDemoUser(userId: string): SessionUser | undefined {
  return DEMO_USERS.find((u) => u.id === userId);
}
