# Site Teardown: Elyse Residence

**URL:** https://elyse-residence-dev.webflow.io
**Built by:** Unknown agency (Webflow-based development)
**Platform:** Webflow (static export with custom JS/CSS embeds)
**Date analyzed:** 2026-06-06

---

## Tech Stack (Confirmed from Source)

| Technology | Evidence | Purpose |
|---|---|---|
| **Webflow** | `data-wf-domain`, `data-wf-page`, `data-wf-site` attributes; Webflow runtime JS | CMS/builder — generates base HTML/CSS structure |
| **GSAP 3.15.0** | `<script src="...gsap/3.15.0/gsap.min.js">` | Core animation engine for all effects |
| **GSAP ScrollTrigger** | `<script src="...gsap/3.15.0/ScrollTrigger.min.js">` | Scroll-based animations and pinning |
| **GSAP ScrollToPlugin** | `<script src="...gsap/3.15.0/ScrollToPlugin.min.js">` | Smooth scroll-to-anchor behavior |
| **GSAP SplitText** | `<script src="...gsap/3.15.0/SplitText.min.js">` | Character and line splitting for text reveals |
| **Splide.js 4.1.4** | `<script src="...@splidejs/splide@4.1.4/dist/js/splide.min.js">` | Image sliders (projects carousel, modal thumbnails) |
| **jQuery 3.5.1** | `<script src="...jquery-3.5.1.min.dc5e7f18c8.js">` | FAQ dropdowns and nav toggle logic |

---

## Design System

### Colors

| Name/Usage | Value |
|---|---|
| Primary background (`--black-900`) | `#121717` |
| White (`--white`) | `white` |
| White alpha 50 (`--white-alpha-50`) | `#fff3` (~20% opacity) |
| White alpha 500 (`--white-alpha-500`) | `#ffffff80` (50%) |
| White alpha 700 (`--white-alpha-700`) | `#ffffffb3` (70%) |
| White alpha 800 (`--white-alpha-800`) | `#fffc` (80%) |
| White alpha 900 (`--white-alpha-900`) | `#ffffffe6` (90%) |
| Green 700 (CTA form bg) (`--green-700`) | `#254441` |
| Orange (accent) (`--orange`) | `#ff7a00` |
| Gray alpha 200 (beliefs card bg) (`--gray-alpha-200`) | `#e7e1dc33` |
| Gray alpha 500 (`--gray-alpha-500`) | `#e7e1dc8f` |

> **Color philosophy:** Extremely restrained. Dark background with layered white alphas for hierarchy. Only two accent colors — deep green for the contact form and orange for micro-interactions.

### Typography

| Role | Font Family | Weight | Letter-spacing | Size (Desktop) |
|---|---|---|---|---|
| H1 (Hero) | Fragment Serif | 300 (Light) | -0.06em → 0 on hero | **27rem** |
| H2 (Stats numbers) | Fragment Serif | 300 | 0 | 11.25rem |
| H3 (Section headings) | Fragment Serif | 400 | -0.03em | 8.25rem |
| H4 (Project titles) | Fragment Serif | 300 | -0.03em | 7.5rem |
| H5 (Sub-headings) | Fragment Serif | 300 | -0.03em | 4.75rem |
| H5-Glare (About heading) | Fragment Glare | 300 | -0.03em | 4.75rem |
| H6 (Captions/Labels) | Fragment Glare | 400 (italic) | 0.01em | 1.75rem |
| H7 | Fragment Glare | 300 | 0.01em | 2rem |
| H8 | Fragment Glare | 300 | -0.01em | 1rem |
| B0 (Large body) | Inter 28 Pt | 300 | 0 | 2.5rem |
| B1 (Body) | Inter 28 Pt | 300 | 0.04em | 1.25rem |
| B3 (Body small) | Inter 28 Pt | 400 | 0.03em | 1.125rem |
| B4 (Caption body) | Inter 28 Pt | 300 | 0 | 1rem |
| C1 (Small) | Inter 28 Pt | 300 | 0 | 0.8125rem |
| Button | Fragment Serif | 400 | 0 | 1rem (uppercase) |

**Font files (confirmed from `@font-face`):**

