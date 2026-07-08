# Product Requirements Document (PRD)

# SIMKEU MIQ

### Sistem Informasi Manajemen Keuangan

### Kursus MIQ se-Madura

**Versi Dokumen** : 1.0

**Status** : Draft

**Tanggal** : Juli 2026

**Disusun Oleh** : ChatGPT & Tim Pengembang

---

# Riwayat Revisi

| Versi | Tanggal   | Penulis        | Perubahan      |
| ----- | --------- | -------------- | -------------- |
| 1.0   | Juli 2026 | Tim Pengembang | Draft awal PRD |

---

# Persetujuan

| Jabatan         | Nama | Tanda Tangan |
| --------------- | ---- | ------------ |
| Ketua           |      |              |
| Bendahara       |      |              |
| Sekretaris      |      |              |
| Project Manager |      |              |

---

# Daftar Isi

1. Pendahuluan
2. Latar Belakang
3. Visi Produk
4. Misi Produk
5. Tujuan Produk
6. Ruang Lingkup
7. Di Luar Ruang Lingkup
8. Stakeholder
9. Pengguna Sistem
10. Permasalahan Saat Ini
11. Solusi yang Ditawarkan
12. Kebutuhan Sistem
13. Functional Requirements
14. Non Functional Requirements

---

# 1. Pendahuluan

## 1.1 Deskripsi Produk

SIMKEU MIQ merupakan aplikasi berbasis web yang dirancang untuk membantu pengelolaan keuangan kegiatan **Kursus MIQ se-Madura**.

Aplikasi ini menggantikan proses pencatatan manual menggunakan Microsoft Excel menjadi sistem yang lebih modern, terstruktur, mudah digunakan melalui telepon genggam, dan tetap menggunakan layanan gratis dari Google sebagai media penyimpanan data.

Sistem dirancang agar dapat digunakan oleh panitia tanpa memerlukan kemampuan teknis di bidang komputer.

Seluruh transaksi akan tersimpan secara otomatis ke Google Spreadsheet melalui Google Apps Script sehingga tidak diperlukan server ataupun database berbayar.

---

## 1.2 Latar Belakang

Selama ini pencatatan keuangan dilakukan menggunakan file Excel.

Metode tersebut memiliki beberapa kendala.

- File sering berpindah-pindah perangkat.
- Sulit mengetahui siapa yang terakhir mengubah data.
- Rekapitulasi masih dilakukan secara manual.
- Perhitungan subtotal sering mengalami kesalahan.
- Sulit digunakan melalui telepon genggam.
- Tidak tersedia dashboard kondisi keuangan.
- Tidak tersedia laporan otomatis.
- Sulit melakukan pencarian transaksi.
- Risiko kehilangan data apabila file rusak.
- Sulit melakukan kolaborasi beberapa pengurus secara bersamaan.

Kondisi tersebut menyebabkan proses administrasi menjadi lebih lambat dan meningkatkan potensi kesalahan pencatatan.

---

# 2. Visi Produk

Menjadi sistem pencatatan keuangan digital yang sederhana, modern, gratis, aman, dan mudah digunakan oleh seluruh panitia Kursus MIQ se-Madura untuk meningkatkan transparansi, akurasi, dan efisiensi pengelolaan keuangan kegiatan.

---

# 3. Misi Produk

1. Menghilangkan pencatatan manual menggunakan Excel.
2. Menyediakan sistem yang dapat digunakan langsung melalui HP.
3. Menghasilkan laporan keuangan secara otomatis.
4. Mempermudah bendahara dalam melakukan pencatatan transaksi.
5. Memudahkan ketua memonitor kondisi keuangan secara real-time.
6. Mengurangi kesalahan perhitungan subtotal dan total.
7. Menyediakan histori perubahan data.
8. Memanfaatkan layanan gratis Google agar tidak membutuhkan biaya server.

---

# 4. Tujuan Produk

## Tujuan Bisnis

- Digitalisasi administrasi keuangan Kursus MIQ se-Madura.
- Meningkatkan transparansi penggunaan dana.
- Mempermudah proses audit internal.
- Mengurangi penggunaan dokumen Excel manual.
- Menghasilkan laporan yang lebih cepat.

## Tujuan Pengguna

Pengguna dapat:

- Login ke sistem.
- Menambah transaksi.
- Mengubah transaksi.
- Menghapus transaksi.
- Mencari transaksi.
- Melihat dashboard.
- Melihat grafik pengeluaran.
- Melihat rekapitulasi.
- Mengekspor laporan ke PDF.
- Mengekspor laporan ke Excel.
- Mencetak laporan A4.

---

# 5. Ruang Lingkup (Scope)

Versi pertama aplikasi akan mencakup fitur-fitur berikut.

## Dashboard

- Total pengeluaran.
- Jumlah transaksi.
- Jumlah nomor nota.
- Kategori terbesar.
- Grafik pengeluaran.
- Riwayat transaksi terbaru.

---

## Manajemen Transaksi

Pengguna dapat:

- Menambah transaksi.
- Mengedit transaksi.
- Menghapus transaksi.
- Mencari transaksi.
- Filter berdasarkan kategori.
- Filter berdasarkan tanggal.
- Filter berdasarkan kata kunci.

---

## Rekapitulasi

Sistem menghitung otomatis.

- Subtotal Kesekretariatan.
- Subtotal Konsumsi.
- Subtotal Honorarium & Transportasi.
- Subtotal Perlengkapan Acara.
- Subtotal Publikasi & Dokumentasi.
- Subtotal Lain-lain.
- Grand Total.

---

## Laporan

Sistem menghasilkan:

- Laporan PDF.
- Laporan Excel.
- Print A4.

---

## Login

Sistem menyediakan login menggunakan:

