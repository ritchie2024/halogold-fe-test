// Dummy data source. Studi kasus BRD mengizinkan penggunaan dummy JSON,
// jadi seluruh nilai di file ini adalah data statis/simulasi (bukan API asli).

export const CURRENT_USER = {
  name: "Ritchie Ramadhan",
  email: "ritchie.ramadhan@gmail.com",
};

// Harga emas per gram (contoh nilai sesuai BRD)
export const GOLD_PRICE_PER_GRAM = 1945200;

// Tren harga 7 hari terakhir (dummy, dipakai untuk grafik mini di beberapa tempat)
export const GOLD_PRICE_HISTORY = [
  1918400, 1925900, 1931000, 1922700, 1938500, 1940100, 1945200,
];

// Tren harga per rentang waktu — untuk grafik interaktif di Beranda (sesuai blueprint layar 03)
export const GOLD_PRICE_RANGES = {
  "1H": {
    label: "1 Hari",
    startLabel: "09:00",
    midLabel: "13:00",
    endLabel: "17:00",
    data: [1941800, 1942600, 1943100, 1942200, 1944000, 1944700, 1945200],
  },
  "1B": {
    label: "1 Bulan",
    startLabel: "15 Jun",
    midLabel: "30 Jun",
    endLabel: "15 Jul",
    data: [
      1889500, 1896200, 1902800, 1898100, 1911400, 1918400, 1925900, 1931000,
      1922700, 1938500, 1940100, 1945200,
    ],
  },
  "3B": {
    label: "3 Bulan",
    startLabel: "17 Apr",
    midLabel: "1 Jun",
    endLabel: "17 Jul",
    data: [
      1812300, 1834600, 1829100, 1856700, 1871200, 1868900, 1889500, 1902800,
      1911400, 1925900, 1938500, 1945200,
    ],
  },
  "1T": {
    label: "1 Tahun",
    startLabel: "Jul 2025",
    midLabel: "Jan 2026",
    endLabel: "Jul 2026",
    data: [
      1612400, 1648900, 1671200, 1659800, 1698300, 1734600, 1762100, 1789400,
      1823700, 1856700, 1902800, 1945200,
    ],
  },
  "5T": {
    label: "5 Tahun",
    startLabel: "2021",
    midLabel: "2023",
    endLabel: "2026",
    data: [
      986200, 1042100, 1128400, 1189700, 1245300, 1312600, 1398200, 1487900,
      1589400, 1698300, 1823700, 1945200,
    ],
  },
};

// Harga buyback (jual) — sedikit lebih rendah dari harga beli (spread 1%), sesuai blueprint
export const BUYBACK_SPREAD = 0.01;
export const BUYBACK_PRICE_PER_GRAM = Math.round(
  GOLD_PRICE_PER_GRAM * (1 - BUYBACK_SPREAD)
);

