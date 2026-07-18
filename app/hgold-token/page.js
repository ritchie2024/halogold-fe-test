"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Landmark,
  Zap,
  Shield,
  Wallet,
  ArrowRightLeft,
} from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import PageHeading from "@/components/PageHeading";
import { useApp } from "@/lib/AppContext";
import { formatGram, formatIDR } from "@/lib/format";

const ICONS = { search: Search, landmark: Landmark, zap: Zap, shield: Shield };

export default function HgoldTokenPage() {
  const {
    goldPrice,
    balanceGram,
    tokenBalance,
    tokenWallet,
    tokenTrustPillars,
    convertToToken,
    convertToBalance,
  } = useApp();

  const [mode, setMode] = useState(null); // null | 'toToken' | 'toSaldo'
  const [rawGram, setRawGram] = useState("");
  const [error, setError] = useState("");

  const gram = Number(rawGram.replace(",", ".")) || 0;
  const tokenValueIdr = tokenBalance * goldPrice;

  function openMode(nextMode) {
    setMode(nextMode);
    setRawGram("");
    setError("");
  }

  function handleConfirm() {
    if (gram <= 0) {
      setError("Masukkan jumlah gram yang valid.");
      return;
    }
    try {
      if (mode === "toToken") {
        convertToToken(gram);
      } else {
        convertToBalance(gram);
      }
      setMode(null);
      setRawGram("");
    } catch (err) {
      setError(err.message);
    }
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

        <PageHeading eyebrow="RWA \u00b7 Fitur Lanjutan" title="hGOLD Token" />

        {/* Kartu saldo token — gold gradient, sama treatment dengan kartu saldo utama */}
        <div className="mt-6 gold-hero-card">
          <div className="relative flex items-start justify-between">
            <p className="label-eyebrow text-gold-soft">Saldo Token</p>
            <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#F2D896]">
              RWA &middot; Syariah
            </span>
          </div>
          <p className="relative mt-2 font-serif text-hero-figure figure-nums">
            {new Intl.NumberFormat("id-ID", { maximumFractionDigits: 3 }).format(tokenBalance)}{" "}
            <span className="text-xl">hGOLD</span>
          </p>
          <p className="relative mt-1 text-sm text-[#E5D6B5]">
            1 hGOLD = 1 gram emas fisik tersegregasi &asymp;{" "}
            {formatIDR(tokenValueIdr)}
          </p>

          <div className="relative mt-4 flex items-center gap-2 rounded-xl bg-white/10 px-3.5 py-2.5 ring-1 ring-inset ring-white/20">
            <Wallet size={15} strokeWidth={2} className="shrink-0 text-gold-soft" />
            <span className="text-xs font-semibold">{tokenWallet.chain}</span>
            <span className="rounded-md bg-white/15 px-2 py-0.5 font-mono text-[11px]">
              {tokenWallet.address}
            </span>
            <span className="ml-auto text-[11px] text-[#E5D6B5]">
              dapat ditarik ke wallet pribadi
            </span>
          </div>
        </div>

        {/* Dua tombol konversi */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => openMode("toToken")}
            className="btn-primary py-3 text-center leading-tight"
          >
            Konversi Saldo
            <br />
            &rarr; Token
          </button>
          <button
            type="button"
            onClick={() => openMode("toSaldo")}
            className="btn-secondary py-3 text-center leading-tight"
          >
            Token
            <br />
            &rarr; Saldo
          </button>
        </div>

        {/* Form konversi inline */}
        {mode ? (
          <div className="mt-4 rounded-2xl border border-line bg-surface p-5 shadow-[0_2px_10px_-4px_rgba(42,31,20,0.06)]">
            <div className="mb-3 flex items-center gap-2">
              <ArrowRightLeft size={15} className="text-gold-deep" strokeWidth={2} />
              <p className="text-sm font-semibold text-ink">
                {mode === "toToken"
                  ? "Konversi Saldo Emas \u2192 hGOLD Token"
                  : "Konversi hGOLD Token \u2192 Saldo Emas"}
              </p>
            </div>
            <p className="mb-3 text-xs text-ink-2">
              Tersedia:{" "}
              {mode === "toToken"
                ? formatGram(balanceGram)
                : `${tokenBalance} hGOLD`}
            </p>
            <div
              className={`flex items-center rounded-xl border-[1.5px] bg-cream-2 px-3.5 py-3 transition focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/30 ${
                error ? "border-negative" : "border-line"
              }`}
            >
              <input
                inputMode="decimal"
                value={rawGram}
                onChange={(e) => {
                  setRawGram(e.target.value.replace(/[^0-9.,]/g, ""));
                  setError("");
                }}
                placeholder="0,0000"
                className="w-full bg-transparent text-ink outline-none placeholder:text-ink-2/50"
              />
              <span className="ml-2 text-ink-2">
                {mode === "toToken" ? "gram" : "hGOLD"}
              </span>
            </div>
            {error ? (
              <p className="mt-1.5 text-xs text-negative">{error}</p>
            ) : null}

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => setMode(null)}
                className="flex-1 btn-secondary py-2.5"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="flex-1 btn-primary py-2.5"
              >
                Konfirmasi
              </button>
            </div>
          </div>
        ) : null}

        {/* Empat pilar kepercayaan */}
        <div className="mt-6 rounded-2xl border border-line bg-surface p-5 shadow-[0_2px_10px_-4px_rgba(42,31,20,0.06)] sm:p-6">
          <p className="label-eyebrow mb-3 text-ink-2">
            Yang Membedakan hGOLD
          </p>
          <div className="flex flex-col divide-y divide-line">
            {tokenTrustPillars.map((pillar) => {
              const Icon = ICONS[pillar.icon] || Shield;
              const content = (
                <>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-chip text-gold-deep">
                    <Icon size={16} strokeWidth={2} />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-ink">
                      {pillar.title}
                    </p>
                    <p className="text-xs text-ink-2">{pillar.desc}</p>
                  </div>
                </>
              );

              if (pillar.icon === "search") {
                return (
                  <Link
                    key={pillar.title}
                    href="/proof-of-reserve"
                    className="flex items-center gap-3 py-3 transition first:pt-0 last:pb-0 hover:opacity-80"
                  >
                    {content}
                    <span className="text-xs font-bold text-gold-deep">&rsaquo;</span>
                  </Link>
                );
              }

              return (
                <div key={pillar.title} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