| Font | Weight | File |
|---|---|---|
| Inter 28 Pt | 100 (Thin) | `Inter28pt-Thin.woff2` |
| Inter 28 Pt | 200 (ExtraLight) | `Inter28pt-ExtraLight.woff2` |
| Inter 28 Pt | 300 (Light) | `Inter28pt-Light.woff2` |
| Inter 28 Pt | 400 (Regular) | `Inter28pt-Regular.woff2` |
| Fragment Glare | 300 (Light Italic) | `PPFragment-GlareLightItalic.woff2` |
| Fragment Glare | 400 (Regular Italic) | `PPFragment-GlareRegularItalic.woff2` |
| Fragment Serif | 300 (Light) | `PPFragment-SerifLight.woff2` |
| Fragment Serif | 300 (Light Italic) | `PPFragment-SerifLightItalic.woff2` |
| Fragment Serif | 400 (Regular) | `PPFragment-SerifRegular.woff2` |

> **Key insight:** PP Fragment (by Pangram Pangram) is a **premium/paid** font. For a clone, you'd need to license it or substitute with a similar free serif like Cormorant or Playfair Display.

### Spacing System

- **Fluid rem-based system** — `html { font-size: calc(16 * (100vw / 1920)); }` caps at `16px` at ≥1920px, scales down proportionally
- **Mobile:** `font-size: calc(16 * (100vw / 375));` at ≤479px
- **Page padding:** `3.75rem` (60px at 1920px) left/right
- **Container max-width:** `112.5rem` (1800px)
- **Section padding:** `7.5rem` (120px) top/bottom
- **Header height:** `6.75rem` (108px) via `--_size---header`

### Responsive Approach

| Breakpoint | Strategy |
|---|---|
| ≥1920px | Fixed `font-size: 16px` — rem units lock |
| 480–1919px | Fluid scaling `calc(16 * (100vw / 1920))` |
| ≤479px | Mobile fluid `calc(16 * (100vw / 375))`, mobile-specific classes like `mob-h7`, `mob-b4` |

> **No traditional breakpoints.** The fluid rem approach means everything scales proportionally. Mobile is handled with Webflow's tiny breakpoint (479px) and mobile-specific utility classes.

---

## Effects Breakdown

| # | Effect | Implementation | Complexity | Cloneable? |
|---|---|---|---|---|
| 1 | **Hero title char reveal** | GSAP SplitText chars + `yPercent: 100→0` staggered | Med | Yes |
| 2 | **Hero parallax on scroll** | ScrollTrigger scrub, hero image `yPercent` + `scale`, title fades out | Low | Yes |
| 3 | **Text line reveal (sections)** | SplitText lines + mask + `y: '100%' → '0%'` | Med | Yes |
| 4 | **Number counter animation** | GSAP `textContent` tween with `snap`, triggered by ScrollTrigger `once` | Low | Yes |
| 5 | **Image overlay reveal** | CSS overlay div with `scaleX(0)→1` or opacity transition via `[data-anim="img-overlay"]` | Low | Yes |
| 6 | **Image parallax** | `yPercent: 15` + `scale: 1.05` scrubbed with ScrollTrigger | Low | Yes |
| 7 | **Projects slider** | Splide.js loop carousel with custom pagination `(1)`, `(2)`, `(3)` using CSS counters | Med | Yes |
| 8 | **Project title/text transition** | SplitText lines animated out (`y: '-100%'`) then in (`y: '100%' → '0%'`) on slide change | Med | Yes |
| 9 | **Amenities scroll sequence** | Sticky container + mask-gradient wipe (30-slice venetian blind effect) for big images, clip-path inset for small images | High | Yes |
| 10 | **Beliefs cards** | Complex `clip-path polygon` creating diamond/faceted shape, `backdrop-filter: blur(6px)` | Med | Yes (copy polygon) |
| 11 | **FAQ hover dropdown** | Desktop: CSS `opacity + translateX` transition on hover. Mobile: jQuery click + `slideDown` | Med | Yes |
| 12 | **Sticky header with blur** | ScrollTrigger adds `is-scrolled` class → backdrop-filter blur overlay | Low | Yes |
| 13 | **Nav link underline** | `::before` pseudo-element with `scaleX(0→1)` on hover | Low | Yes |
| 14 | **CTA form** | Custom jQuery form validation, input clear buttons, phone mask, terms checkbox | Med | Yes |
| 15 | **Project modal** | Full-screen modal with slide-from-right animation, 30-slice mask wipe for image transitions, SplitText title reveal, thumbnail Splide slider | High | Yes |
| 16 | **Footer stagger reveal** | Multi-step GSAP timeline triggered by scroll: line, then left content, then right content | Med | Yes |
| 17 | **Hero background video** | Webflow native `w-background-video` with poster frame, autoplay, muted | Low | Yes |
| 18 | **Header hide on amenities scroll** | ScrollTrigger on `.anim-track` — header slides out with `yPercent: -100` | Low | Yes |

---

## Implementation Details

### 1. Hero Title Character Reveal (Confirmed from source)

