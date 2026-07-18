"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import TransactionRow from "@/components/TransactionRow";
import { useApp } from "@/lib/AppContext";

const FILTERS = [
  { key: "semua", label: "Semua" },
  { key: "beli", label: "Beli" },
  { key: "jual", label: "Jual" },
  { key: "token", label: "Token" },
  { key: "fisik", label: "Fisik" },
  { key: "yield", label: "Yield" },
];

function monthLabel(isoString) {
  return new Intl.DateTimeFormat("id-ID", {
    month: "long",
    year: "numeric",
  }).format(new Date(isoString));
}

export default function RiwayatPage() {
  const { transactions } = useApp();
  const [activeFilter, setActiveFilter] = useState("semua");

  const filtered = useMemo(() => {
    if (activeFilter === "semua") return transactions;
    return transactions.filter((t) => t.type === activeFilter);
  }, [transactions, activeFilter]);

  const grouped = useMemo(() => {
    const groups = {};
    for (const trx of filtered) {
      const key = monthLabel(trx.date);
      if (!groups[key]) groups[key] = [];
      groups[key].push(trx);
    }
    return groups;
  }, [filtered]);

  const monthKeys = Object.keys(grouped);

  return (
    <div className="min-h-screen bg-cream pb-16">
      <Header />

      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-ink-2 transition hover:text-gold-deep"
        >
          <ArrowLeft size={15} strokeWidth={2.25} />
          Kembali ke Dashboard
        </Link>

        <h1 className="mt-3 font-serif text-[1.9rem] tracking-tight text-ink sm:text-3xl">
          Riwayat Transaksi
        </h1>

        <div className="mt-5 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setActiveFilter(f.key)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                activeFilter === f.key
                  ? "border-gold bg-gold text-white"
                  : "border-line bg-surface text-ink-2 hover:border-gold hover:text-gold-deep"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-4">
          {monthKeys.length === 0 ? (
            <div className="rounded-2xl border border-line bg-surface p-8 text-center text-sm text-ink-2">
              Tidak ada transaksi untuk filter ini.
            </div>
          ) : (
            monthKeys.map((month) => (
              <div
                key={month}
                className="rounded-2xl border border-line bg-surface p-5 shadow-[0_2px_10px_-4px_rgba(42,31,20,0.06)] sm:p-6"
              >
                <p className="mb-1 label-eyebrow text-ink-2">
                  {month}
                </p>
                <div>
                  {grouped[month].map((trx) => (
                    <TransactionRow key={trx.id} transaction={trx} />
                  ))}
                </div>
              </div>
            ))
          )}

          <button
            type="button"
            onClick={() =>
              window.alert(
                "Unduh laporan PDF/e-materai sedang dikembangkan — di luar cakupan Technical Test ini."
              )
            }
            className="flex items-center justify-center gap-2 rounded-xl border-[1.5px] border-gold bg-surface py-3 text-sm font-semibold text-gold-deep transition hover:bg-cream-2"
          >
            <Download size={16} strokeWidth={2.25} />
            Unduh Laporan (PDF / e-materai)
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
