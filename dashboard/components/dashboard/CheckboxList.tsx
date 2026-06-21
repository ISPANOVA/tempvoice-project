"use client";

import { Check } from "lucide-react";

export default function CheckboxList({
  options,
  selected,
  onChange,
  labels,
}: {
  options: readonly string[];
  selected: string[];
  onChange: (values: string[]) => void;
  labels: Record<string, string>;
}) {
  function toggle(value: string) {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {options.map((opt) => {
        const isChecked = selected.includes(opt);
        return (
          <button
            key={opt}
            onClick={() => toggle(opt)}
            className={`flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${
              isChecked
                ? "border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)] text-[var(--color-text-primary)]"
                : "border-[var(--color-border)] bg-[var(--color-surface-raised)] text-[var(--color-text-secondary)]"
            }`}
          >
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                isChecked ? "border-[var(--color-accent)] bg-[var(--color-accent)]" : "border-[var(--color-border)]"
              }`}
            >
              {isChecked && <Check size={11} className="text-white" />}
            </span>
            {labels[opt] || opt}
          </button>
        );
      })}
    </div>
  );
}
