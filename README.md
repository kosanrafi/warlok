# Warlok: Nuxt 4 + Tailwind 4 + Neon

Semua isi (pengaturan situs, kategori, menu) disimpan di Neon dan diatur lewat `/admin`. Tidak ada data bawaan di kode.

## Langkah
1. Neon: buat project, buka **SQL Editor**, paste isi `neon-setup.sql`, klik Run (sekali saja).
2. `cp .env.example .env`, isi `NUXT_DATABASE_URL` (dari tombol *Connect* di Neon), `NUXT_ADMIN_PASSWORD`, `NUXT_SESSION_SECRET` (>= 32 karakter).
3. `npm install && npm run dev` lalu buka http://localhost:3000 dan http://localhost:3000/admin

## Halaman
`/` beranda · `/menu` halaman menu · `/admin` panel (Menu, Kategori, Konten Situs)

## Deploy
Isi ketiga env di hosting (Vercel/Netlify/Cloudflare). Halaman publik di-cache (SWR),
perubahan dari admin tampil sekitar 30-60 detik kemudian.
