export default function StatCard({ label, value, sub, variant = "default", icon, chart }) {
  if (variant === "gold") {
    return (
      <div className="gold-hero-card group transition duration-300 hover:shadow-[0_22px_44px_-16px_rgba(42,31,20,0.6)]">
        <div className="relative flex items-start justify-between">
          <p className="label-eyebrow text-gold-soft">
            {label}
          </p>
          {icon ? <span className="text-gold-soft/80">{icon}</span> : null}
        </div>
        <p className="relative mt-2 font-serif text-hero-figure figure-nums">{value}</p>
        {sub ? (
          <p className="relative mt-1 text-sm text-on-gold-muted">{sub}</p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="group rounded-2xl border border-line bg-surface p-5 shadow-[0_2px_10px_-4px_rgba(42,31,20,0.06)] transition duration-300 hover:shadow-[0_10px_24px_-10px_rgba(42,31,20,0.14)] sm:p-6">
      <div className="flex items-start justify-between">
        <p className="label-eyebrow text-ink-2">
          {label}
        </p>
        {icon ? <span className="text-gold-deep/70">{icon}</span> : null}
      </div>
      <p className="mt-2 font-serif text-hero-figure figure-nums text-ink">{value}</p>
      {sub ? <p className="mt-1 text-sm text-ink-2">{sub}</p> : null}
      {chart ? <div className="mt-3">{chart}</div> : null}
    </div>
  );
}
