import { timingSafeEqual } from 'node:crypto'

export const adminSession = (e: any) =>
  useSession(e, {
    name: 'warlok_admin',
    password: useRuntimeConfig().sessionSecret, // minimal 32 karakter
    maxAge: 60 * 60 * 8,
    cookie: { httpOnly: true, sameSite: 'lax', secure: !import.meta.dev }
  })

export async function requireAdmin(e: any) {
  const s = await adminSession(e)
  if (!s.data.ok) throw createError({ statusCode: 401, statusMessage: 'Belum masuk' })
}

export function checkPassword(input: string) {
  const a = Buffer.from(input), b = Buffer.from(useRuntimeConfig().adminPassword)
  return b.length > 0 && a.length === b.length && timingSafeEqual(a, b)
}