- Username
- Password

---

## Pengguna

Terdapat tiga jenis pengguna.

- Ketua
- Bendahara
- Sekretaris

Pada versi pertama seluruh pengguna memiliki hak akses yang sama.

---

## Penyimpanan

Data transaksi disimpan pada Google Spreadsheet.

Setiap kategori menggunakan satu sheet tersendiri.

---

## Audit Log

Setiap perubahan data akan dicatat.

Informasi yang disimpan.

- Pengguna
- Waktu
- Jenis perubahan
- Nilai lama
- Nilai baru

---

## Dashboard Statistik

Menampilkan.

- Total transaksi
- Jumlah nota
- Total pengeluaran
- Grafik
- Distribusi kategori
- Aktivitas terbaru

---

# 6. Di Luar Ruang Lingkup (Out of Scope)

Versi pertama tidak mencakup.

- Multi kegiatan.
- Multi organisasi.
- Multi cabang.
- Approval berjenjang.
- Integrasi WhatsApp.
- Integrasi Email.
- OCR nota.
- Scan QR.
- Anggaran vs Realisasi.
- Multi mata uang.
- Integrasi bank.
- Pembayaran digital.
- Aplikasi Android native.
- Aplikasi iOS native.

Fitur-fitur tersebut dapat dipertimbangkan pada versi berikutnya.

---

# 7. Stakeholder

## Stakeholder Utama

### Ketua

Tanggung jawab:

- Memantau kondisi keuangan.
- Memastikan transparansi.
- Meninjau laporan.

---

### Bendahara

Tanggung jawab:

- Menginput transaksi.
- Mengedit transaksi.
- Menghapus transaksi.
- Menyusun laporan.
- Menjaga validitas data.

---

### Sekretaris

Tanggung jawab:

- Membantu administrasi.
- Membantu input data.
- Mengecek kesesuaian dokumen.

---

### Tim Pengembang

Tanggung jawab:

- Pengembangan sistem.
- Perbaikan bug.
- Pemeliharaan aplikasi.

---

# 8. Pengguna Sistem

| Pengguna   | Hak Akses                                 |
| ---------- | ----------------------------------------- |
| Ketua      | Login, lihat, tambah, edit, hapus, export |
| Bendahara  | Login, lihat, tambah, edit, hapus, export |
| Sekretaris | Login, lihat, tambah, edit, hapus, export |

---

# 9. Permasalahan Saat Ini

## Permasalahan

### Pencatatan Manual

Masih menggunakan Excel.

---

### Sulit Digunakan di HP

Excel kurang nyaman digunakan pada layar kecil.

---

### Tidak Ada Dashboard

Ketua harus membuka banyak sheet.

---

### Rekap Manual

Subtotal masih dihitung sendiri.

---

### Tidak Ada Riwayat

Tidak diketahui siapa yang mengubah data.

---

### Sulit Mencari Data

Pencarian transaksi memerlukan waktu.

---

### Potensi Kesalahan

Kesalahan rumus Excel dapat menyebabkan laporan tidak sesuai.

---

### Sulit Berkolaborasi

Beberapa pengguna dapat mengubah data tanpa jejak perubahan yang jelas.

---

# 10. Solusi yang Ditawarkan

SIMKEU MIQ menawarkan solusi berupa aplikasi web modern yang:

- Mobile-first.
- Cepat.
- Ringan.
- Gratis.
- Aman.
- Mudah dipelajari.
- Tidak memerlukan instalasi.
- Dapat diakses melalui browser.
- Dapat dipasang sebagai PWA.
- Menggunakan Google Spreadsheet sebagai database.
- Menggunakan Google Apps Script sebagai REST API.
- Menggunakan Google Drive untuk penyimpanan foto nota (opsional).

---

# 11. Kebutuhan Sistem

## Perangkat Pengguna

Minimal.

- Android 10 atau lebih baru.
- iPhone iOS 16 atau lebih baru.
- Laptop Windows 10/11.
- Linux.
- macOS.

---

## Browser

- Chrome
- Edge
- Safari
- Firefox

---

## Internet

Koneksi internet stabil.

Minimal 1 Mbps.

---

## Hosting

Frontend menggunakan Vercel.

Backend menggunakan Google Apps Script.

Database menggunakan Google Spreadsheet.

---

# 12. Functional Requirements

## Modul Login

Sistem harus mampu:

- Login menggunakan username dan password.
- Logout.
- Menampilkan pesan kesalahan apabila login gagal.
- Menyimpan sesi login pengguna.

---

## Modul Dashboard

Sistem harus menampilkan:

- Total Pengeluaran.
- Jumlah Transaksi.
- Jumlah Nota.
- Grafik Pengeluaran.
- Rekap Per Kategori.
- Aktivitas Terbaru.

---

## Modul Transaksi

Sistem harus mampu:

- Menambah transaksi.
- Mengubah transaksi.
- Menghapus transaksi.
- Menghitung jumlah otomatis (Volume × Harga Satuan).
- Menyimpan transaksi pada sheet kategori yang sesuai.

---

## Modul Rekapitulasi

Sistem harus menghitung otomatis.

- Subtotal.
- Grand Total.

---

## Modul Laporan

Sistem harus mampu:

- Export PDF.
- Export Excel.
- Print A4.

---

## Modul Audit

Sistem harus mencatat.

- Siapa yang mengubah.
- Waktu perubahan.
- Nilai lama.
- Nilai baru.

---

# 13. Non Functional Requirements

## Performance

- Halaman terbuka kurang dari 3 detik pada koneksi normal.
- Dashboard dimuat kurang dari 5 detik meskipun data transaksi mencapai ribuan baris.

---

## Availability

