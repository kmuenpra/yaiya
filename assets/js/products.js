/* Yaiya — product catalogue.
   Real product photos can be dropped into each item's `image` field (path or URL).
   When `image` is null, a hand-built SVG illustration is generated as a tasteful placeholder. */

/* NOTE (2026-08-09): the 3D jar model and the hover/click "unwrap" interactive experience
   have been disabled site-wide per request — product cards and detail pages now show a
   plain static photo instead. The MIANG_KHAM_INTERACTIVE / KHING_DONG_INTERACTIVE data below
   and the jar3d.js module are left intact so this can be switched back on later: re-add the
   commented-out `interactive:` lines in the PRODUCTS array and re-enable the jar3d.js
   <script type="module"> tags in shop.html / product.html. */

/* Interactive "unwrap" experience shared by the Miang Kham products.
   `platter` is the top-down ingredients photo; hotspot x/y are % positions over it. */
const MIANG_KHAM_INTERACTIVE = {
  label: "Miang Kham",
  platter: "assets/img/products/miang-kham-set/miang-kham-ingredients.jpg",
  box: "assets/img/products/miang-kham-set/miang-kham-box.png",
  closing: "assets/img/products/miang-kham-set/miang-kham-4.jpg",
  // Extra slideshow images shown after the interactive (slide 1) on the product page
  gallery: [
    "assets/img/products/miang-kham-set/miang-kham-product-price.jpg",
    "assets/img/products/miang-kham-set/mk_graphic.jpg"
  ],
  ingredients: [
    { th:"ใบชะพลู", en:"Betel leaf", x:7,  y:17, bt:"มีแคลเซียมและไฟเบอร์สูง ช่วยขับลมและย่อยอาหาร", be:"High in calcium and fibre; warming and eases digestion." },
    { th:"ขิง",      en:"Ginger",     x:34, y:10, bt:"ช่วยย่อยอาหาร ลดอาการท้องอืด และเพิ่มความอบอุ่นแก่ร่างกาย", be:"Aids digestion, soothes bloating and warms the body." },
    { th:"มะนาว",    en:"Lime",       x:57, y:17, bt:"วิตามินซีสูง ช่วยเสริมภูมิคุ้มกันและความสดชื่น", be:"Rich in vitamin C to boost immunity." },
    { th:"ถั่วลิสง",  en:"Peanut",     x:26, y:39, bt:"โปรตีนและวิตามินอี ช่วยบำรุงผิวและหัวใจ", be:"Protein and vitamin E for skin and heart." },
    { th:"กุ้งแห้ง",  en:"Dried shrimp", x:42, y:48, bt:"แหล่งโปรตีนและแคลเซียมสูง ช่วยบำรุงกระดูก", be:"High in protein and calcium for strong bones." },
    { th:"น้ำเมี่ยง", en:"Palm-sugar sauce", x:88, y:45, bt:"ให้พลังงานและรสกลมกล่อม รวมทุกรสชาติไว้ด้วยกัน", be:"Energy and the balancing sweetness that ties the bite together." },
    { th:"มะพร้าวคั่ว", en:"Toasted coconut", x:9, y:80, bt:"ให้ไขมันดีและไฟเบอร์ ช่วยให้ระบบขับถ่ายทำงานดี", be:"Good fats and fibre to aid digestion." },
    { th:"หอมแดง",   en:"Shallot",    x:60, y:68, bt:"อุดมด้วยสารต้านอนุมูลอิสระ ช่วยลดหวัดและบำรุงหัวใจ", be:"Antioxidants that help fight colds." },
    { th:"พริกขี้หนู", en:"Bird's-eye chilli", x:50, y:91, bt:"กระตุ้นการเผาผลาญและการไหลเวียนเลือด", be:"Boosts metabolism and circulation." }
  ]
};

