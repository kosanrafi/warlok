// Data publik (semua dari Neon) untuk beranda & halaman menu.
export default defineEventHandler(async () => {
  try {
    const sql = useDb()
    const [settings, categories, menu] = await Promise.all([
      getSettings(),
      sql`select slug,name from categories order by sort,id`,
      sql`select id,name,category,tag,price,description,image_url,emoji
          from menu_items where is_available order by sort,id`
    ])
    return { settings, categories: categories as any[], menu: menu as any[] }
  } catch (e) { dbFail(e) }
})
