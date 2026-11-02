export interface Article {
  slug: string
  title: string
  description: string
  category: string
  date: string
  image: string
  imageAlt: string
  source: { name: string; url: string; date: string }
  sections: { heading: string; paragraphs: string[] }[]
}

// Editorial content is intentionally local for now; this structure can later be
// replaced by a CMS without changing article URLs.
export const articles: Article[] = [
  {
    slug: 'kerja-inklusif-disabilitas-batang-2026',
    title: 'Peluang kerja inklusif di Batang: melihat pengalaman pekerja disabilitas',
    description: 'Pemberitaan tentang pekerja disabilitas di industri alas kaki membuka percakapan tentang akses dan dukungan di tempat kerja.',
    category: 'Dunia kerja', date: '2026-11-02', image: '/images/articles/kualitas-kerja.webp', imageAlt: 'Ilustrasi pekerja berbincang tentang lingkungan kerja',
    source: { name: 'tvOnenews', url: 'https://www.tvonenews.com/ekonomi/475986-kisah-dari-batang-mengubah-stigma-lewat-peluang-kerja-inklusif-bagi-penyandang-disabilitas', date: '31 Oktober 2026' },
    sections: [
      { heading: 'Kesempatan di industri alas kaki', paragraphs: ['tvOnenews melaporkan PT Yih Quan Footwear Indonesia di Batang mempekerjakan 174 penyandang disabilitas, sekitar 2,8% dari 6.131 karyawan yang disebut dalam laporan tersebut.', 'Menurut pemberitaan itu, perusahaan menggunakan asesmen internal untuk mempertimbangkan kondisi dan kemampuan pekerja dalam penempatan. Pengalaman satu perusahaan tidak otomatis menggambarkan kondisi seluruh industri.'] },
      { heading: 'Inklusi juga menyangkut pengalaman sehari-hari', paragraphs: ['Kesempatan melamar adalah langkah awal. Akses ke lingkungan kerja, komunikasi yang jelas, penyesuaian yang dibutuhkan, dan kesempatan berkembang juga perlu diperhatikan.', 'Pencari kerja dapat bertanya tentang akses tempat kerja, proses seleksi, dan dukungan yang tersedia sesuai kebutuhan masing-masing. Perusahaan perlu mendengarkan langsung kebutuhan kandidat dan pekerjanya.'] },
      { heading: 'Periksa informasi sebelum melamar', paragraphs: ['Artikel ini membahas praktik yang diberitakan, bukan pengumuman lowongan. Periksa kanal resmi perusahaan atau dinas tenaga kerja untuk mengetahui apakah ada posisi yang sedang dibuka.'] },
    ],
  },
  {
    slug: 'sertifikasi-pekerja-sosial-koordinasi-2026',
    title: 'Sertifikasi pekerja sosial: Kemensos matangkan materi uji kompetensi',
    description: 'Koordinasi Kemensos menyoroti persiapan sertifikasi bagi pekerja sosial dan tenaga kesejahteraan sosial.',
    category: 'Pengembangan karier', date: '2026-11-02', image: '/images/articles/perlindungan.webp', imageAlt: 'Ilustrasi pekerja berdiskusi tentang dokumen kerja',
    source: { name: 'Poltekesos Bandung', url: 'https://poltekesos.ac.id/berita/matangkan-uji-kompetensi-sdm-kesejahteraan-sosial-kemensos-gelar-koordinasi-di-bekasi', date: '1 November 2026' },
    sections: [
      { heading: 'Koordinasi untuk pelaksanaan sertifikasi', paragraphs: ['Poltekesos Bandung memberitakan bahwa Kemensos mengadakan koordinasi sertifikasi SDM kesejahteraan sosial di Bekasi pada 29–31 Oktober 2026. Pembahasan mencakup mekanisme sertifikasi dan persiapan materi uji bagi pekerja sosial, tenaga kesejahteraan sosial, dan relawan sosial.', 'Laporan itu menyebut finalisasi materi uji pekerja sosial masih perlu dilakukan dengan melibatkan sejumlah lembaga dan organisasi profesi. Kegiatan koordinasi tersebut bukan pengumuman pendaftaran sertifikasi.'] },
      { heading: 'Apa yang bisa disiapkan?', paragraphs: ['Jika kamu bekerja atau ingin berkarier di bidang kesejahteraan sosial, pelajari kompetensi yang berkaitan dengan peranmu dan catat pengalaman yang relevan. Simpan dokumen pendidikan dan pengalaman kerja secara rapi.', 'Persyaratan dan jadwal uji dapat berbeda menurut skema. Cek informasi terbaru langsung pada lembaga sertifikasi atau penyelenggara resmi sebelum mengambil keputusan.'] },
      { heading: 'Pilih pelatihan sesuai kebutuhan', paragraphs: ['Bandingkan materi, biaya, dan pengakuan sertifikat sebelum mengikuti pelatihan. Sertifikat bermanfaat bila sesuai dengan kompetensi yang ingin dibangun dan kebutuhan pekerjaan yang dituju.'] },
    ],
  },
  {
    slug: 'kompetisi-teknisi-pompa-layanan-purnajual-2026',
    title: 'Kompetisi teknisi pompa air: keterampilan yang dibutuhkan setelah penjualan',
    description: 'Kompetisi teknisi menyoroti pentingnya instalasi, pemahaman produk, dan komunikasi dengan pelanggan.',
    category: 'Keterampilan', date: '2026-11-02', image: '/images/articles/magang.webp', imageAlt: 'Ilustrasi pekerja belajar bersama di lingkungan kerja',
    source: { name: 'Media Indonesia', url: 'https://mediaindonesia.com/ekonomi/950921/kompetisi-keterampilan-teknisi-jadi-bagian-dari-penguatan-layanan-purnajual', date: '1 November 2026' },
    sections: [
      { heading: 'Peran teknisi setelah produk dibeli', paragraphs: ['Media Indonesia memberitakan Jagoan Wasser 2026, program yang menggabungkan kompetisi keterampilan teknisi pompa air, pengenalan komunitas, serta konsultasi produk dan layanan.', 'Teknisi membantu pelanggan memahami kebutuhan instalasi dan memilih sistem yang sesuai dengan kondisi sumber air serta penggunaan di rumah. Ini menunjukkan bahwa pekerjaan teknis juga membutuhkan pemahaman konteks pelanggan.'] },
      { heading: 'Kembangkan kemampuan secara bertahap', paragraphs: ['Bagi calon teknisi, dasar instalasi, pemecahan masalah, dan prosedur keselamatan merupakan hal yang bisa dipelajari melalui pelatihan dan praktik yang diawasi. Ikuti petunjuk produk dan batas kewenangan pekerjaan yang dikerjakan.', 'Kemampuan menjelaskan masalah dan langkah perbaikan dengan bahasa yang mudah dipahami juga membantu pelanggan mengambil keputusan.'] },
      { heading: 'Cari pengalaman belajar yang relevan', paragraphs: ['Saat memilih pelatihan atau komunitas, periksa materi praktik, pendampingan, dan reputasi penyelenggara. Kompetisi yang diberitakan adalah kegiatan perusahaan, bukan jaminan lowongan kerja.'] },
    ],
  },
  {
    slug: 'kesehatan-pekerja-terminal-logistik-2026',
    title: 'Kesehatan pekerja terminal peti kemas: bagian penting dari layanan logistik',
    description: 'Pemberitaan dari Tanjung Priok mengingatkan pentingnya kesehatan dan keselamatan bagi pekerja logistik.',
    category: 'Kesehatan kerja', date: '2026-11-02', image: '/images/articles/pasar-kerja.webp', imageAlt: 'Ilustrasi pekerja berangkat kerja di kawasan perkotaan',
    source: { name: 'Trenbisnis', url: 'https://trenbisnis.co.id/detail/4496953/jict-kesehatan-pekerja-fondasi-keandalan-logistik-nasional', date: '31 Oktober 2026' },
    sections: [
      { heading: 'Orang di balik pergerakan barang', paragraphs: ['Trenbisnis melaporkan penekanan Jakarta International Container Terminal terhadap kesehatan dan keselamatan pekerja dalam menjaga layanan logistik di kawasan Tanjung Priok.', 'Pekerjaan terminal melibatkan beragam peran dan kondisi lapangan. Risiko serta perlindungan yang diperlukan dapat berbeda menurut tugas, lokasi, dan jadwal kerja.'] },
      { heading: 'Pertanyaan untuk memahami kondisi kerja', paragraphs: ['Saat mempertimbangkan pekerjaan logistik, tanyakan pelatihan keselamatan, alat pelindung yang sesuai, prosedur melaporkan bahaya, dan akses bantuan ketika terjadi insiden.', 'Perhatikan juga jadwal dan waktu istirahat. Penjelasan tentang kebijakan perusahaan sebaiknya diikuti dengan penerapan yang bisa dilihat dan dievaluasi.'] },
      { heading: 'Cari informasi dari beberapa sumber', paragraphs: ['Pernyataan perusahaan memberi satu sudut pandang. Untuk memahami pengalaman kerja secara lebih lengkap, bandingkan dengan informasi lain yang relevan dan terkini, termasuk pengalaman pekerja di unit yang dituju.'] },
    ],
  },
  {
    slug: 'kompetensi-digital-pengalaman-kerja-lulusan-2026',
    title: 'Kemnaker dorong pengalaman dan keterampilan digital untuk lulusan',
    description: 'Kuliah umum di Politeknik Penerbangan Makassar menyoroti kompetensi, pengalaman, dan literasi digital sebagai bekal kerja.',
    category: 'Awal karier', date: '2026-11-02', image: '/images/articles/lowongan.webp', imageAlt: 'Ilustrasi pencari kerja belajar menggunakan laptop',
    source: { name: 'InfoPublik', url: 'https://infopublik.id/index.php/kategori/nasional-sosial-budaya/995406/siapkan-sdm-unggul-menuju-indonesia-emas-2045-kemnaker-tekankan-keahlian-dan-pengalaman-kerja', date: '1 November 2026' },
    sections: [
      { heading: 'Hubungkan pendidikan dengan kebutuhan kerja', paragraphs: ['InfoPublik melaporkan pesan Sekretaris Jenderal Kemnaker dalam kuliah umum di Politeknik Penerbangan Makassar pada 30 Oktober 2026. Ia menekankan pentingnya keterampilan yang relevan dan pengalaman kerja bagi generasi muda.', 'Literasi digital dan pemanfaatan kecerdasan buatan juga disebut sebagai bagian dari pengembangan kompetensi. Kebutuhan setiap jabatan tetap berbeda, sehingga pilihan belajar perlu disesuaikan dengan tujuan karier.'] },
      { heading: 'Mulai dari pengalaman yang bisa dijelaskan', paragraphs: ['Proyek kuliah, kegiatan organisasi, pekerjaan lepas, atau pengalaman praktik dapat menjadi bahan untuk menunjukkan cara kamu menyelesaikan masalah. Jelaskan tugas pribadi, proses, dan hasilnya secara jujur.', 'Untuk keterampilan digital, pilih alat yang relevan dengan bidangmu dan latih penggunaannya pada tugas nyata. Periksa kembali hasil alat AI dan lindungi informasi pribadi atau rahasia.'] },
      { heading: 'Susun langkah belajar', paragraphs: ['Baca beberapa deskripsi pekerjaan yang diminati, catat keterampilan yang sering muncul, lalu pilih satu atau dua hal untuk dipelajari. Simpan contoh hasil kerja yang boleh dibagikan sebagai portofolio.'] },
    ],
  },
  {
    slug: 'pasar-kerja-indonesia-2026-angka-pengangguran',
    title: 'Pasar kerja Indonesia 2026: apa arti angka pengangguran 4,65%?',
    description: 'Data terbaru BPS menunjukkan lebih banyak orang bekerja. Pahami apa yang bisa dan tidak bisa diceritakan angka pengangguran tentang kualitas pekerjaan.',
    category: 'Pasar kerja', date: '2026-10-30', image: '/images/articles/pasar-kerja.webp', imageAlt: 'Ilustrasi pekerja berangkat kerja di kawasan perkotaan Indonesia',
    source: { name: 'Badan Pusat Statistik', url: 'https://www.bps.go.id/id/pressrelease/2026/08/05/2606/tingkat-pengangguran-terbuka--tpt--sebesar-4-65-persen---rata-rata-upah-buruh-sebesar-3-39-juta-rupiah-.html', date: '5 Agustus 2026' },
    sections: [
      { heading: 'Lebih banyak orang masuk dunia kerja', paragraphs: ['Badan Pusat Statistik mencatat 148,19 juta penduduk bekerja pada Mei 2026, bertambah 522 ribu orang dibanding Februari 2026. Pada periode yang sama, tingkat pengangguran terbuka tercatat 4,65%, turun 0,03 poin persentase.', 'Angka ini memberi gambaran tentang orang yang bekerja dan mereka yang sedang mencari pekerjaan. Namun, angka tersebut tidak otomatis menjelaskan apakah setiap pekerjaan memiliki upah, jam kerja, atau kondisi yang sesuai harapan.'] },
      { heading: 'Lihat lebih jauh dari angka nasional', paragraphs: ['BPS mencatat pertanian, kehutanan, dan perikanan sebagai kelompok lapangan usaha dengan jumlah pekerja terbesar: 42,60 juta orang. Kondisi pasar kerja bisa berbeda jauh menurut wilayah, sektor, dan pengalaman.', 'Saat menilai peluang, bandingkan tanggung jawab, pola kerja, serta kesempatan berkembang. Cari beberapa pengalaman pekerja dan periksa konteksnya agar satu cerita tidak dianggap mewakili seluruh perusahaan.'] },
      { heading: 'Apa yang bisa dilakukan pencari kerja?', paragraphs: ['Gunakan statistik nasional untuk memahami arah pasar, lalu padukan dengan informasi yang lebih dekat dengan posisi yang dilamar. Bacalah deskripsi pekerjaan dengan teliti dan siapkan pertanyaan tentang tim, ukuran keberhasilan, dan dukungan untuk karyawan baru.'] },
    ],
  },
  {
    slug: 'lowongan-karirhub-september-2026', title: 'Membaca data lowongan Karirhub 2026 sebelum mulai melamar',
    description: 'Ratusan ribu kebutuhan tenaga kerja tercatat di Karirhub dan JOSS. Inilah cara membaca angka tersebut dengan konteks yang tepat.',
    category: 'Cari kerja', date: '2026-10-30', image: '/images/articles/lowongan.webp', imageAlt: 'Ilustrasi pencari kerja mempelajari lowongan melalui laptop',
    source: { name: 'Pusat Pasar Kerja Kemnaker — Pasker ID', url: 'https://paskerid.kemnaker.go.id/', date: 'data Januari–September 2026' },
    sections: [
      { heading: 'Lowongan dan kebutuhan tenaga kerja bukan angka yang sama', paragraphs: ['Pasker ID mencatat 94.150 lowongan yang diposting melalui Karirhub dan JOSS pada Januari–September 2026. Lowongan tersebut memuat kebutuhan 350.293 orang, sedangkan jumlah lamaran yang diajukan mencapai 3.031.614.', 'Satu lowongan dapat membutuhkan lebih dari satu orang, dan satu pencari kerja dapat mengirim lebih dari satu lamaran. Karena itu angka lamaran tidak bisa dibaca sebagai jumlah orang yang berbeda.'] },
      { heading: 'Data platform hanyalah sebagian pasar', paragraphs: ['Angka tersebut menggambarkan aktivitas pada kanal yang disebutkan, bukan seluruh lowongan di Indonesia. Jumlah peluang juga berubah seiring waktu dan tidak menjamin sebuah posisi masih terbuka saat kamu membaca artikel ini.', 'Gunakan data sebagai titik awal. Periksa status lowongan di kanal resmi, lokasi, jenis kontrak, dan kecocokan keterampilan sebelum melamar.'] },
      { heading: 'Buat proses melamar lebih terarah', paragraphs: ['Catat posisi yang benar-benar sesuai, sesuaikan CV dengan pengalaman yang relevan, dan simpan pertanyaan untuk perekrut. Sebelum menerima tawaran, cari informasi tentang perusahaan dan bandingkan beberapa sumber.'] },
    ],
  },
  {
    slug: 'rata-rata-upah-buruh-indonesia-2026', title: 'Rata-rata upah buruh Rp3,39 juta: bagaimana membacanya?',
    description: 'Rata-rata nasional bukan patokan gaji untuk setiap jabatan. Pelajari konteks data upah BPS dan apa yang perlu ditanyakan saat mendapat tawaran.',
    category: 'Gaji', date: '2026-10-30', image: '/images/articles/gaji.webp', imageAlt: 'Ilustrasi seseorang memeriksa dokumen penawaran kerja dan perhitungan gaji',
    source: { name: 'Badan Pusat Statistik', url: 'https://www.bps.go.id/id/pressrelease/2026/08/05/2606/tingkat-pengangguran-terbuka--tpt--sebesar-4-65-persen---rata-rata-upah-buruh-sebesar-3-39-juta-rupiah-.html', date: '5 Agustus 2026' },
    sections: [
      { heading: 'Satu angka, banyak situasi', paragraphs: ['BPS mencatat rata-rata upah buruh pada Mei 2026 sebesar Rp3,39 juta. Ini adalah rata-rata nasional untuk kelompok yang diukur BPS, bukan rekomendasi gaji untuk satu jabatan atau satu kota.', 'Jenis pekerjaan, pengalaman, industri, dan lokasi dapat memengaruhi besaran penghasilan. Rata-rata juga berbeda dari median dan tidak menunjukkan seluruh variasi pendapatan.'] },
      { heading: 'Pisahkan gaji pokok dan penghasilan lain', paragraphs: ['Saat membandingkan tawaran, tanyakan apakah angka yang disampaikan merupakan gaji pokok, penghasilan bruto, atau estimasi yang diterima setelah potongan. Periksa juga tunjangan, bonus, waktu pembayaran, dan ketentuan yang berlaku.', 'Kemnaker menyediakan data UMP 2026 untuk 38 provinsi. Upah minimum berbeda menurut wilayah dan ketentuannya; periksa aturan yang relevan dengan tempat dan status kerja kamu.'] },
      { heading: 'Bandingkan dengan konteks yang sepadan', paragraphs: ['Cari data untuk peran, wilayah, tingkat pengalaman, dan periode gaji yang sama. Jika sampel terbatas, perlakukan angka sebagai petunjuk awal, bukan janji tentang penawaran yang akan diterima.'] },
    ],
  },
  {
    slug: 'maganghub-2026-persiapan-lulusan', title: 'MagangHub 2026: apa yang bisa dipelajari lulusan baru?',
    description: 'Puluhan ribu peserta memulai MagangHub Batch 2 Angkatan II. Berikut hal yang bisa diperhatikan saat menilai kesempatan magang.',
    category: 'Awal karier', date: '2026-10-30', image: '/images/articles/magang.webp', imageAlt: 'Ilustrasi lulusan baru belajar bersama di lingkungan kerja',
    source: { name: 'BPVP Kendari, Kementerian Ketenagakerjaan', url: 'https://bpvpkendari.kemnaker.go.id/page-news-detail?q=kemnaker-mulai-maganghub-batch-2-sebanyak-40962-peserta-siap-ikuti-pemagangan', date: '28 September 2026' },
    sections: [
      { heading: 'Pengalaman untuk transisi ke dunia kerja', paragraphs: ['Kemnaker menyampaikan bahwa 40.962 peserta yang lolos seleksi MagangHub Batch 2 Angkatan II mulai mengikuti pemagangan selama enam bulan. Peserta belajar di kementerian, lembaga, maupun sektor industri.', 'Program ini dirancang untuk membantu lulusan perguruan tinggi memperoleh pengalaman lapangan dan mengembangkan keterampilan. Angka peserta dan periode di atas merujuk pada angkatan yang diberitakan, bukan pembukaan pendaftaran baru.'] },
      { heading: 'Periksa kualitas kesempatan belajar', paragraphs: ['Sebelum memilih program, baca tugas, bidang kerja, lokasi, durasi, serta aturan yang berlaku pada angkatan tersebut. Tanyakan siapa yang akan membimbing dan bagaimana umpan balik diberikan.', 'Pengalaman yang baik bukan hanya nama perusahaan di CV. Perhatikan apakah pekerjaan sehari-hari memberi ruang untuk berlatih, memahami proses, dan menyusun portofolio tanpa membagikan informasi rahasia.'] },
      { heading: 'Pantau informasi resmi', paragraphs: ['Jadwal dan persyaratan dapat berubah untuk angkatan berikutnya. Periksa kanal resmi Kemnaker dan penyelenggara sebelum mendaftar, serta jangan membayar biaya kepada pihak yang menjanjikan kelulusan.'] },
    ],
  },
  {
    slug: 'jaminan-kehilangan-pekerjaan-2026', title: 'Jaminan Kehilangan Pekerjaan: mengenal dukungan setelah PHK',
    description: 'Kebijakan perlindungan pekerja 2026 mencakup manfaat JKP. Kenali gambaran manfaat dan pentingnya memeriksa syarat resmi.',
    category: 'Hak pekerja', date: '2026-10-30', image: '/images/articles/perlindungan.webp', imageAlt: 'Ilustrasi dua pekerja berdiskusi tentang dokumen kerja',
    source: { name: 'Kementerian Ketenagakerjaan', url: 'https://www.kemnaker.go.id/news/detail/presiden-prabowo-umumkan-serangkaian-kebijakan-perlindungan-pekerja-pada-may-day-2026', date: 'Mei 2026' },
    sections: [
      { heading: 'Dukungan tunai, pelatihan, dan informasi kerja', paragraphs: ['Dalam pemberitaan May Day 2026, Kemnaker menjelaskan peningkatan manfaat Jaminan Kehilangan Pekerjaan (JKP), termasuk uang tunai sebesar 60% dari upah selama enam bulan, akses pelatihan, dan informasi pasar kerja.', 'Manfaat tersebut memiliki syarat kepesertaan dan ketentuan pelaksanaan. Tidak semua situasi berakhirnya hubungan kerja otomatis memenuhi syarat, sehingga penting memeriksa informasi resmi yang berlaku untuk kasus kamu.'] },
      { heading: 'Siapkan informasi yang diperlukan', paragraphs: ['Simpan dokumen hubungan kerja, bukti kepesertaan jaminan sosial, dan informasi terkait berakhirnya pekerjaan. Periksa status kepesertaan dan prosedur pengajuan pada kanal resmi BPJS Ketenagakerjaan atau Kemnaker.', 'Ketentuan dapat berubah. Hindari membagikan data pribadi kepada pihak yang tidak jelas dan gunakan kanal resmi jika membutuhkan bantuan.'] },
      { heading: 'Rencanakan langkah berikutnya', paragraphs: ['Selain memeriksa hak, gunakan masa transisi untuk meninjau kebutuhan keuangan, memperbarui CV, dan mencari pelatihan yang sesuai tujuan. Bandingkan calon tempat kerja dengan mempertimbangkan peran dan kondisi kerja secara utuh.'] },
    ],
  },
  {
    slug: 'kualitas-pekerjaan-indonesia-2026', title: 'Kualitas pekerjaan di Indonesia: mengapa jumlah saja belum cukup',
    description: 'Kajian Bappenas menyoroti pekerjaan informal dan tantangan produktivitas. Apa artinya ketika kamu menilai pekerjaan berikutnya?',
    category: 'Dunia kerja', date: '2026-10-30', image: '/images/articles/kualitas-kerja.webp', imageAlt: 'Ilustrasi pekerja berbincang setelah sesi wawancara kerja',
    source: { name: 'Bappenas Working Papers', url: 'https://workingpapers.bappenas.go.id/index.php/bwp/article/download/540/191/', date: 'Januari 2026' },
    sections: [
      { heading: 'Melihat pekerjaan dari sisi kualitas', paragraphs: ['Kajian Outlook Ketenagakerjaan Indonesia 2026–2029 menyoroti dominasi pekerjaan informal, meningkatnya proporsi pekerjaan tidak penuh waktu, dan tantangan penciptaan pekerjaan yang produktif.', 'Temuan tersebut mengingatkan bahwa jumlah orang yang bekerja adalah satu bagian dari cerita. Keamanan kerja, penghasilan, kesempatan belajar, dan kecocokan jam kerja juga memengaruhi pengalaman seseorang.'] },
      { heading: 'Pertanyaan yang berguna saat interview', paragraphs: ['Mintalah penjelasan tentang jenis kontrak, jam kerja, pola lembur, mekanisme evaluasi, dan dukungan yang tersedia. Pertanyaan yang spesifik membantu kamu memahami pekerjaan sehari-hari, bukan hanya judul posisi.', 'Cari pengalaman dari beberapa sumber dan perhatikan kapan pengalaman tersebut terjadi. Situasi tim dan kebijakan perusahaan dapat berubah.'] },
      { heading: 'Sesuaikan dengan prioritasmu', paragraphs: ['Tidak ada satu ukuran yang cocok untuk semua orang. Tentukan hal yang paling penting bagi tahap kariermu, lalu timbang kesempatan berkembang, kompensasi, dan cara kerja sebelum mengambil keputusan.'] },
    ],
  },
]

export const formatArticleDate = (date: string) => new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`))
