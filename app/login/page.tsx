import Link from "next/link";
import { LoginForm } from "@/components/LoginForm";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { DEMO_USERS } from "@/lib/auth-types";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-20">
      <div className="overflow-hidden rounded-[1.75rem] bg-white shadow-2xl shadow-stone-900/8 ring-1 ring-stone-200/60 lg:grid lg:grid-cols-[0.85fr_1.15fr]">
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-nyuzi-emerald via-emerald-900 to-nyuzi-ink p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="pointer-events-none absolute inset-0 nyuzi-pattern opacity-10" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-nyuzi-gold/20 blur-3xl" />
          <div className="relative">
            <p className="font-display text-4xl font-semibold">Nyuzi</p>
            <p className="mt-6 text-lg leading-relaxed text-white/85">
              Step into a marketplace where African heritage meets personal fit.
            </p>
          </div>
          <ul className="relative space-y-4">
            {[
              "Browse custom-fit garments",
              "Virtual try-on with your photo",
              "Manage orders as an artisan",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-white/75">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs text-nyuzi-gold">
                  ✦
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-8 sm:p-10 lg:p-12">
          <SectionEyebrow>Welcome back</SectionEyebrow>
          <h1 className="font-display mt-3 text-3xl font-semibold text-nyuzi-ink sm:text-4xl">
            Sign in to Nyuzi
          </h1>
          <p className="mt-2 text-nyuzi-muted">
            Choose a demo account — no password required.
          </p>
          <div className="mt-8">
            <LoginForm users={DEMO_USERS} />
          </div>
          <p className="mt-8 text-center text-sm text-nyuzi-muted">
            <Link href="/" className="font-semibold text-nyuzi-amber hover:underline">
              Continue without signing in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
