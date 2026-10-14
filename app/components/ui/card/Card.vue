<script setup lang="ts">
import { cn } from '@/lib/utils'
const props = defineProps<{ class?: string }>()
</script>
<template><section :class="cn('border border-border bg-card text-card-foreground', props.class)"><slot /></section></template>
