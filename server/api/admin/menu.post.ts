// Tambah (tanpa id) atau ubah (dengan id) satu item menu.
export default defineEventHandler(async (e) => {
  await requireAdmin(e)
  const b = await readBody(e)
  const v = {
    name: str(b.name, 80), category: slugify(b.category), tag: str(b.tag, 40),
    price: Math.max(0, parseInt(b.price) || 0), description: str(b.description, 200),
    image_url: safeUrl(b.image_url), emoji: str(b.emoji, 8),
    is_available: b.is_available !== false, sort: parseInt(b.sort) || 0
  }
  if (!v.name) throw createError({ statusCode: 400, statusMessage: 'Nama menu wajib diisi' })
  if (!v.category) throw createError({ statusCode: 400, statusMessage: 'Pilih kategori dulu (buat di tab Kategori)' })
  const sql = useDb()
  try {
    const rows = (b.id
      ? await sql`update menu_items set name=${v.name},category=${v.category},tag=${v.tag},price=${v.price},
          description=${v.description},image_url=${v.image_url},emoji=${v.emoji},
          is_available=${v.is_available},sort=${v.sort} where id=${Number(b.id)} returning *`
      : await sql`insert into menu_items(name,category,tag,price,description,image_url,emoji,is_available,sort)
          values (${v.name},${v.category},${v.tag},${v.price},${v.description},${v.image_url},${v.emoji},${v.is_available},${v.sort})
          returning *`) as any[]
    return rows[0]
  } catch { throw createError({ statusCode: 400, statusMessage: 'Gagal menyimpan: kategori tidak valid' }) }
})
