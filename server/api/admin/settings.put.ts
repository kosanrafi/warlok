import { FIELDS } from '~~/shared/fields'

export default defineEventHandler(async (e) => {
  await requireAdmin(e)
  const b = await readBody(e)
  const sql = useDb()
  await sql.transaction(FIELDS.filter((f) => f.key in b).map((f) => {
    const value = str(b[f.key], 600)
    return sql`insert into settings(key,value) values (${f.key},${value})
               on conflict (key) do update set value = excluded.value`
  }))
  return { ok: true }
})
