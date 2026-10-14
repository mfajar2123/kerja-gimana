<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{ companyId: string; reviewId: string }>()
const content = ref('')
const evidence = ref('')
const busy = ref(false)
const ready = ref(false)
onMounted(() => { ready.value = true })
const message = ref('')
const error = ref('')
const submit = async () => {
  if (!ready.value || busy.value) return
  busy.value = true; message.value = ''; error.value = ''
  try {
    await $fetch('/api/company-responses', { method: 'POST', body: { company_id: props.companyId, review_id: props.reviewId, content: content.value, evidence: evidence.value } })
    message.value = 'Tanggapan masuk antrean moderator. Jika sudah tayang, tanggapan akan tampil bersama review.'
    content.value = ''; evidence.value = ''
  } catch (cause: unknown) {
    if (cause && typeof cause === 'object' && 'data' in cause && cause.data && typeof cause.data === 'object' && 'statusMessage' in cause.data && typeof cause.data.statusMessage === 'string') error.value = cause.data.statusMessage
    else error.value = 'Masuk dengan akun wakil perusahaan yang sudah diverifikasi admin untuk mengirim tanggapan.'
  } finally { busy.value = false }
}
</script>

<template>
  <details class="response-form-details">
    <summary>Tanggapan resmi perusahaan</summary>
    <form class="stack-form" @submit.prevent="submit">
      <p class="field-hint">Tanggapan hanya dapat dikirim oleh wakil terverifikasi. Moderator memeriksa isi dan bukti sebelum tayang. Tanggapan tidak mengubah review atau rating penulis.</p>
      <label>Isi tanggapan <textarea v-model="content" required minlength="30" maxlength="4000" rows="4" placeholder="Tanggapi pengalaman ini dengan sopan dan faktual."></textarea></label>
      <label>Bukti kewenangan <textarea v-model="evidence" required minlength="20" maxlength="2000" rows="3" placeholder="Jelaskan dokumen atau kanal resmi yang dapat diperiksa moderator."></textarea></label>
      <p v-if="error" class="notice notice-error" role="alert">{{ error }} <NuxtLink to="/dashboard/pengaturan">Kelola verifikasi perusahaan</NuxtLink></p>
      <p v-if="message" class="notice" role="status">{{ message }}</p>
      <button type="submit" class="button button-outline button-small" :disabled="!ready || busy">{{ busy ? 'Mengirim…' : 'Kirim untuk ditinjau' }}</button>
    </form>
  </details>
</template>