- Sistem dapat diakses 24 jam selama layanan Google dan Vercel tersedia.

---

## Security

- Login menggunakan username dan password.
- Komunikasi menggunakan HTTPS.
- Validasi input dilakukan di sisi frontend dan backend.
- Data sensitif tidak ditampilkan kepada pengguna yang belum login.

---

## Reliability

- Perhitungan subtotal dan total harus konsisten dengan data di Google Spreadsheet.
- Kesalahan penyimpanan harus ditangani dengan pesan yang jelas tanpa menyebabkan kehilangan data.

---

## Usability

- Antarmuka dioptimalkan untuk penggunaan satu tangan pada perangkat seluler.
- Tombol utama memiliki ukuran yang mudah disentuh.
- Formulir sederhana dan minim langkah.
- Navigasi mudah dipahami oleh pengguna non-teknis.

---

## Maintainability

- Kode dipisahkan menjadi komponen yang modular.
- Struktur proyek mengikuti praktik terbaik React + Vite.
- Konfigurasi Google Apps Script terdokumentasi dengan baik untuk memudahkan pemeliharaan.

---

**Akhir Bagian 1**

# 02. Business Requirements & Functional Requirements (Ringkas)

# SIMKEU MIQ

**Sistem Informasi Manajemen Keuangan Kursus MIQ se-Madura**

---

# 2.1 Business Rules

## BR-001 Login

- Pengguna wajib login sebelum menggunakan aplikasi.
- Username bersifat unik.
- Password dapat diubah oleh admin melalui Google Spreadsheet.
- Session login disimpan pada browser.

---

## BR-002 Pengguna

Pengguna terdiri dari:

- Ketua
- Bendahara
- Sekretaris

Seluruh pengguna memiliki hak akses yang sama.

---

## BR-003 Kategori

Kategori bersifat tetap.

1. Kesekretariatan
2. Konsumsi
3. Honorarium & Transportasi
4. Perlengkapan Acara
5. Publikasi & Dokumentasi
6. Lain-lain

Kategori tidak dapat ditambah maupun dihapus melalui aplikasi.

---

## BR-004 Penyimpanan Data

- Database menggunakan Google Spreadsheet.
- Setiap kategori memiliki satu sheet.
- Sheet Rekap dihitung otomatis.
- Sheet Log menyimpan histori perubahan.

---

## BR-005 Transaksi

Setiap transaksi wajib memiliki:

- Tanggal
- Kategori
- Uraian
- Volume
- Satuan
- Harga Satuan

Opsional:

- Nomor Nota
- Foto Nota
- Catatan

Jumlah dihitung otomatis.

```
Jumlah = Volume × Harga Satuan
```

---

## BR-006 Foto Nota

Upload foto bersifat opsional.

Apabila tidak diunggah, sistem menampilkan pengingat:

> "Pastikan nota fisik disimpan sebagai bukti transaksi."

---

## BR-007 Rekapitulasi

Subtotal dihitung berdasarkan kategori.

Grand Total dihitung dari seluruh subtotal.

---

## BR-008 Export

Sistem dapat menghasilkan:

- PDF
- Excel (.xlsx)
- Print A4

---

## BR-009 Audit Log

Setiap perubahan data dicatat.

Data yang disimpan:

- User
- Waktu
- Aksi
- Data lama
- Data baru

---

# 2.2 User Stories

### Sebagai Bendahara

Saya ingin mencatat pengeluaran dengan cepat melalui HP agar tidak perlu membuka Excel.

---

### Sebagai Ketua

Saya ingin melihat total pengeluaran kapan saja agar dapat memonitor kondisi keuangan.

---

### Sebagai Sekretaris

Saya ingin membantu menginput transaksi sehingga pekerjaan bendahara lebih ringan.

---

### Sebagai Pengguna

Saya ingin mencari transaksi berdasarkan uraian atau tanggal agar mudah menemukan data lama.

---

### Sebagai Pengguna

Saya ingin mencetak laporan keuangan sehingga dapat dilampirkan pada LPJ.

---

### Sebagai Pengguna

Saya ingin mengunduh laporan dalam format Excel agar dapat diolah lebih lanjut.

---

### Sebagai Pengguna

Saya ingin melihat grafik pengeluaran agar mengetahui kategori dengan pengeluaran terbesar.

---

# 2.3 User Flow

```
Login

↓

Dashboard

↓

Pilih Menu

↓

Tambah Transaksi

↓

Isi Form

↓

Hitung Otomatis

↓

Simpan

↓

Google Apps Script

↓

Google Spreadsheet

↓

Dashboard Terupdate
```

---

# 2.4 Struktur Data

## User

- Username
- Password
- Nama
- Jabatan
- Status

---

## Transaksi

- Tanggal
- Kategori
- Uraian
- Volume
- Satuan
- Harga
- Jumlah
- Nomor Nota
- Foto Nota
- Catatan
- Dibuat Oleh
- Dibuat Pada

---

## Rekap

- Nama Kategori
- Subtotal
- Persentase
- Total Keseluruhan

---

## Log Aktivitas

- User
- Waktu
- Jenis Aksi
- Data Lama
- Data Baru

---

# 2.5 Functional Requirements

## Authentication

- Login
- Logout
- Session Login
- Validasi Password

---

## Dashboard

Menampilkan:

- Total Pengeluaran
- Jumlah Transaksi
- Jumlah Nota
- Kategori Terbesar
- Grafik Pengeluaran
- Aktivitas Terbaru

---

## Transaksi

Pengguna dapat:

- Menambah transaksi
- Mengedit transaksi
- Menghapus transaksi
- Melihat detail transaksi
- Mencari transaksi
- Filter berdasarkan kategori
- Filter berdasarkan tanggal
- Filter berdasarkan kata kunci