/* Pickled Ginger — a spinning jar model; "ingredients" here are its health benefits (from ginger_graphic.jpg). */
const KHING_DONG_INTERACTIVE = {
  model: "jar",
  label: "Pickled Ginger",
  jar: "assets/img/products/khing-dong/khing-dong-nobackground.png",
  model3d: "assets/3D-model/Home_2K_00002_.glb",
  label3d: "assets/img/products/khing-dong/khing-dong-label.jpg",
  platter: "assets/img/products/khing-dong/khing-dong-bg.jpg",
  gallery: [
    "assets/img/products/khing-dong/khing-dong-2.jpg",
    "assets/img/products/khing-dong/ginger_graphic.jpg"
  ],
  ingredients: [
    { th:"ลดน้ำหนัก เผาผลาญไขมัน", en:"Weight & fat-burning", x:50, y:11, bt:"ช่วยกระตุ้นการเผาผลาญและควบคุมน้ำหนัก", be:"Boosts metabolism and supports weight control." },
    { th:"ชะลอความแก่", en:"Slows ageing", x:85, y:37, bt:"สารต้านอนุมูลอิสระช่วยชะลอวัย", be:"Antioxidants that help slow ageing." },
    { th:"ช่วยย่อยอาหาร", en:"Aids digestion", x:80, y:80, bt:"กระตุ้นน้ำย่อยและช่วยลดอาการท้องอืด", be:"Stimulates digestion and eases bloating." },
    { th:"บรรเทาโรคเบาหวาน", en:"Helps with diabetes", x:20, y:80, bt:"ช่วยปรับสมดุลระดับน้ำตาลในเลือด", be:"Helps balance blood-sugar levels." },
    { th:"ดีท็อกซ์ ขับของเสีย", en:"Detox & cleanse", x:15, y:37, bt:"ช่วยขับของเสียและล้างสารพิษในร่างกาย", be:"Flushes waste and cleanses the body." }
  ]
};

