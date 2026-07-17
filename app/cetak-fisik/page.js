"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck, Truck, Store } from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import PageHeading from "@/components/PageHeading";
import { useApp } from "@/lib/AppContext";
import { formatGram, formatIDR } from "@/lib/format";

export default function CetakFisikPage() {
  const {
    balanceGram,
    printDenominations,
    printProductName,
    shippingMethods,
    printFisik,
  } = useApp();

  const [selectedGram, setSelectedGram] = useState(5);
  const [methodId, setMethodId] = useState("kurir");
  const [error, setError] = useState("");
  const [lastTrx, setLastTrx] = useState(null);

  const denom = printDenominations.find((d) => d.gram === selectedGram);
  const method = shippingMethods.find((m) => m.id === methodId);

  const totalCost = useMemo(
    () => (denom ? denom.mintingFee + (method?.cost || 0) : 0),
    [denom, method]
  );

  function handleConfirm() {
    if (selectedGram > balanceGram) {
      setError("Saldo emas tidak mencukupi untuk denominasi ini.");
      return;
    }
    const trx = printFisik(selectedGram, denom.mintingFee, method);
    setLastTrx(trx);
  }

  function resetFlow() {
    setLastTrx(null);
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

        <PageHeading eyebrow="Jembatan Digital ke Fisik" title="Cetak & Tarik Fisik" />

        {lastTrx ? (
          <div className="mt-6 rounded-2xl border border-line bg-surface p-6 text-center shadow-[0_20px_44px_-24px_rgba(42,31,20,0.35)] sm:p-8">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E4F0E8] text-positive">
              <CheckCircle2 size={28} strokeWidth={1.75} />
            </span>
            <p className="mt-4 text-sm font-bold uppercase tracking-wide text-positive">
              Pesanan Cetak Berhasil Dibuat
            </p>
            <p className="mt-3 font-serif text-2xl text-ink">
              Kepingan {formatGram(lastTrx.gram)}
            </p>
            <p className="mt-1 text-sm text-ink-2">
              Total biaya {formatIDR(lastTrx.amount)} &middot; {method?.name}
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={resetFlow}
                className="flex-1 btn-secondary py-2.5"
              >
                Cetak Lagi
              </button>
              <Link href="/dashboard" className="flex-1 btn-primary py-2.5">
                Lihat Dashboard
              </Link>
            </div>
          </div>
        ) : (
          <>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">
              Tukarkan saldo digital menjadi kepingan emas Hartadinata 24K
              (99,99%), diantar terasuransi atau diambil di gerai.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {printDenominations.map((d) => (
                <button
                  key={d.gram}
                  type="button"
                  onClick={() => {
                    setSelectedGram(d.gram);
                    setError("");
                  }}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    selectedGram === d.gram
                      ? "border-gold bg-gold text-white"
                      : "border-line bg-surface text-ink-2 hover:border-gold hover:text-gold-deep"
                  }`}
                >
                  {d.gram} gr
                </button>
              ))}
            </div>

            {/* Visual kepingan — momen paling emosional di alur ini, sesuai catatan blueprint */}
            <div className="mt-5 flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 shadow-[0_2px_10px_-4px_rgba(42,31,20,0.06)]">
              <div
                className="flex h-20 w-16 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-[#5C4013] shadow-[0_10px_20px_-8px_rgba(122,85,24,0.5)]"
                style={{
                  background:
                    "linear-gradient(155deg, #F3D896 0%, #D9A94A 40%, #B3801F 75%, #8C6626 100%)",
                }}
              >
                {selectedGram} gr
              </div>
              <div>
                <p className="text-[15px] font-bold text-ink">
                  Kepingan {selectedGram} gram &mdash; {printProductName}
                </p>
                <p className="mt-1 text-xs text-ink-2">
                  24 Karat &middot; 99,99% &middot; sertifikat fisik + NFC tag
                  antipemalsuan
                </p>
                <div className="mt-2 space-y-0.5 text-xs">
                  <div className="flex justify-between gap-4">
                    <span className="text-ink-2">Potong saldo</span>
                    <span className="figure-nums font-semibold text-ink">
                      {formatGram(selectedGram)}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-ink-2">Biaya cetak</span>
                    <span className="figure-nums font-semibold text-ink">
                      {formatIDR(denom.mintingFee)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {error ? (
              <p className="mt-2 text-center text-xs text-negative">{error}</p>
            ) : null}

            <div className="mt-5 rounded-2xl border border-line bg-surface p-5 shadow-[0_2px_10px_-4px_rgba(42,31,20,0.06)]">
              <p className="label-eyebrow mb-3 text-ink-2">
                Metode Penerimaan
              </p>
              <div className="flex flex-col divide-y divide-line">
                {shippingMethods.map((m) => {
                  const Icon = m.id === "kurir" ? Truck : Store;
                  const active = methodId === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMethodId(m.id)}
                      className={`flex items-center gap-3 py-3 text-left transition first:pt-0 last:pb-0 ${
                        active ? "" : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                          active ? "bg-chip text-gold-deep" : "bg-cream-2 text-ink-2"
                        }`}
                      >
                        <Icon size={17} strokeWidth={2} />
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-ink">
                          {m.name}
                        </p>
                        <p className="text-xs text-ink-2">{m.detail}</p>
                      </div>
                      <span
                        className={`text-sm font-bold ${
                          m.cost === 0 ? "text-positive" : "text-ink"
                        }`}
                      >
                        {m.cost === 0 ? "Gratis" : formatIDR(m.cost)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 flex items-start gap-2 rounded-xl border border-dashed border-gold bg-cream-2 px-4 py-3 text-xs text-ink-2">
              <ShieldCheck size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-gold-deep" />
              <span>
                Setiap keping dilengkapi NFC tag antipemalsuan yang bisa
                dipindai untuk verifikasi keaslian kapan saja.
              </span>
            </div>

            <div className="mt-5 flex items-center justify-between rounded-xl bg-cream-2 px-4 py-3 text-sm">
              <span className="font-semibold text-ink">Total biaya</span>
              <span className="figure-nums font-serif text-lg text-gold-deep">
                {formatIDR(totalCost)}
              </span>
            </div>

            <button
              type="button"
              onClick={handleConfirm}
              className="mt-4 w-full btn-primary"
            >
              Lanjut &mdash; Konfirmasi Alamat
            </button>
          </>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
