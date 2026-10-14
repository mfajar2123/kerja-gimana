# Brief video KerjaGimana — Cari tahu dulu

Tanggal: 14 Oktober 2026. Status: video horizontal tanpa audio selesai dirender dan diperiksa; persetujuan visual final pengguna belum diberikan. Catatan hasil aktual: [production.md](production.md).

Permintaan awal: periksa proyek `kerja-gimana`, gunakan design system yang ada dan skill `king-motion-graphic-video`, buat plan terlebih dahulu. Pengguna semula memilih kedua format, kemudian mengarahkan eksekusi saat ini ke **horizontal 16:9 tanpa audio**. Vertikal tetap sebagai rencana, bukan deliverable tahap ini. Storyboard aktif: [storyboard.md](storyboard.md).

## Tujuan dan penonton

Video pengenalan untuk pencari kerja Indonesia yang sedang mempertimbangkan perusahaan atau berpindah kerja. Tujuannya membuat penonton mengenali KerjaGimana sebagai tempat mencari informasi tentang tempat kerja, lalu membuka direktori perusahaan.

Gagasan utama: **Sebelum kerja di sana, cari tahu dulu.**

Pembeda yang ditampilkan: pengalaman kerja, ringkasan gaji, dan cerita interview dalam satu alur riset; pilihan dapat dibandingkan berdasarkan informasi yang tersedia. Kontribusi melewati moderasi, dan kekurangan data dinyatakan secara terbuka.

## Hasil audit sumber proyek

| Temuan | Sumber lokal | Dampak pada plan |
| --- | --- | --- |
| Identitas editorial, komposisi asimetris, ritme hitam/paper/maroon | [Design system](../design-system.md), [CSS](../../app/assets/css/main.css) | Tipografi menjadi aktor utama; UI membantu menjelaskan informasi. |
| Hook dan tagline sudah kuat | [Homepage](../../app/pages/index.vue), [layout](../../app/layouts/default.vue) | Pakai suara brand yang ada: “Kerja di sana. Yakin udah tahu dalemnya?” |
| Pencarian dan direktori perusahaan tersedia dalam kode | [SearchCompany](../../app/components/SearchCompany.vue), [direktori](../../app/pages/perusahaan/index.vue) | Pencarian menjadi awal perjalanan video. |
| Pengalaman kerja, informasi gaji, interview punya halaman masing-masing | [CompanyTabs](../../app/components/CompanyTabs.vue), [halaman perusahaan](../../app/pages/perusahaan/) | Tampilkan tiga jenis informasi berurutan dalam profil yang sama. |
| Gaji merupakan median bulanan; membutuhkan sedikitnya lima pelapor unik per kelompok | [Halaman gaji](../../app/pages/perusahaan/[slug]/gaji.vue), [launch readiness](../launch-readiness.md) | Jangan mengesankan bahwa setiap perusahaan selalu memiliki angka gaji. Sertakan syarat singkat dalam beat gaji. |
| Perbandingan mendukung dua atau tiga perusahaan | [Bandingkan](../../app/pages/bandingkan.vue) | Tampilkan dua pilihan agar terbaca di vertikal; tidak membuat ranking atau pemenang. |
| Kompas Karier AI masih coming soon | [Homepage](../../app/pages/index.vue), [README](../../README.md) | Video ini fokus pada fitur yang sudah ditulis, tanpa adegan penggunaan AI. |
| Fixture perusahaan dan kontribusi fiktif diberi label DEMO | [Demo data](../demo-data.md), [seeder](../../scripts/seed-demo.mjs) | Nama DEMO tetap terlihat selama adegan produk; tidak menjadi testimoni atau traction. |
| Domain publik final belum terverifikasi dalam audit ini | [Launch readiness](../launch-readiness.md), [deployment](../deployment.md) | Tujuan CTA adalah route `/perusahaan`; teks URL publik menunggu origin aktual. |

