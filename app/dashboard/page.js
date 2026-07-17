"use client";

import Link from "next/link";
import { Coins, TrendingUp, Plus } from "lucide-react";
import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import SparkChart from "@/components/SparkChart";
import TransactionRow from "@/components/TransactionRow";
import { useApp } from "@/lib/AppContext";
import { formatGram, formatIDR } from "@/lib/format";

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
    <div className="min-h-screen bg-cream">
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <p className="text-sm text-ink-2">Selamat datang kembali,</p>
        <h1 className="mt-1 font-serif text-[1.9rem] tracking-tight text-ink sm:text-3xl">
          {user.name}
        </h1>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            label="Saldo Emas Anda"
            value={formatGram(balanceGram)}
            sub={formatIDR(balanceIdr)}
            variant="gold"
            icon={<Coins size={18} strokeWidth={1.75} />}
          />

          <StatCard
            label="Harga Emas Hari Ini"
            value={formatIDR(goldPrice)}
            sub={`per gram \u00b7 ${changePct >= 0 ? "+" : ""}${changePct.toFixed(2)}% / 7 hari`}
            icon={<TrendingUp size={18} strokeWidth={1.75} />}
            chart={<SparkChart data={goldPriceHistory} />}
          />

          <div className="flex flex-col justify-between rounded-2xl border border-line bg-cream-2 p-5 shadow-[0_2px_10px_-4px_rgba(42,31,20,0.06)] sm:p-6">
            <div className="flex items-start justify-between">
              <p className="text-xs uppercase tracking-[0.16em] text-gold-deep">
                Aksi Cepat
              </p>
              <Plus size={18} strokeWidth={1.75} className="text-gold-deep/70" />
            </div>
            <Link
              href="/beli-emas"
              className="mt-3 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-gold to-gold-deep py-3 text-sm font-semibold text-white shadow-[0_10px_20px_-8px_rgba(140,102,38,0.5)] transition hover:brightness-105 active:scale-[0.99]"
            >
              Beli Emas
            </Link>
          </div>
        </div>

        <section className="mt-8 rounded-2xl border border-line bg-white p-5 shadow-[0_2px_10px_-4px_rgba(42,31,20,0.06)] sm:p-6">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-serif text-xl text-ink">
              Transaksi Terakhir
            </h2>
            <span className="text-xs text-ink-2">5 terbaru</span>
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
    </div>
  );
}
