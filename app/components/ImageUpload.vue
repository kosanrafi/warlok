<script setup lang="ts">
// Tarik-lepas atau pilih file. Foto dikecilkan di browser (WebP) lalu diunggah ke Neon.
defineProps<{ modelValue?: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const input = ref<HTMLInputElement>()
const busy = ref(false), over = ref(false), error = ref('')

async function shrink(file: File) {
  const url = URL.createObjectURL(file)
  const img = await new Promise<HTMLImageElement>((ok, no) => {
    const i = new Image(); i.onload = () => ok(i); i.onerror = () => no(new Error('Gambar tidak bisa dibaca'))
    i.src = url
  })
  const steps: [number, number][] = [[1200, 0.82], [1000, 0.7], [800, 0.6]]
  for (const [max, q] of steps) {
    const k = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight))
    const c = document.createElement('canvas')
    c.width = Math.round(img.naturalWidth * k); c.height = Math.round(img.naturalHeight * k)
    c.getContext('2d')!.drawImage(img, 0, 0, c.width, c.height)
    let mime = 'image/webp', out = c.toDataURL(mime, q)
    if (!out.startsWith('data:image/webp')) { mime = 'image/jpeg'; out = c.toDataURL(mime, q) } // browser lama
    if (out.length < 800_000 || max === 800) { URL.revokeObjectURL(url); return { mime, data: out.split(',')[1] } }
  }
  throw new Error('Gambar terlalu besar')
}

async function pick(file?: File | null) {
  if (!file) return
  error.value = ''
  if (!file.type.startsWith('image/')) return void (error.value = 'File harus berupa gambar')
  busy.value = true
  try {
    const body = await shrink(file)
    const r: any = await $fetch('/api/admin/upload', { method: 'POST', body })
    emit('update:modelValue', r.url)
  } catch (e: any) { error.value = e?.data?.statusMessage || e?.message || 'Gagal mengunggah' }
  finally { busy.value = false; if (input.value) input.value.value = '' }
}
const drop = (e: DragEvent) => { over.value = false; pick(e.dataTransfer?.files?.[0]) }
</script>

<template>
  <div class="flex items-center gap-3">
    <div role="button" tabindex="0" aria-label="Tarik foto ke sini atau klik untuk memilih"
      class="grid h-20 w-28 shrink-0 cursor-pointer place-items-center overflow-hidden border border-dashed p-1 text-center text-[11px] leading-tight text-slate-500 transition"
      :class="over ? 'border-blue bg-blue/10' : 'border-slate-300 bg-slate-50'"
      @click="input?.click()" @keydown.enter="input?.click()"
      @dragover.prevent="over = true" @dragleave="over = false" @drop.prevent="drop">
      <img v-if="modelValue && !busy" :src="modelValue" alt="" class="h-full w-full object-cover">
      <span v-else-if="busy">Mengunggah…</span>
      <span v-else>Tarik foto ke sini</span>
    </div>
    <div class="grid gap-1 text-xs">
      <button type="button" class="btn btn-line px-3! py-2!" @click="input?.click()">Pilih file</button>
      <button v-if="modelValue" type="button" class="text-left text-red-600" @click="emit('update:modelValue', '')">Hapus foto</button>
      <span v-if="error" class="text-red-600">{{ error }}</span>
    </div>
    <input ref="input" type="file" accept="image/*" class="hidden" @change="pick(($event.target as HTMLInputElement).files?.[0])">
  </div>
</template>