Audit ini membaca kode dan dokumentasi, bukan pengujian ulang aplikasi atau verifikasi kondisi deployment. Dokumentasi demo lama dan launch readiness memiliki jumlah fixture berbeda; plan tidak menggunakan angka jumlah perusahaan, pengguna, atau kontribusi sebagai klaim.

## Format dan asumsi kreatif

| Keputusan | Plan |
| --- | --- |
| Durasi | 30 detik untuk masing-masing format; asumsi kreatif yang dapat direvisi |
| Vertikal | 1080 × 1920, 9:16, untuk Reels/TikTok |
| Horizontal | 1920 × 1080, 16:9, untuk website/presentasi |
| Frame rate | 30 fps; target 900 frame per versi bila diproduksi |
| Bahasa | Indonesia, mengikuti copy produk |
| Narasi | Tanpa voice-over sebagai asumsi awal; pesan lengkap melalui teks |
| Audio | Tidak ada; tanpa VO, BGM, SFX, atau silent audio stream sesuai instruksi eksekusi |
| CTA tunggal | “Cari perusahaan” → `/perusahaan` |
| Lingkup sekarang | Implementasi dan render MP4 horizontal 1920 × 1080, 30 fps, 30 detik; tanpa audio |

Kedua versi memakai naskah, identitas, dan timing yang sama. Layout, pemenggalan baris, ukuran UI, dan target kamera disusun khusus untuk tiap rasio. Horizontal tidak diperoleh dengan memotong hasil vertikal.

## Adaptasi design system

| Elemen | Aturan video |
| --- | --- |
| Latar utama | `--kg-ink` #000000 |
| Bidang transisi | `--kg-maroon` #3D0000; dark red #950101 hanya untuk detail pendukung |
| Adegan produk | `--kg-paper` #F7F5F2, teks hitam, divider `--kg-paper-line` |
| Aksen | `--kg-red` #FF0000 untuk kata “tahu”, penanda tab, dan aksi CTA; teks panjang memakai putih/hitam |
| Teks pendukung | `--kg-muted` #ACA5A5 pada hitam; `--kg-paper-muted` #615C5A pada paper |
| Headline | Space Grotesk Variable 600; wordmark mengikuti 700/400 dari layout |
| UI/body | Plus Jakarta Sans Variable 400/600/700/800 sesuai peran asli |
| Bentuk | Garis tipis, blok kotak, indeks kecil, ruang kosong yang lapang; mengikuti CSS publik |
| Icon | Lucide yang sudah digunakan: Search, TextSearch, Scale, ArrowUpRight/ArrowRight. Stroke ringan; satu fokus utama. |
| Logo | Wordmark `K.` dan “kerjagimana” dari layout; [favicon](../../public/favicon.svg) dapat dipakai untuk simbol. Tidak mendesain ulang logo. |

Font aktual tersedia melalui paket Fontsource yang dimuat [nuxt.config.ts](../../nuxt.config.ts); gunakan file font lokal, bukan font pengganti. Bentuk tombol publik mengikuti `.button.button-red`, bukan radius default komponen yang belum tentu dipakai pada homepage. Pada paper, teks utama tetap hitam; merah cukup menjadi penanda kecil.

Ukuran awal untuk komposisi 1080p: headline 88–112 px, teks UI yang perlu dibaca 36–44 px, keterangan 30–34 px. Ukuran ini adaptasi video, bukan perubahan token website. Headline memakai tracking sekitar -0.055em sampai -0.075em dan line-height 1.0–1.1; cek kata panjang pada versi vertikal sebelum mengencangkan tracking.

Vertikal: area kerja awal x=96–900, y=220–1520. Horizontal: margin awal 120 px kiri/kanan dan 90 px atas/bawah. Ini panduan layout internal, bukan jaminan safe area semua platform; cek overlay aplikasi tujuan pada preview. Semua CTA dan label DEMO harus berada dalam area kerja.

## Konsep visual dan motion

