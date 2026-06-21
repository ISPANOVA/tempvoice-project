export default function SettingCard({
  icon,
  title,
  description,
  children,
  badge,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
  badge?: React.ReactNode;
}) {
  return (
    <div className="fade-in-up rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {icon && <span className="text-[var(--color-accent)]">{icon}</span>}
          <h3 className="font-[family-name:var(--font-display)] text-[15px] font-semibold text-[var(--color-text-primary)]">
            {title}
          </h3>
          {badge}
        </div>
      </div>
      <div>{children}</div>
      {description && (
        <p className="mt-3 text-[13px] leading-relaxed text-[var(--color-text-tertiary)]">{description}</p>
      )}
    </div>
  );
}
