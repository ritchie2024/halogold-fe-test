import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import { formatDate, formatGram, formatIDR } from "@/lib/format";

export default function TransactionRow({ transaction }) {
  const isBeli = transaction.type === "beli";
  const Icon = isBeli ? ArrowDownToLine : ArrowUpFromLine;

  return (
    <div className="flex items-center justify-between gap-3 border-b border-line/70 py-3.5 last:border-none">
      <div className="flex items-center gap-3">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
            isBeli
              ? "bg-cream-2 text-gold-deep"
              : "bg-[#E4F0E8] text-positive"
          }`}
        >
          <Icon size={17} strokeWidth={2.25} />
        </span>
        <div>
          <p className="text-[13.5px] font-semibold text-ink">
            {isBeli ? "Beli Emas" : "Jual Emas"}
          </p>
          <p className="text-xs text-ink-2">
            {transaction.id} &middot; {formatDate(transaction.date)}
          </p>
        </div>
      </div>

      <div className="text-right">
        <p
          className={`text-sm font-semibold ${
            isBeli ? "text-ink" : "text-positive"
          }`}
        >
          {isBeli ? "" : "+"}
          {formatIDR(transaction.amount)}
        </p>
        <p className="text-xs text-ink-2">{formatGram(transaction.gram)}</p>
      </div>
    </div>
  );
}
