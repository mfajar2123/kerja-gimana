<script setup lang="ts">
const route = useRoute()
type InfoContent = { kicker: string; title: string; paragraphs: string[]; note?: string }
const info: Record<string, InfoContent> = {
  '/tentang': {
    kicker: 'TENTANG KERJAGIMANA', title: 'Pilih tempat kerja dengan lebih banyak informasi.',
    paragraphs: [
      'KerjaGimana membantu pencari kerja mengenal perusahaan lewat pengalaman kerja, ringkasan gaji, dan cerita interview yang dibagikan oleh komunitas.',
      'Informasi publik melewati moderasi manusia. Satu cerita tidak mewakili semua orang, dan ulasan yang diterbitkan tidak menampilkan identitas akun penulis.',
      'Kami membantu kamu membaca pola dan konteks dari kontribusi komunitas. Moderasi tidak menjamin semua cerita benar atau mewakili seluruh karyawan. Keputusan kerja tetap ada di tanganmu.',
      'Berikutnya, kami merencanakan Kompas Karier AI: asisten riset karier dengan rujukan sumber dan batas data yang jelas. Fitur ini masih Coming soon dan belum tersedia untuk digunakan.',
    ],
  },
  '/panduan-review': {
    kicker: 'PANDUAN BERBAGI PENGALAMAN', title: 'Ceritakan yang kamu alami. Jaga agar tetap adil.',
    paragraphs: [
      'Tulis berdasarkan pengalamanmu sendiri. Bedakan hal yang kamu alami, pendapatmu, dan fakta yang bisa dipastikan orang lain. Berikan konteks yang cukup tanpa membuat klaim yang tidak bisa kamu dukung.',
      'Hindari nama orang, email, nomor telepon, alamat, informasi klien, dokumen rahasia, dan detail yang dapat mengenali orang lain. Jabatan dan periode kerja juga dapat membantu seseorang menebak identitasmu.',
      'Moderasi memeriksa privasi, spam, serangan personal, dan klaim faktual. Cerita tidak diterbitkan otomatis. Jika ditolak, baca catatan moderator di Kontribusi saya sebelum mengirim cerita yang sudah diperbaiki.',
      'Review tidak dijual kepada perusahaan dan tidak dapat dihapus karena ketidaksukaan terhadap rating. Gunakan tombol laporan untuk memberi tahu moderator tentang masalah pada review yang sudah diterbitkan.',
    ],
  },
  '/privasi': {
    kicker: 'KEBIJAKAN PRIVASI', title: 'Cara KerjaGimana mengelola informasi dan privasimu.',
    note: 'Terakhir diperbarui: 2 November 2026. Jika kebijakan ini tidak menjawab pertanyaanmu, hubungi kami melalui formulir kontak.',
    paragraphs: [
      'Kebijakan ini menjelaskan informasi yang diproses saat kamu membaca situs, membuat akun, mengirim kontribusi, atau menghubungi KerjaGimana. KerjaGimana menyediakan pencarian perusahaan, ulasan pengalaman kerja, cerita interview, dan ringkasan gaji.',
      'Pengelola situs: Fajar, pemilik individu KerjaGimana. Untuk pertanyaan privasi atau permintaan terkait data, hubungi pengelola melalui formulir di halaman Kontak.',
      'Informasi akun: saat mendaftar atau masuk, kami memproses alamat email, ID akun, nama tampilan yang kamu pilih, status akun, serta kredensial autentikasi yang dikelola penyedia layanan autentikasi. Kata sandi tidak ditampilkan kepada pengguna lain. Email dan ID akun tidak ditampilkan bersama ulasan publik.',
      'Informasi kontribusi: ulasan, laporan gaji, cerita interview, usulan perusahaan, tanggapan perusahaan, dan pesan kontak diproses sesuai fitur yang kamu gunakan. Kontribusi dapat dibaca moderator untuk memeriksa spam, privasi, kelayakan, atau sengketa. Jangan masukkan data pribadi orang lain, informasi klien, atau rahasia perusahaan.',
      'Publikasi dan anonimitas: ulasan yang disetujui ditampilkan tanpa nama, email, atau ID akun penulis. Namun, jabatan, periode kerja, rincian kejadian, dan gabungan informasi lain bisa membuat seseorang menebak identitasmu. Kami tidak dapat menjamin anonimitas mutlak. Ringkasan gaji hanya ditampilkan bila kelompok memiliki sedikitnya lima pelapor unik; kelompok kecil disembunyikan dan nilai median dibulatkan.',
      'Penggunaan informasi: kami menggunakan data untuk menjalankan akun, mengirim tautan verifikasi atau pemulihan, menampilkan dan memoderasi kontribusi, menanggapi pesan, menjaga keamanan, mencegah penyalahgunaan, dan memperbaiki layanan. Kami tidak menjual ulasan kepada perusahaan. Jika iklan Google AdSense diaktifkan, informasi teknis dan cookie dapat diproses oleh Google serta mitra iklannya untuk menayangkan, mengukur, dan mencegah penyalahgunaan iklan sesuai pengaturan yang tersedia.',
      'Cookie dan penyimpanan lokal: cookie sesi diperlukan agar autentikasi dan fitur akun berfungsi. Jika AdSense digunakan, Google dan vendor pihak ketiga dapat menggunakan cookie untuk menayangkan iklan berdasarkan kunjungan sebelumnya ke situs ini atau situs lain. Kamu dapat mengatur iklan yang dipersonalisasi melalui Google Ads Settings (https://adssettings.google.com/) atau memilih keluar dari cookie iklan sebagian vendor melalui https://www.aboutads.info/choices/. Menonaktifkan cookie sesi dapat mengganggu fitur masuk.',
      'Penyedia layanan dan pemrosesan: autentikasi serta basis data disediakan melalui Supabase, sementara situs dan infrastrukturnya berjalan melalui Cloudflare. Jika iklan diaktifkan, Google dan mitra iklan yang dipilih dalam pengaturan AdSense dapat memproses data untuk layanan iklan. Penyedia dapat memproses informasi dari lokasi infrastruktur mereka; lokasi dan periode retensi spesifik mengikuti pengaturan akun serta kebijakan penyedia yang berlaku.',
      'Penyimpanan: informasi akun dan kontribusi disimpan selama akun atau layanan terkait masih digunakan. Jika kamu menghapus akun melalui Pengaturan, akun dan kontribusi yang dikirim akan dihapus dari layanan dan ringkasan terkait dihitung ulang. Salinan cadangan, catatan keamanan, atau data yang harus disimpan untuk menangani kewajiban dan penyalahgunaan dapat memiliki siklus penghapusan berbeda sesuai sistem penyedia layanan.',
      'Pilihan dan permintaan: kamu dapat memperbarui nama tampilan, meminta penghapusan akun melalui Pengaturan, atau menghubungi kami untuk pertanyaan dan permintaan terkait informasi melalui halaman Kontak (https://kerjagimana.live/kontak). Untuk melindungi akun, kami dapat meminta verifikasi sebelum memproses permintaan. Penghapusan akun juga menghapus kontribusimu sebagaimana dijelaskan di atas.',
      'Keamanan: kami menggunakan kontrol akses, moderasi, dan perlindungan teknis yang sesuai dengan fitur layanan. Tidak ada transmisi atau penyimpanan daring yang dapat dijamin aman sepenuhnya. Jangan mengirim informasi sensitif yang tidak diperlukan.',
      'Perubahan kebijakan: jika cara pemrosesan berubah, halaman ini akan diperbarui beserta tanggal pembaruannya. Untuk pertanyaan privasi atau keluhan, gunakan formulir di halaman Kontak. Kebijakan ini menjelaskan praktik produk yang berjalan dan bukan nasihat hukum.',
    ],
  },
  '/ketentuan': {
    kicker: 'KETENTUAN LAYANAN', title: 'Ketentuan layanan — draf untuk ditinjau.',
    note: 'Dokumen ini adalah draf editorial dan belum ditinjau penasihat hukum. Periksa kembali seluruh ketentuan sebelum layanan publik diluncurkan.',
    paragraphs: [
      'Pengguna bertanggung jawab mengirim informasi yang benar, berasal dari pengalaman sendiri, tidak mengungkap informasi rahasia atau pribadi, dan dapat dijelaskan dengan adil.',
      'Kontribusi ditinjau manusia sebelum diterbitkan. KerjaGimana dapat meminta klarifikasi, meminta perubahan, menahan, atau menghapus konten untuk melindungi privasi, mencegah penyalahgunaan, atau menangani sengketa.',
      'Review dapat memuat pendapat pribadi dan pengalaman yang berbeda. KerjaGimana tidak menjamin satu review mewakili seluruh karyawan atau menjadi saran karier.',
      'Pengguna dapat melaporkan konten. Perusahaan yang sudah diverifikasi admin dapat mengirim tanggapan melalui moderasi. Akses perwakilan tidak memberi hak mengubah review, rating, atau identitas penulis.',
      'Pengaturan kewajiban pengguna, keberatan perusahaan, penghapusan akun, dan penyelesaian sengketa memerlukan pemeriksaan hukum sebelum menjadi ketentuan yang mengikat.',
    ],
  },
}
const content = computed(() => info[route.path])
if (!content.value) throw createError({ statusCode: 404, statusMessage: 'Halaman tidak ditemukan.' })
useSeoMeta({ title: () => `${content.value?.kicker} — KerjaGimana`, description: () => content.value?.title, robots: route.path === '/privasi' || route.path === '/ketentuan' ? 'noindex' : 'index,follow' })
</script>

<template>
  <article v-if="content" class="page-editorial information-page">

    <header class="info-intro"><h1>{{ content.title }}</h1></header>
    <p v-if="content.note" class="legal-draft-notice">{{ content.note }}</p>
    <div class="info-prose"><p v-for="(paragraph,index) in content.paragraphs" :key="index">{{ paragraph }}</p></div>
    <div v-if="route.path === '/privasi'" class="info-prose"><h2>Dokumen terkait</h2><ul><li><NuxtLink to="/ketentuan">Ketentuan layanan</NuxtLink></li><li><NuxtLink to="/panduan-review">Panduan berbagi pengalaman</NuxtLink></li><li><NuxtLink to="/kontak">Hubungi KerjaGimana</NuxtLink></li></ul></div>
    <NuxtLink v-if="route.path === '/panduan-review'" class="button button-red" to="/tulis-review">Tulis review</NuxtLink>
  </article>
</template>
