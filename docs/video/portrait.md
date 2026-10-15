# KerjaGimana — versi portrait Gen Z

Permintaan: adaptasi video terbaru menjadi layar portrait untuk TikTok/Instagram Reels. Format authoring dan export: **1080 × 1920 / 9:16 / 30 fps / 20 detik / 600 frame**. Video berupa MP4 H.264 yuv420p dengan AAC stereo 48 kHz. Versi horizontal tetap tersedia terpisah.

Copy, durasi adegan, urutan, musik/SFX, tiga foto dan domain mengikuti versi Gen Z horizontal. Teks dipecah ke dua sampai empat baris, kamera direframe ke world portrait, foto memakai object-fit cover dengan fokus per foto, dan CTA/domain ditumpuk. Font headline 112–142 px; domain 56 px. Tidak ada penambahan klaim produk, media, atau audio.

Area konten yang dipilih: x=84–900 dan y=240–1470; memberi ruang di kanan dan bawah untuk UI sosial. Ini pilihan layout konservatif, bukan template resmi atau jaminan untuk seluruh placement/platform. Browser pencarian spesifikasi platform tidak tersedia pada sesi ini (`401`); tidak mengklaim telah memverifikasi aturan distribusi terbaru. Video ini belum diunggah atau diuji di aplikasi TikTok/Instagram.

| Beat | Copy / pemenggalan portrait | Gerak dan interval baca |
| --- | --- | --- |
| 0.00–1.70 | Mau kerja / di sana? | Close 1.18× pada frasa pertama, reset ke baris dua 0.38–0.72, follow 0.74–1.04, full pose 1.36–1.50. |
| 1.70–5.00 | Udah yakin / cocok / buat kamu? | Traverse baris pertama lalu kamera turun ke dua baris berikut pada 2.70–3.62. Full pose sharp 4.17–4.75. “cocok” merah. |
| 5.00–7.50 | Intip cerita / kerjanya. | Foto kolaborasi full bleed; crop 58% horizontal. Dua focus pass, kamera 1.08×→1×, hold 6.33–7.08. |
| 7.38–10.20 | Cek info / gajinya. / Kalau datanya cukup. | Crop 57%; dua focus pass, qualifier 8.80–9.05; hold sampai 9.78. |
| 10.08–13.10 | Gimana / interview-nya? | Crop 66% untuk kandidat; font frasa panjang 112 px; kamera 1.04×→1×, hold 11.49–12.66. |
| 13.10–15.30 | Bandingin / dulu, / baru pilih. | Tiga focus state ke bawah, pullback 14.28–14.63, kalimat utuh 14.63–15.06. |
| 15.30–20.00 | Biar makin / yakin, / cek dulu, / baru gas. | Traverse frase lalu turun; pullback 17.37–17.83. Brand 18.00–18.25. CTA “Cek perusahaan incaranmu ↗” dan baris domain `kerjagimana.live` 18.15–18.45; hold 18.45–20.00. |

Master: [index.html](../../video/kerjagimana-portrait/index.html). Sumber: [template](../../video/kerjagimana-portrait/composition.html.template), [animation.js](../../video/kerjagimana-portrait/animation.js), [style.css](../../video/kerjagimana-portrait/style.css). MP4 target: [kerjagimana-portrait-20s-genz.mp4](../../artifacts/video/kerjagimana-portrait-20s-genz.mp4).

Status teknis selesai: HyperFrames lint/runtime/layout/motion lulus tanpa error/warning; 10 posisi timeline, 25/25 pemeriksaan kontras. Audit layout memindai 600 frame dengan 710 pemeriksaan keterbacaan; tidak ada masalah batas area aman atau pose fokus. Semua tujuh file lokal (runtime, dua font, tiga foto, mix) cocok SHA-256 dengan versi horizontal. MP4 final 6,236,362 byte berhasil didekode penuh; audionya AAC stereo 48 kHz dan hash audio hasil decode cocok persis dengan versi horizontal. Metadata dan bukti review ada di [review](../../artifacts/video/review-portrait/report.json), [render report](../../artifacts/video/render-report-portrait.json), [poster](../../artifacts/video/poster-portrait.png), serta [contact sheet](../../artifacts/video/render-contact-sheet-portrait.png). Direct audition dan uji playback dalam aplikasi sosial tidak diklaim.

Sumber/lisensi aset sama dengan [ledger](credits.md) dan [audit](asset-audit.json) sebelumnya; tidak memakai musik bawaan platform atau mengganti penyedia. Preview lokal: http://localhost:3004/#project/kerjagimana-portrait (status server dicatat setelah dimulai).
