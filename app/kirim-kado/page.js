"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Gift, Send, CheckCircle2, Link2 } from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import PageHeading from "@/components/PageHeading";
import { useApp } from "@/lib/AppContext";
import { formatGram, formatIDR } from "@/lib/format";

export default function KirimKadoPage() {
  const { balanceGram, goldPrice, giftThemes, dummyContacts, sendGold } =
    useApp();

  const [tab, setTab] = useState("kado"); // kado | transfer
  const [phone, setPhone] = useState("0812-xxxx-7743");
  const [rawGram, setRawGram] = useState("0.5");
  const [themeId, setThemeId] = useState("idul-adha");
  const [message, setMessage] = useState(
    giftThemes.find((t) => t.id === "idul-adha")?.defaultMessage || ""
  );
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const gram = Number(rawGram.replace(",", ".")) || 0;
  const idrValue = gram * goldPrice;

  const recipientName = useMemo(() => {
    const digits = phone.replace(/[^0-9]/g, "");
    const match = Object.entries(dummyContacts).find(([prefix]) =>
      digits.startsWith(prefix)
    );
    return match?.[1] || null;
  }, [phone, dummyContacts]);

  function handleThemeChange(id) {
    setThemeId(id);
    const theme = giftThemes.find((t) => t.id === id);
    setMessage(theme?.defaultMessage || "");
  }

  function handleSend() {
    if (gram <= 0) {
      setError("Masukkan jumlah gram yang valid.");
      return;
    }
    if (gram > balanceGram) {
      setError("Saldo emas tidak mencukupi.");
      return;
    }
    if (!phone.trim()) {
      setError("Masukkan nomor HP penerima.");
      return;
    }
    const trx = sendGold(gram, phone, tab, tab === "kado" ? message : null);
    setResult(trx);
  }

  function resetFlow() {
    setResult(null);
    setError("");
    setRawGram("0.5");
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

        <PageHeading eyebrow="Berbagi Emas" title="Kirim & Kado Emas" />

        {result ? (
          <div className="mt-6 rounded-2xl border border-line bg-surface p-6 text-center shadow-[0_20px_44px_-24px_rgba(42,31,20,0.35)] sm:p-8">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E4F0E8] text-positive">
              <CheckCircle2 size={28} strokeWidth={1.75} />
            </span>
            <p className="mt-4 text-sm font-bold uppercase tracking-wide text-positive">
              {tab === "kado" ? "Kado Terkirim" : "Transfer Berhasil"}
            </p>
            <p className="mt-3 font-serif text-2xl text-ink">
              {formatGram(result.gram)}
            </p>
            <p className="mt-1 text-sm text-ink-2">{result.method}</p>

            {result.claimLink ? (
              <div className="mt-4 flex items-start gap-2 rounded-xl border border-dashed border-gold bg-cream-2 px-4 py-3 text-left text-xs text-ink-2">
                <Link2 size={15} strokeWidth={2} className="mt-0.5 shrink-0 text-gold-deep" />
                <span>
                  Penerima belum terdaftar — emas tersimpan dalam tautan
                  klaim yang berlaku <b className="text-ink">30 hari</b>.
                  Kami kirimkan link pendaftaran singkat lewat SMS/WhatsApp.
                </span>
              </div>
            ) : null}

            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <button type="button" onClick={resetFlow} className="flex-1 btn-secondary py-2.5">
                Kirim Lagi
              </button>
              <Link href="/dashboard" className="flex-1 btn-primary py-2.5">
                Lihat Dashboard
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={() => setTab("kado")}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  tab === "kado"
                    ? "bg-gold text-white"
                    : "border border-line bg-surface text-ink-2 hover:border-gold hover:text-gold-deep"
                }`}
              >
                <Gift size={14} strokeWidth={2.25} />
                Kado
              </button>
              <button
                type="button"
                onClick={() => setTab("transfer")}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  tab === "transfer"
                    ? "bg-gold text-white"
                    : "border border-line bg-surface text-ink-2 hover:border-gold hover:text-gold-deep"
                }`}
              >
                <Send size={13} strokeWidth={2.25} />
                Transfer biasa
              </button>
            </div>

            <div className="mt-5 rounded-2xl border border-line bg-surface p-5 shadow-[0_2px_10px_-4px_rgba(42,31,20,0.06)] sm:p-6">
              <label className="mb-1.5 block text-sm font-semibold text-ink-2">
                Penerima
              </label>
              <input
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setError("");
                }}
                placeholder="08xx-xxxx-xxxx"
                className="w-full rounded-xl border-[1.5px] border-line bg-cream-2 px-3.5 py-3 text-ink outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
              />
              {recipientName ? (
                <p className="mt-1.5 text-xs text-positive">
                  &#10003; Ditemukan: {recipientName}
                </p>
              ) : (
                <p className="mt-1.5 text-xs text-ink-2">
                  Cukup nomor HP &mdash; tanpa perlu alamat wallet atau
                  rekening.
                </p>
              )}

              <label className="mb-1.5 mt-4 block text-sm font-semibold text-ink-2">
                Jumlah
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
                  className="w-full bg-transparent text-ink outline-none"
                />
                <span className="ml-2 whitespace-nowrap text-sm text-ink-2">
                  gram (&asymp; {formatIDR(idrValue)})
                </span>
              </div>
              {error ? (
                <p className="mt-1.5 text-xs text-negative">{error}</p>
              ) : (
                <p className="mt-1.5 text-xs text-ink-2">
                  Saldo tersedia: {formatGram(balanceGram)}
                </p>
              )}

              {tab === "kado" ? (
                <>
                  <p className="label-eyebrow mb-2 mt-5 text-ink-2">
                    Kartu Ucapan
                  </p>
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#3A2B18] via-[#5C4320] to-gold-deep p-4 text-on-gold">
                    <span className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/5" />
                    <p className="relative font-serif text-lg italic leading-snug">
                      &ldquo;{message}&rdquo;
                    </p>
                    <p className="relative mt-2 text-right text-xs text-gold-soft">
                      &mdash; Ritchie
                    </p>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {giftThemes.map((theme) => (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => handleThemeChange(theme.id)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                          themeId === theme.id
                            ? "border-gold bg-gold text-white"
                            : "border-line bg-surface text-ink-2 hover:border-gold hover:text-gold-deep"
                        }`}
                      >
                        {theme.name}
                      </button>
                    ))}
                  </div>

                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={2}
                    className="mt-3 w-full rounded-xl border-[1.5px] border-line bg-cream-2 px-3.5 py-3 text-sm text-ink outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
                  />

                  <div className="mt-4 rounded-xl border border-dashed border-gold bg-cream-2 px-4 py-3 text-xs leading-relaxed text-ink-2">
                    Penerima belum punya akun? Emas tersimpan dalam{" "}
                    <b className="text-ink">tautan klaim</b> berlaku 30 hari
                    &mdash; mendaftar sebentar, emas langsung masuk. Ini cara
                    paling alami memperluas ekosistem.
                  </div>
                </>
              ) : (
                <p className="mt-4 text-xs text-ink-2">
                  Transfer langsung ke saldo emas penerima, tanpa kartu
                  ucapan &mdash; cocok untuk kirim cepat antar sesama
                  pengguna HaloGold.
                </p>
              )}

              <button
                type="button"
                onClick={handleSend}
                className="mt-5 w-full btn-primary"
              >
                {tab === "kado" ? "Kirim Kado" : "Kirim Transfer"}
              </button>
            </div>
          </>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
