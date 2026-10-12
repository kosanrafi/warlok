// Daftar kolom konten yang bisa diedit di /admin. Nilainya HANYA dari database (tabel settings).
export const FIELDS = [
  { group: 'Identitas', key: 'brand_full', label: 'Nama lengkap (mis. Warung Kopi Loka)' },
  { group: 'Identitas', key: 'tagline', label: 'Tagline' },
  { group: 'Hero', key: 'hero_title', label: 'Judul (satu baris per kata, baris terakhir berwarna oranye)', long: true },
  { group: 'Hero', key: 'hero_text', label: 'Teks pengantar', long: true },
  { group: 'Tiga kartu nilai', key: 'value1_title', label: 'Kartu 1: judul' },
  { group: 'Tiga kartu nilai', key: 'value1_text', label: 'Kartu 1: teks', long: true },
  { group: 'Tiga kartu nilai', key: 'value2_title', label: 'Kartu 2: judul' },
  { group: 'Tiga kartu nilai', key: 'value2_text', label: 'Kartu 2: teks', long: true },
  { group: 'Tiga kartu nilai', key: 'value3_title', label: 'Kartu 3: judul' },
  { group: 'Tiga kartu nilai', key: 'value3_text', label: 'Kartu 3: teks', long: true },
  { group: 'Cerita Kami', key: 'story_title', label: 'Judul' },
  { group: 'Cerita Kami', key: 'story_p1', label: 'Paragraf 1', long: true },
  { group: 'Cerita Kami', key: 'story_p2', label: 'Paragraf 2', long: true },
  { group: 'Halaman Menu', key: 'menu_subtitle', label: 'Teks di bawah judul menu', long: true },
  { group: 'Kontak & Sosial', key: 'address', label: 'Alamat (kosongkan bila belum ada)' },
  { group: 'Kontak & Sosial', key: 'hours', label: 'Jam buka (kosongkan bila belum ada)' },
  { group: 'Kontak & Sosial', key: 'whatsapp', label: 'WhatsApp (format 62..., tanpa + atau spasi)' },
  { group: 'Kontak & Sosial', key: 'instagram', label: 'Username Instagram (tanpa @)' },
  { group: 'Kontak & Sosial', key: 'tiktok', label: 'Username TikTok (tanpa @)' },
  { group: 'SEO', key: 'seo_description', label: 'Deskripsi untuk Google', long: true }
] as const