---

## Form Input

Field yang tersedia:

- Tanggal
- Kategori
- Uraian
- Volume
- Satuan
- Harga Satuan
- Jumlah (otomatis)
- Nomor Nota
- Foto Nota
- Catatan

---

## Validasi

- Tanggal wajib diisi
- Kategori wajib dipilih
- Uraian wajib diisi
- Volume > 0
- Harga > 0
- Jumlah dihitung otomatis
- Nomor nota boleh kosong

---

## Rekap

Sistem otomatis menghitung:

- Total Kesekretariatan
- Total Konsumsi
- Total Honorarium
- Total Perlengkapan
- Total Publikasi
- Total Lain-lain
- Grand Total

---

## Laporan

Pengguna dapat:

- Melihat laporan
- Export PDF
- Export Excel
- Print A4

---

## Audit

Sistem mencatat:

- Tambah Data
- Edit Data
- Hapus Data

---

## Spreadsheet

Sheet yang digunakan:

```
USER

KESEKRETARIATAN

KONSUMSI

HONORARIUM

PERLENGKAPAN

PUBLIKASI

LAIN-LAIN

REKAP

LOG

SETTING
```

---

# 2.6 Non Functional Requirements

## Performance

- Waktu buka aplikasi < 3 detik.
- Simpan transaksi < 2 detik.
- Dashboard < 5 detik.

---

## Security

- HTTPS
- Validasi Input
- Session Login
- Tidak ada data yang dapat diakses tanpa login.

---

## Reliability

- Perhitungan otomatis.
- Tidak ada kehilangan data saat penyimpanan.
- Rekap selalu sinkron dengan Spreadsheet.

---

## Compatibility

Mendukung:

- Android
- iPhone
- Windows
- Linux
- macOS

Browser:

- Chrome
- Edge
- Firefox
- Safari

---

## UI/UX

- Mobile First
- Responsive
- Dark Mode
- Light Mode
- Bottom Navigation
- Card Modern
- Material Symbols Rounded
- Animasi halus
- Mudah digunakan satu tangan

---

# 2.7 Acceptance Criteria

Aplikasi dianggap selesai apabila:

- Pengguna dapat login.
- Dashboard menampilkan ringkasan keuangan.
- Pengguna dapat CRUD transaksi.
- Jumlah dihitung otomatis.
- Data tersimpan di Google Spreadsheet.
- Rekap dihitung otomatis.
- Riwayat perubahan tercatat.
- Laporan dapat diekspor ke PDF.
- Laporan dapat diekspor ke Excel.
- Laporan dapat dicetak ukuran A4.
- Aplikasi responsif di perangkat mobile.
- Berjalan stabil di Vercel.
- Tidak memerlukan server berbayar.
- Menggunakan Google Spreadsheet sebagai database utama.
- Menggunakan Google Apps Script sebagai REST API.

# 03. UI / UX Specification

# SIMKEU MIQ

**Sistem Informasi Manajemen Keuangan Kursus MIQ se-Madura**

---

# 3.1 Design Philosophy

SIMKEU MIQ dirancang dengan prinsip **Mobile First**, karena mayoritas pengguna (Ketua, Bendahara, dan Sekretaris) akan mengakses aplikasi melalui telepon genggam.

Desain harus sederhana, cepat dipahami, nyaman digunakan dalam waktu lama, dan meminimalkan jumlah langkah untuk melakukan pencatatan transaksi.

### Prinsip Desain

- Mobile First
- Clean Interface
- Fast Interaction
- Simple Navigation
- Large Touch Area
- Minimal Learning Curve
- Consistent Design
- Accessible
- Responsive
- Lightweight

---

# 3.2 Design Language

## Gaya Desain

Menggunakan gaya modern yang terinspirasi dari:

- Google Material Design 3
- iOS Human Interface Guidelines
- Notion
- Linear
- Google Finance

Karakteristik:

- Banyak ruang kosong (Whitespace)
- Card besar
- Sudut membulat (Rounded XL)
- Shadow lembut
- Ikon sederhana
- Animasi ringan
- Typography jelas

---

# 3.3 Color Palette

## Primary

Hijau (Keuangan)

```
#16A34A
```

---

## Secondary

Biru

```
#2563EB
```

---

## Success

```
#22C55E
```

---

## Warning

```
#F59E0B
```

---

## Error

```
#EF4444
```

---

## Background

Light

```
#F8FAFC
```

Dark

```
#0F172A
```

---

## Card

Light

```
#FFFFFF
```

Dark

```
#1E293B
```

---

# 3.4 Typography

Font:

```
Inter
```

Alternatif

```
Poppins
```

Ukuran

| Elemen      | Ukuran |
| ----------- | ------ |
| Judul Besar | 32     |
| Judul       | 24     |
| Sub Judul   | 20     |
| Heading     | 18     |
| Body        | 16     |
| Caption     | 14     |
| Small       | 12     |

---

# 3.5 Icon

Menggunakan

- Material Symbols Rounded

atau

- Heroicons

---

# 3.6 Grid System

Desktop

```
12 Column
```

Tablet

```
8 Column
```

Mobile

```
4 Column
```

---

# 3.7 Border Radius

Button

```
16 px
```

Card

```
20 px
```

Dialog

```
24 px
```

Input

```
16 px
```

---

# 3.8 Shadow

Menggunakan shadow lembut.

Tidak menggunakan shadow tebal.

---

# 3.9 Navigation

Mobile menggunakan Bottom Navigation.

```
Dashboard

Transaksi

Tambah

Laporan

Pengaturan
```

Desktop menggunakan Sidebar.

---

# 3.10 Screen List

Aplikasi memiliki halaman berikut.

1 Dashboard

