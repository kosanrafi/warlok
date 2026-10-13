// v-reveal: elemen di bawah layar muncul halus saat di-scroll. Aman untuk SSR & mati bila reduced-motion.
export default defineNuxtPlugin((nuxt) => {
  let io: IntersectionObserver | undefined
  nuxt.vueApp.directive('reveal', {
    mounted(el: HTMLElement) {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
      if (el.getBoundingClientRect().top < innerHeight * 0.92) return // sudah terlihat
      io ??= new IntersectionObserver((es) => es.forEach((en) => {
        if (en.isIntersecting) { (en.target as HTMLElement).classList.add('rv-in'); io!.unobserve(en.target) }
      }), { rootMargin: '0px 0px -8% 0px' })
      el.classList.add('rv'); io.observe(el)
    },
    getSSRProps: () => ({})
  })
})