const PRODUCTS = [
  {
    id: "miang-kham-set",
    name: "Miang Kham Set",
    nameTh: "เมี่ยงคำชุดใหญ่",
    category: "signature",
    price: 320,
    weight: "Serves 4 · 8 condiments",
    heat: 1,
    image: "assets/img/products/miang-kham-set/miang-kham-5.jpg",
    infographic: "assets/img/products/miang-kham-set/mk_graphic.jpg",
    // interactive: MIANG_KHAM_INTERACTIVE, // NOTE: 3D/unwrap interactive disabled — see NOTE at top of file to restore
    taglineTh: "ห่อเมี่ยงคำแบบของคุณเอง ในหนึ่งคำ",
    tagline: "Wrap your own perfect bite",
    blurb:
      "Grandma's table in a box: fresh bai cha-plu leaves, eight toasted condiments, and the palm-sugar sauce that ties it together.",
    storyTh:
      "เมี่ยงคำ แปลได้ว่า 'หนึ่งคำ หลายรสชาติ' คุณห่อใบชะพลู ตักมะพร้าวคั่ว ถั่วลิสง กุ้งแห้ง มะนาว ขิง หอมแดง และพริก แล้วราดด้วยน้ำเมี่ยงสีคาราเมลเข้มข้น ก่อนพับเก็บ รสหวาน เปรี้ยว เค็ม เผ็ด และขมมาพร้อมกันในคำเดียว นี่คือจานอาหารที่เป็นที่มาของชื่อ ยายย่า",
    story:
      "Miang kham means 'one bite, many flavours'. You cradle a betel leaf, spoon in toasted coconut, peanuts, dried shrimp, lime, ginger, shallot and chilli, then a thread of caramel-dark sauce — and fold. Sweet, sour, salty, hot and bitter, all at once. This is the dish Yaiya is named for.",
    components: [
      { th: "มะพร้าวคั่ว", en: "Toasted coconut", note: "sweet & nutty" },
      { th: "ถั่วลิสง", en: "Roasted peanut", note: "earthy crunch" },
      { th: "กุ้งแห้ง", en: "Dried shrimp", note: "deep umami" },
      { th: "มะนาว", en: "Lime", note: "bright & sour" },
      { th: "ขิง", en: "Ginger", note: "warm & sharp" },
      { th: "หอมแดง", en: "Shallot", note: "pungent bite" },
      { th: "พริกขี้หนู", en: "Bird's-eye chilli", note: "clean heat" },
      { th: "น้ำเมี่ยง", en: "Palm-sugar sauce", note: "the binder" }
    ]
  },
  {
    id: "nam-prik-makham",
    name: "Tamarind Chilli Paste",
    nameTh: "น้ำพริกมะขาม",
    category: "paste",
    price: 150,
    weight: "200 g jar",
    heat: 2,
    image: "assets/img/products/nam-prik-makham/makham.jpg",
    infographic: "assets/img/products/nam-prik-makham/tamarin_graphic.jpg",
    taglineTh: "เปรี้ยว หวาน อุดมวิตามินซี",
    tagline: "Sour, sweet & vitamin-rich",
    blurb:
      "Tangy tamarind pounded with roasted chilli, garlic and palm sugar — a bright, fruity dip with real backbone.",
    storyTh:
      "มะขามสดนำมาตำรวมกับพริกคั่ว กระเทียม และน้ำตาลปี๊บ จนได้น้ำพริกเนื้อเนียนรสเปรี้ยวหวานกลมกล่อม อุดมด้วยวิตามินซี ช่วยล้างพิษและกระตุ้นการย่อยอาหาร ตักคลุกกับเนื้อย่าง ปลา หรือผักสดกรอบก็เข้ากันดี",
    story:
      "Fresh tamarind is pounded with roasted chilli, garlic and palm sugar into a glossy, sour-sweet paste. Rich in vitamin C, it's loved as a cleansing, digestive dip — spoon it over grilled meats, fish or crisp vegetables.",
    components: []
  },
  {
    id: "khing-dong",
    name: "Pickled Ginger",
    nameTh: "ขิงดอง",
    category: "preserved",
    price: 160,
    weight: "240 g jar",
    heat: 1,
    image: "assets/img/products/khing-dong/khing-dong-0.jpg",
    infographic: "assets/img/products/khing-dong/ginger_graphic.jpg",
    // interactive: KHING_DONG_INTERACTIVE, // NOTE: 3D jar model disabled — see NOTE at top of file to restore
    taglineTh: "ขิงดองน้ำแอปเปิ้ลไซเดอร์ เพื่อสุขภาพ",
    tagline: "Apple-cider pickled, for wellness",
    blurb:
      "Young ginger pickled in apple-cider brine — bright, warming and traditionally taken to aid digestion.",
    storyTh:
      "ขิงอ่อนหั่นบางดองในน้ำแอปเปิ้ลไซเดอร์จนกรอบและออกรสเปรี้ยวละมุน เป็นของดองเพื่อสุขภาพแบบไทยดั้งเดิม ช่วยระบบย่อยอาหาร บรรเทาอาการปวดเมื่อยตามข้อ และให้ความอบอุ่นแก่ร่างกายจากภายใน",
    story:
      "Tender young ginger is sliced thin and steeped in apple-cider brine until crisp and tangy. A traditional Thai wellness preserve, eaten to ease digestion, soothe aches and joints, and warm the body from within.",
    components: []
  },
  {
    id: "pla-ra",
    name: "Pla Ra · Fermented Fish",
    nameTh: "ปลาร้า",
    category: "preserved",
    categories: ["paste", "preserved"], // shows under both shop filters; `category` above stays primary for badges/labels
    price: 140,
    weight: "300 g jar",
    heat: 1,
    image: "assets/img/products/pla-ra/plara-0.jpg",
    infographic: "assets/img/products/pla-ra/plala_graphic.jpg",
    taglineTh: "รสอูมามิแท้ ดั่งหัวใจอาหารอีสาน",
    tagline: "Isaan's umami soul",
    blurb:
      "Slow-fermented freshwater fish — the deep, savoury backbone of Isaan cooking and a high-protein staple.",
    storyTh:
      "ปลาน้ำจืดหมักเกลือนานหลายเดือนจนได้รสเข้มข้น กลิ่นเฉพาะตัว และรสเค็มอูมามิเต็มคำ อุดมด้วยโปรตีน วิตามินบี และแคลเซียม เป็นหัวใจสำคัญของส้มตำ น้ำพริก และอาหารอีสานนับไม่ถ้วน",
    story:
      "Freshwater fish is salted and fermented for months until it turns rich, funky and intensely savoury. A nutritional powerhouse — high in protein, B-vitamins and calcium — it's the soul of som tam, nam prik and countless Isaan dishes.",
    components: []
  },
  {
    // NOTE: added for testing the cart/checkout flow end-to-end on the live Netlify site.
    // Safe to delete once checkout testing is done — it's not linked from any featured list.
    id: "test-product",
    name: "Test Product",
    nameTh: "สินค้าทดสอบ",
    category: "preserved",
    price: 0,
    weight: "1 unit",
    heat: 0,
    image: "assets/img/Yaiya_logo.jpg",
    infographic: null,
    taglineTh: "สำหรับทดสอบระบบตะกร้าและการชำระเงินเท่านั้น",
    tagline: "For testing cart & checkout only",
    blurb: "A free placeholder item used to test the cart and checkout flow end-to-end.",
    storyTh:
      "รายการนี้สร้างขึ้นเพื่อทดสอบระบบตะกร้าและการชำระเงินเท่านั้น ไม่ใช่สินค้าจริงที่มีขาย",
    story:
      "This is a free placeholder item used to verify the cart and checkout flow end-to-end. It isn't a real product for sale.",
    components: []
  }
];

