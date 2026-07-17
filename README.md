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
│   ├── layout.js          # Root layout, bungkus AppProvider
│   ├── page.js             # Redirect otomatis ke /login
│   ├── globals.css         # Design tokens (warna, font) tema gold/fintech
│   ├── login/page.js       # Halaman Login (validasi input, tanpa autentikasi nyata)
│   ├── dashboard/page.js   # Halaman Dashboard
│   └── beli-emas/page.js   # Halaman Beli Emas
├── components/
│   ├── Header.js           # Navbar (logo, nama user, tombol keluar)
│   ├── StatCard.js         # Card statistik (saldo, harga emas)
│   └── TransactionRow.js   # Baris item transaksi
└── lib/
    ├── AppContext.js       # State management global (saldo, transaksi, fungsi buyGold)
    ├── dummyData.js        # Data dummy (user, harga emas, transaksi awal)
    └── format.js           # Helper format Rupiah, gram, tanggal
```

## Fitur yang Diimplementasikan

**1. Login**
- Input Email & Password dengan validasi (format email, panjang minimal password)
- Tombol Login langsung mengarahkan ke Dashboard (tanpa proses autentikasi nyata, sesuai ketentuan)

**2. Dashboard**
- Nama pengguna
- Saldo emas (dummy, dalam gram + estimasi Rupiah)
- Harga emas hari ini (dummy)
- Tombol "Beli Emas"
- Daftar 5 transaksi terakhir

**3. Beli Emas**
- Input nominal Rupiah (dengan pemformatan ribuan otomatis)
- Kalkulasi otomatis jumlah gram berdasarkan harga emas
- Tombol Konfirmasi
- Notifikasi "Transaksi Berhasil" setelah konfirmasi, saldo & daftar transaksi ter-update langsung (state management)

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