// Pertumbuhan saldo bulan ini (dummy) — dipakai di kartu Total Tabungan Emas
export const BALANCE_MONTHLY_GROWTH_PCT = 2.1;

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
    statusNote: "Selesai",
  },
  {
    id: "TRX-88109",
    type: "token",
    gram: 3,
    amount: 3 * GOLD_PRICE_PER_GRAM,
    date: "2026-07-10T10:00:00",
    status: "berhasil",
    method: "Konversi ke hGOLD",
    statusNote: "on-chain \u2713",
  },
  {
    id: "TRX-88101",
    type: "beli",
    gram: 0.5142,
    amount: 1000000,
    date: "2026-07-01T07:30:00",
    status: "berhasil",
    method: "Autodebet \u2014 Target Haji \u00b7 BRI \u00b7\u00b7\u00b78817",
  },
  {
    id: "TRX-87950",
    type: "fisik",
    gram: 5,
    amount: 5 * GOLD_PRICE_PER_GRAM,
    date: "2026-06-28T13:00:00",
    status: "berhasil",
    method: "Cetak fisik 5 gr",
    statusNote: "diterima \u2713 \u00b7 resi terasuransi",
  },
  {
    id: "TRX-87890",
    type: "jual",
    gram: 1,
    amount: BUYBACK_PRICE_PER_GRAM,
    date: "2026-06-14T09:00:00",
    status: "berhasil",
    method: "Buyback ke BRI",
    statusNote: "cair < 10 mnt",
  },
  {
    id: "TRX-87860",
    type: "kado",
    gram: 0.5,
    amount: 0.5 * GOLD_PRICE_PER_GRAM,
    date: "2026-06-06T16:20:00",
    status: "berhasil",
    method: "Kado untuk Ibu Aminah",
    statusNote: "diklaim \u2713",
  },
  {
    id: "TRX-87820",
    type: "beli",
    gram: 1.028,
    amount: 2000000,
    date: "2026-06-05T11:05:00",
    status: "berhasil",
    method: "QRIS",
    statusNote: "Selesai",
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

// Denominasi cetak fisik — biaya cetak per keping, sesuai blueprint layar 08
export const PRINT_DENOMINATIONS = [
  { gram: 1, mintingFee: 25000 },
  { gram: 2, mintingFee: 45000 },
  { gram: 5, mintingFee: 95000 },
  { gram: 10, mintingFee: 165000 },
  { gram: 25, mintingFee: 350000 },
];

export const PRINT_PRODUCT_NAME = "EmasKITA";

// Metode penerimaan keping fisik
export const SHIPPING_METHODS = [
  {
    id: "kurir",
    name: "Kurir terasuransi",
    detail: "2\u20134 hari kerja \u00b7 asuransi penuh nilai kiriman",
    cost: 45000,
  },
  {
    id: "gerai",
    name: "Ambil di gerai",
    detail: "147 gerai emas jaringan Hartadinata",
    cost: 0,
  },
];

// hGOLD Token (RWA) — sesuai blueprint layar 09
export const INITIAL_TOKEN_BALANCE = 3;

export const TOKEN_WALLET = {
  chain: "Solana",
  address: "hGLD...9xQZ",
};

export const TOKEN_TRUST_PILLARS = [
  {
    icon: "search",
    title: "Proof-of-Reserve on-chain",
    desc: "Cadangan emas dapat diverifikasi siapa pun, kapan pun",
  },
  {
    icon: "landmark",
    title: "Kepatuhan syariah",
    desc: "Akad & opini DSN-MUI, tanpa bunga",
  },
  {
    icon: "zap",
    title: "Biaya jaringan rendah",
    desc: "Solana \u2014 transfer < Rp 100, final dalam detik",
  },
  {
    icon: "shield",
    title: "Terdaftar & diawasi",
    desc: "Beroperasi dalam kerangka OJK pasca-peralihan aset keuangan digital",
  },
];

// Proof-of-Reserve — sesuai blueprint layar 10
export const RESERVE_DATA = {
  vaultKg: 1.847,
  liabilityKg: 1.804,
  ratioPct: 102.4,
  updatedNote:
    "Diperbarui otomatis tiap 15 menit dari oracle + audit bulanan KAP independen.",
};

export const VERIFICATION_TRAIL = [
  {
    id: "audit",
    icon: "file",
    title: "Audit KAP \u2014 Juni 2026",
    detail: "Opini: sesuai, tanpa pengecualian",
    action: "PDF",
  },
  {
    id: "snapshot",
    icon: "link",
    title: "Snapshot on-chain #4.812",
    detail: "15 Jul 2026 \u00b7 09:30 WIB",
    action: "Lihat",
  },
  {
    id: "video",
    icon: "video",
    title: "Inspeksi brankas (video)",
    detail: "Kunjungan surveyor triwulanan",
    action: "Putar",
  },
];

export const PERSONAL_BATCH = "HTD-2026-B0417";

// Emas Berimbal (Yield) — sesuai blueprint layar 11
export const YIELD_ACTIVE_POSITION = {
  gram: 5,
  tenorMonths: 6,
  jatuhTempo: "12 Des 2026",
  projectedGram: 0.0975,
  projectedPctPerYear: 3.9,
};

export const YIELD_TENOR_OPTIONS = [
  { months: 3, periodRatePct: 1.0 },
  { months: 6, periodRatePct: 1.9 },
  { months: 12, periodRatePct: 3.9 },
];

// Kirim & Kado Emas — sesuai blueprint layar 12
export const GIFT_THEMES = [
  {
    id: "lebaran",
    name: "Lebaran",
    defaultMessage: "Selamat Idul Fitri. Mohon maaf lahir batin 🌙",
  },
  {
    id: "idul-adha",
    name: "Idul Adha",
    defaultMessage: "Selamat Idul Adha. Semoga berkah selalu 💗",
  },
  {
    id: "ulang-tahun",
    name: "Ulang tahun",
    defaultMessage: "Selamat ulang tahun! Semoga panjang umur & sehat selalu 🎂",
  },
  {
    id: "pernikahan",
    name: "Pernikahan",
    defaultMessage: "Selamat menempuh hidup baru, semoga sakinah mawaddah warahmah 💍",
  },
  {
    id: "kelahiran",
    name: "Kelahiran",
    defaultMessage: "Selamat atas kelahiran buah hatinya, semoga jadi anak sholeh/sholeha 👶",
  },
];

// Kontak dummy untuk simulasi lookup nomor HP penerima
export const DUMMY_CONTACTS = {
  "0812": "Ibu Aminah",
  "0813": "Dimas Pratama",
  "0857": "Sari Wulandari",
};
