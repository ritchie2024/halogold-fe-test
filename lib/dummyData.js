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

export const INITIAL_BALANCE_GRAM = 2.518;

export const INITIAL_TRANSACTIONS = [
  {
    id: "TRX-10025",
    type: "beli",
    gram: 0.514,
    amount: 1000000,
    date: "2026-07-14T09:12:00",
    status: "berhasil",
  },
  {
    id: "TRX-10024",
    type: "jual",
    gram: 0.257,
    amount: 500000,
    date: "2026-07-11T16:40:00",
    status: "berhasil",
  },
  {
    id: "TRX-10023",
    type: "beli",
    gram: 1.028,
    amount: 2000000,
    date: "2026-07-05T11:05:00",
    status: "berhasil",
  },
  {
    id: "TRX-10022",
    type: "beli",
    gram: 0.771,
    amount: 1500000,
    date: "2026-06-28T14:22:00",
    status: "berhasil",
  },
  {
    id: "TRX-10021",
    type: "jual",
    gram: 0.514,
    amount: 1000000,
    date: "2026-06-20T08:50:00",
    status: "berhasil",
  },
];
