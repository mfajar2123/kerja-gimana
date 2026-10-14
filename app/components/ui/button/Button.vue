<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva('inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50', {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:opacity-90',
      destructive: 'bg-destructive text-white hover:opacity-90',
      outline: 'border border-border bg-transparent hover:bg-accent hover:text-accent-foreground',
      secondary: 'bg-secondary text-secondary-foreground hover:opacity-90',
      ghost: 'bg-transparent hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
    },
    size: {
      default: 'min-h-11 px-5',
      sm: 'min-h-9 px-3',
      lg: 'min-h-13 px-7',
      icon: 'size-11',
    },
  },
  defaultVariants: { variant: 'default', size: 'default' },
})

type ButtonVariant = VariantProps<typeof buttonVariants>
const props = withDefaults(defineProps<{ variant?: ButtonVariant['variant']; size?: ButtonVariant['size']; asChild?: boolean; class?: string }>(), { variant: 'default', size: 'default', asChild: false, class: '' })
const classes = computed(() => cn(buttonVariants({ variant: props.variant, size: props.size }), props.class))
</script>

<template><Primitive :as="asChild ? undefined : 'button'" :as-child="asChild" :class="classes"><slot /></Primitive></template>
