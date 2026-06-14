interface SectionEyebrowProps {
  children: React.ReactNode;
  tone?: "amber" | "emerald" | "gold" | "light";
}

export function SectionEyebrow({ children, tone = "amber" }: SectionEyebrowProps) {
  const colors = {
    amber: "text-nyuzi-amber",
    emerald: "text-nyuzi-emerald",
    gold: "text-nyuzi-gold",
    light: "text-white/70",
  };

  return (
    <div className="flex items-center gap-3">
      <span className={`h-px w-8 bg-current opacity-40 ${colors[tone]}`} aria-hidden />
      <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${colors[tone]}`}>
        {children}
      </p>
    </div>
  );
}
