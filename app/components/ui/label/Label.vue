<script setup lang="ts">
import { cn } from '@/lib/utils'
const props = defineProps<{ class?: string }>()
</script>
<template><label :class="cn('text-xs font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', props.class)"><slot /></label></template>
