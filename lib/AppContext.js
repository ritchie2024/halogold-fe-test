"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  CURRENT_USER,
  GOLD_PRICE_PER_GRAM,
  GOLD_PRICE_HISTORY,
  GOLD_PRICE_RANGES,
  BUYBACK_PRICE_PER_GRAM,
  BUYBACK_SPREAD,
  BALANCE_MONTHLY_GROWTH_PCT,
  BANK_ACCOUNT,
  INITIAL_BALANCE_GRAM,
  INITIAL_TRANSACTIONS,
  SAVINGS_GOALS,
  PRINT_DENOMINATIONS,
  PRINT_PRODUCT_NAME,
  SHIPPING_METHODS,
  INITIAL_TOKEN_BALANCE,
  TOKEN_WALLET,
  TOKEN_TRUST_PILLARS,
  RESERVE_DATA,
  VERIFICATION_TRAIL,
  PERSONAL_BATCH,
} from "./dummyData";

const STORAGE_KEY = "halogold-state-v2";
const THEME_KEY = "halogold-theme";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [balanceGram, setBalanceGram] = useState(INITIAL_BALANCE_GRAM);
  const [tokenBalance, setTokenBalance] = useState(INITIAL_TOKEN_BALANCE);
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
        if (typeof parsed.tokenBalance === "number") {
          setTokenBalance(parsed.tokenBalance);
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
      JSON.stringify({ balanceGram, tokenBalance, transactions })
    );
  }, [balanceGram, tokenBalance, transactions, hydrated]);

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

  function printFisik(gramToPrint, mintingFee, shippingMethod) {
    if (gramToPrint > balanceGram) {
      throw new Error("Saldo emas tidak mencukupi.");
    }

    const totalCost = mintingFee + (shippingMethod?.cost || 0);
    const newTransaction = {
      id: `TRX-${Math.floor(10000 + Math.random() * 89999)}`,
      type: "fisik",
      gram: gramToPrint,
      amount: totalCost,
      date: new Date().toISOString(),
      status: "berhasil",
      method: `Cetak fisik ${gramToPrint} gr \u00b7 ${shippingMethod?.name || ""}`,
    };

    setBalanceGram((prev) => prev - gramToPrint);
    setTransactions((prev) => [newTransaction, ...prev]);

    return newTransaction;
  }

  function convertToToken(gramToConvert) {
    if (gramToConvert > balanceGram) {
      throw new Error("Saldo emas tidak mencukupi.");
    }

    const newTransaction = {
      id: `TRX-${Math.floor(10000 + Math.random() * 89999)}`,
      type: "token",
      gram: gramToConvert,
      amount: gramToConvert * GOLD_PRICE_PER_GRAM,
      date: new Date().toISOString(),
      status: "berhasil",
      method: "Konversi ke hGOLD",
    };

    setBalanceGram((prev) => prev - gramToConvert);
    setTokenBalance((prev) => prev + gramToConvert);
    setTransactions((prev) => [newTransaction, ...prev]);

    return newTransaction;
  }

  function convertToBalance(gramToConvert) {
    if (gramToConvert > tokenBalance) {
      throw new Error("Saldo hGOLD tidak mencukupi.");
    }

    const newTransaction = {
      id: `TRX-${Math.floor(10000 + Math.random() * 89999)}`,
      type: "token",
      gram: gramToConvert,
      amount: gramToConvert * GOLD_PRICE_PER_GRAM,
      date: new Date().toISOString(),
      status: "berhasil",
      method: "Konversi hGOLD ke Saldo",
    };

    setTokenBalance((prev) => prev - gramToConvert);
    setBalanceGram((prev) => prev + gramToConvert);
    setTransactions((prev) => [newTransaction, ...prev]);

    return newTransaction;
  }

  const value = {
    user: CURRENT_USER,
    goldPrice: GOLD_PRICE_PER_GRAM,
    goldPriceHistory: GOLD_PRICE_HISTORY,
    goldPriceRanges: GOLD_PRICE_RANGES,
    balanceMonthlyGrowthPct: BALANCE_MONTHLY_GROWTH_PCT,
    buybackPrice: BUYBACK_PRICE_PER_GRAM,
    buybackSpread: BUYBACK_SPREAD,
    bankAccount: BANK_ACCOUNT,
    savingsGoals: SAVINGS_GOALS,
    printDenominations: PRINT_DENOMINATIONS,
    printProductName: PRINT_PRODUCT_NAME,
    shippingMethods: SHIPPING_METHODS,
    tokenWallet: TOKEN_WALLET,
    tokenTrustPillars: TOKEN_TRUST_PILLARS,
    reserveData: RESERVE_DATA,
    verificationTrail: VERIFICATION_TRAIL,
    personalBatch: PERSONAL_BATCH,
    balanceGram,
    tokenBalance,
    transactions,
    theme,
    toggleTheme,
    buyGold,
    sellGold,
    printFisik,
    convertToToken,
    convertToBalance,
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
