<script setup lang="ts">
import { ArrowRight, ShieldCheck } from '@lucide/vue'
import { accountDestination } from '#shared/utils/auth'

const props = defineProps<{ kind: 'review' | 'salary' | 'interview' | 'company' }>()
const route = useRoute()
const isCompany = computed(() => props.kind === 'company')
const isReview = computed(() => props.kind === 'review')
const isSalary = computed(() => props.kind === 'salary')
const isInterview = computed(() => props.kind === 'interview')
const title = computed(() => ({ review: 'Ceritakan pengalamanmu.', salary: 'Bantu buka kisaran gaji.', interview: 'Ceritakan proses interview.', company: 'Usulkan perusahaan.' })[props.kind])
const description = computed(() => ({
  review: 'Berbagi hal yang kamu alami sendiri dapat membantu orang lain membuat keputusan.',
  salary: 'Laporkan penghasilan dalam rupiah. Angka individual tidak diterbitkan.',
  interview: 'Ceritakan proses yang pernah kamu ikuti. Jangan sertakan identitas pewawancara.',
  company: 'Usulan akan diperiksa admin sebelum masuk ke direktori publik.',
})[props.kind])
const busy = ref(false)
const ready = ref(false)
onMounted(() => { ready.value = true })
const formError = ref('')
const successMessage = ref('')
const ratings = reactive({ overall: 3, work_life: 3, compensation: 3, management: 3, career: 3 })
const form = reactive({
  company_id: typeof route.query.company === 'string' && /^[0-9a-f-]{36}$/i.test(route.query.company) ? route.query.company : '', name: '', industry: '', location: '', website: '', description: '',
  job_title: '', employment_status: 'current', employment_start: '', employment_end: '',
  positives: '', improvements: '', advice: '',
  role: '', salary_location: '', employment_type: 'full_time', experience_level: 'entry',
  base_salary: '', salary_period: 'monthly', salary_basis: 'gross', allowances: '', bonus: '',
  position: '', stages: '', difficulty: 3, experience: 'neutral', duration_days: '', questions: '', outcome: 'unknown',
})
const ratingFields: Array<{ id: keyof typeof ratings; label: string }> = [
  { id: 'overall', label: 'Pengalaman keseluruhan' },
  { id: 'work_life', label: 'Keseimbangan kerja dan hidup' },
  { id: 'compensation', label: 'Kompensasi' },
  { id: 'management', label: 'Manajemen' },
  { id: 'career', label: 'Peluang berkembang' },
]

function getIndustryName(slug: string) {
  return slug.trim()
}
const { data: industryData } = await useFetch<Array<{ name: string; slug: string }>>('/api/industries', { key: 'review-industry-options' })
const kinds = [
  { value: 'full_time', label: 'Penuh waktu' }, { value: 'part_time', label: 'Paruh waktu' },
  { value: 'contract', label: 'Kontrak' }, { value: 'internship', label: 'Magang' },
]
const experiences = [
  { value: 'entry', label: 'Awal karier' }, { value: 'mid', label: 'Menengah' },
  { value: 'senior', label: 'Senior' }, { value: 'lead', label: 'Lead / pimpinan' },
]

