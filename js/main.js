/* ============================================
   PEARLCREST — MAIN JAVASCRIPT
   Expert-level GSAP animations & interactions
   ============================================ */

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ============================================
// CUSTOM SPLIT TEXT (free alternative to GSAP SplitText)
// Splits text into chars, words, or lines with mask wrappers
// ============================================
class TextSplitter {
  constructor(element, options = {}) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    if (!this.element) return;

    this.type = options.type || 'chars'; // 'chars', 'words', 'lines'
    this.mask = options.mask || false;
    this.chars = [];
    this.words = [];
    this.lines = [];
    this._original = this.element.innerHTML;

    this.split();
  }

  split() {
    const text = this.element.textContent;
    this.element.innerHTML = '';

    if (this.type === 'chars' || this.type === 'both') {
      this._splitChars(text);
    } else if (this.type === 'words') {
      this._splitWords(text);
    } else if (this.type === 'lines') {
      this._splitLines();
    }
  }

  _splitChars(text) {
    const chars = text.split('');
    chars.forEach(char => {
      const span = document.createElement('span');
      span.className = 'char';
      span.style.display = 'inline-block';
      span.textContent = char === ' ' ? '\u00A0' : char;

      if (this.mask) {
        const wrapper = document.createElement('span');
        wrapper.className = 'char-wrap';
        wrapper.style.display = 'inline-block';
        wrapper.style.overflow = 'hidden';
        wrapper.appendChild(span);
        this.element.appendChild(wrapper);
      } else {
        this.element.appendChild(span);
      }

      this.chars.push(span);
    });
  }

  _splitWords(text) {
    const words = text.split(/\s+/);
    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.className = 'word';
      span.style.display = 'inline-block';
      span.textContent = word;

      if (this.mask) {
        const wrapper = document.createElement('span');
        wrapper.className = 'word-wrap';
        wrapper.style.display = 'inline-block';
        wrapper.style.overflow = 'hidden';
        wrapper.appendChild(span);
        this.element.appendChild(wrapper);
      } else {
        this.element.appendChild(span);
      }

      this.words.push(span);

      // Add space between words
      if (i < words.length - 1) {
        const space = document.createTextNode(' ');
        this.element.appendChild(space);
      }
    });
  }

  _splitLines() {
    // Save original HTML, measure line breaks, then wrap
    const tempDiv = document.createElement('div');
    tempDiv.style.cssText = window.getComputedStyle(this.element).cssText;
    tempDiv.style.position = 'absolute';
    tempDiv.style.visibility = 'hidden';
    tempDiv.style.width = this.element.offsetWidth + 'px';
    tempDiv.innerHTML = this._original;
    document.body.appendChild(tempDiv);

    // Split into words, detect line breaks by position
    // Use textContent from tempDiv to correctly decode HTML entities like &amp;
    const words = tempDiv.textContent.trim().split(/\s+/);
    tempDiv.innerHTML = '';

    const wordSpans = [];
    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.style.display = 'inline';
      span.textContent = word;
      tempDiv.appendChild(span);
      if (i < words.length - 1) tempDiv.appendChild(document.createTextNode(' '));
      wordSpans.push(span);
    });

    // Group by top position
    const lineGroups = [];
    let currentLine = [];
    let currentTop = null;

    wordSpans.forEach(span => {
      const top = Math.round(span.getBoundingClientRect().top);
      if (currentTop === null || Math.abs(top - currentTop) < 3) {
        currentLine.push(span.textContent);
        currentTop = top;
      } else {
        lineGroups.push(currentLine.join(' '));
        currentLine = [span.textContent];
        currentTop = top;
      }
    });
    if (currentLine.length) lineGroups.push(currentLine.join(' '));

    document.body.removeChild(tempDiv);

    // Create line elements
    this.element.innerHTML = '';
    lineGroups.forEach(lineText => {
      const lineSpan = document.createElement('span');
      lineSpan.className = 'line';
      lineSpan.style.display = 'block';
      lineSpan.textContent = lineText;

      if (this.mask) {
        const wrapper = document.createElement('div');
        wrapper.className = 'line-wrap';
        wrapper.style.overflow = 'hidden';
        wrapper.style.display = 'block';
        wrapper.appendChild(lineSpan);
        this.element.appendChild(wrapper);
      } else {
        this.element.appendChild(lineSpan);
      }

      this.lines.push(lineSpan);
    });
  }

  revert() {
    if (this.element && this._original) {
      this.element.innerHTML = this._original;
    }
    this.chars = [];
    this.words = [];
    this.lines = [];
  }
}

