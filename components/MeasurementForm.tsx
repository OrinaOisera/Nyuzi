"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { MeasurementInput } from "@/types/database";

interface MeasurementFormProps {
  initial: MeasurementInput;
  onChange: (measurements: MeasurementInput) => void;
  onSave?: () => Promise<void>;
  saveLabel?: string;
}

const fields: { key: keyof MeasurementInput; label: string; min: number; max: number }[] = [
  { key: "bust_cm", label: "Bust (cm)", min: 60, max: 140 },
  { key: "waist_cm", label: "Waist (cm)", min: 50, max: 120 },
  { key: "hips_cm", label: "Hips (cm)", min: 60, max: 150 },
  { key: "height_cm", label: "Height (cm)", min: 140, max: 210 },
];

const inputClass =
  "w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-nyuzi-ink transition placeholder:text-stone-400 focus:border-nyuzi-amber focus:ring-2 focus:ring-amber-100";

export function MeasurementForm({
  initial,
  onChange,
  onSave,
  saveLabel = "Save measurements",
}: MeasurementFormProps) {
  const [values, setValues] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function updateField(key: keyof MeasurementInput, raw: string) {
    const next = { ...values, [key]: Number(raw) || 0 };
    setValues(next);
    onChange(next);
    setSaved(false);
  }

  async function handleSave() {
    if (!onSave) return;
    setSaving(true);
    await onSave();
    setSaving(false);
    setSaved(true);
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {fields.map(({ key, label, min, max }) => (
          <label key={key} className="space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-nyuzi-muted">
              {label}
            </span>
            <input
              type="number"
              min={min}
              max={max}
              step="0.5"
              value={values[key]}
              onChange={(e) => updateField(key, e.target.value)}
              className={inputClass}
            />
          </label>
        ))}
      </div>
      {onSave && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={saving}
          onClick={handleSave}
          className="w-full"
        >
          {saving ? "Saving…" : saved ? "Saved ✓" : saveLabel}
        </Button>
      )}
    </div>
  );
}