2 Daftar Transaksi

3 Tambah Transaksi

4 Edit Transaksi

5 Detail Transaksi

6 Rekapitulasi

7 Dashboard Grafik

8 Export PDF

9 Export Excel

10 Login

11 Pengguna

12 Pengaturan

13 Riwayat Aktivitas

14 Halaman Error

15 Halaman Tidak Ditemukan

---

# 3.11 Login Screen

Komponen

- Logo MIQ
- Nama Aplikasi
- Username
- Password
- Tombol Login

Flow

```
Login

↓

Validasi

↓

Dashboard
```

Apabila gagal

```
Username atau Password salah
```

---

# 3.12 Dashboard

Komponen

Header

- Nama Pengguna
- Tanggal

---

Card Statistik

- Total Pengeluaran
- Jumlah Transaksi
- Jumlah Nota
- Kategori Terbesar

---

Grafik

- Pie Chart Pengeluaran
- Bar Chart Pengeluaran per Kategori

---

Aktivitas Terbaru

Menampilkan

10 transaksi terakhir

---

Shortcut

Tambah Transaksi

Export

Rekap

---

# 3.13 Daftar Transaksi

Menampilkan

- Tanggal
- Uraian
- Kategori
- Jumlah
- Nomor Nota

Fitur

- Search
- Filter
- Sort
- Infinite Scroll
- Pull To Refresh

---

# 3.14 Tambah Transaksi

Field

Tanggal

Kategori

Uraian

Volume

Satuan

Harga Satuan

Jumlah (otomatis)

Nomor Nota

Catatan

Upload Foto

Button

Simpan

Reset

---

# 3.15 Detail Transaksi

Menampilkan seluruh informasi transaksi.

Button

Edit

Hapus

Print

---

# 3.16 Edit Transaksi

Semua field dapat diubah.

Saat disimpan

↓

Log aktivitas dibuat otomatis.

---

# 3.17 Rekapitulasi

Kategori

Kesekretariatan

↓

Subtotal

---

Konsumsi

↓

Subtotal

---

Honorarium

↓

Subtotal

---

Perlengkapan

↓

Subtotal

---

Publikasi

↓

Subtotal

---

Lain-lain

↓

Subtotal

---

Grand Total

---

# 3.18 Grafik

Menampilkan

Pie Chart

Distribusi Pengeluaran

---

Bar Chart

Pengeluaran per kategori

---

Line Chart

Pengeluaran berdasarkan tanggal

---

# 3.19 Export

Export PDF

↓

Pilih Tanggal

↓

Generate

↓

Download

---

Export Excel

↓

Generate

↓

Download

---

Print

↓

Preview

↓

Cetak

---

# 3.20 Pengguna

Daftar

Ketua

Bendahara

Sekretaris

Data

Nama

Username

Password

Status

---

# 3.21 Pengaturan

Tema

- Light
- Dark
- System

Pengingat Foto Nota

ON

OFF

Nama Organisasi

Kursus MIQ se-Madura

---

# 3.22 Riwayat Aktivitas

Menampilkan

Tanggal

User

Aktivitas

Data Lama

Data Baru

---

# 3.23 Loading State

Menggunakan

Skeleton Loading

bukan Spinner penuh.

---

# 3.24 Empty State

Contoh

Belum ada transaksi.

↓

Tambah Transaksi

---

# 3.25 Error State

Contoh

Gagal mengambil data.

↓

Coba Lagi

---

# 3.26 Success State

Contoh

✓

Data berhasil disimpan.

---

# 3.27 Validation

Field wajib

↓

Border merah

↓

Pesan validasi

Contoh

```
Uraian wajib diisi
```

---

# 3.28 Responsive

Desktop

Sidebar

-

Content

---

Tablet

Sidebar Collapse

---

Mobile

Bottom Navigation

---

# 3.29 Accessibility

- Kontras warna memadai
- Tombol minimal tinggi 48 px
- Ikon mudah dikenali
- Fokus keyboard pada desktop
- Label input jelas

---

# 3.30 Animasi

Animasi ringan menggunakan Framer Motion.

- Fade In
- Slide Up
- Scale
- Hover
- Page Transition

Durasi maksimal 300 ms.

---

# 3.31 Komponen UI

Komponen yang digunakan:

- App Bar
- Bottom Navigation
- Sidebar
- Card
- Button
- Icon Button
- Floating Action Button
- Text Field
- Dropdown
- Date Picker
- Search Bar
- Dialog
- Modal
- Snackbar / Toast
- Tooltip
- Table
- Badge
- Chip
- Divider
- Tabs
- Accordion
- Progress Bar
- Skeleton Loader
- Empty State
- Confirmation Dialog
- File Upload
- Image Preview
- Chart Card

---

# 3.32 Prinsip UX

Aplikasi harus memungkinkan bendahara mencatat transaksi baru dalam waktu kurang dari **30 detik** dengan langkah berikut:

1. Tekan tombol **Tambah**.
2. Isi tanggal (otomatis hari ini, dapat diubah).
3. Pilih kategori.
4. Isi uraian.
5. Isi volume dan harga satuan.
6. Jumlah dihitung otomatis.
7. Tambahkan nomor nota dan catatan bila diperlukan.
8. Tekan **Simpan**.

Targetnya, seluruh alur dapat dilakukan hanya dengan satu tangan pada perangkat seluler.

---

# 3.33 Standar Respons

- Waktu berpindah halaman: < 300 ms (setelah data tersedia).
- Waktu tampil toast notifikasi: 2–3 detik.
- Formulir tetap responsif saat proses penyimpanan berlangsung.
- Pengguna selalu mendapatkan umpan balik untuk setiap aksi (berhasil, gagal, atau sedang memproses).

