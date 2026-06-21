export default function Waveform({ className }: { className?: string }) {
  return (
    <span className={`waveform ${className ?? ""}`} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}
