import type { Article } from './articles'

const author = { name: 'Tim Editorial KerjaGimana', role: 'Penulis' }
const reviewer = { name: 'Tim Editorial KerjaGimana', role: 'Peninjau' }
const reviewedAt = '2026-11-04'

export const extraArticles: Article[] = [
  {
    slug: 'panduan-memakai-kerjagimana-cari-perusahaan-review-gaji',
    title: 'Panduan memakai KerjaGimana: cari perusahaan, baca review, dan bandingkan gaji',
    description: 'Langkah demi langkah memakai direktori perusahaan, membaca pengalaman kerja, melihat ringkasan gaji, dan menghitung sisa tawaran dengan screenshot asli aplikasi.',
    category: 'Panduan produk',
    date: '2026-11-04',
    image: '/images/articles/lowongan.webp',
    imageAlt: 'Ilustrasi pencari kerja menggunakan laptop untuk menelusuri informasi perusahaan',
    author,
    reviewer,
    reviewedAt,
    keywords: ['cara memakai kerjagimana', 'review perusahaan', 'bandingkan gaji', 'lapor gaji', 'riset perusahaan'],
    source: { name: 'KerjaGimana', url: 'https://kerjagimana.live/perusahaan', date: 'Diakses 4 November 2026' },
    sections: [
      {
        heading: 'Mulai dari pencarian perusahaan',
        paragraphs: [
          'Buka menu Perusahaan. Masukkan nama perusahaan pada kolom pencarian, lalu persempit hasil dengan bidang industri atau kota. Hasil pencarian menampilkan jumlah review dan rating keseluruhan. Rating hanya muncul dari kontribusi yang sudah dimoderasi, sehingga perusahaan tanpa data akan tampil apa adanya.',
          'Jika perusahaan yang kamu cari belum ada, gunakan tautan usulkan perusahaan. Usulan akan diperiksa sebelum tampil. Jangan menganggap perusahaan yang belum terdaftar sebagai perusahaan yang tidak layak; direktori ini tumbuh dari kontribusi pengguna dan belum mencakup seluruh perusahaan di Indonesia.',
        ],
        figure: {
          src: '/images/articles/app/cari-perusahaan.jpg',
          alt: 'Screenshot halaman direktori KerjaGimana dengan kolom pencarian nama perusahaan, filter industri, dan filter kota',
          caption: 'Halaman Perusahaan: cari berdasarkan nama, lalu persempit dengan industri dan kota.',
        },
      },
      {
        heading: 'Baca profil dan rating dengan konteks',
        paragraphs: [
          'Halaman profil merangkum rating pengalaman keseluruhan, keseimbangan hidup, kompensasi, manajemen, dan peluang berkembang. Angka ini adalah rata-rata dari review yang lolos moderasi, bukan penilaian resmi perusahaan. Perhatikan jumlah review: rating dari lima orang dan lima puluh orang punya tingkat keyakinan yang berbeda.',
          'Buka tab Pengalaman kerja untuk membaca cerita yang lebih spesifik. Perhatikan tanggal, peran, lokasi, dan apakah ada tanggapan perusahaan. Satu review tidak mewakili seluruh perusahaan; carilah pola yang muncul di beberapa review, misalnya keluhan tentang jam kerja atau pujian tentang pembimbing.',
        ],
        figure: {
          src: '/images/articles/app/profil-perusahaan.jpg',
          alt: 'Screenshot profil perusahaan KerjaGimana yang menampilkan rating keseluruhan dan rincian lima dimensi penilaian',
          caption: 'Profil perusahaan: rating keseluruhan dan lima dimensi, lengkap dengan jumlah review yang sudah dimoderasi.',
        },
      },
      {
        heading: 'Lihat ringkasan gaji dan cerita interview',
        paragraphs: [
          'Tab Informasi gaji menampilkan median gaji pokok per bulan untuk kelompok peran yang memiliki cukup pelapor. Gross dan take-home pay dipisahkan. Jika jumlah pelapor belum memenuhi batas minimum, angka tidak ditampilkan untuk menjaga privasi. Kamu bisa menambahkan laporan gaji sendiri melalui tombol Bagikan informasi gaji.',
          'Tab Interview berisi pengalaman tahapan seleksi, pertanyaan yang muncul, dan hasilnya. Gunakan informasi ini untuk menyiapkan contoh jawaban, bukan untuk menghafal pertanyaan. Detail pengalaman orang lain bisa berbeda dengan tim dan periode yang kamu lamar.',
        ],
        figure: {
          src: '/images/articles/app/ringkasan-gaji.jpg',
          alt: 'Screenshot halaman informasi gaji perusahaan yang menampilkan median gaji pokok bulanan gross dan take-home pay',
          caption: 'Ringkasan gaji: median per peran, lokasi, status kerja, dan jenis angka, dengan jumlah sampel yang tersedia.',
        },
      },
      {
        heading: 'Bandingkan dua tawaran dengan angka yang setara',
        paragraphs: [
          'Buka halaman Bandingkan tawaran. Isi gaji bruto, tunjangan tetap, potongan, dan biaya kerja untuk masing-masing tawaran. Alat ini menghitung perkiraan uang yang tersisa per bulan dan menunjukkan selisihnya. Angka yang kamu isi diproses di perangkatmu dan tidak dikirim ke server.',
          'Gunakan hasilnya sebagai bahan diskusi, bukan keputusan akhir. Alat ini tidak menghitung pajak, BPJS, bonus, THR, atau lembur secara otomatis. Mintalah rincian tertulis dari perekrut, lalu masukkan angka yang benar-benar berlaku. Pertimbangkan juga jenis kontrak, jam kerja, lokasi, dan kesempatan belajar.',
        ],
        figure: {
          src: '/images/articles/app/bandingkan-tawaran.jpg',
          alt: 'Screenshot alat Bandingkan tawaran KerjaGimana yang menampilkan dua tawaran dan hasil selisih perkiraan uang tersisa per bulan',
          caption: 'Bandingkan tawaran: masukkan komponen yang sama untuk kedua tawaran agar selisihnya bisa dibaca.',
        },
      },
      {
        heading: 'Berkontribusi tanpa membocorkan data pribadi',
        paragraphs: [
          'Untuk mengirim review, laporan gaji, atau cerita interview, masuk ke akun dan gunakan formulir kontribusi. Kontribusi akan diperiksa sebelum tampil. Kamu bisa memantau statusnya di dashboard. Gunakan data yang benar, tetapi jangan menyertakan nama rekan kerja, nomor telepon, alamat surel pribadi, atau dokumen rahasia perusahaan.',
          'Screenshot formulir di bawah diambil dari data demo, bukan data perusahaan nyata. Saat mengisi, pilih perusahaan dari direktori, tulis peran dan lokasi, lalu masukkan angka dalam rupiah. Untuk laporan gaji, pisahkan gaji pokok, tunjangan, bonus, dan jenis angka (gross atau take-home) agar pembaca tidak membandingkan komponen yang berbeda.',
        ],
        figure: {
          src: '/images/articles/app/lapor-gaji.jpg',
          alt: 'Screenshot formulir laporan gaji KerjaGimana dengan pilihan perusahaan, peran, kota, jenis kerja, pengalaman, gaji pokok, periode, dan jenis angka',
          caption: 'Formulir laporan gaji: pilih perusahaan, isi komponen upah, dan tentukan jenis angka yang dilaporkan.',
        },
      },
    ],
  },
  {
    slug: 'pertanyaan-interview-kerja-dan-jawaban-2026',
    title: 'Pertanyaan interview kerja dan cara menjawabnya: 20 contoh yang sering muncul',
    description: 'Daftar pertanyaan interview kerja paling sering muncul, kerangka jawaban, dan contoh singkat untuk kandidat baru maupun berpengalaman.',
    category: 'Wawancara',
    date: '2026-11-04',
    image: '/images/articles/magang.webp',
    imageAlt: 'Ilustrasi kandidat mengikuti sesi wawancara kerja',
    author,
    reviewer,
    reviewedAt,
    keywords: ['pertanyaan interview kerja', 'jawaban interview', 'pertanyaan wawancara', 'interview HRD', 'contoh jawaban interview'],
    source: { name: 'Pusat Pasar Kerja Kemnaker', url: 'https://paskerid.kemnaker.go.id/news/107', date: 'Diakses 4 November 2026' },
    sections: [
      {
        heading: 'Pertanyaan pembuka: ceritakan tentang diri kamu',
        paragraphs: [
          'Jawab dengan struktur sekarang-dulu-nanti: posisi atau latar belakang saat ini, pengalaman yang relevan dengan posisi, lalu alasan ingin mengambil peran ini. Batasi sekitar 60–90 detik. Contoh: “Saya lulusan statistika dan saat ini bekerja sebagai analis data di perusahaan distribusi. Saya terbiasa merapikan data penjualan dan membuat laporan mingguan. Saya tertarik pada posisi ini karena tim Anda sedang membangun dasbor untuk keputusan operasional.”',
          'Hindari menceritakan seluruh riwayat hidup atau mengulang isi CV baris per baris. Pilih dua pengalaman yang paling dekat dengan kebutuhan posisi. Jika kamu career switcher, jelaskan keterampilan yang bisa dipindahkan dan alasan perubahan arah secara singkat.',
        ],
        bullets: [
          'Siapkan versi 60 detik dan 90 detik; sesuaikan dengan suasana wawancara.',
          'Sebutkan satu keterampilan yang relevan dan satu contoh penggunaannya.',
          'Akhiri dengan alasan yang menghubungkan dirimu dengan posisi, bukan pujian umum tentang perusahaan.',
        ],
      },
      {
        heading: 'Pertanyaan tentang pengalaman dan pemecahan masalah',
        paragraphs: [
          'Untuk pertanyaan “ceritakan saat kamu menghadapi masalah”, gunakan metode STAR: situasi, tugas, tindakan, hasil. Pilih masalah yang cukup kecil untuk dijelaskan dalam dua menit, tetapi cukup penting untuk menunjukkan cara berpikirmu. Contoh: “Saat laporan bulanan terlambat karena data dari tiga tim berbeda format, saya membuat template kolom wajib dan meminta konfirmasi sebelum tenggat. Laporan berikutnya selesai dua hari lebih awal.”',
          'Pertanyaan lanjutan biasanya menggali bagian yang tidak jelas. Siapkan detail tentang keputusan yang kamu ambil, alternatif yang ditolak, dan pembelajaran. Jangan mengambil seluruh kredit untuk kerja tim. Jika hasilnya gagal, jelaskan apa yang kamu ubah setelah itu.',
        ],
      },
      {
        heading: 'Pertanyaan tentang kelemahan, konflik, dan tekanan',
        paragraphs: [
          'Untuk kelemahan, pilih satu area nyata yang tidak menjadi syarat utama posisi, lalu jelaskan tindakan perbaikan. Untuk konflik, fokus pada masalah dan proses penyelesaian, bukan pada pribadi. Untuk tekanan, jelaskan cara menetapkan prioritas dan menjaga kualitas, bukan mengaku tidak pernah stres.',
          'Hindari jawaban klise seperti “terlalu perfeksionis”. Hindari juga menceritakan konflik pribadi yang tidak relevan atau membuka informasi rahasia dari tempat kerja sebelumnya. Pewawancara ingin melihat kesadaran diri, komunikasi, dan cara belajar, bukan cerita paling dramatis.',
        ],
        bullets: [
          'Siapkan satu contoh konflik yang diselesaikan dengan komunikasi, bukan dengan menghindar.',
          'Jelaskan dampak tindakanmu terhadap pekerjaan tim.',
          'Tutup dengan pembelajaran yang bisa diterapkan di posisi baru.',
        ],
      },
      {
        heading: 'Pertanyaan tentang gaji, kontrak, dan ketersediaan',
        paragraphs: [
          'Untuk ekspektasi gaji, sebutkan rentang berbasis riset dan buka ruang diskusi. Untuk ketersediaan, jawab dengan tanggal yang realistis dan sampaikan jika ada notice period. Untuk kontrak, tanyakan jenis hubungan kerja, lokasi, jam kerja, dan komponen upah. Jangan menyetujui angka hanya karena merasa tidak nyaman menolak.',
          'Jika perekrut menanyakan pekerjaan yang sedang dilamar di tempat lain, jawab dengan jujur tetapi tidak perlu menyebut rincian yang tidak relevan. Fokus pada alasan mengapa posisi ini cocok dan bagaimana kamu bisa berkontribusi.',
        ],
      },
      {
        heading: 'Pertanyaan yang sebaiknya kamu ajukan',
        paragraphs: [
          'Tanyakan prioritas tiga bulan pertama, ukuran keberhasilan, susunan tim, proses umpan balik, dan tahapan seleksi. Pertanyaan ini menunjukkan kamu membayangkan pekerjaan nyata, bukan hanya ingin diterima. Catat jawabannya untuk dibandingkan dengan informasi dari sumber lain.',
          'Hindari pertanyaan yang jawabannya sudah jelas di iklan atau yang terlalu pribadi. Jika ada hal penting yang belum dijawab, mintalah penjelasan tertulis sebelum menerima tawaran. Wawancara yang baik adalah percakapan dua arah, bukan ujian satu arah.',
        ],
      },
    ],
  },
  {
    slug: 'kata-kunci-cv-ats-2026',
    title: 'Kata kunci CV untuk ATS: cara menemukan dan memakainya tanpa mengarang',
    description: 'Cara membaca lowongan, menemukan kata kunci yang relevan, dan menempatkannya di CV agar mudah dipindai sistem ATS dan perekrut.',
    category: 'Cari kerja',
    date: '2026-11-04',
    image: '/images/articles/lowongan.webp',
    imageAlt: 'Ilustrasi pencari kerja menyusun kata kunci CV di laptop',
    author,
    reviewer,
    reviewedAt,
    keywords: ['kata kunci CV', 'CV ATS', 'lolos ATS', 'template CV', 'kata kunci lowongan'],
    source: { name: 'Pusat Pasar Kerja Kemnaker', url: 'https://e-training.kemnaker.go.id/belajarmandiri/modul/425/2986', date: 'Diakses 4 November 2026' },
    sections: [
      {
        heading: 'Apa yang sebenarnya dibaca ATS',
        paragraphs: [
          'Applicant Tracking System membaca teks CV, bukan menilai desain. Sistem biasanya mencari kecocokan kata kunci, jabatan, keterampilan, pendidikan, dan pengalaman. Karena itu, CV dengan teks yang bisa dipilih, judul bagian yang lazim, dan format tanggal yang konsisten lebih mudah diproses daripada CV berbentuk gambar atau kolom yang rumit.',
          'ATS tidak selalu menolak CV secara otomatis. Banyak perusahaan memakai sistem untuk menyaring dan mengurutkan, lalu perekrut tetap membaca hasilnya. Fokuslah pada kecocokan yang jujur, bukan pada trik menumpuk kata kunci yang tidak didukung pengalaman.',
        ],
      },
      {
        heading: 'Cara menemukan kata kunci dari lowongan',
        paragraphs: [
          'Buka tiga sampai lima lowongan untuk posisi yang sama. Tandai kata yang berulang pada bagian tanggung jawab dan kualifikasi: nama alat, metode, jenis laporan, atau keterampilan. Kelompokkan menjadi keterampilan teknis, keterampilan lunak, dan kualifikasi. Pilih yang benar-benar kamu miliki atau sedang kamu bangun.',
          'Perhatikan perbedaan istilah. “Analisis data” dan “data analysis” bisa dianggap berbeda oleh sistem. Gunakan istilah yang muncul di lowongan, tetapi tulis dalam kalimat yang wajar. Jika lowongan memakai bahasa Inggris dan CV-mu berbahasa Indonesia, pertimbangkan menyertakan istilah teknis dalam bahasa Inggris di samping penjelasannya.',
        ],
        bullets: [
          'Buat daftar 10–15 kata kunci dari lowongan, lalu tandai mana yang sudah ada buktinya di pengalamanmu.',
          'Bedakan syarat wajib dan nilai tambah; jangan memaksakan kata kunci yang tidak kamu kuasai.',
          'Simpan versi CV untuk beberapa jenis posisi, bukan satu CV untuk semua lowongan.',
        ],
      },
      {
        heading: 'Menempatkan kata kunci tanpa mengarang',
        paragraphs: [
          'Tempatkan kata kunci di ringkasan, pengalaman kerja, dan bagian keterampilan. Gunakan pola tindakan + alat + hasil. Contoh: “Mengelola laporan penjualan mingguan di Excel dan Google Sheets, termasuk pembersihan data dan pembuatan grafik untuk tim regional.” Kata kunci muncul secara alami karena memang bagian dari pekerjaan.',
          'Jangan menulis “mahir” untuk alat yang baru kamu kenal, dan jangan menyalin seluruh kalimat lowongan. Perekrut dapat menanyakan detail di wawancara. Jika kamu sedang belajar suatu alat, tulis “sedang mempelajari” atau tunjukkan proyek latihan yang relevan.',
        ],
      },
      {
        heading: 'Format CV yang ramah ATS dan manusia',
        paragraphs: [
          'Gunakan satu kolom, font standar, ukuran yang terbaca, dan judul bagian yang jelas. Hindari tabel rumit, teks di dalam gambar, ikon tanpa label, serta header dan footer yang berisi informasi penting. Simpan sebagai PDF kecuali perusahaan meminta format lain, lalu uji apakah teks bisa disalin dari PDF tersebut.',
          'Periksa ejaan, nomor kontak, tautan portofolio, dan nama berkas. Buat versi yang mudah dipindai dalam 10 detik: posisi yang dicari, pengalaman paling relevan, dan keterampilan utama. CV yang baik untuk ATS tetap harus masuk akal saat dibaca manusia.',
        ],
      },
    ],
  },
  {
    slug: 'kerja-remote-hybrid-indonesia-2026',
    title: 'Kerja remote dan hybrid di Indonesia 2026: cara menilai tawaran dan menjaga ritme',
    description: 'Panduan praktis menilai tawaran remote atau hybrid, dari zona waktu dan perangkat sampai keamanan data dan kebiasaan kerja.',
    category: 'Dunia kerja',
    date: '2026-11-04',
    image: '/images/articles/lowongan.webp',
    imageAlt: 'Ilustrasi pekerja menjalani kerja remote dari rumah',
    author,
    reviewer,
    reviewedAt,
    keywords: ['kerja remote', 'kerja hybrid', 'remote work Indonesia', 'WFH', 'tawaran kerja remote'],
    source: { name: 'NHI Career', url: 'https://career.nhi.co.id/blog/6-tren-dunia-kerja-indonesia-pertengahan-2026-hybrid-ai-copilot-dan-green-jobs', date: '2026' },
    sections: [
      {
        heading: 'Remote, hybrid, dan hadir: bedakan sejak awal',
        paragraphs: [
          'Remote penuh berarti sebagian besar pekerjaan dilakukan di luar kantor. Hybrid mencampur hari hadir dan hari jarak jauh. Namun istilah ini bisa berbeda di setiap perusahaan. Tanyakan berapa hari per minggu kamu harus hadir, apakah jadwalnya tetap atau berubah, dan apakah perjalanan ke kantor ditanggung.',
          'Periksa juga lokasi kerja yang diizinkan. Bekerja dari kota lain atau negara lain dapat memengaruhi pajak, penggajian, dan keamanan data. Jangan menganggap “remote” berarti boleh bekerja dari mana saja tanpa persetujuan tertulis.',
        ],
        bullets: [
          'Minta jadwal hadir dan jam inti secara tertulis.',
          'Tanyakan apakah perusahaan menyediakan perangkat, internet, atau tunjangan kerja jarak jauh.',
          'Pastikan lokasi kerja yang kamu rencanakan disetujui perusahaan.',
        ],
      },
      {
        heading: 'Menilai budaya kerja asinkron',
        paragraphs: [
          'Tanyakan bagaimana pekerjaan dibagi, bagaimana kemajuan dilaporkan, dan kapan tim biasanya berkomunikasi langsung. Tim yang sehat punya cara kerja tertulis, bukan hanya mengandalkan panggilan mendadak. Cari tahu apakah ada jam respons yang diharapkan di luar jam kerja.',
          'Saat wawancara, perhatikan apakah pertanyaanmu dijawab dengan contoh konkret. Jika perusahaan hanya mengatakan “kami fleksibel” tanpa menjelaskan proses, minta contoh situasi nyata. Budaya remote yang baik terlihat dari dokumentasi, ekspektasi yang jelas, dan cara menangani perbedaan zona waktu.',
        ],
      },
      {
        heading: 'Kesiapan perangkat dan keamanan data',
        paragraphs: [
          'Uji koneksi internet, kamera, mikrofon, dan ruang kerja sebelum hari pertama. Jika memakai perangkat pribadi, pisahkan akun kerja dari akun pribadi dan aktifkan verifikasi dua langkah. Tanyakan apakah perusahaan memasang aplikasi pemantau dan bagaimana data yang dikumpulkan digunakan.',
          'Jangan mengirim dokumen kerja melalui akun pribadi atau penyimpanan yang tidak disetujui. Gunakan kata sandi unik dan kunci layar saat meninggalkan perangkat. Untuk pekerjaan yang melibatkan data pelanggan, tanyakan prosedur pelaporan jika terjadi kehilangan perangkat atau akses tidak sah.',
        ],
        bullets: [
          'Minta kebijakan keamanan data dan daftar alat yang diizinkan.',
          'Siapkan cadangan koneksi, misalnya hotspot, untuk hari kerja penting.',
          'Jangan mengizinkan keluarga atau orang lain memakai perangkat kerja.',
        ],
      },
      {
        heading: 'Menjaga batas kerja dan kesehatan',
        paragraphs: [
          'Tetapkan jam mulai dan selesai, termasuk waktu tidak memeriksa pesan. Buat ritual kecil untuk memisahkan kerja dan istirahat, seperti berjalan sebelum mulai atau menutup laptop setelah selesai. Jadwalkan istirahat dari layar dan waktu untuk bergerak.',
          'Jika bekerja lintas zona waktu, sepakati jam rapat yang adil dan bergantian. Bicarakan dengan atasan jika jadwal mulai mengganggu tidur atau kehidupan keluarga. Kerja remote yang berkelanjutan membutuhkan batas yang jelas, bukan ketersediaan terus-menerus.',
        ],
      },
    ],
  },
  {
    slug: 'profesi-paling-dicari-indonesia-2026',
    title: 'Profesi paling dicari di Indonesia 2026 dan cara memeriksa peluangnya',
    description: 'Membaca tren profesi 2026 tanpa tertipu angka, membandingkan kebutuhan keterampilan, dan menyusun langkah masuk yang realistis.',
    category: 'Pasar kerja',
    date: '2026-11-04',
    image: '/images/articles/pasar-kerja.webp',
    imageAlt: 'Ilustrasi pekerja di kawasan perkotaan Indonesia',
    author,
    reviewer,
    reviewedAt,
    keywords: ['profesi paling dicari 2026', 'pekerjaan 2026', 'tren karier', 'lowongan 2026', 'skill 2026'],
    source: { name: 'Glints Indonesia', url: 'https://glints.com/id/lowongan/tren-gaji-indonesia-2026/', date: '2026' },
    sections: [
      {
        heading: 'Tren yang sering muncul dan artinya',
        paragraphs: [
          'Laporan pasar kerja 2026 umumnya menyoroti peran teknologi seperti analis data, insinyur perangkat lunak, spesialis keamanan siber, dan AI; peran hijau di energi terbarukan; serta peran kesehatan dan manufaktur tertentu. Daftar ini berubah menurut sumber, wilayah, dan metode pengumpulan data.',
          '“Paling dicari” tidak otomatis berarti paling mudah dimasuki atau paling tinggi gajinya. Peran yang langka bisa menuntut pengalaman bertahun-tahun. Sebaliknya, peran yang banyak dibuka bisa memiliki persaingan besar. Gunakan daftar tren sebagai bahan eksplorasi, lalu periksa lowongan aktual di kota dan bidang yang kamu incar.',
        ],
        bullets: [
          'Bandingkan minimal tiga sumber dan catat tanggal publikasinya.',
          'Cari lowongan nyata untuk peran yang menarik, bukan hanya membaca daftar profesi.',
          'Bedakan keterampilan wajib, nilai tambah, dan sertifikasi yang benar-benar diminta.',
        ],
      },
      {
        heading: 'Cara memeriksa peluang secara lokal',
        paragraphs: [
          'Buka portal lowongan resmi dan masukkan kata kunci peran, kota, dan tingkat pengalaman. Hitung berapa lowongan yang masih aktif dalam 30 hari terakhir. Baca lima lowongan dan tandai persyaratan yang berulang. Jika hampir semua meminta pengalaman tiga tahun, peran itu mungkin bukan pintu masuk yang realistis tanpa pengalaman pendukung.',
          'Tanyakan kepada praktisi tentang pekerjaan sehari-hari, bukan hanya prospek gaji. Sebuah profesi bisa terlihat menarik di artikel tren tetapi tidak cocok dengan minat atau kondisi kerjamu. Pertimbangkan juga kebutuhan belajar, biaya sertifikasi, dan waktu yang dibutuhkan untuk mencapai tingkat pemula yang layak dilamar.',
        ],
      },
      {
        heading: 'Menyusun langkah masuk 90 hari',
        paragraphs: [
          'Pilih satu peran dan satu keterampilan dasar yang paling sering diminta. Buat proyek kecil yang menunjukkan keterampilan itu, lalu minta umpan balik dari praktisi. Setelah 30 hari, evaluasi apakah kamu masih tertarik dan apakah proyeknya bisa menjadi bukti di portofolio.',
          'Pada hari ke-60, mulai melamar posisi pemula atau magang yang relevan dan sesuaikan CV. Pada hari ke-90, tinjau respons dan pola penolakan. Jika belum ada kemajuan, ubah satu variabel: jenis posisi, kualitas portofolio, atau cara mencari lowongan. Jangan berpindah bidang setiap kali melihat daftar profesi baru.',
        ],
      },
      {
        heading: 'Checklist tujuh hari memvalidasi satu profesi',
        paragraphs: [
          'Hari pertama, pilih satu peran dan tulis alasan ketertarikanmu. Hari kedua, baca sepuluh lowongan aktif dan catat persyaratan yang berulang. Hari ketiga, cari dua praktisi dan ajukan pertanyaan tentang tugas harian. Hari keempat, bandingkan jawaban mereka dengan isi lowongan.',
          'Hari kelima, pilih satu keterampilan dasar dan cari sumber belajar gratis. Hari keenam, buat proyek kecil atau latihan yang menghasilkan bukti. Hari ketujuh, evaluasi apakah kamu masih tertarik setelah melihat pekerjaan nyata, bukan hanya judul dan gajinya. Jika tidak, ulangi dengan peran lain tanpa rasa gagal.',
        ],
        bullets: [
          'Gunakan lowongan aktif, bukan hanya artikel tren.',
          'Tanyakan bagian pekerjaan yang paling membosankan atau sulit.',
          'Hasilkan satu bukti kecil sebelum membeli pelatihan mahal.',
        ],
      },
    ],
  },
  {
    slug: 'ump-2026-dan-cara-membaca-upah-minimum',
    title: 'UMP 2026: cara membaca upah minimum dan memeriksa gaji pertama',
    description: 'Pahami perbedaan UMP, UMK, dan upah sektoral, komponen yang dihitung, serta cara memeriksa apakah tawaran kerja memenuhi ketentuan.',
    category: 'Gaji',
    date: '2026-11-04',
    image: '/images/articles/gaji.webp',
    imageAlt: 'Ilustrasi pekerja memeriksa rincian upah minimum dan slip gaji',
    author,
    reviewer,
    reviewedAt,
    keywords: ['UMP 2026', 'UMK 2026', 'upah minimum', 'gaji pertama', 'UMR 2026'],
    source: { name: 'Satu Data Kemnaker', url: 'https://satudata.kemnaker.go.id/data/kumpulan-data/3005', date: 'Diakses 4 November 2026' },
    sections: [
      {
        heading: 'UMP, UMK, dan upah sektoral bukan hal yang sama',
        paragraphs: [
          'Upah Minimum Provinsi berlaku untuk wilayah provinsi, sedangkan Upah Minimum Kabupaten/Kota berlaku untuk wilayah yang menetapkannya. Beberapa daerah juga memiliki upah minimum sektoral untuk bidang usaha tertentu. Karena itu, angka yang berlaku untukmu bergantung pada lokasi kerja dan sektor perusahaan.',
          'Upah minimum adalah batas bawah, bukan standar gaji untuk semua posisi. Pekerja dengan pengalaman atau keterampilan tertentu bisa mendapat upah lebih tinggi. Sebaliknya, tawaran di bawah ketentuan minimum perlu diperiksa dengan cermat, termasuk status hubungan kerja dan komponen upah yang dijanjikan.',
        ],
        bullets: [
          'Cari keputusan resmi pemerintah daerah atau provinsi, bukan hanya angka di media sosial.',
          'Periksa apakah ada UMK atau upah sektoral yang berlaku di lokasi kerja.',
          'Cocokkan tanggal berlakunya; upah minimum ditetapkan untuk periode tertentu.',
        ],
      },
      {
        heading: 'Komponen upah yang perlu dipisahkan',
        paragraphs: [
          'Tanyakan apakah angka yang disebut adalah upah pokok, upah minimum, atau total penghasilan termasuk tunjangan. Upah minimum dihitung dari komponen tertentu sesuai ketentuan, bukan dari semua tambahan. Tunjangan makan, transportasi, atau bonus tidak selalu bisa dipakai untuk memenuhi kewajiban upah minimum.',
          'Minta rincian tertulis: gaji pokok, tunjangan tetap, tunjangan tidak tetap, potongan, dan jadwal pembayaran. Bandingkan dengan slip gaji pada bulan pertama. Jika ada perbedaan, ajukan pertanyaan kepada HRD atau bagian penggajian dengan menyertakan dokumen penawaran.',
        ],
      },
      {
        heading: 'Jika tawaran berada di bawah ketentuan',
        paragraphs: [
          'Catat lokasi kerja, sektor, status kontrak, dan besaran upah yang ditawarkan. Periksa ketentuan yang berlaku untuk kombinasi tersebut. Jika tawaran memang di bawah minimum, tanyakan dasar perhitungannya secara tertulis. Jangan langsung menandatangani kontrak sebelum memahami komponen dan konsekuensinya.',
          'Untuk sengketa upah, pekerja dapat berkonsultasi dengan dinas tenaga kerja setempat atau pengawas ketenagakerjaan. Simpan kontrak, slip gaji, dan komunikasi terkait. Artikel ini bersifat informatif; ketentuan dapat berubah dan kasus tertentu memerlukan penjelasan dari instansi resmi atau ahli hukum.',
        ],
        bullets: [
          'Simpan bukti tawaran dan kontrak sebelum hari pertama kerja.',
          'Periksa slip gaji setiap bulan, bukan hanya pada bulan pertama.',
          'Gunakan kanal resmi untuk bertanya atau melaporkan dugaan pelanggaran upah.',
        ],
      },
      {
        heading: 'Contoh memeriksa tawaran yang tampak di bawah ketentuan',
        paragraphs: [
          'Misalnya kamu menerima tawaran sebagai staf administrasi di sebuah kota dengan upah Rp4,3 juta, sementara ketentuan setempat menunjukkan angka yang lebih tinggi. Jangan langsung menolak atau menerima. Catat lokasi kerja, sektor, status kontrak, dan komponen upah yang disebut. Tanyakan apakah Rp4,3 juta itu gaji pokok atau sudah termasuk tunjangan.',
          'Minta rincian tertulis dan dasar perhitungan dari HRD. Cocokkan dengan keputusan upah minimum daerah dan ketentuan yang berlaku untuk sektor tersebut. Jika tawaran tetap di bawah ketentuan, pertimbangkan berkonsultasi dengan dinas tenaga kerja. Simpan semua dokumen sebelum mengambil keputusan.',
        ],
        bullets: [
          'Bedakan gaji pokok, tunjangan, dan total penghasilan.',
          'Cocokkan lokasi kerja dengan UMP, UMK, atau upah sektoral yang berlaku.',
          'Minta penjelasan tertulis sebelum menandatangani kontrak.',
        ],
      },
    ],
  },
  {
    slug: 'linkedin-untuk-pencari-kerja-2026',
    title: 'LinkedIn untuk pencari kerja: headline, pengalaman, dan pesan yang tidak memaksa',
    description: 'Optimalkan profil LinkedIn dengan kata kunci yang relevan, bukti kerja, dan pesan jaringan yang sopan tanpa terkesan meminta pekerjaan.',
    category: 'Cari kerja',
    date: '2026-11-04',
    image: '/images/articles/lowongan.webp',
    imageAlt: 'Ilustrasi pencari kerja mengelola profil profesional di laptop',
    author,
    reviewer,
    reviewedAt,
    keywords: ['LinkedIn pencari kerja', 'headline LinkedIn', 'profil LinkedIn', 'networking LinkedIn', 'cari kerja LinkedIn'],
    source: { name: 'LinkedIn Help', url: 'https://www.linkedin.com/help/linkedin/', date: 'Diakses 4 November 2026' },
    sections: [
      {
        heading: 'Headline yang menjelaskan peran, bukan slogan',
        paragraphs: [
          'Headline yang jelas membantu perekrut memahami siapa kamu dalam satu baris. Contoh: “Analis Data | SQL, Python, dasbor penjualan | Terbuka untuk peran analitik di Jakarta”. Hindari hanya menulis “Profesional muda yang bersemangat” karena tidak menunjukkan keahlian atau tujuan.',
          'Gunakan kata kunci yang muncul di lowongan tujuan, tetapi hanya yang benar-benar kamu kuasai. Jika sedang belajar, tulis dengan jujur. Headline dapat diperbarui saat fokus karier berubah, misalnya dari analis data ke product analyst.',
        ],
        bullets: [
          'Sebutkan peran, dua atau tiga keterampilan utama, dan lokasi atau jenis kerja yang dicari.',
          'Hindari emoji berlebihan dan klaim yang tidak bisa dibuktikan.',
          'Cocokkan ejaan keterampilan dengan istilah yang umum di lowongan.',
        ],
      },
      {
        heading: 'Bagian About dan pengalaman yang menunjukkan bukti',
        paragraphs: [
          'Bagian About cukup tiga paragraf: latar belakang, jenis masalah yang pernah kamu tangani, dan peran yang sedang dicari. Tulis dengan bahasa manusia, bukan daftar kata kunci. Contoh: “Saya membantu tim operasional memahami data penjualan melalui laporan mingguan dan dasbor sederhana.”',
          'Pada pengalaman kerja, tulis pencapaian dengan pola tindakan, alat, dan hasil. Untuk proyek atau pekerjaan lepas, jelaskan lingkup dan peranmu. Jangan menyalin deskripsi perusahaan. Jika hasil kerja bersifat rahasia, gunakan ukuran yang tidak membocorkan data, misalnya “mengurangi waktu laporan dari tiga hari menjadi satu hari”.',
        ],
      },
      {
        heading: 'Membangun jaringan tanpa spam',
        paragraphs: [
          'Kirim permintaan terhubung dengan catatan singkat yang menyebut konteks: alumni, komunitas, atau topik yang kamu pelajari. Setelah terhubung, ajukan satu pertanyaan spesifik. Jangan langsung mengirim CV atau meminta pekerjaan. Jika tidak dibalas, beri ruang dan jangan mengirim pesan berulang.',
          'Aktif dengan cara yang wajar: bagikan satu pelajaran dari proyek, beri komentar yang menambah konteks, atau tanyakan pengalaman orang lain. Jaringan yang baik dibangun melalui rasa ingin tahu dan kontribusi, bukan melalui jumlah koneksi.',
        ],
        bullets: [
          'Sesuaikan pesan perkenalan dengan orang yang dihubungi, bukan template massal.',
          'Tanyakan satu hal yang bisa dijawab dalam beberapa menit.',
          'Kirim terima kasih setelah mendapat bantuan dan kabari hasilnya.',
        ],
      },
      {
        heading: 'Audit profil LinkedIn dalam 30 menit',
        paragraphs: [
          'Lima belas menit pertama, perbarui foto, headline, lokasi, dan tautan kontak. Pastikan headline menyebut peran dan dua keterampilan utama. Lima belas menit berikutnya, rapikan bagian pengalaman: untuk setiap peran, tulis satu atau dua pencapaian dengan pola tindakan, alat, dan hasil.',
          'Setelah itu, minta satu rekan membaca profilmu selama dua menit dan menceritakan kembali siapa kamu dan jenis pekerjaan yang dicari. Jika jawabannya tidak sesuai, perbaiki bagian yang membingungkan. Jangan menambahkan keterampilan yang belum kamu kuasai hanya agar profil terlihat lengkap.',
        ],
        bullets: [
          'Sebutkan peran, keterampilan, dan lokasi kerja yang dicari di headline.',
          'Tulis pencapaian, bukan hanya daftar tanggung jawab.',
          'Minta orang lain membaca profil dan menyimpulkan fokus kariermu.',
        ],
      },
    ],
  },
  {
    slug: 'tunjangan-karyawan-yang-perlu-ditanyakan',
    title: 'Tunjangan karyawan yang perlu ditanyakan sebelum menerima tawaran',
    description: 'Bandingkan tunjangan kesehatan, cuti, bonus, dan dukungan kerja agar keputusan tidak hanya berdasarkan gaji pokok.',
    category: 'Gaji',
    date: '2026-11-04',
    image: '/images/articles/gaji.webp',
    imageAlt: 'Ilustrasi pekerja meninjau rincian tunjangan dan kompensasi',
    author,
    reviewer,
    reviewedAt,
    keywords: ['tunjangan karyawan', 'benefit kerja', 'asuransi kesehatan', 'bonus tahunan', 'kompensasi total'],
    source: { name: 'BPJS Ketenagakerjaan', url: 'https://www.bpjsketenagakerjaan.go.id/', date: 'Diakses 4 November 2026' },
    sections: [
      {
        heading: 'Tunjangan tetap dan tidak tetap',
        paragraphs: [
          'Tunjangan tetap dibayarkan setiap bulan tanpa syarat tambahan, misalnya tunjangan jabatan atau komunikasi. Tunjangan tidak tetap bergantung pada kehadiran, jam kerja, atau kinerja. Tanyakan status setiap tunjangan dan apakah nilainya masuk ke perhitungan lembur, BPJS, atau pajak.',
          'Jangan menjumlahkan bonus tahunan ke gaji bulanan seolah-olah diterima setiap bulan. Pisahkan komponen yang pasti dari yang bersyarat. Jika bonus dijanjikan, tanyakan dasar perhitungan, waktu pembayaran, dan syarat agar bonus tidak hangus saat kamu resign.',
        ],
        bullets: [
          'Minta rincian tertulis tentang tunjangan tetap dan tidak tetap.',
          'Tanyakan apakah tunjangan berhenti saat cuti panjang atau sakit.',
          'Hitung penghasilan tahunan dengan skenario konservatif, bukan skenario terbaik.',
        ],
      },
      {
        heading: 'Asuransi kesehatan dan jaminan sosial',
        paragraphs: [
          'Tanyakan apakah perusahaan menyediakan BPJS Kesehatan, BPJS Ketenagakerjaan, dan asuransi kesehatan swasta. Periksa cakupan untuk diri sendiri dan keluarga, batas manfaat, rumah sakit rekanan, serta apakah ada masa tunggu. Jangan menganggap asuransi swasta menggantikan BPJS; keduanya memiliki fungsi dan ketentuan berbeda.',
          'Cocokkan potongan di slip gaji dengan program yang aktif. Jika perusahaan menjanjikan asuransi tambahan, minta polis atau ringkasan manfaat tertulis. Ketahui prosedur klaim dan kontak darurat sebelum membutuhkannya.',
        ],
      },
      {
        heading: 'Cuti, jam kerja, dan dukungan kerja',
        paragraphs: [
          'Tanyakan cuti tahunan, cuti sakit, cuti melahirkan, cuti keluarga, dan hari libur yang berlaku. Periksa apakah cuti bisa dibawa ke tahun berikutnya atau dibayarkan saat berhenti. Untuk kerja hybrid, tanyakan tunjangan internet, perangkat, dan transportasi saat hari hadir.',
          'Dukungan belajar seperti anggaran kursus, sertifikasi, atau waktu belajar juga termasuk kompensasi. Tanyakan apakah ada ikatan dinas atau kewajiban mengembalikan biaya jika kamu keluar sebelum periode tertentu. Semua kesepakatan sebaiknya tertulis, bukan hanya lisan.',
        ],
        bullets: [
          'Buat tabel perbandingan tunjangan antar tawaran dengan satuan yang sama.',
          'Tanyakan masa berlaku dan syarat setiap manfaat.',
          'Minta ringkasan tertulis sebelum menandatangani penawaran.',
        ],
      },
      {
        heading: 'Contoh menghitung nilai paket tunjangan',
        paragraphs: [
          'Tawaran A memberi gaji Rp8 juta, tunjangan makan Rp500 ribu, asuransi kesehatan swasta, dan cuti 12 hari. Tawaran B memberi gaji Rp8,3 juta tanpa tunjangan makan, BPJS saja, dan cuti 10 hari. Selisih gaji Rp300 ribu per bulan belum tentu lebih besar setelah biaya makan dan nilai asuransi dihitung.',
          'Buat tabel dengan satuan yang sama: nilai per bulan, per tahun, dan syarat penerimaan. Tandai manfaat yang pasti diterima dan yang bersyarat. Jika asuransi swasta ditawarkan, minta ringkasan manfaat dan batas klaim. Jika tunjangan makan berbentuk reimbursement, periksa apakah ada batas harian dan tenggat klaim.',
        ],
        bullets: [
          'Hitung nilai tunjangan per tahun, bukan hanya per bulan.',
          'Bedakan manfaat pasti dan manfaat bersyarat.',
          'Tanyakan apakah tunjangan tetap dihitung dalam lembur dan BPJS.',
        ],
      },
    ],
  },
  {
    slug: 'thr-2026-hak-dan-cara-menghitung',
    title: 'THR 2026: siapa yang berhak, cara menghitung prorata, dan kapan dibayarkan',
    description: 'Panduan memahami hak Tunjangan Hari Raya, rumus prorata untuk masa kerja kurang dari setahun, dan langkah jika pembayaran terlambat.',
    category: 'Hak pekerja',
    date: '2026-11-04',
    image: '/images/articles/perlindungan.webp',
    imageAlt: 'Ilustrasi pekerja memeriksa hak tunjangan hari raya dan slip gaji',
    author,
    reviewer,
    reviewedAt,
    keywords: ['THR 2026', 'tunjangan hari raya', 'THR prorata', 'cara menghitung THR', 'THR terlambat'],
    source: { name: 'JDIH Kementerian Ketenagakerjaan', url: 'https://jdih.kemnaker.go.id/', date: 'PP Nomor 36 Tahun 2021' },
    sections: [
      {
        heading: 'Siapa yang berhak menerima THR',
        paragraphs: [
          'Pekerja yang telah memiliki masa kerja paling sedikit satu bulan secara terus-menerus berhak atas THR keagamaan, sesuai ketentuan yang berlaku. Hak ini mencakup pekerja dengan hubungan kerja tertentu, termasuk pekerja kontrak, dengan perhitungan yang disesuaikan masa kerja. Status dan ketentuan rinci perlu dicocokkan dengan peraturan serta kontrak kerja.',
          'THR bukan bonus sukarela yang bisa dihilangkan sepihak. Namun besaran dan cakupannya mengikuti aturan yang berlaku. Jika perusahaan memiliki perjanjian kerja atau kebijakan internal yang lebih menguntungkan, ketentuan itu dapat berlaku. Simpan kontrak dan kebijakan perusahaan sebagai rujukan.',
        ],
        bullets: [
          'Periksa masa kerja dan status hubungan kerja sebelum menghitung hak.',
          'Baca kontrak dan peraturan perusahaan untuk ketentuan yang lebih spesifik.',
          'Tanyakan kepada HRD jika status pekerjaanmu tidak jelas.',
        ],
      },
      {
        heading: 'Rumus prorata untuk masa kerja kurang dari setahun',
        paragraphs: [
          'Untuk pekerja dengan masa kerja 12 bulan atau lebih, THR umumnya setara satu bulan upah sesuai ketentuan. Untuk masa kerja kurang dari 12 bulan, perhitungannya proporsional: (masa kerja dalam bulan ÷ 12) × satu bulan upah. Contoh: masa kerja 6 bulan dengan upah Rp6 juta menghasilkan THR sekitar Rp3 juta.',
          'Komponen upah yang dipakai mengikuti ketentuan, biasanya gaji pokok ditambah tunjangan tetap. Tunjangan tidak tetap dan bonus belum tentu dihitung. Mintalah rincian perhitungan tertulis jika angkanya berbeda dari perkiraanmu. Jangan memakai angka bersih setelah potongan sebagai dasar perhitungan.',
        ],
      },
      {
        heading: 'Waktu pembayaran dan langkah jika terlambat',
        paragraphs: [
          'THR keagamaan wajib dibayarkan paling lambat tujuh hari sebelum hari raya keagamaan, sesuai ketentuan yang berlaku. Jika perusahaan membayar terlambat, pekerja dapat menanyakan penyebabnya secara tertulis dan mencatat tanggal pembayaran yang dijanjikan.',
          'Jika tidak ada penyelesaian internal, pekerja dapat berkonsultasi dengan dinas tenaga kerja setempat atau pengawas ketenagakerjaan. Simpan slip gaji, kontrak, dan komunikasi terkait. Artikel ini bersifat informatif; untuk kasus tertentu, mintalah penjelasan dari instansi resmi atau ahli hukum.',
        ],
        bullets: [
          'Catat tanggal hari raya dan tanggal pembayaran THR yang dijanjikan.',
          'Simpan bukti transfer dan slip gaji sebagai pembanding.',
          'Gunakan kanal resmi untuk menanyakan atau melaporkan keterlambatan.',
        ],
      },
      {
        heading: 'Contoh pesan menanyakan perhitungan THR',
        paragraphs: [
          'Contoh pesan: “Selamat pagi, saya [Nama], karyawan [posisi] dengan masa kerja [jumlah] bulan. Saya ingin menanyakan rincian perhitungan THR yang saya terima. Mohon dibantu menjelaskan komponen upah yang dipakai, masa kerja yang dihitung, dan dasar perhitungannya. Terima kasih.”',
          'Kirim melalui kanal resmi dan simpan salinan pesan. Hindari nada menuduh atau menyebarkan masalah ke grup umum. Jika jawaban tidak jelas, minta rincian tertulis. Catat tanggal pembayaran dan bandingkan dengan ketentuan yang berlaku. Untuk sengketa, gunakan kanal pengaduan resmi.',
        ],
        bullets: [
          'Sebutkan masa kerja dan komponen upah yang kamu ketahui.',
          'Minta rincian perhitungan secara tertulis.',
          'Simpan pesan dan bukti pembayaran sebagai dokumentasi.',
        ],
      },
    ],
  },
  {
    slug: 'ai-untuk-produktivitas-kerja-2026',
    title: 'AI untuk produktivitas kerja: tugas yang cocok, batas data, dan cara memeriksa hasil',
    description: 'Gunakan AI untuk merangkum, membuat kerangka, dan mempercepat tugas berulang tanpa melepas tanggung jawab atau membocorkan data.',
    category: 'Teknologi kerja',
    date: '2026-11-04',
    image: '/images/articles/lowongan.webp',
    imageAlt: 'Ilustrasi pekerja menggunakan laptop dan alat digital untuk produktivitas',
    author,
    reviewer,
    reviewedAt,
    keywords: ['AI untuk kerja', 'produktivitas AI', 'prompt kerja', 'keamanan data AI', 'AI kantor'],
    source: { name: 'Telkom Indonesia', url: 'https://aro.telkom.co.id/sites/berita/id_ID/news/telkom-akselerasi-adopsi-ai-di-segmen-enterprise-kesiapan-data-dan-talenta-jadi-kunci-utama-4040', date: '2 November 2026' },
    sections: [
      {
        heading: 'Tugas yang cocok dibantu AI',
        paragraphs: [
          'AI paling berguna untuk tugas yang memiliki pola jelas dan hasilnya mudah diperiksa: membuat kerangka tulisan, merangkum catatan yang boleh dipakai, mengubah poin menjadi draf, atau membuat variasi kalimat. AI juga membantu menjelaskan istilah teknis kepada audiens nonteknis.',
          'AI kurang cocok untuk keputusan yang membutuhkan data rahasia, penilaian manusia, atau tanggung jawab hukum. Jangan memakai AI untuk menilai kinerja orang lain, membuat keputusan medis, atau mengirim nasihat keuangan tanpa peninjauan ahli. Tentukan batas ini sebelum mulai bekerja.',
        ],
        bullets: [
          'Pilih tugas berulang yang hasilnya bisa kamu periksa dalam beberapa menit.',
          'Hindari data pelanggan, dokumen internal, dan informasi pribadi.',
          'Tentukan siapa yang bertanggung jawab memeriksa hasil akhir.',
        ],
      },
      {
        heading: 'Prompt yang jelas dan bisa diulang',
        paragraphs: [
          'Tulis konteks, tujuan, format, dan batasan. Contoh: “Buat kerangka tiga bagian untuk panduan orientasi karyawan baru di tim layanan pelanggan. Gunakan bahasa Indonesia formal, maksimal 150 kata per bagian, dan jangan menambahkan kebijakan yang tidak saya sebutkan.” Prompt yang spesifik mengurangi hasil yang terlalu umum.',
          'Simpan prompt yang berhasil agar bisa dipakai ulang. Jika hasilnya tidak sesuai, perbaiki satu variabel setiap kali: audiens, panjang, format, atau tingkat detail. Jangan menyalin hasil mentah ke dokumen resmi tanpa membaca ulang.',
        ],
      },
      {
        heading: 'Memeriksa fakta dan menjaga tanggung jawab',
        paragraphs: [
          'Periksa nama, angka, kutipan, tautan, dan klaim faktual terhadap sumber asli. AI dapat menghasilkan informasi yang terdengar meyakinkan tetapi salah. Untuk pekerjaan yang memengaruhi orang lain, mintalah peninjauan manusia yang kompeten sebelum digunakan.',
          'Tandai bagian yang dibantu AI jika kebijakan perusahaan memintanya. Jelaskan proses verifikasi yang kamu lakukan. Tanggung jawab atas hasil akhir tetap ada pada kamu, bukan pada alat. Jika ragu, jangan gunakan AI untuk tugas itu.',
        ],
        bullets: [
          'Simpan sumber asli dan bandingkan hasil AI dengan dokumen tersebut.',
          'Jangan mengunggah data yang belum disetujui organisasi.',
          'Tanyakan kebijakan perusahaan tentang alat, data, dan pengungkapan penggunaan AI.',
        ],
      },
      {
        heading: 'Rencana tujuh hari mencoba AI dengan aman',
        paragraphs: [
          'Hari pertama, pilih satu tugas dan tulis cara mengerjakannya tanpa AI. Hari kedua, siapkan data contoh yang tidak rahasia. Hari ketiga dan keempat, coba dua prompt berbeda dan catat waktu serta jumlah koreksi. Hari kelima, minta rekan menilai hasilnya tanpa memberi tahu mana yang dibantu AI.',
          'Hari keenam, hitung apakah waktu total—termasuk menulis prompt dan memeriksa—lebih singkat dari cara manual. Hari ketujuh, putuskan apakah tugas itu layak dibantu AI, perlu peninjauan tambahan, atau sebaiknya dikerjakan sendiri. Tulis keputusan dan alasannya agar bisa dipakai tim.',
        ],
        bullets: [
          'Catat waktu manual sebagai pembanding, bukan hanya kesan “lebih cepat”.',
          'Uji dengan data contoh sebelum memakai data kerja yang sebenarnya.',
          'Minta penilaian orang lain untuk mengurangi bias terhadap hasil sendiri.',
        ],
      },
    ],
  },
  {
    slug: 'data-talent-pool-linkedin-indonesia-november-2026',
    title: 'Pasker ID memperbarui Talent Pool LinkedIn Indonesia per November 2026',
    description: 'Pembaruan data pasar kerja terbaru dari Pasker ID bisa menjadi titik awal riset karier, dengan batasan yang perlu dipahami sebelum menarik kesimpulan.',
    category: 'Pasar kerja',
    date: '2026-11-05',
    image: '/images/articles/pasar-kerja.webp',
    imageAlt: 'Ilustrasi data pasar kerja dan profil profesional digital',
    author, reviewer, reviewedAt: '2026-11-06',
    keywords: ['talent pool Indonesia', 'data pasar kerja', 'Pasker ID', 'LinkedIn Indonesia November 2026'],
    source: { name: 'Pusat Pasar Kerja Kemnaker (Pasker ID)', url: 'https://paskerid.kemnaker.go.id/informasi?page=1&type=publikasi', date: '5 November 2026' },
    sections: [
      { heading: 'Pembaruan data yang perlu dibaca dengan konteks', paragraphs: ['Pasker ID mencantumkan publikasi “LinkedIn Talent Pool Indonesia per November 2026” dengan tanggal pembaruan 5 November 2026. Ini menjadi salah satu rujukan terbaru yang diterbitkan Pusat Pasar Kerja Kemnaker untuk melihat informasi talenta di platform profesional.', 'Data profil pada sebuah platform tidak mewakili seluruh angkatan kerja Indonesia. Pengguna platform dapat berbeda dari pekerja informal, pencari kerja yang belum aktif digital, atau kelompok yang tidak mengisi profil.'] },
      { heading: 'Cara memakai data untuk riset karier', paragraphs: ['Gunakan publikasi sebagai petunjuk awal untuk merumuskan pertanyaan: bidang apa yang ingin ditelusuri, keterampilan apa yang ingin dibandingkan, dan wilayah mana yang relevan. Cocokkan temuan dengan lowongan aktual, statistik resmi lain, serta kebutuhan posisi yang kamu incar.', 'Jangan menganggap jumlah profil sebagai jumlah lowongan atau peluang kerja. Data talent pool membantu memetakan sisi kandidat, sedangkan lowongan dan hasil rekrutmen menjelaskan sisi permintaan kerja.'] },
      { heading: 'Simpan tanggal dan definisinya', paragraphs: ['Catat tanggal pembaruan dan definisi indikator saat membandingkan publikasi antarbulan. Perubahan angka bisa berasal dari pembaruan profil atau metode pencatatan, bukan semata-mata perubahan jumlah pekerja.', 'Buka laman Pasker ID untuk mengakses dokumen dan melihat publikasi pasar kerja lain yang tersedia.'] },
    ],
  },
  {
    slug: 'pendaftaran-pvn-batch-7-november-2026',
    title: 'Pendaftaran Pelatihan Vokasi Nasional Batch 7 dibuka sampai 11 November',
    description: 'Jadwal Batch 7 memberi kesempatan mendaftar melalui SIAPkerja. Periksa program, asesmen, dan ketentuan balai sebelum memilih pelatihan.',
    category: 'Pelatihan kerja',
    date: '2026-11-04',
    image: '/images/articles/magang.webp',
    imageAlt: 'Ilustrasi peserta mengikuti pelatihan vokasi',
    author, reviewer, reviewedAt: '2026-11-06',
    keywords: ['Pelatihan Vokasi Nasional Batch 7', 'PVN 2026', 'Skillhub Kemnaker', 'pelatihan vokasi gratis'],
    source: { name: 'Skillhub Kemnaker', url: 'https://pelatihan.kemnaker.go.id/', date: 'Jadwal Batch 7 diperbarui November 2026' },
    sections: [
      { heading: 'Tahap pendaftaran peserta', paragraphs: ['Laman Skillhub menampilkan pendaftaran calon peserta PVN Batch 7 pada 28 Oktober–11 November 2026. Setelah mendaftar, peserta perlu mengisi asesmen SIAP Latih paling lambat 11 November. Tahap seleksi dan wawancara dijadwalkan 12–18 November, dengan pengumuman peserta pada 19 November.', 'Pelaksanaan orientasi Batch 7 dijadwalkan mulai 25 November 2026. Jadwal bisa berbeda menurut program dan lokasi, jadi periksa informasi kelas yang dipilih.'] },
      { heading: 'Periksa kelas sebelum mengirim pendaftaran', paragraphs: ['Cari kelas berdasarkan lokasi, bidang, jadwal, dan persyaratan. Pastikan data akun SIAPkerja dan dokumen pendukung sesuai instruksi balai penyelenggara. Pendaftaran tidak otomatis berarti peserta diterima karena ada asesmen dan seleksi.', 'Skillhub menyebut fasilitas yang dapat mencakup pelatihan tanpa biaya, makan siang, bantuan transportasi, perlindungan JKK dan JKM, serta sertifikat. Periksa rincian program tujuan karena fasilitas tertentu, termasuk asrama, memiliki ketentuan.'] },
      { heading: 'Gunakan kanal resmi', paragraphs: ['Akses jadwal dan proses pendaftaran dari Skillhub atau kanal resmi balai. Hindari membayar perantara yang menjanjikan kelulusan; verifikasi setiap permintaan data dan biaya langsung kepada penyelenggara.'] },
    ],
  },
  {
    slug: 'pemagangan-nasional-batch-3-bbpvp-bandung-2026',
    title: 'Pemagangan Nasional Batch 3 di BBPVP Bandung: cek posisi dan kanal resmi',
    description: 'BBPVP Bandung mengumumkan pembukaan program magang nasional Batch 3. Pahami jalur pendaftaran dan cara memeriksa informasi seleksi.',
    category: 'Magang',
    date: '2026-11-03',
    image: '/images/articles/magang.webp',
    imageAlt: 'Ilustrasi lulusan muda memulai pengalaman magang',
    author, reviewer, reviewedAt: '2026-11-06',
    keywords: ['magang nasional 2026', 'Batch 3 BBPVP Bandung', 'MagangHub', 'magang fresh graduate'],
    source: { name: 'BBPVP Bandung', url: 'https://bbpvpbandung.kemnaker.go.id/pengumuman/200', date: '31 Oktober 2026' },
    sections: [
      { heading: 'Pengumuman pembukaan di Bandung', paragraphs: ['BBPVP Bandung mengumumkan Program Pemagangan Nasional Angkatan 2 Batch 3 pada 31 Oktober 2026. Pengumuman mengarahkan calon peserta untuk membuka MagangHub, mencari BBPVP Bandung, lalu memilih posisi yang sesuai kualifikasi.', 'Pengumuman yang dirujuk tidak merinci semua posisi dan persyaratan dalam badan halaman. Periksa daftar posisi yang tampil di portal sebelum menyiapkan lamaran.'] },
      { heading: 'Siapkan profil dan bukti kualifikasi', paragraphs: ['Pastikan data pendidikan, identitas, dan pengalaman di profil konsisten dengan dokumen pendukung. Baca deskripsi tugas dan persyaratan tiap posisi; lowongan magang dapat memiliki kualifikasi yang berbeda meski berada di satu penyelenggara.', 'Magang memberi pengalaman belajar dan kerja langsung, tetapi tidak menjamin pengangkatan menjadi karyawan setelah program selesai. Tanyakan durasi, pembimbing, tugas, evaluasi, serta ketentuan uang saku pada informasi resmi program.'] },
      { heading: 'Waspadai pesan seleksi palsu', paragraphs: ['BBPVP Bandung menyatakan informasi seleksi disampaikan melalui Instagram resminya dan mengingatkan agar calon peserta tidak memberikan data pribadi kepada pihak yang tidak terverifikasi. Ikuti tautan MagangHub dari situs Kemnaker dan periksa akun resmi penyelenggara.'] },
    ],
  },
  {
    slug: 'pelatihan-pekerja-ter-phk-bbpvp-samarinda-november-2026',
    title: 'BPVP Samarinda membuka pelatihan bagi pekerja terdampak PHK',
    description: 'Program pelatihan vokasi Batch 2 di Samarinda menawarkan jalur peningkatan keterampilan. Periksa jadwal dan status seleksi sebelum mendaftar.',
    category: 'Transisi karier',
    date: '2026-11-04',
    image: '/images/articles/perlindungan.webp',
    imageAlt: 'Ilustrasi pekerja menyiapkan langkah karier setelah terkena PHK',
    author, reviewer, reviewedAt: '2026-11-06',
    keywords: ['pelatihan pekerja PHK Samarinda', 'BPVP Samarinda', 'pelatihan vokasi 2026', 'reskilling'],
    source: { name: 'BPVP Samarinda, Kemnaker', url: 'https://bpvpsamarinda.kemnaker.go.id/pendaftaran-pelatihan-program-ter-phk/', date: '27 Oktober 2026; jadwal seleksi diperbarui November' },
    sections: [
      { heading: 'Kesempatan pelatihan untuk pekerja terdampak', paragraphs: ['BPVP Samarinda mengumumkan Pelatihan Vokasi bagi Tenaga Kerja Ter-PHK Batch 2. Informasi penyelenggara menyebut pendaftaran berlangsung 14–28 Oktober, wawancara 2–3 November, pengumuman 4 November, dan daftar ulang 5 November 2026.', 'Dengan tanggal tersebut, pendaftaran dan seleksi awal sudah lewat pada saat artikel ini diperbarui. Pelaksanaan pelatihan dijadwalkan 10–13 November 2026; cek kanal resmi untuk memastikan perubahan jadwal atau gelombang berikutnya.'] },
      { heading: 'Siapkan dokumen untuk program berikutnya', paragraphs: ['Untuk pendaftaran yang mensyaratkan status terdampak PHK, siapkan bukti yang diminta penyelenggara seperti surat pemberitahuan PHK atau dokumen berakhirnya hubungan kerja. Pastikan format dan ketentuan terbaru dikonfirmasi sebelum mengirim data.', 'Tentukan keterampilan yang ingin diperoleh dan hubungkan dengan jenis pekerjaan atau usaha yang sedang dipertimbangkan. Pelatihan dapat memperkuat kesiapan, tetapi tidak menjamin pekerjaan atau pendapatan tertentu.'] },
      { heading: 'Pantau sumber resmi', paragraphs: ['Gunakan situs dan media sosial resmi BPVP Samarinda untuk jadwal berikutnya. Jangan mengirim dokumen identitas melalui akun pribadi yang tidak dapat diverifikasi.'] },
    ],
  },
  {
    slug: 'lowongan-pemagangan-nasional-bbpvp-semarang-2026',
    title: 'BBPVP Semarang mengumumkan 30 posisi Pemagangan Nasional',
    description: 'Informasi pemagangan untuk fresh graduate yang diumumkan BBPVP Semarang: cara mengecek kualifikasi, penempatan, dan seleksi di MagangHub.',
    category: 'Magang',
    date: '2026-11-01',
    image: '/images/articles/lowongan.webp',
    imageAlt: 'Ilustrasi lulusan baru mencari lowongan magang',
    author, reviewer, reviewedAt: '2026-11-06',
    keywords: ['pemagangan nasional Semarang', '30 lowongan magang', 'fresh graduate 2026', 'MagangHub Kemnaker'],
    source: { name: 'BBPVP Semarang, Kemnaker', url: 'https://bbpvpsemarang.kemnaker.go.id/', date: '1 November 2026' },
    sections: [
      { heading: 'Peluang magang yang diumumkan balai', paragraphs: ['BBPVP Semarang mengumumkan 30 lowongan Pemagangan Nasional pada 1 November 2026. Informasi itu ditujukan kepada fresh graduate dan perlu dibaca bersama rincian posisi, persyaratan, serta tahapan yang dipasang penyelenggara.', 'Jumlah posisi dan status pendaftaran dapat berubah. Periksa portal MagangHub dan kanal resmi BBPVP Semarang untuk memastikan kesempatan masih tersedia dan mengetahui batas waktu terbaru.'] },
      { heading: 'Cocokkan latar belakang dengan posisi', paragraphs: ['Baca tugas harian, latar pendidikan, lokasi, dan kompetensi yang diminta sebelum melamar. Sesuaikan CV dengan pengalaman kuliah, organisasi, proyek, atau kerja yang benar-benar relevan. Jangan mengklaim pengalaman profesional yang belum dimiliki.', 'Siapkan pertanyaan tentang mentor, hasil belajar, jadwal, evaluasi, dan mekanisme dukungan peserta. Informasi itu membantu menilai apakah tugas magang memberi pengalaman yang sesuai tujuanmu.'] },
      { heading: 'Lamar melalui jalur resmi', paragraphs: ['Gunakan MagangHub Kemnaker dan ikuti petunjuk pada pengumuman. Tidak ada biaya seleksi yang perlu dibayarkan kepada perantara. Konfirmasi informasi yang meragukan ke kontak resmi balai.'] },
    ],
  },
  {
    slug: 'pelatihan-produktivitas-jenjang-5-bbpvp-bandung-2026',
    title: 'Pelatihan Produktivitas Jenjang 5 di Bandung membuka dua tahap November',
    description: 'Program BBPVP Bandung melatih analisis, penerapan, pemantauan, dan komunikasi peningkatan produktivitas bagi calon peserta yang memenuhi syarat.',
    category: 'Keterampilan',
    date: '2026-11-03',
    image: '/images/articles/kualitas-kerja.webp',
    imageAlt: 'Ilustrasi pekerja menganalisis proses produktivitas di tempat kerja',
    author, reviewer, reviewedAt: '2026-11-06',
    keywords: ['pelatihan produktivitas jenjang 5', 'BBPVP Bandung', 'kompetensi produktivitas', 'pelatihan Kemnaker'],
    source: { name: 'BBPVP Bandung', url: 'https://bbpvpbandung.kemnaker.go.id/pengumuman/202', date: '3 November 2026' },
    sections: [
      { heading: 'Kompetensi yang dikembangkan', paragraphs: ['BBPVP Bandung mengumumkan pelatihan Peningkatan Produktivitas Jenjang 5 pada 3 November 2026. Materinya mencakup analisis hasil pengukuran produktivitas, pelaksanaan rencana perbaikan, pemantauan dan evaluasi, serta komunikasi hasil.', 'Pengumuman menyebut syarat komitmen mengikuti seluruh pelatihan, pemenuhan kompetensi awal dan administrasi, serta belum pernah mengikuti pelatihan di BPVP atau BBPVP selama 2026. Pastikan seluruh kriteria cocok sebelum mengisi formulir.'] },
      { heading: 'Dua jadwal yang diumumkan', paragraphs: ['Tahap pertama dijadwalkan 16–20 November dengan 48 peserta, sedangkan tahap kedua dijadwalkan 23–27 November dengan 32 peserta. Keduanya tercantum berlokasi di BBPVP Bandung. Pengumuman mencatat pendaftaran mulai 30 Oktober dengan batas yang berbeda untuk tiap tahap; konfirmasikan status dan tanggal terakhir langsung kepada balai karena format tanggal pada laman perlu dicermati.', 'Jadwal, kuota, dan seleksi bisa berubah. Pendaftaran bukan jaminan diterima.'] },
      { heading: 'Daftar dan verifikasi persyaratan', paragraphs: ['Pengumuman mengarahkan calon peserta membuat akun SIAPkerja, mendaftar melalui tautan program, lalu mengisi konfirmasi. Gunakan tautan yang tersedia pada situs BBPVP Bandung dan pastikan informasi terbaru sebelum mengirim data pribadi.'] },
    ],
  },
  {
    slug: 'pelatihan-produktivitas-kerja-hijau-bandung-2026',
    title: 'Pelatihan produktivitas kerja hijau menggabungkan efisiensi dan praktik ramah lingkungan',
    description: 'Program BBPVP Bandung mengaitkan metode peningkatan produktivitas dengan praktik kerja yang lebih ramah lingkungan.',
    category: 'Keterampilan',
    date: '2026-11-03',
    image: '/images/articles/kualitas-kerja.webp',
    imageAlt: 'Ilustrasi proses kerja efisien dengan perhatian pada lingkungan',
    author, reviewer, reviewedAt: '2026-11-06',
    keywords: ['pekerjaan hijau', 'green jobs', 'produktivitas kerja hijau', 'BBPVP Bandung'],
    source: { name: 'BBPVP Bandung', url: 'https://bbpvpbandung.kemnaker.go.id/pengumuman/192', date: '16 Oktober 2026' },
    sections: [
      { heading: 'Kompetensi produktivitas di lapangan kerja hijau', paragraphs: ['BBPVP Bandung mempublikasikan pelatihan produktivitas pendukung lapangan kerja hijau. Kompetensi yang disebut meliputi pemahaman konsep produktivitas, penerapan praktik kerja ramah lingkungan, serta penggunaan alat dan metode perbaikan produktivitas.', 'Pelatihan berlangsung 2–6 November 2026 di BBPVP Bandung menurut pengumuman. Periode tersebut telah lewat; artikel ini merangkum program sebagai informasi dan bahan memantau pembukaan berikutnya, bukan ajakan mendaftar pada gelombang yang sama.'] },
      { heading: 'Apa makna keterampilan ini dalam pekerjaan', paragraphs: ['Praktik ramah lingkungan dapat terkait dengan pengurangan bahan terbuang, penggunaan energi yang lebih cermat, pemeliharaan proses, dan pencatatan hasil. Penerapannya tergantung jenis pekerjaan dan standar keselamatan serta mutu yang berlaku.', 'Saat mencari pelatihan lain, tanyakan apakah ada praktik langsung, metode pengukuran hasil, sertifikat, dan dukungan penempatan. Keterampilan hijau tidak terbatas pada satu jabatan atau industri.'] },
      { heading: 'Cek informasi gelombang berikutnya', paragraphs: ['Pantau situs BBPVP Bandung dan Skillhub untuk jadwal serta syarat yang baru. Cocokkan isi program dengan pengalamanmu dan kebutuhan pekerjaan di wilayah tujuan.'] },
    ],
  },
  {
    slug: 'lowongan-pemagangan-pekanbaru-instruktur-november-2026',
    title: 'Pemagangan di PVP Pekanbaru membuka posisi asisten instruktur',
    description: 'Pengumuman program magang di Pekanbaru memuat posisi asisten instruktur listrik dan pariwisata serta persyaratan bagi lulusan baru.',
    category: 'Magang',
    date: '2026-11-02',
    image: '/images/articles/magang.webp',
    imageAlt: 'Ilustrasi peserta magang belajar bersama instruktur',
    author, reviewer, reviewedAt: '2026-11-06',
    keywords: ['magang Pekanbaru 2026', 'asisten instruktur listrik', 'asisten instruktur pariwisata', 'MagangHub'],
    source: { name: 'Satpel PVP Pekanbaru, Kemnaker', url: 'https://bpvppekanbaru.kemnaker.go.id/satpel-pvp-pekanbaru-resmi-buka-pendaftaran-program-pemagangan-nasional-2026-angkatan-2-batch-3-1793588221', date: '2 November 2026' },
    sections: [
      { heading: 'Dua posisi yang diumumkan', paragraphs: ['Satpel PVP Pekanbaru mengumumkan pembukaan pemagangan nasional Angkatan 2 Batch 3 pada 2 November 2026. Posisi yang dicantumkan adalah asisten instruktur listrik dan asisten instruktur pariwisata, masing-masing dengan satu kebutuhan.', 'Pengumuman menyebut persyaratan lulusan diploma, sarjana, atau profesi dengan kelulusan maksimal satu tahun sebelum pendaftaran, belum pernah menjadi peserta pemagangan nasional sebelumnya, serta data NIK yang valid dan sesuai.'] },
      { heading: 'Jadwal program dan status pendaftaran', paragraphs: ['Jadwal pendaftaran pada pengumuman berlangsung 31 Oktober–4 November. Seleksi dan penetapan oleh Kemnaker dijadwalkan 12–13 November, pengumuman hasil 13 November, dan hari pertama magang 16 November 2026. Karena batas pendaftaran sudah lewat, cek portal resmi untuk status seleksi atau pembukaan berikutnya.', 'Calon peserta sebaiknya membandingkan kompetensi yang diminta dengan program studi dan pengalaman praktik. Jumlah posisi terbatas sehingga memenuhi persyaratan tidak otomatis menjamin lolos seleksi.'] },
      { heading: 'Gunakan MagangHub untuk informasi resmi', paragraphs: ['Pengumuman mengarahkan pendaftaran melalui MagangHub Kemnaker serta kanal media sosial resmi PVP Pekanbaru. Jangan membayar pihak yang menjanjikan kelulusan dan jangan mengirim dokumen ke akun yang tidak terverifikasi.'] },
    ],
  },
  {
    slug: 'job-fair-kemnaker-november-2026-cara-memantau-agenda',
    title: 'Cara memantau agenda job fair Kemnaker sepanjang November 2026',
    description: 'Kalender Job Fair Kemnaker menampilkan sejumlah agenda daerah. Gunakan filter dan verifikasi lowongan, penyelenggara, serta tanggal sebelum datang.',
    category: 'Cari kerja',
    date: '2026-11-05',
    image: '/images/articles/lowongan.webp',
    imageAlt: 'Ilustrasi pencari kerja menelusuri agenda bursa kerja',
    author, reviewer, reviewedAt: '2026-11-06',
    keywords: ['job fair November 2026', 'Job Fair Kemnaker', 'bursa kerja', 'lowongan resmi'],
    source: { name: 'Job Fair Kemnaker', url: 'https://jobfair.kemnaker.go.id/', date: 'Diakses 5 November 2026' },
    sections: [
      { heading: 'Kalender sebagai pintu masuk pencarian', paragraphs: ['Laman Job Fair Kemnaker menampilkan agenda untuk November 2026, termasuk job fair online dan kegiatan daerah. Kalender yang diperiksa mencantumkan agenda di beberapa tanggal sepanjang bulan, tetapi daftar lowongan dan perusahaan berbeda pada setiap acara.', 'Satu acara virtual yang tercantum pada 4 November sudah lewat. Pastikan tanggal dan status agenda lain pada laman sebelum menyiapkan perjalanan atau dokumen.'] },
      { heading: 'Persiapan sebelum mengikuti acara', paragraphs: ['Baca nama penyelenggara, lokasi atau cara akses virtual, perusahaan peserta, jenis pekerjaan, dan syarat pendaftaran. Siapkan CV terbaru serta catatan posisi yang ingin ditanyakan. Untuk kegiatan walk-in, konfirmasi jam, alamat, dan dokumen yang diminta melalui kanal resmi.', 'Jangan menganggap semua perusahaan di direktori Job Fair membuka posisi pada setiap acara. Periksa halaman detail acara dan tautan rekrutmen perusahaan.'] },
      { heading: 'Jaga keamanan lamaran', paragraphs: ['Kirim data hanya melalui kanal resmi perusahaan atau platform penyelenggara. Waspadai permintaan uang untuk proses seleksi dan simpan bukti komunikasi yang berkaitan dengan lamaran.'] },
    ],
  },
  {
    slug: 'pelatihan-gratis-pekerja-phk-bbpvp-medan-november-2026',
    title: 'BBPVP Medan siapkan pelatihan singkat bagi pekerja terdampak PHK',
    description: 'Program di Medan mencantumkan pelatihan manual brewing dan pemasaran digital. Pendaftaran sudah ditutup; simak cara menyiapkan diri untuk gelombang berikutnya.',
    category: 'Transisi karier',
    date: '2026-10-30',
    image: '/images/articles/perlindungan.webp',
    imageAlt: 'Ilustrasi pekerja mempelajari keterampilan baru setelah kehilangan pekerjaan',
    author, reviewer, reviewedAt: '2026-11-06',
    keywords: ['pelatihan pekerja PHK Medan', 'BBPVP Medan', 'digital marketing dasar', 'manual brewing'],
    source: { name: 'BBPVP Medan, Kemnaker', url: 'https://bbplkmedan.kemnaker.go.id/pendaftaran-pelatihan-bagi-pekerja-ter-phk/', date: '30 Oktober 2026' },
    sections: [
      { heading: 'Tiga bidang pelatihan yang ditawarkan', paragraphs: ['BBPVP Medan mengumumkan pelatihan bagi pekerja ter-PHK dengan pilihan Manual Brewing, Digital Marketing Dasar, dan Afiliasi Pemasaran Digital. Masing-masing program dicantumkan berdurasi 40 jam pelajaran.', 'Pendaftaran berakhir 4 November, verifikasi dan wawancara dijadwalkan 5–6 November, pengumuman 7 November, dan pelatihan mulai 9 November 2026. Karena pendaftaran telah ditutup, calon peserta perlu memantau pengumuman baru untuk gelombang selanjutnya.'] },
      { heading: 'Siapkan bukti status kerja dan tujuan belajar', paragraphs: ['Penyelenggara mencantumkan sejumlah dokumen yang dapat membuktikan PHK atau berakhirnya hubungan kerja, termasuk surat pemberitahuan, pemutusan kontrak, paklaring, atau dokumen lain sesuai ketentuan. Periksa daftar dan format yang diterima langsung di pengumuman resmi.', 'Pilih bidang berdasarkan pekerjaan atau usaha yang ingin dicoba. Materi singkat dapat memberi dasar praktik, tetapi hasil kerja dan pendapatan bergantung pada latihan, kebutuhan pasar, dan peluang setelah pelatihan.'] },
      { heading: 'Pantau pembukaan berikutnya', paragraphs: ['Ikuti situs BBPVP Medan untuk kabar program baru dan konfirmasi informasi melalui kontak resmi. Jangan membayar biaya yang tidak tercantum pada kanal penyelenggara.'] },
    ],
  },
]
