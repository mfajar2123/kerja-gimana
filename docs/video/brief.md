# Brief aktif — KerjaGimana / 20 detik

Instruksi terbaru: perbaiki koreografi, tipografi, dan transisi memakai `king-motion-graphic-video`; kamera mengikuti kata, bergeser antarbaris, lalu zoom out ke kalimat lengkap; perpindahan foto memakai zoom in–out; tambah audio; ringkas menjadi 20 detik dan kurangi elemen yang tidak perlu.

Status: komposisi 20 detik selesai dirender, review seek/layout dan decode MP4 lulus, frame serta filmstrip terpilih diperiksa. Audio sudah diperiksa teknis; direct audition belum tersedia. Hasil akhir: [production.md](production.md). Storyboard aktif: [storyboard.md](storyboard.md). Versi 30 detik ada di [archive](archive/brief-30s.md).

| Keputusan | Brief |
| --- | --- |
| Tujuan | Penonton mengenali KerjaGimana dan mencari perusahaan sebelum mengambil keputusan kerja. |
| Audiens | Pencari kerja/pindah kerja di Indonesia. |
| Pesan | “Sebelum kerja di sana, cari tahu dulu.” |
| Format | Horizontal 16:9, 1920 × 1080, 30 fps, 20 detik / 600 frame. |
| Identitas | Space Grotesk Variable 600 untuk headline; Plus Jakarta Sans untuk keterangan/CTA; hitam, putih/paper, merah #FF0000. Wordmark dari layout proyek. |
| Visual | Tipografi besar di ruang kosong; tiga foto suasana kerja/keuangan/interview; satu keterangan kondisi gaji; penutup hanya brand, tagline, dan aksi. |
| Motion | Camera rig terpisah dari reveal kata; traverse kata, jeda, reset baris, pullback; foto zoom dari close ke konteks, drift pendek, lalu push menuju foto berikut. |
| Audio | Musik instrumental “Tech House vibes” + lima cue sweep/air zoom; tanpa VO. Sumber dan lisensi: [credits](credits.md), [manifest](audio-manifest.json). |
| CTA | “Cari perusahaan ↗”. Tujuan produk `/perusahaan`; URL domain publik tidak ditambahkan. |
| Scope | Implementasi, preview lokal, render MP4, dan pemeriksaan output; tidak publikasi. |

Panel UI, tabel gaji/rating, data DEMO, eyebrow, indeks langkah, garis dekoratif, footer, dan kotak tombol dihapus. Foto adalah ilustrasi stok umum, bukan potret perusahaan/pegawai KerjaGimana, bukan testimoni atau endorsement.

Copy pengalaman kerja, ringkasan gaji, interview, dan perbandingan didukung [homepage](../../app/pages/index.vue), [CompanyTabs](../../app/components/CompanyTabs.vue), dan [halaman bandingkan](../../app/pages/bandingkan.vue). Kalimat “Saat data mencukupi.” tetap menyertai gaji; tidak membuat nominal, rating, atau janji hasil. Kompas Karier AI tidak ditampilkan sebagai fitur aktif.

Source of truth produksi: [komposisi aktif](../../video/kerjagimana/compositions/film.html), [animation-v2.js](../../video/kerjagimana/animation-v2.js), [style-v2.css](../../video/kerjagimana/style-v2.css). Gerakan merupakan usulan kreatif yang kini diimplementasikan; penerimaan visual/aural final oleh pengguna belum diberikan.
