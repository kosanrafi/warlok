export default defineEventHandler(async (e) => {
  const { password } = await readBody(e)
  if (!checkPassword(String(password ?? ''))) {
    await new Promise((r) => setTimeout(r, 700)) // memperlambat tebak-tebakan password
    throw createError({ statusCode: 401, statusMessage: 'Password salah' })
  }
  await (await adminSession(e)).update({ ok: true })
  return { ok: true }
})