---

# Ringkasan

Desain UI/UX SIMKEU MIQ berfokus pada:

- **Cepat** untuk input transaksi.
- **Nyaman** digunakan di HP.
- **Modern** dengan tampilan bersih.
- **Konsisten** di seluruh halaman.
- **Mudah dipelajari** oleh pengguna non-teknis.
- **Siap berkembang** untuk penambahan fitur pada versi berikutnya.

# 04. System Architecture & Technical Specification (SDS Ringkas)

# SIMKEU MIQ

**Sistem Informasi Manajemen Keuangan Kursus MIQ se-Madura**

---

# 4.1 Tujuan Arsitektur

Arsitektur sistem dirancang agar:

- Gratis 100%
- Mudah dipelihara
- Aman
- Cepat
- Tidak memerlukan VPS
- Tidak memerlukan database berbayar
- Mudah dikembangkan pada masa depan
- Mampu melayani banyak pengguna secara bersamaan

---

# 4.2 Arsitektur Sistem

```text
                  USER

      Ketua | Bendahara | Sekretaris
                    │
                    ▼
         React + Vite (Frontend)
                    │
          Axios (HTTPS Request)
                    │
                    ▼
      Google Apps Script REST API
                    │
        ┌───────────┼────────────┐
        │           │            │
        ▼           ▼            ▼
 Google Spreadsheet Google Drive Logger
(Database)        (Foto Nota)   (Audit)
```

---

# 4.3 Teknologi

## Frontend

- React 19
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- TanStack Query
- React Hook Form
- Zod
- Framer Motion
- Heroicons
- React Hot Toast

---

## Backend

Google Apps Script

Fungsi:

- REST API
- Validasi
- CRUD
- Export
- Login
- Audit Log

---

## Database

Google Spreadsheet

---

## Hosting

Frontend

Vercel

Backend

Google Apps Script

---

## Penyimpanan File

Google Drive

Opsional

Foto Nota

---

# 4.4 Struktur Folder Frontend

```text
src/

│

├── assets/

├── components/

│      ├── ui/

│      ├── dashboard/

│      ├── transaction/

│      ├── report/

│      └── common/

│

├── layouts/

│

├── pages/

│      ├── Login/

│      ├── Dashboard/

│      ├── Transaction/

│      ├── Report/

│      ├── Setting/

│      └── User/

│

├── hooks/

├── services/

├── context/

├── routes/

├── utils/

├── constants/

├── types/

├── styles/

├── App.jsx

└── main.jsx
```

---

# 4.5 Struktur Google Spreadsheet

```text
SIMKEU-MIQ

│

├── USER

├── KESEKRETARIATAN

├── KONSUMSI

├── HONORARIUM

├── PERLENGKAPAN

├── PUBLIKASI

├── LAIN-LAIN

├── REKAP

├── LOG

└── SETTING
```

---

# 4.6 Struktur Sheet USER

| Kolom    | Keterangan                 |
| -------- | -------------------------- |
| ID       | Nomor User                 |
| Username | Login                      |
| Password | Password                   |
| Nama     | Nama Lengkap               |
| Jabatan  | Ketua/Bendahara/Sekretaris |
| Status   | Aktif/Nonaktif             |

---

# 4.7 Struktur Sheet Transaksi

Setiap sheet kategori memiliki struktur sama.

| Kolom       | Keterangan        |
| ----------- | ----------------- |
| ID          | Nomor             |
| Tanggal     | Tanggal transaksi |
| Uraian      | Deskripsi         |
| Volume      | Jumlah            |
| Satuan      | Orang/Buah/dll    |
| Harga       | Harga satuan      |
| Total       | Volume × Harga    |
| Nomor Nota  | Opsional          |
| Catatan     | Opsional          |
| Foto        | Link Google Drive |
| Dibuat Oleh | Username          |
| Dibuat Pada | Timestamp         |

---

# 4.8 Sheet Rekap

Berisi

- Nama kategori
- Subtotal
- Persentase
- Grand Total

Data dihitung otomatis.

---

# 4.9 Sheet Log

Berisi

| Kolom     | Isi               |
| --------- | ----------------- |
| Waktu     | Timestamp         |
| User      | Username          |
| Aktivitas | Tambah/Edit/Hapus |
| Sheet     | Nama Sheet        |
| Data Lama | JSON              |
| Data Baru | JSON              |

---

# 4.10 Struktur API

## Authentication

```text
POST

/api/login
```

---

## Dashboard

```text
GET

/api/dashboard
```

---

## Semua Transaksi

```text
GET

/api/transactions
```

---

## Tambah

```text
POST

/api/transaction
```

---

## Update

```text
PUT

/api/transaction/{id}
```

---

## Delete

```text
DELETE

/api/transaction/{id}
```

---

## Rekap

```text
GET

/api/rekap
```

---

## Export PDF

```text
GET

/api/export/pdf
```

---

## Export Excel

```text
GET

/api/export/excel
```

---

## Upload Foto

```text
POST

/api/upload
```

---

# 4.11 Format Response API

Success

```json
{
  "success": true,
  "message": "Data berhasil disimpan",
  "data": {}
}
```

---

Error

```json
{
  "success": false,
  "message": "Data gagal disimpan"
}
```

---

# 4.12 Validasi Backend

Sebelum data disimpan.

Sistem memeriksa:

- Login
- Field wajib
- Harga > 0
- Volume > 0
- Kategori valid
- Format tanggal
- Total sesuai

---

# 4.13 Validasi Frontend

Realtime Validation

Contoh

✓

Harga valid

atau

❌

Harga harus lebih dari nol.

---

# 4.14 Perhitungan

```text
TOTAL

=

VOLUME

×

HARGA SATUAN
```

