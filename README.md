# 🚗 Nursandi RentCar

> Website rental kendaraan modern untuk **Nursandi RentCar** — solusi sewa mobil dan motor terpercaya di Majalengka, Jawa Barat.

---

## 📋 Deskripsi

Nursandi RentCar adalah website profil bisnis rental kendaraan yang dibangun dengan **Vue 3** dan **Vite**. Website ini menampilkan katalog armada mobil & motor, informasi kontak, lokasi, jam operasional, serta dilengkapi dengan **panel admin** untuk mengelola seluruh konten secara dinamis tanpa perlu menyentuh kode.

---

## ✨ Fitur Utama

- **Halaman Beranda** — Hero section, keunggulan bisnis, preview armada, cara menyewa, testimoni pelanggan, dan CTA WhatsApp
- **Halaman Mobil** — Katalog lengkap armada mobil dengan filter kategori, spesifikasi, dan harga
- **Halaman Motor** — Katalog lengkap armada motor dengan filter kategori, spesifikasi, dan harga
- **Halaman Kontak** — Informasi kontak (WhatsApp, Email, Lokasi), peta Google Maps embed, jam operasional, dan tombol pesan cepat via WhatsApp
- **Panel Admin** — Kelola semua konten website secara real-time (nama bisnis, kontak, armada, testimoni, jam operasional, dll.)
- **Responsive Design** — Tampilan optimal di desktop, tablet, maupun mobile
- **Integrasi WhatsApp** — Tombol pesan langsung ke WhatsApp dengan pesan otomatis
- **Penyimpanan Lokal** — Semua perubahan admin tersimpan di `localStorage` secara otomatis

---

## 🛠️ Teknologi

| Teknologi | Versi | Keterangan |
|---|---|---|
| [Vue 3](https://vuejs.org/) | ^3.5.28 | Framework utama (Composition API) |
| [Vue Router](https://router.vuejs.org/) | ^5.0.3 | Navigasi antar halaman (SPA) |
| [Vite](https://vitejs.dev/) | ^7.3.1 | Build tool & dev server |

---

## 📁 Struktur Proyek

```
nursandi-rentcar/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.vue          # Navigasi atas
│   │   ├── Footer.vue          # Footer website
│   │   └── VehicleCard.vue     # Kartu kendaraan (mobil/motor)
│   ├── composables/
│   │   └── useSettings.js      # Store reaktif & helper (settings, WhatsApp link, admin auth)
│   ├── views/
│   │   ├── Home.vue            # Halaman beranda
│   │   ├── Mobil.vue           # Halaman katalog mobil
│   │   ├── Motor.vue           # Halaman katalog motor
│   │   ├── Kontak.vue          # Halaman kontak & lokasi
│   │   └── Admin.vue           # Panel admin
│   ├── App.vue                 # Root component
│   ├── main.js                 # Entry point
│   └── style.css               # Global styles & CSS variables
├── index.html
├── vite.config.js
└── package.json
```

---

## 🚀 Cara Menjalankan

### Prasyarat

- **Node.js** versi 18 atau lebih baru
- **npm** (sudah termasuk bersama Node.js)

### Instalasi & Menjalankan

```bash
# 1. Clone atau ekstrak proyek
git clone <url-repo>
cd nursandi-rentcar

# 2. Install dependensi
npm install

# 3. Jalankan development server
npm run dev
```

Buka browser dan akses `http://localhost:5173`

### Build untuk Produksi

```bash
# Build ke folder dist/
npm run build

# Preview hasil build
npm run preview
```

---

## ⚙️ Panel Admin

Website dilengkapi panel admin yang dapat diakses melalui:

```
/admin
```

### Login Default

| Field | Value |
|---|---|
| Password | `admin123` |

> ⚠️ **Penting:** Segera ganti password admin setelah pertama kali login melalui menu pengaturan di panel admin.

### Yang Bisa Dikelola di Admin

- Identitas bisnis (nama, tagline, deskripsi)
- Nomor WhatsApp, email, alamat, link Google Maps
- Statistik hero (jumlah pelanggan, rating, dll.)
- Daftar keunggulan bisnis
- Testimoni pelanggan
- Jam operasional harian
- Katalog mobil (tambah, edit, hapus)
- Katalog motor (tambah, edit, hapus)

Semua perubahan tersimpan otomatis di browser via `localStorage`.

---

## 🔗 Halaman & Routing

| Path | Halaman |
|---|---|
| `/` | Beranda |
| `/mobil` | Katalog Mobil |
| `/motor` | Katalog Motor |
| `/kontak` | Kontak & Lokasi |
| `/admin` | Panel Admin |

---

## 📞 Informasi Kontak Default

| Kontak | Info |
|---|---|
| WhatsApp | 0878-3567-3030 |
| Email | adiecahh27@gmail.com |
| Lokasi | Majalengka, Jawa Barat |

---

## 📄 Lisensi

ISC License — Bebas digunakan dan dimodifikasi sesuai kebutuhan.
