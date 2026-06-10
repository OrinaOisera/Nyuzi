import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <p className="font-display text-7xl font-semibold text-nyuzi-amber/30">404</p>
      <h1 className="font-display mt-4 text-3xl font-semibold text-nyuzi-ink">Page not found</h1>
      <p className="mt-3 text-nyuzi-muted">This page or product doesn&apos;t exist.</p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full bg-nyuzi-amber px-6 py-3 font-semibold text-white shadow-md transition hover:bg-nyuzi-amber-dark"
      >
        Back to shop
      </Link>
    </div>
  );
}
