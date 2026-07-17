"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { useApp } from "@/lib/AppContext";

export default function Header() {
  const { user } = useApp();
  const initial = user.name.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gold-soft via-gold to-gold-deep text-[13px] font-semibold text-white shadow-[0_4px_14px_-4px_rgba(140,102,38,0.55)]">
            H
          </span>
          <span
            className="font-label text-[13px] text-ink"
            style={{ fontFamily: "var(--font-label)", letterSpacing: "0.18em" }}
          >
            HALO<span className="text-gold-deep">GOLD</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-ink-2 sm:inline">
            {user.name}
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/60 bg-cream-2 font-serif text-sm text-gold-deep">
            {initial}
          </span>
          <Link
            href="/login"
            className="flex items-center gap-1.5 text-sm text-ink-2 transition hover:text-gold-deep"
          >
            <LogOut size={15} strokeWidth={2} />
            <span className="hidden sm:inline">Keluar</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
