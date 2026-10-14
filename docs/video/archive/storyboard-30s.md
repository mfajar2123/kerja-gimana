# Storyboard KerjaGimana — Cari tahu dulu

Tanggal: 14 Oktober 2026. Versi: horizontal 1. Delapan beat telah diimplementasikan dalam komposisi horizontal; status pemeriksaan/render aktual ada di [production.md](production.md). Brief aktif dan bukti sumber: [brief.md](brief.md).

Durasi: 30s, 30 fps. Eksekusi saat ini: **16:9, 1920 × 1080, tanpa audio**. 9:16 tetap sebagai rencana. Semua waktu di bawah adalah **detik absolut dalam komposisi**; renderer menyamplingnya pada grid 1/30s.

## Peta cerita dan copy utama

| Beat | Waktu | Copy persis | Fungsi |
| --- | --- | --- | --- |
| B01 | 0.00–2.40 | Kerja di sana. | Situasi yang dikenali penonton |
| B02 | 2.40–5.80 | Yakin udah tahu dalemnya? | Pertanyaan dari homepage; “tahu” merah |
| B03 | 5.80–9.60 | Cari perusahaannya. | Perkenalkan KerjaGimana dan titik awal riset |
| B04 | 9.60–13.40 | Baca pengalaman kerja. | Sudut pandang pekerja |
| B05 | 13.40–17.40 | Lihat ringkasan gaji. | Informasi dengan syarat sampel |
| B06 | 17.40–20.80 | Kenali proses interview. | Persiapan dengan konteks pengalaman pelamar |
| B07 | 20.80–25.00 | Bandingkan sebelum memilih. | Dua pilihan dalam konteks yang sama |
| B08 | 25.00–30.00 | Sebelum kerja di sana, / cari tahu dulu. | Tagline dan satu CTA: “Cari perusahaan” |

Isi UI mengikuti sumber produk; tabel ini adalah copy kampanye, bukan teks yang menggantikan field asli. Keterangan penting dan UI yang perlu dibaca dijadwalkan di kontrak berikut.

## Definisi komposisi bersama

Anchor ditulis `(x/W, y/H)` pada framing akhir; `s=1` adalah framing lebar yang muat area kerja tiap rasio. `C` adalah pusat target kamera dalam stage. Saat scale naik, framing harus menjaga kata aktif utuh dalam safe area; tidak cukup menerapkan transform terhadap pusat frame secara otomatis.

| Anchor/rig | Vertikal 9:16 | Horizontal 16:9 |
| --- | --- | --- |
| T: headline | Left aligned dari (0.09,0.29); lebar maks. 0.72W | Left aligned dari (0.09,0.31); lebar maks. 0.68W pada hook |
| U: UI pada beat produk | Pusat (0.48,0.57); lebar maks. 0.74W; headline di atas pada y=0.20 | Pusat (0.70,0.52); lebar maks. 0.42W; headline di kiri pada (0.08,0.36) |
| P: penanda brand | (0.10,0.16), wordmark kecil, tidak bergerak selama produk | (0.08,0.14), wordmark kecil |
| D: label demonstrasi | “DEMO · DATA FIKTIF” di atas UI, y=0.37; hindari tumpang tindih headline | “DEMO · DATA FIKTIF” di atas UI, y=0.23 |
| Q: CTA akhir | Tagline pada (0.10,0.34); tombol pada (0.10,0.62); wordmark pada (0.10,0.19) | Tagline pada (0.10,0.35); tombol pada (0.10,0.65); wordmark pada (0.10,0.18) |

D terus terlihat 6.70–24.60s saat data/fixture produk tampak. Nama asli fixture tetap berawalan DEMO, tidak hanya bergantung pada D. Headline adalah fokus pertama setiap beat; isi UI mengambil fokus setelah headline settle. Elemen pendukung tidak masuk bersamaan dengan kata utama.

Teks masuk memakai rise lokal 12–18 px, ease-out, sekitar 0.35s. Teks keluar sekitar 0.23s, mengikuti arah handoff. Blur pendek hanya pada layer masuk/keluar: peak 3 px, turun ke nol saat settle. Ini rancangan softness, bukan klaim temporal motion blur renderer. Semua interval baca: kamera hold, teks tajam, blur nol.

## B01 — Situasi

**0.00–2.40s · Hitam · Aset A01**

