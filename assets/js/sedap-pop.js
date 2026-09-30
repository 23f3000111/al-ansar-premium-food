/* Concept B — Sedap Pop (home) */
(function () {
  var $ = SP.$, $$ = SP.$$;
  var reduce = AAX.reduce;

  AAX.ready(function () {
    lineupBuild();
    SP.reviews($('[data-love]'));
    SP.faq($('[data-faq]'), AA.faqs);
    SP.common();
    lineupNav();
    SP.curtain(heroIn);
    grow();
    lineupIn();
    why();
    ginger();
    kit();
    love();
    footer();
    AAX.settle();
  });

  /* ---------- hero ---------- */
  function heroIn() {
    var hero = $('[data-hero]');
    var stickers = $$('.sticker', hero);
    if (reduce) return;
    var tp = $('.hero__arc textPath');
    var tl = gsap.timeline();
    tl.from('.bar', { yPercent: -160, duration: 0.9, ease: 'back.out(1.4)', clearProps: 'transform' }, 0)
      .fromTo(tp, { attr: { startOffset: '130%' } }, { attr: { startOffset: '50%' }, duration: 1.3, ease: 'back.out(1.2)' }, 0.05)
      .from('.hero__arc', { scale: 0.85, duration: 1.2, ease: 'elastic.out(1, 0.6)' }, 0.1)
      .from('.hero__flat', { scale: 0.6, opacity: 0, duration: 0.9, ease: 'back.out(2)' }, 0.1)
      .from('.hero__sub p', { y: 26, opacity: 0, duration: 0.7 }, 0.45)
      .from('.hero__ctas .pill', { y: 26, opacity: 0, scale: 0.8, duration: 0.7, stagger: 0.08, ease: 'back.out(2)' }, 0.55)
      .from('.hero__roti', { yPercent: 70, rotation: -40, scale: 0.6, duration: 1.3, ease: 'back.out(1.3)' }, 0.25)
      .add(SP.popStickers(stickers), 0.9)
      .from('.floaters .fl', {
        opacity: 0, scale: 0.3, rotation: function () { return gsap.utils.random(-90, 90); },
        x: function (i, el) { return (el.getBoundingClientRect().left < innerWidth / 2 ? -1 : 1) * 200; },
        duration: 1.1, stagger: 0.06, ease: 'back.out(1.6)'
      }, 0.5)
      .add(function () {
        SP.bob($$('.floaters .fl'));
        AAX.mouseParallax(hero, '.floaters .fl', 34);
        gsap.to('.hero__roti', { y: -14, rotation: 3, duration: 2.8, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      });
    // Scroll: the roti spins up and away as you leave.
    gsap.to('.hero__stage', { yPercent: -18, rotation: 14, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
  }

  /* ---------- inset card grows to full bleed ---------- */
  function grow() {
    var sec = $('[data-grow]');
    if (!sec) return;
    var stickers = $$('.sticker', sec);
    if (reduce) return;
    stickers.forEach(function (s) {
      s.dataset.x = s.style.getPropertyValue('--x'); s.dataset.y = s.style.getPropertyValue('--y'); s.dataset.r = s.style.getPropertyValue('--r');
      gsap.set(s, { '--x': '-50%', '--y': '-50%', '--s': 0, '--r': '0deg' });
    });
    var tl = gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top top', end: '+=120%', scrub: 0.6, pin: true, anticipatePin: 1 } });
    tl.fromTo('.grow__card', { clipPath: AAX.mobile() ? 'inset(3% 3% 0% 3% round 34px)' : 'inset(4% 3% 0% 3% round 56px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', duration: 1 }, 0)
      .from('.grow__img', { rotation: -35, scale: 0.7, ease: 'none', duration: 1 }, 0)
      .from('.grow__copy', { y: 80, opacity: 0, ease: 'none', duration: 0.6 }, 0.2);
    stickers.forEach(function (s, i) {
      tl.to(s, { '--x': s.dataset.x, '--y': s.dataset.y, '--r': s.dataset.r, '--s': 1, ease: 'back.out(2)', duration: 0.35 }, 0.45 + i * 0.1);
    });
  }

  /* ---------- line-up of colourful cards ---------- */
  function lineupBuild() {
    $('[data-track]').innerHTML = AA.products.map(SP.card).join('');
  }
  function lineupNav() {
    var track = $('[data-track]');
    function step() { var c = $('.pcard', track); return c ? c.getBoundingClientRect().width + 22 : 360; }
    $('[data-lprev]').addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: reduce ? 'auto' : 'smooth' }); });
    $('[data-lnext]').addEventListener('click', function () { track.scrollBy({ left: step(), behavior: reduce ? 'auto' : 'smooth' }); });
    // Drag to scroll with a mouse.
    var down = false, sx = 0, sl = 0, moved = false;
    track.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse') return; down = true; moved = false; sx = e.clientX; sl = track.scrollLeft; track.style.scrollSnapType = 'none'; });
    window.addEventListener('pointermove', function (e) { if (!down) return; var dx = e.clientX - sx; if (Math.abs(dx) > 4) moved = true; track.scrollLeft = sl - dx; });
    window.addEventListener('pointerup', function () { if (!down) return; down = false; track.style.scrollSnapType = ''; });
    track.addEventListener('click', function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
    // Vertical wheel inside the track should keep scrolling the page.
    track.addEventListener('dragstart', function (e) { e.preventDefault(); });
  }
  function lineupIn() {
    if (reduce) return;
    gsap.from('.pcard', {
      y: 120, rotation: function (i) { return i % 2 ? 8 : -8; }, opacity: 0, duration: 1, stagger: 0.08, ease: 'back.out(1.5)',
      scrollTrigger: { trigger: '[data-track]', start: 'top 80%', once: true }
    });
  }

  /* ---------- why: dotted connectors draw in ---------- */
  function why() {
    var svg = $('.why__lines');
    if (!svg) return;
    var ns = 'http://www.w3.org/2000/svg';
    var paths = $$('path', svg);
    var defs = document.createElementNS(ns, 'defs');
    var mask = document.createElementNS(ns, 'mask');
    mask.setAttribute('id', 'why-mask');
    mask.setAttribute('maskUnits', 'userSpaceOnUse');
    mask.setAttribute('x', '-50'); mask.setAttribute('y', '-50'); mask.setAttribute('width', '1100'); mask.setAttribute('height', '660');
    var g = document.createElementNS(ns, 'g');
    g.setAttribute('mask', 'url(#why-mask)');
    paths.forEach(function (p) {
      var m = p.cloneNode();
      m.setAttribute('style', 'stroke:#fff;stroke-width:16;stroke-dasharray:none;fill:none;vector-effect:none');
      m.setAttribute('class', 'm');
      mask.appendChild(m);
      g.appendChild(p);
    });
    defs.appendChild(mask); svg.appendChild(defs); svg.appendChild(g);
    if (reduce) return;
    var ms = $$('.m', svg);
    ms.forEach(function (m) { var L = m.getTotalLength(); gsap.set(m, { strokeDasharray: L, strokeDashoffset: L }); });
    var tl = gsap.timeline({ scrollTrigger: { trigger: '.why__stage', start: 'top 70%', once: true } });
    tl.from('.why__food', { scale: 0.4, rotation: -120, opacity: 0, duration: 1.1, ease: 'back.out(1.5)' })
      .to(ms, { strokeDashoffset: 0, duration: 0.9, stagger: 0.12, ease: 'power2.inOut' }, 0.4)
      .from('.why__item', { scale: 0.5, opacity: 0, y: 30, duration: 0.8, stagger: 0.12, ease: 'back.out(2)' }, 0.8);
    gsap.to('.why__food', { rotation: 40, ease: 'none', scrollTrigger: { trigger: '.why', start: 'top bottom', end: 'bottom top', scrub: true } });
  }

  /* ---------- Mr. Ginger: ribbon text rides the scroll ---------- */
  function ginger() {
    var sec = $('.gshot');
    if (!sec) return;
    AAX.mouseParallax($('.gshot__stage'), '.gfl', 30);
    if (reduce) return;
    gsap.fromTo('[data-ribbon]', { attr: { startOffset: '0%' } }, { attr: { startOffset: '-45%' }, ease: 'none', scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: true } });
    var tl = gsap.timeline({ scrollTrigger: { trigger: '.gshot__stage', start: 'top 72%', once: true } });
    tl.from('.gshot__bottle', { yPercent: 40, rotation: -18, opacity: 0, duration: 1.1, ease: 'back.out(1.5)' })
      .from('.gfl', { scale: 0, opacity: 0, rotation: -60, duration: 0.8, stagger: 0.08, ease: 'back.out(2)' }, 0.25)
      .from('.gshot .burst', { scale: 0, duration: 0.7, ease: 'back.out(2.4)' }, 0.6)
      .add(function () { SP.bob($$('.gfl')); });
    gsap.from('.gshot__ways li', { y: 30, opacity: 0, stagger: 0.07, duration: 0.6, ease: 'back.out(2)', scrollTrigger: { trigger: '.gshot__ways', start: 'top 85%', once: true } });
  }

  /* ---------- kitchen kit: pedestals rise, food drops on ---------- */
  function kit() {
    if (reduce) return;
    var tp = $('.kit__arc textPath');
    var tl = gsap.timeline({ scrollTrigger: { trigger: '.kit', start: 'top 65%', once: true } });
    tl.fromTo(tp, { attr: { startOffset: '-30%' } }, { attr: { startOffset: '50%' }, duration: 1.3, ease: 'back.out(1.1)' })
      .from('.kit__base', { yPercent: 110, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'back.out(1.4)' }, 0.2)
      .from('.kit__item img', { yPercent: -160, rotation: function () { return gsap.utils.random(-50, 50); }, opacity: 0, duration: 1, stagger: 0.1, ease: 'bounce.out' }, 0.5)
      .from('.kit__who li', { scale: 0.6, opacity: 0, duration: 0.5, stagger: 0.06, ease: 'back.out(2)' }, 0.9)
      .from('.kit__deal', { y: 30, opacity: 0, duration: 0.6 }, 1.1);
  }

  /* ---------- testimonials tilt as they scroll ---------- */
  function love() {
    if (reduce) return;
    $$('.qcard').forEach(function (c, i) {
      var r = i % 2 ? 1.6 : -1.8;
      gsap.fromTo(c, { rotation: r * 4, y: 100, scale: 0.92 }, { rotation: r, y: 0, scale: 1, ease: 'none', scrollTrigger: { trigger: c, start: 'top bottom', end: 'top 60%', scrub: 0.6 } });
    });
  }

  function footer() {
    if (reduce) return;
    SplitText.create('.foot__giant', {
      type: 'chars',
      onSplit: function (self) {
        return gsap.from(self.chars, { yPercent: 100, rotation: function () { return gsap.utils.random(-20, 20); }, duration: 0.9, stagger: 0.05, ease: 'back.out(1.8)', scrollTrigger: { trigger: '.foot__giant', start: 'top 95%', once: true } });
      }
    });
  }
})();
