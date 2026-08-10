/* Yaiya — gallery images shown on gallery.html.

   TO ADD YOUR OWN PHOTOS:
     1. Drop the image file into  assets/img/gallery/
     2. Add a line to the array below, e.g.
          { src: "assets/img/gallery/shop-front.jpg", alt: "หน้าร้านยายย่า / The Yaiya shopfront" },
   Any shape works — the collage is deliberately loose, so nothing gets cropped to a grid.
   See assets/img/gallery/README.md for more.

   IMPORTANT — always use FORWARD slashes in `src`, even on Windows.
   Backslashes are escape characters in JavaScript, so "assets\img\..." silently becomes
   a broken path (`\t` turns into a tab, `\n` into a newline, etc.).
     WRONG:  "assets\img\gallery\photo.jpg"
     RIGHT:  "assets/img/gallery/photo.jpg"

   ORDER: the page shuffles this list on every load, so the order here doesn't matter —
   visitors see a fresh arrangement each time they refresh. The exception is GALLERY_PINNED
   below: those always lead, in the order listed, and only the rest are shuffled behind them.

   COMIC CARDS: any file whose name contains "yaiya-comic" is treated as a "ยายย่า บอกว่า"
   card — it shows the Yaiya silhouette as a cover with a golden glow, and flips over to
   reveal the comic when clicked. Just name the file accordingly; nothing else to set.

   NOTE (2026-08-10): lists every photo in assets/img/gallery/ (booth shots, Farm-to-Market,
   cha-phlu leaves, close-ups, ingredients, delivery and the yaiya-comic series), plus the
   original product-photography entries kept at the bottom.

   If a listed file is later deleted, the page hides that tile rather than showing a blank
   gap — but keeping this list in step with the folder is still the tidier habit. */

/* Photos that should always lead the gallery, in exactly this order — everything else is
   shuffled in behind them.

   A pin only REORDERS a photo that is already in GALLERY_IMAGES below; it does not add one.
   So to pin a new photo, add it to GALLERY_IMAGES first, then list its `src` here — that way
   its alt text is only written once. A pin with no matching entry is ignored (and logs a
   warning in the browser console). To unpin, just delete its line here. */
const GALLERY_PINNED = [
  "assets/img/products/miang-kham-set/miang-kham-4.jpg",
  "assets/img/products/miang-kham-set/miang-kham-ingredients.jpg",
  "assets/img/products/khing-dong/khing-dong-1.jpg",
  "assets/img/gallery/chapplu-leaves.jpg",
  "assets/img/products/miang-kham-set/miang-kham-ingredients_3.jpg",
  "assets/img/products/khing-dong/khing-dong-5.jpg",
  "assets/img/gallery/miang-kham-close-up.jpg",
  "assets/img/products/nam-prik-makham/makham.jpg",
  "assets/img/products/miang-kham-set/miang-kham-1.jpg",
  "assets/img/products/pla-ra/plara-1.jpg"
];