Teks membuka persoalan. Garis aksen pada kata “tahu” berubah peran menjadi garis pencarian. Hasil pencarian membuka profil; profil yang sama berpindah tab pengalaman kerja → gaji → interview. Profil kemudian menjadi satu kolom perbandingan. Divider perbandingan menyapu komposisi dan mengantar ke tagline penutup.

Camera mengikuti urutan baca pada hook, lalu pullback untuk memperlihatkan konteks. Saat isi UI berubah, kamera berhenti. Pindah tab menjadi transisi berbasis objek yang sama; perbandingan memakai pullback yang benar-benar menampilkan pilihan tambahan. CTA berakhir tanpa gerakan.

Gerakan awal mengikuti karakter [motion system](../motion-system.md): transisi lokal sekitar 250–450 ms dan reveal editorial 500–650 ms. Jeda baca ditentukan naskah, tidak dipaksa mengikuti durasi transisi website. Blur hanya pada layer yang sedang bergerak dan kembali nol sebelum dibaca.

## Aset dan kebutuhan produksi berikutnya

| ID | Sumber/kebutuhan | Status |
| --- | --- | --- |
| A01 | Font lokal Space Grotesk dan Plus Jakarta Sans | Dimuat lokal; pemeriksaan font lulus |
| A02 | Wordmark dari layout dan simbol favicon SVG | Wordmark direkonstruksi dalam HTML; favicon disalin sebagai aset lokal |
| A03 | SearchCompany: field, ikon, hasil `DEMO — Aurora Teknologi` | Adaptasi UI berlapis diimplementasikan dan diperiksa |
| A04 | Detail profil dan pengalaman kerja Aurora | Panel berlapis; cuplikan fixture dipakai dengan label DEMO |
| A05 | Ringkasan gaji dengan label median, basis gaji, dan syarat sampel | Median fixture gross Rp10.000.000; syarat sampel dan label DEMO terlihat |
| A06 | Interview Aurora: tahapan/durasi dari kontribusi DEMO | Empat tahapan dan durasi 14 hari dari fixture; berlabel contoh pengalaman |
| A07 | Perbandingan Aurora dan `DEMO — Lentera Kreatif` | Dua kolom dan dua dimensi rating dari rumus fixture; diimplementasikan |
| A08 | BGM dan SFX | Tidak digunakan sesuai instruksi terbaru |
| A09 | URL/QR jika diperlukan pada versi distribusi | Tidak digunakan pada render ini; penutup memakai brand dan CTA |

Untuk storyboard produk, gunakan data DEMO dengan label terbaca. Saat mengambil screenshot, gunakan hanya tampilan publik; nama penulis, akun, email, dan panel admin tidak diperlukan. Tidak membuat angka gaji, rating, atau kutipan positif baru. Jika data tidak tersedia saat produksi, gunakan empty state aktual dan sesuaikan durasi/framing beat, atau pakai ilustrasi berlabel “Ilustrasi tampilan” yang tidak menyamar sebagai data nyata.

## Audio

Instruksi eksekusi terbaru: **tanpa audio dulu**. Tidak membuat, mencari, membeli, atau memasukkan VO/BGM/SFX. File MP4 harus mempunyai nol stream audio. Tidak menyamakan track hening dengan ketiadaan audio. Timing visual tetap mengikuti storyboard 30 detik.

## Hal yang masih terbuka

Durasi 30 detik dipertahankan dari storyboard yang diminta untuk dieksekusi. Domain CTA publik belum ditetapkan, sehingga penutup menggunakan brand dan aksi “Cari perusahaan”. UI merupakan adaptasi berlapis dari sumber proyek dan data fixture sintetis, dengan label DEMO/ilustrasi tampilan. Menurut dokumen lokal, kesiapan peluncuran publik penuh belum selesai; video ini tidak menyatakan “sudah diluncurkan” atau “daftar sekarang”.

Komposisi aktif: [video/kerjagimana](../../video/kerjagimana/index.html), menggunakan HyperFrames dan GSAP dengan font lokal. Dependensi produksi dipasang pada package terpisah dari aplikasi. Status verifikasi dan hasil render dicatat di [production.md](production.md).
