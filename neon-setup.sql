-- WARLOK: jalankan SEKALI di Neon > SQL Editor. Aman dijalankan ulang (tidak menimpa data yang sudah ada).

create table if not exists settings (
  key   text primary key,
  value text not null default ''
);

create table if not exists categories (
  id   serial primary key,
  slug text not null unique,
  name text not null,
  sort integer not null default 0
);

create table if not exists menu_items (
  id           serial primary key,
  name         text not null,
  category     text not null references categories(slug) on update cascade on delete restrict,
  tag          text not null default '',
  price        integer not null default 0,
  description  text not null default '',
  image_url    text not null default '',
  emoji        text not null default '',
  is_available boolean not null default true,
  sort         integer not null default 0
);

insert into categories (slug, name, sort) values
  ('kopi', 'Kopi', 0),
  ('cemilan', 'Cemilan Loka', 1)
on conflict (slug) do nothing;

insert into settings (key, value) values
  ('brand_full', 'Warung Kopi Loka'),
  ('tagline', 'Kopi · Nongkrong · Cerita'),
  ('hero_title', E'Kopi,\nNongkrong,\nCerita.'),
  ('hero_text', 'Tempat singgah buat ngopi santai, nongkrong bareng teman, dan berbagi cerita. Ada kopi, ada cemilan hangat, ada obrolan yang bikin betah.'),
  ('value1_title', 'Kopi'),
  ('value1_text', 'Diseduh sederhana, rasanya jujur, dan harganya ramah di kantong.'),
  ('value2_title', 'Nongkrong'),
  ('value2_text', 'Tempat santai untuk ngobrol, bareng teman maupun sendirian.'),
  ('value3_title', 'Cerita'),
  ('value3_text', 'Dari obrolan ringan sampai ide besar, semuanya bisa dimulai dari segelas kopi.'),
  ('story_title', 'Dari Segelas Kopi, Lahir Banyak Cerita.'),
  ('story_p1', 'Warlok (Warung Kopi Loka) hadir sebagai tempat singgah yang santai: segelas kopi, cemilan hangat, dan obrolan yang mengalir.'),
  ('story_p2', 'Dari kopi sampai Cemilan Loka, semuanya kami siapkan sederhana dengan harga yang bersahabat.'),
  ('menu_subtitle', 'Kopi dan Cemilan Loka. Sederhana, hangat, dan ramah di kantong.'),
  ('address', ''),
  ('hours', ''),
  ('whatsapp', '6285282610066'),
  ('instagram', 'warkop.loka'),
  ('tiktok', '_warkoploka'),
  ('seo_description', 'Warlok (Warung Kopi Loka): kopi, nongkrong, cerita.')
on conflict (key) do nothing;

-- Menu awal dari spanduk (nama & harga dibaca dari foto buram: mohon dicek di /admin).
-- Hanya terisi bila tabel menu masih kosong.
insert into menu_items (name, category, tag, price, description, emoji, sort)
select * from (values
  ('Tahu Walik',   'cemilan', 'Cemilan Loka', 12000, '', '🍢', 1),
  ('Pukis Keju',   'cemilan', 'Cemilan Loka', 14000, '', '🧀', 2),
  ('Chicken Roll', 'cemilan', 'Cemilan Loka', 12000, '', '🍗', 3),
  ('Donat Keju',   'cemilan', 'Cemilan Loka', 10000, '', '🍩', 4)
) as v(name, category, tag, price, description, emoji, sort)
where not exists (select 1 from menu_items);
