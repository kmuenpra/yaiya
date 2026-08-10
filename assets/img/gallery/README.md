# Gallery images

Drop your shop / product photos into **this folder**, then list them in
`assets/js/gallery.js` so they show up on `gallery.html`.

## Adding a photo

1. Save the image here, e.g. `assets/img/gallery/shop-front.jpg`
2. Open `assets/js/gallery.js` and add a line to the `GALLERY_IMAGES` array:

```js
{ src: "assets/img/gallery/shop-front.jpg", alt: "หน้าร้านยายย่า / The Yaiya shopfront" },
```

That's it — the collage and the click-to-enlarge lightbox pick it up automatically.

## Tips

- **Any shape works.** The layout is an intentionally loose collage (masonry columns),
  so tall, wide and square photos all sit together without being cropped to a grid.
- **Order matters** — images appear in the order they're listed.
- Keep files reasonably sized (roughly **under 500 KB**, max ~1600px on the long edge).
  Large photos make the page slow to load, and the gallery shows many at once.
- `alt` text is read aloud by screen readers and shown if an image fails to load.
  Thai / English, like the rest of the site, is ideal.
