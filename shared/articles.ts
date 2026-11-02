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
    slug: 'ai-perusahaan-kesiapan-data-talenta-2026', title: 'AI di perusahaan: mengapa kesiapan data dan pekerja ikut menentukan',
    description: 'Telkom menyoroti kesiapan data dan talenta saat perusahaan mulai menerapkan AI dalam kegiatan bisnis.',
    category: 'Teknologi kerja', date: '2026-11-02', image: '/images/articles/lowongan.webp', imageAlt: 'Ilustrasi seseorang menggunakan laptop untuk bekerja',
    source: { name: 'Telkom Indonesia', url: 'https://aro.telkom.co.id/sites/berita/id_ID/news/telkom-akselerasi-adopsi-ai-di-segmen-enterprise-kesiapan-data-dan-talenta-jadi-kunci-utama-4040', date: '2 November 2026' },
    sections: [
      { heading: 'Dari percobaan menuju penerapan', paragraphs: ['Dalam publikasi 2 November 2026, Telkom menekankan kesiapan data dan talenta dalam penerapan kecerdasan buatan di perusahaan. Pernyataan tersebut disampaikan dalam diskusi industri pada 27 Oktober.', 'Sumber ini merupakan sudut pandang perusahaan penyedia layanan teknologi. Manfaat dan risiko penerapan AI dapat berbeda menurut pekerjaan dan organisasi.'] },
      { heading: 'Keterampilan yang bisa dilatih', paragraphs: ['Mulailah dengan memahami tugas yang ingin dibantu teknologi, kualitas informasi yang digunakan, dan cara memeriksa hasilnya. Kemampuan menyampaikan temuan dan bekerja dengan tim tetap penting.', 'Jangan memasukkan data rahasia ke alat yang belum disetujui organisasi. Periksa kebijakan tempat kerja sebelum menggunakan layanan AI.'] },
      { heading: 'Tanyakan aturan penggunaannya', paragraphs: ['Jika perusahaan menggunakan AI, tanyakan alat yang diizinkan, pelatihan yang disediakan, dan siapa yang bertanggung jawab memeriksa hasil sebelum dipakai.'] },
    ],
  },
  {
    slug: 'santri-matic-keterampilan-kreator-solo-2026', title: 'Santri Matic di Solo: belajar konten dan pemasaran digital',
    description: 'Program Kementerian Ekonomi Kreatif membekali santri dengan praktik konten dan pengenalan pemasaran digital.',
    category: 'Keterampilan', date: '2026-11-02', image: '/images/articles/magang.webp', imageAlt: 'Ilustrasi peserta belajar bersama',
    source: { name: 'Kementerian Ekonomi Kreatif', url: 'https://ekraf.go.id/news/kementerian-ekraf-gandeng-shopee-cetak-santri-solo-jadi-kreator-digital', date: '1 November 2026' },
    sections: [
      { heading: 'Pelatihan untuk santri Solo Raya', paragraphs: ['Kementerian Ekonomi Kreatif melaporkan peluncuran Santri Matic di Surakarta pada 31 Oktober 2026. Program bersama Shopee tersebut diikuti 200 santri dari 22 pesantren di Solo Raya.', 'Materi mencakup pengenalan marketplace, promosi, program afiliasi, dan praktik membuat konten dengan pendampingan.'] },
      { heading: 'Dari belajar ke praktik', paragraphs: ['Keterampilan membuat konten dapat diasah dengan menentukan audiens, menjelaskan manfaat produk secara akurat, dan mengevaluasi respons. Simpan contoh karya yang mendapat izin untuk digunakan dalam portofolio.', 'Penghasilan afiliasi bergantung pada ketentuan program dan hasil penjualan; pelatihan tidak menjamin pendapatan tertentu.'] },
      { heading: 'Pahami aturan platform', paragraphs: ['Sebelum berjualan atau menjadi kreator, baca ketentuan platform, biaya yang berlaku, dan cara mengungkapkan hubungan promosi kepada audiens.'] },
    ],
  },
  {
    slug: 'pelatihan-pramuwisata-manggarai-barat-2026', title: 'Pelatihan pramuwisata di Manggarai Barat: bekal memasuki industri wisata',
    description: 'Pembukaan pelatihan vokasi di Manggarai Barat mempertemukan peserta dengan praktisi pariwisata.',
    category: 'Pengembangan karier', date: '2026-11-02', image: '/images/articles/magang.webp', imageAlt: 'Ilustrasi peserta berdiskusi dalam pelatihan',
    source: { name: 'Pemerintah Kabupaten Manggarai Barat', url: 'https://infomabar.manggaraibaratkab.go.id/respon-pvn-pemkab-mabar-ketua-hpi-ini-jalan-pintas-menjadi-pramuwisata-profesional/', date: '2 November 2026' },
    sections: [
      { heading: 'Belajar dari praktisi', paragraphs: ['Pemkab Manggarai Barat memberitakan pembukaan Pelatihan Vokasi Nasional di balai latihan kerja setempat pada 2 November 2026. Kegiatan tersebut melibatkan instruktur yang memiliki pengalaman di industri pariwisata Labuan Bajo.', 'Ketua Himpunan Pramuwisata Indonesia setempat mendorong peserta mengikuti pelatihan sampai selesai. Pembukaan kegiatan ini bukan pengumuman lowongan kerja.'] },
      { heading: 'Kemampuan yang perlu dikembangkan', paragraphs: ['Calon pemandu dapat melatih komunikasi, pengetahuan destinasi, pengelolaan kelompok, dan kemampuan beradaptasi dengan kebutuhan pengunjung.', 'Pemahaman keselamatan perjalanan dan penghormatan terhadap masyarakat serta lingkungan setempat juga penting dalam praktik lapangan.'] },
      { heading: 'Periksa pelatihan berikutnya', paragraphs: ['Tanyakan kepada dinas tenaga kerja atau balai latihan kerja setempat tentang jadwal, persyaratan, dan sertifikasi yang relevan sebelum mendaftar.'] },
    ],
  },
  {
    slug: 'pelatihan-pertolongan-pertama-karyawan-2026', title: 'Pelatihan pertolongan pertama di tempat kerja: apa yang perlu disiapkan?',
    description: 'Pelatihan karyawan di Sidoarjo mengingatkan pentingnya kesiapan menghadapi keadaan darurat.',
    category: 'Keselamatan kerja', date: '2026-11-02', image: '/images/articles/perlindungan.webp', imageAlt: 'Ilustrasi pekerja berdiskusi tentang keselamatan',
    source: { name: 'RS Delta Surya', url: 'https://rsdeltasurya.com/berita-kegiatan/pelatihan-first-aid-rs-delta-surya-pt-eloda-mitra/', date: '31 Oktober 2026' },
    sections: [
      { heading: 'Pelatihan bagi karyawan', paragraphs: ['RS Delta Surya memberitakan pelatihan pertolongan pertama bersama karyawan PT Eloda Mitra pada 31 Oktober 2026. Kegiatan tersebut membahas penanganan awal keadaan darurat sebelum bantuan medis tiba.', 'Publikasi rumah sakit ini menjelaskan satu kegiatan, sehingga tidak menggambarkan kesiapan seluruh tempat kerja.'] },
      { heading: 'Kenali prosedur di tempat kerja', paragraphs: ['Cari tahu siapa petugas yang ditunjuk, lokasi perlengkapan pertolongan pertama, dan cara menghubungi bantuan darurat. Ikuti latihan yang sesuai dengan risiko pekerjaan.', 'Dalam keadaan darurat, utamakan keselamatan diri dan hubungi bantuan medis. Pelatihan langsung membantu pekerja memahami tindakan sesuai situasi.'] },
      { heading: 'Tanyakan pembaruan pelatihan', paragraphs: ['Perusahaan dapat mengevaluasi perlengkapan, akses bantuan, dan kesempatan latihan secara berkala agar prosedur mudah dipahami pekerja baru maupun lama.'] },
    ],
  },
  {
    slug: 'pelatihan-vokasi-korban-phk-sidoarjo-2026', title: 'Pelatihan vokasi untuk pekerja terdampak PHK di Sidoarjo',
    description: 'Informasi pelatihan daerah dapat menjadi titik awal untuk menyusun langkah setelah kehilangan pekerjaan.',
    category: 'Transisi karier', date: '2026-11-02', image: '/images/articles/perlindungan.webp', imageAlt: 'Ilustrasi pekerja membahas langkah karier berikutnya',
    source: { name: 'Sapa Jatim', url: 'https://sapajatim.com/berita/disnaker-sidoarjo-buka-pelatihan-gratis-bagi-korban-phk-ada-barista-hingga-konten-kreator', date: '31 Oktober 2026' },
    sections: [
      { heading: 'Pilihan pelatihan setelah PHK', paragraphs: ['Sapa Jatim memberitakan pendaftaran pelatihan vokasi gratis Disnaker Sidoarjo bagi pekerja terdampak PHK, dengan pilihan seperti barista dan konten kreator.', 'Menurut laporan tersebut, pendaftaran berlangsung 31 Oktober–3 November 2026. Jadwal dan ketersediaan bisa berubah; pastikan langsung kepada Disnaker Sidoarjo.'] },
      { heading: 'Sesuaikan dengan rencana', paragraphs: ['Bandingkan materi, lokasi, durasi, dan syarat peserta dengan pengalaman serta jenis pekerjaan yang ingin dituju. Pelatihan adalah sarana belajar, bukan jaminan langsung diterima bekerja.', 'Siapkan dokumen yang diminta melalui kanal resmi dan hindari menyerahkan data kepada pihak yang tidak dapat diverifikasi.'] },
      { heading: 'Cari dukungan lain', paragraphs: ['Selain pelatihan, periksa layanan informasi kerja dan hak yang mungkin berlaku sesuai kondisi masing-masing melalui instansi resmi.'] },
    ],
  },
  {
    slug: 'job-fair-inklusif-jatim-november-2026', title: 'Job fair inklusif Jawa Timur: cara menyiapkan lamaran daring',
    description: 'Job fair virtual di Jawa Timur mengangkat akses kerja bagi penyandang disabilitas dan kelompok rentan.',
    category: 'Cari kerja', date: '2026-11-02', image: '/images/articles/lowongan.webp', imageAlt: 'Ilustrasi pencari kerja menggunakan laptop',
    source: { name: 'Job Fair Kemnaker', url: 'https://jobfair.kemnaker.go.id/web/events/6ff3636e-018a-47a9-bf70-216268d2a5f1/detail', date: '31 Oktober–2 November 2026' },
    sections: [
      { heading: 'Kegiatan virtual di Jawa Timur', paragraphs: ['Laman Job Fair Kemnaker mencantumkan Job Fair Inklusif Disnakertrans Jatim bersama IKA Unair secara virtual pada 31 Oktober–2 November 2026.', 'Kegiatan ini ditujukan untuk memperluas akses informasi kerja, termasuk bagi penyandang disabilitas dan kelompok rentan. Laman tersebut pada saat diperiksa belum menampilkan perusahaan pemberi kerja terdaftar.'] },
      { heading: 'Siapkan dokumen dan pertanyaan', paragraphs: ['Perbarui CV dan siapkan ringkasan pengalaman yang sesuai dengan posisi. Cek persyaratan masing-masing perusahaan, lokasi, dan batas pendaftaran pada kanal resmi.', 'Jika membutuhkan penyesuaian akses selama seleksi, sampaikan kebutuhan tersebut kepada penyelenggara atau perekrut melalui kontak resmi.'] },
      { heading: 'Pantau kegiatan berikutnya', paragraphs: ['Tanggal di atas merujuk pada satu kegiatan tertentu. Periksa situs penyelenggara untuk agenda terbaru, karena lowongan dan jadwal dapat berubah.'] },
    ],
  },
  {
    slug: 'umkm-mandalika-event-besar-2026', title: 'UMKM di MotoGP Mandalika: apa yang bisa dipelajari dari acara besar?',
    description: 'Laporan dampak ekonomi Mandalika memberi gambaran peluang dan persiapan usaha kecil saat mengikuti acara besar.',
    category: 'Wirausaha', date: '2026-11-02', image: '/images/articles/kualitas-kerja.webp', imageAlt: 'Ilustrasi orang berdiskusi tentang kegiatan usaha',
    source: { name: 'Ekbis NTB', url: 'https://ekbisntb.com/02/11/2026/selama-motogp-mandalika-transaksi-umkm-tembus-rp-29-miliar/', date: '2 November 2026' },
    sections: [
      { heading: 'Transaksi pada satu penyelenggaraan', paragraphs: ['Ekbis NTB melaporkan estimasi transaksi UMKM sekitar Rp2,9 miliar dalam MotoGP Mandalika 2026, berdasarkan kajian bersama yang dikutip dari ITDC dan LETMI ITB. Laporan tersebut menyebut 769 pelaku UMKM terlibat.', 'Angka transaksi keseluruhan bukan laba dan tidak menunjukkan hasil masing-masing pelaku usaha.'] },
      { heading: 'Hitung kebutuhan sebelum ikut', paragraphs: ['Pelaku usaha dapat memperkirakan stok, biaya produksi, transportasi, tenaga kerja, dan biaya stan sebelum mengikuti acara. Pertimbangkan juga cara menerima pembayaran serta menangani produk yang tidak terjual.', 'Kumpulkan umpan balik pelanggan dan catat penjualan untuk membantu menilai apakah acara tersebut cocok bagi usaha pada kesempatan berikutnya.'] },
      { heading: 'Periksa syarat penyelenggara', paragraphs: ['Cari informasi langsung dari penyelenggara mengenai seleksi, fasilitas, biaya, dan jadwal. Hasil satu acara tidak menjamin hasil yang sama pada acara lain.'] },
    ],
  },
  {
    slug: 'pendampingan-usaha-desa-kolega-2026', title: 'Pendampingan UMKM desa: dari produksi hingga mencari pasar',
    description: 'Program pendampingan usaha desa menyoroti pentingnya tata kelola dan akses pasar bagi kelompok usaha.',
    category: 'Wirausaha', date: '2026-11-02', image: '/images/articles/kualitas-kerja.webp', imageAlt: 'Ilustrasi orang berdiskusi tentang pengembangan usaha',
    source: { name: 'InfoSAWIT', url: 'https://www.infosawit.com/2026/11/02/kolega-dan-jalan-panjang-pengembangan-umkm-desa/', date: '2 November 2026' },
    sections: [
      { heading: 'Mengembangkan usaha bersama', paragraphs: ['InfoSAWIT memberitakan program KOLEGA Ekonomi Produktif dari Bumitama Gunajaya Agro untuk mendampingi kelompok usaha masyarakat di sekitar wilayah perusahaan.', 'Laporan tersebut menyoroti penguatan tata kelola dan akses pasar. Ini merupakan contoh program dari satu perusahaan, bukan gambaran hasil seluruh UMKM desa.'] },
      { heading: 'Bangun dasar usaha', paragraphs: ['Kelompok usaha dapat mulai dengan membagi tanggung jawab, mencatat pemasukan dan biaya, serta menyepakati cara mengambil keputusan. Catatan sederhana membantu anggota melihat kondisi usaha bersama.', 'Selain membuat produk, pelajari siapa calon pembeli, saluran penjualan, dan biaya pengiriman sebelum memperbesar produksi.'] },
      { heading: 'Nilai pendampingan secara utuh', paragraphs: ['Tanyakan lama pendampingan, materi, persyaratan, serta tanggung jawab tiap pihak. Ukur manfaat dengan kebutuhan dan tujuan kelompok sendiri.'] },
    ],
  },
  {
    slug: 'kompetensi-anak-muda-otomatisasi-industri-2026', title: 'Otomatisasi industri dan karier anak muda: menyiapkan keterampilan yang relevan',
    description: 'Wamenaker menyoroti keterampilan teknis dan kemampuan beradaptasi menghadapi perubahan industri.',
    category: 'Dunia kerja', date: '2026-11-02', image: '/images/articles/pasar-kerja.webp', imageAlt: 'Ilustrasi pekerja di kawasan perkotaan',
    source: { name: 'Analisapublik', url: 'https://analisapublik.id/wamenaker-ingatkan-generasi-muda-tingkatkan-kompetensi-hadapi-perubahan-industri/', date: '1 November 2026' },
    sections: [
      { heading: 'Kebutuhan kerja terus berubah', paragraphs: ['Analisapublik melaporkan pesan Wamenaker dalam Beyond Professional Youth Con pada 31 Oktober 2026 tentang pentingnya keterampilan teknis, adaptasi, dan teknologi di tengah otomatisasi.', 'Laporan juga menyinggung perlunya transfer pengetahuan serta persiapan pekerja lokal sebelum proyek industri mulai beroperasi.'] },
      { heading: 'Mulai dari peran yang diminati', paragraphs: ['Tidak semua pekerjaan membutuhkan keterampilan teknologi yang sama. Bandingkan beberapa deskripsi peran untuk menemukan kemampuan dasar yang sering diminta.', 'Buat proyek kecil atau ikuti praktik yang relevan, lalu catat proses dan hasil yang dapat dijelaskan kepada perekrut tanpa membagikan data rahasia.'] },
      { heading: 'Evaluasi pilihan belajar', paragraphs: ['Periksa kualitas materi, waktu, dan biaya pelatihan. Pilih yang sesuai dengan kebutuhanmu dan tinjau kembali rencana saat kebutuhan pekerjaan berubah.'] },
    ],
  },
  {
    slug: 'literasi-keuangan-keluarga-2026', title: 'Literasi keuangan: langkah awal mengelola penghasilan pekerja',
    description: 'Pemberitaan tentang literasi finansial mengingatkan pentingnya memahami pemasukan, pengeluaran, dan risiko.',
    category: 'Keuangan kerja', date: '2026-11-02', image: '/images/articles/gaji.webp', imageAlt: 'Ilustrasi seseorang memeriksa perhitungan keuangan',
    source: { name: 'Media Indonesia', url: 'https://mediaindonesia.com/ekonomi/950873/literasi-keuangan-indonesia-capai-6957-persen-edukasi-finansial-lintas-generasi-terus-diperluas', date: '31 Oktober 2026' },
    sections: [
      { heading: 'Belajar mengelola uang', paragraphs: ['Media Indonesia pada 31 Oktober 2026 melaporkan kegiatan edukasi finansial lintas generasi yang diselenggarakan QM Financial.', 'Kebutuhan keuangan setiap pekerja berbeda. Jumlah penghasilan, tanggungan, dan kestabilan pekerjaan perlu dipertimbangkan saat menyusun rencana.'] },
      { heading: 'Mulai dari catatan sederhana', paragraphs: ['Catat penghasilan yang diterima serta pengeluaran rutin dan tidak rutin. Gunakan catatan itu untuk mengenali kewajiban, kebutuhan sehari-hari, dan ruang menabung jika tersedia.', 'Sebelum menggunakan produk keuangan, pahami biaya, risiko, dan ketentuan penyedia. Jangan mengambil keputusan hanya berdasarkan janji hasil tinggi.'] },
      { heading: 'Tinjau secara berkala', paragraphs: ['Periksa kembali rencana ketika pendapatan atau kebutuhan berubah. Untuk keputusan penting, pertimbangkan mencari bantuan dari pihak yang kompeten dan resmi.'] },
    ],
  },
  {
    slug: 'karier-digital-mahasiswa-usu-linknet-2026', title: 'Mahasiswa USU dan industri: memperluas wawasan karier digital',
    description: 'Kegiatan di Deli Serdang menghubungkan mahasiswa dengan pembahasan teknologi, bisnis, dan pengembangan talenta.',
    category: 'Awal karier', date: '2026-11-02', image: '/images/articles/magang.webp', imageAlt: 'Ilustrasi mahasiswa belajar bersama',
    source: { name: 'Lentera Kalimantan', url: 'https://lenterakalimantan.net/tanam-10-ribu-pohon-di-usu-linknet-perluas-jaringan-bisnis-berbasis-pelestarian-lingkungan/', date: '1 November 2026' },
    sections: [
      { heading: 'Pertemuan kampus dan industri', paragraphs: ['Lentera Kalimantan melaporkan kegiatan Link Net bersama mitra dan mahasiswa USU di Deli Serdang pada 29 Oktober 2026. Selain penanaman pohon, kegiatan itu dikaitkan dengan wawasan karier dan pengembangan talenta digital.', 'Paparan praktisi dapat membantu mahasiswa memahami hubungan antara teknologi, bisnis, dan orang yang menjalankan pekerjaan tersebut.'] },
      { heading: 'Manfaatkan kesempatan bertanya', paragraphs: ['Saat mengikuti acara industri, tanyakan contoh tugas sehari-hari, keterampilan awal, dan cara memperoleh pengalaman. Catat jawaban yang relevan untuk dibandingkan dengan sumber lain.', 'Setelah acara, pilih satu kemampuan untuk dipelajari dan buat contoh sederhana yang menunjukkan proses belajarmu.'] },
      { heading: 'Perluas sumber informasi', paragraphs: ['Satu sesi tidak mewakili seluruh sektor. Jelajahi kegiatan kampus, komunitas, dan kanal perusahaan lain untuk mendapatkan pandangan yang lebih beragam.'] },
    ],
  },
  {
    slug: 'kompetensi-sdm-pegadaian-perubahan-bisnis-2026', title: 'Kompetensi pekerja di industri jasa keuangan yang terus berubah',
    description: 'Pemberitaan tentang pekerja Pegadaian menyoroti pengembangan kemampuan dan kolaborasi dalam perubahan bisnis.',
    category: 'Dunia kerja', date: '2026-11-02', image: '/images/articles/kualitas-kerja.webp', imageAlt: 'Ilustrasi rekan kerja berbincang',
    source: { name: 'Bisnis.com', url: 'https://entrepreneur.bisnis.com/read/20261101/52/2017480/peran-pekerja-dalam-mendukung-kemajuan-bisnis-perusahaan', date: '1 November 2026' },
    sections: [
      { heading: 'Pekerja menghadapi perubahan', paragraphs: ['Bisnis.com memberitakan pentingnya kompetensi, profesionalisme, dan produktivitas pekerja dalam perubahan industri jasa keuangan, dengan pembahasan mengenai Pegadaian.', 'Kebutuhan belajar dapat berbeda antara layanan pelanggan, operasional, dan peran teknologi. Perhatikan tugas sebenarnya saat menilai peluang di sektor ini.'] },
      { heading: 'Kenali dukungan yang tersedia', paragraphs: ['Tanyakan pelatihan awal, cara evaluasi kinerja, dan kesempatan belajar ketika tanggung jawab berubah. Masukan rutin dapat membantu pekerja memahami harapan tim.', 'Kemampuan berkomunikasi dan menjaga kerahasiaan informasi juga relevan untuk banyak peran yang berhubungan dengan pelanggan.'] },
      { heading: 'Bandingkan pengalaman', paragraphs: ['Gunakan pemberitaan sebagai satu sudut pandang dan bandingkan dengan informasi terbaru serta pengalaman pekerja dari beberapa sumber.'] },
    ],
  },
  {
    slug: 'keterampilan-layanan-pelanggan-teknologi-2026', title: 'Layanan pelanggan di perusahaan teknologi: memahami kebutuhan bisnis',
    description: 'Hubungan dengan pelanggan korporasi memerlukan pemahaman masalah dan tindak lanjut yang jelas.',
    category: 'Keterampilan', date: '2026-11-02', image: '/images/articles/lowongan.webp', imageAlt: 'Ilustrasi pekerja menggunakan laptop',
    source: { name: 'Media Indonesia', url: 'https://mediaindonesia.com/ekonomi/950917/customer-engagement-jadi-strategi-baru-perusahaan-teknologi-', date: '1 November 2026' },
    sections: [
      { heading: 'Hubungan yang berlanjut setelah penjualan', paragraphs: ['Media Indonesia pada 1 November 2026 memberitakan customer engagement dalam layanan teknologi untuk pelanggan korporasi.', 'Bagi pekerja layanan, mengenali kebutuhan pelanggan dan menyampaikan tindak lanjut dengan jelas dapat membantu kerja sama antartim. Rincian tanggung jawab bergantung pada perusahaan dan posisi.'] },
      { heading: 'Latih komunikasi dan pencatatan', paragraphs: ['Biasakan merangkum masalah, mengonfirmasi pemahaman, dan mencatat tindak lanjut beserta waktu yang disepakati. Untuk masalah teknis, ketahui kapan harus meminta bantuan tim yang berwenang.', 'Gunakan informasi pelanggan sesuai kebijakan tempat kerja dan hindari membagikan data tanpa izin.'] },
      { heading: 'Saat menilai lowongan', paragraphs: ['Tanyakan jenis pelanggan, ukuran keberhasilan, pola kerja, dan pelatihan produk. Hal ini membantu memahami apakah peran sesuai dengan pengalaman dan minatmu.'] },
    ],
  },
  {
    slug: 'transformasi-karier-anak-muda-wamenaker-2026', title: 'Menyiapkan karier saat jenis pekerjaan berubah',
    description: 'Pesan Wamenaker tentang perubahan profesi mengajak pekerja muda meninjau keterampilan yang dapat dipindahkan.',
    category: 'Pengembangan karier', date: '2026-11-02', image: '/images/articles/pasar-kerja.webp', imageAlt: 'Ilustrasi pekerja memulai aktivitas di kota',
    source: { name: 'MCI News', url: 'https://mcinews.id/2026/11/01/wamenaker-dorong-generasi-muda-tingkatkan-kompetensi-hadapi-perubahan-dunia-kerja/', date: '1 November 2026' },
    sections: [
      { heading: 'Melihat kemampuan di balik jabatan', paragraphs: ['MCI News melaporkan pembahasan Wamenaker pada Beyond Professional Youth Con 2026 mengenai perubahan dunia kerja dan pengembangan kompetensi generasi muda.', 'Laporan tersebut juga menyebut layanan Kemnaker seperti pelatihan vokasi, pemagangan, informasi kerja, dan sertifikasi. Ketersediaan serta syaratnya perlu diperiksa pada kanal resmi.'] },
      { heading: 'Petakan pengalaman yang bisa digunakan kembali', paragraphs: ['Tuliskan tugas yang pernah dikerjakan dan kemampuan yang digunakan, misalnya mengelola jadwal, melayani pelanggan, atau memecahkan masalah. Bandingkan dengan persyaratan peran lain yang diminati.', 'Jika ada kesenjangan, pilih latihan atau pengalaman yang paling relevan. Perubahan karier dapat memerlukan waktu dan penyesuaian keuangan.'] },
      { heading: 'Periksa peluang secara realistis', paragraphs: ['Cari informasi tentang jenis kontrak, penghasilan, lokasi, dan jalur masuk sebelum berpindah. Bicara dengan orang yang memahami bidang tujuan dapat membantu memperjelas pilihan.'] },
    ],
  },
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