// ============================================
// VENETIAN BLIND MASK GENERATOR
// Creates a 30-slice gradient mask for image wipe transitions
// ============================================
const SLICE_COUNT = 30;

function generateMaskGradient(progressArray) {
  const step = 100 / SLICE_COUNT;
  let gradient = 'linear-gradient(0deg';

  for (let i = 0; i < SLICE_COUNT; i++) {
    const start = i * step;
    const progress = progressArray[i];
    const visibleEnd = start + step * progress;

    gradient += `, black ${start}% ${visibleEnd}%`;
    if (progress < 1) {
      gradient += `, transparent ${visibleEnd}% ${start + step}%`;
    }
  }

  gradient += ')';
  return gradient;
}


// ============================================
// PROJECT DATA
// ============================================
const projectsData = {
  0: {
    title: 'Off-Plan Properties',
    description: 'Invest before completion and secure Dubai\'s most competitive entry prices. We source launches from EMAAR, Sobha, Nakheel, Damac, and other top developers — giving you first access before public release.',
    slides: [
      { main: 'assets/images/project-1.png', thumb: 'assets/images/project-1.png', label: 'SOBHA HARTLAND II', area: 1800, areaText: 'starting from AED (k)' },
      { main: 'assets/images/about-img.png', thumb: 'assets/images/about-img.png', label: 'MBR CITY', area: 2200, areaText: 'starting from AED (k)' },
      { main: 'assets/images/amenity-big-2.png', thumb: 'assets/images/amenity-big-2.png', label: 'DUBAI HILLS', area: 1500, areaText: 'starting from AED (k)' },
    ],
  },
  1: {
    title: 'Developed Properties',
    description: 'Ready to move in. These fully completed properties across Dubai\'s prime districts are available for immediate occupancy or rental. Villas, apartments, and townhouses — all verified and handpicked.',
    slides: [
      { main: 'assets/images/project-2.png', thumb: 'assets/images/project-2.png', label: 'DUBAI MARINA', area: 3200, areaText: 'price AED (k)' },
      { main: 'assets/images/amenity-big-3.png', thumb: 'assets/images/amenity-big-3.png', label: 'PALM JUMEIRAH', area: 5800, areaText: 'price AED (k)' },
      { main: 'assets/images/beliefs-hero.png', thumb: 'assets/images/beliefs-hero.png', label: 'DOWNTOWN', area: 4100, areaText: 'price AED (k)' },
    ],
  },
  2: {
    title: 'Pre-Owned Properties',
    description: 'Secondary market properties with proven history and room for negotiation. Our team handles due diligence, title deed verification, and every step of the transfer process on your behalf.',
    slides: [
      { main: 'assets/images/project-3.png', thumb: 'assets/images/project-3.png', label: 'ARABIAN RANCHES', area: 5500, areaText: 'price AED (k)' },
      { main: 'assets/images/amenity-big-1.png', thumb: 'assets/images/amenity-big-1.png', label: 'EMIRATES HILLS', area: 12000, areaText: 'price AED (k)' },
      { main: 'assets/images/amenity-small-3.png', thumb: 'assets/images/amenity-small-3.png', label: 'JBR', area: 2800, areaText: 'price AED (k)' },
    ],
  },
};


