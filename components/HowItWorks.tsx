import Link from "next/link";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

const steps = [
  {
    number: "01",
    title: "Discover artisans",
    description:
      "Browse handcrafted pieces with fabric history and the stories of the makers behind each cloth.",
  },
  {
    number: "02",
    title: "Try on & measure",
    description:
      "Upload your photo, enter measurements, and preview a garment overlay scaled to your body.",
  },
  {
    number: "03",
    title: "Order custom fit",
    description:
      "Checkout with your size snapshot. Artisans receive exact measurements to tailor your piece.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-b border-nyuzi-sand bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="max-w-2xl">
          <SectionEyebrow tone="emerald">How Nyuzi works</SectionEyebrow>
          <h2 className="font-display mt-3 text-3xl font-semibold text-nyuzi-ink sm:text-4xl">
            From heritage cloth to your perfect fit
          </h2>
        </div>
        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <li
              key={step.number}
              className="relative rounded-[1.25rem] bg-nyuzi-cream p-6 ring-1 ring-stone-200/70 transition hover:ring-amber-200"
            >
              <span className="font-display text-3xl font-semibold text-nyuzi-amber/30">
                {step.number}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-nyuzi-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-nyuzi-muted">{step.description}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/login"
            className="inline-flex rounded-full bg-nyuzi-emerald px-6 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-900/10 transition hover:bg-emerald-900"
          >
            Try the demo
          </Link>
          <Link
            href="#shop"
            className="inline-flex rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-nyuzi-ink transition hover:border-nyuzi-amber hover:bg-amber-50"
          >
            Browse collection
          </Link>
        </div>
      </div>
    </section>
  );
}
