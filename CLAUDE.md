# Yaiya (ยายย่า) — project context

A demo storefront for a Thai home-cooking brand (miang kham, chilli pastes, fermented
preserves). **Plain static HTML/CSS/JS — no build step, no framework, no `package.json`.**
Every page is a standalone `.html` file that pulls in shared `<script>`s from `assets/js/`.

## Running it locally

No install step. From the repo root:
```
python -m http.server 8000
```
then open `http://localhost:8000`. (Node's `npx serve` also works.)

**Caching gotcha:** the local server and Netlify both aggressively cache static assets.
After any change, verify in an **Incognito/InPrivate window** or hard-refresh
(Ctrl+Shift+R) — a normal refresh often shows stale JS/CSS.

## Deployment: GitHub → Netlify

- GitHub repo: `kmuenpra/yaiya`, branch `main`. Every `git push` to `main` auto-deploys.
- Netlify site: connected via the GitHub integration (Import from Git). Build settings are
  minimal since there's no build step:
  - Build command: *(blank)*
  - Publish directory: `.` (repo root — `index.html` lives there)
  - These are also codified in `netlify.toml` at the repo root, so they don't depend on the
    dashboard config alone.
- `.claude/` is git-ignored — it's local tool config, not part of the site.

## Pages

`index.html` (home), `shop.html` (catalog/filters), `product.html` (detail, reads
`?id=` from the URL), `cart.html`, `checkout.html`. All share the same header/footer markup
and load `assets/js/products.js` + `assets/js/cart.js` + `assets/js/main.js` at minimum.

## Product data — `assets/js/products.js`

Single source of truth: the `PRODUCTS` array. Each product has `id`, `name`/`nameTh`,
`tagline`/`taglineTh`, `story`/`storyTh` (Thai description first, English as subtitle —
this bilingual pattern is used throughout the site), `price`, `image`, `category` (plus an
optional `categories: [...]` array for products that should appear under more than one shop
filter — see `pla-ra`). `getProduct(id)`, `productImage(p)`, `productThumb(p)`, and
`formatTHB(n)` are the shared helpers other pages call into.

A `test-product` entry (฿0, uses `Yaiya_logo.jpg`) exists specifically for testing the
cart/checkout flow end-to-end without needing a real priced item. Safe to delete once no
longer needed — it's flagged with a `// NOTE` comment in the array.

### Disabled features (intentionally left in place, not deleted)

- **3D jar model + hover "unwrap" interactive**: `assets/js/jar3d.js` (Three.js) and the
  `MIANG_KHAM_INTERACTIVE`/`KHING_DONG_INTERACTIVE` objects in `products.js` still exist but
  are unused — the `interactive:` lines on product entries are commented out, and the
  `<script type="module" src="assets/js/jar3d.js">` + importmap in `shop.html`/`product.html`
  are commented out. Static product photos are used instead. Search `NOTE (2026-08-09)` to
  find every spot to restore if 3D is wanted again.

## Cart & checkout

- **Cart** (`assets/js/cart.js`): plain `localStorage` array under key `yaiya_cart_v1`.
  `addToCart`/`setQty`/`removeFromCart`/`clearCart` all funnel through `writeCart()`, which
  fires a `cart:change` event that updates the header badge everywhere.
- **Checkout** (`checkout.html`): builds an `order` object (contact, shipping, payment,
  cart items, totals) via `buildOrder()`, then calls `submitOrder(order)`
  (`assets/js/order-service.js`) — a **swappable adapter**. To move off Netlify Forms later,
  add a new adapter object to `ORDER_ADAPTERS` and flip `ACTIVE_ADAPTER`; nothing in
  `checkout.html` needs to change.
- **Netlify Forms**: submissions land under Site → Forms → **order** in the Netlify
  dashboard. Because the real form is built by JS, a **hidden static twin** of it
  (`<form name="order" data-netlify="true" ...>`, `style="display:none"` — not the `hidden`
  attribute, that tripped up detection once) sits directly in `checkout.html`'s body so
  Netlify's build-time crawler can register it. Field names on that hidden form must stay in
  sync with whatever `order-service.js`'s `netlify` adapter POSTs. Netlify's **Form
  detection** must be explicitly enabled once per site (Site configuration → Forms) — it is
  not automatic just because the markup exists.

## Thai address autofill — `assets/js/th-address.js`

Cascading autofill across Province → District (อำเภอ/เขต) → Subdistrict (ตำบล/แขวง) → Zip,
backed by `assets/data/th-address.json` (trimmed from
[kongvut/thai-province-data](https://github.com/kongvut/thai-province-data): 77 provinces,
930 districts, 7,452 subdistricts+zips). No API key, no external service — it's a local
static file. `initThaiAddress({...})` wires native `<datalist>`-backed inputs; picking any
one field auto-fills the others wherever the data uniquely allows it.

`checkout.html`'s shipping section wraps each step (District/Subdistrict/Zip/Address) in a
`.field.step-hidden` container and progressively reveals each once the prior field has a
value (`wireProgressiveReveal()`). This relies on `th-address.js` dispatching real `input`
events after every programmatic autofill (via its internal `setVal()` helper with an
equal-value guard to avoid infinite cascade loops) — not just on user typing.

## Payment

- **PromptPay QR** is the only live option. Selecting it shows a QR image
  (`assets/PromptPay_Test.png` — a *test* image, not a real merchant QR) plus a bilingual
  (Thai-first) warning that payment must be completed before clicking "Place order" and that
  the PromptPay account name must match the order's name.
- **Cash on delivery** was removed entirely per request.
- **Credit/debit card** is scaffolded but **not active**: `assets/js/payment-service.js`
  (frontend adapter, same swappable pattern as `order-service.js`) and
  `netlify/functions/create-charge.js` (a Netlify Function that currently returns a 501 —
  intentionally fails loudly rather than pretending to charge anyone) are wired up but not
  called from `checkout.html`. The `<option value="card">` is commented out in the payment
  `<select>`. Full activation steps are documented at the top of both of those files —
  short version: sign up with a processor (Omise/2C2P for Thailand, or Stripe for
  international-only), add its secret key as a Netlify environment variable, implement the
  real charge call server-side in `create-charge.js`, use the processor's hosted card
  element client-side so raw card numbers never touch this codebase, then uncomment the
  `<option>` and wire `chargeCard()` into checkout's submit handler.
- No real payment is currently taken anywhere on this site — the confirmation screen says so
  explicitly, and that should stay true until a processor is actually configured.

## Bilingual convention

Thai text first, English as a subtitle/translation beneath or after — used for product
names, taglines, descriptions, and all checkout form labels (e.g. "ชื่อ / First name").
Thai body copy (descriptions, not headings) uses the **Noto Sans Thai** font specifically;
Thai *headings/display* text uses **Chonburi**. Both are loaded via the Google Fonts
`<link>` in every page's `<head>`.
