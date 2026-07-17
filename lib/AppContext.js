"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  CURRENT_USER,
  GOLD_PRICE_PER_GRAM,
  GOLD_PRICE_HISTORY,
  BUYBACK_PRICE_PER_GRAM,
  BUYBACK_SPREAD,
  BANK_ACCOUNT,
  INITIAL_BALANCE_GRAM,
  INITIAL_TRANSACTIONS,
  SAVINGS_GOALS,
} from "./dummyData";

const STORAGE_KEY = "halogold-state-v2";
const THEME_KEY = "halogold-theme";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [balanceGram, setBalanceGram] = useState(INITIAL_BALANCE_GRAM);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [theme, setTheme] = useState("light");
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

      const savedTheme = window.localStorage.getItem(THEME_KEY);
      if (savedTheme === "dark" || savedTheme === "light") {
        setTheme(savedTheme);
      } else if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
        setTheme("dark");
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

  // Terapkan class "dark" ke <html> supaya semua token warna di globals.css ikut berubah.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    if (hydrated) {
      window.localStorage.setItem(THEME_KEY, theme);
    }
  }, [theme, hydrated]);

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  function buyGold(amountIdr, method = "QRIS") {
    const gram = amountIdr / GOLD_PRICE_PER_GRAM;
    const newTransaction = {
      id: `TRX-${Math.floor(10000 + Math.random() * 89999)}`,
      type: "beli",
      gram,
      amount: amountIdr,
      date: new Date().toISOString(),
      status: "berhasil",
      method,
    };

    setBalanceGram((prev) => prev + gram);
    setTransactions((prev) => [newTransaction, ...prev]);

    return newTransaction;
  }

  function sellGold(gramToSell) {
    if (gramToSell > balanceGram) {
      throw new Error("Saldo emas tidak mencukupi.");
    }

    const amountIdr = Math.round(gramToSell * BUYBACK_PRICE_PER_GRAM);
    const newTransaction = {
      id: `TRX-${Math.floor(10000 + Math.random() * 89999)}`,
      type: "jual",
      gram: gramToSell,
      amount: amountIdr,
      date: new Date().toISOString(),
      status: "berhasil",
      method: `Buyback ke ${BANK_ACCOUNT.bank} ${BANK_ACCOUNT.masked}`,
    };

    setBalanceGram((prev) => prev - gramToSell);
    setTransactions((prev) => [newTransaction, ...prev]);

    return newTransaction;
  }

  const value = {
    user: CURRENT_USER,
    goldPrice: GOLD_PRICE_PER_GRAM,
    goldPriceHistory: GOLD_PRICE_HISTORY,
    buybackPrice: BUYBACK_PRICE_PER_GRAM,
    buybackSpread: BUYBACK_SPREAD,
    bankAccount: BANK_ACCOUNT,
    savingsGoals: SAVINGS_GOALS,
    balanceGram,
    transactions,
    theme,
    toggleTheme,
    buyGold,
    sellGold,
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
