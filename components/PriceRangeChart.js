"use client";

import { useMemo, useState } from "react";
import SparkChart from "./SparkChart";

const RANGE_KEYS = ["1H", "1B", "3B", "1T", "5T"];

export default function PriceRangeChart({ ranges, currentPrice }) {
  const [active, setActive] = useState("1B");
  const range = ranges[active];

  const changePct = useMemo(() => {
    const data = range.data;
    return ((data[data.length - 1] - data[0]) / data[0]) * 100;
  }, [range]);

  return (
    <div className="rounded-2xl border border-line bg-surface p-5 shadow-[0_2px_10px_-4px_rgba(42,31,20,0.06)] sm:p-6">
      <div className="flex items-start justify-between">
        <p className="label-eyebrow text-ink-2">Harga Emas Hari Ini</p>
        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
            changePct >= 0
              ? "bg-[#E4F0E8] text-positive"
              : "bg-[#F6E2DC] text-negative"
          }`}
        >
          {changePct >= 0 ? "▲" : "▼"} {Math.abs(changePct).toFixed(1)}%{" "}
          {active === "1H" ? "hari ini" : `/ ${range.label.toLowerCase()}`}
        </span>
      </div>

      <p className="figure-nums mt-2 font-serif text-hero-figure text-ink">
        {new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
        }).format(currentPrice)}
        <span className="ml-1 text-base font-sans font-normal text-ink-2">
          /gr
        </span>
      </p>

      <div className="mt-4">
        <SparkChart data={range.data} height={90} />
      </div>

      <div className="mt-1.5 flex items-center justify-between text-[11px] text-ink-2">
        <span>{range.startLabel}</span>
        <span>{range.midLabel}</span>
        <span>{range.endLabel}</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {RANGE_KEYS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setActive(key)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
              active === key
                ? "border-gold bg-gold text-white"
                : "border-line bg-surface text-ink-2 hover:border-gold hover:text-gold-deep"
            }`}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
}
