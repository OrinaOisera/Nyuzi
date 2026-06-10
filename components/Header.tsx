import Link from "next/link";
import { getSession } from "@/lib/auth";
import { SignOutButton } from "@/components/SignOutButton";

const navLink =
  "rounded-full px-3 py-1.5 text-sm font-medium text-nyuzi-muted transition-colors hover:bg-nyuzi-sand hover:text-nyuzi-ink";

export async function Header() {
  const session = await getSession();

  return (
    <header className="sticky top-0 z-40 border-b border-nyuzi-sand/80 glass-panel">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-nyuzi-amber to-nyuzi-amber-dark text-sm font-bold text-white shadow-md shadow-amber-900/20">
            N
          </span>
          <div>
            <p className="font-display text-xl font-semibold tracking-tight text-nyuzi-ink group-hover:text-nyuzi-amber">
              Nyuzi
            </p>
            <p className="text-[11px] uppercase tracking-wider text-nyuzi-muted">
              African fashion, custom fit
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link href="/#shop" className={navLink}>
            Shop
          </Link>
          {session?.role === "buyer" && (
            <Link href="/account/orders" className={navLink}>
              My orders
            </Link>
          )}
          {session?.role === "artisan" && (
            <Link href="/artisan/dashboard" className={`${navLink} hover:text-nyuzi-emerald`}>
              Dashboard
            </Link>
          )}
          {session ? (
            <div className="ml-1 flex items-center gap-2 border-l border-nyuzi-sand pl-2 sm:ml-2 sm:pl-3">
              <span className="hidden max-w-[120px] truncate text-sm text-nyuzi-muted sm:inline">
                {session.fullName}
              </span>
              <SignOutButton />
            </div>
          ) : (
            <Link
              href="/login"
              className="ml-1 inline-flex rounded-full bg-nyuzi-amber px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-amber-900/10 transition hover:bg-nyuzi-amber-dark sm:ml-2"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
