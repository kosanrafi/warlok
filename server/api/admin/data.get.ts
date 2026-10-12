export default defineEventHandler(async (e) => {
  await requireAdmin(e)
  try {
    const sql = useDb()
    const [settings, categories, menu] = await Promise.all([
      getSettings(),
      sql`select * from categories order by sort,id`,
      sql`select * from menu_items order by sort,id`
    ])
    return { settings, categories: categories as any[], menu: menu as any[] }
  } catch (err) { dbFail(err) }
})
