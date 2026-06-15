"use client";

import type { ReactNode } from "react";

interface OptionGroupProps<T extends string> {
  label: string;
  hint?: string;
  value: T;
  options: { value: T; label: string; description?: string }[];
  onChange: (value: T) => void;
  columns?: 2 | 3;
  children?: ReactNode;
}

export function OptionGroup<T extends string>({
  label,
  hint,
  value,
  options,
  onChange,
  columns = 2,
  children,
}: OptionGroupProps<T>) {
  return (
    <fieldset className="space-y-3">
      <div>
        <legend className="text-sm font-semibold text-nyuzi-ink">{label}</legend>
        {hint && <p className="mt-0.5 text-xs text-nyuzi-muted">{hint}</p>}
      </div>
      <div
        className={`grid gap-2 ${columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}
      >
        {options.map((option) => {
          const active = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`rounded-xl px-4 py-3 text-left text-sm transition ring-1 ${
                active
                  ? "bg-amber-50 text-nyuzi-ink ring-nyuzi-amber shadow-sm"
                  : "bg-white text-nyuzi-muted ring-stone-200 hover:ring-amber-200"
              }`}
            >
              <span className="font-semibold">{option.label}</span>
              {option.description && (
                <span className="mt-0.5 block text-xs opacity-80">{option.description}</span>
              )}
            </button>
          );
        })}
      </div>
      {children}
    </fieldset>
  );
}
