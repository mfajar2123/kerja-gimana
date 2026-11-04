import { articleDeepDives } from './article-deep-dives'
import { articleSeo } from './article-seo'
import { extraArticles } from './extra-articles'

export interface ArticleFigure {
  src: string
  alt: string
  caption: string
}

export interface ArticleSection {
  heading: string
  paragraphs: string[]
  bullets?: string[]
  figure?: ArticleFigure
}

export interface ArticleContributor {
  name: string
  role: string
}

export interface Article {
  slug: string
  title: string
  description: string
  category: string
  date: string
  image: string
  imageAlt: string
  source: { name: string; url: string; date: string }
  sections: ArticleSection[]
  author?: ArticleContributor
  reviewer?: ArticleContributor
  reviewedAt?: string
  keywords?: string[]
}

export type ArticleSummary = Pick<Article, 'slug' | 'title' | 'description' | 'category' | 'date' | 'image' | 'imageAlt'>
export interface ArticleDirectoryResult {
  articles: ArticleSummary[]
  categories: string[]
  total: number
  page: number
  pageSize: number
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
  {
    slug: 'cv-lulusan-baru-tanpa-pengalaman', title: 'Cara menyusun CV lulusan baru meski belum punya pengalaman kerja',
    description: 'Pengalaman organisasi, proyek, dan tugas kuliah dapat membantu menunjukkan kemampuan. Susun CV dengan bukti yang relevan dan mudah dibaca.',
    category: 'Cari kerja', date: '2026-11-02', image: '/images/articles/lowongan.webp', imageAlt: 'Ilustrasi pencari kerja menyiapkan dokumen lamaran',
    source: { name: 'Pusat Pasar Kerja Kemnaker', url: 'https://e-training.kemnaker.go.id/belajarmandiri/modul/425/2986', date: 'Diakses 2 November 2026' },
    sections: [
      { heading: 'Pilih pengalaman yang menunjukkan kemampuan', paragraphs: ['CV lulusan baru tidak harus berisi riwayat kerja formal. Pilih proyek kuliah, organisasi, kegiatan sukarela, atau pekerjaan lepas yang berhubungan dengan posisi tujuan. Jelaskan kontribusi pribadi, alat atau metode yang digunakan, serta hasil yang benar-benar dapat kamu buktikan.', 'Hindari mengisi ruang dengan daftar panjang mata kuliah atau keterampilan yang belum pernah dipakai. Dua contoh yang jelas biasanya lebih membantu perekrut memahami cara kerjamu daripada banyak klaim umum.'] },
      { heading: 'Susun informasi dalam urutan yang mudah dipindai', paragraphs: ['Cantumkan nama dan kontak aktif, ringkasan singkat, pendidikan, pengalaman atau proyek, lalu keterampilan yang relevan. Gunakan judul bagian yang lazim dan format tanggal yang konsisten. Simpan sebagai PDF kecuali perusahaan meminta format lain.', 'Periksa ejaan, tautan portofolio, dan nama berkas. Buka PDF di ponsel untuk memastikan teks masih terbaca dan tidak terpotong.'] },
      { heading: 'Sesuaikan dengan setiap posisi', paragraphs: ['Bandingkan CV dengan tanggung jawab dan kualifikasi di iklan kerja. Tampilkan bukti yang paling dekat dengan kebutuhan posisi tanpa menyalin seluruh kalimat lowongan atau mengaku menguasai hal yang belum kamu kuasai.', 'Materi pelatihan pencari kerja Kemnaker juga membahas CV, surat lamaran, dan persiapan wawancara. Gunakan panduan sebagai bahan belajar, lalu sesuaikan dengan instruksi perusahaan.'] },
    ],
  },
  {
    slug: 'surat-lamaran-kerja-personal', title: 'Surat lamaran kerja yang singkat, spesifik, dan tidak terasa seperti templat',
    description: 'Pelajari cara menghubungkan kebutuhan posisi dengan pengalamanmu dalam surat pengantar yang ringkas dan jujur.',
    category: 'Cari kerja', date: '2026-11-02', image: '/images/articles/lowongan.webp', imageAlt: 'Ilustrasi seseorang menulis surat lamaran kerja',
    source: { name: 'Pusat Pasar Kerja Kemnaker', url: 'https://e-training.kemnaker.go.id/belajarmandiri/modul/425/2986', date: 'Diakses 2 November 2026' },
    sections: [
      { heading: 'Mulai dari alasan yang relevan', paragraphs: ['Sebut posisi yang dilamar dan satu alasan konkret mengapa pengalamanmu berkaitan. Hindari pembuka yang hanya menyatakan bahwa kamu pekerja keras atau sangat membutuhkan pekerjaan; perekrut lebih terbantu oleh contoh yang bisa diperiksa.', 'Jika nama perekrut tersedia di kanal resmi, gunakan dengan tepat. Jika tidak, sapaan umum yang sopan lebih baik daripada menebak nama atau jabatan.'] },
      { heading: 'Tunjukkan kecocokan lewat satu atau dua bukti', paragraphs: ['Pilih contoh proyek, hasil kerja, atau tanggung jawab yang selaras dengan tugas posisi. Terangkan secara singkat peranmu dan hasilnya. Jangan mengulang seluruh isi CV; surat pengantar memberi konteks mengapa pengalaman tertentu penting.', 'Gunakan angka hanya jika sumbernya jelas dan kontribusimu dapat dijelaskan. Untuk kerja tim, bedakan hasil tim dari pekerjaan yang kamu tangani sendiri.'] },
      { heading: 'Tutup dengan langkah berikutnya', paragraphs: ['Nyatakan dokumen yang dilampirkan dan kesediaan mengikuti proses seleksi. Jaga surat tetap ringkas, periksa nama perusahaan, jabatan, serta alamat email sebelum mengirim.', 'Kemnaker menyediakan materi belajar mandiri tentang surat lamaran dan persiapan wawancara. Ikuti juga format atau pertanyaan khusus yang diminta pemberi kerja.'] },
    ],
  },
  {
    slug: 'persiapan-wawancara-kerja-metode-star', title: 'Persiapan wawancara kerja: menjawab pertanyaan dengan contoh yang jelas',
    description: 'Gunakan pengalaman nyata untuk menjelaskan cara berpikir, mengambil tindakan, dan belajar dari tantangan saat wawancara.',
    category: 'Wawancara', date: '2026-11-02', image: '/images/articles/magang.webp', imageAlt: 'Ilustrasi kandidat mengikuti wawancara kerja',
    source: { name: 'Pusat Pasar Kerja Kemnaker', url: 'https://paskerid.kemnaker.go.id/news/107', date: 'Diakses 2 November 2026' },
    sections: [
      { heading: 'Siapkan cerita, bukan jawaban hafalan', paragraphs: ['Pilih tiga pengalaman yang menunjukkan pemecahan masalah, kerja sama, dan belajar dari kesalahan. Untuk tiap cerita, ingat situasi, tanggung jawabmu, tindakan yang dilakukan, dan hasil atau pelajarannya.', 'Struktur ini membantu jawaban tetap runtut, tetapi sampaikan dengan bahasa sendiri. Jangan menghafal naskah panjang karena pertanyaan lanjutan dapat mengubah arah percakapan.'] },
      { heading: 'Latih jawaban yang spesifik dan jujur', paragraphs: ['Pilih contoh yang sesuai dengan pertanyaan dan jelaskan bagian yang kamu kerjakan. Jika hasilnya belum ideal, terangkan apa yang kamu pelajari dan apa yang akan dilakukan berbeda. Hindari membuka informasi rahasia dari tempat kerja sebelumnya.', 'Minta teman mendengarkan jawabanmu dan menilai apakah inti ceritanya mudah dipahami. Latihan singkat membantu menemukan bagian yang terlalu umum atau berputar-putar.'] },
      { heading: 'Siapkan pertanyaan untuk perekrut', paragraphs: ['Tanyakan prioritas tiga bulan pertama, cara tim bekerja, ukuran keberhasilan, dan tahapan seleksi berikutnya. Pilih pertanyaan yang belum terjawab di deskripsi posisi.', 'Pusat Pasar Kerja Kemnaker menyarankan kandidat menyiapkan diri dan menghindari jawaban hasil salin-tempel. Sesuaikan penampilan dan cara komunikasi dengan konteks wawancara.'] },
    ],
  },
  {
    slug: 'riset-perusahaan-sebelum-melamar', title: 'Riset perusahaan sebelum melamar: sumber yang perlu dibandingkan',
    description: 'Periksa identitas pemberi kerja, tugas posisi, dan kanal rekrutmen agar keputusan melamar lebih terarah.',
    category: 'Cari kerja', date: '2026-11-02', image: '/images/articles/lowongan.webp', imageAlt: 'Ilustrasi pencari kerja menelusuri informasi perusahaan',
    source: { name: 'Pusat Pasar Kerja Kemnaker', url: 'https://e-training.kemnaker.go.id/belajarmandiri/modul/425/2986', date: 'Diakses 2 November 2026' },
    sections: [
      { heading: 'Mulai dari kanal resmi', paragraphs: ['Cari situs perusahaan dan halaman kariernya. Cocokkan nama badan usaha, alamat email, lokasi, dan uraian posisi dengan informasi pada iklan. Periksa apakah akun yang menghubungi kamu benar-benar terhubung dengan perusahaan.', 'Pemberi kerja bisa memakai perusahaan perekrutan, sehingga nama pengirim berbeda. Dalam hal itu, tanyakan hubungan pihak tersebut dengan posisi dan minta kanal resmi untuk mengonfirmasi.'] },
      { heading: 'Bandingkan isi pekerjaan, bukan hanya judul', paragraphs: ['Baca tanggung jawab, kualifikasi, jam kerja, lokasi, jenis kontrak, dan proses seleksi. Judul yang sama dapat berarti pekerjaan berbeda di organisasi yang berbeda.', 'Cari beberapa sumber untuk memahami produk atau layanan serta perubahan terbaru. Bedakan informasi perusahaan dari ulasan pribadi dan periksa tanggal publikasinya.'] },
      { heading: 'Simpan catatan sederhana', paragraphs: ['Catat tautan lowongan, tanggal ditemukan, kontak, batas lamaran, dan pertanyaan yang ingin diajukan. Catatan ini mencegah tertukar ketika melamar beberapa posisi.', 'Materi pelatihan Kemnaker memasukkan identifikasi profil perusahaan sebagai bagian dari persiapan pencari kerja. Gunakan langkah ini untuk membuat lamaran lebih sesuai dan menjaga data pribadimu.'] },
    ],
  },
  {
    slug: 'mengenali-lowongan-kerja-palsu', title: 'Cara mengenali lowongan kerja yang patut diperiksa ulang',
    description: 'Tanda janggal, permintaan data, dan biaya seleksi yang perlu diperiksa sebelum pencari kerja melanjutkan proses.',
    category: 'Keamanan kerja', date: '2026-11-02', image: '/images/articles/perlindungan.webp', imageAlt: 'Ilustrasi pencari kerja memeriksa pesan lowongan',
    source: { name: 'Pusat Pasar Kerja Kemnaker', url: 'https://paskerid.kemnaker.go.id/', date: 'Diakses 2 November 2026' },
    sections: [
      { heading: 'Periksa identitas dan alamat kontak', paragraphs: ['Waspadai pesan yang memakai nama perusahaan tanpa alamat email atau kanal yang dapat diverifikasi. Cocokkan lowongan di situs karier resmi dan hubungi perusahaan melalui kontak yang ditemukan secara mandiri, bukan hanya nomor di pesan tersebut.', 'Perhatikan ketidaksesuaian nama, lokasi, jabatan, dan isi tugas. Kesalahan kecil tidak otomatis membuktikan penipuan, tetapi menjadi alasan untuk berhenti sejenak dan memeriksa.'] },
      { heading: 'Jaga dokumen dan akun pribadi', paragraphs: ['Jangan membagikan kata sandi, kode OTP, PIN, atau akses akun. Kirim dokumen identitas hanya jika prosesnya terverifikasi dan memang diperlukan; tanyakan tujuan, penyimpanan, serta penerima data.', 'Hindari mengunggah informasi sensitif ke tautan yang tidak dikenal. Jika ragu, minta penjelasan lewat kanal resmi dan jangan terburu-buru karena tekanan tenggat yang tidak wajar.'] },
      { heading: 'Jangan membayar untuk menjamin kelulusan', paragraphs: ['Permintaan transfer untuk biaya seleksi, seragam, atau pelatihan perlu diperiksa langsung kepada perusahaan. Jangan mengirim uang ke rekening pribadi hanya karena dijanjikan penggantian atau kepastian diterima.', 'Simpan iklan dan percakapan bila ingin melaporkan dugaan penyalahgunaan. Portal Pasker ID menyediakan informasi pasar kerja dan layanan Kemnaker; pastikan selalu membuka alamat situs resminya.'] },
    ],
  },
  {
    slug: 'portofolio-kerja-pemula', title: 'Membuat portofolio kerja untuk pemula dengan proyek yang sederhana',
    description: 'Portofolio tidak harus berisi klien besar. Tunjukkan cara berpikir, proses, dan hasil dari contoh kerja yang aman dibagikan.',
    category: 'Pengembangan karier', date: '2026-11-02', image: '/images/articles/magang.webp', imageAlt: 'Ilustrasi pekerja muda menyusun contoh karya',
    source: { name: 'Pusat Pasar Kerja Kemnaker', url: 'https://e-training.kemnaker.go.id/belajarmandiri/modul/425/2986', date: 'Diakses 2 November 2026' },
    sections: [
      { heading: 'Pilih bentuk sesuai jenis pekerjaan', paragraphs: ['Portofolio dapat berupa tulisan, desain, kode, laporan analisis, dokumentasi proyek, atau contoh layanan. Pilih sedikit karya yang paling dekat dengan pekerjaan tujuan daripada memasukkan semua tugas yang pernah dibuat.', 'Jika belum punya karya dari klien, buat proyek mandiri dengan batasan yang jelas. Terangkan bahwa proyek itu simulasi atau latihan, bukan hasil kerja perusahaan.'] },
      { heading: 'Jelaskan proses di balik hasil', paragraphs: ['Untuk setiap contoh, tulis tujuan, peranmu, langkah yang diambil, alat yang digunakan, dan apa yang akan diperbaiki. Konteks ini membantu pembaca menilai kontribusi dan keputusanmu, bukan hanya tampilan akhir.', 'Gunakan bahasa yang bisa dipahami perekrut nonteknis. Jika hasil kerja tim, sebutkan bagian yang kamu tangani dan kontribusi anggota lain secara adil.'] },
      { heading: 'Perhatikan izin dan privasi', paragraphs: ['Hapus data pelanggan, informasi internal, serta detail yang dapat mengidentifikasi seseorang tanpa izin. Minta persetujuan sebelum membagikan hasil kerja dari perusahaan atau organisasi.', 'Beri nama berkas yang jelas, sediakan tautan yang bisa dibuka, dan uji tampilannya di ponsel. Materi pencarian kerja Kemnaker dapat melengkapi portofolio dengan CV dan persiapan wawancara.'] },
    ],
  },
  {
    slug: 'memilih-pelatihan-kerja-yang-tepat', title: 'Cara memilih pelatihan kerja yang sesuai dengan tujuan karier',
    description: 'Bandingkan kompetensi, metode praktik, biaya, dan pengakuan program sebelum mendaftar pelatihan.',
    category: 'Keterampilan', date: '2026-11-02', image: '/images/articles/magang.webp', imageAlt: 'Ilustrasi peserta mengikuti pelatihan keterampilan',
    source: { name: 'Kementerian Ketenagakerjaan', url: 'https://e-training.kemnaker.go.id/belajarmandiri/modul/425/2986', date: 'Diakses 2 November 2026' },
    sections: [
      { heading: 'Mulai dari pekerjaan yang dituju', paragraphs: ['Tentukan dua atau tiga jenis posisi yang ingin dicoba. Bandingkan iklannya untuk melihat keterampilan yang sering diminta, lalu pilih satu kesenjangan yang realistis ditutup melalui pelatihan.', 'Jangan memilih program hanya karena judulnya sedang populer. Pastikan materinya membantu melakukan tugas nyata yang relevan dengan rencana kerjamu.'] },
      { heading: 'Periksa isi dan cara belajar', paragraphs: ['Baca silabus, durasi, prasyarat, jenis praktik, umpan balik, dan hasil akhir yang akan dibuat. Tanyakan siapa pengajar atau pendampingnya serta apakah peserta mendapat kesempatan mencoba tugas secara langsung.', 'Bandingkan biaya total termasuk perangkat, ujian, transportasi, dan waktu. Jika ada sertifikat, periksa siapa yang menerbitkan dan untuk tujuan apa sertifikat tersebut diakui.'] },
      { heading: 'Tentukan bukti belajar setelah selesai', paragraphs: ['Sebelum mendaftar, rencanakan hasil yang ingin dibawa pulang, seperti proyek, demonstrasi keterampilan, atau catatan praktik. Ini membuat proses belajar lebih mudah dievaluasi.', 'Informasi pelatihan dan pasar kerja tersedia melalui kanal resmi Kemnaker. Konfirmasi jadwal, syarat, serta kemungkinan biaya kepada penyelenggara karena program dapat berubah.'] },
    ],
  },
  {
    slug: 'magang-berkualitas-untuk-mahasiswa', title: 'Menilai kualitas program magang sebelum menerima tawaran',
    description: 'Tinjau tugas, pendampingan, jadwal, kompensasi, dan tujuan belajar agar magang memberi pengalaman yang terarah.',
    category: 'Awal karier', date: '2026-11-02', image: '/images/articles/magang.webp', imageAlt: 'Ilustrasi peserta magang berdiskusi dengan pembimbing',
    source: { name: 'Kementerian Ketenagakerjaan', url: 'https://bpvpkendari.kemnaker.go.id/page-news-detail?q=kemnaker-mulai-maganghub-batch-2-sebanyak-40962-peserta-siap-ikuti-pemagangan', date: '28 September 2026' },
    sections: [
      { heading: 'Cari tahu tugas hariannya', paragraphs: ['Minta contoh tanggung jawab mingguan dan hasil yang diharapkan. Tugas sebaiknya memberi kesempatan belajar, bukan hanya terdengar menarik di judul program.', 'Tanyakan siapa pembimbing, seberapa sering umpan balik diberikan, dan apa yang dilakukan jika tugas tidak jelas. Program yang terstruktur membantu peserta menghubungkan kegiatan dengan keterampilan yang ingin dipelajari.'] },
      { heading: 'Pastikan syaratnya tertulis', paragraphs: ['Cocokkan durasi, lokasi, jam kerja, aturan kehadiran, kompensasi, dan dokumen dengan informasi resmi program. Simpan salinan kesepakatan dan kontak penyelenggara.', 'Jangan berasumsi semua program magang memiliki ketentuan yang sama. Periksa skema yang berlaku, termasuk jika magang merupakan bagian kurikulum atau program pemerintah.'] },
      { heading: 'Buat catatan capaian', paragraphs: ['Tentukan keterampilan yang ingin dipraktikkan, lalu catat tugas, masukan, dan hasil secara berkala. Minta izin sebelum memasukkan contoh pekerjaan ke portofolio.', 'Berita Kemnaker tentang MagangHub menjelaskan satu angkatan dan durasi tertentu; informasi itu bukan pembukaan pendaftaran. Periksa kanal resmi untuk program serta jadwal terbaru.'] },
    ],
  },
  {
    slug: 'pertanyaan-untuk-rekruter-saat-interview', title: 'Pertanyaan yang bisa diajukan kepada rekruter saat wawancara',
    description: 'Gunakan sesi tanya jawab untuk memahami tugas, tim, ukuran keberhasilan, dan langkah seleksi berikutnya.',
    category: 'Wawancara', date: '2026-11-02', image: '/images/articles/magang.webp', imageAlt: 'Ilustrasi kandidat bertanya kepada pewawancara',
    source: { name: 'Pusat Pasar Kerja Kemnaker', url: 'https://paskerid.kemnaker.go.id/news/107', date: 'Diakses 2 November 2026' },
    sections: [
      { heading: 'Tanyakan gambaran pekerjaan sehari-hari', paragraphs: ['Pertanyaan seperti “Apa prioritas utama posisi ini pada tiga bulan pertama?” membantu memperjelas tugas dan harapan. Kamu juga bisa menanyakan masalah yang sedang ingin diselesaikan tim.', 'Gunakan deskripsi kerja sebagai titik awal. Jangan mengulang pertanyaan yang jawabannya sudah tersedia dengan jelas di iklan.'] },
      { heading: 'Pahami dukungan dan cara kerja tim', paragraphs: ['Tanyakan kepada siapa posisi ini melapor, dengan tim mana ia berkolaborasi, serta bagaimana orientasi dan umpan balik diberikan. Jika cara kerja penting bagimu, tanyakan pola kerja di lokasi, jarak jauh, atau campuran.', 'Ajukan pertanyaan dengan nada ingin memahami. Jawaban perekrut adalah satu sumber informasi; cocokkan dengan kontrak dan keterangan tertulis bila mendapat tawaran.'] },
      { heading: 'Pastikan tahapan selanjutnya', paragraphs: ['Tanyakan tahap seleksi, perkiraan waktu kabar, dan siapa yang dapat dihubungi jika perlu tindak lanjut. Catat nama dan jadwal yang disebutkan.', 'Pusat Pasar Kerja Kemnaker mendorong kandidat menyiapkan diri untuk wawancara. Persiapan pertanyaan membantu percakapan berjalan dua arah dan membuat keputusanmu lebih terinformasi.'] },
    ],
  },
  {
    slug: 'negosiasi-gaji-berdasarkan-komponen', title: 'Memahami komponen gaji sebelum membicarakan negosiasi',
    description: 'Bandingkan penghasilan secara utuh dengan memeriksa gaji pokok, tunjangan, potongan, bonus, dan jadwal pembayaran.',
    category: 'Gaji', date: '2026-11-02', image: '/images/articles/gaji.webp', imageAlt: 'Ilustrasi pekerja meninjau rincian gaji',
    source: { name: 'Badan Pusat Statistik', url: 'https://www.bps.go.id/id/pressrelease/2026/08/05/2606/tingkat-pengangguran-terbuka--tpt--sebesar-4-65-persen---rata-rata-upah-buruh-sebesar-3-39-juta-rupiah-.html', date: '5 Agustus 2026' },
    sections: [
      { heading: 'Minta rincian tertulis', paragraphs: ['Pastikan angka yang dibicarakan adalah gaji bulanan atau tahunan, bruto atau setelah potongan. Tanyakan gaji pokok, tunjangan tetap, komponen variabel, waktu pembayaran, dan syarat bonus.', 'Periksa juga manfaat lain yang relevan, seperti asuransi, makan, transportasi, atau dukungan kerja jarak jauh. Jangan menganggap manfaat akan diberikan jika belum dijelaskan dalam penawaran.'] },
      { heading: 'Gunakan pembanding yang sepadan', paragraphs: ['Bandingkan jabatan, tanggung jawab, lokasi, tingkat pengalaman, dan periode data yang sama. Statistik rata-rata nasional memberi konteks umum, tetapi tidak menetapkan nilai untuk satu posisi.', 'Catat biaya terkait pekerjaan seperti perjalanan dan kebutuhan perangkat. Pertimbangkan nilai yang benar-benar diterima serta kepastian tiap komponen, bukan hanya angka total yang disebutkan.'] },
      { heading: 'Sampaikan negosiasi dengan dasar', paragraphs: ['Sebutkan kontribusi yang dapat kamu bawa, data pembanding yang relevan, dan rentang yang kamu pertimbangkan. Beri ruang untuk membicarakan tanggung jawab atau manfaat lain jika gaji pokok tidak dapat diubah.', 'Mintalah waktu untuk meninjau penawaran tertulis. Data upah BPS adalah gambaran kelompok yang diukur dan tidak menggantikan pembacaan kontrak atau aturan yang berlaku.'] },
    ],
  },
  {
    slug: 'memahami-kontrak-kerja-sebelum-tanda-tangan', title: 'Hal yang perlu dibaca sebelum menandatangani kontrak kerja',
    description: 'Periksa jabatan, masa kerja, upah, jam kerja, lokasi, dan aturan pemutusan sebelum menyetujui perjanjian.',
    category: 'Hak pekerja', date: '2026-11-02', image: '/images/articles/perlindungan.webp', imageAlt: 'Ilustrasi pekerja membaca dokumen perjanjian kerja',
    source: { name: 'JDIH Kementerian Ketenagakerjaan', url: 'https://jdih.kemnaker.go.id/asset/data_puu/2024pmnaker018.pdf', date: 'Peraturan Menteri Ketenagakerjaan Nomor 18 Tahun 2024' },
    sections: [
      { heading: 'Cocokkan janji dengan isi dokumen', paragraphs: ['Pastikan nama pemberi kerja, jabatan, lokasi, tanggal mulai, jenis hubungan kerja, serta pihak yang menandatangani sudah benar. Bandingkan dengan penawaran dan penjelasan selama proses seleksi.', 'Baca tanggung jawab dan ketentuan perubahan tugas. Jika ada istilah yang tidak dipahami, minta penjelasan sebelum menyetujui, bukan setelah mulai bekerja.'] },
      { heading: 'Tinjau upah dan waktu kerja', paragraphs: ['Periksa besaran serta jadwal pembayaran, komponen tunjangan, potongan, jam kerja, istirahat, lembur, dan cuti. Tanyakan mekanisme pencatatan waktu serta siapa yang menyetujui kerja tambahan.', 'Ketentuan rinci dapat bergantung pada aturan yang berlaku, jenis pekerjaan, dan dokumen perusahaan. Jangan menyimpulkan hak hanya dari percakapan lisan.'] },
      { heading: 'Simpan salinan yang lengkap', paragraphs: ['Pastikan kamu menerima salinan yang telah ditandatangani dan seluruh lampiran yang disebut. Simpan di tempat aman, terpisah dari perangkat kerja bila memungkinkan.', 'Untuk persoalan hukum tertentu, minta penjelasan dari pengawas ketenagakerjaan atau bantuan hukum yang kompeten. JDIH Kemnaker menyediakan dokumen peraturan; periksa naskah dan aturan terkait yang paling baru.'] },
    ],
  },
  {
    slug: 'hak-istirahat-cuti-dan-lembur', title: 'Membaca aturan istirahat, cuti, dan lembur di tempat kerja',
    description: 'Pahami mengapa jadwal kerja dan ketentuan istirahat perlu diperiksa dalam kontrak serta kebijakan perusahaan.',
    category: 'Hak pekerja', date: '2026-11-02', image: '/images/articles/perlindungan.webp', imageAlt: 'Ilustrasi pekerja memeriksa jadwal kerja dan waktu istirahat',
    source: { name: 'JDIH Kementerian Ketenagakerjaan', url: 'https://jdih.kemnaker.go.id/asset/data_puu/2024pmnaker018.pdf', date: 'Peraturan Menteri Ketenagakerjaan Nomor 18 Tahun 2024' },
    sections: [
      { heading: 'Pastikan jadwal kerja dijelaskan', paragraphs: ['Sebelum mulai, tanyakan hari dan jam kerja, pola sif, waktu istirahat, serta cara perusahaan mengumumkan perubahan jadwal. Simpan jadwal atau kebijakan yang diberikan agar mudah dirujuk.', 'Ketentuan waktu kerja dapat berbeda menurut sektor, jenis pekerjaan, dan aturan khusus. Karena itu periksa aturan yang tepat untuk pekerjaanmu, bukan mengandalkan kebiasaan di tempat lain.'] },
      { heading: 'Pahami pencatatan lembur', paragraphs: ['Tanyakan siapa yang dapat menyetujui lembur, bagaimana waktu dicatat, dan bagaimana kompensasinya dijelaskan. Catatan tanggal dan jam membantu mengklarifikasi bila terdapat perbedaan pada pembayaran.', 'Jangan menyimpulkan bahwa semua pekerjaan memiliki pengaturan lembur identik. Baca perjanjian kerja dan kebijakan perusahaan bersama peraturan terkait.'] },
      { heading: 'Simpan bukti dan cari penjelasan resmi', paragraphs: ['Simpan salinan kontrak, jadwal, persetujuan lembur, dan catatan pembayaran. Jika aturan atau penerapannya belum jelas, ajukan pertanyaan tertulis kepada bagian SDM.', 'Dokumen hukum dapat berubah. Gunakan JDIH Kemnaker dan sumber pemerintah resmi untuk memeriksa naskah terbaru; minta bantuan instansi berwenang untuk situasi khusus.'] },
    ],
  },
  {
    slug: 'persiapan-kembali-bekerja-setelah-jeda-karier', title: 'Kembali bekerja setelah jeda karier: cara menjelaskan pengalamanmu',
    description: 'Susun cerita yang jujur tentang jeda kerja dan tampilkan keterampilan serta kesiapan kembali ke pekerjaan.',
    category: 'Pengembangan karier', date: '2026-11-02', image: '/images/articles/kualitas-kerja.webp', imageAlt: 'Ilustrasi seseorang merencanakan langkah karier berikutnya',
    source: { name: 'Pusat Pasar Kerja Kemnaker', url: 'https://e-training.kemnaker.go.id/belajarmandiri/modul/425/2986', date: 'Diakses 2 November 2026' },
    sections: [
      { heading: 'Jelaskan jeda secukupnya', paragraphs: ['Kamu tidak wajib menceritakan detail pribadi yang tidak berkaitan dengan pekerjaan. Beri penjelasan singkat dan jujur, lalu arahkan percakapan pada alasan siap kembali serta jenis peran yang dicari.', 'Jika jeda digunakan untuk merawat keluarga, belajar, atau urusan lain, sebutkan hanya sejauh nyaman. Hindari mengarang pekerjaan untuk menutup kekosongan tanggal.'] },
      { heading: 'Perbarui keterampilan dan contoh kerja', paragraphs: ['Baca deskripsi posisi terkini dan cari perubahan alat atau proses yang relevan. Pilih pelatihan singkat atau proyek latihan untuk menunjukkan cara memperbarui kemampuan.', 'Perbarui CV dengan pengalaman sebelum jeda dan kegiatan terbaru yang relevan. Jelaskan hasil secara konkret dan jangan menampilkan proyek simulasi sebagai pekerjaan berbayar.'] },
      { heading: 'Perluas jalur pencarian', paragraphs: ['Hubungi jaringan profesional dengan pesan yang jelas tentang peran yang dituju. Pertimbangkan posisi kontrak, paruh waktu, atau program kembali bekerja bila sesuai kebutuhanmu.', 'Gunakan kanal resmi pencarian kerja dan pastikan lowongan benar-benar aktif. Materi pencari kerja Kemnaker membahas penyusunan CV serta persiapan wawancara untuk membantu proses kembali melamar.'] },
    ],
  },
  {
    slug: 'pindah-karier-dengan-peta-keterampilan', title: 'Pindah karier dengan peta keterampilan yang realistis',
    description: 'Ubah pengalaman yang sudah dimiliki menjadi keterampilan yang relevan, lalu uji bidang baru sebelum mengambil keputusan besar.',
    category: 'Pengembangan karier', date: '2026-11-02', image: '/images/articles/pasar-kerja.webp', imageAlt: 'Ilustrasi pekerja membuat rencana perubahan karier',
    source: { name: 'Pusat Pasar Kerja Kemnaker', url: 'https://e-training.kemnaker.go.id/belajarmandiri/modul/425/2986', date: 'Diakses 2 November 2026' },
    sections: [
      { heading: 'Pilih peran tujuan yang spesifik', paragraphs: ['Hindari memulai dari bidang yang terlalu luas. Pilih beberapa jabatan yang menarik, baca tugas hariannya, dan cari pola kemampuan yang berulang pada lowongan aktual.', 'Bandingkan tuntutan pengalaman, lokasi, jadwal, serta cara masuk ke bidang tersebut. Ini membantu menilai apakah perubahan dapat dilakukan bertahap atau memerlukan pelatihan lebih dulu.'] },
      { heading: 'Petakan keterampilan yang dapat dipindahkan', paragraphs: ['Buat dua kolom: kemampuan yang sudah kamu gunakan dan kebutuhan posisi baru. Komunikasi, pengelolaan proyek, analisis, layanan pelanggan, atau koordinasi dapat berguna lintas bidang bila dibuktikan dengan contoh.', 'Tandai kesenjangan yang paling penting, bukan semuanya sekaligus. Pilih satu proyek atau kegiatan untuk menguji minat dan mengumpulkan bukti kemampuan baru.'] },
      { heading: 'Uji langkah sebelum berkomitmen', paragraphs: ['Bicara dengan praktisi, ikut kegiatan pengenalan, atau kerjakan proyek kecil. Tinjau biaya, waktu belajar, dan konsekuensi finansial sebelum meninggalkan pekerjaan atau membeli program mahal.', 'Gunakan pelatihan dan layanan informasi kerja dari kanal resmi sebagai bahan. Rencana karier bisa berubah ketika kamu mendapat informasi baru; evaluasi secara berkala.'] },
    ],
  },
  {
    slug: 'membangun-jaringan-profesional-untuk-pemula', title: 'Membangun jaringan profesional tanpa merasa harus meminta pekerjaan',
    description: 'Mulai percakapan yang tulus, minta informasi secara spesifik, dan jaga hubungan setelah mendapat bantuan.',
    category: 'Pengembangan karier', date: '2026-11-02', image: '/images/articles/kualitas-kerja.webp', imageAlt: 'Ilustrasi dua profesional bertukar informasi karier',
    source: { name: 'Pusat Pasar Kerja Kemnaker', url: 'https://e-training.kemnaker.go.id/belajarmandiri/modul/425/2986', date: 'Diakses 2 November 2026' },
    sections: [
      { heading: 'Mulai dari percakapan yang jelas', paragraphs: ['Hubungi alumni, rekan komunitas, atau praktisi yang pekerjaannya ingin kamu pahami. Perkenalkan diri secara ringkas dan jelaskan alasan menghubungi mereka.', 'Ajukan satu atau dua pertanyaan spesifik, misalnya keterampilan awal yang berguna atau bentuk tugas harian. Permintaan singkat lebih mudah dijawab daripada meminta seseorang mencarikan pekerjaan.'] },
      { heading: 'Hormati waktu dan batas pribadi', paragraphs: ['Minta waktu percakapan singkat dan beri pilihan bila mereka sedang sibuk. Jangan meminta informasi rahasia perusahaan atau mengirim CV tanpa konteks.', 'Jika tidak mendapat jawaban, tindak lanjuti sekali dengan sopan lalu beri ruang. Hubungan profesional dibangun melalui saling menghargai, bukan jumlah kontak semata.'] },
      { heading: 'Tindak lanjuti dengan terima kasih', paragraphs: ['Kirim pesan terima kasih dan sebutkan satu hal yang kamu pelajari. Jika saran mereka membantu, kabari perkembanganmu beberapa waktu kemudian.', 'Jaringan dapat memberi sudut pandang, tetapi informasi lowongan tetap perlu diverifikasi melalui kanal resmi. Lengkapi percakapan dengan persiapan CV dan wawancara yang terarah.'] },
    ],
  },
  {
    slug: 'memulai-kerja-jarak-jauh-dengan-aman', title: 'Melamar pekerjaan jarak jauh: memeriksa peran dan kesiapan kerja',
    description: 'Periksa zona waktu, alat, komunikasi, keamanan data, dan status hubungan kerja sebelum menerima tawaran jarak jauh.',
    category: 'Dunia kerja', date: '2026-11-02', image: '/images/articles/lowongan.webp', imageAlt: 'Ilustrasi pekerja menggunakan laptop dari rumah',
    source: { name: 'Pusat Pasar Kerja Kemnaker', url: 'https://paskerid.kemnaker.go.id/', date: 'Diakses 2 November 2026' },
    sections: [
      { heading: 'Pahami cara kerja yang ditawarkan', paragraphs: ['Tanyakan apakah posisi sepenuhnya jarak jauh atau memiliki hari hadir di kantor. Periksa jam inti, zona waktu tim, perjalanan sesekali, serta siapa yang menyediakan perangkat dan koneksi.', 'Klarifikasi lokasi kerja yang diperbolehkan karena aturan pajak, penggajian, atau keamanan dapat memengaruhi pekerjaan lintas wilayah. Minta ketentuan penting secara tertulis.'] },
      { heading: 'Tinjau komunikasi dan dukungan tim', paragraphs: ['Tanyakan bagaimana pekerjaan dibagi, bagaimana kemajuan dilaporkan, dan kapan tim biasanya berkomunikasi langsung. Kejelasan tujuan membantu kerja jarak jauh berjalan tanpa harus selalu tersedia.', 'Cari tahu proses orientasi, dukungan teknis, penggantian biaya, dan cara meminta bantuan. Jangan berasumsi fasilitas sama dengan tempat kerja sebelumnya.'] },
      { heading: 'Jaga data dan identitas perusahaan', paragraphs: ['Verifikasi tawaran lewat situs karier atau kontak resmi. Jangan menginstal aplikasi tak dikenal atau mengirim uang untuk perangkat sebelum proses dan pihak pemberi kerja dipastikan.', 'Tanyakan aturan perlindungan data dan gunakan perangkat serta akun kerja sesuai kebijakan. Kanal Pasker ID bisa menjadi salah satu titik untuk menelusuri informasi pasar kerja, tetapi setiap lowongan tetap perlu diperiksa.'] },
    ],
  },
  {
    slug: 'melamar-pekerjaan-pertama-setelah-kuliah', title: 'Panduan melamar pekerjaan pertama setelah lulus kuliah',
    description: 'Atur target posisi, dokumen, jadwal pencarian, dan latihan wawancara agar proses melamar lebih terukur.',
    category: 'Awal karier', date: '2026-11-02', image: '/images/articles/magang.webp', imageAlt: 'Ilustrasi lulusan baru menyiapkan lamaran kerja',
    source: { name: 'Pusat Pasar Kerja Kemnaker', url: 'https://e-training.kemnaker.go.id/belajarmandiri/modul/425/2986', date: 'Diakses 2 November 2026' },
    sections: [
      { heading: 'Buat daftar peran yang masuk akal', paragraphs: ['Pilih beberapa jabatan berdasarkan minat, mata kuliah, pengalaman praktik, dan keterampilan yang ingin digunakan. Baca deskripsi posisi untuk membandingkan tugas nyata, bukan hanya nama jabatan.', 'Tidak semua persyaratan harus sudah sempurna untuk melamar, tetapi bedakan syarat wajib dan nilai tambah. Fokus pada posisi yang kecocokannya dapat dijelaskan dengan contoh.'] },
      { heading: 'Siapkan dokumen inti', paragraphs: ['Buat CV yang rapi, surat pengantar bila diminta, dan portofolio yang relevan. Pastikan kontak aktif serta tautan dapat dibuka tanpa meminta akses yang tidak perlu.', 'Simpan versi dokumen dengan nama yang jelas dan rapikan folder lamaran. Jangan mengirim dokumen identitas atau data sensitif kecuali prosesnya terverifikasi dan diperlukan.'] },
      { heading: 'Bangun rutinitas pencarian yang sehat', paragraphs: ['Tetapkan waktu untuk mencari lowongan, menyesuaikan CV, berlatih wawancara, dan beristirahat. Catat tanggal serta tindak lanjut supaya proses tidak terasa seperti mengirim lamaran tanpa arah.', 'Pusat Pasar Kerja Kemnaker menyediakan materi tentang lamaran dan wawancara. Gunakan sumber resmi, minta umpan balik, dan evaluasi strategi setelah beberapa proses.'] },
    ],
  },
  {
    slug: 'melamar-kerja-untuk-penyandang-disabilitas', title: 'Mencari kerja sebagai penyandang disabilitas: mengomunikasikan kebutuhan akses',
    description: 'Kenali proses seleksi, informasi akses, dan cara menyampaikan penyesuaian yang dibutuhkan dengan aman.',
    category: 'Kerja inklusif', date: '2026-11-02', image: '/images/articles/perlindungan.webp', imageAlt: 'Ilustrasi kandidat dan perekrut berdiskusi tentang akses kerja',
    source: { name: 'Job Fair Kemnaker', url: 'https://jobfair.kemnaker.go.id/', date: 'Diakses 2 November 2026' },
    sections: [
      { heading: 'Cari informasi proses seleksi', paragraphs: ['Periksa bentuk seleksi, lokasi, perangkat, dan cara menghubungi penyelenggara. Jika informasi akses belum ada, tanyakan bagaimana mengajukan penyesuaian dan kepada siapa permintaan ditujukan.', 'Kebutuhan setiap orang berbeda. Kamu dapat menjelaskan penyesuaian yang membantu mengikuti proses tanpa harus membagikan informasi medis lebih luas dari yang diperlukan.'] },
      { heading: 'Sampaikan kebutuhan secara spesifik', paragraphs: ['Jika memilih meminta penyesuaian, jelaskan kebutuhan praktis seperti materi dalam format tertentu, waktu tambahan, akses fisik, atau dukungan komunikasi. Minta konfirmasi agar tidak ada salah paham.', 'Catat kesepakatan dan simpan komunikasi. Jika proses tidak jelas, minta kontak resmi penyelenggara atau bagian sumber daya manusia.'] },
      { heading: 'Nilai dukungan di tempat kerja', paragraphs: ['Saat wawancara, tanyakan akses di lokasi, perangkat bantu, kebijakan penyesuaian, dan cara menyampaikan kendala. Nilai jawaban berdasarkan langkah nyata dan penanggung jawab yang jelas.', 'Job fair Kemnaker dapat menjadi salah satu kanal informasi kegiatan inklusif. Periksa agenda dan lowongan terkini pada situs resmi karena jadwal dan peserta berubah.'] },
    ],
  },
  {
    slug: 'keterampilan-digital-dasar-untuk-melamar-kerja', title: 'Keterampilan digital dasar yang perlu dibuktikan pencari kerja',
    description: 'Tunjukkan kemampuan menggunakan dokumen, komunikasi daring, pencarian informasi, dan keamanan akun lewat contoh nyata.',
    category: 'Keterampilan', date: '2026-11-02', image: '/images/articles/pasar-kerja.webp', imageAlt: 'Ilustrasi pekerja menggunakan perangkat digital',
    source: { name: 'Pusat Pasar Kerja Kemnaker', url: 'https://e-training.kemnaker.go.id/belajarmandiri/modul/425/2986', date: 'Diakses 2 November 2026' },
    sections: [
      { heading: 'Sesuaikan kemampuan dengan pekerjaan', paragraphs: ['Kebutuhan digital berbeda menurut posisi. Peran administrasi mungkin memerlukan pengelolaan dokumen dan lembar kerja, sementara peran kreatif atau teknis membutuhkan perangkat khusus.', 'Baca deskripsi kerja dan tandai alat yang disebut. Jangan mencantumkan tingkat mahir jika baru mengenal dasar; jelaskan konteks dan contoh penggunaan yang benar.'] },
      { heading: 'Buat bukti sederhana', paragraphs: ['Latih tugas yang relevan seperti merapikan data latihan, membuat presentasi, mengelola kalender, atau menulis panduan. Gunakan data fiktif atau terbuka agar tidak membocorkan informasi pihak lain.', 'Simpan contoh yang mudah dibuka dan terangkan tujuan, langkah, serta bagian yang kamu kerjakan. Bukti sederhana membantu perekrut memahami kemampuan lebih baik daripada daftar aplikasi semata.'] },
      { heading: 'Jaga keamanan saat proses rekrutmen', paragraphs: ['Gunakan kata sandi unik dan aktifkan verifikasi tambahan pada akun penting. Pastikan tautan wawancara dan tugas berasal dari kanal yang dapat dikonfirmasi.', 'Materi pencarian kerja Kemnaker meliputi persiapan dokumen dan wawancara. Pilih keterampilan digital yang berkaitan dengan posisi lalu terus perbarui melalui praktik.'] },
    ],
  },
  {
    slug: 'mengelola-stres-selama-mencari-kerja', title: 'Menjaga rutinitas dan energi selama mencari pekerjaan',
    description: 'Proses melamar bisa panjang. Buat target yang terukur, jaga jeda, dan cari dukungan saat beban terasa berat.',
    category: 'Pengembangan karier', date: '2026-11-02', image: '/images/articles/kualitas-kerja.webp', imageAlt: 'Ilustrasi seseorang beristirahat setelah mengerjakan lamaran',
    source: { name: 'Pusat Pasar Kerja Kemnaker', url: 'https://paskerid.kemnaker.go.id/', date: 'Diakses 2 November 2026' },
    sections: [
      { heading: 'Tetapkan proses yang bisa dikendalikan', paragraphs: ['Jumlah lamaran dan kecepatan jawaban perekrut tidak sepenuhnya berada di tanganmu. Fokus pada langkah yang dapat dilakukan: memilih posisi yang sesuai, menyiapkan dokumen, dan menindaklanjuti dengan sopan.', 'Buat target kecil untuk satu pekan, misalnya meninjau beberapa lowongan dan menyesuaikan sejumlah lamaran. Tinjau target bila kondisi atau tanggung jawab lain berubah.'] },
      { heading: 'Jadwalkan istirahat dan kegiatan lain', paragraphs: ['Batasi waktu memeriksa pesan agar pencarian kerja tidak memenuhi seluruh hari. Sisihkan waktu untuk bergerak, tidur, hubungan sosial, dan kegiatan yang membantu memulihkan energi.', 'Catat kemajuan yang sudah dibuat, bukan hanya hasil akhir. Menyelesaikan CV atau berlatih jawaban juga merupakan langkah yang dapat dievaluasi.'] },
      { heading: 'Minta dukungan yang sesuai', paragraphs: ['Bicarakan proses dengan orang yang dipercaya atau manfaatkan layanan karier dan informasi kerja yang tersedia. Jika tekanan terasa berat dan mengganggu keseharian, pertimbangkan meminta bantuan profesional.', 'Pusat Pasar Kerja menyediakan informasi layanan ketenagakerjaan. Periksa kanal resmi dan gunakan layanan yang sesuai dengan kebutuhanmu.'] },
    ],
  },
  {
    slug: 'memberi-masukan-di-tempat-kerja-dengan-profesional', title: 'Cara menyampaikan masukan di tempat kerja dengan jelas dan profesional',
    description: 'Fokus pada situasi, dampak, dan usulan yang bisa ditindaklanjuti saat menyampaikan kendala kepada tim.',
    category: 'Dunia kerja', date: '2026-11-02', image: '/images/articles/kualitas-kerja.webp', imageAlt: 'Ilustrasi rekan kerja berdiskusi di kantor',
    source: { name: 'Kementerian Ketenagakerjaan', url: 'https://e-training.kemnaker.go.id/belajarmandiri/modul/425/2986', date: 'Diakses 2 November 2026' },
    sections: [
      { heading: 'Pilih waktu dan saluran yang tepat', paragraphs: ['Tentukan apakah isu perlu dibicarakan segera atau dapat masuk ke pertemuan rutin. Untuk hal sensitif, gunakan saluran yang aman dan sesuai prosedur organisasi.', 'Jika menyangkut keselamatan, pelecehan, diskriminasi, atau dugaan pelanggaran, ikuti mekanisme pelaporan resmi dan simpan informasi yang relevan secara aman.'] },
      { heading: 'Jelaskan fakta dan dampaknya', paragraphs: ['Sebut situasi yang diamati, dampaknya pada pekerjaan, dan informasi yang masih perlu dikonfirmasi. Pisahkan fakta dari asumsi tentang niat seseorang.', 'Gunakan contoh spesifik dan bahasa yang menghormati pihak lain. Hindari menyebarkan detail pribadi atau membuat tuduhan di ruang publik sebelum memahami proses penanganan.'] },
      { heading: 'Usulkan langkah dan sepakati tindak lanjut', paragraphs: ['Ajukan langkah yang realistis, seperti memperjelas pemilik tugas atau mengubah alur persetujuan. Tanyakan siapa yang akan menindaklanjuti dan kapan perlu mengevaluasi hasilnya.', 'Simpan ringkasan kesepakatan bila isu berdampak pada tugas. Materi komunikasi kerja dapat dipadukan dengan prosedur internal dan aturan ketenagakerjaan yang berlaku.'] },
    ],
  },
  {
    slug: 'menyiapkan-hari-pertama-kerja', title: 'Persiapan hari pertama kerja agar proses adaptasi lebih terarah',
    description: 'Siapkan dokumen, pahami jadwal, kenali kontak penting, dan catat pertanyaan saat mulai bekerja di tempat baru.',
    category: 'Awal karier', date: '2026-11-02', image: '/images/articles/magang.webp', imageAlt: 'Ilustrasi karyawan baru memulai pekerjaan',
    source: { name: 'Pusat Pasar Kerja Kemnaker', url: 'https://e-training.kemnaker.go.id/belajarmandiri/modul/425/2986', date: 'Diakses 2 November 2026' },
    sections: [
      { heading: 'Konfirmasi hal dasar sebelum mulai', paragraphs: ['Pastikan tanggal, jam, lokasi atau tautan kerja, pakaian yang sesuai, kontak penyambut, dan dokumen yang perlu dibawa. Tanyakan aturan keamanan atau akses gedung jika bekerja di lokasi.', 'Baca kembali perjanjian dan penawaran agar jadwal serta tanggung jawab awal tidak membingungkan. Jangan mengirim dokumen sensitif lewat kanal yang belum diverifikasi.'] },
      { heading: 'Gunakan minggu pertama untuk memahami alur', paragraphs: ['Catat nama tim, alat kerja, prioritas, proses persetujuan, serta cara meminta bantuan. Jangan ragu meminta contoh hasil yang dianggap baik dan batas waktu yang berlaku.', 'Tulis pertanyaan saat muncul agar dapat dibahas pada waktu yang tepat. Klarifikasi lebih awal membantu menghindari asumsi yang membuat pekerjaan harus diulang.'] },
      { heading: 'Sepakati target awal', paragraphs: ['Tanyakan hasil yang diharapkan pada beberapa minggu pertama dan jadwalkan waktu untuk umpan balik. Buat catatan kemajuan serta hambatan yang membutuhkan keputusan orang lain.', 'Adaptasi memerlukan waktu dan berbeda di tiap organisasi. Gunakan arahan pembimbing dan kebijakan perusahaan sebagai pegangan, lalu tinjau kembali prioritas secara berkala.'] },
    ],
  },
  {
    slug: 'menyusun-rencana-pengembangan-karier-tahunan', title: 'Menyusun rencana pengembangan karier yang dapat ditinjau setiap tahun',
    description: 'Ubah tujuan karier menjadi langkah belajar, pengalaman, dan percakapan kerja yang bisa dievaluasi.',
    category: 'Pengembangan karier', date: '2026-11-02', image: '/images/articles/kualitas-kerja.webp', imageAlt: 'Ilustrasi pekerja merencanakan target karier',
    source: { name: 'Pusat Pasar Kerja Kemnaker', url: 'https://e-training.kemnaker.go.id/belajarmandiri/modul/425/2986', date: 'Diakses 2 November 2026' },
    sections: [
      { heading: 'Tentukan arah dan alasan', paragraphs: ['Pilih satu atau dua tujuan yang berarti bagimu, seperti memperdalam keahlian, mengambil tanggung jawab baru, atau berpindah bidang. Jelaskan mengapa tujuan itu penting dan kondisi apa yang perlu dipertimbangkan.', 'Tujuan boleh disesuaikan dengan situasi keluarga, kesehatan, dan kebutuhan finansial. Rencana yang berguna memberi arah tanpa menganggap jalur karier harus selalu naik jabatan.'] },
      { heading: 'Pecah menjadi tindakan kecil', paragraphs: ['Tentukan kemampuan yang perlu dikembangkan, proyek yang dapat memberi pengalaman, dan orang yang dapat memberi umpan balik. Buat tenggat realistis serta ukuran kemajuan yang bisa diamati.', 'Pilih pelatihan berdasarkan kebutuhan tugas, bukan semata sertifikat. Proyek nyata dan refleksi atas hasil dapat menunjukkan pembelajaran dengan lebih jelas.'] },
      { heading: 'Tinjau dan ubah bila perlu', paragraphs: ['Jadwalkan evaluasi berkala untuk melihat apa yang berubah dan langkah mana yang masih relevan. Jika kesempatan atau prioritas bergeser, sesuaikan rencana tanpa menganggapnya sebagai kegagalan.', 'Bandingkan aspirasi dengan informasi lowongan, kebutuhan keterampilan, dan pengalaman praktisi. Materi serta layanan pasar kerja Kemnaker dapat menjadi salah satu sumber eksplorasi.'] },
    ],
  },
  {
    slug: 'menghadapi-penolakan-lamaran-kerja', title: 'Menghadapi penolakan kerja dan mengambil pelajaran dari proses seleksi',
    description: 'Kelola respons atas penolakan, minta umpan balik bila tersedia, dan gunakan pola proses untuk memperbaiki lamaran berikutnya.',
    category: 'Pengembangan karier', date: '2026-11-02', image: '/images/articles/kualitas-kerja.webp', imageAlt: 'Ilustrasi pencari kerja meninjau kembali rencana lamaran',
    source: { name: 'Pusat Pasar Kerja Kemnaker', url: 'https://paskerid.kemnaker.go.id/', date: 'Diakses 2 November 2026' },
    sections: [
      { heading: 'Pisahkan hasil seleksi dari nilai diri', paragraphs: ['Keputusan perekrutan dipengaruhi kebutuhan tim, jumlah kandidat, waktu, dan pertimbangan lain yang tidak selalu terlihat. Penolakan pada satu posisi tidak merangkum seluruh kemampuanmu.', 'Beri waktu untuk memproses kabar sebelum mengambil keputusan besar. Setelah itu, kembali ke langkah yang dapat kamu kendalikan.'] },
      { heading: 'Minta umpan balik dengan sopan', paragraphs: ['Jika hubungan dengan perekrut memungkinkan, tanyakan satu hal yang dapat diperbaiki untuk proses berikutnya. Mereka mungkin tidak dapat memberikan detail, jadi terima jawaban dengan baik.', 'Catat tahap ketika proses berhenti dan pertanyaan yang terasa sulit. Jika beberapa proses menunjukkan pola sama, pertimbangkan meninjau CV, pilihan posisi, atau contoh jawaban.'] },
      { heading: 'Perbarui strategi dan jaga ritme', paragraphs: ['Lanjutkan melamar posisi yang sesuai dan gunakan jeda untuk latihan atau belajar terarah. Hindari mengirim dokumen yang sama tanpa meninjau kecocokan tiap pekerjaan.', 'Kanal resmi pasar kerja dapat membantu menemukan peluang lain. Tetapkan rutinitas yang realistis dan cari dukungan dari orang tepercaya selama proses berlangsung.'] },
    ],
  },
  {
    slug: 'bekerja-dengan-ai-secara-bertanggung-jawab', title: 'Menggunakan AI untuk membantu pekerjaan tanpa melepas tanggung jawab',
    description: 'Gunakan AI untuk membuat draf atau merapikan ide, lalu periksa akurasi, privasi, dan kebijakan tempat kerja.',
    category: 'Teknologi kerja', date: '2026-11-02', image: '/images/articles/lowongan.webp', imageAlt: 'Ilustrasi pekerja menggunakan laptop dan perangkat digital',
    source: { name: 'Kemnaker, materi pelatihan pencari kerja', url: 'https://e-training.kemnaker.go.id/belajarmandiri/modul/425/2986', date: 'Diakses 2 November 2026' },
    sections: [
      { heading: 'Gunakan alat untuk tugas yang sesuai', paragraphs: ['AI dapat membantu menyusun kerangka, merangkum bahan yang boleh digunakan, atau memunculkan daftar ide. Tentukan terlebih dahulu tujuan dan informasi apa yang tidak boleh dimasukkan.', 'Jangan mengunggah data pelanggan, dokumen internal, informasi pribadi, atau kode rahasia ke layanan yang belum disetujui organisasi. Periksa kebijakan perusahaan sebelum memakai alat apa pun.'] },
      { heading: 'Periksa hasil sebelum digunakan', paragraphs: ['Model dapat membuat informasi yang terdengar meyakinkan tetapi keliru. Verifikasi nama, angka, sumber, rumus, dan kutipan melalui dokumen asli atau sumber tepercaya.', 'Untuk keputusan yang memengaruhi orang lain, mintalah peninjauan manusia yang kompeten. Catat bagian mana yang dibantu alat dan pastikan hasil akhir tetap mencerminkan pemahamanmu.'] },
      { heading: 'Jelaskan penggunaan dengan jujur', paragraphs: ['Jika perekrut bertanya tentang penggunaan AI, jawab sesuai proses yang benar-benar kamu lakukan. Tunjukkan cara memeriksa keluaran dan keputusan yang tetap kamu ambil sendiri.', 'Kebutuhan dan kebijakan AI berbeda di setiap organisasi. Tanyakan alat yang diizinkan, batas penggunaan, serta tanggung jawab jika hasilnya dipakai dalam pekerjaan.'] },
    ],
  },
  {
    slug: 'perhitungan-kompensasi-pkwt-aturan-terbaru',
    title: 'Cara menghitung uang kompensasi kontrak kerja PKWT',
    description: 'Pekerja kontrak berhak memperoleh uang kompensasi pada akhir masa kerja. Pahami rumus perhitungan, syarat minimal masa kerja, dan hak yang perlu dicatat.',
    category: 'Hak pekerja',
    date: '2026-11-03',
    image: '/images/articles/perlindungan.webp',
    imageAlt: 'Ilustrasi pekerja memeriksa dokumen perhitungan kontrak kerja',
    source: { name: 'JDIH Kementerian Ketenagakerjaan', url: 'https://jdih.kemnaker.go.id/', date: 'PP Nomor 35 Tahun 2021' },
    sections: [
      { heading: 'Dasar hukum dan syarat penerima kompensasi', paragraphs: ['Berdasarkan Peraturan Pemerintah Nomor 35 Tahun 2021, pemberi kerja wajib memberikan uang kompensasi kepada pekerja dengan Perjanjian Kerja Waktu Tertentu (PKWT) saat kontrak berakhir atau selesai masa berlakunya. Hak ini berlaku bagi pekerja yang telah mempunyai masa kerja paling sedikit satu bulan secara terus-menerus.', 'Ketentuan kompensasi berlaku untuk pekerja berkewarganegaraan Indonesia pada perusahaan swasta maupun BUMN. Apabila kontrak diperpanjang, kompensasi untuk masa kontrak pertama wajib dibayarkan sebelum perpanjangan dimulai.'] },
      { heading: 'Rumus dan cara menghitung besaran kompensasi', paragraphs: ['Rumus perhitungan kompensasi didasarkan pada perbandingan masa kerja terhadap 12 bulan dikalikan satu bulan upah. Jika bekerja penuh selama 12 bulan berturut-turut, pekerja berhak atas satu bulan upah pokok ditambah tunjangan tetap.', 'Bagi pekerja dengan masa kerja kurang atau lebih dari 12 bulan (misalnya 6 bulan), perhitungannya adalah 6 dibagi 12 lalu dikalikan satu bulan upah (setara 50% upah bulanan). Pastikan komponen upah yang digunakan dalam perhitungan mencakup gaji pokok dan tunjangan tetap tanpa potongan sepihak.'] },
      { heading: 'Langkah pencatatan dan antisipasi hak', paragraphs: ['Simpan salinan kontrak kerja, surat pengangkatan PKWT, slip gaji bulanan, dan bukti transfer pembayaran terakhir. Dokumen-dokumen ini menjadi rujukan utama apabila terdapat selisih perhitungan saat kontrak berakhir.', 'Jika masa kontrak selesai dan kompensasi belum dibayarkan, ajukan konfirmasi tertulis secara sopan kepada bagian personalia atau HRD dengan merujuk pasal dalam kontrak dan PP 35/2021.'] },
    ],
  },
  {
    slug: 'aturan-masa-percobaan-kerja-probation',
    title: 'Masa percobaan kerja (probation): aturan durasi, hak upah, dan status kontrak',
    description: 'Ketahui batas maksimal masa percobaan tiga bulan, larangan upah di bawah upah minimum, dan aturan ketat bahwa probation dilarang bagi pekerja kontrak.',
    category: 'Hak pekerja',
    date: '2026-11-03',
    image: '/images/articles/perlindungan.webp',
    imageAlt: 'Ilustrasi pekerja berdiskusi mengenai evaluasi masa percobaan kerja',
    source: { name: 'Kementerian Ketenagakerjaan RI', url: 'https://kemnaker.go.id/', date: 'UU Ketenagakerjaan & PP 35/2021' },
    sections: [
      { heading: 'Probation hanya berlaku untuk karyawan tetap', paragraphs: ['Berdasarkan regulasi ketenagakerjaan di Indonesia, masa percobaan kerja hanya dapat disyaratkan untuk perjanjian kerja waktu tidak tertentu (PKWTT atau karyawan tetap). Masa percobaan kerja paling lama adalah 3 (tiga) bulan.', 'Peraturan Pemerintah melarang pencantuman masa percobaan dalam kontrak PKWT (pekerja kontrak). Jika perusahaan mencantumkan klausul masa percobaan dalam perjanjian PKWT, klausul tersebut batal demi hukum dan masa kerja tetap dihitung sejak hari pertama masuk.'] },
      { heading: 'Hak upah tidak boleh di bawah ketentuan minimum', paragraphs: ['Selama menjalani masa percobaan tiga bulan, pekerja berhak menerima upah yang tidak boleh lebih rendah dari upah minimum provinsi (UMP) atau upah minimum kabupaten/kota (UMK) yang berlaku.', 'Perusahaan tidak dibenarkan memotong gaji di bawah ketentuan upah minimum dengan dalih status masa percobaan atau pelatihan kerja awal. Hak atas perlindungan keselamatan dan jaminan sosial ketenagakerjaan juga harus mulai berjalan.'] },
      { heading: 'Evaluasi performa dan kesepakatan tertulis', paragraphs: ['Mintalah kriteria evaluasi yang terukur sejak awal masa percobaan, termasuk target tugas, nama supervisor penilai, dan jadwal review tengah periode (mid-probation review).', 'Menjelang berakhirnya bulan ketiga, pastikan ada surat keputusan resmi tertulis mengenai pengangkatan menjadi karyawan tetap atau penghentian hubungan kerja, agar tidak timbul ketidakpastian status kerja.'] },
    ],
  },
  {
    slug: 'cek-saldo-dan-iuran-bpjs-ketenagakerjaan',
    title: 'Cara mengecek kepesertaan dan iuran BPJS Ketenagakerjaan secara mandiri',
    description: 'Pastikan upah yang dilaporkan perusahaan sesuai dengan slip gaji dan iuran JHT, JKK, serta JKM disetorkan secara tertib setiap bulan.',
    category: 'Keuangan kerja',
    date: '2026-11-03',
    image: '/images/articles/gaji.webp',
    imageAlt: 'Ilustrasi pekerja memeriksa data jaminan sosial melalui aplikasi resmi',
    source: { name: 'BPJS Ketenagakerjaan', url: 'https://www.bpjsketenagakerjaan.go.id/', date: 'Diakses 3 November 2026' },
    sections: [
      { heading: 'Pentingnya memantau iuran secara berkala', paragraphs: ['Setiap pekerja formal yang gajinya dipotong untuk program jaminan sosial berhak mengetahui apakah perusahaan menyetorkan iuran tersebut secara tepat waktu dan dengan nominal yang benar ke BPJS Ketenagakerjaan.', 'Pemantauan berkala membantu mendeteksi lebih awal jika ada perusahaan yang melaporkan upah lebih rendah dari penghasilan sebenarnya (upah tidak sebenarnya) atau menunggak pembayaran iuran jaminan.'] },
      { heading: 'Langkah pengecekan melalui kanal resmi', paragraphs: ['Pengecekan dapat dilakukan secara mandiri melalui aplikasi resmi Jamsostek Mobile (JMO) atau portal web resmi BPJS Ketenagakerjaan dengan mendaftarkan Nomor Induk Kependudukan (NIK) dan Nomor Kartu Peserta Jamsostek (KPJ).', 'Periksa rincian saldo Jaminan Hari Tua (JHT), status kepesertaan aktif, program yang diikuti (JHT, JKK, JKM, JP, JKP), serta riwayat pembayaran iuran bulanan dari pemberi kerja.'] },
      { heading: 'Tindakan jika ditemukan ketidaksesuaian', paragraphs: ['Cocokkan jumlah pemotongan yang tercantum di slip gaji dengan catatan setoran iuran pada riwayat saldo aplikasi. Jika terdapat selisih atau pembayaran terlambat beberapa bulan, minta klarifikasi kepada HRD atau bagian keuangan kantor.', 'Jika kendala tidak diselesaikan secara internal, pekerja dapat berkonsultasi atau melaporkan pengaduan ketenagakerjaan melalui layanan pengaduan resmi BPJS Ketenagakerjaan atau dinas tenaga kerja setempat.'] },
    ],
  },
  {
    slug: 'panduan-klaim-jht-bpjs-ketenagakerjaan',
    title: 'Panduan mencairkan saldo JHT BPJS Ketenagakerjaan setelah berhenti bekerja',
    description: 'Simak syarat dokumen paklaring, prosedur verifikasi daring Lapak Asik atau JMO, dan cara menghindari calo pencairan dana pensiun.',
    category: 'Keuangan kerja',
    date: '2026-11-03',
    image: '/images/articles/gaji.webp',
    imageAlt: 'Ilustrasi dokumen persiapan klaim manfaat jaminan ketenagakerjaan',
    source: { name: 'BPJS Ketenagakerjaan', url: 'https://www.bpjsketenagakerjaan.go.id/', date: 'Diakses 3 November 2026' },
    sections: [
      { heading: 'Kondisi klaim dan syarat dokumen', paragraphs: ['Peserta BPJS Ketenagakerjaan yang mengundurkan diri (resign), mengalami pemutusan hubungan kerja (PHK), atau habis masa kontrak dapat mencairkan saldo JHT secara penuh setelah melewati masa tunggu satu bulan sejak berhenti bekerja dan status kepesertaan dinyatakan nonaktif.', 'Dokumen utama yang diperlukan mencakup Kartu Peserta BPJS Ketenagakerjaan, e-KTP, buku tabungan atas nama sendiri yang masih aktif, Kartu Keluarga (KK), NPWP (jika saldo di atas Rp50 juta), serta surat keterangan berhenti bekerja (paklaring).'] },
      { heading: 'Prosedur pengajuan secara online', paragraphs: ['Pengajuan klaim dapat dilakukan tanpa perlu antre di kantor cabang melalui aplikasi JMO (untuk saldo di bawah Rp15 juta) atau melalui portal Lapak Asik (Layanan Tanpa Kontak Fisik) untuk saldo di atas Rp15 juta.', 'Unggah hasil pindai dokumen asli dengan resolusi yang jelas dan ikuti jadwal wawancara verifikasi data video call bila diarahkan oleh sistem. Pastikan nomor kontak dan alamat email tetap aktif selama proses berlangsung.'] },
      { heading: 'Waspada terhadap penipuan dan jasa calo', paragraphs: ['Seluruh proses pengajuan klaim JHT tidak memungut biaya apa pun dari peserta. Hindari menggunakan jasa perantara atau calo yang meminta imbalan persentase atau meminta kode OTP dan kata sandi akun.', 'Menjaga kerahasiaan data pribadi melindungi rekening dan identitas dari penyalahgunaan. Apabila mengalami kendala verifikasi data, hubungi call center resmi 175 atau kunjungi kantor cabang BPJS Ketenagakerjaan terdekat.'] },
    ],
  },
  {
    slug: 'menulis-surat-resign-one-month-notice',
    title: 'Menulis surat pengunduran diri profesional dan mematuhi one month notice',
    description: 'Susun surat resign yang ringkas, serahkan pekerjaan secara tertib, dan jaga reputasi profesional sebelum hari kerja terakhir.',
    category: 'Pengembangan karier',
    date: '2026-11-03',
    image: '/images/articles/kualitas-kerja.webp',
    imageAlt: 'Ilustrasi pekerja menyerahkan surat pengunduran diri secara profesional',
    source: { name: 'Pusat Pasar Kerja Kemnaker', url: 'https://paskerid.kemnaker.go.id/', date: 'Diakses 3 November 2026' },
    sections: [
      { heading: 'Struktur surat pengunduran diri yang tepat', paragraphs: ['Surat resign sebaiknya disusun ringkas, padat, dan netral. Cantumkan pernyataan resmi pengunduran diri, nama posisi saat ini, tanggal efektif hari kerja terakhir sesuai jangka waktu pemberitahuan (notice period), serta ucapan terima kasih atas kesempatan kerja yang diberikan.', 'Hindari mencantumkan keluh kesah, kritik emosional terhadap rekan kerja, atau alasan pribadi yang rumit di dalam naskah surat resmi. Fokuskan dokumen pada kepastian tanggal pengunduran diri dan komitmen serah terima tugas.'] },
      { heading: 'Menjalankan masa notice dan serah terima tugas (handover)', paragraphs: ['Kebanyakan perjanjian kerja menyaratkan pemberitahuan minimal 30 hari kalender (one month notice) sebelum tanggal efektif pengunduran diri. Manfaatkan periode ini untuk merapikan dokumentasi pekerjaan dan menyelesaikan proyek berjalan.', 'Susun dokumen handover yang memuat daftar proyek, lokasi folder berkas penting, daftar kontak pihak terkait, serta status tugas yang akan diteruskan oleh rekan tim pengganti.'] },
      { heading: 'Menyelesaikan administrasi dan hubungan profesional', paragraphs: ['Sebelum hari terakhir, konfirmasi perihal pengembalian aset inventaris kantor (laptop, kartu akses, akun resmi), surat keterangan pengalaman kerja (paklaring), serta perhitungan sisa cuti tahunan dan gaji proporsional (prorata).', 'Menjaga sikap santun hingga hari terakhir membantu menjaga reputasi dan jaringan profesional di industri, yang bermanfaat ketika memerlukan surat rekomendasi atau referensi kerja di masa depan.'] },
    ],
  },
  {
    slug: 'menjawab-pertanyaan-ekspektasi-gaji-wawancara',
    title: 'Cara menjawab pertanyaan ekspektasi gaji saat wawancara kerja',
    description: 'Gunakan data riset pasar kerja, tawarkan rentang yang fleksibel, dan pertimbangkan paket kompensasi secara menyeluruh.',
    category: 'Wawancara',
    date: '2026-11-03',
    image: '/images/articles/gaji.webp',
    imageAlt: 'Ilustrasi percakapan negosiasi upah saat sesi wawancara kerja',
    source: { name: 'Pusat Pasar Kerja Kemnaker', url: 'https://paskerid.kemnaker.go.id/news/107', date: 'Diakses 3 November 2026' },
    sections: [
      { heading: 'Riset standar upah sebelum sesi wawancara', paragraphs: ['Jangan menyebut angka tanpa dasar perbandingan yang jelas. Lakukan riset kisaran gaji untuk posisi, industri, kota penempatan, dan tingkat pengalaman yang setara melalui platform transparansi upah atau laporan pasar kerja.', 'Hitung juga kebutuhan biaya hidup riil jika posisi menuntut relokasi ke kota lain, termasuk biaya transportasi, tempat tinggal, dan estimasi pajak penghasilan yang berlaku.'] },
      { heading: 'Teknik menyampaikan rentang gaji (salary range)', paragraphs: ['Saat pewawancara menanyakan ekspektasi gaji, tawarkan rentang nominal daripada satu angka kaku, misalnya dengan batas bawah merupakan angka terendah yang masih dapat kamu terima dengan nyaman.', 'Sertakan argumen pendukung berupa keterampilan relevan, pengalaman menangani tanggung jawab serupa, atau sertifikasi keahlian yang dapat langsung memberi kontribusi bagi tim.'] },
      { heading: 'Pertimbangkan total paket kompensasi', paragraphs: ['Ingat bahwa penghasilan tidak hanya terdiri dari gaji pokok. Tanyakan tunjangan makan dan transportasi, asuransi kesehatan swasta untuk keluarga, bonus performa, serta fleksibilitas kerja.', 'Sampaikan bahwa nominal akhir bersifat fleksibel dan dapat disesuaikan setelah mengetahui ruang lingkup tanggung jawab penuh serta fasilitas pendukung yang disediakan perusahaan.'] },
    ],
  },
  {
    slug: 'menjawab-kelemahan-diri-saat-wawancara-kerja',
    title: 'Menjawab pertanyaan kelemahan diri saat interview secara jujur dan berbobot',
    description: 'Tinggalkan jawaban klise seperti terlalu perfeksionis. Pilihlah area peningkatan nyata beserta langkah perbaikan yang sedang kamu tempuh.',
    category: 'Wawancara',
    date: '2026-11-03',
    image: '/images/articles/magang.webp',
    imageAlt: 'Ilustrasi kandidat menjawab pertanyaan wawancara kerja dengan tenang dan percaya diri',
    source: { name: 'Pusat Pasar Kerja Kemnaker', url: 'https://paskerid.kemnaker.go.id/news/107', date: 'Diakses 3 November 2026' },
    sections: [
      { heading: 'Tujuan pewawancara menguji kesadaran diri', paragraphs: ['Pertanyaan tentang kekurangan atau kelemahan bertujuan melihat tingkat kesadaran diri (self-awareness), kejujuran, dan kemauan kandidat untuk terus belajar dan memperbaiki diri dalam lingkungan kerja.', 'Hindari jawaban pura-pura seperti "saya terlalu pekerja keras" atau "saya terlalu perfeksionis". Jawaban klise semacam itu sering kali terdengar dibuat-buat dan mengurangi keaslian percakapan.'] },
      { heading: 'Pilih kelemahan yang tidak fatal bagi fungsi utama', paragraphs: ['Pilih area keterampilan non-inti yang memang pernah menjadi tantangan, namun bukan syarat mutlak dari pekerjaan yang dilamar. Contohnya, kesulitan berbicara di depan audiens besar bagi staf analisis data, atau kebiasaan ragu mendelegasikan tugas bagi calon ketua tim baru.', 'Akui tantangan tersebut secara lugas tanpa menyalahkan situasi, rekan kerja, atau tempat kerja sebelumnya.'] },
      { heading: 'Sertakan bukti konkret langkah perbaikan', paragraphs: ['Bagian terpenting dari jawaban adalah tindakan yang sudah dan sedang kamu lakukan untuk mengatasi kelemahan tersebut. Terangkan kursus yang kamu ikuti, metode manajemen waktu yang kamu terapkan, atau cara kamu meminta masukan dari rekan kerja.', 'Menunjukkan proses peningkatan membuktikan kepada perekrut bahwa kamu memiliki pola pikir bertumbuh (growth mindset) dan tanggap terhadap evaluasi kerja.'] },
    ],
  },
  {
    slug: 'perbedaan-status-karyawan-pkwt-dan-pkwtt',
    title: 'Perbedaan karyawan kontrak (PKWT) dan tetap (PKWTT) yang wajib dipahami',
    description: 'Pahami batasan jenis pekerjaan yang boleh dikontrak, perlindungan hak kompensasi, uang pesangon, dan kepastian masa kerja.',
    category: 'Hak pekerja',
    date: '2026-11-03',
    image: '/images/articles/perlindungan.webp',
    imageAlt: 'Ilustrasi dokumen perbandingan status hubungan kerja kontrak dan tetap',
    source: { name: 'JDIH Kementerian Ketenagakerjaan', url: 'https://jdih.kemnaker.go.id/', date: 'PP Nomor 35 Tahun 2021' },
    sections: [
      { heading: 'Sifat pekerjaan dan batasan jangka waktu', paragraphs: ['PKWT (kontrak) hanya boleh diadakan untuk pekerjaan yang selesai dalam waktu tertentu, bersifat musiman, pekerjaan yang berhubungan dengan produk baru atau kegiatan baru, dan pekerjaan yang sekali selesai dengan batas maksimal total 5 tahun termasuk perpanjangan.', 'PKWT dilarang diadakan untuk pekerjaan yang bersifat tetap atau terus-menerus. Jika pekerjaan bersifat rutin dan bagian inti operasional, status yang seharusnya diterapkan adalah PKWTT (karyawan tetap).'] },
      { heading: 'Perbedaan hak saat hubungan kerja berakhir', paragraphs: ['Karyawan PKWT yang masa kontraknya selesai berhak menerima uang kompensasi PKWT berdasarkan masa kerja yang telah dijalani, namun tidak memperoleh uang pesangon atau uang penghargaan masa kerja (UPMK).', 'Sebaliknya, karyawan PKWTT yang mengalami pemutusan hubungan kerja berhak atas uang pesangon, UPMK, dan penggantian hak sesuai alasan pengakhiran yang diatur dalam regulasi perundang-undangan.'] },
      { heading: 'Masa percobaan dan pembatalan demi hukum', paragraphs: ['Status PKWTT mengizinkan adanya masa percobaan (probation) maksimal 3 bulan dengan upah layak, sedangkan PKWT sama sekali tidak boleh mensyaratkan masa percobaan.', 'Memahami klausul status kerja dalam draf kontrak sebelum membubuhkan tanda tangan memastikan ekspektasi karier, perlindungan hukum, dan hak finansial terjamin sejak hari pertama bekerja.'] },
    ],
  },
  {
    slug: 'mengenali-tanda-burnout-dan-beban-kerja',
    title: 'Mengenali tanda burnout kerja dan cara mengomunikasikan beban ke tim',
    description: 'Ketahui perbedaan kelelahan fisik sementara dengan burnout berkepanjangan, serta langkah konkret menata ulang prioritas tugas.',
    category: 'Kesehatan kerja',
    date: '2026-11-03',
    image: '/images/articles/kualitas-kerja.webp',
    imageAlt: 'Ilustrasi pekerja beristirahat dan menata ulang prioritas beban pekerjaan',
    source: { name: 'Kementerian Ketenagakerjaan', url: 'https://e-training.kemnaker.go.id/', date: 'Diakses 3 November 2026' },
    sections: [
      { heading: 'Gejala burnout fisik dan emosional', paragraphs: ['Burnout ditandai oleh kelelahan kronis yang tidak kunjung pulih meski telah beristirahat di akhir pekan, menurunnya rasa pencapaian kerja (inefficacy), serta munculnya sinisme atau sikap apatis terhadap tanggung jawab harian.', 'Mengabaikan tanda burnout dapat berdampak pada penurunan konsentrasi, gangguan tidur, hingga masalah kesehatan fisik yang berpotensi memicu kesalahan kerja fatal.'] },
      { heading: 'Inventarisasi tugas dan jam kerja riil', paragraphs: ['Langkah awal mengatasi kelebihan beban adalah mendokumentasikan seluruh pekerjaan yang sedang ditangani. Catat perkiraan waktu pengerjaan setiap tugas, tingkat urgensi, dan pihak yang meminta hasil pekerjaan.', 'Identifikasi tugas mana yang merupakan prioritas strategis dan tugas mana yang bisa didelegasikan, disederhanakan, atau ditunda tanpa mengganggu operasional tim.'] },
      { heading: 'Membicarakan penyesuaian beban dengan atasan', paragraphs: ['Jadwalkan sesi diskusi satu-lawan-satu (1-on-1) bersama atasan. Bawa daftar tugas riil dan tanyakan urutan prioritas yang diharapkan jika sumber daya dan waktu terbatas.', 'Sampaikan kendala secara profesional berbasis data kapasitas kerja daripada keluhan personal, sehingga atasan dapat membantu mengatur ulang pembagian tugas dalam tim.'] },
    ],
  },
  {
    slug: 'etika-mengirim-email-lamaran-dan-pesan-linkedin',
    title: 'Etika mengirim email lamaran kerja dan pesan profesional di LinkedIn',
    description: 'Gunakan subjek email yang informatif, naskah pembuka yang santun dan personal, serta lampiran berkas yang rapi agar dilirik rekruter.',
    category: 'Cari kerja',
    date: '2026-11-03',
    image: '/images/articles/lowongan.webp',
    imageAlt: 'Ilustrasi pencari kerja menulis pesan pengantar lamaran kerja profesional',
    source: { name: 'Pusat Pasar Kerja Kemnaker', url: 'https://paskerid.kemnaker.go.id/', date: 'Diakses 3 November 2026' },
    sections: [
      { heading: 'Format subjek dan salam pembuka email', paragraphs: ['Cantumkan subjek email yang jelas dan sesuai instruksi lowongan, misalnya: "Lamaran Kerja - Posisi - Nama Lengkap". Subjek yang kosong atau terlalu umum berisiko terlewat atau masuk ke folder spam rekruter.', 'Jangan pernah mengirim email lamaran dengan badan pesan (body email) kosong yang hanya berisi berkas lampiran. Tulis salam profesional dan pengantar singkat 2-3 paragraf mengenai posisi yang dilamar.'] },
      { heading: 'Etika menghubungi di LinkedIn (networking & cold outreach)', paragraphs: ['Saat ingin mengirim pesan perkenalan kepada rekruter atau manajer di LinkedIn, sertakan catatan singkat yang sopan. Jelaskan konteks ketertarikanmu pada perusahaan dan tautkan referensi portofolio yang relevan.', 'Hindari langsung meminta pekerjaan secara mendesak atau mengirim berkas CV tanpa diminta. Bangun percakapan dengan bertanya mengenai budaya tim atau proses perekrutan yang sedang berjalan.'] },
      { heading: 'Kerapian lampiran berkas lamaran', paragraphs: ['Beri nama dokumen lampiran secara profesional, contohnya "CV_NamaLengkap_Posisi.pdf", bukan nama acak dari unduhan. Pastikan ukuran berkas tidak terlalu besar (idealnya di bawah 2 MB) agar mudah dibuka di perangkat mobile.', 'Periksa kembali alamat email penerima dan pastikan tidak mengirim satu email lamaran massal dengan mode tembusan terbuka (CC) ke puluhan perusahaan sekaligus.'] },
    ],
  },
  {
    slug: 'membuat-portofolio-digital-tanpa-koding',
    title: 'Cara membuat portofolio digital gratis untuk non-teknis tanpa koding',
    description: 'Manfaatkan dokumen daring, PDF interaktif, atau laman web gratis untuk menampilkan studi kasus dan hasil kerja nyata.',
    category: 'Pengembangan karier',
    date: '2026-11-03',
    image: '/images/articles/magang.webp',
    imageAlt: 'Ilustrasi seseorang merancang portofolio kerja digital pada layar laptop',
    source: { name: 'Kemnaker, materi pelatihan pencari kerja', url: 'https://e-training.kemnaker.go.id/', date: 'Diakses 3 November 2026' },
    sections: [
      { heading: 'Pilihan media portofolio yang mudah diakses', paragraphs: ['Kandidat di bidang pemasaran, penulisan konten, desain, manajemen proyek, maupun administrasi tidak harus membangun situs web dari nol dengan kode rumit untuk memiliki portofolio yang menarik.', 'Dokumen presentasi ringkas, Google Drive publik dengan susunan folder rapi, Notion page, atau PDF satu halaman yang dilengkapi tautan interaktif sudah sangat memadai bagi rekruter untuk mengevaluasi karya.'] },
      { heading: 'Struktur studi kasus yang efektif', paragraphs: ['Setiap karya dalam portofolio sebaiknya disajikan dalam format studi kasus sederhana: latar belakang masalah, peran dan tanggung jawab pribadimu, proses penyelesaian, serta hasil akhir yang terukur.', 'Jika pekerjaan tersebut berupa kerja tim, jelaskan secara transparan bagian mana yang kamu kerjakan sendiri guna menunjukkan integritas dan akuntabilitas kerja.'] },
      { heading: 'Memastikan aksesibilitas dan privasi data', paragraphs: ['Uji coba tautan portofolio dalam mode penyamaran (incognito window) untuk memastikan dokumen dapat dibuka oleh pihak luar tanpa harus meminta izin akses (request access).', 'Selalu samarkan data rahasia perusahaan, nama klien, atau metrik finansial sensitif dari tempat kerja lama sebelum mempublikasikannya ke dalam portofolio umum.'] },
    ],
  },
  {
    slug: 'hak-cuti-melahirkan-dan-keluarga-pekerja',
    title: 'Hak cuti melahirkan, cuti haid, dan pendampingan keluarga bagi pekerja',
    description: 'Pelajari ketentuan cuti melahirkan dalam UU Kesejahteraan Ibu dan Anak, hak upah penuh, serta cuti pendampingan bagi suami.',
    category: 'Hak pekerja',
    date: '2026-11-03',
    image: '/images/articles/perlindungan.webp',
    imageAlt: 'Ilustrasi pekerja dan keluarga berkonsultasi mengenai hak ketenagakerjaan',
    source: { name: 'JDIH Kementerian Ketenagakerjaan', url: 'https://jdih.kemnaker.go.id/', date: 'UU Nomor 4 Tahun 2024 tentang Kesejahteraan Ibu dan Anak' },
    sections: [
      { heading: 'Ketentuan cuti melahirkan dan perlindungan upah', paragraphs: ['Undang-Undang Nomor 4 Tahun 2024 tentang Kesejahteraan Ibu dan Anak pada Fase Seribu Hari Pertama Kehidupan memperkuat hak cuti melahirkan bagi pekerja perempuan paling singkat 3 (tiga) bulan, dan dapat diperpanjang hingga 3 bulan berikutnya apabila terdapat kondisi medis khusus yang dibuktikan dengan surat keterangan dokter.', 'Selama menjalani cuti melahirkan, pekerja berhak memperoleh upah penuh untuk tiga bulan pertama dan bulan keempat, serta 75% upah untuk bulan kelima dan keenam, tanpa ancaman pemutusan hubungan kerja.'] },
      { heading: 'Cuti pendampingan bagi suami (paternity leave)', paragraphs: ['Regulasi terbaru juga mengatur hak cuti pendampingan bagi suami saat istri melahirkan selama 2 (dua) hari dan dapat diberikan tambahan waktu hingga paling lama 3 (tiga) hari berikutnya atau sesuai kesepakatan perusahaan.', 'Untuk kondisi istri yang mengalami keguguran kandungan, suami juga berhak atas cuti pendampingan selama 2 hari guna memberikan dukungan perawatan dan pemulihan keluarga.'] },
      { heading: 'Hak cuti haid dan prosedur pengajuan internal', paragraphs: ['Pekerja perempuan yang merasakan sakit saat masa haid dan memberitahukan kepada pemberi kerja tidak wajib bekerja pada hari pertama dan kedua waktu haid dengan tetap memperoleh upah penuh.', 'Pastikan prosedur administrasi internal kantor dipatuhi dengan menyampaikan surat pemberitahuan atau keterangan medis bila disyaratkan dalam perjanjian kerja bersama (PKB) atau peraturan perusahaan (PP).'] },
    ],
  },
  {
    slug: 'cara-membaca-slip-gaji-dan-pajak-pph21-ter',
    title: 'Cara membaca slip gaji dan memahami potongan tarif efektif PPh 21 (TER)',
    description: 'Kenali perbedaan penghasilan bruto dan neto, iuran BPJS yang ditanggung karyawan vs kantor, dan skema pemotongan pajak bulanan TER.',
    category: 'Gaji',
    date: '2026-11-03',
    image: '/images/articles/gaji.webp',
    imageAlt: 'Ilustrasi lembar slip gaji dan rincian pemotongan upah karyawan',
    source: { name: 'Direktorat Jenderal Pajak', url: 'https://pajak.go.id/', date: 'PP Nomor 58 Tahun 2023 & PMK 168/2023' },
    sections: [
      { heading: 'Komponen pendapatan bruto vs penghasilan neto', paragraphs: ['Slip gaji mencatat penghasilan bruto (gaji pokok, tunjangan tetap seperti tunjangan makan, dan tunjangan variabel seperti lembur) serta seluruh potongan wajib sebelum menghasilkan upah bersih (take-home pay) yang ditransfer ke rekening pekerja.', 'Memahami komponen ini membantu membedakan mana hak upah yang menjadi dasar perhitungan lembur dan jaminan sosial dari sekadar fasilitas penunjang kerja.'] },
      { heading: 'Skema pemotongan pajak PPh 21 dengan Tarif Efektif Rata-rata (TER)', paragraphs: ['Sejak diberlakukannya PP No. 58 Tahun 2023, penghitungan PPh Pasal 21 bulanan dari Januari hingga November menggunakan skema Tarif Efektif Rata-rata (TER) yang didasarkan pada status Penghasilan Tidak Kena Pajak (PTKP) dan rentang penghasilan bruto bulanan.', 'Pada bulan Desember, perusahaan akan melakukan penyesuaian perhitungan tahunan untuk memastikan total pajak yang dipotong selama setahun sesuai dengan tarif progresif Pasal 17 UU PPh, yang dapat mengakibatkan perbedaan nominal potongan di akhir tahun.'] },
      { heading: 'Iuran jaminan sosial pekerja dan pemberi kerja', paragraphs: ['Slip gaji juga merinci iuran BPJS Kesehatan dan Ketenagakerjaan. Sebagian iuran ditanggung langsung oleh perusahaan (seperti JKK dan JKM penuh serta porsi besar BPJS Kesehatan dan JHT), sedangkan sebagian kecil dipotong dari gaji pekerja (seperti 2% untuk JHT dan 1% untuk BPJS Kesehatan).', 'Periksa slip gaji setiap bulan untuk memastikan seluruh pemotongan memiliki dasar tertulis yang sah dan iuran jaminan disetorkan secara teratur.'] },
    ],
  },
  {
    slug: 'cara-menghadapi-micromanagement-di-kantor',
    title: 'Strategi menghadapi atasan micromanagement secara konstruktif',
    description: 'Bangun kepercayaan dengan pembaruan progres yang proaktif, sepakati ekspektasi di awal, dan ciptakan ruang kerja yang lebih mandiri.',
    category: 'Dunia kerja',
    date: '2026-11-03',
    image: '/images/articles/kualitas-kerja.webp',
    imageAlt: 'Ilustrasi diskusi tim kerja mengenai progres pekerjaan harian secara transparan',
    source: { name: 'Pusat Pasar Kerja Kemnaker', url: 'https://paskerid.kemnaker.go.id/', date: 'Diakses 3 November 2026' },
    sections: [
      { heading: 'Memahami akar perilaku micromanagement', paragraphs: ['Sikap atasan yang terlalu mengatur detail kecil sering kali berakar dari rasa cemas terhadap risiko kesalahan, tekanan tinggi dari manajemen atas, atau pengalaman buruk terkait tenggat waktu yang terlewat di masa lalu.', 'Menyadari bahwa micromanagement biasanya berkaitan dengan kebutuhan atasan akan kontrol dan kepastian membantu pekerja merespons dengan pendekatan solutif tanpa defensif.'] },
      { heading: 'Kirimkan pembaruan kerja sebelum diminta', paragraphs: ['Cara paling efektif meredakan micromanagement adalah proaktif memberikan kabar berkala (over-communicate). Kirimkan ringkasan singkat progres kerja, kendala yang dihadapi, dan langkah selanjutnya di awal atau akhir hari kerja.', 'Ketika atasan melihat bahwa pekerjaan berjalan teratur dan terdokumentasi dengan rapi, tingkat kecemasan mereka akan menurun dan frekuensi pemeriksaan detail cenderung berkurang secara bertahap.'] },
      { heading: 'Sepakati definisi selesai dan batas kewenangan', paragraphs: ['Di awal penugasan baru, tanyakan secara jelas parameter keberhasilan tugas, batas waktu review, dan area mana yang menjadi kewenangan mandiri anggota tim.', 'Jika atasan terus merevisi hal-hal minor yang tidak memengaruhi substansi, ajukan diskusi berkala untuk menyelaraskan standar kualitas yang diharapkan bersama.'] },
    ],
  },
  {
    slug: 'transisi-freelance-ke-karyawan-penuh-waktu',
    title: 'Transisi dari pekerja lepas ke karyawan penuh waktu: adaptasi dan persiapan',
    description: 'Kemas pengalaman proyek mandiri menjadi bukti kompetensi kerja sama tim, pahami jam kerja terstruktur, dan sesuaikan pola finansial.',
    category: 'Transisi karier',
    date: '2026-11-03',
    image: '/images/articles/pasar-kerja.webp',
    imageAlt: 'Ilustrasi pekerja lepas beralih ke lingkungan kerja kantor dan organisasi terstruktur',
    source: { name: 'Pusat Pasar Kerja Kemnaker', url: 'https://paskerid.kemnaker.go.id/', date: 'Diakses 3 November 2026' },
    sections: [
      { heading: 'Menyusun CV dari pengalaman freelance', paragraphs: ['Alih-alih mencantumkan puluhan klien kecil secara terpisah, kelompokkan pengalaman freelance berdasarkan keahlian utama atau lingkup industri. Jelaskan peranmu sebagai profesional mandiri yang mengelola proyek dari perencanaan hingga penyelesaian.', 'Sorot kemampuan manajemen waktu, komunikasi dengan klien, ketepatan tenggat, dan hasil nyata yang dapat diverifikasi tanpa membocorkan kerahasiaan proyek klien sebelumnya.'] },
      { heading: 'Adaptasi terhadap ritme dan struktur organisasi kantor', paragraphs: ['Bekerja sebagai karyawan penuh waktu menuntut kemampuan berkoordinasi dalam hierarki tim, mengikuti jadwal rapat rutin, dan beradaptasi dengan proses persetujuan multi-level yang mungkin terasa lebih lambat daripada saat bekerja solo.', 'Gunakan pengalaman fleksibilitasmu untuk menjadi anggota tim yang mandiri dalam eksekusi tugas, namun tetap terbuka terhadap arahan pimpinan dan umpan balik rekan kerja.'] },
      { heading: 'Menata kembali stabilitas finansial dan fasilitas kerja', paragraphs: ['Transisi ke kerja tetap memberikan kepastian arus kas bulanan serta fasilitas jaminan sosial, asuransi kesehatan, dan hak cuti tahunan yang sebelumnya harus ditanggung secara mandiri.', 'Sesuaikan kembali anggaran pribadi dengan memperhitungkan komponen potongan pajak bulanan, biaya perjalanan ke kantor, dan alokasikan stabilitas pendapatan untuk tabungan dana darurat jangka panjang.'] },
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

articles.push(...extraArticles)

const defaultAuthor = { name: 'Tim Editorial KerjaGimana', role: 'Penulis' }
const defaultReviewer = { name: 'Tim Editorial KerjaGimana', role: 'Peninjau' }

for (const article of articles) {
  const seo = articleSeo[article.slug]
  if (seo) {
    article.title = seo.title
    article.description = seo.description
  }
  article.author ??= defaultAuthor
  article.reviewer ??= defaultReviewer
  article.reviewedAt ??= article.date
  article.keywords ??= [
    article.category.toLocaleLowerCase('id-ID'),
    ...article.title.toLocaleLowerCase('id-ID').replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(word => word.length > 4).slice(0, 6),
  ]
  const deepDive = articleDeepDives[article.slug]
  if (deepDive) article.sections.push(...deepDive)
}

for (const article of articles) {
  const note = practicalNotes[article.slug]
  if (note) article.sections.push(note)
}
