<script setup lang="ts">
const { data } = await useSite()
const s = computed(() => data.value!.settings)
const lines = computed(() => s.value.hero_title.split('\n').filter(Boolean))
const picks = computed(() => data.value!.menu.slice(0, 4))
const wa = computed(() => (s.value.whatsapp ? `https://wa.me/${s.value.whatsapp}` : ''))
const values = computed(() => [1, 2, 3].map((n) => ({ t: s.value[`value${n}_title`], b: s.value[`value${n}_text`] })).filter((v) => v.t))
const hasContact = computed(() => s.value.address || s.value.hours || wa.value || s.value.instagram)
const name = ref(''), msg = ref('')
const send = () => window.open(`${wa.value}?text=${encodeURIComponent(`Halo Warlok, saya ${name.value}. ${msg.value}`)}`, '_blank', 'noopener')
useSeoMeta({ title: () => `Warlok — ${s.value.brand_full}`, description: () => s.value.seo_description })
</script>
<template>
  <section id="beranda" class="wrap grid items-center gap-10 py-14 md:grid-cols-2 md:py-24">
    <div>
      <span class="label">{{ s.brand_full }}</span>
      <h1 class="my-4 text-5xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl">
        <span v-for="(l, i) in lines" :key="i" class="block" :class="{ 'text-orange': i === lines.length - 1 }">{{ l }}</span>
      </h1>
      <p class="mb-8 max-w-md text-slate-600">{{ s.hero_text }}</p>
      <div class="flex flex-wrap items-center gap-6">
        <NuxtLink to="/menu" class="btn">Lihat Menu</NuxtLink>
        <a v-if="wa" :href="wa" target="_blank" rel="noopener" class="border-b border-orange pb-1 text-xs font-bold uppercase tracking-widest">Pesan via WhatsApp</a>
      </div>
    </div>
    <div class="mx-auto w-full max-w-sm border border-slate-200 bg-white">
      <div class="checks" aria-hidden="true" />
      <div class="grid aspect-[5/4] place-content-center text-center">
        <span class="font-logo -rotate-2 text-5xl text-blue sm:text-6xl">WARLOK</span>
        <span class="font-bold text-orange">{{ s.brand_full }}</span>
      </div>
      <div class="checks" aria-hidden="true" />
    </div>
  </section>

  <section v-if="values.length" class="bg-white py-16">
    <div class="wrap grid gap-10 md:grid-cols-3">
      <div v-for="v in values" :key="v.t" class="border-t border-slate-200 pt-5">
        <h3 class="mb-2 text-xl font-extrabold">{{ v.t }}</h3><p class="text-sm text-slate-600">{{ v.b }}</p>
      </div>
    </div>
  </section>

  <section v-if="s.story_title || s.story_p1" id="cerita" class="bg-mist py-20">
    <div class="wrap max-w-3xl text-center">
      <span class="label">Cerita Kami</span>
      <h2 class="my-4 text-3xl font-extrabold sm:text-4xl">{{ s.story_title }}</h2>
      <p v-if="s.story_p1" class="mb-4 text-slate-600">{{ s.story_p1 }}</p>
      <p v-if="s.story_p2" class="text-slate-600">{{ s.story_p2 }}</p>
    </div>
  </section>

  <section v-if="picks.length" class="wrap py-20">
    <div class="mb-10 flex flex-wrap items-end justify-between gap-4">
      <h2 class="text-3xl font-extrabold sm:text-4xl">Menu Pilihan</h2>
      <NuxtLink to="/menu" class="border-b border-orange pb-1 text-xs font-bold uppercase tracking-widest">Lihat Semua Menu →</NuxtLink>
    </div>
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"><MenuCard v-for="m in picks" :key="m.id" :item="m" /></div>
  </section>

  <section v-if="hasContact" id="kontak" class="bg-white py-20">
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
