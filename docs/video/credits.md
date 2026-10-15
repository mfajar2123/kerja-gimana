# Media ledger — KerjaGimana 20s

Media diperoleh 14 Oktober 2026; sumber dan lisensi diperiksa ulang pada **15 Oktober 2026** untuk revisi domain `kerjagimana.live`. Target pemakaian: video promosi komersial di web, media sosial, dan iklan online. Foto adalah ilustrasi konteks, bukan perusahaan/pegawai KerjaGimana atau endorsement. Source originals tetap lokal di folder aset yang diabaikan Git; deliverable publik yang dimaksud adalah video komposit, bukan paket stok.

| Asset | Sumber | Pemakaian |
| --- | --- | --- |
| Work photo / Andrea Piacquadio | [Pexels 3866621](https://www.pexels.com/photo/concentrated-multiethnic-group-working-on-laptop-in-office-3866621/) | Crop foto kolaborasi sebagai konteks pengalaman kerja |
| Salary photo / Jakub Zerdzicki | [Pexels 16695382](https://www.pexels.com/photo/man-hands-over-calculator-16695382/) | Crop kalkulator/laptop sebagai konteks informasi gaji |
| Interview photo / Tima Miroshnichenko | [Pexels 5439157](https://www.pexels.com/photo/candidate-having-an-interview-5439157/) | Percakapan sebagai ilustrasi interview |
| Music / “Tech House vibes”, Alejandro Magaña (A. M.) | [Mixkit Electronica](https://mixkit.co/free-stock-music/electronica/), asset 130 | Excerpt sumber 8–28s, fade, gain, dipakai di video |
| SFX / “Fast small sweep transition” | [Mixkit Transition](https://mixkit.co/free-sound-effects/transition/), asset 166 | Reset baris dan handoff terpilih |
| SFX / “Air zoom vacuum” | [Mixkit Transition](https://mixkit.co/free-sound-effects/transition/), asset 2608 | Dua transisi zoom konteks |
| Font / Space Grotesk Variable | Paket proyek `@fontsource-variable/space-grotesk` 5.3.0; [lisensi lokal](licenses/space-grotesk-OFL.txt) | Headline dan wordmark; SIL Open Font License 1.1 |
| Font / Plus Jakarta Sans Variable | Paket proyek `@fontsource-variable/plus-jakarta-sans` 5.3.0; [lisensi lokal](licenses/plus-jakarta-sans-OFL.txt) | CTA/domain/keterangan; SIL Open Font License 1.1 |
| Wordmark, simbol K, arrow, bentuk dan layout | Tipografi dan bentuk CSS dari proyek sendiri | Tidak memakai logo/ilustrasi stok eksternal; pemeriksaan ini tidak menetapkan kepemilikan merek dagang |

Foto dipakai menurut [Pexels License](https://www.pexels.com/license/), yang mengizinkan penggunaan/adaptasi dalam marketing tanpa atribusi wajib, dengan pembatasan seperti tidak menyiratkan endorsement.

Musik dipakai menurut [Mixkit Stock Music Free License](https://mixkit.co/license/modal/musicFree/) untuk video web/social/online ads. Lisensi ini membatasi penggunaan pada TV/radio, CD/DVD, games, dan distribusi sebagai musik saja; target video ini adalah online. SFX mengikuti [Mixkit Sound Effects Free License](https://mixkit.co/license/modal/sfxFree/); tidak didistribusikan tersendiri atau sebagai stok dalam source package.

Tidak ada pembelian, subscription, generation media, akun baru, atau pemakaian API berbayar. Manifest cue/mix: [audio-manifest.json](audio-manifest.json). Semua klaim hak di ledger ini merujuk terms aset yang dibaca, bukan label “royalty free” saja.

## Bukti pemeriksaan ulang

`node audit-assets.mjs --verify-sources` mengunduh ulang enam original dari CDN resmi Pexels/Mixkit dan membandingkan SHA-256: **6/6 identik dengan file yang dipakai**. Kedua WOFF2 identik dengan file paket font proyek; copyright dan OFL lengkap disimpan di [licenses](licenses/). [Laporan audit](asset-audit.json) merekam URL aset, lisensi, hash, ukuran, dan waktu pemeriksaan. Halaman resmi ketiga foto juga diperiksa: nama pembuat, ID, dan status Free cocok dengan ledger ini.

Salinan terms yang dibaca: [Mixkit Music Free](licenses/mixkit-music-free.html), [Mixkit SFX Free](licenses/mixkit-sfx-free.html), [Mixkit User Terms](licenses/mixkit-terms.html). Lisensi foto dibaca pada [halaman resmi Pexels](https://www.pexels.com/license/). Penggunaan foto dalam video ditinjau sebagai ilustrasi kerja/interview/keuangan tanpa atribusi testimoni, klaim tentang orang tertentu, atau endorsement.

Kesimpulan untuk penggunaan yang dicatat: ketiga foto serta musik/SFX boleh dipakai secara gratis dalam video promosi online ini; font OFL boleh dipakai untuk teks video komersial. Atribusi foto tidak diwajibkan Pexels; kredit sumber tetap disimpan di sini. Ini tidak berarti public domain atau bebas dari semua syarat: musik Mixkit **tidak boleh untuk siaran TV/radio, game, atau CD/DVD**, tidak boleh didaftarkan sebagai milik sendiri di sistem pengelolaan hak, dan stok audio/foto tidak boleh dijual atau didistribusikan ulang sebagai aset tersendiri. Jika membagikan proyek sumber, keluarkan file SFX Mixkit dan gunakan skrip unduhan lokal agar penerima memperoleh sendiri aset dari penyedia; distribusikan MP4 komposit untuk publikasi.

GSAP 3.15.0 adalah alat animasi lokal, bukan aset gambar/audio yang disisipkan sebagai kode ke MP4; [Standard License](https://gsap.com/community/standard-license/) mengizinkan penggunaan komersial tanpa biaya. Font/GSAP yang disalin untuk authoring tidak mengubah lisensi stock media di atas.