- Copy di T: vertikal “Kerja / di sana.”; horizontal “Kerja di sana.”. Fokus berurutan pada kelompok “Kerja” lalu “di sana.”
- Text entry: “Kerja” 0.00–0.35; “di sana.” 0.28–0.68. Blur teks peak 3 px pada 0.12/0.40, nol pada akhir masing-masing entry.
- Kamera: start `C` pada pusat kelompok pertama, `s=1.12`; traverse mengikuti urutan baca 0.20–0.80, lalu pullback ke `C=(0.50,0.50), s=1.00` pada 0.80–1.10. Pada vertikal, traverse mengarah ke baris kedua, bukan memaksa pan horizontal. Hold 1.10–2.10.
- Interval baca tajam: **1.10–2.10**. Indeks kecil “KG / 01” sudah hadir sebagai konteks, tidak dianimasikan berulang.
- Handoff: copy naik keluar 2.10–2.33; beat berikut masuk 2.40. Gap fokus 0.07s, latar tetap hitam. Blur keluar peak 3 px pada 2.20; layer keluar selesai/reset 2.33.
- Audio: pulse musik membuka dengan ringan. Tanpa SFX per kata.
- Bukti/status: copy diambil dari hero; treatment kamera masih usulan.

## B02 — Pertanyaan

**2.40–5.80s · Hitam → maroon sebagai bidang pendukung · Aset A01**

- Copy vertikal di T: “Yakin udah / tahu / dalemnya?”; horizontal “Yakin udah / tahu dalemnya?”. “tahu” adalah satu-satunya aksen merah pada headline.
- Text entry per kelompok: “Yakin udah” 2.40–2.75; “tahu” 2.85–3.20; “dalemnya?” 3.15–3.50. Peak blur 3 px pada 2.52/2.97/3.27; masing-masing nol pada akhir entry.
- Kamera: start `s=1.08` pada kelompok pertama; reframe menuju “tahu” dan kelompok terakhir 2.95–3.60. Pullback ke framing lengkap, `s=1.00`, 3.60–3.95. Hold sampai 5.35. Tidak berhenti mendadak pada setiap kata.
- Interval baca tajam seluruh pertanyaan: **3.95–5.35**. Maroon tipis dapat terlihat di belakang kanan sejak pullback, tanpa reveal tambahan.
- Handoff: teks keluar 5.35–5.58; garis pendek di bawah “tahu” tertinggal, bergeser menuju posisi bawah field pencarian 5.58–5.95. Kamera hold. Latar paper mulai terbuka pada 5.80 bersamaan dengan field; garis menjelaskan hubungan “tahu” → “cari”, bukan perubahan status bisnis.
- Blur: teks keluar peak 3 px pada 5.46, nol/dihapus 5.58; garis tidak diblur. Tidak ada full-frame blur atau white flash.
- Audio: air sweep pendek pada reframe 3.60–3.95; tidak memberi impact pada setiap kata.
- Bukti/status: hook dari homepage, semua timing usulan.

## B03 — Cari perusahaan

**5.80–9.60s · Paper · A02/A03**

- Copy “Cari perusahaannya.” masuk pada headline produk 5.80–6.20; blur peak 3 px pada 5.95, nol 6.20. Kamera start `s=1.00`, tetap hold.
- Brand P masuk 6.20–6.50, baru setelah copy utama settle. Field A03 membuka dari garis pencarian pada U 6.25–6.65; tidak berbentuk kartu dekoratif baru. Label D tampil tajam 6.70.
- Asset action: query “Aurora” muncul dalam field 6.70–7.15 sebagai simulasi mengetik; hasil **“DEMO — Aurora Teknologi”** turun ringan 7.15–7.50, blur 2 px pada 7.27 → nol 7.50. Input/query dan hasil mengikuti gaya SearchCompany.
- Kamera tidak ikut query mengetik. Setelah hasil settle, fokus beralih ke hasil terpilih; tidak menambah counter atau hasil palsu.
- Interval baca headline **6.20–6.70**, headline + query/hasil/label **7.50–9.20**.
- Handoff: hasil terpilih melebar ke header profil 9.20–9.75. Old headline keluar 9.20–9.43; next headline masuk 9.60. Overlap aset 0.15s lintas boundary; hasil tetap memegang fokus sampai headline berikut masuk. Field lain hilang 9.20–9.43. Blur aset maksimum 2 px 9.42 → nol 9.75.
- Audio: satu tap kering pada pilihan hasil 9.20; typing SFX tidak wajib.
- Bukti/status: komponen dan fixture ada; ini demonstrasi alur, bukan klaim hasil live atau waktu respons layanan.

## B04 — Pengalaman kerja

**9.60–13.40s · Paper · A04**

