# HaloGold — Technical Test Front End Web Developer

Prototipe web sederhana untuk studi kasus **HaloGold** (aplikasi investasi emas digital, BRD PT Sharing Vision Indonesia), dibuat sebagai bagian dari Technical Test Front End Web Developer.

## Tech Stack

- **Next.js 16** (App Router)
- **React** (state management dengan Context API — `useState` + `useEffect`, disimpan ke `localStorage` agar saldo & transaksi tidak hilang saat pindah halaman)
- **Tailwind CSS v4** untuk styling & responsive layout
- Data **dummy/statis** (`lib/dummyData.js`) — tidak ada backend/API asli, sesuai ketentuan studi kasus

## Struktur Project

```
halogold-app/
├── app/
│   ├── layout.js          # Root layout, bungkus AppProvider, font premium
│   ├── page.js             # Redirect otomatis ke /login
│   ├── globals.css         # Design tokens (warna, font) sesuai UI/UX Blueprint resmi
│   ├── login/page.js       # Halaman Login (validasi input, tanpa autentikasi nyata)
│   ├── dashboard/page.js   # Beranda — saldo, tren harga, aksi cepat, aktivitas terakhir
│   ├── beli-emas/page.js   # Beli Emas — alur 2 langkah (form → QRIS → sukses)
│   ├── jual-emas/page.js   # Jual Emas (buyback) — estimasi dana & rekening tujuan
│   ├── nabung/page.js      # Nabung Rutin & Target — progress tabungan
│   ├── riwayat/page.js     # Riwayat transaksi lengkap, filter & grup per bulan
│   ├── profil/page.js      # Profil & Keamanan
│   └── segera-hadir/page.js # Placeholder modul roadmap (hGOLD Token, Cetak Fisik, dll)
├── components/
│   ├── Header.js           # Navbar (logo, nama user, tombol keluar)
│   ├── BottomNav.js        # Tab navigasi bawah (Beranda/Pasar/Riwayat/Profil + FAB Beli)
│   ├── StatCard.js         # Card statistik (saldo, harga emas)
│   ├── SparkChart.js       # Grafik mini tren harga emas (custom SVG)
│   └── TransactionRow.js   # Baris item transaksi (beli/jual/token/fisik)
└── lib/
    ├── AppContext.js       # State management global (saldo, transaksi, buyGold, sellGold)
    ├── dummyData.js         # Data dummy (user, harga emas, transaksi, target tabungan)
    └── format.js            # Helper format Rupiah, gram, tanggal
```

## Fitur yang Diimplementasikan

**Wajib sesuai spesifikasi Technical Test:**
1. **Login** — validasi input, tanpa autentikasi nyata
2. **Dashboard** — nama, saldo emas, harga emas hari ini, tombol beli, 5 transaksi terakhir
3. **Beli Emas** — input nominal, kalkulasi gram otomatis, konfirmasi, notifikasi sukses

**Pengembangan tambahan** (mengacu ke UI/UX Blueprint resmi HaloGold, di luar minimum spesifikasi):
4. **Jual Emas (Buyback)** — input gram, estimasi dana diterima (harga buyback + spread), rekening tujuan
5. **Nabung Rutin & Target** — progress tabungan emas per tujuan (Haji, Pendidikan, dll)
6. **Riwayat Transaksi** — daftar lengkap dengan filter kategori & pengelompokan per bulan
7. **Profil & Keamanan** — info akun, status KYC, pengaturan keamanan
8. **Alur pembayaran QRIS** — simulasi 2 langkah (form → scan QRIS → sukses), dengan price-lock countdown
9. **Bottom navigation** — akses cepat antar modul utama, sesuai pola tab bar di blueprint
10. Modul lanjutan (hGOLD Token, Cetak Fisik, Kado Emas, Pasar) ditampilkan sebagai **halaman "Segera Hadir"** — placeholder yang menunjukkan pemahaman terhadap information architecture produk penuh, tanpa memaksakan implementasi fitur kompleks (KYC, on-chain token, dsb.) di luar cakupan technical test 8 jam.

## Cara Menjalankan

```bash
# 1. Install dependencies
npm install

# 2. Jalankan development server
npm run dev

# 3. Buka di browser
http://localhost:3000
```

Build production (opsional, untuk verifikasi):

```bash
npm run build
npm run start
```

## Catatan Implementasi

- State (saldo emas & riwayat transaksi) dikelola lewat React Context (`lib/AppContext.js`) dan disimpan ke `localStorage` browser, sehingga transaksi baru langsung terlihat di Dashboard tanpa reload/backend.
- Seluruh data (harga emas, saldo awal, transaksi awal) adalah data dummy statis di `lib/dummyData.js`, sesuai ketentuan studi kasus yang mengizinkan dummy JSON.
- Desain (warna cream/gold/ink, tipografi Georgia serif untuk angka & judul, gaya kartu & tombol) mengikuti sistem desain pada UI/UX Blueprint resmi HaloGold, supaya konsisten dengan arahan visual tim produk.
- Dibangun dengan bantuan AI (sesuai ketentuan test), dan seluruh kode telah dipahami untuk keperluan penjelasan pada sesi interview.
