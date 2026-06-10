interface SectionEyebrowProps {
  children: React.ReactNode;
  tone?: "amber" | "emerald";
}

export function SectionEyebrow({ children, tone = "amber" }: SectionEyebrowProps) {
  const colors =
    tone === "emerald"
      ? "text-nyuzi-emerald"
      : "text-nyuzi-amber";

  return (
    <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${colors}`}>
      {children}
    </p>
  );
}
