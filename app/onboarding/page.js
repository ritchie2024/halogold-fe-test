"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Gem } from "lucide-react";

const SLIDES = [
  {
    badge: "Emas Fisik Bersertifikat",
    headlineParts: ["Emasnya ", "nyata", ". Caranya digital."],
    body: "Setiap gram yang Anda beli dijamin emas fisik bersertifikat di brankas Hartadinata — bukan sekadar angka di layar. Mulai dari Rp10.000.",
  },
  {
    badge: "Cair Kapan Saja",
    headlineParts: ["Beli sedikit ", "demi sedikit", ", cair kapan perlu."],
    body: "Nabung rutin otomatis, atau jual sebagian saldo Anda dalam hitungan menit — dana masuk ke rekening tanpa antre cabang.",
  },
  {
    badge: "Diawasi Resmi",
    headlineParts: ["Legal, ", "transparan", ", dan diawasi."],
    body: "Tersertifikasi dan berada dalam pengawasan Bappebti & OJK — keamanan dana Anda bukan sekadar janji marketing.",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [slide, setSlide] = useState(0);
  const current = SLIDES[slide];

  function next() {
    setSlide((s) => (s + 1) % SLIDES.length);
  }

  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 sm:py-14"
      style={{ backgroundColor: "#1C130A" }}
    >
      {/* Ambient warm glow di belakang koin */}
      <div
        className="pointer-events-none absolute left-1/2 top-[18%] h-[380px] w-[380px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background: "radial-gradient(circle, #E9C878 0%, transparent 70%)",
        }}
      />

      <div className="relative flex w-full max-w-sm flex-col items-center text-center">
        {/* Wordmark — mengikuti gaya blueprint resmi: lowercase, dua warna */}
        <div className="mb-8 flex items-center gap-2 self-start">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#E9C878] to-[#8C6626] text-white">
            <Gem size={15} strokeWidth={2} />
          </span>
          <span className="text-lg font-semibold tracking-tight text-[#F3EAD9]">
            halo<span className="text-[#E0B15A]">Gold</span>
          </span>
        </div>

        {/* Ilustrasi koin emas 3D */}
        <div
          key={slide}
          className="relative mb-8 flex h-52 w-52 items-center justify-center rounded-full animate-coin-in"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, #F3D896 0%, #D9A94A 32%, #B3801F 62%, #7A5518 100%)",
            boxShadow:
              "0 24px 60px -16px rgba(0,0,0,0.6), inset 0 4px 12px rgba(255,255,255,0.35), inset 0 -10px 24px rgba(0,0,0,0.35)",
          }}
        >
          <span
            className="font-serif text-6xl text-[#5C4013]"
            style={{ fontFamily: "'Cormorant Garamond', serif", textShadow: "0 1px 0 rgba(255,255,255,0.25)" }}
          >
            Au
          </span>
        </div>

        {/* Dots indikator slide */}
        <div className="mb-6 flex items-center gap-1.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSlide(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === slide ? "w-6 bg-[#E0B15A]" : "w-1.5 bg-white/25"
              }`}
            />
          ))}
        </div>

        <span className="mb-3 inline-block rounded-full border border-[#E0B15A]/40 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#E0B15A]">
          {current.badge}
        </span>

        <h1 className="text-[1.65rem] font-bold leading-tight text-[#F3EAD9] sm:text-3xl">
          {current.headlineParts[0]}
          <span className="text-[#E0B15A]">{current.headlineParts[1]}</span>
          {current.headlineParts[2]}
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-[#C9B99A]">
          {current.body}
        </p>

        <div className="mt-8 flex w-full flex-col gap-3">
          <button
            type="button"
            onClick={() => (slide < SLIDES.length - 1 ? next() : router.push("/registrasi"))}
            className="w-full rounded-xl bg-gradient-to-br from-[#E0B15A] to-[#B3801F] py-3.5 text-sm font-bold text-[#1C130A] shadow-[0_10px_24px_-8px_rgba(224,177,90,0.5)] transition hover:brightness-105 active:scale-[0.99]"
          >
            {slide < SLIDES.length - 1 ? "Lanjut" : "Mulai Sekarang"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="w-full rounded-xl border-[1.5px] border-white/20 py-3.5 text-sm font-semibold text-[#F3EAD9] transition hover:bg-white/5"
          >
            Saya sudah punya akun
          </button>
        </div>
      </div>
    </main>
  );
}
