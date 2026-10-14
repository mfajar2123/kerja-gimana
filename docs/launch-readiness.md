# Kesiapan peluncuran KerjaGimana

Tanggal audit: 13 Oktober 2026. **Keputusan saat ini: NO-GO untuk peluncuran publik penuh.** Perbaikan produk dan pengujian lokal tidak menggantikan konfigurasi operasional yang belum tersedia. Jangan menyatakan bebas bug, tersertifikasi OWASP, atau sudah diterima Claude Startups.

Validasi produk lokal selesai: build/typecheck/lint, 20 unit tests, 56 tes browser desktop/mobile, QA fitur Supabase lengkap, dan QA data publik lulus. Lighthouse mobile terbaru: 84/100/100/100; pengujian ini memakai preview Node lokal. Hasil dan batasnya dicatat di [quality.md](quality.md).

## Produk dan aturan bisnis

Produk saat ini adalah direktori riset tempat kerja dengan kontribusi komunitas yang dimoderasi manusia. Kompas Karier AI adalah roadmap berlabel Coming soon; tidak ada chat, endpoint AI, pemanggilan Claude, pengumpulan waitlist, atau biaya AI yang diaktifkan.

Rating merangkum pengalaman kontributor, bukan penilaian objektif seluruh perusahaan. Moderasi memeriksa pedoman dan privasi, bukan sertifikasi setiap klaim. Tampilan gaji membedakan status kerja, pengalaman, lokasi, dan basis penghasilan; median menggunakan gaji pokok bulanan tanpa tunjangan/bonus dan membutuhkan lima pelapor unik per kelompok. Review terbit tidak menampilkan identitas akun, tetapi detail cerita dapat memberi petunjuk identitas.

Perusahaan terverifikasi dapat meminta tanggapan melalui moderasi; mereka tidak membeli rating atau menghapus kritik. Belum ada paket berbayar, sponsor aktif, pelanggan berbayar, atau traction komersial yang diverifikasi dalam audit ini. Rekomendasi model bisnis awal: prioritaskan komunitas dan kualitas data; validasi kesediaan membayar untuk riset premium kemudian, dengan pemisahan ketat dari keputusan moderasi.

Alur pengguna yang harus bertahan saat jaringan gagal: direktori mempertahankan filter, perbandingan mempertahankan pilihan, data gagal tidak dianggap kosong, formulir mempertahankan isian, dan setiap pengiriman memberikan hasil di dekat aksi. Penolakan moderasi diberi label “Ditolak”; pengguna membaca catatan sebelum mengirim perbaikan sebagai kiriman baru.

Antrean moderator menampilkan kelima rating beserta isi ulasan dan label field berbahasa Indonesia. Rating yang disembunyikan dari antarmuka moderator dapat menghambat tinjauan; kini semua dimensi dapat diperiksa sebelum keputusan.

## Penghalang peluncuran yang masih nyata

