export default function StatCard({ label, value, sub, variant = "default", icon, chart }) {
  if (variant === "gold") {
    return (
      <div className="group relative overflow-hidden rounded-2xl border-none bg-gradient-to-br from-[#3A2B18] via-[#5C4320] to-gold-deep p-5 text-cream shadow-[0_18px_36px_-18px_rgba(42,31,20,0.55)] transition duration-300 hover:shadow-[0_22px_44px_-16px_rgba(42,31,20,0.6)] sm:p-6">
        <span className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5 transition duration-500 group-hover:scale-110" />
        <span className="pointer-events-none absolute -bottom-14 -left-8 h-32 w-32 rounded-full bg-gold-soft/10" />
        <div className="relative flex items-start justify-between">
          <p className="text-xs uppercase tracking-[0.16em] text-gold-soft">
            {label}
          </p>
          {icon ? <span className="text-gold-soft/80">{icon}</span> : null}
        </div>
        <p className="relative mt-2 font-serif text-3xl">{value}</p>
        {sub ? (
          <p className="relative mt-1 text-sm text-[#E5D6B5]">{sub}</p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="group rounded-2xl border border-line bg-white p-5 shadow-[0_2px_10px_-4px_rgba(42,31,20,0.06)] transition duration-300 hover:shadow-[0_10px_24px_-10px_rgba(42,31,20,0.14)] sm:p-6">
      <div className="flex items-start justify-between">
        <p className="text-xs uppercase tracking-[0.16em] text-ink-2">
          {label}
        </p>
        {icon ? <span className="text-gold-deep/70">{icon}</span> : null}
      </div>
      <p className="mt-2 font-serif text-3xl text-ink">{value}</p>
      {sub ? <p className="mt-1 text-sm text-ink-2">{sub}</p> : null}
      {chart ? <div className="mt-3">{chart}</div> : null}
    </div>
  );
}
