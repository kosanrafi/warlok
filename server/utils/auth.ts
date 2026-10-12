import { timingSafeEqual } from 'node:crypto'

export const adminSession = (e: any) => {
  const secret = useRuntimeConfig().sessionSecret
  if (String(secret).length < 32)
    throw createError({ statusCode: 500, statusMessage: 'Konfigurasi belum lengkap', message: 'NUXT_SESSION_SECRET belum diisi atau kurang dari 32 karakter. Perbaiki di environment variables lalu redeploy.' })
  return useSession(e, {
    name: 'warlok_admin',
    password: secret, // minimal 32 karakter
    maxAge: 60 * 60 * 8,
    cookie: { httpOnly: true, sameSite: 'lax', secure: !import.meta.dev }
  })
}

export async function requireAdmin(e: any) {
  const s = await adminSession(e)
  if (!s.data.ok) throw createError({ statusCode: 401, statusMessage: 'Belum masuk' })
}

export function checkPassword(input: string) {
  const a = Buffer.from(input), b = Buffer.from(useRuntimeConfig().adminPassword)
  if (!b.length) throw createError({ statusCode: 500, statusMessage: 'Konfigurasi belum lengkap', message: 'NUXT_ADMIN_PASSWORD belum diisi di environment variables.' })
  return a.length === b.length && timingSafeEqual(a, b)
}
