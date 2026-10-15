import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },
  app: {
    head: {
      htmlAttrs: { lang: 'id' },
      meta: [{ name: 'theme-color', content: '#0a4fb4' }],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        // hanya memuat huruf W-A-R-L-O-K (beberapa KB) untuk logo
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap&text=WARLOK' }
      ]
    }
  },
  // diisi dari env: NUXT_DATABASE_URL, NUXT_ADMIN_PASSWORD, NUXT_SESSION_SECRET
  runtimeConfig: {
    databaseUrl: '', adminPassword: '', sessionSecret: '',
    public: { siteUrl: 'https://warloktasik.vercel.app' } // ganti via NUXT_PUBLIC_SITE_URL bila pakai domain sendiri
  },
  routeRules: {
    // Tanpa cache halaman: isi publik selalu sama dengan yang diatur di /admin.
    // (swr di Vercel menjadi ISR tanpa kedaluwarsa, sehingga perubahan admin tidak pernah tampil)
    '/api/site': { headers: { 'cache-control': 'no-store' } },
    '/admin': { ssr: false },
    '/admin/**': { ssr: false }
  }
})
