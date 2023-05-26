# Backend API menggunakan Express.js

Ini adalah proyek backend sebagai API menggunakan Express.js dan mongoDB. API ini dibangun untuk digunakan dengan frontend aplikasi di repository MapboxFrontend.

## Persyaratan

Sebelum memulai, pastikan memiliki Node.js (versi 14 atau yang lebih baru) terinstal di komputer.

## Panduan Instalasi

Berikut adalah langkah-langkah untuk menginstal dan menjalankan proyek ini:

1. Clone repositori ini atau unduh sebagai ZIP dan ekstrak:

```bash
git clone https://github.com/realiyams/mapboxBackend.git
```

2. Buka terminal atau command prompt dan arahkan ke direktori proyek:

```bash
cd mapboxBackend
```

3. Install dependensi:

```bash
npm install
```

4. ubah file konfigurasi `sampe.env`  menjadi `.env` dan atur variabel lingkungan yang diperlukan.

```.env
MONGO_URI=YOUR_MONGO_URI
ACCESS_TOKEN=YOUR_MAPBOX_ACCESS_TOKEN
PORT=3000
```

5. Jalankan proyek:

```bash
npm start
```

## Endpoints API

Berikut adalah beberapa contoh endpoint API yang telah disediakan:

* `GET /api/buildings`: Untuk mendapatkan data gedung.
* `GET /api/:buildingName/images`: Untuk mendapatkan data gambar gedung.
* `GET /api/buildings/direction?start=TEMPAT_AWAL&destination=TEMPAT_AKHIR`: Untuk mendapatkan rute dan jarak tempuh antara dua gedung.

## Screenshot

![1685094431500](image/README/1685094431500.png)
