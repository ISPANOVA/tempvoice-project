"use client";

import { useState, useRef, useEffect } from "react";
import { Role } from "@/types";
import { ChevronDown, X } from "lucide-react";

export default function RoleMultiSelect({
  roles,
  selected,
  onChange,
  placeholder,
}: {
  roles: Role[];
  selected: string[];
  onChange: (ids: string[]) => void;
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function toggleRole(id: string) {
    if (selected.includes(id)) {
      onChange(selected.filter((r) => r !== id));
    } else {
      onChange([...selected, id]);
    }
  }

  const selectedRoles = roles.filter((r) => selected.includes(r.id));

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-[42px] w-full flex-wrap items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-3 py-2 text-sm transition-colors focus:border-[var(--color-accent)]"
      >
        {selectedRoles.length === 0 && <span className="text-[var(--color-text-tertiary)]">{placeholder}</span>}
        {selectedRoles.map((role) => (
          <span
            key={role.id}
            className="flex items-center gap-1.5 rounded-md bg-[var(--color-surface)] px-2 py-1 text-xs"
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: role.color }} />
            {role.name}
            <X
              size={12}
              className="text-[var(--color-text-tertiary)] hover:text-[var(--color-danger)]"
              onClick={(e) => {
                e.stopPropagation();
                toggleRole(role.id);
              }}
            />
          </span>
        ))}
        <ChevronDown size={14} className="ml-auto shrink-0 text-[var(--color-text-tertiary)]" />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-1.5 shadow-2xl fade-in-up">
          {roles.length === 0 && (
            <p className="px-3 py-2 text-sm text-[var(--color-text-tertiary)]">No roles found</p>
          )}
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => toggleRole(role.id)}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-[var(--color-surface)] ${
                selected.includes(role.id) ? "text-[var(--color-accent)]" : "text-[var(--color-text-secondary)]"
              }`}
            >
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: role.color }} />
              {role.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
