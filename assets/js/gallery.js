/* Yaiya — gallery images shown on gallery.html.

   TO ADD YOUR OWN PHOTOS:
     1. Drop the image file into  assets/img/gallery/
     2. Add a line to the array below, e.g.
          { src: "assets/img/gallery/shop-front.jpg", alt: "หน้าร้านยายย่า / The Yaiya shopfront" },
   Order here = order on the page. Any shape works — the collage is deliberately loose,
   so nothing gets cropped to a grid. See assets/img/gallery/README.md for more.

   The list below is seeded with our existing product photography so the page isn't empty;
   delete any of these once your own gallery shots are in. */

const GALLERY_IMAGES = [
  { src: "assets/img/products/miang-kham-set/miang-kham-4.jpg", alt: "เมี่ยงคำห่อพร้อมทาน / A folded bite of miang kham" },
  { src: "assets/img/products/miang-kham-set/miang-kham-ingredients.jpg", alt: "เครื่องเมี่ยงจัดจาน / Miang kham condiments laid out" },
  { src: "assets/img/products/khing-dong/khing-dong-1.jpg", alt: "ขิงดองแอปเปิ้ลไซเดอร์ / Jars of pickled ginger" },
  { src: "assets/img/products/miang-kham-set/miang-kham-5.jpg", alt: "ชุดเมี่ยงคำพร้อมส่ง / The miang kham set, boxed" },
  { src: "assets/img/products/nam-prik-makham/makham.jpg", alt: "น้ำพริกมะขาม / Tamarind chilli paste with fresh vegetables" },
  { src: "assets/img/products/miang-kham-set/miang-kham-1.jpg", alt: "เมี่ยงคำ / Miang kham" },
  { src: "assets/img/products/pla-ra/plara-1.jpg", alt: "ปลาร้าและเครื่องสมุนไพร / Pla ra with herbs and aromatics" },
  { src: "assets/img/products/khing-dong/khing-dong-2.jpg", alt: "ขิงดอง / Pickled ginger" },
  { src: "assets/img/products/miang-kham-set/miang-kham-2.jpg", alt: "เมี่ยงคำ / Miang kham" },
  { src: "assets/img/products/miang-kham-set/miang-kham-ingredients_2.jpg", alt: "เครื่องเมี่ยงครบเครื่อง / The full spread of condiments" },
  { src: "assets/img/products/khing-dong/khing-dong-4.jpg", alt: "ขิงดองบรรจุขวด / Pickled ginger, jarred by hand" },
  { src: "assets/img/products/miang-kham-set/miang-kham-3.jpg", alt: "เมี่ยงคำ / Miang kham" },
  { src: "assets/img/products/pla-ra/plara-0.jpg", alt: "ปลาร้าสับทรงเครื่อง / Pla ra song khrueang" },
  { src: "assets/img/products/miang-kham-set/miang-kham-6.jpg", alt: "เมี่ยงคำ / Miang kham" },
  { src: "assets/img/products/khing-dong/khing-dong-5.jpg", alt: "ขิงดอง / Pickled ginger" },
  { src: "assets/img/products/miang-kham-set/miang-kham-ingredients_3.jpg", alt: "เครื่องเมี่ยง / Miang kham condiments" },
  { src: "assets/img/products/nam-prik-makham/makham-2.jpg", alt: "น้ำพริกมะขาม / Tamarind chilli paste" },
  { src: "assets/img/products/miang-kham-set/miang-kham-7.jpg", alt: "เมี่ยงคำ / Miang kham" },
  { src: "assets/img/products/khing-dong/khing-dong-6.jpg", alt: "ขิงดอง / Pickled ginger" },
  { src: "assets/img/products/pla-ra/plara-2.jpg", alt: "ปลาร้า / Pla ra" }
];
