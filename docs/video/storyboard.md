# Storyboard aktif — KerjaGimana / 20 detik

Storyboard horizontal 1920 × 1080 / 30 fps. Varian portrait 1080 × 1920 memakai copy dan waktu yang sama dengan layout/kamera tersendiri: [storyboard portrait](portrait.md). Semua waktu absolut. Brief: [brief.md](brief.md). Audio: [manifest](audio-manifest.json). Status implementasi/render: [production.md](production.md).

## Kontrak motion bersama

Camera rig `transform-origin: 0 0`. Posisi layar dihitung dari target world `(cx,cy)` sebagai `a - scale*p`; tidak menggerakkan kata untuk meniru pan kamera. Reveal lokal 16 px / 0.27s / blur 3→0 px; exit 0.19–0.25s, blur hanya layer yang pergi. Kamera memakai ease-in/out untuk traverse dan pullback. Read pose sharp, tanpa blur; reset baris diberi jeda.

Revisi copy Gen Z: headline Space Grotesk 130–184 px, bobot 600; spasi antarword dikoreksi memakai ukuran font yang benar-benar dirender. Aksen merah pada “cocok” dan “dulu,”. Kamera direframe mengikuti panjang copy baru; waktu beat, foto, musik/SFX, domain, dan hold akhir tetap. Foto terpisah dari rig teks supaya zoom foto tidak menggandakan gerak teks.

| Beat / waktu | Copy persis dan fokus | Kamera, motion, interval baca | Handoff dan audio |
| --- | --- | --- | --- |
| B01 / 0.00–1.70 | “Mau kerja / di sana?” | Close 1.60× pada “Mau kerja” sebagai satu frasa; reveal 0.00. Reset 0.38–0.72; “di” 0.50, “sana?” 0.67. Traverse 0.74–1.04, pullback 1.04–1.36. Kalimat utuh sharp 1.36–1.50. | Exit 1.50–1.70; musik membuka dengan fade pendek. |
| B02 / 1.70–5.00 | “Udah yakin / cocok buat kamu?”; “cocok” merah | Udah 1.70; yakin 2.05; traverse 1.99–2.51. Jeda lalu reset 2.70–3.13. Cocok 2.86; buat kamu? 3.15; kamera berakhir di 1.35× agar frasa utuh. Pullback 3.67–4.17; kalimat sharp 4.17–4.75. | Exit 4.75–5.00. Sweep tetap pada reset baris. |
| B03 / 5.00–7.50 | “Intip cerita / kerjanya.”; foto kolaborasi | Foto 1.42×→1.08× 5.00–5.52 lalu drift. Frasa pertama 5.18; baris dua 5.58; kamera mengikuti 5.50–5.86 lalu pullback 5.98–6.33. Sharp 6.33–7.08. | Teks exit 7.08–7.27; push foto 7.07–7.50; overlap foto gaji mulai 7.38. |
| B04 / 7.38–10.20 | “Cek info / gajinya.”; “Kalau datanya cukup.” | Foto close→wide 7.38–7.90. Rig mengikuti dua baris mulai 7.55; reveal 7.63 dan 8.03; pullback 8.43–8.78. Keterangan 8.80–9.05. Semua sharp 9.05–9.78. | Exit 9.78–9.97; foto berikut masuk 10.08. Syarat ketersediaan data tetap terbaca. |
| B05 / 10.08–13.10 | “Gimana / interview-nya?”; foto percakapan | Foto close→wide 10.08–10.60. Gimana 10.34; interview-nya? 10.74; kamera menarget pusat frasa panjang `(610,680)` pada 1.20×. Pullback 11.14–11.49; sharp 11.49–12.66. | Exit 12.66–12.85; paper masuk 13.02–13.22. |
| B06 / 13.10–15.30 | “Bandingin / dulu, baru pilih.” | Bandingin 13.10; reset 13.50–13.88 ke dulu, 13.62; baru pilih. 13.85. Traverse 13.80–14.25, pullback 14.28–14.63. Sharp 14.63–15.06. | Exit 15.06–15.26; hitam masuk 15.23–15.41. |
| B07 / 15.30–20.00 | “Biar makin yakin, / cek dulu, baru gas.”; brand; “Cek perusahaan incaranmu ↗ kerjagimana.live” | Biar 15.32, makin 15.55, yakin, 15.78; kamera mengikuti 15.50–16.20. Reset 16.34–16.72. Cek 16.48, dulu, 16.71, baru gas. 16.94; traverse 16.72–17.30 ke pusat `(1085,635)`. Pullback 17.37–17.83. Brand 18.00–18.25; CTA/domain 18.15–18.45. | Semua settle 18.45; **hold final 18.45–20.00**. Domain 40 px tetap tajam hingga frame terakhir; musik fade out 18.60–20.00. |

## Asset state dan review

Tiga foto tersedia lokal, sumber Pexels dan lisensinya dicatat di [credits](credits.md). Musik/SFX tersedia lokal dan dicampur menjadi WAV stereo 20 detik. Media playback dan mux audio dimiliki HyperFrames; script visual tidak memainkan audio.

Seek 600 posisi dan sampling interval baca/focused-word checks lulus sebelum render; foto termuat, forward/backward pose konsisten. Posisi kata dan hasil pullback diperiksa melalui snapshot. Playback penuh normal-speed dan kualitas timbral audio belum diklaim telah diaudisi secara manusia. Lihat laporan produksi untuk metadata MP4 dan pemeriksaan hasil encode yang selesai.
