<script setup lang="ts">
const { data } = await useSite()
const cat = ref('all')
// tab hanya untuk kategori yang punya menu
const cats = computed(() => data.value!.categories.filter((c: any) => data.value!.menu.some((m: any) => m.category === c.slug)))
const list = computed(() => data.value!.menu.filter((m: any) => cat.value === 'all' || m.category === cat.value))
useSeoMeta({ title: () => `Menu — Warlok`, description: () => data.value!.settings.menu_subtitle })
</script>
<template>
  <section class="wrap py-14 text-center md:py-20">
    <span class="label">Warlok</span>
    <h1 class="my-3 text-4xl font-extrabold sm:text-5xl">Menu Kami</h1>
    <p v-if="data!.settings.menu_subtitle" class="mx-auto mb-8 max-w-md text-slate-600">{{ data!.settings.menu_subtitle }}</p>
    <div v-if="cats.length > 1" class="mb-10 flex flex-wrap justify-center gap-6">
      <button class="border-b pb-1 text-[11px] font-bold uppercase tracking-widest" :class="cat === 'all' ? 'border-ink' : 'border-transparent text-slate-400'" @click="cat = 'all'">Semua</button>
      <button v-for="c in cats" :key="c.slug" class="border-b pb-1 text-[11px] font-bold uppercase tracking-widest"
        :class="cat === c.slug ? 'border-ink' : 'border-transparent text-slate-400'" @click="cat = c.slug">{{ c.name }}</button>
    </div>
    <div class="grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-3"><MenuCard v-for="m in list" :key="m.id" :item="m" /></div>
    <p v-if="!list.length" class="py-16 text-slate-500">Menu belum tersedia.</p>
  </section>
</template>
