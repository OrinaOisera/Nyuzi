interface BadgeProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export function Badge({ children, active, onClick }: BadgeProps) {
  const base =
    "inline-flex shrink-0 items-center rounded-full px-4 py-2 text-sm font-medium transition-all duration-200";
  const styles = active
    ? "bg-nyuzi-amber text-white shadow-sm shadow-amber-900/10"
    : "bg-white/80 text-nyuzi-muted ring-1 ring-stone-200 hover:bg-amber-50 hover:text-nyuzi-amber hover:ring-amber-200";

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={`${base} ${styles} cursor-pointer`}>
        {children}
      </button>
    );
  }

  return <span className={`${base} ${styles}`}>{children}</span>;
}
