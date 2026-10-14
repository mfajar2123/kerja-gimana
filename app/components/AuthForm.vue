<script setup lang="ts">
import { ArrowLeft, ArrowRight, LockKeyhole, Mail } from '@lucide/vue'
import { accountDestination, isAdminPath } from '#shared/utils/auth'

const props = defineProps<{ mode: 'login' | 'register' | 'recovery' | 'reset' }>()
const route = useRoute()
const { signIn } = useAccount()
const ready = ref(false)
onMounted(() => { ready.value = true })
const email = ref('')
const password = ref('')
const confirmation = ref('')
const submitting = ref(false)
const message = ref('')
const errorMessage = ref('')
const nextPath = computed(() => accountDestination(route.query.next, 'user'))
const adminIntent = computed(() => props.mode === 'login' && typeof route.query.next === 'string' && isAdminPath(route.query.next.split('?')[0]!))
const title = computed(() => ({ login: adminIntent.value ? 'Masuk ke ruang admin.' : 'Senang melihatmu lagi.', register: 'Mari mulai dari sini.', recovery: 'Akses akunmu lagi.', reset: 'Buat kata sandi baru.' })[props.mode])
const description = computed(() => ({
  login: adminIntent.value ? 'Gunakan akun yang memiliki akses admin. Akun pengguna biasa tetap masuk ke dashboard pribadi.' : 'Masuk untuk membaca dan mengelola kontribusimu.',
  register: 'Buat akun dengan email aktif. Verifikasi email sebelum mengirim kontribusi.',
  recovery: 'Masukkan email akunmu. Kami akan mengirim petunjuk reset jika tersedia.',
  reset: 'Gunakan sedikitnya 15 karakter. Hindari kata sandi yang pernah kamu pakai.',
})[props.mode])
const submitLabel = computed(() => ({ login: 'Masuk ke akun', register: 'Daftar dan verifikasi email', recovery: 'Kirim petunjuk reset', reset: 'Simpan kata sandi baru' })[props.mode])

async function submit() {
  if (!ready.value || submitting.value) return
  message.value = ''
  errorMessage.value = ''
  if ((props.mode === 'register' || props.mode === 'reset') && password.value !== confirmation.value) {
    errorMessage.value = 'Kata sandinya belum cocok.'
    return
  }
  if ((props.mode === 'register' || props.mode === 'reset') && password.value.length < 15) {
    errorMessage.value = 'Pakai sedikitnya 15 karakter untuk kata sandi.'
    return
  }
  submitting.value = true
  const endpoints = { login: '/api/auth/login', register: '/api/auth/register', recovery: '/api/auth/recovery', reset: '/api/auth/password' }
  const payload = props.mode === 'recovery' ? { email: email.value } : props.mode === 'login' || props.mode === 'register'
    ? { email: email.value, password: password.value }
    : { password: password.value }
  try {
    if (props.mode === 'login') {
      await signIn(email.value, password.value, route.query.next)
      return
    }
    await $fetch(endpoints[props.mode], { method: props.mode === 'reset' ? 'PUT' : 'POST', body: payload })
    if (props.mode === 'register') message.value = 'Akun berhasil dibuat. Buka emailmu dan klik tautan verifikasi untuk melanjutkan.'
    else if (props.mode === 'recovery') message.value = 'Jika email itu terdaftar, petunjuk pemulihan akan segera dikirim.'
    else {
      message.value = 'Kata sandi berhasil diperbarui.'
      password.value = ''
      confirmation.value = ''
    }
  } catch (error: unknown) {
    const details = error as { data?: { statusMessage?: string }; message?: string }
    errorMessage.value = details.data?.statusMessage || 'Permintaan belum bisa diproses. Coba lagi nanti.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <section class="form-shell" :aria-labelledby="`auth-title-${mode}`">

    <h1 :id="`auth-title-${mode}`">{{ title }}</h1>
    <p class="form-intro">{{ description }}</p>

    <form class="product-form" @submit.prevent="submit">
      <div v-if="mode !== 'reset'" class="product-field">
        <label for="auth-email">Email</label>
        <div class="input-with-icon"><Mail :size="17" aria-hidden="true" /><input id="auth-email" v-model="email" type="email" autocomplete="email" required maxlength="254" placeholder="nama@email.com" :disabled="submitting || !ready"></div>
      </div>
      <div v-if="mode !== 'recovery'" class="product-field">
        <label for="auth-password">Kata sandi</label>
        <div class="input-with-icon"><LockKeyhole :size="17" aria-hidden="true" /><input id="auth-password" v-model="password" type="password" :autocomplete="mode === 'login' ? 'current-password' : 'new-password'" required :minlength="mode === 'login' ? 1 : 15" maxlength="128" placeholder="Sedikitnya 15 karakter" :disabled="submitting || !ready"></div>
      </div>
      <div v-if="mode === 'register' || mode === 'reset'" class="product-field">
        <label for="auth-password-confirm">Ulangi kata sandi</label>
        <div class="input-with-icon"><LockKeyhole :size="17" aria-hidden="true" /><input id="auth-password-confirm" v-model="confirmation" type="password" autocomplete="new-password" required minlength="15" maxlength="128" placeholder="Tulis ulang kata sandi" :disabled="submitting || !ready"></div>
      </div>

      <p v-if="errorMessage" class="form-notice form-notice-error" role="alert">{{ errorMessage }}</p>
      <p v-if="message" class="form-notice form-notice-success" role="status">{{ message }}</p>
      <button class="button button-red form-submit" type="submit" :disabled="submitting || !ready">
        <span>{{ submitting ? 'Sedang memproses…' : submitLabel }}</span>
        <ArrowRight v-if="!submitting" :size="17" aria-hidden="true" />
      </button>
    </form>

    <div v-if="mode === 'login'" class="auth-bottom-links">
      <NuxtLink to="/lupa-password">Lupa kata sandi?</NuxtLink>
      <p>Belum punya akun? <NuxtLink to="/daftar">Daftar di sini.</NuxtLink></p>
    </div>
    <p v-else-if="mode === 'register'" class="auth-bottom-copy">Sudah punya akun? <NuxtLink :to="`/masuk?next=${encodeURIComponent(nextPath)}`">Masuk di sini.</NuxtLink></p>
    <NuxtLink v-else-if="mode === 'recovery'" class="back-link" to="/masuk"><ArrowLeft :size="15" aria-hidden="true" />Kembali ke halaman masuk</NuxtLink>
    <p class="form-privacy">Emailmu tidak ditampilkan pada review publik. <NuxtLink to="/privasi">Baca kebijakan privasi.</NuxtLink></p>
  </section>
</template>
