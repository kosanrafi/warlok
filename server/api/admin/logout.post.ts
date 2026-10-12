export default defineEventHandler(async (e) => {
  await (await adminSession(e)).clear()
  return { ok: true }
})
