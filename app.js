(function () {
  "use strict";

  const CART_KEY = "ns_cart_v1";
  const ORDERS_KEY = "ns_orders_v1";
  const CHANNEL_NAME = "nails_studio_realtime_v1";

  const produkKuku = [
    { id: "ns-01", nama: "Colorful Pop Art", kategori: "Artistic Series", deskripsi: "Desain pop art penuh warna cerah yang ekspresif dan playful.", harga: 75000, bentuk: "Coffin", badge: "Baru", gambar: "kuku/Colorful_pop_art_fake_nails_78669720.jpg" },
    { id: "ns-02", nama: "Cosmic Star Galaxy", kategori: "Fantasy Series", deskripsi: "Motif galaksi bertabur bintang kosmik dengan kilau malam.", harga: 78000, bentuk: "Almond", badge: "Terlaris", gambar: "kuku/Cosmic_star_false_nails_set_d43e1803.jpg" },
    { id: "ns-03", nama: "Cowboy Western Theme", kategori: "Themed Series", deskripsi: "Set kuku bertema koboi western dengan detail unik dan artistik.", harga: 74000, bentuk: "Square", badge: "", gambar: "kuku/Cowboy_western_themed_fake_nails_32489ec9.jpg" },
    { id: "ns-04", nama: "Cyberpunk Neon Grid", kategori: "Futuristic", deskripsi: "Gaya cyberpunk modern dengan aksen garis futuristik yang tajam.", harga: 82000, bentuk: "Stiletto", badge: "Baru", gambar: "kuku/Cyberpunk_fake_nail_set_arranged_5f8aaea8.jpg" },
    { id: "ns-05", nama: "Soft Ivory Classic", kategori: "Minimalis", deskripsi: "Tampilan bersih warna gading lembut untuk kesan anggun sehari-hari.", harga: 55000, bentuk: "Oval", badge: "", gambar: "kuku/Fake_nails_arranged_on_background_f6d56919.jpg" },
    { id: "ns-06", nama: "Studio Signature Display", kategori: "Glam Series", deskripsi: "Set pilihan studio dengan perpaduan kilap gel yang tahan lama.", harga: 65000, bentuk: "Almond", badge: "", gambar: "kuku/Fake_nails_catalog_display_88e57e71.jpg" },
    { id: "ns-07", nama: "Nude Glossy Essential", kategori: "Minimalis", deskripsi: "Warna nude natural dengan lapisan akhir mengkilap sempurna.", harga: 56000, bentuk: "Short Square", badge: "Terlaris", gambar: "kuku/Fake_nails_catalog_photo_0fd3c44e.jpg" },
    { id: "ns-08", nama: "Silk Pearl Finish", kategori: "Glam Series", deskripsi: "Efek kilau mutiara sutra yang lembut dan mewah di jari.", harga: 68000, bentuk: "Almond", badge: "", gambar: "kuku/Fake_nails_catalog_photo_ef719f4c.jpg" },
    { id: "ns-09", nama: "Frozen Ice Crystal", kategori: "Fantasy Series", deskripsi: "Nuansa biru es dingin dengan detail kristal salju berkilauan.", harga: 79000, bentuk: "Coffin", badge: "Baru", gambar: "kuku/Fake_nails_frozen_design_set_d3a969c8.jpg" },
    { id: "ns-10", nama: "Magic Fantasy Aura", kategori: "Fantasy Series", deskripsi: "Desain magis penuh warna fantasi dengan sentuhan shimmer.", harga: 80000, bentuk: "Almond", badge: "", gambar: "kuku/Fake_nails_magic_fantasy_set_17ac94b5.jpg" },
    { id: "ns-11", nama: "Sweet Pastel Neat", kategori: "Pastel Pop", deskripsi: "Pilihan warna pastel manis yang rapi untuk tampilan kasual.", harga: 58000, bentuk: "Oval", badge: "", gambar: "kuku/Fake_nails_neatly_arranged_dffa1284.jpg" },
    { id: "ns-12", nama: "Blush Satin Set", kategori: "Glam Series", deskripsi: "Rona merah muda lembut dengan hasil akhir satin yang halus.", harga: 62000, bentuk: "Almond", badge: "", gambar: "kuku/Fake_nails_set_arranged_5a3bf7e6.jpg" },
    { id: "ns-13", nama: "Minimalist Cream Set", kategori: "Minimalis", deskripsi: "Warna krem netral yang mudah dipadukan dengan berbagai busana.", harga: 55000, bentuk: "Square", badge: "", gambar: "kuku/Fake_nails_set_arranged_neatly_c0f2f83c.jpg" },
    { id: "ns-14", nama: "Chic Everyday Nails", kategori: "Minimalis", deskripsi: "Desain simpel dan modern yang nyaman dipakai beraktivitas.", harga: 57000, bentuk: "Short Square", badge: "", gambar: "kuku/Fake_nails_set_displayed_16c67bd7.jpg" },
    { id: "ns-15", nama: "Warm Beige Gloss", kategori: "Earth Tone", deskripsi: "Nuansa beige hangat dengan kilap salon yang elegan.", harga: 59000, bentuk: "Oval", badge: "", gambar: "kuku/Fake_nails_set_on_background_d0d4da56.jpg" },
    { id: "ns-16", nama: "Soft Velvet Fabric", kategori: "Glam Series", deskripsi: "Tampilan kuku lembut bergaya feminin dengan detail manis.", harga: 64000, bentuk: "Almond", badge: "", gambar: "kuku/Fake_nails_set_on_fabric_3f554c6d.jpg" },
    { id: "ns-17", nama: "Rosewood Shine", kategori: "Earth Tone", deskripsi: "Warna rosewood klasik yang memberikan kesan dewasa dan rapi.", harga: 63000, bentuk: "Coffin", badge: "", gambar: "kuku/Fake_nails_set_on_fabric_8171364c.jpg" },
    { id: "ns-18", nama: "Artisan Motif Set", kategori: "Artistic Series", deskripsi: "Set kuku bermotif artistik dengan detail lukisan tangan.", harga: 72000, bentuk: "Almond", badge: "", gambar: "kuku/Fake_nails_set_with_design_51118adc.jpg" },
    { id: "ns-19", nama: "Spy Movie Noir", kategori: "Themed Series", deskripsi: "Desain misterius terinspirasi film mata-mata yang sleek dan tegas.", harga: 76000, bentuk: "Stiletto", badge: "Baru", gambar: "kuku/Fake_nails_spy_movie_design_c2102cfa.jpg" },
    { id: "ns-20", nama: "Festive Lantern Glow", kategori: "Themed Series", deskripsi: "Motif lentera hangat yang meriah dengan sentuhan warna cerah.", harga: 74000, bentuk: "Almond", badge: "", gambar: "kuku/Fake_nails_with_lantern_design_902b63a3.jpg" },
    { id: "ns-21", nama: "Pirate Adventure Set", kategori: "Themed Series", deskripsi: "Set kuku bertema bajak laut dengan ornamen klasik yang unik.", harga: 75000, bentuk: "Coffin", badge: "", gambar: "kuku/Fake_nails_with_pirate_design_bc8521db.jpg" },
    { id: "ns-22", nama: "Sweet Strawberry Berry", kategori: "Pastel Pop", deskripsi: "Desain buah stroberi imut di atas warna dasar lembut yang segar.", harga: 69000, bentuk: "Short Square", badge: "Terlaris", gambar: "kuku/Fake_nails_with_strawberry_design_1ad7c828.jpg" },
    { id: "ns-23", nama: "Blush Rose Silk", kategori: "Glam Series", deskripsi: "Nuansa pink lembut dengan kilau halus yang menawan.", harga: 65000, bentuk: "Almond", badge: "", gambar: "kuku/False_nails_arranged_on_fabric_02218fe2.jpg" },
    { id: "ns-24", nama: "Velvet Nude Chic", kategori: "Minimalis", deskripsi: "Warna nude natural yang cocok untuk tampilan sehari-hari.", harga: 58000, bentuk: "Oval", badge: "", gambar: "kuku/False_nails_arranged_on_fabric_404a9257.jpg" },
    { id: "ns-25", nama: "Pearl Shimmer Set", kategori: "Glam Series", deskripsi: "Sentuhan akhir mutiara berkilau untuk kesan anggun dan rapi.", harga: 72000, bentuk: "Coffin", badge: "", gambar: "kuku/False_nails_arranged_on_fabric_47e4c301.jpg" },
    { id: "ns-26", nama: "Soft Pastel Dream", kategori: "Pastel Pop", deskripsi: "Perpaduan warna pastel lembut yang manis dan segar.", harga: 60000, bentuk: "Short Square", badge: "", gambar: "kuku/False_nails_arranged_on_fabric_4ea9c67b.jpg" },
    { id: "ns-27", nama: "Rosy Petal Gloss", kategori: "Glam Series", deskripsi: "Kilap gel bening dengan rona kelopak mawar yang cantik.", harga: 64000, bentuk: "Almond", badge: "", gambar: "kuku/False_nails_arranged_on_fabric_8e0005de.jpg" },
    { id: "ns-28", nama: "Mocha Cream Satin", kategori: "Earth Tone", deskripsi: "Warna cokelat susu hangat dengan hasil akhir satin halus.", harga: 59000, bentuk: "Oval", badge: "", gambar: "kuku/False_nails_arranged_on_fabric_9025b94e.jpg" },
    { id: "ns-29", nama: "Crystal Dew Drop", kategori: "Luxury Series", deskripsi: "Tampilan jernih berkilau dengan detail aksen elegan.", harga: 75000, bentuk: "Coffin", badge: "", gambar: "kuku/False_nails_arranged_on_fabric_9ebebbdc.jpg" },
    { id: "ns-30", nama: "Berry Wine Glaze", kategori: "Bold Series", deskripsi: "Warna merah berry pekat yang berani dan berkelas.", harga: 62000, bentuk: "Stiletto", badge: "", gambar: "kuku/False_nails_arranged_on_fabric_a61f3acd.jpg" },
    { id: "ns-31", nama: "Lavender Mist Set", kategori: "Pastel Pop", deskripsi: "Ungu lavender muda dengan kilau lembut yang menenangkan.", harga: 63000, bentuk: "Almond", badge: "", gambar: "kuku/False_nails_arranged_on_fabric_bf83b364.jpg" },
    { id: "ns-32", nama: "Caramel Swirl Matte", kategori: "Earth Tone", deskripsi: "Nuansa karamel hangat dengan tekstur matte beludru.", harga: 61000, bentuk: "Square", badge: "", gambar: "kuku/False_nails_arranged_on_fabric_c793467b.jpg" },
    { id: "ns-33", nama: "Peach Blossom Aura", kategori: "Pastel Pop", deskripsi: "Efek gradasi warna persik lembut di bagian tengah kuku.", harga: 68000, bentuk: "Oval", badge: "", gambar: "kuku/False_nails_arranged_on_fabric_d420aa6b.jpg" },
    { id: "ns-34", nama: "Champagne Sparkle", kategori: "Luxury Series", deskripsi: "Kilau glitter champagne yang cocok untuk acara pesta malam.", harga: 76000, bentuk: "Coffin", badge: "", gambar: "kuku/False_nails_arranged_on_fabric_e8a153c4.jpg" },
    { id: "ns-35", nama: "Milky White Pure", kategori: "Minimalis", deskripsi: "Putih susu transparan yang bersih, rapi, dan modern.", harga: 55000, bentuk: "Short Square", badge: "", gambar: "kuku/False_nails_arranged_on_fabric_f392a3a3.jpg" },
    { id: "ns-36", nama: "Ruby Velvet Shine", kategori: "Bold Series", deskripsi: "Merah rubi elegan dengan efek kilau mewah seperti kuteks gel.", harga: 70000, bentuk: "Almond", badge: "", gambar: "kuku/False_nails_arranged_on_fabric_f96d4393.jpg" },
    { id: "ns-37", nama: "Dusty Mauve Classic", kategori: "Glam Series", deskripsi: "Perpaduan warna mauve lembut yang cocok untuk semua warna kulit.", harga: 62000, bentuk: "Oval", badge: "", gambar: "kuku/False_nails_arranged_on_fabric_fa334f2e.jpg" },
    { id: "ns-38", nama: "Pearl Ivory Catalog", kategori: "Minimalis", deskripsi: "Warna gading mutiara yang cocok untuk acara formal dan wisuda.", harga: 66000, bentuk: "Oval", badge: "", gambar: "kuku/False_nails_catalog_photo_display_78fd32d6.jpg" },
    { id: "ns-39", nama: "Pure White Linen", kategori: "Minimalis", deskripsi: "Nuansa putih bersih minimalis dengan kilau lembut.", harga: 56000, bentuk: "Square", badge: "", gambar: "kuku/False_nails_on_white_fabric_245d3cef.jpg" },
    { id: "ns-40", nama: "Natural Sheen Set", kategori: "Minimalis", deskripsi: "Tampilan kuku sehat alami dengan efek kilap bening.", harga: 55000, bentuk: "Short Square", badge: "", gambar: "kuku/False_nails_set_on_display_6f18564a.jpg" },
    { id: "ns-41", nama: "Soft Blush Display", kategori: "Glam Series", deskripsi: "Rona pink merona yang manis dan feminin untuk harian.", harga: 63000, bentuk: "Almond", badge: "", gambar: "kuku/False_nails_set_on_display_b8c196db.jpg" },
    { id: "ns-42", nama: "Silk Taupe Collection", kategori: "Earth Tone", deskripsi: "Warna taupe netral yang tenang dan berkelas.", harga: 60000, bentuk: "Oval", badge: "", gambar: "kuku/False_nails_set_on_fabric_7dc1578e.jpg" },
    { id: "ns-43", nama: "Classic French Design", kategori: "Minimalis", deskripsi: "Desain ujung putih klasik yang bersih dan elegan untuk segala acara.", harga: 55000, bentuk: "Square", badge: "Terlaris", gambar: "kuku/False_nails_with_French_design_338985b0.jpg" },
    { id: "ns-44", nama: "Romantic Rose Garden", kategori: "Artistic Series", deskripsi: "Hiasan bunga mawar lembut yang romantis dan anggun.", harga: 73000, bentuk: "Almond", badge: "", gambar: "kuku/False_nails_with_rose_design_2f279d41.jpg" },
    { id: "ns-45", nama: "Futuristic Neon Glow", kategori: "Futuristic", deskripsi: "Warna neon menyala bergaya futuristik yang mencuri perhatian.", harga: 80000, bentuk: "Coffin", badge: "Baru", gambar: "kuku/Futuristic_neon_fake_nails_set_c7ecec72.jpg" },
    { id: "ns-46", nama: "Gold Marble Luxury", kategori: "Luxury Series", deskripsi: "Set kuku bermotif marmer mewah dengan aksen guratan emas.", harga: 79000, bentuk: "Almond", badge: "Terlaris", gambar: "kuku/Gold_marble_false_nails_set_c94f5cff.jpg" },
    { id: "ns-47", nama: "Gothic Horror Noir", kategori: "Themed Series", deskripsi: "Set kuku bernuansa gothic gelap yang dramatis dan artistik.", harga: 78000, bentuk: "Stiletto", badge: "", gambar: "kuku/Gothic_horror_fake_nails_set_613c80d1.jpg" },
    { id: "ns-48", nama: "Kuromi Cute Rebel", kategori: "Character Series", deskripsi: "Set kuku bertema Kuromi dengan perpaduan warna hitam dan ungu imut.", harga: 85000, bentuk: "Almond", badge: "Terlaris", gambar: "kuku/Kuromi_themed_fake_nails_set_919060cd.jpg" },
    { id: "ns-49", nama: "Pastel Romantic Anime", kategori: "Character Series", deskripsi: "Nuansa anime romantis berwarna pastel yang manis dan dreamy.", harga: 82000, bentuk: "Oval", badge: "Baru", gambar: "kuku/Pastel_romantic_anime_fake_nails_ef19e44d.jpg" },
    { id: "ns-50", nama: "Post-Apocalyptic Edge", kategori: "Themed Series", deskripsi: "Desain tekstur metalik industrial yang unik dan berani.", harga: 79000, bentuk: "Stiletto", badge: "", gambar: "kuku/Post-apocalyptic_fake_nail_set_17bde851.jpg" },
    { id: "ns-51", nama: "Red Rose Velvet", kategori: "Bold Series", deskripsi: "Motif mawar merah menyala yang romantis dan memikat.", harga: 74000, bentuk: "Coffin", badge: "", gambar: "kuku/Red_rose_fake_nails_set_2fb9480b.jpg" },
    { id: "ns-52", nama: "Retro Synthwave 80s", kategori: "Futuristic", deskripsi: "Gradasi warna retro synthwave neon khas era 80-an.", harga: 77000, bentuk: "Coffin", badge: "", gambar: "kuku/Retro_synthwave_fake_nails_set_8fcb269b.jpg" },
    { id: "ns-53", nama: "Ruby Red Glamour", kategori: "Bold Series", deskripsi: "Merah rubi pekat berkilau untuk tampilan mewah dan percaya diri.", harga: 68000, bentuk: "Almond", badge: "Terlaris", gambar: "kuku/Ruby_red_fake_nails_set_6618d3d3.jpg" },
    { id: "ns-54", nama: "Little Twin Stars Dream", kategori: "Character Series", deskripsi: "Tema Little Twin Stars bernuansa biru dan pink pastel yang menggemaskan.", harga: 85000, bentuk: "Short Square", badge: "Baru", gambar: "kuku/Sanrio_Little_Twin_Stars_fake_9047ae92.jpg" },
    { id: "ns-55", nama: "Swan Lake Ballet", kategori: "Luxury Series", deskripsi: "Terinspirasi keanggunan balet Swan Lake dengan detail mutiara dan pita.", harga: 84000, bentuk: "Almond", badge: "Baru", gambar: "kuku/Swan_Lake_fake_nails_set_199d1821.jpg" },
    { id: "ns-56", nama: "Crimson Prosperity CNY", kategori: "Festive Series", deskripsi: "Nuansa merah dan emas khas Tahun Baru Imlek yang elegan dan meriah.", harga: 78000, bentuk: "Almond", badge: "Baru", gambar: "kuku/Chinese_New_Year_nail_art_3af78afe.jpg" },
    { id: "ns-57", nama: "Golden Fortune Imlek", kategori: "Festive Series", deskripsi: "Set kuku spesial Imlek dengan aksen ornamen keberuntungan berkilau.", harga: 79000, bentuk: "Coffin", badge: "", gambar: "kuku/Chinese_New_Year_nail_art_eb81051e.jpg" },
    { id: "ns-58", nama: "Merry Holly Christmas", kategori: "Festive Series", deskripsi: "Desain Natal klasik dengan sentuhan warna merah, hijau, dan salju.", harga: 76000, bentuk: "Almond", badge: "", gambar: "kuku/Christmas_nail_art_display_a2e44956.jpg" },
    { id: "ns-59", nama: "Winter Wonderland Noel", kategori: "Festive Series", deskripsi: "Hiasan kuku bertema musim dingin dan Natal yang manis serta hangat.", harga: 77000, bentuk: "Oval", badge: "", gambar: "kuku/Christmas_nail_art_display_a70e0652.jpg" },
    { id: "ns-60", nama: "Festive Pine & Gold", kategori: "Festive Series", deskripsi: "Perpaduan motif cemara Natal dan glitter emas yang mewah.", harga: 78000, bentuk: "Coffin", badge: "", gambar: "kuku/Christmas_nail_art_display_aa6112b4.jpg" },
    { id: "ns-61", nama: "Snowflake Candy Cane", kategori: "Festive Series", deskripsi: "Motif permen tongkat dan kepingan salju yang ceria untuk liburan.", harga: 75000, bentuk: "Short Square", badge: "Terlaris", gambar: "kuku/Christmas_press-on_nails_display_77dda0ee.jpg" },
    { id: "ns-62", nama: "Cozy Holiday Sparkle", kategori: "Festive Series", deskripsi: "Kilau hangat khas malam Natal dengan detail artistik yang rapi.", harga: 76000, bentuk: "Almond", badge: "", gambar: "kuku/Christmas_press-on_nails_display_ae1756c8.jpg" },
    { id: "ns-63", nama: "Santa Velvet Cheer", kategori: "Festive Series", deskripsi: "Set kuku Natal dengan aksen merah beludru dan hiasan pesta.", harga: 75000, bentuk: "Square", badge: "", gambar: "kuku/Christmas_press-on_nails_display_db76a351.jpg" },
    { id: "ns-64", nama: "Frosty Garland Set", kategori: "Festive Series", deskripsi: "Desain Natal bernuansa sejuk dengan detail halus di setiap jari.", harga: 77000, bentuk: "Almond", badge: "", gambar: "kuku/Christmas_press-on_nail_design_f62a9ce3.jpg" },
    { id: "ns-65", nama: "Jingle Bell Shimmer", kategori: "Festive Series", deskripsi: "Tampilan kuku Natal penuh kilau untuk melengkapi momen spesial.", harga: 76000, bentuk: "Oval", badge: "", gambar: "kuku/Christmas_press-on_nail_design_fe7b8105.jpg" },
    { id: "ns-66", nama: "Crimson Noel Edition", kategori: "Festive Series", deskripsi: "Kombinasi warna merah Natal dan aksen putih salju yang elegan.", harga: 78000, bentuk: "Coffin", badge: "", gambar: "kuku/Christmas_press-on_nail_set_display_a1dddf5f.jpg" },
    { id: "ns-67", nama: "Starry Eve Christmas", kategori: "Festive Series", deskripsi: "Motif bintang malam Natal dengan efek glossy yang menawan.", harga: 79000, bentuk: "Almond", badge: "Baru", gambar: "kuku/Christmas_press-on_nail_set_display_fa4d15d2.jpg" },
    { id: "ns-68", nama: "Pastel Bunny Easter", kategori: "Seasonal Series", deskripsi: "Desain Paskah ceria dengan warna pastel lembut dan motif kelinci imut.", harga: 72000, bentuk: "Short Square", badge: "", gambar: "kuku/Easter_press-on_nails_display_e7db89cf.jpg" },
    { id: "ns-69", nama: "Spring Egg Blossom", kategori: "Seasonal Series", deskripsi: "Motif musim semi bertema Paskah yang segar, manis, dan penuh warna.", harga: 71000, bentuk: "Oval", badge: "", gambar: "kuku/Easter_press-on_nail_design_display_43998336.jpg" },
    { id: "ns-70", nama: "Daisy Meadow Easter", kategori: "Seasonal Series", deskripsi: "Nuansa padang bunga musim semi dengan warna-warna cerah lembut.", harga: 72000, bentuk: "Almond", badge: "", gambar: "kuku/Easter_press_on_nails_display_99505b1b.jpg" },
    { id: "ns-71", nama: "Imperial Lunar Bloom", kategori: "Festive Series", deskripsi: "Desain Tahun Baru Lunar dengan motif bunga mekar dan aksen emas.", harga: 80000, bentuk: "Almond", badge: "Terlaris", gambar: "kuku/Lunar_New_Year_nail_art_5d021c24.jpg" },
    { id: "ns-72", nama: "Chic Studio Pattern", kategori: "Artistic Series", deskripsi: "Set nail art modern dengan perpaduan motif artistik yang rapi.", harga: 68000, bentuk: "Almond", badge: "", gambar: "kuku/Nail_art_design_display_1f4b81ed.jpg" },
    { id: "ns-73", nama: "Velvet Swirl Art", kategori: "Artistic Series", deskripsi: "Garis swirl lembut bergaya minimalis modern untuk tampil modis.", harga: 67000, bentuk: "Oval", badge: "", gambar: "kuku/Nail_art_design_display_2a1024cf.jpg" },
    { id: "ns-74", nama: "Blush Aura Marble", kategori: "Glam Series", deskripsi: "Kombinasi efek marmer lembut dan warna blush yang feminin.", harga: 70000, bentuk: "Coffin", badge: "", gambar: "kuku/Nail_art_design_display_3667c136.jpg" },
    { id: "ns-75", nama: "Pastel Breeze Set", kategori: "Pastel Pop", deskripsi: "Warna pastel lembut dengan detail bersih untuk tampilan harian.", harga: 64000, bentuk: "Short Square", badge: "", gambar: "kuku/Nail_art_design_display_50476186.jpg" },
    { id: "ns-76", nama: "Glam Shimmer Muse", kategori: "Glam Series", deskripsi: "Kilau shimmer halus yang membuat tampilan tangan tampak lebih cerah.", harga: 69000, bentuk: "Almond", badge: "", gambar: "kuku/Nail_art_design_display_50a49842.jpg" },
    { id: "ns-77", nama: "Soft French Twist", kategori: "Minimalis", deskripsi: "Sentuhan modern pada gaya French tip klasik yang anggun.", harga: 65000, bentuk: "Square", badge: "", gambar: "kuku/Nail_art_design_display_72c2a3b0.jpg" },
    { id: "ns-78", nama: "Pearl Accent Chic", kategori: "Luxury Series", deskripsi: "Set kuku elegan dengan hiasan mutiara kecil yang memikat.", harga: 74000, bentuk: "Almond", badge: "", gambar: "kuku/Nail_art_design_display_7d7eadc9.jpg" },
    { id: "ns-79", nama: "Dreamy Ombre Gloss", kategori: "Glam Series", deskripsi: "Gradasi warna lembut dengan lapisan gel mengkilap tahan lama.", harga: 68000, bentuk: "Oval", badge: "", gambar: "kuku/Nail_art_design_display_7f40e383.jpg" },
    { id: "ns-80", nama: "Mocha Latte Swirl", kategori: "Earth Tone", deskripsi: "Motif hangat bernuansa kopi susu yang tenang dan estetik.", harga: 66000, bentuk: "Coffin", badge: "", gambar: "kuku/Nail_art_design_display_81703f83.jpg" },
    { id: "ns-81", nama: "Artistic Petal Glow", kategori: "Artistic Series", deskripsi: "Sentuhan lukisan kelopak bunga halus untuk kesan manis.", harga: 71000, bentuk: "Almond", badge: "", gambar: "kuku/Nail_art_design_display_ce3557bc.jpg" },
    { id: "ns-82", nama: "Crystal Silk Elegance", kategori: "Luxury Series", deskripsi: "Tampilan mewah dengan efek kilap kristal dan warna dasar lembut.", harga: 75000, bentuk: "Stiletto", badge: "Baru", gambar: "kuku/Nail_art_design_display_fdbca319.jpg" },
    { id: "ns-83", nama: "Butterfly Flutter Set", kategori: "Artistic Series", deskripsi: "Hiasan kupu-kupu cantik dengan detail halus yang tampak hidup.", harga: 76000, bentuk: "Almond", badge: "Terlaris", gambar: "kuku/Nail_art_display_featuring_butterflies_5c117b5c.jpg" },
    { id: "ns-84", nama: "Minimalist Nude Studio", kategori: "Minimalis", deskripsi: "Set kuku bernuansa netral bersih yang cocok untuk acara formal maupun santai.", harga: 60000, bentuk: "Oval", badge: "", gambar: "kuku/Nail_art_display_on_background_1d000a69.jpg" },
    { id: "ns-85", nama: "Rosy Satin Essence", kategori: "Glam Series", deskripsi: "Warna pink lembut dengan hasil akhir mengkilap seperti salon.", harga: 63000, bentuk: "Short Square", badge: "", gambar: "kuku/Nail_art_display_on_background_e3a59b8f.jpg" },
    { id: "ns-86", nama: "Everyday Glam Press-On", kategori: "Glam Series", deskripsi: "Koleksi press-on serbaguna dengan desain manis yang mudah dipadukan.", harga: 65000, bentuk: "Almond", badge: "", gambar: "kuku/Nail_art_display_press-on_set_a866e41a.jpg" },
    { id: "ns-87", nama: "Coquette Ribbon Bow", kategori: "Luxury Series", deskripsi: "Desain bergaya coquette dengan aksen pita manis yang sangat populer.", harga: 78000, bentuk: "Almond", badge: "Terlaris", gambar: "kuku/Nail_art_display_with_bow_af28a22b.jpg" },
    { id: "ns-88", nama: "Sweet Easter Pastel", kategori: "Seasonal Series", deskripsi: "Ornamen Paskah yang ceria berpadu dengan warna pastel lembut.", harga: 72000, bentuk: "Oval", badge: "", gambar: "kuku/Nail_art_display_with_Easter_0943d267.jpg" },
    { id: "ns-89", nama: "Midnight Fireworks Spark", kategori: "Festive Series", deskripsi: "Motif kembang api berkilauan di atas warna dasar malam yang dramatis.", harga: 79000, bentuk: "Coffin", badge: "Baru", gambar: "kuku/Nail_art_display_with_fireworks_c8e9f61b.jpg" },
    { id: "ns-90", nama: "Golden Foil Glamour", kategori: "Luxury Series", deskripsi: "Aksen lembaran emas mewah untuk tampilan jari yang berkelas.", harga: 77000, bentuk: "Almond", badge: "", gambar: "kuku/Nail_art_display_with_gold_a9e49f13.jpg" },
    { id: "ns-91", nama: "Gilded Edge Luxury", kategori: "Luxury Series", deskripsi: "Desain elegan berhias garis dan detail emas yang menawan.", harga: 78000, bentuk: "Coffin", badge: "", gambar: "kuku/Nail_art_display_with_gold_d96e314f.jpg" },
    { id: "ns-92", nama: "Spring Tulip Garden", kategori: "Artistic Series", deskripsi: "Lukisan bunga tulip lembut bernuansa segar untuk tampilan feminin.", harga: 74000, bentuk: "Oval", badge: "Baru", gambar: "kuku/Nail_art_display_with_tulips_9e80c610.jpg" },
    { id: "ns-93", nama: "Signature Chic Press-On", kategori: "Minimalis", deskripsi: "Set kuku praktis dengan tampilan bersih dan kilap gel tahan lama.", harga: 62000, bentuk: "Short Square", badge: "", gambar: "kuku/Nail_art_press-on_set_a2c22896.jpg" },
    { id: "ns-94", nama: "Soft Bloom Collection", kategori: "Glam Series", deskripsi: "Perpaduan warna lembut dan detail manis untuk tampilan anggun.", harga: 66000, bentuk: "Almond", badge: "", gambar: "kuku/Nail_art_set_display_90d7ce55.jpg" },
    { id: "ns-95", nama: "Pure Elegance Set", kategori: "Minimalis", deskripsi: "Desain simpel yang rapi untuk menunjang penampilan profesional.", harga: 60000, bentuk: "Square", badge: "", gambar: "kuku/Press-on_nails_display_6144bf99.jpg" },
    { id: "ns-96", nama: "Modern Chic Motif", kategori: "Artistic Series", deskripsi: "Motif kontemporer yang unik dan tetap nyaman dipakai harian.", harga: 68000, bentuk: "Almond", badge: "", gambar: "kuku/Press-on_nails_display_design_63e27c80.jpg" },
    { id: "ns-97", nama: "Easter Bloom Theme", kategori: "Seasonal Series", deskripsi: "Set kuku bertema Paskah dengan warna ceria yang memikat.", harga: 72000, bentuk: "Oval", badge: "", gambar: "kuku/Press-on_nails_display_Easter_theme_2355abd5.jpg" },
    { id: "ns-98", nama: "Valentine Love Blush", kategori: "Themed Series", deskripsi: "Desain romantis bernuansa pink dan motif hati untuk hari kasih sayang.", harga: 75000, bentuk: "Almond", badge: "Terlaris", gambar: "kuku/Press-on_nails_display_valentine_5f397283.jpg" },
    { id: "ns-99", nama: "Sweetheart Valentine Set", kategori: "Themed Series", deskripsi: "Kombinasi warna manis dan detail cinta yang anggun di jari.", harga: 75000, bentuk: "Coffin", badge: "", gambar: "kuku/Press-on_nails_display_valentine_e38e8369.jpg" },
    { id: "ns-100", nama: "Eid Mubarak Elegance", kategori: "Festive Series", deskripsi: "Desain anggun bertema Lebaran dengan nuansa lembut dan sentuhan emas.", harga: 78000, bentuk: "Almond", badge: "Baru", gambar: "kuku/Press-on_nails_display_with_Eid_eef2281d.jpg" },
    { id: "ns-101", nama: "Easter Meadow Joy", kategori: "Seasonal Series", deskripsi: "Set kuku Paskah dengan detail warna pastel dan hiasan ceria.", harga: 71000, bentuk: "Short Square", badge: "", gambar: "kuku/Press-on_nails_Easter_design_8898fc89.jpg" },
    { id: "ns-102", nama: "Spring Bunny Pastel", kategori: "Seasonal Series", deskripsi: "Motif musim semi bertema Paskah yang segar dan manis dipandang.", harga: 72000, bentuk: "Oval", badge: "", gambar: "kuku/Press-on_nails_Easter_design_e24055e2.jpg" },
    { id: "ns-103", nama: "Easter Egg Speckle", kategori: "Seasonal Series", deskripsi: "Tampilan kuku ceria dengan aksen motif Paskah yang lembut.", harga: 70000, bentuk: "Almond", badge: "", gambar: "kuku/Press-on_nails_Easter_display_a1fd91ed.jpg" },
    { id: "ns-104", nama: "Rose Heart Valentine", kategori: "Themed Series", deskripsi: "Nuansa romantis merah muda dan aksen cinta untuk momen spesial.", harga: 76000, bentuk: "Almond", badge: "Baru", gambar: "kuku/Valentine_press-on_nails_display_2d1c439e.jpg" }
  ];

  let channel = null;
  if (typeof BroadcastChannel !== "undefined") {
    try {
      channel = new BroadcastChannel(CHANNEL_NAME);
    } catch (_) {
      channel = null;
    }
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatRupiah(amount) {
    return "Rp " + (Number(amount) || 0).toLocaleString("id-ID");
  }

  function formatTime(iso) {
    if (!iso) return "-";
    const d = new Date(iso);
    const tgl = d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
    const jam = d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    return `${tgl}, ${jam}`;
  }

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (_) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
  }

  function getItemQtyInCart(productId) {
    const found = getCart().find((i) => i.id === productId);
    return found ? found.qty : 0;
  }

  function addToCart(productId) {
    const product = produkKuku.find((p) => p.id === productId);
    if (!product) return;

    const cart = getCart();
    const existing = cart.find((item) => item.id === productId);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: product.id,
        nama: product.nama,
        harga: product.harga,
        bentuk: product.bentuk,
        gambar: product.gambar,
        qty: 1
      });
    }
    saveCart(cart);
  }

  function updateCartQty(productId, delta) {
    const cart = getCart();
    const idx = cart.findIndex((item) => item.id === productId);
    if (idx === -1) return;

    cart[idx].qty += delta;
    if (cart[idx].qty <= 0) {
      cart.splice(idx, 1);
    }
    saveCart(cart);
  }

  function removeFromCart(productId) {
    saveCart(getCart().filter((item) => item.id !== productId));
  }

  function clearCart() {
    saveCart([]);
  }

  function getCartCount() {
    return getCart().reduce((sum, item) => sum + item.qty, 0);
  }

  function getCartSubtotal() {
    return getCart().reduce((sum, item) => sum + item.harga * item.qty, 0);
  }

  function updateCartBadge() {
    const count = getCartCount();
    document.querySelectorAll(".cart-badge").forEach((el) => {
      el.textContent = count;
    });
  }

  function getOrders() {
    try {
      return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
    } catch (_) {
      return [];
    }
  }

  function saveOrders(orders) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }

  function generateInvoiceId() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `INV-NS-${y}${m}${d}-${rand}`;
  }

  function createOrder(customerData) {
    const cart = getCart();
    if (!cart.length) return null;

    const subtotal = getCartSubtotal();
    const ongkir = customerData.ongkir;
    const invoiceId = generateInvoiceId();
    const qrisRef = "QRIS" + Math.floor(10000000 + Math.random() * 90000000);

    const newOrder = {
      id: invoiceId,
      qrisRef: qrisRef,
      createdAt: new Date().toISOString(),
      customer: customerData,
      items: cart,
      subtotal: subtotal,
      ongkir: ongkir,
      total: subtotal + ongkir,
      paymentMethod: "QRIS",
      status: "PENDING"
    };

    const orders = getOrders();
    orders.unshift(newOrder);
    saveOrders(orders);
    clearCart();

    if (channel) {
      channel.postMessage({ type: "ORDER_CREATED", orderId: newOrder.id });
    }
    return newOrder;
  }

  window.NailsApp = {
    produkKuku,
    ORDERS_KEY,
    CHANNEL_NAME,
    channel,
    escapeHtml,
    formatRupiah,
    formatTime,
    getCart,
    saveCart,
    getItemQtyInCart,
    addToCart,
    updateCartQty,
    removeFromCart,
    clearCart,
    getCartCount,
    getCartSubtotal,
    updateCartBadge,
    getOrders,
    saveOrders,
    createOrder
  };

  document.addEventListener("DOMContentLoaded", updateCartBadge);
})();
