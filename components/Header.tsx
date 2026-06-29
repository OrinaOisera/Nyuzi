import Link from "next/link";
import { getSession } from "@/lib/auth";
import { MobileNav } from "@/components/MobileNav";
import { SignOutButton } from "@/components/SignOutButton";

const navLink =
  "rounded-full px-3.5 py-2 text-sm font-medium text-nyuzi-muted transition-all hover:bg-white/80 hover:text-nyuzi-ink hover:shadow-sm";

export async function Header() {
  const session = await getSession();

  return (
    <header className="sticky top-0 z-40 glass-panel">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-nyuzi-amber via-nyuzi-amber-light to-nyuzi-amber-dark text-sm font-bold text-white shadow-md shadow-amber-900/25 transition group-hover:shadow-lg">
            N
            <span className="absolute inset-0 bg-white/20 opacity-0 transition group-hover:opacity-100" />
          </span>
          <div>
            <p className="font-display text-xl font-semibold tracking-tight text-nyuzi-ink transition group-hover:text-nyuzi-amber">
              Nyuzi
            </p>
            <p className="hidden text-[10px] uppercase tracking-[0.15em] text-nyuzi-muted sm:block">
              African fashion, custom fit
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex md:gap-1">
          <Link href="/#shop" className={navLink}>
            Shop
          </Link>
          {session?.role === "buyer" && (
            <Link href="/account/orders" className={navLink}>
              Orders
            </Link>
          )}
          {session?.role === "artisan" && (
            <Link href="/artisan/dashboard" className={`${navLink} hover:text-nyuzi-emerald`}>
              Dashboard
            </Link>
          )}
          {session ? (
            <div className="ml-1 flex items-center gap-2 border-l border-nyuzi-sand/80 pl-2 sm:ml-2 sm:pl-3">
              <span className="hidden max-w-[100px] truncate text-sm text-nyuzi-muted lg:inline">
                {session.fullName}
              </span>
              <SignOutButton />
            </div>
          ) : (
            <Link
              href="/login"
              className="ml-1 inline-flex rounded-full bg-nyuzi-amber px-4 py-2 text-sm font-semibold text-white shadow-md shadow-amber-900/15 transition hover:bg-nyuzi-amber-dark sm:ml-2"
            >
              Sign in
            </Link>
          )}
        </nav>

        <MobileNav session={session} />
      </div>
    </header>
  );
}
