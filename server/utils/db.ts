import { neon } from '@neondatabase/serverless'
import { FIELDS } from '~~/shared/fields'

let _sql: ReturnType<typeof neon> | undefined
export const useDb = () => {
  const url = useRuntimeConfig().databaseUrl
  if (!url) throw createError({ statusCode: 500, statusMessage: 'Konfigurasi belum lengkap', message: 'NUXT_DATABASE_URL belum diisi di file .env (restart npm run dev setelah mengubah .env)' })
  return (_sql ??= neon(url))
}

// Mengubah error database menjadi pesan yang jelas.
export function dbFail(e: any): never {
  if (e?.statusCode) throw e
  console.error('[db]', e)
  const noTable = /does not exist/i.test(String(e?.message))
  throw createError({
    statusCode: 500,
    statusMessage: 'Database bermasalah',
    message: noTable
      ? 'Tabel belum ada. Jalankan isi neon-setup.sql di Neon > SQL Editor.'
      : 'Tidak bisa terhubung ke Neon. Pastikan NUXT_DATABASE_URL adalah connection string asli dari dashboard Neon.'
  })
}

export async function getSettings() {
  const rows = (await useDb()`select key,value from settings`) as any[]
  const saved = Object.fromEntries(rows.map((r) => [r.key, r.value]))
  return Object.fromEntries(FIELDS.map((f) => [f.key, saved[f.key] ?? ''])) as Record<string, string>
}

export const str = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max)
export const slugify = (v: unknown) => str(v, 20).toLowerCase().replace(/[^a-z0-9-]/g, '')
export const safeUrl = (v: unknown) => {
  const u = str(v, 500)
  return /^(https?:\/\/|\/)/i.test(u) ? u : ''
}
