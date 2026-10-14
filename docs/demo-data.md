# Data demo dan QA manual

Dataset `kerjagimana-demo-v1` telah dimasukkan ke proyek Supabase Free yang sama. Semua organisasi, cerita, bukti, dan keputusan demo adalah fiktif, ditandai DEMO. Banner muncul jika `NUXT_PUBLIC_DEMO_DATA_ENABLED=true`. Jangan menganggap isinya sebagai informasi perusahaan nyata.

| Data | Jumlah |
| --- | ---: |
| Akun sintetis | 9 |
| Perusahaan / lokasi | 5 / 5 |
| Ulasan / rating | 17 / 17 |
| Laporan gaji | 22 |
| Pengalaman interview | 12 |
| Wakil perusahaan / tanggapan | 3 / 4 |
| Laporan ulasan / kontak | 3 / 3 |
| Riwayat moderasi / audit | 42 / 42 |

Tiga perusahaan approved tampil di direktori. Dua usulan lainnya pending/rejected sehingga tersedia untuk pemeriksaan admin. Konten mencakup status pending, published, rejected, removed, dan satu draft. Draft hanya merupakan fixture histori; formulir saat ini mengirim pending.

## Login

Kredensial acak disimpan hanya di `.demo-data.local.json`, bagian `accounts`. File ini diabaikan Git dan tidak dikirim ke browser. Jangan menyalin isinya ke issue, chat, atau commit.

- `pengguna-1` sampai `pengguna-6`: akun biasa; pengguna keenam memiliki kontribusi pending dan permintaan perusahaan.
- `wakil`: wakil terverifikasi DEMO Aurora, dapat mengirim tanggapan pada review Aurora.
- `admin`: admin untuk antrean moderasi, perusahaan, laporan, kontak, dan status akun.
- `ditangguhkan`: contoh akun yang ditolak untuk akses privat dan kontribusi.

Semua akun menggunakan domain sintetis `kerjagimana-demo.example`. Email sudah dikonfirmasi melalui Admin API khusus fixture; akun ini tidak menerima email pemulihan.

Kesembilan kredensial tersimpan telah diuji melalui sesi Supabase dan API aplikasi: profil aktif dapat diakses, akses admin hanya berhasil untuk akun admin, akun wakil dapat masuk, dan akun ditangguhkan ditolak. Hanya sesi tes tersebut yang dicabut setelah pemeriksaan.

Buka `/masuk` untuk pengguna; `/masuk?next=/admin` menampilkan konteks admin dengan mekanisme autentikasi yang sama. Hak admin ditentukan profil di database. Keluar melalui menu akun sebelum berganti akun. Sesi aktif yang membuka `/masuk` diarahkan ke dashboard atau admin sesuai perannya.

## Skenario manual

1. Periksa direktori, pencarian, industri, lokasi, detail, ulasan, gaji, interview, dan perbandingan dua atau tiga perusahaan.
2. Aurora memiliki lima pelapor unik untuk masing-masing gross/take-home sehingga median terlihat. Dua perusahaan lain memiliki empat pelapor per kelompok, sehingga angka gaji tidak ditampilkan. Angka tahunan dinormalisasi per bulan.
3. Masuk sebagai pengguna keenam, periksa kontribusi pending dan pengaturan. Kirim kontribusi baru menggunakan judul/peran berbeda agar tidak menabrak aturan duplikat.
4. Keluar, masuk sebagai admin. Tinjau semua jenis antrean, beri catatan keputusan, periksa publikasi dan status pengguna. Edit profil perusahaan melalui tombol Edit profil.
5. Masuk sebagai wakil, kirim tanggapan Aurora. Tanggapan perlu moderasi sebelum tampil.
6. Periksa pada lebar 320/390/768/1024/1440. Tabel lebar dapat digeser dan difokuskan melalui keyboard; halaman keseluruhan tidak boleh melebar.

## Menjalankan ulang / membersihkan

`pnpm seed:demo` melakukan upsert dengan ID stabil dan tag akun milik server. Pengulangan seed mengembalikan status demo ke fixture awal; jangan jalankan saat ingin mempertahankan hasil QA manual pada data demo.

`pnpm demo:clean` menghapus ID dalam manifest serta akun bertag dataset ini. Data pengguna yang tidak termasuk dataset tidak dipilih untuk dihapus. Simpan manifest selama menggunakan data demo. Memodifikasi data demo dengan akun nyata dapat meninggalkan catatan audit terkait; skrip tidak menghapus audit pengguna lain sembarangan.

Seed dan cleanup hanya diarahkan ke proyek yang telah diotorisasi, tidak membuat proyek baru atau mengaktifkan billing. Restart server bila mengubah flag demo secara manual.
