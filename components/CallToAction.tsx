import Link from "next/link";

export function CallToAction() {
  return (
    <section className="relative overflow-hidden">
      <div className="textile-stripe" />
      <div className="relative bg-gradient-to-br from-nyuzi-emerald via-emerald-900 to-nyuzi-ink px-4 py-16 sm:px-6 sm:py-20">
        <div className="pointer-events-none absolute inset-0 nyuzi-pattern opacity-20" />
        <div className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-nyuzi-gold/10 blur-3xl" />

        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-nyuzi-gold">
            Your perfect fit awaits
          </p>
          <h2 className="font-display mt-4 text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
            Heritage fashion, tailored uniquely to you
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            Upload your photo, enter your measurements, and order a custom-fit piece from an
            artisan who carries generations of craft in every stitch.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#shop"
              className="inline-flex rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-nyuzi-emerald shadow-xl transition hover:bg-nyuzi-cream"
            >
              Start shopping
            </Link>
            <Link
              href="/login"
              className="inline-flex rounded-full border border-white/30 px-8 py-3.5 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/10"
            >
              Try the demo
            </Link>
          </div>
        </div>
      </div>
      <div className="textile-stripe" />
    </section>
  );
}
