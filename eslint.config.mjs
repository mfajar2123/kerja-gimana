import withNuxt from './.nuxt/eslint.config.mjs'
export default withNuxt(
  {
    ignores: ['.output/**', '.nuxt/**', '.agents/**', 'artifacts/**', 'playwright-report/**', 'test-results/**', 'video/**'],
  },
  {
    rules: { 'vue/multi-word-component-names': 'off', 'vue/html-self-closing': 'off' },
  },
)
