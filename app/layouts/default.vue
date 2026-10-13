<script setup lang="ts">
const { data } = await useSite()
const s = computed(() => data.value!.settings)
const wa = computed(() => (s.value.whatsapp ? `https://wa.me/${s.value.whatsapp}` : ''))
const open = ref(false)
const links = [['Beranda', '/'], ['Cerita Kami', '/#cerita'], ['Menu', '/menu'], ['Kontak', '/#kontak']]
</script>
<template>
  <div class="flex min-h-dvh flex-col">
    <div class="splash" aria-hidden="true"><span class="font-logo text-5xl text-blue">WARLOK</span><small class="text-[9px] font-bold uppercase tracking-[.3em] text-orange">{{ s.brand_full }}</small><i /></div>
    <header class="sticky top-0 z-50 border-b border-black/5 bg-paper/90 backdrop-blur">
      <div class="wrap flex h-16 items-center justify-between">
        <NuxtLink to="/" class="font-logo text-2xl text-blue" @click="open = false">WARLOK</NuxtLink>
        <nav class="hidden gap-8 text-[11px] font-bold uppercase tracking-widest md:flex">
          <NuxtLink v-for="l in links" :key="l[1]" :to="l[1]" class="hover:text-orange">{{ l[0] }}</NuxtLink>
        </nav>
        <a v-if="wa" :href="wa" target="_blank" rel="noopener" class="btn btn-line hidden md:inline-block">Pesan Sekarang</a>
        <button class="-mr-2 p-2 text-2xl md:hidden" :aria-expanded="open" aria-label="Buka menu" @click="open = !open">☰</button>
      </div>
      <nav v-if="open" class="wrap grid border-t border-black/5 pb-3 md:hidden">
        <NuxtLink v-for="l in links" :key="l[1]" :to="l[1]" class="py-3 text-xs font-bold uppercase tracking-widest" @click="open = false">{{ l[0] }}</NuxtLink>
        <a v-if="wa" :href="wa" target="_blank" rel="noopener" class="btn mt-2">Pesan Sekarang</a>
      </nav>
    </header>

    <main class="flex-1"><slot /></main>

    <div class="checks" aria-hidden="true" />
    <footer class="bg-white py-12 text-sm text-slate-600">
      <div class="wrap grid gap-8 sm:grid-cols-3">
        <div><p class="font-logo text-3xl text-blue">WARLOK</p><p>{{ s.brand_full }}</p><p>{{ s.tagline }}</p><p v-if="s.hero_label">{{ s.hero_label }}</p></div>
        <div v-if="s.address || s.hours"><h4 class="label mb-2">Lokasi</h4><p>{{ s.address }}</p><p>{{ s.hours }}</p></div>
        <div class="grid content-start gap-1">
          <h4 class="label mb-1">Ikuti Kami</h4>
          <a v-if="s.instagram" :href="`https://instagram.com/${s.instagram}`" target="_blank" rel="noopener" class="hover:text-ink">Instagram @{{ s.instagram }}</a>
          <a v-if="s.tiktok" :href="`https://www.tiktok.com/@${s.tiktok}`" target="_blank" rel="noopener" class="hover:text-ink">TikTok @{{ s.tiktok }}</a>
          <a v-if="wa" :href="wa" target="_blank" rel="noopener" class="hover:text-ink">WhatsApp</a>
        </div>
      </div>
      <p class="wrap mt-8 text-xs text-slate-400">© {{ new Date().getFullYear() }} Warlok · {{ s.brand_full }}</p>
    </footer>
  </div>
</template>
