"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Landmark } from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import PageHeading from "@/components/PageHeading";
import { useApp } from "@/lib/AppContext";
import { formatGram, formatIDR } from "@/lib/format";

export default function JualEmasPage() {
  const { balanceGram, buybackPrice, buybackSpread, bankAccount, sellGold } =
    useApp();
  const [rawGram, setRawGram] = useState("2");
  const [error, setError] = useState("");
  const [lastTrx, setLastTrx] = useState(null);

  const gram = Number(rawGram.replace(",", ".")) || 0;
  const receiveIdr = useMemo(() => gram * buybackPrice, [gram, buybackPrice]);

  function handleGramChange(e) {
    const val = e.target.value.replace(/[^0-9.,]/g, "");
    setRawGram(val);
    setLastTrx(null);
    if (error) setError("");
  }

  function handleMax() {
    setRawGram(String(balanceGram.toFixed(4)));
    setLastTrx(null);
    setError("");
  }

  function handleConfirm() {
    if (gram <= 0) {
      setError("Masukkan jumlah gram yang ingin dijual.");
      return;
    }
    if (gram > balanceGram) {
      setError("Jumlah melebihi saldo emas Anda.");
      return;
    }

    const trx = sellGold(gram);
    setLastTrx(trx);
    setRawGram("");
  }

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

        <PageHeading eyebrow="Buyback" title="Jual Emas" />

        {lastTrx ? (
          <div className="mt-6 rounded-2xl border border-line bg-surface p-6 text-center shadow-[0_20px_44px_-24px_rgba(42,31,20,0.35)] sm:p-8">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E4F0E8] text-positive">
              <CheckCircle2 size={28} strokeWidth={1.75} />
            </span>
            <p className="mt-4 text-sm font-bold uppercase tracking-wide text-positive">
              Penjualan Berhasil
            </p>
            <p className="mt-3 font-serif text-2xl text-ink">
              {formatIDR(lastTrx.amount)}
            </p>
            <p className="mt-1 text-sm text-ink-2">
              dari {formatGram(lastTrx.gram)} &middot; dana masuk ke{" "}
              {bankAccount.bank} {bankAccount.masked} &lt; 10 menit
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => setLastTrx(null)}
                className="flex-1 btn-secondary py-2.5"
              >
                Jual Lagi
              </button>
              <Link
                href="/dashboard"
                className="flex-1 btn-primary py-2.5"
              >
                Lihat Dashboard
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-6 rounded-2xl border border-line bg-cream-2 p-5 sm:p-6">
              <p className="label-eyebrow text-gold-deep">
                Saldo tersedia
              </p>
              <p className="mt-1 font-serif text-xl text-ink">
                {formatGram(balanceGram)}
              </p>
            </div>

            <div className="mt-4 rounded-2xl border border-line bg-surface p-5 shadow-[0_2px_10px_-4px_rgba(42,31,20,0.06)] sm:p-6">
              <div className="flex items-center justify-between">
                <label htmlFor="gram" className="mb-1.5 block text-sm font-semibold text-ink-2">
                  Jumlah (gram)
                </label>
                <button
                  type="button"
                  onClick={handleMax}
                  className="mb-1.5 text-xs font-semibold text-gold-deep hover:underline"
                >
                  Jual semua
                </button>
              </div>
              <div
                className={`flex items-center justify-center rounded-xl border-[1.5px] bg-cream-2 px-3.5 py-5 text-center transition focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/30 ${
                  error ? "border-negative" : "border-line"
                }`}
              >
                <input
                  id="gram"
                  inputMode="decimal"
                  value={rawGram}
                  onChange={handleGramChange}
                  placeholder="0,0000"
                  className="w-40 bg-transparent text-center font-serif text-hero-figure figure-nums text-ink outline-none placeholder:text-ink-2/40"
                />
                <span className="ml-2 text-lg text-ink-2">gram</span>
              </div>
              {error ? (
                <p className="mt-1.5 text-xs text-negative">{error}</p>
              ) : null}

              <div className="mt-5 rounded-xl border border-dashed border-gold bg-cream-2 px-4 py-5 text-center">
                <p className="label-eyebrow text-gold-deep">
                  Estimasi diterima
                </p>
                <p className="mt-2 font-serif text-hero-figure figure-nums text-ink">
                  {formatIDR(receiveIdr)}
                </p>
                <p className="mt-1 text-xs text-ink-2">
                  Harga buyback {formatIDR(buybackPrice)}/gr &middot; spread{" "}
                  {(buybackSpread * 100).toFixed(1)}%
                </p>
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-xl border border-line bg-cream-2 p-3.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface text-gold-deep">
                  <Landmark size={17} strokeWidth={2} />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-ink">
                    {bankAccount.bank} {bankAccount.masked}
                  </p>
                  <p className="text-xs text-ink-2">
                    a.n. {bankAccount.holder} — rekening terverifikasi
                  </p>
                </div>
                <span className="text-positive">✓</span>
              </div>

              <button
                type="button"
                onClick={handleConfirm}
                className="mt-5 w-full btn-dark"
              >
                Jual Sekarang
              </button>
              <p className="mt-3 text-center text-xs text-ink-2">
                Demi keamanan, pencairan hanya ke rekening atas nama Anda
                sendiri. Estimasi masuk &lt; 10 menit.
              </p>
            </div>
          </>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
