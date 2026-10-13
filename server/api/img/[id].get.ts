// Menyajikan foto dari Neon. Di-cache lama di browser & CDN (isi foto tidak pernah berubah per id).
export default defineEventHandler(async (e) => {
  const id = Number(getRouterParam(e, 'id'))
  if (!Number.isInteger(id)) throw createError({ statusCode: 404, statusMessage: 'Tidak ditemukan' })
  let rows: any[]
  try { rows = (await useDb()`select mime,data from images where id=${id}`) as any[] } catch (err) { dbFail(err) }
  if (!rows[0]) throw createError({ statusCode: 404, statusMessage: 'Foto tidak ditemukan' })
  setHeader(e, 'content-type', rows[0].mime)
  setHeader(e, 'cache-control', 'public, max-age=31536000, s-maxage=31536000, immutable')
  return Buffer.from(rows[0].data, 'base64')
})
