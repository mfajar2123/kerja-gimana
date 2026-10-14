# QA navigasi dan editor — 9 Oktober 2026

Tab Ringkasan, Pengalaman kerja, Informasi gaji, dan Interview langsung menempatkan navigasi serta konten yang dipilih di bawah navbar. Navigasi menunggu halaman selesai dirender, mengabaikan hasil navigasi yang sudah digantikan, dan memberi fokus pada tautan aktif. URL tetap bisa dibagikan. Back/Forward mengembalikan posisi baca, sedangkan kunjungan langsung atau pergantian perusahaan dimulai dari judul.

Profil perusahaan dimuat oleh halaman induk yang tetap hidup saat tab berpindah. Pengujian menghitung hanya satu permintaan detail untuk enam perpindahan tab. Setiap perusahaan memiliki kunci data tersendiri; perubahan akun dari tab lain membersihkan cache dan memuat ulang konten publik.

Edit profil admin membuka dialog di depan posisi daftar saat ini. Fokus langsung ke nama perusahaan. Dialog menahan fokus keyboard, mengunci scroll latar, dan memiliki scroll sendiri dengan batas tinggi viewport. Escape, Batal, dan Tutup mengembalikan fokus ke tombol asal. Klik di luar dialog tidak membuang perubahan. Saat menyimpan, input dan penutupan dinonaktifkan; kegagalan tampil dan memperoleh fokus di dalam dialog, sedangkan sukses ditampilkan di baris perusahaan.

Pagination direktori, review, interview, perusahaan admin, pengguna, dan moderasi menampilkan awal hasil setelah data baru selesai dimuat. Refresh biasa tidak memindahkan posisi. Interview sekarang memiliki kontrol halaman untuk data di atas batas satu halaman. Pesan moderasi memperoleh fokus sehingga keputusan maupun kegagalan terlihat. Perubahan status pengguna menampilkan kegagalan pada baris akun terkait dan mencegah permintaan ganda.

Optimasi: beranda tidak menunggu database untuk konten di bawah layar; daftar perusahaan dan statistik dimuat bersama saat bagian itu mendekati viewport. Ruang tampilan disediakan untuk mengurangi pergeseran layout, dan kegagalan memiliki pesan serta tombol coba lagi. Halaman direktori/profil tetap menggunakan SSR. Permintaan dashboard/editor yang independen dijalankan bersama, pencarian beranda baru berjalan setelah pengguna mengetik, menu akun dimuat sebagai komponen async, prefetch tautan mengikuti interaksi, font utama dipreload, dan Nitro menghasilkan aset gzip/Brotli. Ringkasan admin hanya diminta saat halaman ringkasan digunakan. Hero tampil langsung, dan observer animasi hanya dipindai saat halaman dirender.

Pengujian otomatis berada di `tests/e2e/navigation-ux.spec.ts`, dijalankan pada Chromium desktop dan Pixel 7, termasuk reduced motion, history, pagination, API gagal/lambat, fokus dialog, accessibility, pergantian perusahaan, dan perubahan akun antartab. Fixture hanya berada di browser pengujian. `scripts/qa-public-data.mjs` membaca dataset DEMO asli untuk memeriksa SSR keempat bagian, posisi tab mobile, serta pergantian perusahaan tanpa menulis database.

Tautan antarhalaman memakai `NuxtLink`, termasuk tiga langkah di beranda. Navigasi dari aksi menggunakan `navigateTo`/router. Pemulihan halaman error memakai `clearError({ redirect: '/' })` agar state error ikut dibersihkan tanpa reload dokumen. Tautan `#...` tetap berupa anchor untuk scroll/fokus dalam halaman, dan website resmi perusahaan tetap berupa tautan eksternal. Regresi browser memeriksa navigasi keyboard ketiga langkah serta pemulihan 404 dengan identitas dokumen yang tetap sama pada desktop dan mobile.

Validasi tambahan routing: empat tes regresi navigasi keyboard/pemulihan 404 lulus pada Chromium desktop dan Pixel 7 menggunakan build produksi. Penanda langkah yang sedang berfokus tidak lagi ditimpa oleh observer scroll.

QA manual:

1. Buka perusahaan, scroll ke tab, lalu pindahkan tab beberapa kali. Tab aktif dan isi harus langsung terlihat. Coba Back/Forward dan buka URL tab secara langsung.
2. Masuk memakai akun admin lokal yang tersimpan di `.demo-data.local.json`, lalu buka `/admin/perusahaan` dan edit perusahaan di bagian bawah daftar.
3. Coba Tab/Shift+Tab, Escape, Batal, dan simpan. Setelah ditutup, tombol asal harus tetap berfokus. Uji jaringan lambat/gagal; dialog harus tetap terbuka dan pesan gagal terlihat.
4. Gunakan tampilan 320/390 px serta pengaturan reduced motion. Semua field dan tombol harus terjangkau tanpa overflow halaman.

Pengukuran performa dan hasil build akhir dicatat di [quality.md](quality.md). Skor lab lokal tidak menggantikan pengukuran deployment dan field Core Web Vitals.
