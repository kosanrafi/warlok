<script setup lang="ts">
import { FIELDS } from '~~/shared/fields'
definePageMeta({ layout: false })
useHead({ title: 'Admin Warlok', meta: [{ name: 'robots', content: 'noindex' }] })

const authed = ref<boolean | null>(null)
const pw = ref(''), err = ref(''), toast = ref('')
const tab = ref<'menu' | 'cat' | 'site'>('menu')
const items = ref<any[]>([]), cats = ref<any[]>([])
const settings = ref<Record<string, string>>({})

const flash = (t: string) => { toast.value = t; setTimeout(() => (toast.value = ''), 2800) }
async function run(fn: () => Promise<any>, ok: string) {
  try { await fn(); flash(ok) }
  catch (e: any) {
    if (e?.statusCode === 401) authed.value = false
    flash('Gagal: ' + (e?.data?.statusMessage || e?.data?.message || e?.message))
  }
}
async function load() {
  const d: any = await $fetch('/api/admin/data')
  items.value = d.menu; cats.value = d.categories; settings.value = d.settings; authed.value = true
}
onMounted(() => load().catch((e) => { authed.value = false; if (e?.statusCode !== 401) err.value = e?.data?.message || '' }))

async function login() {
  err.value = ''
  try { await $fetch('/api/admin/login', { method: 'POST', body: { password: pw.value } }); pw.value = ''; await load() }
  catch (e: any) { err.value = e?.data?.message || e?.data?.statusMessage || 'Gagal masuk' }
}
async function logout() { await $fetch('/api/admin/logout', { method: 'POST' }); authed.value = false }

// generik: simpan / hapus baris untuk menu & kategori
const add = (list: any[], row: any) => list.unshift(row)
const save = (url: string, row: any) => run(async () => Object.assign(row, await $fetch(url, { method: 'POST', body: row })), 'Tersimpan')
function del(url: string, list: any[], row: any, i: number) {
  if (!row.id) return void list.splice(i, 1)
  if (!confirm(`Hapus "${row.name}"?`)) return
  run(async () => { await $fetch(`${url}/${row.id}`, { method: 'DELETE' }); list.splice(i, 1) }, 'Terhapus')
}
const saveSettings = () => run(() => $fetch('/api/admin/settings', { method: 'PUT', body: settings.value }), 'Konten tersimpan')
const tabs = [['menu', 'Menu'], ['cat', 'Kategori'], ['site', 'Konten Situs']] as const
</script>

