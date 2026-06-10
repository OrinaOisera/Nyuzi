import type { UserRole } from "./database";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      role: UserRole;
      artisanId?: string;
      artisanSlug?: string;
    };
  }

  interface User {
    role: UserRole;
    artisanId?: string;
    artisanSlug?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: UserRole;
    artisanId?: string;
    artisanSlug?: string;
  }
}

export {};