async function submitContribution() {
  if (!ready.value || busy.value) return
  busy.value = true
  formError.value = ''
  successMessage.value = ''
  let endpoint = ''
  let body: Record<string, unknown> = {}

  if (isReview.value) {
    endpoint = '/api/reviews'
    body = {
      company_id: form.company_id, job_title: form.job_title,
      employment_status: form.employment_status,
      employment_start: Number(form.employment_start),
      employment_end: form.employment_status === 'current' ? null : Number(form.employment_end),
      positives: form.positives, improvements: form.improvements, advice: form.advice,
      ratings: { ...ratings }, status: 'pending',
    }
  } else if (isSalary.value) {
    endpoint = '/api/salaries'
    body = {
      company_id: form.company_id, role: form.role, location: form.salary_location,
      employment_type: form.employment_type, experience_level: form.experience_level,
      base_salary: Number(form.base_salary), salary_period: form.salary_period,
      salary_basis: form.salary_basis, allowances: Number(form.allowances || 0), bonus: Number(form.bonus || 0),
    }
  } else if (isInterview.value) {
    endpoint = '/api/interviews'
    body = {
      company_id: form.company_id, position: form.position, stages: form.stages, difficulty: Number(form.difficulty),
      experience: form.experience, duration_days: Number(form.duration_days), questions: form.questions, outcome: form.outcome,
    }
  } else {
    endpoint = '/api/companies'
    body = {
      name: form.name, industry: getIndustryName(form.industry), location: form.location,
      website: form.website, description: form.description,
    }
  }

  try {
    await $fetch(endpoint, { method: 'POST', body })
    successMessage.value = isCompany.value
      ? 'Usulan berhasil dikirim. Admin akan memeriksanya sebelum perusahaan masuk ke direktori.'
      : 'Cerita berhasil dikirim dan sedang menunggu moderasi.'
    if (isCompany.value) {
      Object.assign(form, { name: '', industry: '', location: '', website: '', description: '' })
    } else {
      await navigateTo({ path: '/dashboard/review', query: { terkirim: '1' } })
    }
  } catch (error: unknown) {
    const details = error as { data?: { statusMessage?: string; data?: { fields?: Array<{ path: string; message: string }> } } }
    formError.value = details.data?.statusMessage || 'Pengiriman belum berhasil. Periksa isian dan coba lagi.'
    const field = details.data?.data?.fields?.[0]
    if (field) formError.value = `${field.path}: ${field.message}`
    if ('statusCode' in (error as object) && (error as { statusCode?: number }).statusCode === 401)
      formError.value = 'Masuk dan verifikasi email sebelum mengirim kontribusi.'
  } finally {
    busy.value = false
  }
}

const backLink = computed(() => route.query.next ? accountDestination(route.query.next, 'user') : '/perusahaan')
</script>