<template>
  <div class="mx-auto max-w-5xl p-4 sm:p-6">
    <p v-if="authed === null" class="py-24 text-center text-slate-500">Memuat…</p>

    <form v-else-if="!authed" class="mx-auto mt-24 grid max-w-sm gap-5" @submit.prevent="login">
      <h1 class="font-logo text-4xl text-blue">WARLOK Admin</h1>
      <input v-model="pw" type="password" class="input" placeholder="Password admin" autocomplete="current-password" required>
      <button class="btn">Masuk</button>
      <p class="text-sm text-red-600">{{ err }}</p>
    </form>

    <template v-else>
      <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 class="font-logo text-3xl text-blue">WARLOK Admin</h1>
        <div class="flex gap-2">
          <NuxtLink to="/" target="_blank" class="btn btn-line">Lihat Situs</NuxtLink>
          <button class="btn btn-line" @click="logout">Keluar</button>
        </div>
      </div>
      <div class="mb-6 flex gap-6 border-b border-slate-200 text-xs font-bold uppercase tracking-widest">
        <button v-for="t in tabs" :key="t[0]" class="-mb-px border-b-2 pb-3" :class="tab === t[0] ? 'border-ink' : 'border-transparent text-slate-400'" @click="tab = t[0]">{{ t[1] }}</button>
      </div>

      <!-- MENU -->
      <section v-if="tab === 'menu'" class="grid gap-4">
        <p v-if="!cats.length" class="bg-amber-50 p-3 text-sm text-amber-800">Buat kategori dulu di tab Kategori.</p>
        <p class="text-xs text-slate-500">Tarik foto ke kotak foto atau klik <b>Pilih file</b>, lalu klik <b>Simpan</b> pada baris menunya.</p>
        <div><button class="btn" :disabled="!cats.length" @click="add(items, { id: null, name: '', category: cats[0]?.slug, tag: '', price: 0, description: '', image_url: '', emoji: '', is_available: true, sort: 0 })">+ Tambah Menu</button></div>
        <div v-for="(it, i) in items" :key="it.id ?? 'baru' + i" class="grid gap-3 border border-slate-200 bg-white p-4 sm:grid-cols-6">
          <input v-model="it.name" class="input sm:col-span-2" placeholder="Nama menu">
          <select v-model="it.category" class="input"><option v-for="c in cats" :key="c.slug" :value="c.slug">{{ c.name }}</option></select>
          <input v-model="it.tag" class="input" placeholder="Label (opsional)">
          <input v-model.number="it.price" type="number" min="0" class="input" placeholder="Harga (Rp)">
          <input v-model="it.emoji" class="input" placeholder="Emoji">
          <ImageUpload v-model="it.image_url" class="sm:col-span-6" />
          <input v-model="it.description" class="input sm:col-span-6" placeholder="Deskripsi singkat">
          <label class="flex items-center gap-2 text-sm"><input v-model="it.is_available" type="checkbox"> Tampil</label>
          <input v-model.number="it.sort" type="number" class="input" placeholder="Urutan">
          <div class="flex gap-2 sm:col-span-4 sm:justify-end">
            <button class="btn" @click="save('/api/admin/menu', it)">Simpan</button>
            <button class="btn btn-line" @click="del('/api/admin/menu', items, it, i)">Hapus</button>
          </div>
        </div>
      </section>

      <!-- KATEGORI -->
      <section v-else-if="tab === 'cat'" class="grid gap-4">
        <div><button class="btn" @click="add(cats, { id: null, name: '', slug: '', sort: 0 })">+ Tambah Kategori</button></div>
        <div v-for="(c, i) in cats" :key="c.id ?? 'baru' + i" class="grid gap-3 border border-slate-200 bg-white p-4 sm:grid-cols-5">
          <input v-model="c.name" class="input sm:col-span-2" placeholder="Nama tampil (mis. Kopi)">
          <input v-model="c.slug" class="input" placeholder="slug (mis. kopi)">
          <input v-model.number="c.sort" type="number" class="input" placeholder="Urutan">
          <div class="flex gap-2 sm:justify-end">
            <button class="btn" @click="save('/api/admin/categories', c)">Simpan</button>
            <button class="btn btn-line" @click="del('/api/admin/categories', cats, c, i)">Hapus</button>
          </div>
        </div>
      </section>

      <!-- KONTEN -->
      <form v-else class="grid gap-5" @submit.prevent="saveSettings">
        <template v-for="(f, i) in FIELDS" :key="f.key">
          <h3 v-if="i === 0 || FIELDS[i - 1].group !== f.group" class="label mt-4">{{ f.group }}</h3>
          <div v-if="'type' in f" class="grid gap-1"><span class="text-xs font-bold text-slate-500">{{ f.label }}</span><ImageUpload v-model="settings[f.key]" /><p class="text-xs text-slate-500">Klik <b>Simpan Konten</b> di bawah setelah memilih foto.</p></div>
          <label v-else class="grid gap-1">
            <span class="text-xs font-bold text-slate-500">{{ f.label }}</span>
            <textarea v-if="'long' in f" v-model="settings[f.key]" rows="3" class="input border border-slate-300 p-2" />
            <input v-else v-model="settings[f.key]" class="input">
          </label>
        </template>
        <div><button class="btn">Simpan Konten</button></div>
      </form>
    </template>

    <p v-if="toast" role="status" class="fixed bottom-5 left-1/2 -translate-x-1/2 bg-ink px-5 py-3 text-sm text-white shadow-lg">{{ toast }}</p>
  </div>
</template>
