<script setup lang="ts">
const { data } = await useSite()
const s = computed(() => data.value!.settings)
const lines = computed(() => s.value.hero_title.split('\n').filter(Boolean))
const picks = computed(() => data.value!.menu.slice(0, 4))
const wa = computed(() => (s.value.whatsapp ? `https://wa.me/${s.value.whatsapp}` : ''))
const values = computed(() => [1, 2, 3].map((n) => ({ t: s.value[`value${n}_title`], b: s.value[`value${n}_text`] })).filter((v) => v.t))
const hasContact = computed(() => s.value.address || s.value.hours || wa.value || s.value.instagram)
const suffix = computed(() => ` — Warlok${s.value.city ? ' ' + s.value.city : ''}`)
const name = ref(''), msg = ref('')
const send = () => window.open(`${wa.value}?text=${encodeURIComponent(`Halo Warlok, saya ${name.value}. ${msg.value}`)}`, '_blank', 'noopener')

// ---- SEO ----
const v = s.value
const cover = v.hero_image || data.value!.menu.find((m: any) => m.image_url)?.image_url
const { site, abs } = usePageSeo({
  title: v.seo_title || `Warlok — ${v.brand_full}`,
  description: v.seo_description, keywords: v.seo_keywords, path: '/', image: cover
})
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org', '@type': 'CafeOrCoffeeShop',
      name: 'Warlok', alternateName: v.brand_full, url: site, description: v.seo_description,
      image: abs(cover), hasMenu: `${site}/menu`,
      telephone: v.whatsapp ? `+${v.whatsapp}` : undefined,
      address: { '@type': 'PostalAddress', streetAddress: v.address || undefined, addressLocality: v.city || undefined, addressCountry: 'ID' },
      sameAs: [v.instagram && `https://instagram.com/${v.instagram}`, v.tiktok && `https://www.tiktok.com/@${v.tiktok}`].filter(Boolean)
    })
  }]
})
</script>
<template>
  <section id="beranda" class="wrap grid items-center gap-10 py-14 md:grid-cols-2 md:py-24">
    <div>
      <span class="label in" style="--d:0">{{ s.hero_label || s.brand_full }}</span>
      <h1 class="in my-4 text-5xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl" style="--d:1">
        <span v-for="(l, i) in lines" :key="i" class="block" :class="{ 'text-orange': i === lines.length - 1 }">{{ l }}</span>
      </h1>
      <p class="in mb-8 max-w-md text-slate-600" style="--d:2">{{ s.hero_text }}</p>
      <div class="in flex flex-wrap items-center gap-6" style="--d:3">
        <NuxtLink to="/menu" class="btn">Lihat Menu</NuxtLink>
        <a v-if="wa" :href="wa" target="_blank" rel="noopener" class="border-b border-orange pb-1 text-xs font-bold uppercase tracking-widest">Pesan via WhatsApp</a>
      </div>
    </div>
    <img v-if="s.hero_image" :src="s.hero_image" :alt="`${s.brand_full}${suffix}`" width="800" height="1000" fetchpriority="high" class="in mx-auto aspect-[4/5] w-full max-w-sm object-cover" style="--d:2">
    <div v-else class="in mx-auto w-full max-w-sm border border-slate-200 bg-white" style="--d:2">
      <div class="checks" aria-hidden="true" />
      <div class="grid aspect-[5/4] place-content-center text-center">
        <span class="font-logo -rotate-2 text-5xl text-blue sm:text-6xl">WARLOK</span>
        <span class="font-bold text-orange">{{ s.brand_full }}</span>
      </div>
      <div class="checks" aria-hidden="true" />
    </div>
  </section>

  <section v-if="values.length" v-reveal class="bg-white py-16">
    <div class="wrap grid gap-10 md:grid-cols-3">
      <div v-for="x in values" :key="x.t" class="border-t border-slate-200 pt-5">
        <h3 class="mb-2 text-xl font-extrabold">{{ x.t }}</h3><p class="text-sm text-slate-600">{{ x.b }}</p>
      </div>
    </div>
  </section>

  <section v-if="s.story_title || s.story_p1" id="cerita" v-reveal class="bg-mist py-20">
    <div class="wrap max-w-3xl text-center">
      <span class="label">Cerita Kami</span>
      <h2 class="my-4 text-3xl font-extrabold sm:text-4xl">{{ s.story_title }}</h2>
      <p v-if="s.story_p1" class="mb-4 text-slate-600">{{ s.story_p1 }}</p>
      <p v-if="s.story_p2" class="text-slate-600">{{ s.story_p2 }}</p>
    </div>
  </section>

  <section v-if="picks.length" v-reveal class="wrap py-20">
    <div class="mb-10 flex flex-wrap items-end justify-between gap-4">
      <h2 class="text-3xl font-extrabold sm:text-4xl">Menu Pilihan</h2>
      <NuxtLink to="/menu" class="border-b border-orange pb-1 text-xs font-bold uppercase tracking-widest">Lihat Semua Menu →</NuxtLink>
    </div>
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"><MenuCard v-for="m in picks" :key="m.id" :item="m" :suffix="suffix" /></div>
  </section>

  <section v-if="hasContact" id="kontak" v-reveal class="bg-white py-20">
    <div class="wrap grid gap-12 md:grid-cols-2">
      <div class="grid content-start gap-3 text-slate-600">
        <h2 class="mb-2 text-3xl font-extrabold text-ink">Hubungi Kami</h2>
        <p v-if="s.address">{{ s.address }}</p><p v-if="s.hours" class="font-bold text-ink">{{ s.hours }}</p>
        <a v-if="wa" :href="wa" target="_blank" rel="noopener" class="hover:text-ink">WhatsApp {{ s.whatsapp }}</a>
        <a v-if="s.instagram" :href="`https://instagram.com/${s.instagram}`" target="_blank" rel="noopener" class="hover:text-ink">Instagram @{{ s.instagram }}</a>
      </div>
      <form v-if="wa" class="grid content-start gap-6" @submit.prevent="send">
        <input v-model="name" class="input" placeholder="Nama Anda" aria-label="Nama Anda" required>
        <textarea v-model="msg" rows="3" class="input resize-none" placeholder="Pesan atau pesanan Anda" aria-label="Pesan" required />
        <button class="btn justify-self-start">Kirim via WhatsApp</button>
      </form>
    </div>
  </section>
</template>
