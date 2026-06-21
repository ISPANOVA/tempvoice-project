export default function TextInput({
  value,
  onChange,
  placeholder,
  className,
  type = "text",
  min,
  max,
  onBlurCommit,
}: {
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  type?: "text" | "number";
  min?: number;
  max?: number;
  onBlurCommit?: () => void;
}) {
  return (
    <input
      type={type}
      value={value}
      min={min}
      max={max}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlurCommit}
      placeholder={placeholder}
      className={`w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-3.5 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] transition-colors focus:border-[var(--color-accent)] ${className ?? ""}`}
    />
  );
}