const GALLERY_IMAGES = [
  /* ---- assets/img/gallery/ — shop, market stalls and behind the scenes ---- */
  { src: "assets/img/gallery/yaiya-booth.jpg", alt: "บูธยายย่าที่ตลาด / The Yaiya stall, lined with chilli pastes" },
  { src: "assets/img/gallery/yaiya-booth2.jpg", alt: "บูธยายย่าที่ตลาด / The Yaiya market stall" },
  { src: "assets/img/gallery/yaiya-booth3.jpg", alt: "บูธยายย่าที่ตลาด / The Yaiya market stall" },
  { src: "assets/img/gallery/yaiya-booth4.jpg", alt: "บูธยายย่าที่ตลาด / The Yaiya market stall" },
  { src: "assets/img/gallery/yaiya-booth5.jpg", alt: "บูธยายย่าที่ตลาด / The Yaiya market stall" },
  { src: "assets/img/gallery/yaiya-booth6.jpg", alt: "บูธยายย่าที่ตลาด / The Yaiya market stall" },
  { src: "assets/img/gallery/yaiya-booth7.jpg", alt: "บูธยายย่าที่ตลาด / The Yaiya market stall" },
  { src: "assets/img/gallery/yaiya-booth8.jpg", alt: "บูธยายย่าที่ตลาด / The Yaiya market stall" },
  { src: "assets/img/gallery/yaiya-booth9.jpg", alt: "บูธยายย่าที่ตลาด / The Yaiya market stall" },
  { src: "assets/img/gallery/yaiya-booth10.jpg", alt: "บูธยายย่าที่ตลาด / The Yaiya market stall" },
  { src: "assets/img/gallery/Farm-to-Market.jpg", alt: "ยายย่าที่งาน Farm to Market เซ็นทรัล อีสต์วิลล์ / Yaiya at Farm to Market, Central EastVille" },
  { src: "assets/img/gallery/Farm-to-Market2.jpg", alt: "ยายย่าที่งาน Farm to Market / Yaiya at Farm to Market" },

  /* ---- ingredients & dishes ---- */
  { src: "assets/img/gallery/chapplu-leaves.jpg", alt: "ใบชะพลูสด / Fresh cha-phlu (betel) leaves" },
  { src: "assets/img/gallery/chapplu-leaves2.jpg", alt: "ใบชะพลูสด / Fresh cha-phlu (betel) leaves" },
  { src: "assets/img/gallery/miang-kham-close-up.jpg", alt: "เมี่ยงคำใกล้ๆ / Miang kham, up close" },
  { src: "assets/img/gallery/miang-kham-close-up2.jpg", alt: "เมี่ยงคำใกล้ๆ / Miang kham, up close" },
  { src: "assets/img/gallery/miang-kham-close-up3.jpg", alt: "เมี่ยงคำใกล้ๆ / Miang kham, up close" },
  { src: "assets/img/gallery/miang-kham-close-up4.jpg", alt: "เมี่ยงคำใกล้ๆ / Miang kham, up close" },
  { src: "assets/img/gallery/miang-kham-close-up5.jpg", alt: "เมี่ยงคำใกล้ๆ / Miang kham, up close" },
  { src: "assets/img/gallery/miang-kham-close-up6.jpg", alt: "เมี่ยงคำใกล้ๆ / Miang kham, up close" },
  { src: "assets/img/gallery/ingredient.jpg", alt: "วัตถุดิบสดก่อนลงครก — กระเทียม พริกสด และเครื่องเคียง / Fresh ingredients before they hit the mortar — garlic, chillies and aromatics" },
  { src: "assets/img/gallery/khing-dong.jpg", alt: "ขิงดองแอปเปิ้ลไซเดอร์ / Apple-cider pickled ginger" },
  { src: "assets/img/gallery/khing-dong2.jpg", alt: "ขิงดองแอปเปิ้ลไซเดอร์ / Apple-cider pickled ginger" },
  { src: "assets/img/gallery/plara.jpg", alt: "ปลาร้าสับทรงเครื่อง / Pla ra song khrueang" },
  { src: "assets/img/gallery/plara2.jpg", alt: "ปลาร้าสับทรงเครื่อง / Pla ra song khrueang" },

  /* ---- "ยายย่า บอกว่า" comic cards — filenames contain "yaiya-comic", so the gallery
         shows them face-down with a golden glow and flips them open on click ---- */
  { src: "assets/img/gallery/yaiya-comic.jpg", alt: "ยายย่า บอกว่า — ของว่างของไทยที่พาเรากลับไปเป็นเด็ก / 'Yaiya says' — the Thai snack that takes you back to childhood" },
  { src: "assets/img/gallery/yaiya-comic2.jpg", alt: "ยายย่า บอกว่า / Yaiya says" },
  { src: "assets/img/gallery/yaiya-comic3.jpg", alt: "ยายย่า บอกว่า / Yaiya says" },
  { src: "assets/img/gallery/yaiya-comic5.jpg", alt: "ยายย่า บอกว่า / Yaiya says" },
  { src: "assets/img/gallery/yaiya-comic6.jpg", alt: "ยายย่า บอกว่า / Yaiya says" },
  { src: "assets/img/gallery/yaiya-comic7.jpg", alt: "ยายย่า บอกว่า / Yaiya says" },

  /* ---- existing product photography (kept from the original seed list) ---- */
  { src: "assets/img/products/miang-kham-set/miang-kham-4.jpg", alt: "เมี่ยงคำห่อพร้อมทาน / A folded bite of miang kham" },
  { src: "assets/img/products/miang-kham-set/miang-kham-ingredients.jpg", alt: "เครื่องเมี่ยงจัดจาน / Miang kham condiments laid out" },
  { src: "assets/img/products/khing-dong/khing-dong-1.jpg", alt: "ขิงดองแอปเปิ้ลไซเดอร์ / Jars of pickled ginger" },
  { src: "assets/img/products/miang-kham-set/miang-kham-5.jpg", alt: "ชุดเมี่ยงคำพร้อมส่ง / The miang kham set, boxed" },
  { src: "assets/img/products/nam-prik-makham/makham.jpg", alt: "น้ำพริกมะขาม / Tamarind chilli paste with fresh vegetables" },
  { src: "assets/img/products/miang-kham-set/miang-kham-1.jpg", alt: "เมี่ยงคำ / Miang kham" },
  { src: "assets/img/products/pla-ra/plara-1.jpg", alt: "ปลาร้าและเครื่องสมุนไพร / Pla ra with herbs and aromatics" },
  { src: "assets/img/products/miang-kham-set/miang-kham-2.jpg", alt: "เมี่ยงคำ / Miang kham" },
  { src: "assets/img/products/miang-kham-set/miang-kham-ingredients_2.jpg", alt: "เครื่องเมี่ยงครบเครื่อง / The full spread of condiments" },
  { src: "assets/img/products/khing-dong/khing-dong-4.jpg", alt: "ขิงดองบรรจุขวด / Pickled ginger, jarred by hand" },
  { src: "assets/img/products/miang-kham-set/miang-kham-3.jpg", alt: "เมี่ยงคำ / Miang kham" },
  { src: "assets/img/products/pla-ra/plara-0.jpg", alt: "ปลาร้าสับทรงเครื่อง / Pla ra song khrueang" },
  { src: "assets/img/products/miang-kham-set/miang-kham-6.jpg", alt: "เมี่ยงคำ / Miang kham" },
  { src: "assets/img/products/khing-dong/khing-dong-5.jpg", alt: "ขิงดอง / Pickled ginger" },
  { src: "assets/img/products/miang-kham-set/miang-kham-ingredients_3.jpg", alt: "เครื่องเมี่ยง / Miang kham condiments" },
  { src: "assets/img/products/miang-kham-set/miang-kham-7.jpg", alt: "เมี่ยงคำ / Miang kham" },
  { src: "assets/img/products/khing-dong/khing-dong-6.jpg", alt: "ขิงดอง / Pickled ginger" },
  { src: "assets/img/products/miang-kham-set/mk_graphic.jpg", alt: "ประโยชน์ของเมี่ยงคำ / The health benefits of miang kham" },
  { src: "assets/img/products/nam-prik-makham/tamarin_graphic.jpg", alt: "ประโยชน์ของน้ำพริกมะขาม / The health benefits of tamarind chilli paste" },
  { src: "assets/img/products/pla-ra/plala_graphic.jpg", alt: "ประโยชน์ของปลาร้า / The health benefits of pla ra" }
];