// ============================================
// HERO ANIMATION
// ============================================
function initHeroAnimation() {
  const titleEl = document.querySelector('[data-hero="title"]');
  const subtitleMinEl = document.querySelector('[data-hero="title-min"]');
  if (!titleEl) return;

  // Split hero title into chars with mask
  const titleSplit = new TextSplitter(titleEl, { type: 'chars', mask: true });

  // Split subtitle into words
  const subtitleSplit = new TextSplitter(subtitleMinEl, { type: 'words' });

  // Set initial states
  gsap.set(titleSplit.chars, { yPercent: 100 });
  gsap.set(subtitleSplit.words, { opacity: 0, y: 30, rotationX: -45 });
  gsap.set('[data-hero="subtitle"]', { opacity: 0, y: 40 });
  gsap.set('[data-hero="scroll"]', { opacity: 0, y: 20 });
  gsap.set('[data-hero="nav"]', { opacity: 0, yPercent: -100 });
  gsap.set('[data-hero="line"]', { opacity: 0, scaleX: 0 });

  // Hero entrance timeline
  const heroTL = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTL
    // Chars reveal from below
    .to(titleSplit.chars, {
      yPercent: 0,
      duration: 2,
      stagger: { each: 0.08 },
    }, 0.5)
    // Subtitle words
    .to(subtitleSplit.words, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 1.2,
      stagger: 0.04,
    }, 1.4)
    // Description
    .to('[data-hero="subtitle"]', {
      opacity: 1,
      y: 0,
      duration: 1.5,
    }, 1.8)
    // Scroll indicator
    .to('[data-hero="scroll"]', {
      opacity: 1,
      y: 0,
      duration: 1,
    }, 2.6)
    // Navigation
    .to('[data-hero="nav"]', {
      opacity: 1,
      yPercent: 0,
      duration: 1,
    }, 2.6)
    // Nav line
    .to('[data-hero="line"]', {
      opacity: 1,
      scaleX: 1,
      duration: 1,
    }, 3.6);

  // Scroll parallax
  ScrollTrigger.create({
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
    onUpdate: (self) => {
      const p = self.progress;
      gsap.set('[data-hero="img"]', {
        yPercent: p * 30,
        scale: 1 + p * 0.1,
      });
      gsap.set('[data-hero="title"]', {
        yPercent: p * -50,
        opacity: 1 - p,
      });
      gsap.set('[data-hero="content"]', {
        yPercent: p * -30,
        opacity: 1 - p * 1.5,
      });
    },
  });
}


// ============================================
// SCROLL ANIMATIONS (element reveals, splits, overlays, staggers)
// ============================================
function initScrollAnimations() {
  // Simple element reveals
  gsap.utils.toArray('[data-anim="element"]').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 60, visibility: 'hidden' },
      {
        opacity: 1, y: 0, visibility: 'visible',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      }
    );
  });

  // SplitText line reveals
  gsap.utils.toArray('[data-anim="split"]').forEach(el => {
    const split = new TextSplitter(el, { type: 'lines', mask: true });

    gsap.set(el, { visibility: 'visible' });
    gsap.set(split.lines, { yPercent: 110 });

    gsap.to(split.lines, {
      yPercent: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 80%', once: true },
    });
  });

  // Manual split line reveals
  gsap.utils.toArray('[data-anim="manual-lines"]').forEach(el => {
    const lines = el.querySelectorAll('.line');
    gsap.set(el, { visibility: 'visible' });
    gsap.set(lines, { yPercent: 110 });

    gsap.to(lines, {
      yPercent: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 80%', once: true },
    });
  });

  // Image overlay reveals
  gsap.utils.toArray('[data-anim="img-overlay"]').forEach(el => {
    gsap.set(el, { visibility: 'visible', scaleX: 1 });

    gsap.to(el, {
      scaleX: 0,
      duration: 1.4,
      ease: 'power3.inOut',
      scrollTrigger: { trigger: el.parentElement, start: 'top 75%', once: true },
    });
  });

  // Image parallax
  gsap.utils.toArray('[data-anim="img-paralax"]').forEach(el => {
    gsap.to(el, {
      yPercent: 15,
      scale: 1.05,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top 45%',
        end: 'bottom top',
        scrub: 1,
      },
    });
  });

  // Stagger groups
  document.querySelectorAll('[data-anim="stagger-wrap"]').forEach(section => {
    const items = section.querySelectorAll('[data-anim="stagger"]');
    if (!items.length) return;

    gsap.set(items, { visibility: 'hidden' });

    gsap.fromTo(items,
      { opacity: 0, y: 60, visibility: 'hidden' },
      {
        opacity: 1, y: 0, visibility: 'visible',
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      }
    );
  });

  // SlideUp once
  gsap.utils.toArray('[data-anim="slideUp-once"]').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      }
    );
  });
}


