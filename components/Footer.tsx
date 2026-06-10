import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-nyuzi-sand bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-display text-2xl font-semibold text-nyuzi-ink">Nyuzi</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-nyuzi-muted">
              Connecting global buyers with African artisans through custom-fit fashion and virtual
              try-on.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-nyuzi-muted">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/#shop" className="text-nyuzi-ink/80 transition hover:text-nyuzi-amber">
                  Shop collection
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-nyuzi-ink/80 transition hover:text-nyuzi-amber">
                  Demo sign-in
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-nyuzi-muted">
              Stack
            </p>
            <p className="mt-4 text-sm leading-relaxed text-nyuzi-muted">
              Next.js · Aurora PostgreSQL · Stripe · NextAuth
            </p>
          </div>
        </div>
        <p className="mt-10 border-t border-nyuzi-sand pt-6 text-center text-xs text-nyuzi-muted">
          © {new Date().getFullYear()} Nyuzi — African fashion, custom fit.
        </p>
      </div>
    </footer>
  );
}
