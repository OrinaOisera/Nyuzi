const FABRICS = [
  "Ankara",
  "Kente",
  "Shweshwe",
  "Wax Print",
  "Aso Oke",
  "Bogolan",
  "Adire",
  "Kitenge",
];

export function FabricMarquee() {
  const items = [...FABRICS, ...FABRICS];

  return (
    <div className="overflow-hidden border-y border-nyuzi-sand bg-nyuzi-ink py-3.5">
      <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
        {items.map((fabric, i) => (
          <span
            key={`${fabric}-${i}`}
            className="flex items-center gap-10 text-sm font-semibold uppercase tracking-[0.25em] text-white/90"
          >
            {fabric}
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-nyuzi-gold" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