// ============================================
// NUMBER COUNTER ANIMATION
// ============================================
function initNumberAnim() {
  const firstNumber = document.querySelector('[data-number]');
  if (!firstNumber) return;

  ScrollTrigger.create({
    trigger: firstNumber,
    start: '50% bottom',
    once: true,
    onEnter: () => {
      document.querySelectorAll('[data-number]').forEach(el => {
        const target = parseInt(el.textContent);
        el.textContent = '0';

        gsap.to(el, {
          textContent: target,
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          onUpdate() {
            el.textContent = Math.ceil(this.targets()[0].textContent);
          },
        });
      });
    },
  });
}


// ============================================
// PROJECT SLIDER (Splide)
// ============================================
function initProjectSlider() {
  const sliderEl = document.querySelector('.projects-slider');
  if (!sliderEl) return;

  const splide = new Splide('.projects-slider', {
    classes: {
      pagination: 'splide__pagination projects-pagination',
      page: 'splide__pagination__page projects-pagination-page',
    },
    type: 'loop',
    perPage: 1,
    speed: 1000,
    arrows: false,
    pagination: true,
    gap: '14rem',
    focus: 'center',
    updateOnMove: true,
    drag: false,
    isNavigation: true,
    breakpoints: {
      480: {
        perPage: 1,
        gap: '1.5rem',
        drag: true,
      },
    },
  });

  const projectTitles = document.querySelectorAll('.project-title');
  const projectTexts = document.querySelectorAll('.project-text');

  // Pre-split text for animations
  const titleSplits = [];
  const textSplits = [];

  projectTitles.forEach(title => {
    const h2 = title.querySelector('h2');
    if (h2) {
      const split = new TextSplitter(h2, { type: 'lines', mask: true });
      titleSplits.push(split);
    }
  });

  projectTexts.forEach(text => {
    const p = text.querySelector('p');
    if (p) {
      const split = new TextSplitter(p, { type: 'lines', mask: true });
      textSplits.push(split);
    }
  });

  function animateIn(index) {
    const tl = gsap.timeline();
    projectTitles.forEach(t => t.classList.remove('is-active'));
    projectTexts.forEach(t => t.classList.remove('is-active'));
    projectTitles[index].classList.add('is-active');
    projectTexts[index].classList.add('is-active');

    tl.fromTo(titleSplits[index].lines, { y: '100%' }, {
      y: '0%', duration: 0.8, stagger: 0.1, ease: 'power3.out',
    });
    tl.fromTo(textSplits[index].lines, { y: '100%' }, {
      y: '0%', duration: 0.6, stagger: 0.08, ease: 'power3.out',
    }, '-=0.5');

    return tl;
  }

  function animateOut(index) {
    const tl = gsap.timeline();
    tl.to([titleSplits[index].lines, textSplits[index].lines], {
      y: '-100%', duration: 0.4, stagger: 0.05, ease: 'power2.in',
    });
    return tl;
  }

  // Initial state
  gsap.set([titleSplits[0].lines, textSplits[0].lines], { y: '100%' });
  projectTitles[0].classList.add('is-active');
  projectTexts[0].classList.add('is-active');

  let hasAnimated = false;
  ScrollTrigger.create({
    trigger: '.project-titles',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      if (!hasAnimated) { animateIn(0); hasAnimated = true; }
    },
  });

  splide.on('move', (newIndex, prevIndex) => {
    if (hasAnimated) { animateOut(prevIndex); animateIn(newIndex); }
  });

  splide.mount();
}


