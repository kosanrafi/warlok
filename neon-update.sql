-- WARLOK: jalankan SEKALI di Neon > SQL Editor (setelah neon-setup.sql). Aman dijalankan ulang.

-- 1) Tabel penyimpanan foto yang diunggah dari admin
create table if not exists images (
  id         serial primary key,
  mime       text not null,
  data       text not null,
  created_at timestamptz not null default now()
);

-- 2) Pengaturan baru (tidak menimpa yang sudah ada)
insert into settings (key, value) values
  ('city', 'Tasikmalaya'),
  ('hero_label', 'Angkringan Tasikmalaya'),
  ('hero_image', ''),
  ('seo_title', 'Warlok — Angkringan & Warung Kopi di Tasikmalaya'),
  ('seo_keywords', 'warlok, warlok tasikmalaya, angkringan tasikmalaya, warung kopi loka, warung kopi tasikmalaya')
on conflict (key) do nothing;

-- 3) Teks SEO: hanya diganti bila masih teks awal (tidak menimpa hasil edit Anda di admin)
update settings
   set value = 'Warlok (Warung Kopi Loka), angkringan di Tasikmalaya untuk ngopi santai, nongkrong, dan berbagi cerita. Lihat menu kopi dan cemilan kami.'
 where key = 'seo_description' and value = 'Warlok (Warung Kopi Loka): kopi, nongkrong, cerita.';

update settings
   set value = 'Warlok, angkringan dan warung kopi di Tasikmalaya. Tempat singgah buat ngopi santai, nongkrong bareng teman, dan berbagi cerita, dengan kopi, cemilan hangat, dan obrolan yang bikin betah.'
 where key = 'hero_text' and value like 'Tempat singgah buat ngopi santai%';
