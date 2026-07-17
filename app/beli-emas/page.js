"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Coins, QrCode } from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { useApp } from "@/lib/AppContext";
import { formatGram, formatIDR } from "@/lib/format";

const QUICK_AMOUNTS = [10000, 100000, 500000, 1000000, 5000000];
const MIN_AMOUNT = 10000;
const LOCK_SECONDS = 5 * 60;

function useCountdown(active, seconds) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    if (!active) {
      setRemaining(seconds);
      return;
    }
    const id = setInterval(() => {
      setRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [active, seconds]);

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

export default function BeliEmasPage() {
  const { goldPrice, buyGold } = useApp();
  const [step, setStep] = useState("form"); // form -> qris -> success
  const [mode, setMode] = useState("rp"); // rp | gram
  const [rawAmount, setRawAmount] = useState("");
  const [error, setError] = useState("");
  const [lastTrx, setLastTrx] = useState(null);

  const lockTimer = useCountdown(step === "form", LOCK_SECONDS);
  const payTimer = useCountdown(step === "qris", 9 * 60 + 47);

  const numericInput = Number(rawAmount.replace(",", ".")) || 0;
  const amount = mode === "rp" ? numericInput : numericInput * goldPrice;
  const gram = useMemo(
    () => (amount > 0 ? amount / goldPrice : 0),
    [amount, goldPrice]
  );

  function handleAmountChange(e) {
    if (mode === "rp") {
      setRawAmount(e.target.value.replace(/[^0-9]/g, ""));
    } else {
      setRawAmount(e.target.value.replace(/[^0-9.,]/g, ""));
    }
    if (error) setError("");
  }

  function handleQuickPick(value) {
    setMode("rp");
    setRawAmount(String(value));
    setError("");
  }

  function handleSwitchMode(nextMode) {
    if (nextMode === mode) return;
    setMode(nextMode);
    setRawAmount("");
    setError("");
  }

  function goToPayment() {
    if (amount < MIN_AMOUNT) {
      setError(`Nominal minimal ${formatIDR(MIN_AMOUNT)}.`);
      return;
    }
    setStep("qris");
  }

  function confirmPayment() {
    const trx = buyGold(amount, "QRIS");
    setLastTrx(trx);
    setStep("success");
  }

  function resetFlow() {
    setStep("form");
    setRawAmount("");
    setLastTrx(null);
  }

  return (
    <div className="min-h-screen bg-cream pb-16">
      <Header />

      <main className="mx-auto max-w-lg px-4 py-8 sm:px-6">
        <button
          type="button"
          onClick={() => (step === "form" ? window.history.back() : setStep("form"))}
          className="inline-flex items-center gap-1.5 text-sm text-ink-2 transition hover:text-gold-deep"
        >
          <ArrowLeft size={15} strokeWidth={2.25} />
          {step === "form" ? "Kembali ke Dashboard" : "Kembali"}
        </button>

        <h1 className="mt-3 font-serif text-[1.9rem] tracking-tight text-ink sm:text-3xl">
          {step === "qris" ? "Bayar dengan QRIS" : "Beli Emas"}
        </h1>
        {step !== "success" ? (
          <p className="mt-1 text-sm text-ink-2">
            Harga hari ini {formatIDR(goldPrice)} / gram
          </p>
        ) : null}

        {/* STEP 1: FORM */}
        {step === "form" ? (
          <div className="mt-6 rounded-2xl border border-line bg-surface p-5 shadow-[0_2px_10px_-4px_rgba(42,31,20,0.06)] sm:p-6">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleSwitchMode("rp")}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                  mode === "rp"
                    ? "bg-gold text-white"
                    : "border border-line text-ink-2 hover:border-gold hover:text-gold-deep"
                }`}
              >
                Nominal Rupiah
              </button>
              <button
                type="button"
                onClick={() => handleSwitchMode("gram")}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                  mode === "gram"
                    ? "bg-gold text-white"
                    : "border border-line text-ink-2 hover:border-gold hover:text-gold-deep"
                }`}
              >
                Berat Gram
              </button>
            </div>

            <div className="mt-4 rounded-xl border-[1.5px] border-line bg-cream-2 px-4 py-5 text-center focus-within:border-gold">
              <div className="flex items-center justify-center gap-1">
                {mode === "rp" ? (
                  <span className="text-2xl text-ink-2">Rp</span>
                ) : null}
                <input
                  inputMode={mode === "rp" ? "numeric" : "decimal"}
                  value={
                    mode === "rp"
                      ? rawAmount
                        ? Number(rawAmount).toLocaleString("id-ID")
                        : ""
                      : rawAmount
                  }
                  onChange={handleAmountChange}
                  placeholder="0"
                  className="w-40 bg-transparent text-center font-serif text-hero-figure figure-nums text-ink outline-none placeholder:text-ink-2/40"
                />
                {mode === "gram" ? (
                  <span className="text-2xl text-ink-2">gr</span>
                ) : null}
              </div>
              <p className="mt-1 text-sm text-ink-2">
                {mode === "rp"
                  ? `= ${formatGram(gram)}`
                  : `\u2248 ${formatIDR(amount)}`}
              </p>
            </div>
            {error ? (
              <p className="mt-1.5 text-center text-xs text-negative">{error}</p>
            ) : null}

            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {QUICK_AMOUNTS.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleQuickPick(value)}
                  className={`rounded-full border px-3 py-1.5 text-xs transition ${
                    mode === "rp" && Number(rawAmount) === value
                      ? "border-gold bg-gold text-white"
                      : "border-line bg-surface text-ink-2 hover:border-gold hover:text-gold-deep"
                  }`}
                >
                  {value >= 1000000
                    ? `${value / 1000000}jt`
                    : `${value / 1000}rb`}
                </button>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between rounded-xl border border-dashed border-gold bg-cream-2 px-4 py-3 text-sm">
              <span className="text-ink-2">
                Harga dikunci <b className="text-ink">{formatIDR(goldPrice)}/gr</b>
              </span>
              <b className="font-serif text-gold-deep">{lockTimer}</b>
            </div>

            <div className="mt-4 rounded-xl border border-line p-4">
              <div className="flex items-center justify-between border-b border-line pb-3 text-sm">
                <div>
                  <p className="font-medium text-ink">Metode pembayaran</p>
                  <p className="text-xs text-ink-2">QRIS — bebas biaya admin</p>
                </div>
                <QrCode size={20} className="text-gold-deep" strokeWidth={1.75} />
              </div>
              <div className="pt-3 text-[13px]">
                <div className="mb-1.5 flex justify-between">
                  <span className="text-ink-2">Harga emas</span>
                  <span className="text-ink">{formatIDR(amount)}</span>
                </div>
                <div className="mb-1.5 flex justify-between">
                  <span className="text-ink-2">Biaya layanan</span>
                  <span className="text-ink">Rp 0</span>
                </div>
                <div className="flex justify-between font-bold text-ink">
                  <span>Total bayar</span>
                  <span>{formatIDR(amount)}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={goToPayment}
              className="mt-5 w-full btn-primary"
            >
              Konfirmasi &amp; Bayar
            </button>
            <p className="mt-3 text-center text-xs text-ink-2">
              Emas tercatat atas nama Anda &amp; dijamin 1:1 fisik di brankas
            </p>
          </div>
        ) : null}

        {/* STEP 2: QRIS PAYMENT */}
        {step === "qris" ? (
          <div className="mt-6 rounded-2xl border border-line bg-surface p-6 text-center shadow-[0_2px_10px_-4px_rgba(42,31,20,0.06)] sm:p-8">
            <p className="text-sm text-ink-2">
              Pindai dengan aplikasi bank / e-wallet apa pun
            </p>
            <div className="mx-auto mt-4 flex h-44 w-44 items-center justify-center rounded-2xl border-[1.5px] border-dashed border-gold bg-cream-2">
              <QrCode size={72} strokeWidth={1} className="text-gold-deep" />
            </div>

            <p className="mt-5 font-serif text-2xl text-ink">
              {formatIDR(amount)}
            </p>
            <p className="text-sm text-ink-2">
              {formatGram(gram)} &middot; terkunci
            </p>

            <div className="mt-5 flex items-center justify-between rounded-xl border border-dashed border-gold bg-cream-2 px-4 py-3 text-left text-sm">
              <span className="text-ink-2">Selesaikan pembayaran dalam</span>
              <b className="font-serif text-gold-deep">{payTimer}</b>
            </div>

            <div className="mt-4 rounded-xl border border-line bg-cream-2 p-4 text-left">
              <p className="label-eyebrow text-gold-deep">
                Setelah pembayaran diterima
              </p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-ink-2">
                Saldo emas langsung masuk secara real-time, dan Anda menerima
                Sertifikat Kepemilikan Digital bernomor seri yang merujuk ke
                batch emas fisik di brankas.
              </p>
            </div>

            <button
              type="button"
              onClick={confirmPayment}
              className="mt-5 w-full btn-primary"
            >
              Saya Sudah Bayar (Simulasi)
            </button>
          </div>
        ) : null}

        {/* STEP 3: SUCCESS */}
        {step === "success" && lastTrx ? (
          <div className="mt-6 rounded-2xl border border-line bg-surface p-6 text-center shadow-[0_20px_44px_-24px_rgba(42,31,20,0.35)] sm:p-8">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E4F0E8] text-positive">
              <CheckCircle2 size={28} strokeWidth={1.75} />
            </span>
            <p className="mt-4 text-sm font-bold uppercase tracking-wide text-positive">
              Transaksi Berhasil
            </p>
            <p className="mt-3 flex items-center justify-center gap-2 font-serif text-2xl text-ink">
              <Coins size={20} className="text-gold-deep" strokeWidth={1.75} />
              {formatGram(lastTrx.gram)}
            </p>
            <p className="mt-1 text-sm text-ink-2">
              senilai {formatIDR(lastTrx.amount)}
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={resetFlow}
                className="flex-1 btn-secondary py-2.5"
              >
                Beli Lagi
              </button>
              <Link
                href="/dashboard"
                className="flex-1 btn-primary py-2.5"
              >
                Lihat Dashboard
              </Link>
            </div>
          </div>
        ) : null}
      </main>

      <BottomNav />
    </div>
  );
}