// ============================================
// AMENITIES SCROLL ANIMATION (VENETIAN BLIND WIPE)
// ============================================
function initAmenitiesAnimation() {
  if (window.innerWidth <= 479) return; // Skip on mobile

  const bigImages = gsap.utils.toArray('[data-amenities-anim="big-image"]');
  const smallImages = gsap.utils.toArray('[data-amenities-anim="small-image"]');
  const textBoxes = gsap.utils.toArray('.amenities-slide-box');
  const section = document.querySelector('.anim-track');
  const header = document.querySelector('.header');

  if (!bigImages.length || !section) return;

  const amenitiesSTs = [];

  // Create text splits for each amenities slide
  const titleSplits = [];
  const textSplits = [];

  textBoxes.forEach(box => {
    const title = box.querySelector('[data-amenities-anim="title"]');
    const text = box.querySelector('[data-amenities-anim="text"]');
    if (title) titleSplits.push(new TextSplitter(title, { type: 'lines', mask: true }));
    if (text) textSplits.push(new TextSplitter(text, { type: 'lines', mask: true }));
  });

  // Set the scroll track height
  section.style.height = `${100 * (bigImages.length + 1)}vh`;

  // Header hide/show during amenities
  if (header) {
    amenitiesSTs.push(ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      onEnter: () => gsap.to(header, { yPercent: -100, pointerEvents: 'none', duration: 0.3 }),
      onLeave: () => gsap.to(header, { yPercent: 0, pointerEvents: 'auto', duration: 0.3 }),
      onEnterBack: () => gsap.to(header, { yPercent: -100, pointerEvents: 'none', duration: 0.3 }),
      onLeaveBack: () => gsap.to(header, { yPercent: 0, pointerEvents: 'auto', duration: 0.3 }),
    }));
  }

  // Initial states — all hidden
  bigImages.forEach((img, i) => {
    if (i === 0) {
      gsap.set(img, { x: 100, opacity: 0 });
    } else {
      const initialProgress = new Array(SLICE_COUNT).fill(0);
      img.style.setProperty('--mask-gradient', generateMaskGradient(initialProgress));
    }
  });

  smallImages.forEach(img => gsap.set(img, { clipPath: 'inset(100% 0% 0% 0%)' }));
  titleSplits.forEach(split => gsap.set(split.lines, { y: '100%' }));
  textSplits.forEach(split => gsap.set(split.lines, { y: '100%' }));
  textBoxes.forEach(box => gsap.set(box, { opacity: 0, visibility: 'hidden' }));

  let hasAnimatedFirst = false;

  // Create trigger zones
  const triggerHeight = section.offsetHeight / bigImages.length;

  bigImages.forEach((bigImg, index) => {
    const triggerStart = index * triggerHeight;

    if (index === 0) {
      // First slide — entrance animation
      amenitiesSTs.push(ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        onEnter: () => {
          if (hasAnimatedFirst) return;
          hasAnimatedFirst = true;

          gsap.to(bigImages[0], { x: 0, opacity: 1, duration: 1.2, ease: 'power2.out' });
          gsap.to(smallImages[0], { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'power2.out', delay: 0.2 });
          gsap.set(textBoxes[0], { opacity: 1, visibility: 'visible' });

          gsap.timeline({ delay: 0.3 })
            .to(titleSplits[0].lines, { y: '0%', duration: 0.8, stagger: 0.1, ease: 'power3.out' })
            .to(textSplits[0].lines, { y: '0%', duration: 0.6, stagger: 0.08, ease: 'power3.out' }, '-=0.5');
        },
      }));
    } else {
      // Subsequent slides — mask wipe transition
      const showProgressArray = new Array(SLICE_COUNT).fill(0);

      const showTl = gsap.timeline({
        onUpdate: () => {
          bigImg.style.setProperty('--mask-gradient', generateMaskGradient(showProgressArray));
        },
        scrollTrigger: {
          trigger: section,
          start: `${triggerStart}px top`,
          end: `${triggerStart + triggerHeight * 0.6}px top`,
          scrub: 1,
        },
      });

      amenitiesSTs.push(showTl.scrollTrigger);

      // Stagger slices
      for (let i = 0; i < SLICE_COUNT; i++) {
        showTl.to(showProgressArray, { [i]: 1, duration: 0.5, ease: 'none' }, i * 0.015);
      }

      // Small image clip reveal
      const smallTween = gsap.fromTo(smallImages[index],
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          scrollTrigger: {
            trigger: section,
            start: `${triggerStart}px top`,
            end: `${triggerStart + triggerHeight * 0.6}px top`,
            scrub: 1,
          },
        }
      );
      amenitiesSTs.push(smallTween.scrollTrigger);

      // Text transition
      const textTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: `${triggerStart}px top`,
          end: `${triggerStart + triggerHeight * 0.6}px top`,
          scrub: 1,
        },
      });
      amenitiesSTs.push(textTl.scrollTrigger);

      textTl
        .to([titleSplits[index - 1].lines, textSplits[index - 1].lines], {
          y: '-100%', duration: 0.3, stagger: 0.02, ease: 'power2.in',
        })
        .to(textBoxes[index - 1], { opacity: 0, visibility: 'hidden', duration: 0.1 })
        .set(textBoxes[index], { opacity: 1, visibility: 'visible' })
        .fromTo(titleSplits[index].lines, { y: '100%' }, {
          y: '0%', duration: 0.4, stagger: 0.05, ease: 'power3.out',
        })
        .fromTo(textSplits[index].lines, { y: '100%' }, {
          y: '0%', duration: 0.3, stagger: 0.04, ease: 'power3.out',
        }, '-=0.2');
    }
  });

  // Progress line
  const progressLine = document.querySelector('.amenities-progress-line');
  if (progressLine) {
    gsap.set(progressLine, { visibility: 'visible' });
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        progressLine.style.width = `${self.progress * 100}%`;
      },
    });
  }
}