---

Grand Total

```text
Kesekretariatan

+

Konsumsi

+

Honorarium

+

Perlengkapan

+

Publikasi

+

Lain-lain
```

---

# 4.15 Authentication

Flow

```text
Login

↓

Apps Script

↓

Google Spreadsheet USER

↓

Valid

↓

Dashboard
```

---

# 4.16 Session

Browser menyimpan

- Token Session
- Username
- Nama
- Jabatan

Session otomatis dihapus saat logout.

---

# 4.17 Error Handling

Contoh

Internet Putus

↓

Toast

"Gagal terhubung ke server."

---

Spreadsheet Error

↓

Toast

"Terjadi kesalahan penyimpanan."

---

Session Expired

↓

Login kembali.

---

# 4.18 Logging

Setiap aktivitas dicatat.

- Login
- Logout
- Tambah
- Edit
- Hapus
- Export

---

# 4.19 Security

- HTTPS
- Input Validation
- Output Sanitization
- Session Validation
- Token Verification
- Tidak menampilkan password pada respons API
- Escape karakter khusus untuk mencegah injeksi formula ke Spreadsheet

---

# 4.20 Performance

Target

Dashboard

< 3 detik

Tambah transaksi

< 2 detik

Export

< 10 detik

---

# 4.21 Backup

Data utama berada di Google Spreadsheet.

Disarankan:

- Backup otomatis harian.
- Backup mingguan ke file Excel.
- Backup bulanan ke PDF sebagai arsip LPJ.

---

# 4.22 Deployment

Frontend

Vercel

↓

Domain

↓

HTTPS

↓

Google Apps Script

↓

Spreadsheet

---

# 4.23 Monitoring

Yang dipantau

- Error API
- Gagal Login
- Gagal Simpan
- Gagal Export
- Waktu Respons
- Jumlah Pengguna Aktif

---

# 4.24 Future Scalability

Arsitektur dirancang agar dapat dikembangkan menjadi:

- Multi Kegiatan
- Multi Cabang
- Multi Organisasi
- Role Based Access
- Approval Ketua
- OCR Nota
- Scan QR
- Dashboard Real Time
- Progressive Web App Offline
- Notifikasi WhatsApp
- Integrasi Google Calendar
- Integrasi Email

Tanpa mengubah struktur dasar aplikasi.

---

# 4.25 Standar Pengembangan

## Penamaan

- Komponen React menggunakan PascalCase.
- Fungsi menggunakan camelCase.
- Konstanta menggunakan UPPER_SNAKE_CASE.
- Nama sheet menggunakan huruf kapital.
- API menggunakan format RESTful.

## Kualitas Kode

- Komponen maksimal memiliki satu tanggung jawab utama.
- Hindari duplikasi logika.
- Seluruh fungsi memiliki penanganan error.
- Gunakan TypeScript pada versi berikutnya untuk meningkatkan keamanan tipe data.

---

# Ringkasan

Arsitektur SIMKEU MIQ memanfaatkan **React + Vite** sebagai frontend, **Google Apps Script** sebagai backend, dan **Google Spreadsheet** sebagai database utama. Pendekatan ini menghasilkan sistem yang ringan, gratis, mudah dipelihara, dan cukup andal untuk kebutuhan pencatatan keuangan Kursus MIQ se-Madura tanpa memerlukan server atau layanan database berbayar.

# 05. API Specification (Google Apps Script REST API)

# SIMKEU MIQ

**Sistem Informasi Manajemen Keuangan Kursus MIQ se-Madura**

---

# 5.1 Tujuan API

REST API berfungsi sebagai penghubung antara aplikasi React dengan Google Spreadsheet.

Seluruh proses:

- Login
- Membaca Data
- Menambah Data
- Mengubah Data
- Menghapus Data
- Rekap
- Export
- Upload Foto

melewati Google Apps Script.

---

# 5.2 Arsitektur API

```text
React + Vite

↓

Axios

↓

Google Apps Script

↓

Google Spreadsheet

↓

Response JSON
```

---

# 5.3 Base URL

```text
https://script.google.com/macros/s/{DEPLOYMENT_ID}/exec
```

---

# 5.4 Format Response

## Success

```json
{
  "success": true,
  "message": "Success",
  "data": {}
}
```

---

## Error

```json
{
  "success": false,
  "message": "Error Message"
}
```

---

# 5.5 Authentication

## Login

Endpoint

```http
POST /login
```

Request

```json
{
  "username": "bendahara",
  "password": "123456"
}
```

Response

```json
{
  "success": true,
  "token": "jwt_or_session_token",
  "user": {
    "nama": "Ahmad",
    "jabatan": "Bendahara"
  }
}
```

---

## Logout

```http
POST /logout
```

Menghapus session pengguna.

---

## Cek Session

```http
GET /me
```

Mengembalikan informasi pengguna yang sedang login.

---

# 5.6 Dashboard API

```http
GET /dashboard
```

Response

```json
{
  "totalPengeluaran": 14500000,
  "jumlahTransaksi": 180,
  "jumlahNota": 130,
  "kategoriTerbesar": "Konsumsi",
  "transaksiTerbaru": []
}
```

---

# 5.7 Transaksi API

## Ambil Semua

```http
GET /transactions
```

Parameter

```text
?page=1

&limit=20

&search=

&kategori=

&tanggal=
```

---

## Detail Transaksi

```http
GET /transaction/{id}
```

---

## Tambah Transaksi

```http
POST /transaction
```

Body

```json
{
  "tanggal": "2026-07-08",
  "kategori": "Konsumsi",
  "uraian": "Makan Siang",
  "volume": 100,
  "satuan": "Orang",
  "harga": 15000,
  "nomorNota": "",
  "catatan": ""
}
```

