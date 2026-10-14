<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'
import { contactSchema, reportSchema } from '#shared/schemas'
const route = useRoute()
useSeoMeta({ title: 'Kontak — KerjaGimana', description: 'Hubungi tim KerjaGimana mengenai perusahaan, privasi, review, dan dukungan.' })
const { viewer } = useAccount()
const reportingReview = computed(() => route.query.kategori === 'review')
const validReview = computed(() => reportSchema.pick({ review_id: true }).safeParse({ review_id: route.query.tentang }).success)
const loginTarget = computed(() => `/masuk?next=${encodeURIComponent(route.fullPath)}`)
const needsLogin = ref(false)
const messageLimit = computed(() => reportingReview.value ? 2000 : 4000)
const feedback = ref<HTMLElement | null>(null)
const form = reactive({ email: '', subject: '', message: '', reason: 'privacy' })
const busy = ref(false); const errorText = ref(''); const success = ref('')
const ready = ref(false)
onMounted(() => { ready.value = true })
const reasons = [
  { value: 'privacy', label: 'Informasi pribadi' }, { value: 'harassment', label: 'Pelecehan atau serangan personal' },
  { value: 'spam', label: 'Spam atau duplikat' }, { value: 'disputed_claim', label: 'Informasi yang disengketakan' },
]
watchEffect(() => {
  if (reportingReview.value) form.subject = 'Laporan review yang sudah dipublikasikan'
})
async function sendMessage() {
  if (!ready.value || busy.value) return
  busy.value = true; errorText.value = ''; success.value = ''; needsLogin.value = false
  try {
    if (reportingReview.value) {
      const parsed = reportSchema.safeParse({ review_id: route.query.tentang, reason: form.reason, details: form.message })
      if (!parsed.success) { errorText.value = 'Periksa tautan review dan isi pesan 20–2.000 karakter.'; return }
      await $fetch('/api/reports', { method: 'POST', body: parsed.data })
      success.value = 'Laporan sudah diterima dan akan ditinjau moderator.'
    } else {
      const parsed = contactSchema.safeParse({ email: form.email.trim(), subject: form.subject, message: form.message })
      if (!parsed.success) { errorText.value = 'Periksa alamat email, topik 3–120 karakter, dan pesan 20–4.000 karakter. Spasi saja tidak dihitung sebagai isi pesan.'; return }
      await $fetch('/api/contact', { method: 'POST', body: parsed.data })
      success.value = 'Pesan berhasil disampaikan. Terima kasih sudah menghubungi kami.'
    }
    form.message = ''
  } catch (error: unknown) {
    const issue = error as { data?: { statusMessage?: string }; message?: string; statusCode?: number }
    if (issue.statusCode === 401) {
      needsLogin.value = true
      errorText.value = 'Masuk dan verifikasi email untuk melaporkan review.'
      return
    }
    errorText.value = issue.data?.statusMessage || 'Pesan belum berhasil dikirim. Isianmu tetap tersimpan. Coba lagi sebentar.'
  } finally { busy.value = false; await nextTick(); feedback.value?.focus() }
}
</script>

<template>
  <section class="page-editorial information-page">

    <header class="info-intro"><h1>{{ reportingReview ? 'Laporkan informasi.' : 'Mari bicara.' }}</h1><p>Jika ada masalah dengan data, privasi, atau cara kerja KerjaGimana, sampaikan melalui formulir ini.</p></header>
    <p v-if="reportingReview && !validReview" class="form-notice form-notice-error" role="alert">Tautan laporan tidak valid. <NuxtLink to="/perusahaan">Buka perusahaan dan pilih review yang ingin dilaporkan.</NuxtLink></p>
    <p v-else-if="reportingReview && !viewer" class="form-notice"><NuxtLink :to="loginTarget">Masuk untuk melaporkan review ini.</NuxtLink> Setelah masuk, kamu akan kembali ke halaman ini. Untuk pertanyaan umum atau privasi, gunakan <NuxtLink to="/kontak">formulir kontak</NuxtLink>.</p>
    <form v-if="!reportingReview || (validReview && viewer)" class="product-form contact-form" :aria-busy="busy" @submit.prevent="sendMessage">
      <div v-if="!reportingReview" class="product-field"><label for="contact-email">Email untuk balasan</label><input id="contact-email" v-model="form.email" type="email" maxlength="254" required placeholder="nama@email.com"></div>
      <div v-if="reportingReview" class="product-field"><label for="contact-reason">Alasan laporan</label><select id="contact-reason" v-model="form.reason"><option v-for="reason in reasons" :key="reason.value" :value="reason.value">{{ reason.label }}</option></select></div>
      <div v-else class="product-field"><label for="contact-subject">Topik</label><input id="contact-subject" v-model="form.subject" maxlength="120" required minlength="3" placeholder="Tentang apa pesanmu?"></div>
      <div class="product-field"><label for="contact-message">Pesan <span>(min. 20 karakter)</span></label><textarea id="contact-message" v-model="form.message" minlength="20" :maxlength="messageLimit" rows="7" required aria-describedby="contact-message-limit" placeholder="Ceritakan konteks yang perlu kami ketahui. Jangan sertakan nomor identitas pribadi."></textarea><small id="contact-message-limit">{{ form.message.length }} / {{ messageLimit }} karakter</small></div>
      <p v-if="errorText" ref="feedback" tabindex="-1" class="form-notice form-notice-error" role="alert">{{ errorText }} <NuxtLink v-if="needsLogin" :to="loginTarget">Masuk di sini.</NuxtLink></p>
      <p v-if="success" ref="feedback" tabindex="-1" class="form-notice form-notice-success" role="status">{{ success }}</p>
      <button class="button button-red form-submit" :disabled="!ready || busy" type="submit">{{ busy ? 'Mengirim…' : reportingReview ? 'Kirim laporan' : 'Kirim pesan' }} <ArrowRight v-if="!busy" :size="16" aria-hidden="true"/></button>
    </form>
    <p class="contact-aside">Data pesan dipakai untuk menindaklanjuti permintaan. <NuxtLink to="/privasi">Baca kebijakan privasi.</NuxtLink></p>
  </section>
</template>
