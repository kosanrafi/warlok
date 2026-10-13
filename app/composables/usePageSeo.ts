// Meta SEO per halaman: title, description, canonical, Open Graph, Twitter, keywords.
export function usePageSeo(o: { title: string; description: string; path: string; keywords?: string; image?: string }) {
  const site = String(useRuntimeConfig().public.siteUrl).replace(/\/$/, '')
  const abs = (p?: string) => (p ? (p.startsWith('http') ? p : site + p) : undefined)
  const image = abs(o.image)
  useSeoMeta({
    title: o.title, description: o.description,
    ogTitle: o.title, ogDescription: o.description, ogUrl: site + o.path, ogType: 'website',
    ogSiteName: 'Warlok', ogLocale: 'id_ID', ogImage: image,
    twitterCard: image ? 'summary_large_image' : 'summary', twitterTitle: o.title, twitterDescription: o.description, twitterImage: image
  })
  useHead({
    link: [{ rel: 'canonical', href: site + o.path }],
    meta: o.keywords ? [{ name: 'keywords', content: o.keywords }] : []
  })
  return { site, abs, image }
}
