"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  IdCard,
  ScanFace,
  ShieldCheck,
  CheckCircle2,
  Lock,
} from "lucide-react";

const STEP_LABELS = ["Nomor HP", "KTP", "Selfie", "PIN"];

export default function RegistrasiPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1..4

  // Step 1 — Nomor HP
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  // Step 2 — KTP
  const [nik, setNik] = useState("");
  const [nama, setNama] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [ktpUploaded, setKtpUploaded] = useState(false);

  // Step 3 — Selfie
  const [selfieTaken, setSelfieTaken] = useState(false);

  // Step 4 — PIN
  const [pin, setPin] = useState("");
  const [pinConfirm, setPinConfirm] = useState("");
  const [pinError, setPinError] = useState("");

  function goBack() {
    if (step === 1) {
      router.push("/onboarding");
    } else {
      setStep((s) => s - 1);
    }
  }

  function handleFinish() {
    if (pin.length !== 6) {
      setPinError("PIN harus 6 digit.");
      return;
    }
    if (pin !== pinConfirm) {
      setPinError("Konfirmasi PIN tidak cocok.");
      return;
    }
    router.push("/dashboard");
  }

  return (
    <main className="relative flex min-h-screen items-start justify-center overflow-hidden bg-cream px-4 py-10 sm:py-14">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-gold-soft) 0%, transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-sm">
        <button
          type="button"
          onClick={goBack}
          className="mb-4 inline-flex items-center gap-1 text-sm text-ink-2 transition hover:text-gold-deep"
        >
          <ChevronLeft size={16} strokeWidth={2.25} />
          Kembali
        </button>

        {/* Progress bar 4 langkah — selalu terlihat, sesuai keputusan desain blueprint */}
        <div className="mb-2 flex gap-1.5">
          {STEP_LABELS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i + 1 <= step ? "bg-gold" : "bg-line"
              }`}
            />
          ))}
        </div>
        <p className="mb-6 text-xs font-medium text-ink-2">
          Langkah {step} dari 4 &middot; {STEP_LABELS[step - 1]}
        </p>

        <div className="rounded-2xl border border-line bg-surface p-6 shadow-[0_20px_44px_-24px_rgba(42,31,20,0.35)] sm:p-7">
          {/* ===== STEP 1: NOMOR HP ===== */}
          {step === 1 && (
            <>
              <h1 className="font-serif text-2xl text-ink">
                Verifikasi Nomor HP
              </h1>
              <p className="mt-1.5 text-sm text-ink-2">
                Kami kirim kode OTP untuk memastikan ini benar Anda.
              </p>

              <div className="mt-5">
                <label className="mb-1.5 block text-sm font-semibold text-ink-2">
                  Nomor HP
                </label>
                <div className="flex items-center rounded-xl border-[1.5px] border-line bg-surface px-3.5 py-3 focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/30">
                  <span className="mr-2 text-ink-2">+62</span>
                  <input
                    inputMode="numeric"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value.replace(/[^0-9]/g, ""));
                      setOtpSent(false);
                    }}
                    placeholder="812xxxxxxxx"
                    disabled={otpSent}
                    className="w-full bg-transparent text-ink outline-none placeholder:text-ink-2/50 disabled:opacity-60"
                  />
                </div>
              </div>

              {otpSent ? (
                <div className="mt-4">
                  <label className="mb-1.5 block text-sm font-semibold text-ink-2">
                    Kode OTP
                  </label>
                  <input
                    inputMode="numeric"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
                    placeholder="6 digit kode"
                    maxLength={6}
                    className="w-full rounded-xl border-[1.5px] border-line bg-surface px-3.5 py-3 text-center tracking-[0.5em] text-ink outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
                  />
                  <p className="mt-2 text-xs text-ink-2">
                    Kode dikirim ke +62{phone || "···"}. (Simulasi — isi 6 digit apa saja)
                  </p>
                </div>
              ) : null}

              <button
                type="button"
                onClick={() => {
                  if (!otpSent) {
                    if (phone.length >= 9) setOtpSent(true);
                  } else if (otp.length === 6) {
                    setStep(2);
                  }
                }}
                className="mt-6 w-full btn-primary"
              >
                {otpSent ? "Verifikasi & Lanjut" : "Kirim Kode OTP"}
              </button>
            </>
          )}

          {/* ===== STEP 2: VERIFIKASI IDENTITAS (KTP) ===== */}
          {step === 2 && (
            <>
              <h1 className="font-serif text-2xl text-ink">
                Verifikasi Identitas
              </h1>
              <p className="mt-1.5 text-sm text-ink-2">
                Sesuai ketentuan Bappebti &amp; OJK, akun harus terverifikasi sebelum transaksi pertama.
              </p>

              <div className="mt-5 space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-ink-2">
                    NIK (16 digit)
                  </label>
                  <input
                    inputMode="numeric"
                    maxLength={16}
                    value={nik}
                    onChange={(e) => setNik(e.target.value.replace(/[^0-9]/g, ""))}
                    placeholder="3273xxxxxxxxxxxx"
                    className="w-full rounded-xl border-[1.5px] border-line bg-surface px-3.5 py-3 text-ink outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-ink-2">
                    Nama lengkap sesuai KTP
                  </label>
                  <input
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Sesuai KTP"
                    className="w-full rounded-xl border-[1.5px] border-line bg-surface px-3.5 py-3 text-ink outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-ink-2">
                    Tanggal lahir
                  </label>
                  <input
                    type="date"
                    value={tanggalLahir}
                    onChange={(e) => setTanggalLahir(e.target.value)}
                    className="w-full rounded-xl border-[1.5px] border-line bg-surface px-3.5 py-3 text-ink outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setKtpUploaded(true)}
                  className={`flex w-full flex-col items-center gap-2 rounded-xl border-[1.5px] border-dashed px-4 py-6 text-center transition ${
                    ktpUploaded
                      ? "border-positive bg-[#E4F0E8]"
                      : "border-gold bg-cream-2 hover:bg-chip"
                  }`}
                >
                  {ktpUploaded ? (
                    <CheckCircle2 size={22} className="text-positive" strokeWidth={1.75} />
                  ) : (
                    <IdCard size={22} className="text-gold-deep" strokeWidth={1.75} />
                  )}
                  <span className="text-sm font-semibold text-ink">
                    {ktpUploaded ? "Foto KTP terunggah" : "Unggah foto KTP"}
                  </span>
                  <span className="text-xs text-ink-2">
                    {ktpUploaded
                      ? "Berikutnya: selfie singkat untuk pencocokan wajah (liveness check)."
                      : "Pastikan seluruh bagian KTP terlihat jelas."}
                  </span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (nik.length === 16 && nama.trim() && tanggalLahir && ktpUploaded) {
                    setStep(3);
                  }
                }}
                className="mt-6 w-full btn-primary"
              >
                Lanjut ke Selfie
              </button>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-ink-2">
                <Lock size={12} strokeWidth={2} />
                Data dienkripsi &amp; diproses sesuai UU PDP
              </p>
            </>
          )}

          {/* ===== STEP 3: SELFIE LIVENESS ===== */}
          {step === 3 && (
            <>
              <h1 className="font-serif text-2xl text-ink">
                Pencocokan Wajah
              </h1>
              <p className="mt-1.5 text-sm text-ink-2">
                Selfie singkat untuk mencocokkan wajah Anda dengan foto KTP (liveness check).
              </p>

              <div className="mt-6 flex flex-col items-center">
                <div
                  className={`flex h-40 w-40 items-center justify-center rounded-full border-[3px] transition ${
                    selfieTaken
                      ? "border-positive bg-[#E4F0E8]"
                      : "border-dashed border-gold bg-cream-2"
                  }`}
                >
                  {selfieTaken ? (
                    <CheckCircle2 size={40} className="text-positive" strokeWidth={1.5} />
                  ) : (
                    <ScanFace size={40} className="text-gold-deep" strokeWidth={1.5} />
                  )}
                </div>
                <p className="mt-4 text-center text-xs text-ink-2">
                  {selfieTaken
                    ? "Wajah berhasil dicocokkan dengan data KTP."
                    : "Pastikan wajah terlihat jelas, tanpa masker atau kacamata gelap."}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!selfieTaken) {
                    setSelfieTaken(true);
                  } else {
                    setStep(4);
                  }
                }}
                className="mt-6 w-full btn-primary"
              >
                {selfieTaken ? "Lanjut ke PIN" : "Ambil Foto (Simulasi)"}
              </button>
            </>
          )}

          {/* ===== STEP 4: BUAT PIN ===== */}
          {step === 4 && (
            <>
              <h1 className="font-serif text-2xl text-ink">Buat PIN Transaksi</h1>
              <p className="mt-1.5 text-sm text-ink-2">
                PIN 6 digit ini akan diminta setiap kali Anda beli, jual, atau tarik emas.
              </p>

              <div className="mt-5 space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-ink-2">
                    Buat PIN
                  </label>
                  <input
                    type="password"
                    inputMode="numeric"
                    maxLength={6}
                    value={pin}
                    onChange={(e) => {
                      setPin(e.target.value.replace(/[^0-9]/g, ""));
                      setPinError("");
                    }}
                    placeholder="6 digit"
                    className="w-full rounded-xl border-[1.5px] border-line bg-surface px-3.5 py-3 text-center tracking-[0.5em] text-ink outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-ink-2">
                    Konfirmasi PIN
                  </label>
                  <input
                    type="password"
                    inputMode="numeric"
                    maxLength={6}
                    value={pinConfirm}
                    onChange={(e) => {
                      setPinConfirm(e.target.value.replace(/[^0-9]/g, ""));
                      setPinError("");
                    }}
                    placeholder="Ulangi 6 digit"
                    className="w-full rounded-xl border-[1.5px] border-line bg-surface px-3.5 py-3 text-center tracking-[0.5em] text-ink outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
                  />
                </div>
                {pinError ? (
                  <p className="text-center text-xs text-negative">{pinError}</p>
                ) : null}
              </div>

              <button type="button" onClick={handleFinish} className="mt-6 w-full btn-primary">
                <ShieldCheck size={16} strokeWidth={2} className="mr-1.5" />
                Selesai &amp; Masuk ke Dashboard
              </button>
            </>
          )}
        </div>

        {step === 2 ? (
          <p className="mt-4 text-center text-xs text-ink-2">
            Verifikasi ini (Tier 1) sudah cukup untuk beli &amp; jual emas. Verifikasi tambahan (Tier 2) hanya diminta saat mengakses hGOLD Token atau Emas Berimbal.
          </p>
        ) : (
          <p className="mt-6 text-center text-xs text-ink-2">
            Prototipe Technical Test — HaloGold Front End Web
          </p>
        )}
      </div>
    </main>
  );
}
