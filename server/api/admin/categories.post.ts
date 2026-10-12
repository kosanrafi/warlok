// Tambah (tanpa id) atau ubah (dengan id) satu kategori.
export default defineEventHandler(async (e) => {
  await requireAdmin(e)
  const b = await readBody(e)
  const name = str(b.name, 40), slug = slugify(b.slug), sort = parseInt(b.sort) || 0
  if (!name || !slug) throw createError({ statusCode: 400, statusMessage: 'Nama dan slug kategori wajib diisi' })
  const sql = useDb()
  try {
    const rows = (b.id
      ? await sql`update categories set slug=${slug},name=${name},sort=${sort} where id=${Number(b.id)} returning *`
      : await sql`insert into categories(slug,name,sort) values (${slug},${name},${sort}) returning *`) as any[]
    return rows[0]
  } catch { throw createError({ statusCode: 400, statusMessage: 'Gagal menyimpan: slug sudah dipakai' }) }
})