| Kebutuhan | Bukti/status | Tindakan sebelum rilis |
| --- | --- | --- |
| Domain, HTTPS, email bisnis | Founder menyatakan belum tersedia | Pilih domain, siapkan hosting server dan email, cocokkan kedua site URL |
| SMTP dan alur email nyata | Pengujian sebelumnya memakai link QA; delivery publik belum diverifikasi | Konfigurasi SMTP, allowlist callback produksi, uji verifikasi dan pemulihan ke inbox nyata |
| Secret yang pernah dibagikan | Rotasi belum dapat diverifikasi | Buat pengganti di dashboard, perbarui server, uji, cabut kunci lama |
| Data dan akun DEMO | Empat perusahaan DEMO masih terbit pada proyek QA; banner global dihapus atas permintaan pengguna, label DEMO pada data dipertahankan | Pertahankan proyek ini untuk QA; gunakan data produksi yang disetujui sebelum peluncuran publik |
| Operator, privasi, ketentuan | Halaman legal masih berlabel draf | Isi identitas operator/kontak/retensi yang benar; tinjau kewajiban dan teks sebelum publikasi |
| Moderasi dan dukungan | Fitur tersedia; jam kerja dan penanggung jawab belum ditetapkan | Tetapkan pemilik antrean, jadwal tinjauan, cara menangani banding, privasi mendesak, serta balasan kontak |
| Backup dan pemulihan | Restore produksi belum diuji | Siapkan backup sesuai Free tier dan uji pemulihan di lingkungan terpisah |
| Infrastruktur produksi | TLS, proxy/IP limiter, cookie, cache CDN, kuota dan load belum diuji di host final | Jalankan smoke test dan uji kapasitas pada adapter/host yang benar |
| Dependensi | Audit masih melaporkan dua high tanpa patch terbit | Tinjau pengecualian terbatas build/dev di owasp-audit.md; periksa lagi sebelum rilis dan tiap adapter |
| Keamanan admin | MFA aplikasi belum diwajibkan | Batasi admin; aktifkan MFA akun platform, rencanakan kontrol MFA aplikasi sebelum akses moderator diperluas |
| Claude Startups | Domain/email/Console belum tersedia; AI belum terintegrasi | Lengkapi dokumen aplikasi yang faktual; keputusan eligibility milik Anthropic |

`pnpm check:launch` memeriksa konfigurasi origin, secret, mode demo, dan keberadaan artefak tanpa mencetak nilai rahasia. Exit 1 pada konfigurasi lokal adalah hasil yang diharapkan. Exit 0 hanya berarti pemeriksaan konfigurasi itu lulus, bukan semua penghalang selesai.

## Pemeriksaan sebelum setiap rilis

1. Jalankan typecheck, lint, unit tests, build produksi, browser QA pada artefak itu, lalu pemindaian secret publik. Lihat [quality.md](quality.md) untuk hasil dan batas pemeriksaan terbaru.
2. Verifikasi RLS, role, kepemilikan, logout, dan batas agregat. Jangan melakukan stress test atau mengubah data pengguna demi mengisi halaman.
3. Di staging host final, uji registrasi/verifikasi email, login/logout/admin, pemulihan, kontribusi, moderasi, pelaporan, tanggapan perusahaan, kontak, dan penghapusan akun. Uji pula kegagalan jaringan dan layar 320–1440 px.
4. Tinjau data yang akan dipublikasikan dan singkirkan akun/data QA hanya setelah backup serta persetujuan lingkup data. Seeder DEMO bukan migrasi produksi.
5. Catat penanggung jawab dukungan dan rollback. Buka beta terbatas lebih dulu, pantau kegagalan auth, antrean moderasi, dan biaya/kuota, kemudian putuskan perluasan pengguna.

## Operasional minimum untuk beta

- Moderator membaca konteks, memisahkan pendapat dari tuduhan, menolak informasi pribadi, dan menuliskan alasan. Resolusi laporan yang menurunkan review harus memakai aksi yang sesuai, dengan audit tersimpan.
- Founder menetapkan target waktu respons berdasarkan kapasitas nyata; jangan menjanjikan SLA di website sebelum ada petugasnya. Pesan kontak tersimpan dalam antrean, belum merupakan pengiriman email balasan otomatis.
- Metrik awal yang disarankan: pencarian tanpa hasil, kunjungan profil ke perbandingan, kiriman valid, waktu tunggu moderasi, laporan privasi, dan pengguna yang kembali. Dataset DEMO tidak masuk metrik traction. Tidak ada tracking baru yang ditambahkan oleh perubahan ini.
- Saat insiden: batasi permukaan yang terdampak, simpan bukti minimum, cabut akses yang bocor, perbaiki akar masalah, verifikasi, baru buka kembali. Jangan menyalin isi review privat/token ke log atau alat AI.

Sumber panduan infrastruktur: [Supabase Production Checklist](https://supabase.com/docs/guides/deployment/going-into-prod). Free tier tetap dipertahankan; tidak ada billing, layanan berbayar, deployment, ataupun aplikasi program startup yang diaktifkan dari pekerjaan ini.
