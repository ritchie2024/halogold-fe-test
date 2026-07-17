"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  CURRENT_USER,
  GOLD_PRICE_PER_GRAM,
  GOLD_PRICE_HISTORY,
  INITIAL_BALANCE_GRAM,
  INITIAL_TRANSACTIONS,
} from "./dummyData";

const STORAGE_KEY = "halogold-state-v1";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [balanceGram, setBalanceGram] = useState(INITIAL_BALANCE_GRAM);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [hydrated, setHydrated] = useState(false);

  // Muat state tersimpan dari sesi sebelumnya (browser), jika ada.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.balanceGram === "number") {
          setBalanceGram(parsed.balanceGram);
        }
        if (Array.isArray(parsed.transactions)) {
          setTransactions(parsed.transactions);
        }
      }
    } catch (err) {
      console.warn("Gagal memuat state tersimpan:", err);
    } finally {
      setHydrated(true);
    }
  }, []);

  // Simpan setiap perubahan supaya saldo tidak reset saat pindah halaman.
  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ balanceGram, transactions })
    );
  }, [balanceGram, transactions, hydrated]);

  function buyGold(amountIdr) {
    const gram = amountIdr / GOLD_PRICE_PER_GRAM;
    const newTransaction = {
      id: `TRX-${Math.floor(10000 + Math.random() * 89999)}`,
      type: "beli",
      gram,
      amount: amountIdr,
      date: new Date().toISOString(),
      status: "berhasil",
    };

    setBalanceGram((prev) => prev + gram);
    setTransactions((prev) => [newTransaction, ...prev]);

    return newTransaction;
  }

  const value = {
    user: CURRENT_USER,
    goldPrice: GOLD_PRICE_PER_GRAM,
    goldPriceHistory: GOLD_PRICE_HISTORY,
    balanceGram,
    transactions,
    buyGold,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp harus dipakai di dalam <AppProvider>");
  }
  return ctx;
}
