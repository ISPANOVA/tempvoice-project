export default function Select({
  value,
  onChange,
  children,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full appearance-none rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-3.5 py-2.5 text-sm text-[var(--color-text-primary)] transition-colors focus:border-[var(--color-accent)] ${className ?? ""}`}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%238d94a6' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
        backgroundRepeat: "no-repeat",
        backgroundPositionX: "calc(100% - 14px)",
        backgroundPositionY: "center",
        paddingInlineEnd: "32px",
      }}
    >
      {children}
    </select>
  );
}
