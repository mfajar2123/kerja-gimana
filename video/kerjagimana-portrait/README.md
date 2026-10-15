# KerjaGimana — Gen Z / Portrait

Versi vertikal **1080 × 1920, 9:16, 30 fps, 20 detik** untuk video TikTok/Reels. Copy Gen Z, urutan beat, tiga foto, musik/SFX dan domain sama dengan versi horizontal. Kamera, pemenggalan baris, crop foto, skala teks dan susunan CTA dibuat khusus portrait.

Sumber authoring: `composition.html.template`, `animation.js`, `style.css`. `compositions/film.html` adalah komposisi aktif; `prepare-assets.mjs --rebuild` membangunnya dari sumber dan akan menggantikan edit Studio, jadi gunakan hanya setelah menyimpan edit tersebut.

```powershell
node prepare-assets.mjs
node tools.mjs check --snapshots --at 1.4,4.4,6.5,9.2,11.8,14.8,17.65,18.45,19,19.966 --strict
node review.mjs
node tools.mjs preview --background --no-open --port 3004
node render.mjs
node postprocess.mjs
```

Preview: http://localhost:3004/#project/kerjagimana-portrait. Hentikan dari folder ini dengan `node tools.mjs preview --stop`. Wrapper memakai HyperFrames/FFmpeg/FFprobe yang sudah terpasang di `../kerjagimana/node_modules`; tidak memerlukan instalasi baru. `prepare-assets.mjs` menyalin tujuh file lokal dan memeriksa bahwa SHA-256 masing-masing cocok dengan aset versi horizontal.

Output: [kerjagimana-portrait-20s-genz.mp4](../../artifacts/video/kerjagimana-portrait-20s-genz.mp4). Laporan: [render-report-portrait.json](../../artifacts/video/render-report-portrait.json). Preview frame: [poster-portrait.png](../../artifacts/video/poster-portrait.png) dan [contact sheet](../../artifacts/video/render-contact-sheet-portrait.png).

`review.mjs` melakukan seek semua 600 posisi, memeriksa seluruh frame pada interval hold terhadap area konten `(84,240)–(900,1470)`, memeriksa kata fokus, serta round trip maju/mundur. Area tersebut adalah margin konservatif yang dipilih untuk layout ini, bukan jaminan semua variasi overlay/caption/platform. `postprocess.mjs` melakukan decode MP4 penuh, memeriksa audio identik dengan versi horizontal, dan mengekstrak frame hasil encode.

Brief/storyboard dan status portrait: [docs/video/portrait.md](../../docs/video/portrait.md). Sumber/lisensi aset: [credits](../../docs/video/credits.md), [audit](../../docs/video/asset-audit.json). Tidak menambah media, membeli kredit, atau mengunggah video ke platform.
