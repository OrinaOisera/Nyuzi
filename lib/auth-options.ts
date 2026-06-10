import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getDemoUser } from "@/lib/auth-types";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "demo",
      name: "Demo account",
      credentials: {
        userId: { label: "User ID", type: "text" },
      },
      async authorize(credentials) {
        const userId = credentials?.userId;
        if (!userId || typeof userId !== "string") return null;

        const user = getDemoUser(userId);
        if (!user) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.fullName,
          role: user.role,
          artisanId: user.artisanId,
          artisanSlug: user.artisanSlug,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.artisanId = user.artisanId;
        token.artisanSlug = user.artisanSlug;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = token.role ?? "buyer";
        session.user.artisanId = token.artisanId;
        session.user.artisanSlug = token.artisanSlug;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET ?? "nyuzi-dev-secret-change-in-production",
};
