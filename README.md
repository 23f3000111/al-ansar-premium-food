# Al Ansar Premium Food: website concepts

Two design directions for the same site, each with a home page and one product page that serves all seven product lines.

| Page | File |
|---|---|
| Concept picker (send this one to the client) | `index.html` |
| Concept A, Golden Leaf: home | `golden-leaf.html` |
| Concept A, Golden Leaf: product | `golden-leaf-product.html?p=roti-canai` |
| Concept B, Sedap Pop: home | `sedap-pop.html` |
| Concept B, Sedap Pop: product | `sedap-pop-product.html?p=roti-canai` |

Product slugs: `roti-canai`, `chapati-puri`, `thosai-batter`, `mee-goreng-sambal`, `samosa-curry-puff`, `idiyappam-putu-mayong`, `ginger-shot`.

## Open it

- **On your computer:** double-click `index.html`. Everything is local (fonts, GSAP, Lenis), so it works offline.
- **Share a link:** drag the whole `website` folder onto https://app.netlify.com/drop, which gives you a public URL in about 30 seconds. Any static host works (Vercel, GitHub Pages, cPanel).

## Edit content

Almost all text lives in **`assets/js/data/products.js`** and is shared by both concepts: company details, phone numbers, WhatsApp, email, socials, all seven products (names, copy, cooking steps, facts, prices), badges, reviews and FAQs. Change it once and both concepts update.

Colours are the tokens at the top of `assets/css/golden-leaf.css` and `assets/css/sedap-pop.css`. Sedap Pop's colour per product is set in `products.js` (the `b:` object).

## Replace before launch

Facts marked `(client)` in `products.js` came from Al Ansar's own flyers and packaging. Everything below is a stand-in:

- [ ] **Logo:** the mark and lockup were traced from the flyer (`assets/img/brand/`). Get the official vector and replace both SVGs. The sprite in `assets/js/icons.js` embeds the same paths, so regenerate it too.
- [ ] **Product photos:** stock photos from Pexels (see credits). Only the Mr. Ginger bottle and the carton photo are Al Ansar's own. Real product shots on a plain background drop straight in; keep the file names.
- [ ] **Prices:** only chapati (under RM0.80) and Mr. Ginger (RM5.99) come from client material. Other products show "Ask us for today's price".
- [ ] **Nutrition table:** shows "—" everywhere and needs lab figures.
- [ ] **Pack sizes, spice level, storage after opening:** marked `PLACEHOLDER` in `products.js`.
- [ ] **Testimonials:** written as samples and credited by role only. Replace them with real quotes, used with permission.
- [ ] **Full address and opening hours:** currently "Bandar Perda, Bukit Mertajam, Pulau Pinang" and "Mon–Sat, 9am–6pm".
- [ ] **Halal:** the pages say "MS1500". Confirm the certificate details, and add the official JAKIM logo if they want it shown.
- [ ] **Delivery area and minimum order** (FAQ answers).
- [ ] **Badges per product:** "vegetarian friendly" and "no added preservatives" come from the roti canai carton and chapati pack. Confirm they apply to every product they're shown on (especially samosa and curry puff), and confirm the "Best seller" label on roti canai.
- [ ] **Location:** "Bandar Perda, Penang" appears in the kitchen section, the contact card and the review locations. It was inferred from the 04-539 office number, so confirm it.
- [ ] **More socials:** only Facebook, Instagram and Linktree are linked. Add TikTok or others if they have them.

## Built with

Plain HTML, CSS and JavaScript. There is no build step.

