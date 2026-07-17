"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Clock, User, Plus, TrendingUp } from "lucide-react";

const TABS = [
  { href: "/dashboard", label: "Beranda", icon: Home },
  { href: "/segera-hadir?fitur=Pasar%20Emas", label: "Pasar", icon: TrendingUp },
  { href: "/riwayat", label: "Riwayat", icon: Clock },
  { href: "/profil", label: "Profil", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 z-20 border-t border-line bg-surface/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-2.5 sm:px-10">
        {TABS.slice(0, 2).map((tab) => {
          const Icon = tab.icon;
          const active = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center gap-1 px-2 py-1 text-[11px] font-medium transition ${
                active ? "text-gold-deep" : "text-ink-2 hover:text-gold-deep"
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2.4 : 1.9} />
              {tab.label}
            </Link>
          );
        })}

        <Link
          href="/beli-emas"
          className="-mt-6 flex h-13 w-13 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-deep text-white shadow-[0_10px_22px_-6px_rgba(140,102,38,0.6)] transition hover:brightness-105"
          style={{ height: 52, width: 52 }}
        >
          <Plus size={24} strokeWidth={2.4} />
        </Link>

        {TABS.slice(2).map((tab) => {
          const Icon = tab.icon;
          const active = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center gap-1 px-2 py-1 text-[11px] font-medium transition ${
                active ? "text-gold-deep" : "text-ink-2 hover:text-gold-deep"
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2.4 : 1.9} />
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
