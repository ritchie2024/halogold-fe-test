"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

const DESCRIPTIONS = {
  "hGOLD Token": "Konversi emas fisik Anda menjadi token on-chain (RWA) yang bisa dilacak transparan lewat Proof-of-Reserve.",
  "Cetak Fisik": "Tukarkan saldo digital menjadi kepingan emas fisik Hartadinata 24K, diantar terasuransi atau diambil di gerai.",
  "Kado Emas": "Kirim hadiah emas digital ke keluarga atau kolega — diklaim langsung ke akun HaloGold mereka.",
  "Pasar Emas": "Pantau pergerakan harga emas dunia & lokal secara real-time, lengkap dengan analisis tren.",
  "Emas Berimbal": "Kunci saldo emas Anda untuk memperoleh imbal hasil (yield) tambahan dari program kemitraan Hartadinata.",
};

function ComingSoonContent() {
  const params = useSearchParams();
  const fitur = params.get("fitur") || "Fitur Ini";
  const description =
    DESCRIPTIONS[fitur] || "Fitur ini sedang dalam pengembangan tim produk HaloGold.";

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      <main className="mx-auto max-w-lg px-4 py-10 sm:px-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-ink-2 transition hover:text-gold-deep"
        >
          <ArrowLeft size={15} strokeWidth={2.25} />
          Kembali ke Dashboard
        </Link>

        <div className="mt-10 flex flex-col items-center rounded-2xl border border-line bg-white p-10 text-center shadow-[0_20px_44px_-24px_rgba(42,31,20,0.35)]">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream-2 text-gold-deep">
            <Sparkles size={26} strokeWidth={1.75} />
          </span>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-gold-deep">
            Segera Hadir
          </p>
          <h1 className="mt-2 font-serif text-2xl text-ink">{fitur}</h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-2">
            {description}
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-ink-2">
          Fitur inti (Login, Dashboard, Beli &amp; Jual Emas) sudah aktif —
          modul ini di luar cakupan Technical Test dan disiapkan sebagai
          bagian dari roadmap produk penuh.
        </p>
      </main>

      <BottomNav />
    </div>
  );
}

export default function ComingSoonPage() {
  return (
    <Suspense fallback={null}>
      <ComingSoonContent />
    </Suspense>
  );
}
