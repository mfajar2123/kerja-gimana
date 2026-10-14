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
    kicker: 'KEBIJAKAN PRIVASI', title: 'Privasi — draf untuk ditinjau secara profesional.',
    note: 'Dokumen ini adalah draf yang perlu ditinjau penasihat hukum sebelum layanan dibuka untuk publik. Konten ini bukan pernyataan kepatuhan hukum.',
    paragraphs: [
      'Layanan menggunakan email akun untuk pendaftaran, verifikasi, pemulihan, keamanan akun, dan pengelolaan kontribusi. Alamat email dan ID akun penulis tidak ditampilkan pada review publik.',
      'Kontribusi kerja, gaji, dan interview dapat dibaca moderator untuk pemeriksaan. Review terbit ditampilkan tanpa identitas akun; detail jabatan, rentang kerja, isi cerita, atau kondisi kelompok gaji tetap dapat memberi petunjuk identitas. Kami tidak menjanjikan anonimitas mutlak.',
      'Laporan gaji hanya diringkas setelah sekurangnya lima pelapor unik pada kelompok yang sama. Kelompok kecil disembunyikan, median dibulatkan, dan tidak tersedia rincian pendapatan individu.',
      'Kamu dapat mengakses, memperbaiki, atau meminta penghapusan akun lewat pengaturan. Menghapus akun juga menghapus kontribusi yang pernah kamu kirim dan menyebabkan agregat dihitung ulang. Permintaan kontak dipakai untuk menjawab pesan.',
      'Layanan menggunakan cookies sesi untuk menjaga login. Endpoint privat tidak disimpan pada cache publik. Log teknis harus membatasi data yang dapat mengenali pengguna dan tidak memuat isi submission.',
      'Sebelum peluncuran publik, lengkapi nama operator, alamat kontak privasi, periode retensi, lokasi pemrosesan data, mekanisme pengaduan, serta peninjauan kewajiban sistem elektronik yang berlaku.',
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
    <div class="page-kicker"><span class="eyebrow-mark"/>{{ content.kicker }}</div>
    <header class="info-intro"><h1>{{ content.title }}</h1></header>
    <p v-if="content.note" class="legal-draft-notice">{{ content.note }}</p>
    <div class="info-prose"><p v-for="(paragraph,index) in content.paragraphs" :key="index">{{ paragraph }}</p></div>
    <div v-if="route.path === '/privasi'" class="info-prose"><h2>Dokumen terkait</h2><ul><li><NuxtLink to="/ketentuan">Ketentuan layanan — draf</NuxtLink></li><li><NuxtLink to="/panduan-review">Panduan moderasi review</NuxtLink></li></ul></div>
    <NuxtLink v-if="route.path === '/panduan-review'" class="button button-red" to="/tulis-review">Tulis review</NuxtLink>
  </article>
</template>
