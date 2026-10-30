<script setup lang="ts">
type Kind = 'review' | 'salary' | 'interview' | 'response'
interface Item { id: string; status: string; company: string; title: string; created_at: string }
const kind = ref<Kind>('review')
const page = ref(1)
const busy = ref(false)
const notice = ref('')
const { data, error, pending, refresh } = await useFetch<{ items: Item[]; per_page: number }>('/api/admin/content', { query: computed(() => ({ kind: kind.value, page: page.value })) })
watch(kind, () => { page.value = 1 })
async function remove(item: Item) {
  if (busy.value || !window.confirm(`Hapus permanen "${item.title}" dari ${item.company}? Data terkait juga dapat terhapus.`)) return
  const note = window.prompt('Tuliskan alasan penghapusan untuk audit (minimal 10 karakter).')
  if (note === null) return
  if (note.trim().length < 10) { notice.value = 'Alasan harus sedikitnya 10 karakter.'; return }
  busy.value = true; notice.value = ''
  try {
    await $fetch('/api/admin/content', { method: 'DELETE', body: { kind: kind.value, id: item.id, note } })
    notice.value = 'Data berhasil dihapus permanen.'
    await refresh()
  } catch { notice.value = 'Data belum berhasil dihapus. Coba lagi.' }
  finally { busy.value = false }
}
</script>

<template>
  <section class="admin-content" aria-labelledby="content-manager-title">
    <header class="page-heading"><h2 id="content-manager-title">Kelola semua konten</h2><p>Konten terbit dan konten dengan status lain dapat dihapus permanen. Penghapusan dicatat dalam audit.</p></header>
    <label for="content-kind">Jenis konten</label>
    <select id="content-kind" v-model="kind" :disabled="busy"><option value="review">Review</option><option value="salary">Gaji</option><option value="interview">Interview</option><option value="response">Tanggapan perusahaan</option></select>
    <p v-if="notice" class="notice" role="status">{{ notice }}</p>
    <LoadError v-if="error" message="Konten belum bisa dimuat." :retrying="pending" @retry="refresh()" />
    <p v-else-if="pending">Memuat konten…</p>
    <div v-else-if="data?.items.length" class="admin-queue"><article v-for="item in data.items" :key="item.id" class="admin-item"><header><span class="admin-kind">{{ item.status }}</span><time>{{ new Date(item.created_at).toLocaleDateString('id-ID') }}</time></header><h3>{{ item.title }}</h3><p>{{ item.company }}</p><button class="button button-outline button-small" :disabled="busy" @click="remove(item)">Hapus permanen</button></article></div>
    <p v-else>Belum ada konten.</p>
    <nav class="pagination" aria-label="Halaman konten"><button class="button button-outline button-small" :disabled="page === 1 || pending || busy" @click="page--">Sebelumnya</button><span>Halaman {{ page }}</span><button class="button button-outline button-small" :disabled="pending || busy || (data?.items.length ?? 0) < 50 || page >= 1000" @click="page++">Berikutnya</button></nav>
  </section>
</template>
