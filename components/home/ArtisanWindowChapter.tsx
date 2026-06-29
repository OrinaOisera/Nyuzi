import Image from "next/image";
import { LANDING_PAGE } from "@/lib/assets";

const ARTISAN_WORKSPACES = [
  LANDING_PAGE.artisanWindow.workshopLagos,
  LANDING_PAGE.artisanWindow.ankaraGown,
] as const;

const FABRIC_STORIES = [
  {
    name: "Ankara",
    origin: "West Africa",
    text: "Dutch wax print claimed by the continent — every motif a proverb. Amara cuts Ankara to honor Yoruba record prints and the women who taught her to read cloth like language.",
  },
  {
    name: "Shweshwe",
    origin: "South Africa",
    text: "Indigo-dyed cotton adopted into Xhosa ceremony. Zinhle structures Shweshwe for the global stage without surrendering umabo tradition.",
  },
  {
    name: "Kente",
    origin: "Ghana",
    text: "Ashanti royal cloth, once reserved for kings. Fatou weaves gold thread into patterns that still speak of sovereignty, lineage, and celebration.",
  },
] as const;

export function ArtisanWindowChapter() {
  return (
    <section className="border-t border-nyuzi-ink/10 bg-nyuzi-cream">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
        <div className="flex flex-col justify-center px-4 py-16 sm:px-6 lg:sticky lg:top-0 lg:h-screen lg:px-10 lg:py-24">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-nyuzi-muted">
            Chapter II · The Artisan Window
          </p>
          <h2 className="font-[family-name:var(--font-fraunces)] mt-4 text-4xl font-semibold leading-[1.05] text-nyuzi-ink sm:text-5xl">
            Cloth carries culture before it carries a body.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-nyuzi-muted">
            Behind every Nyuzi piece is a local tailor — like{" "}
            <span className="font-semibold text-nyuzi-ink">Amara Okafor</span> in Lagos —
            preserving fabric heritage through contemporary craft.
          </p>

          <div className="mt-12 space-y-10">
            {FABRIC_STORIES.map((fabric) => (
              <article key={fabric.name} className="border-l-2 border-nyuzi-ink/15 pl-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-nyuzi-muted">
                  {fabric.origin}
                </p>
                <h3 className="font-[family-name:var(--font-fraunces)] mt-1 text-2xl font-semibold text-nyuzi-ink">
                  {fabric.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-nyuzi-muted">{fabric.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          {ARTISAN_WORKSPACES.map((block) => (
            <figure key={block.src} className="relative w-full">
              <div className="relative aspect-[3/4] w-full sm:aspect-[4/5] lg:min-h-[85vh] lg:aspect-auto lg:h-[85vh]">
                <Image
                  src={block.src}
                  alt={block.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-nyuzi-ink/80 to-transparent px-6 py-8 text-sm font-medium tracking-wide text-nyuzi-cream">
                {block.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
