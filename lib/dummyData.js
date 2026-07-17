// Dummy data source. Studi kasus BRD mengizinkan penggunaan dummy JSON,
// jadi seluruh nilai di file ini adalah data statis/simulasi (bukan API asli).

export const CURRENT_USER = {
  name: "Ritchie Ramadhan",
  email: "ritchie.ramadhan@gmail.com",
};

// Harga emas per gram (contoh nilai sesuai BRD)
export const GOLD_PRICE_PER_GRAM = 1945200;

// Tren harga 7 hari terakhir (dummy, untuk grafik mini di Dashboard)
export const GOLD_PRICE_HISTORY = [
  1918400, 1925900, 1931000, 1922700, 1938500, 1940100, 1945200,
];

// Harga buyback (jual) — sedikit lebih rendah dari harga beli (spread 1%), sesuai blueprint
export const BUYBACK_SPREAD = 0.01;
export const BUYBACK_PRICE_PER_GRAM = Math.round(
  GOLD_PRICE_PER_GRAM * (1 - BUYBACK_SPREAD)
);

export const BANK_ACCOUNT = {
  bank: "BRI",
  masked: "···· 8817",
  holder: "Ritchie Ramadhan",
};

export const INITIAL_BALANCE_GRAM = 2.518;

export const INITIAL_TRANSACTIONS = [
  {
    id: "TRX-88112",
    type: "beli",
    gram: 0.2571,
    amount: 500000,
    date: "2026-07-15T08:12:00",
    status: "berhasil",
    method: "QRIS",
  },
  {
    id: "TRX-88109",
    type: "token",
    gram: 3,
    amount: 3 * GOLD_PRICE_PER_GRAM,
    date: "2026-07-10T10:00:00",
    status: "berhasil",
    method: "Konversi ke hGOLD",
  },
  {
    id: "TRX-88101",
    type: "beli",
    gram: 0.5142,
    amount: 1000000,
    date: "2026-07-01T07:30:00",
    status: "berhasil",
    method: "Autodebet — Target Haji",
  },
  {
    id: "TRX-87950",
    type: "fisik",
    gram: 5,
    amount: 5 * GOLD_PRICE_PER_GRAM,
    date: "2026-06-28T13:00:00",
    status: "berhasil",
    method: "Cetak fisik 5 gr",
  },
  {
    id: "TRX-87890",
    type: "jual",
    gram: 1,
    amount: BUYBACK_PRICE_PER_GRAM,
    date: "2026-06-14T09:00:00",
    status: "berhasil",
    method: "Buyback ke BRI",
  },
  {
    id: "TRX-87820",
    type: "beli",
    gram: 1.028,
    amount: 2000000,
    date: "2026-06-05T11:05:00",
    status: "berhasil",
    method: "QRIS",
  },
  {
    id: "TRX-87790",
    type: "beli",
    gram: 0.771,
    amount: 1500000,
    date: "2026-05-28T14:22:00",
    status: "berhasil",
    method: "QRIS",
  },
];

// Target/Nabung Rutin (dummy, sesuai blueprint layar "Nabung Rutin & Target")
export const SAVINGS_GOALS = [
  {
    id: "goal-haji",
    icon: "🕋",
    name: "Tabungan Haji",
    currentGram: 31.2,
    targetGram: 85,
    autodebetAmount: 1000000,
    schedule: "tiap tanggal 1",
    estimasi: "estimasi tuntas Mar 2031",
    featured: true,
  },
  {
    id: "goal-pendidikan",
    icon: "🎓",
    name: "Pendidikan Anak",
    currentGram: 8.7,
    targetGram: 50,
    autodebetAmount: 500000,
    schedule: "tiap tanggal 25",
    estimasi: null,
    featured: false,
  },
];
