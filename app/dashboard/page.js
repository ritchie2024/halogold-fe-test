"use client";

import Link from "next/link";
import { Coins, TrendingUp, Target, Package, Gift } from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import PageHeading from "@/components/PageHeading";
import StatCard from "@/components/StatCard";
import SparkChart from "@/components/SparkChart";
import TransactionRow from "@/components/TransactionRow";
import { useApp } from "@/lib/AppContext";
import { formatGram, formatIDR } from "@/lib/format";

const QUICK_ACTIONS = [
  { icon: Target, label: "Target Emas", href: "/nabung" },
  { icon: Coins, label: "hGOLD Token", href: "/segera-hadir?fitur=hGOLD%20Token" },
  { icon: Package, label: "Cetak Fisik", href: "/segera-hadir?fitur=Cetak%20Fisik" },
  { icon: Gift, label: "Kado Emas", href: "/segera-hadir?fitur=Kado%20Emas" },
];

export default function DashboardPage() {
  const { user, goldPrice, goldPriceHistory, balanceGram, transactions } =
    useApp();
  const balanceIdr = balanceGram * goldPrice;
  const recentTransactions = transactions.slice(0, 5);

  const changePct =
    ((goldPriceHistory[goldPriceHistory.length - 1] - goldPriceHistory[0]) /
      goldPriceHistory[0]) *
    100;

  return (
    <div className="min-h-screen bg-cream pb-16">
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <PageHeading eyebrow="Selamat Datang Kembali" title={user.name} />

        <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="relative overflow-hidden rounded-2xl border-none bg-gradient-to-br from-[#3A2B18] via-[#5C4320] to-gold-deep p-5 text-on-gold shadow-[0_18px_36px_-18px_rgba(42,31,20,0.55)] sm:col-span-1 sm:p-6">
            <span className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5" />
            <div className="relative flex items-start justify-between">
              <p className="label-eyebrow text-gold-soft">
                Total Tabungan Emas
              </p>
              <Coins size={18} strokeWidth={1.75} className="text-gold-soft/80" />
            </div>
            <p className="relative mt-2 font-serif text-hero-figure">
              {formatGram(balanceGram)}
            </p>
            <p className="relative mt-1 text-sm text-[#E5D6B5]">
              {formatIDR(balanceIdr)}
            </p>
            <div className="relative mt-4 grid grid-cols-3 gap-2">
              <Link
                href="/beli-emas"
                className="rounded-lg bg-white/15 py-2 text-center text-xs font-semibold text-on-gold ring-1 ring-inset ring-white/25 transition hover:bg-white/25"
              >
                Beli
              </Link>
              <Link
                href="/jual-emas"
                className="rounded-lg bg-white/15 py-2 text-center text-xs font-semibold text-on-gold ring-1 ring-inset ring-white/25 transition hover:bg-white/25"
              >
                Jual
              </Link>
              <Link
                href="/nabung"
                className="rounded-lg bg-cream py-2 text-center text-xs font-semibold text-ink transition hover:brightness-95"
              >
                Nabung
              </Link>
            </div>
          </div>

          <StatCard
            label="Harga Emas Hari Ini"
            value={formatIDR(goldPrice)}
            sub={`per gram \u00b7 ${changePct >= 0 ? "+" : ""}${changePct.toFixed(2)}% / 7 hari`}
            icon={<TrendingUp size={18} strokeWidth={1.75} />}
            chart={<SparkChart data={goldPriceHistory} />}
          />

          <div className="grid grid-cols-2 gap-3">
            {QUICK_ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-line bg-surface px-2 py-4 text-center shadow-[0_2px_10px_-4px_rgba(42,31,20,0.06)] transition hover:border-gold hover:shadow-[0_10px_24px_-10px_rgba(42,31,20,0.14)]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream-2 text-gold-deep">
                    <Icon size={16} strokeWidth={1.9} />
                  </span>
                  <span className="text-[11px] font-medium leading-tight text-ink-2">
                    {action.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <section className="mt-10 rounded-2xl border border-line bg-surface p-5 shadow-[0_2px_10px_-4px_rgba(42,31,20,0.06)] sm:p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-serif text-[1.4rem] font-medium text-ink">
              Aktivitas Terakhir
            </h2>
            <Link
              href="/riwayat"
              className="text-xs font-medium text-gold-deep hover:underline"
            >
              Lihat semua
            </Link>
          </div>

          {recentTransactions.length === 0 ? (
            <p className="py-6 text-center text-sm text-ink-2">
              Belum ada transaksi.
            </p>
          ) : (
            <div>
              {recentTransactions.map((trx) => (
                <TransactionRow key={trx.id} transaction={trx} />
              ))}
            </div>
          )}
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
