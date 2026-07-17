"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  Fingerprint,
  Smartphone,
  Landmark,
  FileText,
  Scale,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import PageHeading from "@/components/PageHeading";
import { useApp } from "@/lib/AppContext";

const SECURITY_ITEMS = [
  { icon: ShieldCheck, title: "PIN transaksi", sub: "Wajib untuk jual, tarik, & token", status: "Aktif" },
  { icon: Fingerprint, title: "Biometrik", sub: "Face ID / sidik jari", status: "Aktif" },
  { icon: Smartphone, title: "Perangkat terpercaya", sub: "1 perangkat aktif", status: "Kelola" },
];

const OTHER_ITEMS = [
  { icon: FileText, title: "Sertifikat kepemilikan saya" },
  { icon: Scale, title: "Izin & legalitas (Bappebti \u2192 OJK)" },
  { icon: MessageCircle, title: "Bantuan 24/7" },
];

export default function ProfilPage() {
  const { user, bankAccount } = useApp();
  const initial = user.name.charAt(0).toUpperCase();

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

        <h1 className="mt-3 font-serif text-[1.9rem] tracking-tight text-ink sm:text-3xl">
          Profil &amp; Keamanan
        </h1>

        <div className="mt-6 flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 shadow-[0_2px_10px_-4px_rgba(42,31,20,0.06)]">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold-soft via-gold to-gold-deep font-serif text-xl text-white">
            {initial}
          </span>
          <div className="flex-1">
            <p className="text-[15px] font-semibold text-ink">{user.name}</p>
            <p className="text-xs text-ink-2">Anggota sejak Apr 2026</p>
            <span className="mt-1 inline-block rounded-full bg-[#E4F0E8] px-2.5 py-0.5 text-[11px] font-semibold text-positive">
              ✓ KYC Tier 2 — akses penuh
            </span>
          </div>
        </div>

        <section className="mt-4 rounded-2xl border border-line bg-surface p-5 shadow-[0_2px_10px_-4px_rgba(42,31,20,0.06)]">
          <p className="mb-1 label-eyebrow text-ink-2">
            Keamanan
          </p>
          {SECURITY_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-center justify-between gap-3 border-b border-line/70 py-3 last:border-none"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-chip text-gold-deep">
                    <Icon size={16} strokeWidth={2} />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-ink">{item.title}</p>
                    <p className="text-xs text-ink-2">{item.sub}</p>
                  </div>
                </div>
                <span
                  className={`text-xs font-semibold ${
                    item.status === "Aktif" ? "text-positive" : "text-ink-2"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            );
          })}

          <div className="flex items-center justify-between gap-3 border-t border-line/70 pt-3">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-chip text-gold-deep">
                <Landmark size={16} strokeWidth={2} />
              </span>
              <div>
                <p className="text-sm font-medium text-ink">
                  Rekening pencairan
                </p>
                <p className="text-xs text-ink-2">
                  {bankAccount.bank} {bankAccount.masked} (terkunci nama sendiri)
                </p>
              </div>
            </div>
            <span className="text-positive">✓</span>
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-line bg-surface p-5 shadow-[0_2px_10px_-4px_rgba(42,31,20,0.06)]">
          <p className="mb-1 label-eyebrow text-ink-2">
            Lainnya
          </p>
          {OTHER_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.title}
                type="button"
                onClick={() =>
                  window.alert(`"${item.title}" di luar cakupan Technical Test ini.`)
                }
                className="flex w-full items-center justify-between gap-3 border-b border-line/70 py-3 text-left last:border-none"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-chip text-gold-deep">
                    <Icon size={16} strokeWidth={2} />
                  </span>
                  <p className="text-sm font-medium text-ink">{item.title}</p>
                </div>
                <ChevronRight size={16} className="text-ink-2" />
              </button>
            );
          })}
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
