export default defineEventHandler(async (e) => {
  await requireAdmin(e)
  await useDb()`delete from menu_items where id=${Number(getRouterParam(e, 'id'))}`
  return { ok: true }
})