const CATEGORIES = [
  { id: "signature", th: "เมี่ยงคำ", en: "Signature Miang Kham" },
  { id: "paste", th: "น้ำพริก & พริกแกง", en: "Chilli Pastes" },
  { id: "preserved", th: "ของดอง", en: "Fermented & Preserved" }
];

const CATEGORY_PALETTE = {
  signature: ["#2C5C39", "#1E3D2C"],
  paste: ["#B5392B", "#7E2A20"],
  preserved: ["#C99A3A", "#8A5A1E"]
};

/* Builds an inline SVG "jar of goodness" illustration tinted to the product category.
   Swap `product.image` with a real photo URL to override. */
function productImage(product) {
  if (product.image) {
    return `<img class="pimg" src="${product.image}" alt="${product.name} — ${product.nameTh}" loading="lazy">`;
  }
  const [c1, c2] = CATEGORY_PALETTE[product.category] || ["#2C5C39", "#1E3D2C"];
  const gid = "g_" + product.id.replace(/[^a-z]/gi, "");
  const lid = "l_" + product.id.replace(/[^a-z]/gi, "");
  const isLeaf = product.category === "signature";
  const vessel = isLeaf
    ? `<path d="M100 46c40 26 62 52 62 86 0 33-28 56-62 56s-62-23-62-56c0-34 22-60 62-86z" fill="#2C5C39"/>
       <path d="M100 46c40 26 62 52 62 86 0 33-28 56-62 56s-62-23-62-56c0-34 22-60 62-86z" stroke="#16301F" stroke-width="2"/>
       <path d="M100 60v120" stroke="#7BB089" stroke-width="2" opacity="0.5"/>
       <g fill="#E9D7A6"><circle cx="84" cy="120" r="9"/><circle cx="112" cy="116" r="8"/><circle cx="96" cy="142" r="7"/></g>
       <circle cx="118" cy="140" r="6" fill="#B5392B"/><circle cx="78" cy="142" r="6" fill="#E4C778"/>`
    : `<rect x="58" y="92" width="84" height="96" rx="14" fill="url(#${gid})"/>
       <rect x="58" y="92" width="84" height="96" rx="14" stroke="#00000022" stroke-width="2"/>
       <rect x="70" y="74" width="60" height="26" rx="7" fill="#3A2E1E"/>
       <rect x="62" y="116" width="76" height="52" rx="9" fill="#FBF4E2" opacity="0.92"/>
       <rect x="62" y="116" width="76" height="52" rx="9" fill="url(#${lid})" opacity="0.18"/>
       <text x="100" y="148" text-anchor="middle" font-family="'Chonburi',serif" font-size="22" fill="${c2}">${product.nameTh.slice(0,2)}</text>`;
  return `
  <svg class="pimg" viewBox="0 0 200 220" role="img" aria-label="${product.name} — ${product.nameTh}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/>
      </linearGradient>
      <linearGradient id="${lid}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/>
      </linearGradient>
    </defs>
    <ellipse cx="100" cy="198" rx="64" ry="10" fill="#1E3D2C" opacity="0.10"/>
    ${vessel}
    <path d="M100 40c0-4 2-7 5.4-8.4-1.4 2.4.2 4.6 2.2 5.6-3.4.3-5.8 1.2-7.6 2.8z" fill="#C8A24B"/>
  </svg>`;
}

