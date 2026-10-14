# Produksi horizontal KerjaGimana

Instruksi pengguna: video horizontal 16:9, eksekusi tanpa audio dulu. Status: **selesai dirender, diperiksa teknis, dan ditinjau melalui frame/urutan frame terpilih**. Persetujuan visual final pengguna belum diberikan.

Sumber: [komposisi](../../video/kerjagimana/index.html), [template visual](../../video/kerjagimana/composition.html.template), [animation.js](../../video/kerjagimana/animation.js), [brief](brief.md), [storyboard](storyboard.md).

Deliverable: [kerjagimana-horizontal-no-audio.mp4](../../artifacts/video/kerjagimana-horizontal-no-audio.mp4), H.264, **1920 × 1080, 30 fps, 30.000 detik / 900 frame, nol stream audio**, 3.018.173 byte. Metadata aktual: [render-report.json](../../artifacts/video/render-report.json).

Preview aktif saat handoff: [Studio](http://localhost:3002/#project/kerjagimana); server diverifikasi HTTP 200. [Poster](../../artifacts/video/poster.png) dan [contact sheet dari MP4](../../artifacts/video/render-contact-sheet.png) tersedia.

Runtime produksi: HyperFrames 0.8.151, GSAP 3.15.0; font dan logo disalin dari proyek ke folder aset lokal. UI adalah adaptasi untuk video, dengan data sintetis yang ditandai DEMO. Tidak ada capture/database live, generation media, layanan berbayar, atau publikasi.

Pemeriksaan HyperFrames terbaru lulus: dua file komposisi, nol lint/runtime/layout error atau warning, delapan waktu sampel, 69 pemeriksaan kontras lulus. Pemeriksaan pertama menemukan footer bertumpuk dengan keterangan gaji; padding panel diperbaiki dan pemeriksaan ulang lulus. Motion sidecar sub-komposisi belum ditemukan oleh auditor CLI ini, jadi motion tidak diklaim lulus dari sidecar; pemeriksaan seek terpisah berjalan lewat `review.mjs`.

Pemeriksaan seek terpisah lulus: **900 posisi frame**, **192 pengecekan elemen pada interval baca** (sampling tiap 10 frame), font lokal termuat, seek maju/mundur menghasilkan pose sama, nol masalah yang ditemukan dan nol runtime error. Laporan: [review/report.json](../../artifacts/video/review/report.json).

Snapshot seluruh delapan beat dan strip transisi pencarian→profil, review→gaji, serta penutup diperiksa. Seluruh MP4 berhasil didekode dengan FFmpeg; contact sheet diambil dari file hasil encode dan diperiksa agar tidak hanya mengandalkan screenshot browser. Playback penuh pada kecepatan normal belum ditinjau secara manusia. Review audio tidak berlaku karena nol track audio.

Render memakai screenshot capture dengan hardware GPU, dua worker; selesai sekitar 2 menit 20 detik. Probe awal Chrome GUI `--version` timeout pada Windows; wrapper memilih Chromium headless shell yang sudah terpasang, lalu FFmpeg/FFprobe/Chrome terverifikasi dan render berhasil. Tidak memasang browser baru atau menggunakan cloud.

Sumber aplikasi, dependensi utama, dan database tidak berubah. Dependensi video berada di package terpisah `video/kerjagimana`. `prepare-assets.mjs` menjaga komposisi aktif agar perubahan Studio tidak ditimpa pada render ulang; rebuild dari template merupakan perintah eksplisit. Instruksi reproduksi: [README video](../../video/kerjagimana/README.md).
