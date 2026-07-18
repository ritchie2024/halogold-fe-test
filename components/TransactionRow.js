import { ArrowDownToLine, ArrowUpFromLine, Coins, Package, TrendingUp, Gift, Send } from "lucide-react";
import { formatDate, formatGram, formatIDR } from "@/lib/format";

const TYPE_META = {
  beli: { icon: ArrowDownToLine, bg: "bg-chip", fg: "text-gold-deep", label: "Beli Emas", direction: "in" },
  jual: { icon: ArrowUpFromLine, bg: "bg-[#E4F0E8]", fg: "text-positive", label: "Jual Emas", direction: "out" },
  token: { icon: Coins, bg: "bg-chip", fg: "text-gold-deep", label: "Konversi hGOLD", direction: "neutral" },
  fisik: { icon: Package, bg: "bg-[#F6E2DC]", fg: "text-negative", label: "Cetak Fisik", direction: "out" },
  yield: { icon: TrendingUp, bg: "bg-chip", fg: "text-gold-deep", label: "Emas Berimbal", direction: "out" },
  kado: { icon: Gift, bg: "bg-[#F8E1E8]", fg: "text-[#B5486E]", label: "Kado Emas", direction: "out" },
  kirim: { icon: Send, bg: "bg-chip", fg: "text-gold-deep", label: "Transfer Emas", direction: "out" },
};

export default function TransactionRow({ transaction }) {
  const meta = TYPE_META[transaction.type] || TYPE_META.beli;
  const Icon = meta.icon;

  // Sesuai prinsip "gram dulu, rupiah kedua" — gram adalah jejak audit yang
  // sebenarnya (aset), jadi ditampilkan sebagai angka utama & berwarna sesuai arah.
  const gramPrefix = meta.direction === "in" ? "+" : meta.direction === "out" ? "\u2212" : "";
  const gramColor =
    meta.direction === "in"
      ? "text-positive"
      : meta.direction === "out"
      ? "text-negative"
      : "text-ink";

  const subtitleParts = [
    transaction.method,
    transaction.statusNote,
    formatDate(transaction.date),
    transaction.id,
  ].filter(Boolean);

  return (
    <div className="flex items-center justify-between gap-3 border-b border-line/70 py-3.5 last:border-none">
      <div className="flex items-center gap-3">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${meta.bg} ${meta.fg}`}
        >
          <Icon size={17} strokeWidth={2.25} />
        </span>
        <div>
          <p className="text-[13.5px] font-semibold text-ink">{meta.label}</p>
          <p className="text-xs text-ink-2">{subtitleParts.join(" \u00b7 ")}</p>
        </div>
      </div>

      <div className="text-right">
        <p className={`figure-nums text-sm font-bold ${gramColor}`}>
          {gramPrefix}
          {formatGram(transaction.gram)}
        </p>
        <p className="figure-nums text-xs text-ink-2">
          {formatIDR(transaction.amount)}
        </p>
      </div>
    </div>
  );
}
