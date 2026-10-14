# KerjaGimana — persiapan Claude Startups

Diperiksa 13 Oktober 2026. Status: **belum siap diajukan sebagai aplikasi lengkap dan belum dapat dipastikan eligible**. Founder menyatakan belum memiliki domain publik/email bisnis/Claude Console; yang tersedia adalah akun Claude biasa. Status badan usaha, tanggal mulai usaha, dan pendanaan belum dikonfirmasi.

## Hasil pemeriksaan sumber resmi

[Halaman Claude Startups](https://claude.com/programs/startups) yang dibuka langsung pada tanggal audit menerima startup bootstrapped, pre-seed, dan venture-backed; pendanaan VC bukan syarat umum untuk mendaftar. Pendaftaran sekarang mengarah ke [Claude Console](https://platform.claude.com/offers/startups-application). Formulir di balik login belum dapat diperiksa dalam sesi ini.

Halaman yang sama menyatakan penawaran satu tahun Claude Team dan kredit API $1.000 sedang kelebihan kapasitas, serta aplikasi sedang ditinjau ulang. Jangan menjadikan kredit tersebut asumsi anggaran. Ringkasan pencarian masih memuat versi halaman sebelumnya; jadikan halaman langsung dan syarat di formulir saat pengajuan sebagai acuan.

[Ketentuan resmi](https://www.anthropic.com/startup-program-official-terms) menyebut penilaian atas traction, pendanaan, dan integrasi/penggunaan Claude, dengan keputusan akhir oleh Anthropic. Situs yang baik atau label AI tidak menjamin penerimaan. Pastikan lokasi operasi dan calon pengguna memenuhi kebijakan dukungan Anthropic ketika mengajukan.

## Yang perlu dilengkapi founder

1. Tentukan domain milik startup, terbitkan situs yang dapat diakses, dan siapkan email bisnis yang menerima balasan pada domain tersebut. Ini juga membuat identitas bisnis bisa diverifikasi.
2. Buat akun/organisasi Claude Console untuk perusahaan. Akun aplikasi Claude biasa belum membuktikan adanya organisasi API. Jangan mengaktifkan pembayaran atau memasukkan kartu hanya untuk menampilkan teaser.
3. Catat tanggal mulai usaha yang sebenarnya, identitas founder/operator, lokasi operasi, ukuran tim, status pendanaan, dan riwayat kredit bila ada. Cocokkan dengan persyaratan aktual formulir; jangan mengarang badan usaha, investor, atau traction.
4. Selesaikan penghalang rilis di [launch-readiness.md](launch-readiness.md), termasuk SMTP dan kunci yang pernah terungkap. Semua data DEMO harus disebut sebagai data pengujian, bukan pelanggan atau traction.
5. Sertakan tautan demo, gambaran arsitektur, dan rencana penggunaan Claude yang masih direncanakan. Ajukan sendiri melalui Console setelah membaca syarat terkini. Belum ada aplikasi yang dikirim dari sesi ini.

## Draf deskripsi produk (bahasa Inggris)

> KerjaGimana is an early-stage workplace research product for Indonesian job seekers. Its current MVP lets people explore company profiles, read human-moderated workplace reviews and interview experiences, compare companies, and view salary aggregates only when a cohort has at least five distinct contributors. Public reviews do not display account identities. The product is currently being prepared for launch; demonstration records are clearly identified as fictional.
>
> We plan to build Kompas Karier AI, an evidence-grounded career research assistant using Claude. It would help users summarize published workplace experiences, compare companies against their stated priorities, and prepare interview questions while showing source references and gaps in the available evidence. This AI capability is currently a coming-soon concept, not an active integration. We would use Claude to synthesize permitted public information, while keeping raw salaries, account identifiers, private reports, and moderation evidence out of model inputs. Human moderators would retain publication decisions, and users would retain career decisions.

Gunakan hanya setelah founder memastikan setiap pernyataan sesuai kondisi saat pengajuan. Jangan mengganti “plan” dengan “use” sebelum integrasi benar-benar dibangun dan diuji.

## Rencana penggunaan Claude — belum diimplementasikan

- Sumber: hanya kontribusi yang sudah terbit dan agregat gaji yang memenuhi batas privasi. Setiap ringkasan memiliki tautan sumber, periode, dan penjelasan keterbatasan sampel.
- Perilaku saat data kurang: menyatakan keterbatasan; tidak mengarang rating, gaji, perusahaan, kutipan, atau kesimpulan tentang individu.
- Keamanan: pemanggilan model di server, minimisasi data, batas penggunaan/biaya, pengujian prompt injection pada konten komunitas, serta pembersihan cache ketika sumber dihapus atau diturunkan.
- Evaluasi sebelum rilis: ketepatan rujukan, kesetiaan ringkasan, privasi, bias, dan kejelasan bahasa Indonesia. Tidak ada publikasi otomatis, penilaian kandidat, atau keputusan perekrutan oleh model.
- Tahapan: validasi kebutuhan dengan pengguna awal → prototipe terpisah menggunakan data yang diizinkan → evaluasi → beta opt-in. Tidak ada tanggal rilis atau biaya operasional AI yang dijanjikan.