// ============================================
// FAQ DROPDOWN
// ============================================
function initFaqDropdown() {
  const isTouchDevice = window.matchMedia('(hover: none)').matches;

  if (isTouchDevice) {
    // Mobile: click accordion
    const dropdowns = document.querySelectorAll('[data-dropdown]');
    const toggles = document.querySelectorAll('[data-dropdown-toggle]');

    toggles.forEach(toggle => {
      toggle.style.cursor = 'pointer';
      toggle.style.pointerEvents = 'auto';

      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const parent = toggle.closest('[data-dropdown]');
        const list = parent.querySelector('[data-dropdown-list]');
        const isActive = parent.classList.contains('active');

        // Close all
        dropdowns.forEach(dd => {
          dd.classList.remove('active');
          const ddList = dd.querySelector('[data-dropdown-list]');
          if (ddList) ddList.style.display = 'none';
        });

        // Open this one
        if (!isActive) {
          parent.classList.add('active');
          list.style.display = 'block';
        }
      });
    });

    // Open first by default
    if (toggles.length) toggles[0].click();
  }
  // Desktop: handled by CSS hover
}


// ============================================
// HEADER SCROLL BEHAVIOR
// ============================================
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  const toggleClass = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 1);
  };

  toggleClass();
  ScrollTrigger.create({ start: 1, onUpdate: toggleClass });
}


// ============================================
// FOOTER ANIMATION
// ============================================
function initFooterAnimation() {
  // Step 1: Footer top
  const footerStep1 = document.querySelector('[data-footer="step-1"]');
  if (footerStep1) {
    gsap.fromTo(footerStep1,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: footerStep1, start: 'top 85%', once: true },
      }
    );
  }

  // Footer lines
  document.querySelectorAll('[data-footer="line"]').forEach(line => {
    gsap.fromTo(line,
      { scaleX: 0 },
      {
        scaleX: 1, duration: 1, ease: 'power2.out',
        scrollTrigger: { trigger: line, start: 'top 90%', once: true },
      }
    );
  });

  // Step 3: Footer bottom
  const footerStep3 = document.querySelector('[data-footer="step-3"]');
  if (footerStep3) {
    gsap.fromTo(footerStep3,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: footerStep3, start: 'top 90%', once: true },
      }
    );
  }

  // Year
  document.querySelectorAll('[data-footer-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
}


// ============================================
// PROJECT MODAL
// ============================================
class ProjectModal {
  constructor() {
    this.modal = document.getElementById('projectModal');
    if (!this.modal) return;

    this.modalContent = this.modal.querySelector('.modal-content');
    this.modalClose = this.modal.querySelector('.modal-close');
    this.modalBtn = this.modal.querySelector('.modal-btn');
    this.thumbSlider = null;
    this.lastFocusedElement = null;
    this.currentProjectData = null;
    this.titleSplit = null;
    this.openTl = null;

    this.init();
  }

