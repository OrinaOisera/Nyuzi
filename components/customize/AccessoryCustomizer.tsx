"use client";

import { OptionGroup } from "@/components/customize/OptionGroup";
import {
  ACCESSORY_KIND_LABELS,
  ACCESSORY_SIZE_LABELS,
  BEAD_COLOR_LABELS,
  BEAD_PATTERN_LABELS,
  BRASS_STYLE_LABELS,
  type AccessoryCustomization,
  type AccessoryKind,
  type AccessoryMaterial,
  type AccessorySize,
  type BeadColor,
  type BeadPattern,
  type BrassStyle,
} from "@/types/customization";

interface AccessoryCustomizerProps {
  value: AccessoryCustomization;
  onChange: (value: AccessoryCustomization) => void;
}

const BEAD_COLOR_SWATCH: Record<BeadColor, string> = {
  coral: "bg-[#e07a5f]",
  gold: "bg-[#d4a017]",
  emerald: "bg-[#2d6a4f]",
  ivory: "bg-[#f4f1de] ring-stone-300",
  onyx: "bg-[#1a1a1a]",
};

export function AccessoryCustomizer({ value, onChange }: AccessoryCustomizerProps) {
  function setMaterial(material: AccessoryMaterial) {
    if (material === "beads") {
      onChange({
        ...value,
        material,
        beadColor: value.beadColor ?? "gold",
        beadPattern: value.beadPattern ?? "woven",
        brassStyle: undefined,
        engraving: undefined,
      });
      return;
    }

    onChange({
      ...value,
      material,
      brassStyle: value.brassStyle ?? "plain_cuff",
      beadColor: undefined,
      beadPattern: undefined,
    });
  }

  return (
    <div className="space-y-8">
      <OptionGroup
        label="Type"
        value={value.kind}
        options={(Object.entries(ACCESSORY_KIND_LABELS) as [AccessoryKind, string][]).map(
          ([val, label]) => ({ value: val, label })
        )}
        onChange={(kind) => onChange({ ...value, kind })}
      />

      <OptionGroup
        label="Size"
        hint={
          value.kind === "chain"
            ? "Chain length — worn at waist or layered."
            : "Inner circumference for a comfortable fit."
        }
        value={value.size}
        options={(Object.entries(ACCESSORY_SIZE_LABELS) as [AccessorySize, string][]).map(
          ([val, label]) => ({
            value: val,
            label: label.split(" · ")[0],
            description: label.split(" · ")[1],
          })
        )}
        onChange={(size) => onChange({ ...value, size })}
        columns={3}
      />

      <OptionGroup
        label="Material"
        value={value.material}
        options={[
          { value: "beads" as const, label: "Beads", description: "Glass beads, hand-strung" },
          { value: "brass" as const, label: "Brass", description: "Hand-forged metalwork" },
        ]}
        onChange={setMaterial}
      />

      {value.material === "beads" && (
        <>
          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-nyuzi-ink">Bead color</legend>
            <div className="flex flex-wrap gap-3">
              {(Object.entries(BEAD_COLOR_LABELS) as [BeadColor, string][]).map(
                ([color, label]) => {
                  const active = value.beadColor === color;
                  return (
                    <button
                      key={color}
                      type="button"
                      onClick={() => onChange({ ...value, beadColor: color })}
                      className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm ring-2 transition ${
                        active
                          ? "bg-amber-50 ring-nyuzi-amber"
                          : "bg-white ring-stone-200 hover:ring-amber-200"
                      }`}
                    >
                      <span
                        className={`h-5 w-5 rounded-full ring-1 ring-inset ring-black/10 ${BEAD_COLOR_SWATCH[color]}`}
                      />
                      {label}
                    </button>
                  );
                }
              )}
            </div>
          </fieldset>

          <OptionGroup
            label="Bead pattern"
            value={value.beadPattern ?? "woven"}
            options={(Object.entries(BEAD_PATTERN_LABELS) as [BeadPattern, string][]).map(
              ([val, label]) => ({ value: val, label })
            )}
            onChange={(beadPattern) => onChange({ ...value, beadPattern })}
            columns={2}
          />
        </>
      )}

      {value.material === "brass" && (
        <>
          <OptionGroup
            label="Brass style"
            hint="Choose how your artisan finishes the piece."
            value={value.brassStyle ?? "plain_cuff"}
            options={(Object.entries(BRASS_STYLE_LABELS) as [BrassStyle, string][]).map(
              ([val, label]) => ({ value: val, label })
            )}
            onChange={(brassStyle) => onChange({ ...value, brassStyle })}
            columns={2}
          />

          <div className="space-y-2">
            <label htmlFor="engraving" className="text-sm font-semibold text-nyuzi-ink">
              Custom engraving <span className="font-normal text-nyuzi-muted">(optional)</span>
            </label>
            <input
              id="engraving"
              type="text"
              maxLength={24}
              placeholder="Name, symbol, or short phrase"
              value={value.engraving ?? ""}
              onChange={(e) => onChange({ ...value, engraving: e.target.value })}
              className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-nyuzi-ink placeholder:text-stone-400"
            />
            <p className="text-xs text-nyuzi-muted">
              Up to 24 characters — Adinkra symbols available on engraved styles.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
