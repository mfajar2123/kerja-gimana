<script setup lang="ts">
defineProps<{ message: string; retrying?: boolean }>()
defineEmits<{ retry: [] }>()
</script>

<template>
  <div class="notice notice-error" role="alert">
    <p>{{ message }}</p>
    <button type="button" class="button button-outline button-small" :disabled="retrying" @click="$emit('retry')">{{ retrying ? 'Memuat…' : 'Coba lagi' }}</button>
  </div>
</template>
