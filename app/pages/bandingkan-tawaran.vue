<script setup lang="ts">
useSeoMeta({ title: 'Bandingkan tawaran kerja dan gaji — KerjaGimana', description: 'Bandingkan dua tawaran kerja berdasarkan gaji, tunjangan, potongan, dan biaya kerja bulanan.' })
const config = useRuntimeConfig()
const canonical = `${config.public.siteUrl.replace(/\/$/, '')}/bandingkan-tawaran`
useHead({ link: [{ rel: 'canonical', href: canonical }] })

type Offer = { name: string; salary: string; allowance: string; deductions: string; expenses: string }
const offers = reactive<Offer[]>([
  { name: '', salary: '', allowance: '', deductions: '', expenses: '' },
  { name: '', salary: '', allowance: '', deductions: '', expenses: '' },
])
const fields = [
  { key: 'salary', label: 'Gaji bruto per bulan', help: 'Gaji sebelum potongan. Wajib diisi.' },
  { key: 'allowance', label: 'Tunjangan tetap per bulan', help: 'Jumlah tunjangan rutin di luar gaji yang dimasukkan di atas.' },
  { key: 'deductions', label: 'Potongan per bulan', help: 'Masukkan perkiraan pajak, iuran, dan potongan lain yang kamu ketahui.' },
  { key: 'expenses', label: 'Biaya kerja per bulan', help: 'Misalnya transportasi, makan tambahan, atau biaya kerja lainnya.' },
] as const
const amounts = (offer: Offer) => fields.map(field => offer[field.key] === '' ? 0 : Number(offer[field.key]))
const isValid = (offer: Offer) => offer.salary !== '' && amounts(offer).every(value => Number.isSafeInteger(value) && value >= 0 && value <= 10000000000)
const net = (offer: Offer) => {
  const [salary = 0, allowance = 0, deductions = 0, expenses = 0] = amounts(offer)
  return salary + allowance - deductions - expenses
}
const format = (value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)
const bothValid = computed(() => offers.every(isValid))
const difference = computed(() => Math.abs(net(offers[0]!) - net(offers[1]!)))
const higher = computed(() => net(offers[0]!) > net(offers[1]!) ? 0 : 1)
</script>

<template>
  <section class="page-editorial information-page offer-page">
    <header class="info-intro">
      <h1>Bandingkan tawaran.<br><span class="type-red">Hitung lebih jelas.</span></h1>
      <p>Bandingkan perkiraan uang yang tersisa setiap bulan setelah potongan dan biaya kerja. Isi berdasarkan rincian masing-masing tawaran.</p>
    </header>
    <div class="offer-grid">
      <fieldset v-for="(offer, index) in offers" :key="index" class="offer-card">
        <legend>Tawaran {{ index === 0 ? 'A' : 'B' }}</legend>
        <div class="product-field"><label :for="`name-${index}`">Nama perusahaan atau posisi <span>(opsional)</span></label><input :id="`name-${index}`" v-model.trim="offer.name" maxlength="80" placeholder="Contoh: Perusahaan A"></div>
        <div v-for="field in fields" :key="field.key" class="product-field">
          <label :for="`${field.key}-${index}`">{{ field.label }} <span>(Rp)</span></label>
          <input :id="`${field.key}-${index}`" v-model="offer[field.key]" type="number" inputmode="numeric" min="0" max="10000000000" step="1" :required="field.key === 'salary'" :aria-describedby="`${field.key}-help-${index}`" placeholder="0">
          <small :id="`${field.key}-help-${index}`">{{ field.help }}</small>
        </div>
        <div class="offer-result" aria-live="polite"><span>Perkiraan tersisa per bulan</span><strong>{{ isValid(offer) ? format(net(offer)) : 'Isi gaji dan periksa nominal' }}</strong></div>
      </fieldset>
    </div>
    <div v-if="bothValid" class="offer-summary" aria-live="polite">
      <h2>Hasil perbandingan</h2>
      <p v-if="difference === 0">Kedua tawaran menghasilkan perkiraan yang sama setelah potongan dan biaya yang kamu masukkan.</p>
      <p v-else>{{ offers[higher]?.name || (higher === 0 ? 'Tawaran A' : 'Tawaran B') }} menyisakan sekitar <strong>{{ format(difference) }} lebih banyak per bulan</strong> berdasarkan angka yang diisi.</p>
    </div>
    <div class="offer-guidance info-prose">
      <h2>Cara membaca hasil</h2>
      <p>Hasil dihitung dari gaji bruto ditambah tunjangan tetap, dikurangi potongan dan biaya kerja yang kamu isi. Jumlah negatif berarti pengeluaran dan potongan yang dimasukkan melebihi penghasilan tersebut.</p>
      <p>Perhitungan ini tidak menghitung pajak, BPJS, bonus, THR, atau lembur secara otomatis. Mintalah rincian tertulis kepada perekrut dan gunakan angka yang sesuai dengan situasimu. Jangan memasukkan bonus tidak tetap sebagai tunjangan tetap.</p>
      <p>Uang yang tersisa hanya satu pertimbangan. Bandingkan juga jenis kontrak, jam kerja, lokasi, perlindungan, kesempatan belajar, dan pengalaman pekerja di perusahaan tersebut. Angka yang kamu isi hanya digunakan di perangkatmu dan tidak dikirim melalui alat ini.</p>
      <NuxtLink class="text-link" to="/bandingkan">Bandingkan informasi perusahaan →</NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.offer-page { --field-background: var(--kg-paper-strong); --field-foreground: var(--kg-ink); --field-border: var(--kg-paper-line); --field-muted: var(--kg-paper-muted); max-width: 1200px; margin-inline: auto; }
.offer-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
.offer-card { min-width: 0; display: grid; gap: 20px; border: 1px solid var(--kg-paper-line); padding: 24px; }
.offer-card legend { padding-inline: 8px; font-weight: 700; }
.offer-card small { line-height: 1.5; color: var(--kg-paper-muted); }
.offer-result { display: grid; gap: 8px; border-top: 1px solid var(--kg-paper-line); padding-top: 20px; }
.offer-result strong { font-size: clamp(20px, 2.5vw, 30px); overflow-wrap: anywhere; }
.offer-summary, .offer-guidance { margin-top: 40px; }
.offer-summary h2, .offer-guidance h2 { font-family: var(--font-display); font-size: 28px; }
.offer-summary p, .offer-guidance p { line-height: 1.7; }
@media (max-width: 700px) { .offer-grid { grid-template-columns: 1fr; } .offer-card { padding: 18px; } }
</style>
