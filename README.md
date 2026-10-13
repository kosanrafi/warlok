# Warlok: Nuxt 4 + Tailwind 4 + Neon

Semua isi (pengaturan, kategori, menu, foto) disimpan di Neon dan diatur lewat `/admin`.

## Langkah
1. Neon > **SQL Editor**: jalankan `neon-setup.sql`, lalu `neon-update.sql` (masing-masing sekali).
2. `cp .env.example .env`, isi `NUXT_DATABASE_URL`, `NUXT_ADMIN_PASSWORD`, `NUXT_SESSION_SECRET` (>= 32 karakter).
3. `npm install && npm run dev` lalu buka http://localhost:3000 dan /admin

## Foto
Di /admin tarik foto ke kotak foto atau klik "Pilih file". Foto dikecilkan otomatis (WebP) lalu disimpan di Neon.

## SEO
- Judul, deskripsi, kata kunci, kota & label hero diatur di admin > Konten Situs.
- Otomatis: canonical, Open Graph, Twitter Card, JSON-LD (CafeOrCoffeeShop), /sitemap.xml, /robots.txt.
- Domain: `NUXT_PUBLIC_SITE_URL` (bawaan https://warloktasik.vercel.app).
- Daftarkan situs di Google Search Console dan kirim https://warloktasik.vercel.app/sitemap.xml
