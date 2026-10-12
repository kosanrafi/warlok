export default defineEventHandler(async (e) => {
  await requireAdmin(e)
  try { await useDb()`delete from categories where id=${Number(getRouterParam(e, 'id'))}` }
  catch { throw createError({ statusCode: 409, statusMessage: 'Kategori masih dipakai oleh menu. Pindahkan atau hapus menunya dulu.' }) }
  return { ok: true }
})
