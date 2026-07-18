"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import PageHeading from "@/components/PageHeading";
import { useApp } from "@/lib/AppContext";
import { formatGram, formatIDR } from "@/lib/format";

export default function EmasBerimbalPage() {
  const {
    balanceGram,
    yieldActivePosition,
    yieldTenorOptions,
    placeYield,
  } = useApp();

  const [tenorMonths, setTenorMonths] = useState(6);
  const [rawGram, setRawGram] = useState("1");
  const [error, setError] = useState("");
  const [lastTrx, setLastTrx] = useState(null);

  const tenor = yieldTenorOptions.find((t) => t.months === tenorMonths);
  const gram = Number(rawGram.replace(",", ".")) || 0;
  const projectedGram = useMemo(
    () => (gram * tenor.periodRatePct) / 100,
    [gram, tenor]
  );

  function handleConfirm() {
    if (gram <= 0) {
      setError("Masukkan jumlah gram yang ingin ditempatkan.");
      return;
    }
    if (gram > balanceGram) {
      setError("Jumlah melebihi saldo emas tersedia.");
      return;
    }
    const trx = placeYield(gram, tenor);
    setLastTrx(trx);
  }

  function resetFlow() {
    setLastTrx(null);
    setRawGram("1");
    setError("");
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

        <PageHeading eyebrow="Pertumbuhan \u00b7 Fitur Berisiko" title="Emas Berimbal" />

        {lastTrx ? (
          <div className="mt-6 rounded-2xl border border-line bg-surface p-6 text-center shadow-[0_20px_44px_-24px_rgba(42,31,20,0.35)] sm:p-8">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E4F0E8] text-positive">
              <CheckCircle2 size={28} strokeWidth={1.75} />
            </span>
            <p className="mt-4 text-sm font-bold uppercase tracking-wide text-positive">
              Penempatan Berhasil
            </p>
            <p className="mt-3 font-serif text-2xl text-ink">
              {formatGram(lastTrx.gram)}
            </p>
            <p className="mt-1 text-sm text-ink-2">
              Terkunci {tenorMonths} bulan &middot; proyeksi imbal{" "}
              {formatGram(projectedGram)}
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <button type="button" onClick={resetFlow} className="flex-1 btn-secondary py-2.5">
                Tempatkan Lagi
              </button>
              <Link href="/dashboard" className="flex-1 btn-primary py-2.5">
                Lihat Dashboard
              </Link>
            </div>
          </div>
        ) : (
          <>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">
              Emas Anda disalurkan sebagai modal kerja produksi perhiasan
              Hartadinata dengan akad <b className="text-ink">mudharabah</b>{" "}
              &mdash; imbal hasil dibayar dalam gram.
            </p>

            <div className="mt-5 gold-hero-card">
              <p className="label-eyebrow text-gold-soft">Sedang Ditempatkan</p>
              <p className="relative mt-2 font-serif text-hero-figure figure-nums">
                {formatGram(yieldActivePosition.gram).replace(" gr", "")}{" "}
                <span className="text-xl">gram</span>
              </p>
              <p className="relative mt-1 text-sm text-[#E5D6B5]">
                Tenor {yieldActivePosition.tenorMonths} bulan &middot; jatuh
                tempo {yieldActivePosition.jatuhTempo}
              </p>
              <div className="relative mt-3 flex items-center justify-between rounded-lg bg-white/10 px-3.5 py-2.5 ring-1 ring-inset ring-white/15">
                <span className="text-xs text-[#E5D6B5]">
                  Proyeksi imbal (nisbah 60:40)
                </span>
                <span className="text-sm font-bold text-[#F2D896]">
                  +{formatGram(yieldActivePosition.projectedGram)} (&asymp;{" "}
                  {yieldActivePosition.projectedPctPerYear}%/thn)
                </span>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-line bg-surface p-5 shadow-[0_2px_10px_-4px_rgba(42,31,20,0.06)] sm:p-6">
              <p className="label-eyebrow mb-3 text-ink-2">Pilihan Tenor</p>
              <div className="flex gap-2">
                {yieldTenorOptions.map((t) => (
                  <button
                    key={t.months}
                    type="button"
                    onClick={() => setTenorMonths(t.months)}
                    className={`flex-1 rounded-full border px-3 py-2 text-sm font-semibold transition ${
                      tenorMonths === t.months
                        ? "border-gold bg-gold text-white"
                        : "border-line bg-surface text-ink-2 hover:border-gold hover:text-gold-deep"
                    }`}
                  >
                    {t.months} bulan
                  </button>
                ))}
              </div>

              <div className="mt-4 rounded-xl border border-line bg-cream-2 p-4">
                <p className="text-sm font-bold text-ink">
                  Proyeksi nisbah {tenorMonths} bulan
                </p>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-xs text-ink-2">
                    Bukan bunga tetap &mdash; hasil aktual mengikuti kinerja
                    usaha
                  </span>
                  <span className="text-sm font-bold text-gold-deep">
                    &asymp; {tenor.periodRatePct}%
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-1.5 block text-sm font-semibold text-ink-2">
                  Jumlah ditempatkan
                </label>
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
                  <span className="ml-2 text-ink-2">gram</span>
                </div>
                {error ? (
                  <p className="mt-1.5 text-xs text-negative">{error}</p>
                ) : (
                  <p className="mt-1.5 text-xs text-ink-2">
                    Saldo tersedia: {formatGram(balanceGram)} &middot;
                    proyeksi imbal &asymp; {formatGram(projectedGram)}
                  </p>
                )}
              </div>

              <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-negative/40 bg-[#F6E2DC] px-4 py-3.5">
                <AlertTriangle
                  size={17}
                  strokeWidth={2}
                  className="mt-0.5 shrink-0 text-negative"
                />
                <p className="text-xs leading-relaxed text-[#7A3323]">
                  <b>Pahami risikonya:</b> imbal hasil tidak dijamin dan emas
                  terkunci selama tenor. Berbeda dari tabungan emas biasa
                  yang bisa dijual kapan saja. Baca akad &amp; risiko sebelum
                  lanjut.
                </p>
              </div>

              <button
                type="button"
                onClick={handleConfirm}
                className="mt-4 w-full btn-primary"
              >
                Tempatkan Emas
              </button>
            </div>
          </>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
