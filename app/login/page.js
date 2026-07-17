"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Gem } from "lucide-react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  function validate() {
    const nextErrors = {};

    if (!email.trim()) {
      nextErrors.email = "Email wajib diisi.";
    } else if (!EMAIL_REGEX.test(email)) {
      nextErrors.email = "Format email tidak valid.";
    }

    if (!password) {
      nextErrors.password = "Password wajib diisi.";
    } else if (password.length < 6) {
      nextErrors.password = "Password minimal 6 karakter.";
    }

    return nextErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      // Sesuai ketentuan studi kasus: tombol Login tidak memerlukan autentikasi nyata.
      router.push("/dashboard");
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cream px-4 py-12">
      {/* Ambient glow — signature background detail */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-gold-soft) 0%, transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-soft via-gold to-gold-deep text-white shadow-[0_10px_24px_-8px_rgba(140,102,38,0.6)]">
            <Gem size={26} strokeWidth={1.75} />
          </span>
          <h1 className="mt-5 font-serif text-[2rem] leading-none tracking-tight text-ink">
            Halo<span className="text-gold-deep">Gold</span>
          </h1>
          <p className="mt-2 font-serif text-[15px] italic text-ink-2">
            Masuk untuk mulai menabung emas digital
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-2xl border border-line bg-white p-6 shadow-[0_20px_44px_-24px_rgba(42,31,20,0.35)] sm:p-7"
        >
          <div className="mb-4">
            <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className={`w-full rounded-xl border-[1.5px] bg-white px-3.5 py-3 text-ink placeholder:text-ink-2/50 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30 ${
                errors.email ? "border-negative" : "border-line"
              }`}
            />
            {errors.email ? (
              <p className="mt-1.5 text-xs text-negative">{errors.email}</p>
            ) : null}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-ink-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimal 6 karakter"
              className={`w-full rounded-xl border-[1.5px] bg-white px-3.5 py-3 text-ink placeholder:text-ink-2/50 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30 ${
                errors.password ? "border-negative" : "border-line"
              }`}
            />
            {errors.password ? (
              <p className="mt-1.5 text-xs text-negative">
                {errors.password}
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-br from-gold to-gold-deep py-3 text-sm font-semibold text-white shadow-[0_10px_20px_-8px_rgba(140,102,38,0.55)] transition hover:brightness-105 active:scale-[0.99]"
          >
            Masuk
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-ink-2">
          Prototipe Technical Test — HaloGold Front End Web
        </p>
      </div>
    </main>
  );
}