<template>
  <section class="form-shell contribution-shell" :aria-labelledby="`contribution-title-${kind}`">
    <div class="form-kicker"><span class="eyebrow-mark" />{{ isCompany ? 'DIREKTORI PERUSAHAAN' : 'KONTRIBUSI KOMUNITAS' }}</div>
    <h1 :id="`contribution-title-${kind}`">{{ title }}</h1>
    <p class="form-intro">{{ description }}</p>

    <form class="product-form contribution-form" @submit.prevent="submitContribution">
      <CompanyPicker v-if="!isCompany" v-model="form.company_id" />

      <template v-if="isReview">
        <div class="product-field"><label for="review-job">Jabatan saat bekerja</label><input id="review-job" v-model="form.job_title" required minlength="2" maxlength="100" placeholder="Contoh: Analis Keuangan"></div>
        <fieldset class="choice-group"><legend>Status kerja</legend><label class="choice-option"><input v-model="form.employment_status" type="radio" value="current" name="employment-status">Masih bekerja di sana</label><label class="choice-option"><input v-model="form.employment_status" type="radio" value="former" name="employment-status">Sudah tidak bekerja di sana</label></fieldset>
        <div class="field-row"><div class="product-field"><label for="employment-start">Tahun mulai</label><input id="employment-start" v-model="form.employment_start" type="number" required min="1970" :max="new Date().getFullYear()" placeholder="2022"></div><div v-if="form.employment_status === 'former'" class="product-field"><label for="employment-end">Tahun berakhir</label><input id="employment-end" v-model="form.employment_end" type="number" required min="1970" :max="new Date().getFullYear()" placeholder="2025"></div></div>
        <fieldset class="rating-fields"><legend>Nilai pengalamanmu dari 1 sampai 5</legend><div v-for="rating in ratingFields" :key="rating.id" class="rating-field"><label :for="`rating-${rating.id}`">{{ rating.label }}</label><select :id="`rating-${rating.id}`" v-model.number="ratings[rating.id]"><option v-for="score in [1,2,3,4,5]" :key="score" :value="score">{{ score }} — {{ score === 1 ? 'Kurang' : score === 5 ? 'Baik sekali' : 'Cukup' }}</option></select></div></fieldset>
        <div class="product-field"><label for="review-positives">Apa yang berjalan baik?</label><textarea id="review-positives" v-model="form.positives" required minlength="30" maxlength="4000" rows="4" placeholder="Bagikan hal yang benar-benar kamu alami, secara spesifik dan adil."></textarea></div>
        <div class="product-field"><label for="review-improvements">Apa yang masih bisa lebih baik?</label><textarea id="review-improvements" v-model="form.improvements" required minlength="30" maxlength="4000" rows="4" placeholder="Jelaskan situasinya tanpa mengungkap identitas pribadi."></textarea></div>
        <div class="product-field"><label for="review-advice">Saran untuk calon rekan kerja <span>(opsional)</span></label><textarea id="review-advice" v-model="form.advice" maxlength="2000" rows="3" placeholder="Saran yang kamu rasa akan berguna buat mereka."></textarea></div>
      </template>

      <template v-else-if="isSalary">
        <div class="product-field"><label for="salary-role">Peran atau jabatan</label><input id="salary-role" v-model="form.role" required minlength="2" maxlength="100" placeholder="Contoh: Desainer Produk"></div>
        <div class="product-field"><label for="salary-location">Kota</label><input id="salary-location" v-model="form.salary_location" required minlength="2" maxlength="100" placeholder="Contoh: Jakarta"></div>
        <div class="field-row"><div class="product-field"><label for="salary-employment">Jenis kerja</label><select id="salary-employment" v-model="form.employment_type"><option v-for="employmentKind in kinds" :key="employmentKind.value" :value="employmentKind.value">{{ employmentKind.label }}</option></select></div><div class="product-field"><label for="salary-level">Pengalaman</label><select id="salary-level" v-model="form.experience_level"><option v-for="experience in experiences" :key="experience.value" :value="experience.value">{{ experience.label }}</option></select></div></div>
        <div class="field-row"><div class="product-field"><label for="salary-amount">Gaji pokok (rupiah)</label><input id="salary-amount" v-model="form.base_salary" type="number" inputmode="numeric" required min="10000" max="10000000000" placeholder="8000000"></div><div class="product-field"><label for="salary-period">Periode</label><select id="salary-period" v-model="form.salary_period"><option value="monthly">Per bulan</option><option value="yearly">Per tahun</option></select></div></div>
        <div class="product-field"><label for="salary-basis">Jenis angka</label><select id="salary-basis" v-model="form.salary_basis"><option value="gross">Gross — sebelum potongan</option><option value="take_home">Take home pay — setelah potongan</option></select></div>
        <div class="field-row"><div class="product-field"><label for="salary-allowances">Tunjangan bulanan <span>(opsional, rupiah)</span></label><input id="salary-allowances" v-model="form.allowances" type="number" inputmode="numeric" min="0" max="1000000000" placeholder="0"></div><div class="product-field"><label for="salary-bonus">Bonus tahunan <span>(opsional, rupiah)</span></label><input id="salary-bonus" v-model="form.bonus" type="number" inputmode="numeric" min="0" max="1000000000" placeholder="0"></div></div>
        <p class="field-privacy-note">Gaji hanya diringkas saat kelompok memiliki minimal lima pelapor unik. Angka individual tidak ditampilkan.</p>
      </template>

      <template v-else-if="isInterview">
        <div class="product-field"><label for="interview-position">Posisi yang dilamar</label><input id="interview-position" v-model="form.position" required minlength="2" maxlength="100" placeholder="Contoh: Product Designer"></div>
        <div class="product-field"><label for="interview-stages">Tahapan proses</label><textarea id="interview-stages" v-model="form.stages" required minlength="5" maxlength="2000" rows="3" placeholder="Contoh: seleksi CV, perkenalan dengan rekruter, studi kasus..."></textarea></div>
        <div class="field-row"><div class="product-field"><label for="interview-difficulty">Tingkat kesulitan</label><select id="interview-difficulty" v-model.number="form.difficulty"><option :value="1">1 — Ringan</option><option :value="2">2 — Cukup mudah</option><option :value="3">3 — Sedang</option><option :value="4">4 — Menantang</option><option :value="5">5 — Sulit</option></select></div><div class="product-field"><label for="interview-duration">Durasi (hari)</label><input id="interview-duration" v-model="form.duration_days" type="number" min="0" max="365" required placeholder="21"></div></div>
        <div class="product-field"><label for="interview-experience">Pengalaman interview</label><select id="interview-experience" v-model="form.experience"><option value="positive">Positif</option><option value="neutral">Biasa saja</option><option value="negative">Kurang baik</option></select></div>
        <div class="product-field"><label for="interview-questions">Pertanyaan yang sifatnya umum</label><textarea id="interview-questions" v-model="form.questions" required minlength="20" maxlength="4000" rows="4" placeholder="Ceritakan tipe pertanyaannya. Jangan tuliskan nama atau ciri pribadi pewawancara."></textarea></div>
        <div class="product-field"><label for="interview-outcome">Hasil proses <span>(opsional)</span></label><select id="interview-outcome" v-model="form.outcome"><option value="unknown">Tidak ingin menyebutkan</option><option value="offer">Mendapat tawaran</option><option value="rejected">Tidak dilanjutkan</option><option value="withdrew">Mengundurkan diri</option></select></div>
      </template>

      <template v-else>
        <div class="product-field"><label for="company-name">Nama perusahaan</label><input id="company-name" v-model="form.name" required minlength="2" maxlength="120" placeholder="Nama resmi perusahaan"></div>
        <div class="field-row"><div class="product-field"><label for="company-industry">Bidang industri</label><select id="company-industry" v-model="form.industry" required><option value="" disabled>Pilih industri</option><option v-for="industry in industryData ?? []" :key="industry.slug" :value="industry.slug">{{ industry.name }}</option></select></div><div class="product-field"><label for="company-location">Kota atau lokasi kantor</label><input id="company-location" v-model="form.location" required minlength="2" maxlength="100" placeholder="Contoh: Jakarta"></div></div>
        <div class="product-field"><label for="company-website">Website resmi <span>(opsional)</span></label><input id="company-website" v-model="form.website" type="url" inputmode="url" placeholder="https://perusahaan.id"></div>
        <div class="product-field"><label for="company-description">Keterangan singkat</label><textarea id="company-description" v-model="form.description" required minlength="20" maxlength="2000" rows="4" placeholder="Keterangan faktual yang membantu moderator mengenali perusahaan."></textarea></div>
      </template>

      <fieldset class="choice-group declaration-group"><legend><ShieldCheck :size="17" aria-hidden="true" /> Sebelum mengirim</legend><label class="choice-option"><input type="checkbox" required>{{ isCompany ? 'Saya mengirim usulan yang akurat dan akan menunggu pemeriksaan moderator.' : 'Saya membagikan pengalaman atau informasi yang saya alami sendiri, dan tidak menyertakan identitas pribadi.' }}</label></fieldset>
      <p class="privacy-explainer">Penulis disembunyikan pada halaman publik. Detail jabatan, periode kerja, dan isi cerita tetap dapat memberi petunjuk identitas. Kami tidak menjanjikan anonimitas mutlak. <NuxtLink to="/privasi">Cara data dipakai.</NuxtLink></p>
      <p v-if="formError" class="form-notice form-notice-error" role="alert">{{ formError }}</p>
      <p v-if="successMessage" class="form-notice form-notice-success" role="status">{{ successMessage }}</p>
      <button class="button button-red form-submit" type="submit" :disabled="!ready || busy"><span>{{ busy ? 'Mengirim…' : 'Kirim untuk dimoderasi' }}</span><ArrowRight v-if="!busy" :size="17" aria-hidden="true" /></button>
    </form>
    <NuxtLink class="back-link" :to="backLink"><ArrowRight class="back-arrow" :size="15" aria-hidden="true" />Kembali</NuxtLink>
  </section>
</template>