- [GSAP 3.13](https://gsap.com) with ScrollTrigger and SplitText (free for commercial use)
- [Lenis](https://github.com/darkroomengineering/lenis) smooth scrolling (MIT)
- Fonts: Fraunces and Instrument Sans (Golden Leaf), Caprasimo and Bricolage Grotesque (Sedap Pop), all SIL Open Font License, self-hosted
- Icons: [Lucide](https://lucide.dev) (ISC) and [Simple Icons](https://simpleicons.org) (CC0), bundled into `assets/js/icons.js`

Both concepts respect "reduce motion": pinned scenes and scrubbed animations switch off and every section shows as a still layout. Tested at 1440, 1024, 820 and 390 px wide.

## Image credits

Stock photos are from [Pexels](https://www.pexels.com/license/) (free to use, no attribution required). Backgrounds were removed and the images recoloured or cropped for this mockup.

| File in `assets/img/` | Source |
|---|---|
| `products/roti-canai.webp` | [pexels.com/photo/39833390](https://www.pexels.com/photo/39833390/) |
| `products/chapati-puri.webp` | [pexels.com/photo/31150262](https://www.pexels.com/photo/31150262/) |
| `products/thosai-batter.webp` | [pexels.com/photo/38201890](https://www.pexels.com/photo/38201890/) |
| `products/mee-goreng-sambal.webp` | [pexels.com/photo/37106132](https://www.pexels.com/photo/37106132/) |
| `products/samosa-curry-puff.webp` | [pexels.com/photo/36170557](https://www.pexels.com/photo/36170557/) |
| `products/idiyappam-putu-mayong.webp` | [pexels.com/photo/22840373](https://www.pexels.com/photo/22840373/) |
| `products/extra/roti-butter.webp` | [pexels.com/photo/39833413](https://www.pexels.com/photo/39833413/) |
| `products/extra/chapati-stack.webp` | [pexels.com/photo/5589943](https://www.pexels.com/photo/5589943/) |
| `products/extra/puri.webp` | [pexels.com/photo/1080314](https://www.pexels.com/photo/1080314/) |
| `products/extra/thosai-plain.webp, photos/thosai-leaf.webp` | [pexels.com/photo/32229637](https://www.pexels.com/photo/32229637/) |
| `products/extra/idli.webp` | [pexels.com/photo/31199041](https://www.pexels.com/photo/31199041/) |
| `products/extra/mee-2.webp` | [pexels.com/photo/37179944](https://www.pexels.com/photo/37179944/) |
| `products/extra/samosa-plate.webp` | [pexels.com/photo/9027521](https://www.pexels.com/photo/9027521/) |
| `products/extra/curry-puff.webp` | [pexels.com/photo/5881018](https://www.pexels.com/photo/5881018/) |
| `products/extra/curry-puff-spiral.webp` | [pexels.com/photo/19803515](https://www.pexels.com/photo/19803515/) |
| `products/extra/idiyappam-curry.webp` | [pexels.com/photo/9567999](https://www.pexels.com/photo/9567999/) |
| `products/extra/putu-mayong.webp` | [pexels.com/photo/37040180](https://www.pexels.com/photo/37040180/) |
| `photos/tawa-roti.webp` | [pexels.com/photo/38834853](https://www.pexels.com/photo/38834853/) |
| `photos/roti-pan.webp` | [pexels.com/photo/37555450](https://www.pexels.com/photo/37555450/) |
| `decor/leaf-shadow.webp` | [pexels.com/photo/4539405](https://www.pexels.com/photo/4539405/) |
| `decor/leaf-shadow-2.webp` | [pexels.com/photo/38601662](https://www.pexels.com/photo/38601662/) |
| `decor/curry-leaf.webp` | [pexels.com/photo/37215213](https://www.pexels.com/photo/37215213/) |
| `decor/chili-1.webp, chili-2.webp` | [pexels.com/photo/5957547](https://www.pexels.com/photo/5957547/) |
| `decor/dried-chili-1.webp` | [pexels.com/photo/6823275](https://www.pexels.com/photo/6823275/) |
| `decor/lemon-1..3.webp` | [pexels.com/photo/5966648](https://www.pexels.com/photo/5966648/) |
| `decor/dough-1..3.webp` | [pexels.com/photo/30878208](https://www.pexels.com/photo/30878208/) |
| `decor/ginger-slice-1..3.webp` | [pexels.com/photo/15670707](https://www.pexels.com/photo/15670707/) |
| `decor/ginger-root.webp` | [pexels.com/photo/161556](https://www.pexels.com/photo/161556/) |
| `decor/honey-dipper.webp` | [pexels.com/photo/23940105](https://www.pexels.com/photo/23940105/) |

Al Ansar's own material: `products/ginger-shot.webp` (their Mr. Ginger product shot), `photos/kitchen-boxes.webp` (their cartons), and the logo traced from their flyer.
