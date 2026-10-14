# Storyboard aktif — KerjaGimana / 20 detik

Horizontal 1920 × 1080 / 30 fps. Semua waktu absolut. Brief: [brief.md](brief.md). Audio: [manifest](audio-manifest.json). Status implementasi/render: [production.md](production.md).

## Kontrak motion bersama

Camera rig `transform-origin: 0 0`. Posisi layar dihitung dari target world `(cx,cy)` sebagai `a - scale*p`; tidak menggerakkan kata untuk meniru pan kamera. Reveal lokal 16 px / 0.27s / blur 3→0 px; exit 0.19–0.25s, blur hanya layer yang pergi. Kamera memakai ease-in/out untuk traverse dan pullback. Read pose sharp, tanpa blur; reset baris diberi jeda.

Headline Space Grotesk 130–184 px, bobot 600; spasi antarword dikoreksi memakai ukuran font yang benar-benar dirender. Aksen merah hanya “tahu”. Tidak ada hiasan masuk yang bersaing dengan kalimat utama. Foto terpisah dari rig teks, supaya zoom foto tidak menggandakan gerak teks.

| Beat / waktu | Copy persis dan fokus | Kamera, motion, interval baca | Handoff dan audio |
| --- | --- | --- | --- |
| B01 / 0.00–1.70 | “Kerja / di sana.” pada hitam | Close 1.60× ke “Kerja”; reveal 0.00. Reset ke baris dua 0.38–0.72; “di” 0.50, “sana.” 0.67. Traverse 0.74–1.04, pullback 1.04–1.36 ke 1×. Full phrase sharp 1.36–1.50; kata telah dibaca berurutan sebelumnya. | Exit 1.50–1.70; pertanyaan masuk langsung pada latar sama. Musik membuka dengan fade pendek; tanpa SFX per kata. |
| B02 / 1.70–5.00 | “Yakin udah / tahu dalemnya?”; “tahu” merah | Close 1.45× ke Yakin; udah masuk 2.05 dan diikuti kamera 1.99–2.51. Jeda 2.51–2.70, reset ke tahu 2.70–3.13. Tahu masuk 2.86, dalemnya 3.15; traverse ke dalemnya 3.12–3.62. Pullback 3.67–4.17; kalimat utuh sharp 4.17–4.75. | Exit 4.75–5.00. Foto kerja muncul dari close crop pada 5.00. Sweep pendek mendukung reset baris. |
| B03 / 5.00–7.50 | “Pengalaman / kerja.”; foto kolaborasi | Foto 1.42×→1.08× 5.00–5.52, drift menuju 1.03×. Teks pertama 5.18, baris dua 5.58; rig mengikuti baris dua 5.50–5.86, pullback 5.98–6.33. Full text sharp 6.33–7.08. | Teks keluar 7.08–7.27. Foto push in 7.07–7.50; foto gaji masuk close 7.38, overlap 0.12s. Air zoom mendukung foto berganti. |
| B04 / 7.38–10.20 | “Ringkasan / gaji.”; “Saat data mencukupi.”; foto kalkulasi | Foto kedua close→wide 7.38–7.90. Rig teks mengikuti dua baris 7.55–8.43, pullback 8.43–8.78. Keterangan masuk 8.80–9.05. Semua sharp 9.05–9.78. Tidak ada nominal atau angka palsu. | Teks/keterangan keluar 9.78–9.97. Foto push 9.77–10.20; foto interview masuk 10.08. Sweep pendek untuk handoff. |
| B05 / 10.08–13.10 | “Proses / interview.”; foto percakapan | Foto ketiga close→wide 10.08–10.60, drift. Proses masuk 10.34; interview masuk 10.74; rig reset ke baris dua 10.66–11.02, pullback 11.14–11.49. Sharp 11.49–12.66. | Teks keluar 12.66–12.85. Foto push 12.67–13.10; paper masuk 13.02–13.22. Air zoom membuka konteks berikut. |
| B06 / 13.10–15.30 | “Bandingkan / sebelum memilih.”; teks hitam di paper | Close 1.32× pada Bandingkan; reset ke sebelum 13.50–13.88; memilih reveal 13.85 dan traverse 13.80–14.25. Pullback 14.28–14.63; kalimat utuh sharp 14.63–15.06. | Exit 15.06–15.26, latar hitam masuk 15.23–15.41. Tidak ada kartu/ranking/ikon. |
| B07 / 15.30–20.00 | “Sebelum kerja di sana, / cari tahu dulu.”; brand; “Cari perusahaan ↗” | Close 1.33× pada Sebelum. Reveal kerja 15.55, di sana 15.78, kamera mengikuti 15.50–16.20. Jeda 16.20–16.34, reset baris 16.34–16.72. Cari 16.48, tahu 16.71, dulu 16.94; traverse 16.72–17.30. Pullback 17.37–17.83. Brand masuk 18.00–18.25, CTA 18.15–18.45. | Sweep kecil pada pullback. Semua elemen settle 18.45; **hold final 18.45–20.00** tanpa exit, bounce, tombol kotak, footer, atau efek tambahan. Musik fade out 18.60–20.00. |

## Asset state dan review

Tiga foto tersedia lokal, sumber Pexels dan lisensinya dicatat di [credits](credits.md). Musik/SFX tersedia lokal dan dicampur menjadi WAV stereo 20 detik. Media playback dan mux audio dimiliki HyperFrames; script visual tidak memainkan audio.

Seek 600 posisi dan sampling interval baca/focused-word checks lulus sebelum render; foto termuat, forward/backward pose konsisten. Posisi kata dan hasil pullback diperiksa melalui snapshot. Playback penuh normal-speed dan kualitas timbral audio belum diklaim telah diaudisi secara manusia. Lihat laporan produksi untuk metadata MP4 dan pemeriksaan hasil encode yang selesai.
