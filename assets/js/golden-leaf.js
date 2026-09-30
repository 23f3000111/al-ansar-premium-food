/* Concept A — Golden Leaf (home) */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = AAX.reduce;

  AAX.ready(init);

  function init() {
    AAX.initSmooth();
    buildFooterProducts();
    buildReviews();
    AAX.bindContact();
    AAX.morphMenu($('.menu-btn'), $('#menu'), $('.nav'));
    AAX.autoHideHeader($('.nav'));
    AAX.dockFloat($('.wa-float'), $('.footer__bottom'));
    AAX.marquee($('.strip__track'), 34);
    range();
    capsule();
    thaw();
    ginger();
    compare();
    kitchen();
    reviews();
    $$('[data-reveal]').forEach(function (el) { AAX.revealLines(el); });
    AAX.magnetic($$('.hero__ctas .btn, .round-btn, .menu-btn'), 0.22);
    intro();
    AAX.settle();
  }

  /* ---------- preloader + hero entrance ---------- */
  function intro() {
    var loader = $('.loader');
    if (reduce || !loader) { if (loader) loader.remove(); heroScroll(); return; }
    document.body.classList.add('is-loading');
    if (AAX.lenis) AAX.lenis.stop();
    var path = $('.loader__path');
    var src = document.querySelector('#logo-mark path');
    path.setAttribute('d', src.getAttribute('d'));
    var len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });

    var hero = heroTimeline();
    hero.pause();
    var tl = gsap.timeline({
      onComplete: function () {
        loader.remove();
        document.body.classList.remove('is-loading');
        if (AAX.lenis) AAX.lenis.start();
        heroScroll();
        ScrollTrigger.refresh();
      }
    });
    tl.to(path, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut' })
      .to(path, { fillOpacity: 1, strokeOpacity: 0, duration: 0.5 }, '-=0.35')
      .to('.loader__word', { opacity: 1, letterSpacing: '0.2em', duration: 0.7, ease: 'power2.out' }, '-=0.45')
      .to(loader, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.05, ease: 'expo.inOut' }, '+=0.15')
      .add(function () { hero.play(); }, '-=0.6');
  }

  function heroTimeline() {
    var tl = gsap.timeline();
    tl.from('.hero__line > span', { yPercent: 115, rotate: 4, transformOrigin: '0% 100%', duration: 1.25, stagger: 0.1, ease: 'expo.out' }, 0)
      .from('.hero__capsule', { scale: 0, duration: 0.9, ease: 'back.out(1.7)' }, 0.35)
      .from('.hero__item', { opacity: 0, scale: 1.3, y: -50, rotation: 14, duration: 1.2, stagger: { each: 0.07, from: 'random' }, ease: 'power3.out' }, 0.05)
      .from('.hero__shade', { opacity: 0, duration: 2 }, 0.6)
      .from('.nav > *', { y: -28, opacity: 0, duration: 0.9, stagger: 0.08 }, 0.3)
      .from(['.hero__lede', '.hero__ctas > *', '.hero__stamp'], { opacity: 0, y: 24, duration: 0.9, stagger: 0.08 }, 0.55)
      .add(function () { AAX.mouseParallax($('[data-hero]'), '.hero__item', 26); }, 1);
    return tl;
  }

  function heroScroll() {
    if (reduce) return;
    var hero = $('[data-hero]');
    $$('.hero__item img').forEach(function (img, i) {
      var d = parseFloat(img.parentElement.getAttribute('data-depth')) || 1;
      gsap.to(img, {
        yPercent: -22 * d, rotation: (i % 2 ? 1 : -1) * 10 * d, ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true }
      });
    });
    gsap.to('.hero__copy', { yPercent: -18, opacity: 0.15, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
  }

  // Cycle the little photo capsule inside the headline.
  function capsule() {
    var imgs = $$('.hero__capsule img');
    if (reduce || imgs.length < 2) return;
    var i = 0;
    gsap.set(imgs, { opacity: 0 }); gsap.set(imgs[0], { opacity: 1 });
    setInterval(function () {
      var cur = imgs[i]; i = (i + 1) % imgs.length; var nxt = imgs[i];
      gsap.fromTo(nxt, { opacity: 0, scale: 1.2 }, { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' });
      gsap.to(cur, { opacity: 0, duration: 0.9, delay: 0.1 });
    }, 2800);
  }

  /* ---------- signature: −18°C to golden ---------- */
  function thaw() {
    var sec = $('.thaw');
    if (!sec) return;
    var num = $('.thaw__num', sec), temp = $('.thaw__temp', sec), steps = $$('.thaw__steps li', sec);
    var t = { v: -18 };
    var cold = '#7FB6D3', hot = '#C8952B';
    function render() {
      var v = Math.round(t.v);
      num.textContent = (v < 0 ? '−' : '') + Math.abs(v);
      temp.style.color = gsap.utils.interpolate(cold, hot, gsap.utils.clamp(0, 1, (t.v + 18) / 198));
    }
    function step(i) { steps.forEach(function (li, k) { li.classList.toggle('is-on', k === i); li.classList.toggle('is-done', k < i); }); }
    if (reduce) { t.v = 180; render(); step(3); return; }

    gsap.set('.thaw__sheet', { opacity: 0, scale: 0.45 });
    gsap.set('.thaw__roti', { opacity: 0, scale: 0.6, rotation: -40 });
    gsap.set('.thaw__ready', { opacity: 0, y: 20 });

    var mobile = AAX.mobile();
    var tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: sec, start: 'top top', end: mobile ? '+=190%' : '+=260%', scrub: 0.7, pin: true, anticipatePin: 1 },
      onUpdate: function () {
        var p = tl.progress();
        step(p < 0.2 ? 0 : p < 0.45 ? 1 : p < 0.74 ? 2 : 3);
      }
    });
    tl.to('.thaw__frost', { opacity: 0, scale: 1.2, duration: 1 }, 0)
      .to('.thaw__dough', { filter: 'drop-shadow(10px 20px 18px rgba(90,70,30,.25)) saturate(1) brightness(1) hue-rotate(0deg)', duration: 1 }, 0)
      .to(t, { v: 0, duration: 1, onUpdate: render }, 0)
      .to('.thaw__dough', { scaleX: 1.55, scaleY: 0.5, duration: 0.9, ease: 'power2.inOut' }, 1)
      .to('.thaw__dough', { opacity: 0, duration: 0.4 }, 1.7)
      .to('.thaw__sheet', { opacity: 1, scale: 1.2, rotation: 70, duration: 1.1, ease: 'power2.out' }, 1.45)
      .to(t, { v: 90, duration: 1.3, onUpdate: render }, 1)
      .to('.thaw__sheet', { opacity: 0, scale: 1.05, duration: 0.55 }, 2.5)
      .to('.thaw__roti', { opacity: 1, scale: 1, rotation: 0, duration: 1.1, ease: 'back.out(1.3)' }, 2.35)
      .to('.thaw__bg--warm', { opacity: 1, duration: 1.4 }, 2)
      .to('.thaw__halo', { background: 'radial-gradient(circle, rgba(255,236,190,.95), rgba(255,236,190,0) 65%)', duration: 1.2 }, 2.2)
      .to(t, { v: 180, duration: 1.3, onUpdate: render }, 2.3)
      .to('.thaw__steam', { opacity: 1, duration: 0.6 }, 3.2)
      .to('.thaw__ready', { opacity: 1, y: 0, duration: 0.5 }, 3.4)
      .to({}, { duration: 0.5 });
    render();
  }

  /* ---------- range slider ---------- */
  function range() {
    var root = $('[data-range]');
    if (!root) return;
    var list = AA.products, i = 0, busy = false;
    var nameEl = $('.range__name', root), img = $('.range__img', root), info = $('.range__info', root);
    var facts = $('.range__facts', root), count = $('.range__count b', root), glow = $('.range__glow', root);
    var thumbs = $('.range__thumbs');

    thumbs.innerHTML = list.map(function (p, k) {
      return '<button class="range__thumb" type="button" role="tab" aria-selected="' + (k === 0) + '" tabindex="' + (k === 0 ? 0 : -1) + '" data-i="' + k + '">' +
        '<img src="' + AAX.productImg(p) + '" alt="" loading="lazy"><span>' + AAX.esc(p.name) + '</span></button>';
    }).join('');
    // Warm the cache so swaps don't flash.
    list.forEach(function (p) { var im = new Image(); im.src = AAX.productImg(p); });

    function fill(k) {
      var p = list[k];
      root.style.setProperty('--accent', p.a.accent);
      nameEl.innerHTML = p.name.split('').map(function (c) { return '<span class="ch">' + (c === ' ' ? '&nbsp;' : AAX.esc(c)) + '</span>'; }).join('');
      img.src = AAX.productImg(p); img.alt = p.alt;
      $('.range__local', info).textContent = p.local;
      $('.range__title', info).textContent = p.name;
      $('.range__tagline', info).textContent = p.tagline;
      $('.range__variants', info).innerHTML = p.variants.map(function (v) {
        return '<li>' + AAX.icon('check') + '<span><b>' + AAX.esc(v.name) + '.</b> ' + AAX.esc(v.note) + '</span></li>';
      }).join('');
      $('.range__link', info).href = 'golden-leaf-product.html?p=' + p.slug;
      facts.innerHTML = p.facts.map(function (f) {
        return '<li>' + AAX.icon(f.icon) + '<div><span>' + AAX.esc(f.label) + '</span><strong>' + AAX.esc(f.value) + '</strong></div></li>';
      }).join('');
      count.textContent = String(k + 1).padStart(2, '0');
      $$('.range__thumb', thumbs).forEach(function (b, j) {
        b.setAttribute('aria-selected', String(j === k));
        b.tabIndex = j === k ? 0 : -1;
      });
    }

    function go(k, dir) {
      k = (k + list.length) % list.length;
      if (busy || k === i) return;
      busy = true;
      dir = dir || (k > i ? 1 : -1);
      if (reduce) { fill(k); i = k; busy = false; return; }
      var tl = gsap.timeline({ onComplete: function () { busy = false; } });
      tl.to(img, { xPercent: -35 * dir, rotation: -22 * dir, opacity: 0, scale: 0.85, duration: 0.45, ease: 'power2.in' }, 0)
        .to($$('.ch', nameEl), { yPercent: -60, opacity: 0, stagger: 0.012, duration: 0.3, ease: 'power2.in' }, 0)
        .to([info, facts, glow], { opacity: 0, duration: 0.3 }, 0)
        .add(function () { fill(k); })
        .fromTo(img, { xPercent: 35 * dir, rotation: 22 * dir, opacity: 0, scale: 0.85 }, { xPercent: 0, rotation: 0, opacity: 1, scale: 1, duration: 0.85, ease: 'power3.out' })
        .add(function () { gsap.from($$('.ch', nameEl), { yPercent: 90, opacity: 0, stagger: 0.03, duration: 0.8, ease: 'expo.out' }); }, '<')
        .to(glow, { opacity: 0.75, duration: 0.8 }, '<')
        .fromTo([info, facts], { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, '<0.15');
      i = k;
    }

    fill(0);
    $('[data-prev]', root).addEventListener('click', function () { go(i - 1, -1); });
    $('[data-next]', root).addEventListener('click', function () { go(i + 1, 1); });
    thumbs.addEventListener('click', function (e) {
      var b = e.target.closest('.range__thumb'); if (b) go(+b.getAttribute('data-i'));
    });
    thumbs.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      var d = e.key === 'ArrowRight' ? 1 : -1;
      go(i + d, d);
      setTimeout(function () { var b = $('[aria-selected="true"]', thumbs); if (b) b.focus(); }, 30);
    });
    // Swipe on touch screens.
    var sx = null;
    root.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    root.addEventListener('touchend', function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx; sx = null;
      if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
    });

    if (!reduce) {
      gsap.from(img, { scale: 0.7, rotation: -20, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: root, start: 'top 70%', once: true } });
      gsap.from($$('.ch', nameEl), { yPercent: 100, opacity: 0, stagger: 0.035, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: root, start: 'top 70%', once: true } });
    }
  }

  /* ---------- Mr. Ginger: badges pop out from behind the bottle ---------- */
  function ginger() {
    var stage = $('.ginger__stage');
    if (!stage) return;
    AAX.mouseParallax(stage, '[data-depth]', 30);
    if (reduce) return;
    var badges = $$('.ginger__badge', stage);
    badges.forEach(function (b) {
      b.dataset.tx = b.style.getPropertyValue('--tx');
      b.dataset.ty = b.style.getPropertyValue('--ty');
      b.dataset.r = b.style.getPropertyValue('--r');
    });
    var tl = gsap.timeline({ scrollTrigger: { trigger: stage, start: 'top 72%', once: true } });
    tl.from('.ginger__bottle', { y: 80, rotation: -10, opacity: 0, duration: 1.1, ease: 'expo.out' })
      .from('.ginger__float', { scale: 0, opacity: 0, rotation: -40, duration: 0.9, stagger: 0.07, ease: 'back.out(1.6)' }, 0.2);
    badges.forEach(function (b, k) {
      tl.fromTo(b, { '--tx': '-50%', '--ty': '-50%', '--r': '0deg', '--s': 0.2, opacity: 0 },
        { '--tx': b.dataset.tx, '--ty': b.dataset.ty, '--r': b.dataset.r, '--s': 1, opacity: 1, duration: 1, ease: 'back.out(1.5)' }, 0.45 + k * 0.1);
    });
    $$('.ginger__float', stage).forEach(function (el, k) {
      gsap.to(el, { rotation: '+=' + (k % 2 ? 8 : -8), yPercent: k % 2 ? 6 : -6, duration: 2.6 + k * 0.4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.5 });
    });
  }

  /* ---------- compare table ---------- */
  function compare() {
    if (reduce) return;
    gsap.from('.compare__table tbody tr', {
      opacity: 0, y: 26, duration: 0.8, stagger: 0.08, ease: 'expo.out',
      scrollTrigger: { trigger: '.compare__table', start: 'top 78%', once: true }
    });
    gsap.from('.compare__table thead .is-us', { yPercent: 40, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.compare__table', start: 'top 80%', once: true } });
  }

  /* ---------- kitchen photo grows to full bleed ---------- */
  function kitchen() {
    var pin = $('.kitchen__pin');
    if (!pin || reduce) return;
    gsap.timeline({ scrollTrigger: { trigger: pin, start: 'top top', end: '+=110%', scrub: 0.6, pin: true, anticipatePin: 1 } })
      .fromTo('.kitchen__frame', { clipPath: AAX.mobile() ? 'inset(18% 6% 18% 6% round 28px)' : 'inset(14% 16% 14% 16% round 40px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none' }, 0)
      .fromTo('.kitchen__frame img', { scale: 1.3 }, { scale: 1, ease: 'none' }, 0)
      .from('.kitchen__title', { yPercent: 60, opacity: 0, ease: 'none', duration: 0.5 }, 0.35);
    gsap.from('.kitchen__facts p', { opacity: 0, y: 24, stagger: 0.1, duration: 0.8, ease: 'expo.out', scrollTrigger: { trigger: '.kitchen__facts', start: 'top 82%', once: true } });
  }

  /* ---------- reviews ---------- */
  function buildReviews() {
    var host = $('[data-reviews]');
    if (!host) return;
    var star = '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.7 7.3L12 17.6 5.7 21.5l1.7-7.3L2 9.5l7.1-.6z"/></svg>';
    host.innerHTML = AA.reviews.map(function (r) {
      return '<figure class="review"><div class="review__stars" aria-label="5 out of 5">' + star + star + star + star + star + '</div>' +
        '<blockquote>' + AAX.esc(r.quote) + '</blockquote><figcaption><strong>' + AAX.esc(r.who) + '</strong>, ' + AAX.esc(r.where) + '</figcaption></figure>';
    }).join('');
  }
  function reviews() {
    if (reduce) return;
    $$('.review').forEach(function (card, k) {
      var r = k % 2 ? 1.2 : -1.4;
      gsap.fromTo(card, { rotation: r * 4, y: 90, opacity: 0.2 }, {
        rotation: r, y: 0, opacity: 1, ease: 'none',
        scrollTrigger: { trigger: card, start: 'top bottom', end: 'top 62%', scrub: 0.6 }
      });
    });
  }

  function buildFooterProducts() {
    var host = $('[data-footer-products]');
    if (!host) return;
    host.insertAdjacentHTML('beforeend', AA.products.map(function (p) {
      return '<a href="golden-leaf-product.html?p=' + p.slug + '">' + AAX.esc(p.name) + '</a>';
    }).join(''));
  }
})();
