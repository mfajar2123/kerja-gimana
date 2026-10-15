<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = withDefaults(
  defineProps<{
    text: string
    as?: string
    charDelay?: number
    startDelay?: number
    cursor?: boolean
  }>(),
  {
    as: 'p',
    charDelay: 0, // 0 = automatic responsive speed based on text length
    startDelay: 80,
    cursor: true,
  }
)

const elementRef = ref<HTMLElement | null>(null)
const isTyping = ref(false)
const typingFinished = ref(false)
let observer: IntersectionObserver | undefined
let finishTimer: ReturnType<typeof setTimeout> | undefined

interface CharItem {
  char: string
  delay: number
}

interface Token {
  isSpace?: boolean
  isBreak?: boolean
  chars?: CharItem[]
}

const computedCharDelay = computed(() => {
  if (props.charDelay > 0) return props.charDelay
  const len = props.text.length
  if (len > 140) return 15
  if (len > 80) return 18
  return 22
})

const parsed = computed(() => {
  const tokens: Token[] = []
  const step = computedCharDelay.value
  let delay = props.startDelay
  let currentWord: CharItem[] = []

  function flushWord() {
    if (currentWord.length > 0) {
      tokens.push({ chars: currentWord })
      currentWord = []
    }
  }

  for (let i = 0; i < props.text.length; i++) {
    const ch = props.text[i]
    if (ch === '\n') {
      flushWord()
      tokens.push({ isBreak: true })
      delay += step * 3
    } else if (ch === ' ') {
      flushWord()
      tokens.push({ isSpace: true })
      delay += step
    } else if (ch) {
      currentWord.push({ char: ch, delay })
      delay += step
    }
  }
  flushWord()

  return { tokens, totalDuration: delay + 500 }
})

onMounted(() => {
  if (!import.meta.client) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (reduced.matches) {
    isTyping.value = true
    typingFinished.value = true
    return
  }

  if (!('IntersectionObserver' in window) || !elementRef.value) {
    isTyping.value = true
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries
      if (entry && entry.isIntersecting) {
        isTyping.value = true
        finishTimer = setTimeout(() => {
          typingFinished.value = true
        }, parsed.value.totalDuration)
        observer?.disconnect()
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -25px 0px' }
  )

  observer.observe(elementRef.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  if (finishTimer) clearTimeout(finishTimer)
})
</script>

<template>
  <component
    :is="as"
    ref="elementRef"
    class="typewriter-desc"
    :class="{ 'is-active': isTyping, 'is-finished': typingFinished }"
  ><template v-for="(item, wIdx) in parsed.tokens" :key="`t-${wIdx}`"><br v-if="item.isBreak" /><span v-else-if="item.isSpace" class="tw-space">{{ ' ' }}</span><span v-else class="tw-word"><span v-for="(ch, cIdx) in item.chars" :key="`c-${cIdx}`" class="tw-char" :style="isTyping ? { animationDelay: `${ch.delay}ms` } : undefined">{{ ch.char }}</span></span></template><span v-if="cursor && isTyping && !typingFinished" class="tw-cursor" aria-hidden="true" /></component>
</template>
