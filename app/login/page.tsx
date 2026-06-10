import Link from "next/link";
import { LoginForm } from "@/components/LoginForm";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { DEMO_USERS } from "@/lib/auth-types";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="overflow-hidden rounded-[1.5rem] bg-white shadow-xl shadow-stone-900/5 ring-1 ring-stone-200/80 lg:grid lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative hidden bg-gradient-to-br from-nyuzi-emerald via-emerald-900 to-nyuzi-ink p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="font-display text-3xl font-semibold">Nyuzi</p>
            <p className="mt-6 text-lg leading-relaxed text-white/85">
              Step into a marketplace where African heritage meets personal fit — for buyers and
              artisans alike.
            </p>
          </div>
          <ul className="space-y-3 text-sm text-white/75">
            <li>· Browse custom-fit garments</li>
            <li>· Virtual try-on with your photo</li>
            <li>· Manage orders as an artisan</li>
          </ul>
        </div>

        <div className="p-8 sm:p-10">
          <SectionEyebrow>Welcome back</SectionEyebrow>
          <h1 className="font-display mt-2 text-3xl font-semibold text-nyuzi-ink">
            Sign in to Nyuzi
          </h1>
          <p className="mt-2 text-nyuzi-muted">
            Choose a demo account — no password required for the hackathon demo.
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