  init() {
    // Open triggers
    document.querySelectorAll('[data-open-modal]').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const index = parseInt(link.dataset.projectIndex);
        if (index >= 0 && projectsData[index]) this.open(index);
      });
    });

    // Close
    this.modalClose?.addEventListener('click', () => this.close());

    // Close on ESC
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && this.modal.classList.contains('is-open')) this.close();
    });

    // Book a visit closes modal
    this.modalBtn?.addEventListener('click', e => {
      e.preventDefault();
      this.close();
      setTimeout(() => {
        document.querySelector('#book-a-visit')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    });

    // Prevent close on content click
    this.modalContent?.addEventListener('click', e => e.stopPropagation());
  }

  open(index) {
    const data = projectsData[index];
    if (!data) return;

    this.currentProjectData = data;
    this.lastFocusedElement = document.activeElement;

    this.resetOpenAnimation();
    this.destroySliders();
    this.updateContent(data);
    this.createSlides(data);
    this.initSliders();
    this.show();
    this.updateSlideInfo(0);
  }

  updateContent(data) {
    const title = this.modal.querySelector('#modalTitle');
    const descr = this.modal.querySelector('#modalDescr');
    if (title) title.textContent = data.title;
    if (descr) descr.textContent = data.description;
  }

  createSlides(data) {
    // Background images
    const bgContainer = this.modal.querySelector('.modal-bg-images');
    if (bgContainer) {
      bgContainer.innerHTML = '';
      data.slides.forEach((slide, i) => {
        const div = document.createElement('div');
        div.className = 'modal-bg-image' + (i === 0 ? ' is-active' : '');
        div.innerHTML = `<img src="${slide.main}" alt="${data.title} - ${slide.label}" class="modal-slide-img">`;
        bgContainer.appendChild(div);
      });

      // Set initial mask states
      setTimeout(() => {
        this.modal.querySelectorAll('.modal-bg-image').forEach((bgImg, i) => {
          if (i === 0) {
            gsap.set(bgImg, { opacity: 1, visibility: 'visible' });
            bgImg.style.setProperty('--mask-gradient', generateMaskGradient(new Array(SLICE_COUNT).fill(1)));
          } else {
            gsap.set(bgImg, { opacity: 0, visibility: 'hidden' });
            bgImg.style.setProperty('--mask-gradient', generateMaskGradient(new Array(SLICE_COUNT).fill(0)));
          }
        });
      }, 50);
    }

    // Thumbnails
    const thumbList = this.modal.querySelector('.modal-thumb-list');
    if (thumbList) {
      thumbList.innerHTML = '';
      data.slides.forEach(slide => {
        const li = document.createElement('li');
        li.className = 'splide__slide';
        li.innerHTML = `<img src="${slide.thumb}" alt="${slide.label}" class="modal-thumb-img">`;
        thumbList.appendChild(li);
      });
    }
  }

  initSliders() {
    this.thumbSlider = new Splide('.modal-thumb-slider', {
      fixedWidth: '6.25rem',
      fixedHeight: '6.25rem',
      gap: '0.375rem',
      pagination: false,
      arrows: false,
      drag: false,
      isNavigation: true,
      speed: 0,
    });

    this.thumbSlider.on('moved', (newIndex, prevIndex) => {
      this.switchBgImage(newIndex, prevIndex);
      this.updateSlideInfo(newIndex);
    });

    this.thumbSlider.mount();
  }

  updateSlideInfo(index) {
    if (!this.currentProjectData) return;
    const slide = this.currentProjectData.slides[index];
    const label = this.modal.querySelector('#slideInfoLabel');
    const number = this.modal.querySelector('#slideInfoNumber');
    const text = this.modal.querySelector('#slideInfoText');
    if (!label || !number || !text) return;

    gsap.to([label, number, text], {
      opacity: 0, duration: 0.2,
      onComplete: () => {
        label.textContent = slide.label;
        text.textContent = slide.areaText;

        const currentVal = parseInt(number.textContent) || 0;
        gsap.to({ value: currentVal }, {
          value: slide.area,
          duration: 0.5,
          ease: 'power2.out',
          onUpdate() { number.textContent = Math.ceil(this.targets()[0].value); },
        });

        gsap.to([label, number, text], { opacity: 1, duration: 0.3 });
      },
    });
  }

  switchBgImage(newIndex, prevIndex) {
    if (newIndex === prevIndex) return;
    const bgImages = this.modal.querySelectorAll('.modal-bg-image');

    bgImages.forEach(img => img.classList.remove('is-active'));
    if (!bgImages[newIndex]) return;

    bgImages[newIndex].classList.add('is-active');
    gsap.set(bgImages[newIndex], { opacity: 1, visibility: 'visible' });

    const progressArray = new Array(SLICE_COUNT).fill(0);
    const tl = gsap.timeline({
      onUpdate: () => {
        bgImages[newIndex].style.setProperty('--mask-gradient', generateMaskGradient(progressArray));
      },
      onComplete: () => {
        if (prevIndex >= 0 && bgImages[prevIndex]) {
          gsap.set(bgImages[prevIndex], { opacity: 0, visibility: 'hidden' });
          bgImages[prevIndex].style.setProperty('--mask-gradient', generateMaskGradient(new Array(SLICE_COUNT).fill(0)));
        }
      },
    });

    for (let i = 0; i < SLICE_COUNT; i++) {
      tl.to(progressArray, { [i]: 1, duration: 0.8, ease: 'none' }, i * 0.01);
    }
  }

  show() {
    this.modal.classList.remove('is-closing');
    this.modal.classList.add('is-open');
    this.modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => this.playOpenAnimation());
    });

    setTimeout(() => {
      this.modalClose?.focus();
    }, 100);
  }

  playOpenAnimation() {
    if (!this.modal.classList.contains('is-open')) return;
    this.resetOpenAnimation();

    const titleEl = this.modal.querySelector('#modalTitle');
    const descrEl = this.modal.querySelector('.modal-description');
    const btnEl = this.modal.querySelector('.modal-btn');
    const infoEl = this.modal.querySelector('.modal-slide-info');

    this.openTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (titleEl) {
      this.titleSplit = new TextSplitter(titleEl, { type: 'lines', mask: true });
      this.openTl.fromTo(this.titleSplit.lines,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.06, delay: 1 },
        0
      );
    }

    const fadeItems = [descrEl, btnEl, infoEl].filter(Boolean);
    if (fadeItems.length) {
      this.openTl.from(fadeItems,
        { opacity: 0, yPercent: 60, duration: 0.7, stagger: 0.1 },
        1.1
      );
    }
  }

  resetOpenAnimation() {
    if (this.openTl) { this.openTl.kill(); this.openTl = null; }
    if (this.titleSplit) { this.titleSplit.revert(); this.titleSplit = null; }

    const descr = this.modal.querySelector('.modal-description');
    const btn = this.modal.querySelector('.modal-btn');
    const info = this.modal.querySelector('.modal-slide-info');
    gsap.set([descr, btn, info].filter(Boolean), { clearProps: 'transform,opacity,visibility' });
  }

  close() {
    this.modal.classList.add('is-closing');
    this.modal.classList.remove('is-open');

    setTimeout(() => {
      this.modal.classList.remove('is-closing');
      this.modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      this.resetOpenAnimation();
      this.destroySliders();
      this.lastFocusedElement?.focus();
      this.currentProjectData = null;
    }, 1250);
  }

  destroySliders() {
    if (this.thumbSlider) { this.thumbSlider.destroy(); this.thumbSlider = null; }
  }
}


// ============================================
// SMOOTH SCROLL for anchor links
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    // Skip modal triggers
    if (link.hasAttribute('data-open-modal')) return;

    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        gsap.to(window, {
          scrollTo: { y: target, offsetY: 0 },
          duration: 1.2,
          ease: 'power2.inOut',
        });
      }
    });
  });
}


// ============================================
// BURGER MENU
// ============================================
function initBurger() {
  const burger = document.getElementById('burgerBtn');
  const navMenu = document.querySelector('.nav-menu');
  if (!burger || !navMenu) return;

  burger.addEventListener('click', () => {
    burger.classList.toggle('is-open');
    navMenu.classList.toggle('is-open');
    document.body.style.overflow = burger.classList.contains('is-open') ? 'hidden' : '';
  });

  const navLinks = navMenu.querySelectorAll('.nav-link, .nav-btn');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('is-open');
      navMenu.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });
}


// ============================================
// INIT ALL
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initHeroAnimation();
  initScrollAnimations();
  initNumberAnim();
  initProjectSlider();
  initAmenitiesAnimation();
  initFaqDropdown();
  initHeaderScroll();
  initFooterAnimation();
  initSmoothScroll();
  initBurger();
  new ProjectModal();
});
