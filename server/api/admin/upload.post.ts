// Menerima foto (sudah dikompres di browser, base64) dan menyimpannya di Neon.
export default defineEventHandler(async (e) => {
  await requireAdmin(e)
  const { data, mime } = await readBody(e)
  if (!['image/webp', 'image/jpeg', 'image/png'].includes(mime) || typeof data !== 'string' || !/^[A-Za-z0-9+/=]+$/.test(data))
    throw createError({ statusCode: 400, statusMessage: 'Format gambar tidak valid' })
  if (data.length > 900_000)
    throw createError({ statusCode: 413, statusMessage: 'Gambar terlalu besar, coba foto lain' })
  const sql = useDb()
  try {
    const rows = (await sql`insert into images(mime,data) values (${mime},${data}) returning id`) as any[]
    // hapus foto yatim (tidak dipakai menu/pengaturan, umur > 1 jam) agar database tidak membengkak
    await sql`delete from images i where i.created_at < now() - interval '1 hour'
      and not exists (select 1 from menu_items m where m.image_url = '/api/img/' || i.id)
      and not exists (select 1 from settings s where s.value = '/api/img/' || i.id)`
    return { url: `/api/img/${rows[0].id}` }
  } catch (err) { dbFail(err) }
})