---

Response

```json
{
  "success": true,
  "message": "Data berhasil disimpan"
}
```

---

## Edit

```http
PUT /transaction/{id}
```

---

## Delete

```http
DELETE /transaction/{id}
```

---

# 5.8 Rekap API

```http
GET /rekap
```

Response

```json
{
  "kesekretariatan": 60550,
  "konsumsi": 4200000,
  "honor": 0,
  "perlengkapan": 0,
  "publikasi": 0,
  "lain": 0,
  "grandTotal": 4260550
}
```

---

# 5.9 Export

## PDF

```http
GET /export/pdf
```

Parameter

```text
tanggal_awal

tanggal_akhir
```

---

## Excel

```http
GET /export/excel
```

---

## Print

```http
GET /print
```

---

# 5.10 Upload Foto

Endpoint

```http
POST /upload
```

Request

Multipart Form

```text
image
```

Response

```json
{
  "url": "https://drive.google..."
}
```

---

# 5.11 User API

## Daftar User

```http
GET /users
```

---

## Detail User

```http
GET /user/{id}
```

---

## Tambah User

```http
POST /user
```

---

## Update User

```http
PUT /user/{id}
```

---

## Hapus User

```http
DELETE /user/{id}
```

---

# 5.12 Log Aktivitas

```http
GET /logs
```

Parameter

```text
page

limit

tanggal

user
```

---

# 5.13 Kategori

```http
GET /categories
```

---

# 5.14 Satuan

```http
GET /units
```

---

# 5.15 Validasi API

Sebelum data diproses.

Sistem memeriksa.

- Login valid
- Token valid
- Username aktif
- Field wajib
- Harga valid
- Volume valid
- Kategori tersedia
- Satuan tersedia

---

# 5.16 HTTP Status

| Status | Arti                 |
| ------ | -------------------- |
| 200    | Berhasil             |
| 201    | Berhasil dibuat      |
| 400    | Data tidak valid     |
| 401    | Belum login          |
| 403    | Akses ditolak        |
| 404    | Data tidak ditemukan |
| 500    | Kesalahan server     |

---

# 5.17 Error Message

Contoh

```json
{
  "success": false,
  "message": "Username atau Password salah."
}
```

```json
{
  "success": false,
  "message": "Kategori tidak ditemukan."
}
```

```json
{
  "success": false,
  "message": "Harga harus lebih dari nol."
}
```

---

# 5.18 Logging

Setiap endpoint mencatat.

- User
- Waktu
- Endpoint
- Status
- Durasi Request

---

# 5.19 Keamanan API

- HTTPS Only
- Validasi Session
- Sanitasi Input
- Pembatasan ukuran upload gambar
- Escape Formula Spreadsheet (mencegah Formula Injection)
- Validasi tipe data sebelum ditulis ke Spreadsheet

---

# 5.20 Struktur Service React

```text
src/services

auth.service.js

dashboard.service.js

transaction.service.js

report.service.js

upload.service.js

user.service.js

setting.service.js
```

---

# 5.21 Struktur Axios

```text
axiosClient

↓

Request Interceptor

↓

Authorization

↓

Google Apps Script

↓

Response Interceptor

↓

Toast Notification
```

---

# 5.22 Flow Login

```text
User

↓

Login

↓

Axios

↓

Apps Script

↓

Spreadsheet USER

↓

Password Valid

↓

Generate Session

↓

Dashboard
```

---

# 5.23 Flow Tambah Transaksi

```text
User

↓

Isi Form

↓

Validasi React

↓

Axios

↓

Apps Script

↓

Validasi Backend

↓

Hitung Total

↓

Simpan Spreadsheet

↓

Update Rekap

↓

Simpan Log

↓

Response Berhasil
```

---

# 5.24 Flow Edit

```text
Pilih Data

↓

Edit

↓

Validasi

↓

Update Spreadsheet

↓

Update Rekap

↓

Tambah Log

↓

Success
```

---

# 5.25 Flow Delete

```text
Hapus

↓

Konfirmasi

↓

Delete Spreadsheet

↓

Update Rekap

↓

Tambah Log

↓

Success
```

---

# 5.26 Rate Limiting

Untuk menjaga kestabilan aplikasi.

- Maksimal 60 request per menit per pengguna.
- Upload gambar maksimal 5 MB per file.
- Maksimal 10 file per menit.

---

# 5.27 Dokumentasi Endpoint

| Modul        | Endpoint          | Method |
| ------------ | ----------------- | ------ |
| Login        | /login            | POST   |
| Logout       | /logout           | POST   |
| Dashboard    | /dashboard        | GET    |
| Transaksi    | /transactions     | GET    |
| Detail       | /transaction/{id} | GET    |
| Tambah       | /transaction      | POST   |
| Edit         | /transaction/{id} | PUT    |
| Hapus        | /transaction/{id} | DELETE |
| Rekap        | /rekap            | GET    |
| Export PDF   | /export/pdf       | GET    |
| Export Excel | /export/excel     | GET    |
| Upload Foto  | /upload           | POST   |
| Users        | /users            | GET    |
| Logs         | /logs             | GET    |
| Kategori     | /categories       | GET    |
| Satuan       | /units            | GET    |

---

# Ringkasan

Google Apps Script berperan sebagai **REST API** yang menghubungkan frontend React dengan Google Spreadsheet. Seluruh operasi CRUD, autentikasi, validasi, rekapitulasi, ekspor, dan pencatatan log dilakukan melalui API sehingga frontend tidak pernah mengakses Spreadsheet secara langsung. Desain ini menjaga keamanan, memudahkan pemeliharaan, dan memungkinkan aplikasi berkembang tanpa mengubah struktur dasar sistem.
