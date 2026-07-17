import { ArrowDownToLine, ArrowUpFromLine, Coins, Package } from "lucide-react";
import { formatDate, formatGram, formatIDR } from "@/lib/format";

const TYPE_META = {
  beli: { icon: ArrowDownToLine, bg: "bg-cream-2", fg: "text-gold-deep", label: "Beli Emas" },
  jual: { icon: ArrowUpFromLine, bg: "bg-[#E4F0E8]", fg: "text-positive", label: "Jual Emas" },
  token: { icon: Coins, bg: "bg-cream-2", fg: "text-gold-deep", label: "Konversi ke hGOLD" },
  fisik: { icon: Package, bg: "bg-[#F6E2DC]", fg: "text-negative", label: "Cetak Fisik" },
};

export default function TransactionRow({ transaction }) {
  const meta = TYPE_META[transaction.type] || TYPE_META.beli;
  const Icon = meta.icon;
  const isPositiveGram = transaction.type === "beli" || transaction.type === "token";

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
          <p className="text-xs text-ink-2">
            {transaction.method ? `${transaction.method} \u00b7 ` : ""}
            {formatDate(transaction.date)}
          </p>
        </div>
      </div>

      <div className="text-right">
        <p
          className={`text-sm font-semibold ${
            transaction.type === "jual" ? "text-positive" : "text-ink"
          }`}
        >
          {transaction.type === "jual" ? "+" : ""}
          {formatIDR(transaction.amount)}
        </p>
        <p className="text-xs text-ink-2">
          {isPositiveGram ? "+" : "\u2212"}
          {formatGram(transaction.gram)}
        </p>
      </div>
    </div>
  );
}
