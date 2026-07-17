"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Link2,
  Video,
  Package,
} from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import PageHeading from "@/components/PageHeading";
import { useApp } from "@/lib/AppContext";

const ICONS = { file: FileText, link: Link2, video: Video };

export default function ProofOfReservePage() {
  const { reserveData, verificationTrail, personalBatch, balanceGram } =
    useApp();

  const maxKg = Math.max(reserveData.vaultKg, reserveData.liabilityKg);
  const vaultHeightPct = (reserveData.vaultKg / maxKg) * 100;
  const liabilityHeightPct = (reserveData.liabilityKg / maxKg) * 100;

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

        <PageHeading eyebrow="Halaman Kepercayaan Publik" title="Proof-of-Reserve" />

        {/* Kesimpulan dulu, bukti kemudian — sesuai keputusan desain blueprint */}
        <div className="mt-6 rounded-2xl border border-positive/40 bg-[#E4F0E8] p-5">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-positive" strokeWidth={2} />
            <p className="text-sm font-bold text-positive">
              Cadangan Sehat &mdash; {reserveData.ratioPct}%
            </p>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-[#2E5D42]">
            Emas fisik di brankas melebihi seluruh kewajiban digital.{" "}
            {reserveData.updatedNote}
          </p>
        </div>

        {/* Perbandingan visual dua batang — dipahami dalam 3 detik */}
        <div className="mt-4 rounded-2xl border border-line bg-surface p-5 shadow-[0_2px_10px_-4px_rgba(42,31,20,0.06)] sm:p-6">
          <p className="label-eyebrow text-ink-2">
            Emas Fisik vs Kewajiban Digital
          </p>
          <div className="mt-6 flex items-end justify-center gap-10">
            <div className="flex flex-col items-center">
              <span className="mb-1.5 text-xs font-bold text-ink">
                {reserveData.vaultKg} kg
              </span>
              <div
                className="w-16 rounded-t-lg"
                style={{
                  height: `${Math.max(vaultHeightPct, 10) * 1.4}px`,
                  background:
                    "linear-gradient(155deg, #D9A94A 0%, #B3801F 60%, #8C6626 100%)",
                }}
              />
              <span className="mt-2 max-w-[90px] text-center text-[11px] leading-tight text-ink-2">
                Emas di brankas (tersertifikasi)
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="mb-1.5 text-xs font-bold text-ink">
                {reserveData.liabilityKg} kg
              </span>
              <div
                className="w-16 rounded-t-lg bg-ink"
                style={{ height: `${Math.max(liabilityHeightPct, 10) * 1.4}px` }}
              />
              <span className="mt-2 max-w-[90px] text-center text-[11px] leading-tight text-ink-2">
                Saldo nasabah + token beredar
              </span>
            </div>
          </div>
        </div>

        {/* Jejak verifikasi — bukti berlapis tiga */}
        <div className="mt-4 rounded-2xl border border-line bg-surface p-5 shadow-[0_2px_10px_-4px_rgba(42,31,20,0.06)] sm:p-6">
          <p className="label-eyebrow mb-3 text-ink-2">Jejak Verifikasi</p>
          <div className="flex flex-col divide-y divide-line">
            {verificationTrail.map((item) => {
              const Icon = ICONS[item.icon] || FileText;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    window.alert(
                      `"${item.title}" \u2014 dokumen/media ini di luar cakupan Technical Test, ditampilkan sebagai simulasi.`
                    )
                  }
                  className="flex w-full items-center gap-3 py-3 text-left transition first:pt-0 last:pb-0"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-chip text-gold-deep">
                    <Icon size={16} strokeWidth={2} />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-ink">
                      {item.title}
                    </p>
                    <p className="text-xs text-ink-2">{item.detail}</p>
                  </div>
                  <span className="text-xs font-bold text-gold-deep">
                    {item.action} &rsaquo;
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Batch personal — agregat ke rasa memiliki individual */}
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-dashed border-gold bg-cream-2 px-4 py-3.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface text-gold-deep">
            <Package size={16} strokeWidth={2} />
          </span>
          <p className="text-xs text-ink-2">
            Emas Anda ({balanceGram.toFixed(3)} gr) tercatat dalam{" "}
            <span className="font-semibold text-ink">
              batch {personalBatch}
            </span>{" "}
            &mdash; dapat diverifikasi kapan pun.
          </p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
