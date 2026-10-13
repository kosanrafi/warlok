<script setup lang="ts">
const { data } = await useSite()
const s = computed(() => data.value!.settings)
const cat = ref('all')
const cats = computed(() => data.value!.categories.filter((c: any) => data.value!.menu.some((m: any) => m.category === c.slug)))
const list = computed(() => data.value!.menu.filter((m: any) => cat.value === 'all' || m.category === cat.value))
const city = s.value.city
const suffix = ` — Warlok${city ? ' ' + city : ''}`
const names = data.value!.menu.slice(0, 6).map((m: any) => m.name).join(', ')
usePageSeo({
  title: `Menu Warlok${city ? ' ' + city : ''} | Kopi & Cemilan`,
  description: `Menu Warlok${city ? ' ' + city : ''}${names ? ': ' + names : ''}. ${s.value.menu_subtitle}`.slice(0, 160),
  keywords: s.value.seo_keywords, path: '/menu',
  image: s.value.hero_image || data.value!.menu.find((m: any) => m.image_url)?.image_url
})
</script>
<template>
  <section class="wrap py-14 text-center md:py-20">
    <span class="label in" style="--d:0">Warlok {{ city }}</span>
    <h1 class="in my-3 text-4xl font-extrabold sm:text-5xl" style="--d:1">Menu Kami</h1>
    <p v-if="s.menu_subtitle" class="in mx-auto mb-8 max-w-md text-slate-600" style="--d:2">{{ s.menu_subtitle }}</p>
    <div v-if="cats.length > 1" class="mb-10 flex flex-wrap justify-center gap-6">
      <button class="border-b pb-1 text-[11px] font-bold uppercase tracking-widest" :class="cat === 'all' ? 'border-ink' : 'border-transparent text-slate-400'" @click="cat = 'all'">Semua</button>
      <button v-for="c in cats" :key="c.slug" class="border-b pb-1 text-[11px] font-bold uppercase tracking-widest"
        :class="cat === c.slug ? 'border-ink' : 'border-transparent text-slate-400'" @click="cat = c.slug">{{ c.name }}</button>
    </div>
    <div class="grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-3"><MenuCard v-for="m in list" :key="m.id" v-reveal :item="m" :suffix="suffix" /></div>
    <p v-if="!list.length" class="py-16 text-slate-500">Menu belum tersedia.</p>
  </section>
</template>