// Practical editorial takeaways connect each cited report to decisions readers
// can make when comparing jobs, employers, or training opportunities.
const practicalNotes: Record<string, { heading: string; paragraphs: string[] }> = {
  'ai-perusahaan-kesiapan-data-talenta-2026': { heading: 'Checklist KerjaGimana: menilai pekerjaan yang memakai AI', paragraphs: ['Saat wawancara, tanyakan alat AI apa yang dipakai tim, tugas mana yang dibantu, bagaimana hasilnya diperiksa, dan apakah ada pelatihan. Jawaban konkret membantu membedakan penggunaan yang sudah berjalan dari rencana umum.', 'Untuk portofolio, tunjukkan masalah, proses, dan cara kamu memeriksa hasil. Hapus data klien atau perusahaan sebelum membagikan contoh kerja.'] },
  'santri-matic-keterampilan-kreator-solo-2026': { heading: 'Latihan praktis: buat satu contoh konten', paragraphs: ['Pilih produk lokal, tentukan siapa calon pembacanya, lalu buat naskah singkat yang menjelaskan manfaat tanpa klaim yang tidak terbukti. Minta umpan balik dan revisi sebelum memasukkannya ke portofolio.', 'Catat peranmu sendiri dan alat yang digunakan. Jangan menyiratkan bahwa hasil latihan merupakan kampanye resmi sebuah merek.'] },
  'pelatihan-pramuwisata-manggarai-barat-2026': { heading: 'Persiapan karier: buktikan kemampuan layanan', paragraphs: ['Latih penjelasan destinasi selama dua menit, susun rute sederhana, dan minta teman memberi umpan balik tentang kejelasan serta ketepatan informasi.', 'Saat mencari pelatihan atau kerja, tanyakan praktik lapangan, bahasa yang dibutuhkan, jadwal, perlindungan kerja, dan apakah ada sertifikat yang diakui.'] },
  'pelatihan-pertolongan-pertama-karyawan-2026': { heading: 'Checklist pekerja: kenali kesiapan darurat', paragraphs: ['Tanyakan lokasi kotak P3K, petugas yang bertugas, nomor bantuan, dan prosedur pelaporan insiden pada orientasi kerja. Pastikan informasi itu tersedia saat pergantian sif.', 'Gunakan pelatihan dari penyelenggara yang kompeten. Artikel ini bukan panduan medis untuk menggantikan instruksi tenaga kesehatan.'] },
  'pelatihan-vokasi-korban-phk-sidoarjo-2026': { heading: 'Langkah setelah PHK: pilih pelatihan dengan tujuan jelas', paragraphs: ['Tuliskan dua atau tiga jenis pekerjaan yang ingin dituju. Cocokkan isi pelatihan dengan tugas pekerjaan, lalu verifikasi biaya, persyaratan, jadwal, dan penyelenggara melalui Disnaker.', 'Simpan bukti pendaftaran dan jangan membayar perantara yang menjanjikan kelulusan. Pendaftaran yang diberitakan memiliki batas waktu; cek apakah masih tersedia.'] },
  'job-fair-inklusif-jatim-november-2026': { heading: 'Checklist job fair: siapkan lamaran yang mudah ditindaklanjuti', paragraphs: ['Buat CV PDF dengan nama berkas yang jelas, siapkan ringkasan perkenalan, dan catat posisi serta kontak resmi perusahaan yang kamu temui.', 'Kegiatan yang dirujuk sudah berlangsung pada 31 Oktober–2 November 2026. Gunakan laman resmi penyelenggara untuk menemukan agenda berikutnya dan konfirmasi lowongan langsung kepada perusahaan.'] },
  'umkm-mandalika-event-besar-2026': { heading: 'Hitung hasil usaha, bukan hanya omzet acara', paragraphs: ['Catat omzet, biaya bahan, transportasi, sewa, tenaga, dan stok tersisa secara terpisah. Perhitungan sederhana ini menunjukkan apakah ikut acara memberi hasil yang layak bagi usahamu.', 'Sebelum mendaftar acara berikutnya, tanyakan biaya partisipasi, fasilitas, aturan produk, dan metode pembayaran. Angka transaksi agregat tidak memprediksi pendapatan tiap peserta.'] },
  'pendampingan-usaha-desa-kolega-2026': { heading: 'Langkah praktis untuk kelompok usaha', paragraphs: ['Mulai dengan satu catatan bersama yang memuat pesanan, biaya, stok, dan pembagian tugas. Tinjau catatan secara berkala agar anggota punya gambaran usaha yang sama.', 'Saat menerima pendampingan, sepakati tujuan, jadwal evaluasi, akses terhadap data usaha, dan apa yang terjadi setelah program berakhir.'] },
  'kompetensi-anak-muda-otomatisasi-industri-2026': { heading: 'Peta keterampilan: pilih satu kemampuan untuk dibuktikan', paragraphs: ['Ambil beberapa lowongan pada bidang yang sama dan tandai kemampuan yang sering muncul. Pilih satu yang realistis dipelajari, lalu buat contoh hasil kerja atau cari pengalaman praktik.', 'Saat wawancara, minta contoh bagaimana teknologi mengubah tugas harian dan dukungan belajar yang diberikan kepada pekerja.'] },
  'literasi-keuangan-keluarga-2026': { heading: 'Latihan KerjaGimana: hitung penghasilan bersih', paragraphs: ['Bandingkan tawaran dengan memisahkan gaji pokok, tunjangan tetap, bonus bersyarat, potongan, dan biaya perjalanan. Periksa periode pembayaran dan ketentuan tertulis.', 'Buat anggaran berdasarkan uang yang benar-benar diterima. Data literasi nasional menggambarkan populasi, bukan kondisi keuangan setiap individu.'] },
  'karier-digital-mahasiswa-usu-linknet-2026': { heading: 'Gunakan acara kampus untuk membuka percakapan karier', paragraphs: ['Siapkan pertanyaan spesifik tentang pekerjaan awal, keterampilan yang dinilai saat seleksi, dan contoh portofolio. Setelah acara, catat jawaban dan tindak lanjut yang kamu pelajari.', 'Satu kegiatan perusahaan di kampus bukan jalur rekrutmen otomatis. Cari lowongan dan program magang terpisah melalui kanal resmi.'] },
  'kompetensi-sdm-pegadaian-perubahan-bisnis-2026': { heading: 'Pertanyaan saat melamar ke jasa keuangan', paragraphs: ['Tanyakan pelatihan produk, standar layanan, perlindungan data pelanggan, ukuran kinerja, dan jalur pengembangan di posisi yang ditawarkan.', 'Bandingkan jawaban dengan deskripsi kerja dan informasi dari pekerja lain. Klaim umum tentang budaya perusahaan perlu dicocokkan dengan pengalaman di tim dan lokasi yang dituju.'] },
  'keterampilan-layanan-pelanggan-teknologi-2026': { heading: 'Contoh latihan: rangkum kebutuhan pelanggan', paragraphs: ['Latih format singkat: masalah yang disampaikan, dampaknya, informasi yang masih perlu dikonfirmasi, dan langkah berikutnya beserta waktu tindak lanjut.', 'Saat melamar, cari tahu kanal dukungan, target respons, pola eskalasi, dan apakah peran berfokus pada layanan teknis atau hubungan pelanggan.'] },
  'transformasi-karier-anak-muda-wamenaker-2026': { heading: 'Peta pindah karier dalam tiga langkah', paragraphs: ['Pilih peran tujuan, cocokkan tugasnya dengan pengalaman yang sudah dimiliki, lalu catat satu kesenjangan keterampilan yang perlu ditutup.', 'Uji minat melalui proyek kecil, percakapan dengan praktisi, atau pelatihan terjangkau sebelum mengambil keputusan besar seperti berhenti kerja atau membayar program mahal.'] },
  'kerja-inklusif-disabilitas-batang-2026': { heading: 'Checklist pencari kerja: tanyakan akses dan penyesuaian', paragraphs: ['Cari tahu akses menuju tempat kerja, proses seleksi, bentuk penyesuaian yang dapat diminta, dan cara menyampaikan kebutuhan secara aman kepada perekrut.', 'Nilai pengalaman inklusif dari praktik dan dukungan sehari-hari, bukan hanya jumlah pekerja atau pernyataan perusahaan.'] },
  'sertifikasi-pekerja-sosial-koordinasi-2026': { heading: 'Persiapan sertifikasi: rapikan bukti kompetensi', paragraphs: ['Kumpulkan riwayat pendidikan, pelatihan, dan contoh tugas yang boleh dibagikan. Cocokkan pengalaman dengan unit kompetensi pada skema sertifikasi resmi.', 'Tanyakan jadwal, biaya, metode asesmen, dan lembaga sertifikasi berwenang. Koordinasi yang diberitakan belum berarti pendaftaran sertifikasi telah dibuka.'] },
  'kompetisi-teknisi-pompa-layanan-purnajual-2026': { heading: 'Bekal teknisi: gabungkan ketelitian dan komunikasi', paragraphs: ['Saat latihan, catat langkah pemeriksaan, risiko keselamatan, dan alasan memilih solusi. Jelaskan temuan kepada pelanggan tanpa menjanjikan hal yang belum bisa dipastikan.', 'Tanyakan apakah pemberi kerja menyediakan pelatihan produk, alat pelindung, supervisi teknis, dan prosedur layanan purnajual.'] },
  'kesehatan-pekerja-terminal-logistik-2026': { heading: 'Pertanyaan sebelum menerima pekerjaan logistik', paragraphs: ['Minta penjelasan tentang orientasi keselamatan, alat pelindung, pola sif dan istirahat, pelaporan kondisi berbahaya, serta penanganan keadaan darurat.', 'Catat jawaban dan cocokkan dengan kontrak serta kondisi kerja yang dijelaskan pekerja di lokasi terkait.'] },
  'kompetensi-digital-pengalaman-kerja-lulusan-2026': { heading: 'Latihan lulusan: ubah pengalaman menjadi bukti', paragraphs: ['Pilih tugas kuliah atau organisasi, jelaskan tujuan, kontribusi pribadi, alat yang dipakai, dan hasilnya. Gunakan angka hanya jika bisa dipertanggungjawabkan.', 'Cocokkan contoh itu dengan persyaratan lowongan. Jika memakai AI untuk membantu, verifikasi fakta dan jangan mengklaim keluaran alat sebagai pekerjaan yang sepenuhnya kamu lakukan sendiri.'] },
  'pasar-kerja-indonesia-2026-angka-pengangguran': { heading: 'Cara memakai data pasar kerja untuk keputusan pribadi', paragraphs: ['Angka nasional memberi konteks, tetapi tidak menjawab peluang di kota atau jabatan tertentu. Bandingkan beberapa lowongan aktual pada bidang dan wilayah yang kamu incar.', 'Catat pola syarat dan kisaran upah yang diumumkan, lalu gunakan untuk menyusun target belajar dan lamaran. Hindari menarik kesimpulan tentang peluang pribadi dari satu indikator saja.'] },
  'lowongan-karirhub-september-2026': { heading: 'Cara memeriksa lowongan sebelum mengirim data', paragraphs: ['Buka kembali lowongan di kanal resmi, periksa nama perusahaan, lokasi, tanggal penutupan, dan kecocokan tugas. Pastikan alamat pengiriman lamaran benar-benar milik perusahaan atau platform resmi.', 'Jangan membayar biaya seleksi atau membagikan kode OTP. Simpan daftar lamaran agar bisa menindaklanjuti secara teratur.'] },
  'rata-rata-upah-buruh-indonesia-2026': { heading: 'Bandingkan tawaran dengan komponen yang setara', paragraphs: ['Catat gaji bruto, potongan, tunjangan, bonus bersyarat, jam kerja, dan biaya perjalanan. Bandingkan dengan peran dan wilayah yang serupa, bukan hanya rata-rata nasional.', 'Minta rincian tertulis sebelum menerima tawaran. Jika ada komponen yang belum jelas, tanyakan kapan dibayar dan syarat untuk menerimanya.'] },
  'maganghub-2026-persiapan-lulusan': { heading: 'Sebelum mengambil magang, periksa pengalaman belajarnya', paragraphs: ['Tanyakan tugas mingguan, nama atau peran pembimbing, umpan balik, jam kerja, lokasi, dan kompensasi sesuai ketentuan program.', 'Tetapkan dua atau tiga keterampilan yang ingin dipelajari dan catat hasil kerja yang boleh dimasukkan ke portofolio tanpa membuka informasi rahasia.'] },
  'jaminan-kehilangan-pekerjaan-2026': { heading: 'Langkah awal setelah kehilangan pekerjaan', paragraphs: ['Periksa status kepesertaan dan persyaratan JKP langsung pada BPJS Ketenagakerjaan atau Kemnaker. Siapkan dokumen yang diminta melalui kanal resmi.', 'Susun anggaran sementara dan jadwalkan waktu untuk administrasi, pencarian kerja, serta pemulihan. Jangan membagikan data akun kepada pihak yang menjanjikan pencairan pasti.'] },
  'kualitas-pekerjaan-indonesia-2026': { heading: 'Checklist menilai mutu sebuah pekerjaan', paragraphs: ['Catat jenis kontrak, penghasilan bersih, jam kerja, pola lembur, keselamatan, dukungan atasan, dan kesempatan belajar. Tandai mana yang menjadi prioritasmu.', 'Gunakan pertanyaan yang sama saat membandingkan beberapa perusahaan supaya keputusan tidak hanya bergantung pada kesan saat wawancara.'] },
}

for (const article of articles) {
  const note = practicalNotes[article.slug]
  if (note) article.sections.push(note)
}

export const formatArticleDate = (date: string) => new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`))
