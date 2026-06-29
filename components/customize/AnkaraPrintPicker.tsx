"use client";

import {
  ANKARA_PRINTS,
  type AnkaraPrintId,
} from "@/types/customization";

interface AnkaraPrintPickerProps {
  value: AnkaraPrintId;
  onChange: (value: AnkaraPrintId) => void;
}

export function AnkaraPrintPicker({ value, onChange }: AnkaraPrintPickerProps) {
  return (
    <fieldset className="space-y-3">
      <div>
        <legend className="text-sm font-semibold text-nyuzi-ink">Ankara print</legend>
        <p className="mt-0.5 text-xs text-nyuzi-muted">
          African wax print — each pattern is cut to align at the seams.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {ANKARA_PRINTS.map((print) => {
          const active = value === print.id;
          return (
            <button
              key={print.id}
              type="button"
              onClick={() => onChange(print.id)}
              className={`overflow-hidden rounded-xl text-left ring-2 transition ${
                active ? "ring-nyuzi-amber shadow-md" : "ring-transparent hover:ring-amber-200"
              }`}
            >
              <div className={`h-16 w-full ${print.swatchClass}`} />
              <div
                className={`px-3 py-2 text-xs font-semibold ${
                  active ? "bg-amber-50 text-nyuzi-ink" : "bg-white text-nyuzi-muted"
                }`}
              >
                {print.name}
              </div>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