- Copy “Baca pengalaman kerja.” masuk 9.60–10.00 pada posisi headline produk; blur peak 3 px 9.75 → nol 10.00. Header Aurora settle 9.75; panel review terungkap 10.05–10.45, peak blur 2 px 10.20 → nol 10.45.
- Asset di U: header profil tetap, tab **“Pengalaman kerja”** diberi garis aktif merah. Tampilkan hanya crop field “Kelebihan” dan “Hal yang bisa ditingkatkan”, mengikuti halaman review aktual. Satu cuplikan pendek DEMO dapat dipilih saat produksi; sumber panjang yang tidak terbaca tidak menjadi fokus.
- Keterangan persis **“Kontribusi melewati moderasi.”** masuk 10.45–10.75, tanpa blur. Penulis/akun tidak ditampilkan. D terus terlihat.
- Kamera: start/end `s=1.00`, target U sebagai konteks, hold seluruh beat. Pergantian panel dimiliki gerak lokal aset.
- Interval baca seluruh pesan: **10.75–13.00**. Fokus utama bergeser dari headline ke dua sisi pengalaman, bukan skor bintang besar.
- Handoff: headline/keterangan keluar 13.00–13.23 (peak blur 3 px 13.10 → nol/reset 13.23). Penanda tab bergeser ke **“Informasi gaji”** 13.23–13.63; panel review bergeser kiri 13.23–13.55. Panel berikut datang dari kanan mulai 13.40; overlap panel 0.15s. Header dan D bertahan.
- Audio: paper slide pendek pada 13.23–13.55. Tanpa chime “terverifikasi”.
- Bukti/status: moderasi adalah aturan produk; tidak menyiratkan bahwa moderator menjamin kebenaran seluruh isi cerita.

## B05 — Ringkasan gaji

**13.40–17.40s · Paper · A05**

- Copy “Lihat ringkasan gaji.” masuk 13.40–13.80; peak blur 3 px 13.55 → nol 13.80. Panel gaji di U masuk 13.40–13.85; peak blur 2 px 13.57 → nol 13.85.
- UI menunjukkan struktur **“Median per bulan”**, jenis **“Gross”** bila crop itu yang dipilih, dan peran/lokasi/sampel dari data aktual. Jangan menggambarkan kenaikan gaji, penghitung uang, atau menjamin angka bagi semua perusahaan. Nominal hanya boleh diambil dari data yang telah dipilih dan tetap dilabeli DEMO; storyboard tidak menetapkan nominal.
- Keterangan persis **“Minimal 5 pelapor unik per kelompok.”** masuk 13.90–14.20, dua baris jika perlu, tanpa blur. Letakkan di bawah crop UI, ukuran minimal 30–34 px. D terus terlihat.
- Kamera: hold `s=1.00`; tidak zoom menuju angka sampai label median/basis terbaca. Fokus penjelasan adalah cara informasi ditampilkan.
- Interval baca seluruh pesan: **14.20–17.00**.
- Handoff: headline/keterangan keluar 17.00–17.23 (peak blur 3 px 17.10 → nol/reset 17.23). Penanda tab bergerak ke **“Interview”** 17.23–17.63; panel gaji keluar kiri 17.23–17.55; panel interview masuk mulai 17.40. Overlap 0.15s, header/D tidak berubah.
- Audio: tap ringan pada pemilihan tab 17.23; bukan bunyi transaksi. Tidak perlu sweep kedua yang identik dengan beat review.
- Bukti/status: label/syarat dari halaman gaji; angka dan capture masih belum dipilih. Bila runtime hanya memiliki empty state, ubah framing untuk menunjukkan kondisi itu secara jujur.

## B06 — Proses interview

**17.40–20.80s · Paper · A06**

- Copy “Kenali proses interview.” masuk 17.40–17.80; peak blur 3 px 17.55 → nol 17.80. Panel interview masuk 17.40–17.85; peak blur 2 px 17.57 → nol 17.85.
- Asset di U: crop field **“Tahapan”** dan **“Durasi”** dari pengalaman interview DEMO yang dipilih. Jika tahapan dipecah menjadi potongan, tetap beri konteks **“Contoh pengalaman pelamar”** agar tidak tampak sebagai proses resmi seluruh perusahaan. Jangan menambahkan label “lolos” atau offer baru.
- Keterangan persis **“Cerita dari pelamar sebelumnya.”** masuk 17.90–18.20, tanpa blur. D dan nama DEMO tetap terlihat.
- Kamera: hold `s=1.00`. Isi panel tidak mengetik bersamaan dengan headline.
- Interval baca pesan dan field utama: **18.20–20.35**.
- Handoff: headline/keterangan keluar 20.35–20.58 (peak blur 3 px 20.46 → nol/reset 20.58). Panel dipadatkan menjadi kolom profil kiri mulai 20.58; fokus kemudian dibuka ke dua perusahaan pada beat berikut. Asset blur maksimum 2 px 20.72 → nol 21.15. Tidak memakai morph ke status “diterima”.
- Audio: tekstur slide halus pada panel menuju perbandingan. Musik mulai membuka ruang untuk payoff.
- Bukti/status: field berasal dari kontribusi interview; cuplikan belum dipilih/diambil.

