export default defineEventHandler((e) => {
  const site = String(useRuntimeConfig().public.siteUrl).replace(/\/$/, '')
  setHeader(e, 'content-type', 'application/xml; charset=utf-8')
  const urls = [['/', '1.0'], ['/menu', '0.8']]
    .map(([p, pr]) => `<url><loc>${site}${p}</loc><changefreq>weekly</changefreq><priority>${pr}</priority></url>`).join('')
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`
})
