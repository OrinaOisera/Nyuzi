import Link from "next/link";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

const steps = [
  {
    number: "01",
    icon: "✦",
    title: "Discover artisans",
    description:
      "Browse handcrafted pieces with fabric history and the stories of the makers behind each cloth.",
    accent: "from-amber-50 to-orange-50/80",
  },
  {
    number: "02",
    icon: "◈",
    title: "Try on & measure",
    description:
      "Upload your photo, enter measurements, and preview a garment overlay scaled to your body.",
    accent: "from-emerald-50 to-teal-50/80",
  },
  {
    number: "03",
    icon: "❋",
    title: "Order custom fit",
    description:
      "Checkout with your size snapshot. Artisans receive exact measurements to tailor your piece.",
    accent: "from-stone-50 to-nyuzi-sand/80",
  },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20">
      <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-px w-[70%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-nyuzi-sand to-transparent md:block" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center md:text-left">
          <SectionEyebrow tone="emerald">How Nyuzi works</SectionEyebrow>
          <h2 className="font-display mt-4 text-3xl font-semibold text-nyuzi-ink sm:text-4xl lg:text-[2.75rem]">
            From heritage cloth to your perfect fit
          </h2>
        </div>

        <ol className="relative mt-14 grid gap-6 md:grid-cols-3 md:gap-5">
          {steps.map((step, index) => (
            <li
              key={step.number}
              className={`relative rounded-[1.35rem] bg-gradient-to-br ${step.accent} p-7 ring-1 ring-stone-200/60 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-amber-200/80`}
            >
              {index < steps.length - 1 && (
                <span
                  className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xs text-nyuzi-amber shadow md:flex"
                  aria-hidden
                >
                  →
                </span>
              )}
              <div className="flex items-center justify-between">
                <span className="font-display text-4xl font-semibold text-nyuzi-amber/25">
                  {step.number}
                </span>
                <span className="text-2xl text-nyuzi-amber/60" aria-hidden>
                  {step.icon}
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-nyuzi-ink">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-nyuzi-muted">{step.description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-wrap justify-center gap-3 md:justify-start">
          <Link
            href="/login"
            className="inline-flex rounded-full bg-nyuzi-emerald px-7 py-3.5 text-sm font-semibold text-white shadow-md shadow-emerald-900/15 transition hover:bg-emerald-900"
          >
            Try the demo
          </Link>
          <Link
            href="#shop"
            className="inline-flex rounded-full border border-stone-300 bg-white px-7 py-3.5 text-sm font-semibold text-nyuzi-ink transition hover:border-nyuzi-amber hover:bg-amber-50"
          >
            Browse collection
          </Link>
        </div>
      </div>
    </section>
  );
}
