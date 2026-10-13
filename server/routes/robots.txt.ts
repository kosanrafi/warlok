export default defineEventHandler((e) => {
  const site = String(useRuntimeConfig().public.siteUrl).replace(/\/$/, '')
  setHeader(e, 'content-type', 'text/plain; charset=utf-8')
  return `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/admin/\n\nSitemap: ${site}/sitemap.xml\n`
})