/* Card thumbnail: the spinning 3D box for products that define `interactive.box`,
   otherwise the standard illustration/photo. */
function productThumb(p) {
  const ix = p.interactive;
  if (ix && ix.model === "jar") {
    return `<div class="mk-thumb mk-thumb-jar"><div class="mk-jar3d" data-jar3d data-model="${ix.model3d || ""}" data-label="${ix.label3d || ""}" data-fallback="${ix.jar || ""}"><img class="mk-jar-poster" src="${ix.jar || ""}" alt="" /></div></div>`;
  }
  if (ix && ix.box) {
    return `<div class="mk-thumb"><div class="mk-box-scene"><div class="mk-box-body"><div class="mk-box-lid" style="background-image:url('${ix.box}')"></div></div></div></div>`;
  }
  return productImage(p);
}

function formatTHB(n) {
  return '<span class="cur">฿</span>' + n.toLocaleString("en-US");
}

function getProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}

/* Renders the interactive "unwrap" experience into `root` and wires its interactions.
   `ix` is a product's `interactive` object. Scoped to `root` so several can live on one page. */
function mountUnwrap(root, ix, opts) {
  if (!root || !ix) return;
  opts = opts || {};
  const compact = !!opts.compact; // compact = listing-card variant (caption overlay, hover-only)
  const triggerClick = !compact && opts.trigger === "click"; // open on click instead of hover
  const label = ix.label || "the set";
  const isJar = ix.model === "jar";
  const lidInner = isJar
    ? `<div class="mk-jar3d" data-jar3d data-model="${ix.model3d || ""}" data-label="${ix.label3d || ""}" data-fallback="${ix.jar || ""}"><img class="mk-jar-poster" src="${ix.jar || ""}" alt="" /></div>`
    : ix.box
      ? `<div class="mk-box-scene"><div class="mk-box-body"><div class="mk-box-lid" style="background-image:url('${ix.box}')"></div></div></div>`
      : `<div class="mk-disc"><img src="assets/img/Yaiya_mark.png" alt=""></div>`;
  const tag = compact ? "span" : "button";
  const hotspotsHtml = ix.ingredients.map((g, i) =>
    `<${tag} class="mk-dot" style="left:${g.x}%;top:${g.y}%" data-i="${i}"${compact ? "" : ` aria-label="${g.en} — ${g.be}"`}></${tag}>`).join("");
  const stageHtml = `
    <div class="mk-stage${isJar ? " mk-model-jar" : ""}"${compact ? "" : ` tabindex="0" role="group" aria-label="Interactive ${label} — activate to reveal more"`}>
      <img class="mk-platter" src="${ix.platter}" alt="${label}" />
      <div class="mk-ring" aria-hidden="true"></div>
      <div class="mk-hotspots">${hotspotsHtml}</div>
      <div class="mk-lid" aria-hidden="true">${lidInner}</div>
      <div class="mk-prompt"><span class="th">เปิด</span>${triggerClick ? "Click to open" : "Hover to open"}${compact ? "" : " →"}</div>
      ${compact ? `<div class="mk-caption" aria-hidden="true"></div>` : ""}
    </div>`;
  const hintHtml = `<p class="hint"><span class="th">เคล็ดลับ</span>Open it, then hover to explore its health benefits.</p>`;
  let readout;
  if (compact) {
    root.innerHTML = stageHtml;
    readout = root.querySelector(".mk-caption");
  } else if (opts.readoutEl) {
    // Render the readout into a separate element (e.g. below a fixed-size slideshow frame)
    root.innerHTML = stageHtml;
    opts.readoutEl.classList.add("mk-readout");
    opts.readoutEl.setAttribute("aria-live", "polite");
    opts.readoutEl.innerHTML = hintHtml;
    readout = opts.readoutEl;
  } else {
    root.innerHTML = stageHtml + `<div class="mk-readout" aria-live="polite">${hintHtml}</div>`;
    readout = root.querySelector(".mk-readout");
  }

  const stage = root.querySelector(".mk-stage");
  const hotspots = root.querySelector(".mk-hotspots");
  const ring = root.querySelector(".mk-ring");
  const dots = [...root.querySelectorAll(".mk-dot")];
  const hint = readout.innerHTML;

  const open = () => stage.classList.add("is-open");
  const setActive = (i) => {
    const g = ix.ingredients[i];
    dots.forEach((d) => d.classList.toggle("active", +d.dataset.i === i));
    stage.classList.add("has-active");
    ring.style.left = g.x + "%"; ring.style.top = g.y + "%";
    readout.innerHTML = compact
      ? `<span class="name-th">${g.th}</span> ${g.en} — ${g.be}`
      : `<div class="mk-fade"><span class="name-th">${g.th}</span><h4>${g.en}</h4><p class="benefit-th">${g.bt}</p><p class="benefit-en">${g.be}</p></div>`;
  };
  const clearActive = () => {
    dots.forEach((d) => d.classList.remove("active"));
    stage.classList.remove("has-active");
    readout.innerHTML = hint;
  };
  const close = () => { stage.classList.remove("is-open"); clearActive(); };
  // toggle: opening reveals ingredients; closing brings the 3D model back and clears any highlight
  const toggle = () => { stage.classList.contains("is-open") ? close() : open(); };

  if (triggerClick) {
    stage.addEventListener("click", (e) => { if (!e.target.closest(".mk-dot")) toggle(); });
    stage.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } });
  } else {
    stage.addEventListener("mouseenter", open);
    stage.addEventListener("mouseleave", close);
    if (!compact) {
      stage.addEventListener("click", (e) => { if (!e.target.closest(".mk-dot")) toggle(); });
      stage.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } });
    }
  }
  dots.forEach((d) => {
    const i = +d.dataset.i;
    d.addEventListener("mouseenter", () => setActive(i));
    if (!compact) {
      d.addEventListener("focus", () => { open(); setActive(i); });
      d.addEventListener("click", (e) => { e.stopPropagation(); open(); setActive(i); });
    }
  });
  hotspots.addEventListener("mouseleave", () => { if (matchMedia("(hover:hover)").matches) clearActive(); });

  // The 3D jar (data-jar3d) is auto-mounted by jar3d.js (an ES module) once it loads.
  if (isJar && window.initJar3D) {
    const c = root.querySelector(".mk-jar3d");
    window.initJar3D(c, { model: c.dataset.model, label: c.dataset.label, fallback: c.dataset.fallback });
  }
}
