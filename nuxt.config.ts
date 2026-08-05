export default defineNuxtConfig({

  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  modules: [
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'shadcn-nuxt',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
  ],

  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'pt',
    locales: [
      { code: 'pt', language: 'pt-BR', name: 'Português', file: 'pt.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'es', language: 'es-ES', name: 'Español', file: 'es.json' },
      { code: 'zh', language: 'zh-CN', name: '中文', file: 'zh.json' },
      { code: 'ja', language: 'ja-JP', name: '日本語', file: 'ja.json' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  vite: {
    optimizeDeps: {
      include: [
        '@vee-validate/zod',
        '@vueuse/core',
        'class-variance-authority',
        'clsx',
        'embla-carousel-vue',
        'lucide-vue-next',
        'tailwind-merge',
        'vaul-vue',
        'vee-validate',
        'zod',
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'system',
    fallback: 'light',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => false,
    }
  },

  shadcn: {
    prefix: '',
    componentDir: './app/components/ui'
  },

  runtimeConfig: {
    externalApiBaseRw: process.env.NUXT_EXTERNAL_API_BASE_RW,
    externalApiBasePlu: process.env.NUXT_EXTERNAL_API_BASE_PLU,
    public: {
      dev: process.env.NODE_ENV !== 'production'
    }
  },
})