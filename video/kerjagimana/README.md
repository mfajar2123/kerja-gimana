# KerjaGimana — Cari tahu dulu

Komposisi aktif: horizontal 1920 × 1080, 30 fps, **20 detik**, kamera mengikuti kata/antarbaris, foto dengan transisi zoom, musik dan SFX. Typography dan warna mengikuti design system KerjaGimana. Panel UI, angka DEMO, indeks, dan footer dekoratif telah dihapus sesuai revisi pengguna.

Brief dan storyboard aktif ada di [docs/video](../../docs/video/brief.md). Revisi terbaru 15 Oktober memakai copy percakapan Gen Z yang sopan: “Mau kerja di sana?” sampai “Biar makin yakin, cek dulu, baru gas.” Domain `kerjagimana.live` tetap di penutup. Hasil aktif: `artifacts/video/kerjagimana-horizontal-20s-genz.mp4`. Versi domain dengan copy lama, versi sebelum domain, dan versi 30 detik tetap disimpan. Aplikasi dan data live tidak diubah.

Varian portrait TikTok/Reels 1080 × 1920 berada pada proyek terpisah [kerjagimana-portrait](../kerjagimana-portrait/README.md), dengan copy/audio yang sama dan layout/kamera 9:16.

## Menjalankan ulang

Dari folder ini, setelah dependensi aplikasi utama tersedia:

```powershell
pnpm install
node fetch-media.mjs
node fetch-audio.mjs
node prepare-audio.mjs
node prepare-assets.mjs
node audit-assets.mjs --verify-sources
node tools.mjs check --snapshots
node tools.mjs preview --background --no-open --port 3002
node render.mjs
```

Preview: http://localhost:3002/#project/kerjagimana. `tools.mjs` memilih Chromium dari instalasi Playwright proyek, menggunakan headless shell yang tersedia pada Windows, dan mengonfigurasi FFmpeg/FFprobe lokal. Tidak memerlukan layanan cloud atau API key. Telemetry HyperFrames dimatikan pada wrapper ini.

## Sumber yang dapat diedit

- `index.html`: host timeline utama.
- `compositions/film.html`: komposisi aktif yang dapat diedit di Studio.
- `style-v2.css`: typography, palette, dan layout aktif.
- `composition-v2.html.template` + `animation-v2.js`: sumber authoring aktif; rebuild eksplisit lewat `node prepare-assets.mjs --rebuild`. Ini mengganti `compositions/film.html`, jadi simpan perubahan Studio sebelum rebuild.
- `prepare-assets.mjs`: font/logo dan GSAP lokal.
- `fetch-media.mjs` / `fetch-audio.mjs`: memperoleh media stok dari URL publik sumbernya; ledger lisensi ada di [credits](../../docs/video/credits.md).
- `audit-assets.mjs --verify-sources`: cocokkan hash enam original dengan sumber resmi, cocokkan font dengan paket lokal, simpan salinan lisensi dan [laporan](../../docs/video/asset-audit.json). Target lisensi stok musik adalah promosi online; lihat batasan TV/radio/game/CD/DVD di ledger.
- `prepare-audio.mjs`: mix stereo 20 detik; musik dan lima cue aksen tanpa VO.
- `review-v2.mjs`: seek 600 posisi, sampling keterbacaan tiap 5 frame, focused-word checks, round trip maju/mundur, dan snapshot beat/transisi.
- `render.mjs`: encode lalu verifikasi 1920 × 1080, 30 fps, 600 frame, 20 detik, dan satu stream audio dengan FFprobe.
- `postprocess.mjs`: decode seluruh MP4, poster, dan filmstrip untuk review.

File `style.css`, `animation.js`, `composition.html.template`, dan `review.mjs` merupakan sumber versi 30 detik yang diarsipkan; tidak dimuat oleh komposisi aktif.

`prepare-assets.mjs` tanpa `--rebuild` mempertahankan komposisi aktif agar render ulang tidak menghapus hasil penyuntingan Studio. Font, file GSAP lokal, snapshot, dan render tidak masuk Git; aset dapat dipersiapkan ulang dari dependensi proyek.
