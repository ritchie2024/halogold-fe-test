"use client";

import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { useApp } from "@/lib/AppContext";
import { formatIDR } from "@/lib/format";

export default function NabungPage() {
  const { savingsGoals } = useApp();

  return (
    <div className="min-h-screen bg-cream pb-16">
      <Header />

      <main className="mx-auto max-w-lg px-4 py-8 sm:px-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-ink-2 transition hover:text-gold-deep"
        >
          <ArrowLeft size={15} strokeWidth={2.25} />
          Kembali ke Dashboard
        </Link>

        <h1 className="mt-3 font-serif text-[1.9rem] tracking-tight text-ink sm:text-3xl">
          Target Emas Saya
        </h1>

        <div className="mt-6 flex flex-col gap-4">
          {savingsGoals.map((goal) => {
            const pct = Math.min(
              100,
              Math.round((goal.currentGram / goal.targetGram) * 100)
            );

            if (goal.featured) {
              return (
                <div
                  key={goal.id}
                  className="rounded-2xl border-none bg-gradient-to-br from-[#3A2B18] via-[#5C4320] to-gold-deep p-5 text-cream shadow-[0_18px_36px_-18px_rgba(42,31,20,0.55)] sm:p-6"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gold-soft">
                      {goal.icon} {goal.name}
                    </p>
                    <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-[#F2D896]">
                      Aktif
                    </span>
                  </div>
                  <p className="mt-2 font-serif text-2xl">
                    {goal.currentGram} / {goal.targetGram}{" "}
                    <span className="text-base font-sans">gram</span>
                  </p>
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/20">
                    <div
                      className="h-full rounded-full bg-gold-soft"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-[#E5D6B5]">
                    {pct}% tercapai &middot; autodebet{" "}
                    {formatIDR(goal.autodebetAmount)} {goal.schedule}
                    {goal.estimasi ? ` \u00b7 ${goal.estimasi}` : ""}
                  </p>
                </div>
              );
            }

            return (
              <div
                key={goal.id}
                className="rounded-2xl border border-line bg-white p-5 shadow-[0_2px_10px_-4px_rgba(42,31,20,0.06)] sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-ink-2">
                    {goal.icon} {goal.name}
                  </p>
                  <span className="rounded-full bg-[#E4F0E8] px-2.5 py-1 text-[11px] font-semibold text-positive">
                    Aktif
                  </span>
                </div>
                <p className="mt-2 font-serif text-lg text-ink">
                  {goal.currentGram} / {goal.targetGram} gram
                </p>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-cream-2">
                  <div
                    className="h-full rounded-full bg-gold"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-ink-2">
                  {formatIDR(goal.autodebetAmount)}/bulan &middot;{" "}
                  {goal.schedule}
                </p>
              </div>
            );
          })}

          <button
            type="button"
            onClick={() =>
              window.alert(
                "Fitur pembuatan target baru sedang dikembangkan — di luar cakupan Technical Test ini."
              )
            }
            className="flex flex-col items-center gap-1 rounded-2xl border border-dashed border-gold bg-white/60 p-6 text-center text-gold-deep transition hover:bg-cream-2"
          >
            <Plus size={20} strokeWidth={2} />
            <span className="text-sm font-semibold">Buat target baru</span>
            <span className="text-xs text-ink-2">
              Pernikahan, dana darurat, qurban, atau target bebas
            </span>
          </button>

          <div className="rounded-2xl border border-line bg-cream-2 p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-gold-deep">
              Kenapa menabung rutin?
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">
              Pembelian berkala meratakan harga beli (cost averaging) — Anda
              tidak perlu menebak kapan harga emas turun.
            </p>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