## B07 — Bandingkan pilihan

**20.80–25.00s · Paper · A07**

- Copy “Bandingkan sebelum memilih.” masuk 20.80–21.20; peak blur 3 px 20.95 → nol 21.20. Profil Aurora settle sebagai kolom pertama 21.15.
- Kamera: start `s=1.08`, target kolom Aurora; pullback 21.20–21.65 menuju `s=1.00`, memperlihatkan slot kolom kedua dan nama **“DEMO — Lentera Kreatif”**. Panel kedua masuk 21.35–21.75, peak blur 2 px 21.50 → nol 21.75. Atensi kamera dan aset berpindah ke pilihan kedua setelah headline selesai.
- Vertikal: dua kolom nama yang ringkas dan maksimal dua baris perbandingan; label metrik di atas nilai tiap pasangan agar teks muat. Horizontal: tabel dua perusahaan di kanan dengan headline di kiri. Ini adaptasi display video, bukan perubahan UI website.
- Baris utama **“Keseimbangan hidup”** dan **“Peluang berkembang”** dari dimensi rating yang sudah ada. Gunakan nilai fixture yang benar saat capture; null tetap **“Belum ada data”**. Tidak memberi crown, ranking, atau tanda “perusahaan terbaik”.
- Keterangan persis **“Berdasarkan informasi yang tersedia.”** masuk 21.75–22.05, tanpa blur. D tetap terlihat. Tidak memasukkan metrik bisnis atau jumlah pengguna.
- Interval baca dua pilihan dan konteks: **22.05–24.60**. Kamera hold, blur nol.
- Handoff: teks/keterangan/label DEMO dan panel keluar 24.60–24.90, peak blur layer panel 2 px pada 24.72 → nol/reset 24.90. Divider vertikal menjadi sapuan maroon 24.80–25.25, lalu membuka latar hitam. Incoming CTA baru mulai setelah 25.00, tanpa data demo yang disamarkan sebagai latar final.
- Audio: air sweep pendek pada pullback 21.20–21.65; musik mendapat ruang pada akhir beat.
- Bukti/status: perbandingan nyata mendukung hingga tiga perusahaan; dua dipilih demi keterbacaan. Values/capture belum diverifikasi untuk komposisi.

## B08 — Tagline dan CTA

**25.00–30.00s · Hitam · A01/A02; tombol publik merah**

- Copy persis: **“Sebelum kerja di sana,”** lalu **“cari tahu dulu.”**. CTA persis **“Cari perusahaan”** dengan ArrowUpRight. Warna kata “tahu” merah; tombol merah dengan teks hitam mengikuti homepage. Wordmark pada P/Q tampil sebagai identitas.
- Text entry: frasa pertama 25.00–25.35; frasa kedua 25.65–26.00. Peak blur 3 px 25.12/25.77 → nol pada akhir masing-masing entry. Pada vertikal, wrap “Sebelum kerja / di sana,” tanpa memotong kata; frasa kedua dapat dua baris bila diperlukan.
- Kamera: start `s=1.08` pada frasa pertama, jeda baca 25.35–25.60; reframe ke frasa kedua 25.60–26.10, lalu pullback 26.10–26.45 ke `C=(0.50,0.50), s=1.00` untuk reveal CTA dan wordmark. Gerakan mengikuti frasa, bukan per kata.
- Wordmark masuk 26.45–26.75; tombol masuk 26.75–27.10 dengan translate lokal maksimal 12 px, tanpa blur. Pada distribusi final, URL kecil dapat ditambahkan hanya setelah origin aktual diverifikasi; harus settle paling lambat 27.10 dan tetap terbaca. Tanpa domain terverifikasi, preview memakai tombol + brand saja.
- Interval baca seluruh tagline + CTA + brand: **27.10–30.00**, hold 2.90s. Tidak ada bounce, cursor click berulang, pergerakan kamera, atau exit di akhir. Frame akhir tetap tajam.
- Audio: tonal resolve sekitar 26.75; attack/tail utama selesai sebelum 27.50, musik menurun lembut sampai 30.00. Tanpa VO, tidak perlu voice ducking.
- Bukti/status: tagline, gaya CTA, dan tujuan `/perusahaan` ada di proyek. URL publik dan audio belum ditetapkan. Tombol video adalah ajakan visual, bukan kontrol interaktif pada file MP4.

