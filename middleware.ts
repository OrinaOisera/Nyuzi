import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: ({ token, req }) => {
      const path = req.nextUrl.pathname;

      if (path.startsWith("/artisan/dashboard")) {
        return token?.role === "artisan";
      }

      if (path.startsWith("/account/orders")) {
        return token?.role === "buyer";
      }

      return !!token;
    },
  },
});

export const config = {
  matcher: ["/account/orders", "/artisan/dashboard"],
};