The massive "Elyse" title (27rem!) uses GSAP SplitText to split each character, then animates them from below:

```javascript
const titleSplit = new SplitText('[data-hero="title"]', {
  type: 'chars',
  charsClass: 'char',
  mask: "chars",  // SplitText v3.15+ mask feature wraps chars in overflow:hidden
});

gsap.set(titleSplit.chars, { yPercent: 100 });

heroTL.to(titleSplit.chars, {
  yPercent: 0,
  duration: 2,
  stagger: { each: 0.1 },
}, 0.8);
```

**Key insight:** The `mask: "chars"` option in SplitText automatically creates overflow-hidden wrappers, so characters slide up from behind their containers. No manual wrapper needed.

**Tight kerning trick:** Each character's position is manually adjusted with CSS:
```css
[data-hero='title'] .char-mask:nth-child(2) { left: -1rem; }
[data-hero='title'] .char-mask:nth-child(3) { left: -4.7rem; }
[data-hero='title'] .char-mask:nth-child(4) { left: -6.7rem; }
[data-hero='title'] .char-mask:nth-child(5) { left: -7.8rem; }
```

---

### 2. Hero Scroll Parallax (Confirmed from source)

Simple parallax layers using ScrollTrigger scrub:

```javascript
ScrollTrigger.create({
  trigger: '.hero',
  start: 'top top',
  end: 'bottom top',
  scrub: 1,
  onUpdate: (self) => {
    const progress = self.progress;

    // Background image moves slower (30% travel) + slight zoom
    gsap.to('[data-hero="img"]', {
      yPercent: progress * 30,
      scale: 1 + progress * 0.1,
      ease: 'none', duration: 0,
    });

    // Title moves faster (-50%) and fades out
    gsap.to('[data-hero="title"]', {
      yPercent: progress * -50,
      opacity: 1 - progress,
      ease: 'none', duration: 0,
    });

    // Right content fades 1.5x faster
    gsap.to('[data-hero="content"]', {
      yPercent: progress * -30,
      opacity: 1 - progress * 1.5,
      ease: 'none', duration: 0,
    });
  },
});
```

---

### 3. Amenities Scroll Image Wipe (30-Slice Mask Gradient) — MOST IMPRESSIVE EFFECT

This is the standout effect. As you scroll through the amenities section, new images wipe in using a **venetian blind / strip reveal pattern** achieved with CSS `mask-image` and a dynamically generated gradient.

**How it works:**

1. A sticky container (`100vh`) holds stacked images
2. As scroll progresses, a JS function generates a `linear-gradient` mask with 30 horizontal slices
3. Each slice animates from `0` (transparent) to `1` (black = visible) with a slight stagger delay
4. The result looks like horizontal blinds opening

```javascript
const sliceCount = 30;

function generateMaskGradient(progressArray) {
  const step = 100 / sliceCount;
  let gradient = 'linear-gradient(0deg';
  
  for (let i = 0; i < sliceCount; i++) {
    const start = i * step;
    const progress = progressArray[i]; // 0 to 1
    const visibleEnd = start + step * progress;
    
    gradient += `, black ${start}% ${visibleEnd}%`;
    if (progress < 1) {
      gradient += `, transparent ${visibleEnd}% ${start + step}%`;
    }
  }
  gradient += ')';
  return gradient;
}

// Applied via CSS custom property:
img.style.setProperty('--mask-gradient', generateMaskGradient(progressArray));
```

```css
[data-amenities-anim="big-image"] {
  mask-image: var(--mask-gradient);
  -webkit-mask-image: var(--mask-gradient);
}
```

**Key insight:** This creates a "venetian blind reveal" effect that looks very premium but is really just dynamically computed CSS mask-image values. The 30 slices are animated with GSAP's stagger timing (`i * 0.015`), scrubbed to scroll position.

**The small images** use a simpler `clip-path: inset()` reveal:
```javascript
gsap.fromTo(smallImages[index],
  { clipPath: 'inset(100% 0% 0% 0%)' },
  { clipPath: 'inset(0% 0% 0% 0%)', scrollTrigger: { scrub: 1 } }
);
```

---

### 4. Project Modal with Image Transitions (Confirmed from source)

The modal is a full `ProjectModal` class with these key behaviors:

- **Open:** CSS animations `slideFromRightV2` for the slider panel, `fadeInCss` for info panels
- **Image switching:** Same 30-slice mask gradient wipe as amenities (reused logic)
- **Title animation:** SplitText with mask wrappers, staggered `yPercent: 110 → 0`
- **Close:** Reversed CSS animations (`slideToRightV2`, `fadeOutCss`)
- **Focus trap and ESC close** for accessibility
- **Lazy loading:** `data-src` → `src` swap on first view, with preloading on hover

