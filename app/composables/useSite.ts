// Satu request untuk semua halaman publik (di-cache & dipakai bersama).
// Jika API gagal, tampilkan pesan error aslinya (bukan TypeError membingungkan).
export const useSite = async () => {
  const res = await useFetch('/api/site', { key: 'site' })
  if (res.error.value) {
    throw createError({
      statusCode: 500,
      fatal: true,
      statusMessage: 'Gagal memuat data dari database',
      message: (res.error.value.data as any)?.message || res.error.value.message
    })
  }
  return res
}