## Audio — ditunda oleh instruksi pengguna

Seluruh cue di bawah merupakan catatan konsep awal dan **tidak dieksekusi**. Semua baris “Audio” pada kontrak beat hanya referensi yang ditunda; tidak ada file/track audio dalam komposisi atau render horizontal saat ini.

| Cue | Window usulan | Fungsi | Status |
| --- | --- | --- | --- |
| MUSIC | 0.00–30.00 | Pulse instrumental minimal; continuity tanpa menutupi aksen | Belum disourcing/diaudisi |
| AIR-01 | 3.60–3.95 | Reframe dari pertanyaan ke konteks utuh | Karakter air lembut; belum ada file |
| TAP-01 | Contact 9.20 | Pilihan hasil pencarian | Tap kering; offset file ditentukan setelah audition |
| PAPER-01 | 13.23–13.55 | Review menjadi panel gaji | Brush/slide pendek; belum ada file |
| TAP-02 | Contact 17.23 | Tab interview | Tap ringan dari keluarga yang sama; gain lebih rendah |
| SLIDE-01 | 20.58–21.15 | Profil menjadi konteks perbandingan | Tekstur halus, bukan impact |
| AIR-02 | 21.20–21.65 | Pullback membuka dua pilihan | Sweep dipilih untuk panjang gerak ini |
| RESOLVE | Onset sekitar 26.75, tail utama selesai 27.50 | Brand/tombol settle | Tonal pendek; belum ada file |

Window tidak menetapkan file start tanpa mengetahui onset/offset aksen aset audio. Pada produksi, buat manifest dengan path, sumber, lisensi, trim, gain, accent offset, dan waktu kejadian visual. Dengarkan musik, SFX, lalu gabungannya sebelum mengklaim sinkron atau selesai.

## Pemeriksaan plan dan batas verifikasi

Plan sudah dipetakan ke font, warna, wordmark, copy, komponen, dan aturan bisnis di sumber lokal. Delapan beat mencakup 0–30s tanpa celah timeline; setiap beat memiliki entry, hold, handoff, target kamera, dan blur reset. Kedua rasio punya anchor dan perubahan layout yang dinyatakan.

Pada versi horizontal, font, layout, kontras, pose seluruh beat, dan handoff terpilih sudah diperiksa melalui auditor dan snapshot berurutan. Seek 900 posisi, sampling interval baca tiap 10 frame, dan round trip maju/mundur lulus. File MP4 telah didekode seluruhnya dan frame hasil encode diperiksa. Playback penuh pada kecepatan normal belum ditinjau secara manusia; penilaian rasa gerak akhir tersedia lewat Studio/MP4. Audio tidak berlaku. Versi vertikal belum diimplementasikan atau diperiksa.

Deliverable eksekusi saat ini: MP4 horizontal tanpa audio beserta sumber komposisi. Instruksi pengguna mengotorisasi eksekusi dan render; penilaian visual final oleh pengguna belum diberikan. Sumber aplikasi dan database tidak diubah. Lihat [production.md](production.md) untuk hasil yang benar-benar diverifikasi.

## Penyesuaian saat implementasi horizontal

Copy dan rentang delapan beat dipertahankan. UI disusun berlapis, mengikuti design system dan fixture; label “DEMO · DATA FIKTIF / ILUSTRASI TAMPILAN” menjelaskan bahwa ini bukan capture live. Median gross bulanan Aurora Rp10.000.000 dan rating perbandingan dihitung dari formula fixture yang dibaca, tanpa mengeksekusi seeder.

Framing UI horizontal menggunakan x=900–1800 px agar kolom copy tetap lapang. Header hasil pencarian naik ke profil 9.20–9.75s. Panel review dan gaji menghilang 13.23–13.40s dan 17.23–17.40s sebelum panel berikut mulai terbaca; gerak keluar masih berlanjut sampai 13.55/17.55s pada layer transparan. Profil memadat dan hilang 20.58–20.80s sebelum panel perbandingan muncul. Penyesuaian ini menghilangkan tumpukan teks pada handoff, dengan interval baca tetap seperti kontrak.

Padding panel dibuat lebih ringkas agar isi review, keterangan gaji, dan tahapan interview tetap di atas footer. Penutup memakai kata “tahu” merah dan tombol merah/teks hitam, mengikuti CTA homepage. Akhir video hold 27.10–30.00s tanpa exit.