```javascript
// Open animation for title
this.titleSplit = new SplitText(titleEl, { type: 'lines', linesClass: 'split-line' });

// Manual mask wrapper
this.titleSplit.lines.forEach((line) => {
  const wrap = document.createElement('div');
  wrap.style.overflow = 'hidden';
  line.parentNode.insertBefore(wrap, line);
  wrap.appendChild(line);
});

this.openTl.fromTo(this.titleSplit.lines,
  { yPercent: 110, opacity: 0 },
  { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.06, delay: 1 }
);
```

**Project data is hardcoded** as a JS object with 3 projects, each containing 5 slides with `main`, `thumb`, `label`, `area`, and `areaText` properties.

---

### 5. Beliefs Card Shape (Confirmed from CSS)

The diamond/faceted card shape is a massive `clip-path: polygon()` with ~100 coordinate pairs creating smooth curves at top and bottom:

```css
.beliefs-card-bg {
  clip-path: polygon(9.47rem 0.03rem, 0.03rem 0.03rem, ... /* ~100 points */);
  backdrop-filter: blur(6px);
  background-color: #e7e1dc33;
}
```

**Key insight:** This is a decorative frosted glass card with an hourglass/diamond shape. The clip-path creates smooth Bézier-like curves at the top and bottom edges. The same shape exists in a mobile version with different values.

---

### 6. FAQ Section (Confirmed from source)

**Desktop:** Pure CSS hover-driven. When hovering a dropdown row, the answer panel transitions with `opacity` and `translateX`:

```css
.faq [data-dropdown]:hover [data-dropdown-list] {
  opacity: 1;
  transform: translateX(0rem);
  pointer-events: auto;
}
```

**Mobile:** jQuery click handler with `slideDown/slideUp` animation. First dropdown opens automatically.

The full-width top/bottom border lines on hover use `::before` and `::after` pseudo-elements spanning `100vw`.

---

### 7. Fluid Responsive System

Instead of traditional breakpoints, the entire site scales with viewport width:

```css
html { font-size: calc(16 * (100vw / 1920)); }
```

This means at 1440px viewport, `1rem = 12px`. At 960px, `1rem = 8px`. **Everything scales proportionally** — spacing, typography, images — because all values use `rem` units.

---

## Assets Needed to Recreate

1. **Hero background video** — Luxury interior/exterior cinematic footage. Generate with AI video (Runway, Sora) or use stock from Artgrid/Storyblocks. Search terms: "luxury residence interior cinematic aerial"
2. **Interior photography (×15+ images)** — Modern luxury apartments, living rooms, kitchens, patios. Use Midjourney prompt: *"modern luxury apartment interior, warm natural lighting, beige and white tones, high-end furniture, architectural photography, 4k, editorial style --ar 3:4"*
3. **Logo SVG** — Simple wordmark. Design in Figma or Illustrator
4. **Favicon + webclip** — Standard Webflow defaults (replace with custom)
5. **PP Fragment font files** — **Premium font, requires license** from Pangram Pangram (~$50–200). Alternative: Cormorant Garamond (free, similar feel)
6. **Inter font** — Free from Google Fonts (use Inter specifically, not Inter 28 Pt which is the display optical size variant)

---

## Build Plan

### Recommended Stack

- **Framework:** Vanilla HTML/CSS/JS or Vite for dev tooling. This is a single-page site with no routing — a framework like React is overkill
- **Styling:** Vanilla CSS with custom properties (the original uses CSS vars extensively). Copy the design token system
- **Animation:** GSAP 3.15+ with ScrollTrigger, ScrollToPlugin, and SplitText (Club GSAP membership required for SplitText — $99/year; or use free alternative `splitting.js` for char/word splitting)
- **Slider:** Splide.js 4.x (free, lightweight)
- **Optional:** jQuery can be removed — the FAQ dropdown and nav logic can be rewritten in vanilla JS

### NPM Packages

```bash
npm install gsap @splidejs/splide
# Note: SplitText requires GSAP Club membership — it's a paid plugin
# Alternative: npm install splitting
```

### Section-by-Section Build Order

**Section 1: Global Setup**
- Set up fluid rem system in CSS (`calc(16 * (100vw / 1920))`)
- Define all CSS custom properties (colors, typography tokens)
- Load fonts (`@font-face` or Google Fonts fallbacks)
- Set up GSAP + ScrollTrigger registration

