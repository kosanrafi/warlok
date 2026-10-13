<script setup lang="ts">
defineProps<{ item: any; suffix?: string }>()
</script>
<template>
  <article class="border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg">
    <img v-if="item.image_url" :src="item.image_url" :alt="item.name + (suffix || '')" width="640" height="400" loading="lazy" decoding="async" class="aspect-[16/10] w-full object-cover">
    <div v-else class="grid aspect-[16/10] place-items-center bg-gradient-to-br from-[#dbe7fb] to-[#9dbcf0] text-5xl" aria-hidden="true">{{ item.emoji || '☕' }}</div>
    <div class="p-5">
      <div class="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
        <span class="text-orange">{{ item.tag }}</span><b>{{ rp(item.price) }}</b>
      </div>
      <h3 class="mt-2 text-lg font-extrabold">{{ item.name }}</h3>
      <p v-if="item.description" class="text-sm text-slate-500">{{ item.description }}</p>
    </div>
  </article>
</template>
