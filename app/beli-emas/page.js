"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Coins } from "lucide-react";
import Header from "@/components/Header";
import { useApp } from "@/lib/AppContext";
import { formatGram, formatIDR } from "@/lib/format";

const QUICK_AMOUNTS = [100000, 500000, 1000000, 2000000];
const MIN_AMOUNT = 10000;

export default function BeliEmasPage() {
  const { goldPrice, buyGold } = useApp();
  const [rawAmount, setRawAmount] = useState("");
  const [error, setError] = useState("");
  const [lastTrx, setLastTrx] = useState(null);

  const amount = Number(rawAmount) || 0;
  const gram = useMemo(
    () => (amount > 0 ? amount / goldPrice : 0),
    [amount, goldPrice]
  );

  function handleAmountChange(e) {
    const digitsOnly = e.target.value.replace(/[^0-9]/g, "");
    setRawAmount(digitsOnly);
    setLastTrx(null);
    if (error) setError("");
  }

  function handleQuickPick(value) {
    setRawAmount(String(value));
    setLastTrx(null);
    setError("");
  }

  function handleConfirm() {
    if (amount < MIN_AMOUNT) {
      setError(`Nominal minimal ${formatIDR(MIN_AMOUNT)}.`);
      return;
    }

    const trx = buyGold(amount);
    setLastTrx(trx);
    setRawAmount("");
  }

  return (
    <div className="min-h-screen bg-cream">
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
          Beli Emas
        </h1>
        <p className="mt-1 text-sm text-ink-2">
          Harga hari ini {formatIDR(goldPrice)} / gram
        </p>

        {lastTrx ? (
          <div className="mt-6 rounded-2xl border border-line bg-white p-6 text-center shadow-[0_20px_44px_-24px_rgba(42,31,20,0.35)] sm:p-8">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E4F0E8] text-positive">
              <CheckCircle2 size={28} strokeWidth={1.75} />
            </span>
            <p className="mt-4 text-sm font-bold uppercase tracking-wide text-positive">
              Transaksi Berhasil
            </p>
            <p className="mt-3 font-serif text-2xl text-ink">
              {formatGram(lastTrx.gram)}
            </p>
            <p className="mt-1 text-sm text-ink-2">
              senilai {formatIDR(lastTrx.amount)}
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => setLastTrx(null)}
                className="flex-1 rounded-xl border-[1.5px] border-gold py-2.5 text-sm font-semibold text-gold-deep transition hover:bg-cream-2"
              >
                Beli Lagi
              </button>
              <Link
                href="/dashboard"
                className="flex-1 rounded-xl bg-gradient-to-br from-gold to-gold-deep py-2.5 text-center text-sm font-semibold text-white shadow-[0_10px_20px_-8px_rgba(140,102,38,0.5)] transition hover:brightness-105"
              >
                Lihat Dashboard
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-line bg-white p-5 shadow-[0_2px_10px_-4px_rgba(42,31,20,0.06)] sm:p-6">
            <label htmlFor="amount" className="mb-1.5 block text-sm font-semibold text-ink-2">
              Nominal (Rupiah)
            </label>
            <div
              className={`flex items-center rounded-xl border-[1.5px] bg-white px-3.5 py-3 transition focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/30 ${
                error ? "border-negative" : "border-line"
              }`}
            >
              <span className="mr-2 text-ink-2">Rp</span>
              <input
                id="amount"
                inputMode="numeric"
                value={rawAmount ? Number(rawAmount).toLocaleString("id-ID") : ""}
                onChange={handleAmountChange}
                placeholder="0"
                className="w-full bg-transparent text-ink outline-none placeholder:text-ink-2/50"
              />
            </div>
            {error ? (
              <p className="mt-1.5 text-xs text-negative">{error}</p>
            ) : null}

            <div className="mt-3 flex flex-wrap gap-2">
              {QUICK_AMOUNTS.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleQuickPick(value)}
                  className="rounded-full border border-line bg-white px-3 py-1.5 text-xs text-ink-2 transition hover:border-gold hover:text-gold-deep"
                >
                  {formatIDR(value)}
                </button>
              ))}
            </div>

            {/* Estimasi — amount-display besar, gaya blueprint, dengan dashed lockbar */}
            <div className="mt-5 rounded-xl border border-dashed border-gold bg-cream-2 px-4 py-5 text-center">
              <p className="text-xs uppercase tracking-[0.14em] text-gold-deep">
                Estimasi emas didapat
              </p>
              <p className="mt-2 flex items-center justify-center gap-2 font-serif text-3xl text-ink">
                <Coins size={22} strokeWidth={1.75} className="text-gold-deep" />
                {formatGram(gram)}
              </p>
            </div>

            <button
              type="button"
              onClick={handleConfirm}
              className="mt-5 w-full rounded-xl bg-gradient-to-br from-gold to-gold-deep py-3 text-sm font-semibold text-white shadow-[0_10px_20px_-8px_rgba(140,102,38,0.5)] transition hover:brightness-105 active:scale-[0.99]"
            >
              Konfirmasi
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