**Section 2: Header/Navigation**
- Fixed header with transparent background
- Logo + nav links + "Book a Visit" CTA button
- Scroll-based `is-scrolled` class that adds `backdrop-filter: blur(10px)` overlay
- Mobile burger menu (Webflow native can be replaced with custom)
- Nav link hover underline animation (`::before` pseudo-element `scaleX`)

**Section 3: Hero**
- Full-viewport section with background video (autoplay, muted, loop)
- Large "ELYSE" title with SplitText character reveal on load
- Right column with subtitle (SplitText word reveal) and description (fade up)
- Scroll parallax: image moves down slow, title moves up fast and fades

**Section 4: About**
- Two-column layout: heading + image left, body text right
- Image with parallax (`yPercent: 15`, `scale: 1.05` on scroll)
- Image overlay reveal animation (div overlay scales away)
- Statistics section with animated number counters (GSAP textContent tween)
- Stats laid out in custom grid rows with different column widths

**Section 5: Projects (Our Livings)**
- Splide carousel with 3 slides, `loop`, `gap: 14rem`, `focus: center`
- Custom pagination using CSS `counter()` to display `(1)`, `(2)`, `(3)`
- Synchronized title and description transitions using SplitText
- "Learn More" button opens project modal
- Inactive slides scale down with `transform: scale(0.9) translateY(0.625rem)`

**Section 6: Our Beliefs (Heading)**
- Large heading aligned right with half-width background image
- Image parallax on scroll
- Image overlay reveal

**Section 7: Beliefs Cards**
- 4-column grid of 5 cards + text column
- Each card has the faceted `clip-path` shape
- `backdrop-filter: blur(6px)` with frosted glass effect
- Background image covering full section behind the grid
- Stagger fade-in animation on scroll

**Section 8: Amenities (Scroll-Driven)**
- **This is the most complex section**
- Tall scroll track with `position: sticky` inner container
- 3 sets of big + small image pairs
- 30-slice mask gradient wipe for big images (venetian blind effect)
- `clip-path: inset()` reveal for small images
- SplitText title/text transitions between slides
- Header auto-hides during this section
- Progress line indicator

**Section 9: FAQ**
- Sticky section at `bottom: 0`
- 3-column grid per question: number | question toggle | answer
- Desktop: CSS hover transitions (`opacity + translateX`)
- Mobile: jQuery click accordion with `slideDown`
- Full-width border lines on hover via `::before`/`::after`

**Section 10: CTA (Book a Visit)**
- Two-column layout: heading left, form right
- Deep green (`#254441`) form background
- Custom form inputs with underline border style
- Input clear buttons, phone mask, terms checkbox
- Background image with parallax

**Section 11: Footer**
- Two-column layout with logo, contact info, and links
- Stagger reveal animation (line → content → content)
- Copyright year auto-generated with JS
- Credit link to development agency

**Section 12: Project Modal**
- Fixed full-screen overlay
- 2-column layout: info left, image right
- Image panel slides from right (`slideFromRightV2` keyframe)
- 30-slice mask wipe for image transitions (same as amenities)
- Thumbnail Splide slider for navigation
- Slide info with animated number counter
- SplitText title reveal on open
- Focus trap and ESC close for accessibility
- Reverse animations on close

### Verification Plan

**Automated:**
- Lighthouse performance audit (target: 90+ performance)
- No console errors
- Check all images load (lazy loaded ones too)

**Manual:**
- Verify fluid scaling at 1920px, 1440px, 1024px, 375px
- Test scroll-driven amenities animation smoothness
- Test modal open/close flow
- Test FAQ hover (desktop) and click (mobile) behavior
- Verify hero video autoplay on all browsers

---

## Notes

- **SplitText is a paid GSAP plugin** ($99/yr Club GSAP). For a free alternative, use `splitting.js` and write manual mask wrappers
- **PP Fragment fonts are premium** — license from Pangram Pangram or substitute
- **The 30-slice mask-gradient wipe** is reused in both amenities scroll and project modal — build it as a reusable utility
- **Performance consideration:** The amenities section creates many ScrollTrigger instances. Ensure proper cleanup if adding page transitions
- **The CTA section has `margin-top: -100vh`** to create an overlap effect with the sticky FAQ section above it
- **The `is-first` class** on several elements indicates the initially visible item in sequences (first amenity slide, first project text, etc.)
- **Hero title has custom letter spacing per character** via `nth-child` selectors — this is a design polish detail that makes the huge serif title read better
- **All animation initial states are set inline** using `gsap.set()` before the page loads, with a CSS safety net: `html.w-mod-js:not(.w-mod-ix3) [data-anim="element"] { visibility: hidden !important; }` prevents FOUC
