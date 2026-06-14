import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto bg-nyuzi-ink text-white">
      <div className="textile-stripe opacity-80" />
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <p className="font-display text-3xl font-semibold">Nyuzi</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              Connecting global buyers with African artisans through custom-fit fashion, heritage
              storytelling, and virtual try-on.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-nyuzi-gold">
              Explore
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link href="/#shop" className="text-white/70 transition hover:text-white">
                  Shop collection
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-white/70 transition hover:text-white">
                  Demo sign-in
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-nyuzi-gold">
              Craft
            </p>
            <ul className="mt-5 space-y-2 text-sm text-white/50">
              <li>Ankara · Kente · Shweshwe</li>
              <li>Custom measurements</li>
              <li>Artisan-made to order</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Nyuzi — African fashion, custom fit.
          </p>
          <p className="text-xs text-white/30">Next.js · PostgreSQL · Stripe · NextAuth</p>
        </div>
      </div>
    </footer>
  );
}
