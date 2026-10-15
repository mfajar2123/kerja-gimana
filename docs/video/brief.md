# Brief aktif — KerjaGimana / 20 detik

Instruksi terbaru (15 Oktober 2026): buat varian portrait 9:16 untuk TikTok/Instagram Reels dari versi Gen Z yang sudah ada. [Brief/storyboard portrait](portrait.md) mencatat adaptasi layout, kamera, area konten dan hasil render. Voice tetap percakapan dengan “kamu”, “intip”, “bandingin”, dan “baru gas”, tanpa bahasa kasar, stereotip generasi, atau klaim kecocokan kerja yang pasti. Domain `kerjagimana.live` masuk bersama CTA pada 18.15–18.45s dan tetap terbaca sampai frame terakhir.

Status: komposisi 20 detik selesai dirender, review seek/layout dan decode MP4 lulus, frame serta filmstrip terpilih diperiksa. Audio sudah diperiksa teknis; direct audition belum tersedia. Hasil akhir: [production.md](production.md). Storyboard aktif: [storyboard.md](storyboard.md). Versi 30 detik ada di [archive](archive/brief-30s.md).

| Keputusan | Brief |
| --- | --- |
| Tujuan | Penonton mengenali KerjaGimana dan mencari perusahaan sebelum mengambil keputusan kerja. |
| Audiens | Gen Z Indonesia yang sedang mencari kerja pertama atau mempertimbangkan pindah kerja. |
| Pesan | “Biar makin yakin, cek dulu, baru gas.” Cari konteks sebelum memutuskan perusahaan incaran. |
| Format | Horizontal 16:9 (1920 × 1080) dan portrait 9:16 (1080 × 1920); keduanya 30 fps, 20 detik / 600 frame. |
| Identitas | Space Grotesk Variable 600 untuk headline; Plus Jakarta Sans untuk keterangan/CTA; hitam, putih/paper, merah #FF0000. Wordmark dari layout proyek. |
| Visual | Tipografi besar di ruang kosong; tiga foto suasana kerja/keuangan/interview; satu keterangan kondisi gaji; penutup hanya brand, tagline, dan aksi. |
| Motion | Camera rig terpisah dari reveal kata; traverse kata, jeda, reset baris, pullback; foto zoom dari close ke konteks, drift pendek, lalu push menuju foto berikut. |
| Audio | Musik instrumental “Tech House vibes” + lima cue sweep/air zoom; tanpa VO. Sumber dan lisensi: [credits](credits.md), [manifest](audio-manifest.json). |
| CTA | “Cek perusahaan incaranmu ↗ kerjagimana.live”. Domain tampil 40 px, sejajar dengan CTA, settle 18.45s hingga akhir. |
| Scope | Implementasi, preview lokal, render MP4, dan pemeriksaan output; tidak publikasi. |

Panel UI, tabel gaji/rating, data DEMO, eyebrow, indeks langkah, garis dekoratif, footer, dan kotak tombol dihapus. Foto adalah ilustrasi stok umum, bukan potret perusahaan/pegawai KerjaGimana, bukan testimoni atau endorsement.

Copy cerita kerja, info gaji, interview, dan perbandingan didukung [homepage](../../app/pages/index.vue), [CompanyTabs](../../app/components/CompanyTabs.vue), dan [halaman bandingkan](../../app/pages/bandingkan.vue). Keterangan gaji diubah menjadi “Kalau datanya cukup.” agar tetap akurat dengan gaya percakapan; tidak membuat nominal, rating, atau janji hasil. Kompas Karier AI tidak ditampilkan sebagai fitur aktif. Foto dan audio memakai aset yang sama dengan audit lisensi sebelumnya.

Copy berurutan: “Mau kerja di sana?” → “Udah yakin cocok buat kamu?” → “Intip cerita kerjanya.” → “Cek info gajinya.” / “Kalau datanya cukup.” → “Gimana interview-nya?” → “Bandingin dulu, baru pilih.” → “Biar makin yakin, cek dulu, baru gas.” → CTA/domain.

Source of truth produksi: [komposisi aktif](../../video/kerjagimana/compositions/film.html), [animation-v2.js](../../video/kerjagimana/animation-v2.js), [style-v2.css](../../video/kerjagimana/style-v2.css). Gerakan merupakan usulan kreatif yang kini diimplementasikan; penerimaan visual/aural final oleh pengguna belum diberikan.
