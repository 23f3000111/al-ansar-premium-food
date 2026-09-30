/* Concept B — Sedap Pop (product page). One template, all seven products: sedap-pop-product.html?p=slug */
(function () {
  var $ = SP.$, $$ = SP.$$;
  var reduce = AAX.reduce;
  var cur = null, qty = 1;

  AAX.ready(function () {
    buildSwitch();
    SP.reviews($('[data-love]'));
    SP.faq($('[data-faq]'), AA.faqs.slice(0, 4));
    SP.common();
    tabs();
    qtyInit();
    render(AAX.product(AAX.param('p')), false);
    heroIn();
    tear();
    AAX.marquee($('[data-marquee]'), 40);
    AAX.settle();
  });

  // Any link that carries a product slug switches the page in place.
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[data-slug]');
    if (!a) return;
    e.preventDefault();
    swap(a.getAttribute('data-slug'), true);
  });

  function buildSwitch() {
    $('[data-switch]').innerHTML = AA.products.map(function (p) {
      return '<button type="button" data-slug-btn="' + p.slug + '" style="--sc:' + p.b.bg + '"><span class="pd-switch__disc"><img src="' + AAX.productImg(p) + '" alt=""></span>' + AAX.esc(p.name) + '</button>';
    }).join('');
    $('[data-switch]').addEventListener('click', function (e) {
      var b = e.target.closest('button[data-slug-btn]');
      if (b) swap(b.getAttribute('data-slug-btn'));
    });
  }

  function tabs() {
    var list = $$('.pd-tabs [role="tab"]');
    function select(t) {
      list.forEach(function (x) {
        var on = x === t;
        x.setAttribute('aria-selected', String(on));
        x.tabIndex = on ? 0 : -1;
        document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
      });
      if (!reduce) gsap.from('#' + t.getAttribute('aria-controls'), { y: 12, opacity: 0, duration: 0.4, ease: 'back.out(2)' });
    }
    list.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        var n = list[(i + (e.key === 'ArrowRight' ? 1 : -1) + list.length) % list.length];
        select(n); n.focus();
      });
    });
  }

  function qtyInit() {
    $$('[data-qty]').forEach(function (b) {
      b.addEventListener('click', function () {
        qty = Math.max(1, Math.min(99, qty + parseInt(b.getAttribute('data-qty'), 10)));
        $('[data-qty-out]').textContent = qty;
        orderLinks();
        if (!reduce) gsap.fromTo('[data-qty-out]', { scale: 1.5 }, { scale: 1, duration: 0.4, ease: 'back.out(3)' });
      });
    });
  }

  function orderLinks() {
    if (!cur) return;
    var packs = qty + (qty === 1 ? ' pack' : ' packs');
    $$('[data-order]').forEach(function (a) { a.href = AA.wa("Hi Al Ansar! I'd like to order " + packs + ' of ' + cur.name + '.'); a.target = '_blank'; a.rel = 'noopener'; });
    $$('[data-order-simple]').forEach(function (a) { a.href = AA.wa("Hi Al Ansar! I'd like to order " + cur.name + '.'); a.target = '_blank'; a.rel = 'noopener'; });
    $$('[data-wholesale]').forEach(function (a) { a.href = AA.wa('Hi Al Ansar! Please send me wholesale prices for ' + cur.name + '. My business is: '); a.target = '_blank'; a.rel = 'noopener'; });
  }

  function swap(slug, toTop) {
    if (cur && slug === cur.slug) return;
    var p = AAX.product(slug);
    if (toTop) AAX.scrollTo(document.body);
    if (reduce) { render(p, false); return; }
    gsap.timeline()
      .to('[data-img]', { scale: 0.5, rotation: 40, opacity: 0, duration: 0.35, ease: 'back.in(1.6)' }, 0)
      .to(['.pd-title', '.pd-local', '.pd-price', '.pd-intro', '.pd-best'], { y: -20, opacity: 0, duration: 0.25, stagger: 0.03 }, 0)
      .add(function () { render(p, true); });
  }

  function render(p, animate) {
    cur = p;
    var root = document.documentElement.style;
    root.setProperty('--c', p.b.bg); root.setProperty('--c-deep', p.b.deep);
    root.setProperty('--c-ink', p.b.ink); root.setProperty('--c-tint', p.b.tint);
    var meta = document.querySelector('meta[name="theme-color"]'); if (meta) meta.setAttribute('content', p.b.bg);
    document.title = p.name + ' | Al Ansar Premium Food';
    if (history.replaceState) history.replaceState(null, '', '?p=' + p.slug);

    $$('[data-f]').forEach(function (el) { el.textContent = p[el.getAttribute('data-f')]; });
    $('[data-best]').hidden = !p.bestseller;
    $('[data-price]').textContent = p.price ? (p.slug === 'ginger-shot' ? 'RM5.99 a bottle' : p.price) : 'Ask us for today’s price';
    $('[data-price]').classList.toggle('is-ask', !p.price);
    $$('[data-switch] button').forEach(function (b) { b.setAttribute('aria-current', String(b.getAttribute('data-slug-btn') === p.slug)); });
    qty = 1; $('[data-qty-out]').textContent = '1';
    orderLinks();

    var imgs = [AAX.productImg(p)].concat(p.variantImgs || []).filter(function (v, i, a) { return a.indexOf(v) === i; }).slice(0, 3);
    var main = $('[data-img]');
    main.src = imgs[0]; main.alt = p.alt;
    $('[data-thumbs]').innerHTML = imgs.map(function (src, i) {
      return '<button type="button" aria-pressed="' + (i === 0) + '" data-src="' + src + '" aria-label="Show photo ' + (i + 1) + '"><img src="' + src + '" alt=""></button>';
    }).join('');
    $$('[data-thumbs] button').forEach(function (b) {
      b.addEventListener('click', function () {
        $$('[data-thumbs] button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        if (reduce) { main.src = b.getAttribute('data-src'); return; }
        gsap.timeline()
          .to(main, { scale: 0.7, rotation: -20, opacity: 0, duration: 0.25, ease: 'power2.in' })
          .add(function () { main.src = b.getAttribute('data-src'); })
          .to(main, { scale: 1, rotation: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.8)' });
      });
    });

    $('[data-badges]').innerHTML = p.badges.map(function (k) {
      var b = AA.badges[k];
      return '<div class="pd-badge"><span>' + AAX.icon(b.icon) + '</span>' + AAX.esc(b.label) + '</div>';
    }).join('');
    $('[data-nutri]').innerHTML = AA.nutrition.map(function (n) { return '<div><dt>' + AAX.esc(n.label) + '</dt><dd>' + AAX.esc(n.value) + '</dd></div>'; }).join('');
    $('[data-keyfacts]').innerHTML = p.facts.map(function (f) { return '<li><span>' + AAX.esc(f.label) + '</span>' + AAX.esc(f.value) + '</li>'; }).join('');
    $$('[data-tear]').forEach(function (img) { img.src = AAX.productImg(p); });
    $('[data-steps]').innerHTML = p.steps.map(function (s, i) {
      return '<li class="pd-step"><span class="pd-step__n" aria-hidden="true">' + (i + 1) + '</span><span class="pd-step__t">' + AAX.esc(s.time) + '</span><h3>' + AAX.esc(s.title) + '</h3><p>' + AAX.esc(s.text) + '</p></li>';
    }).join('');
    $('[data-pairs]').innerHTML = p.pairs.map(function (x) { return '<li>' + AAX.esc(x) + '</li>'; }).join('');
    $('[data-more]').innerHTML = AA.products.filter(function (x) { return x.slug !== p.slug; }).slice(0, 6).map(SP.card).join('');

    if (animate) {
      gsap.timeline()
        .fromTo('[data-img]', { scale: 0.4, rotation: -50, opacity: 0, y: -80 }, { scale: 1, rotation: 0, opacity: 1, y: 0, duration: 0.9, ease: 'back.out(1.6)' }, 0)
        .fromTo(['.pd-title', '.pd-local', '.pd-price', '.pd-intro', '.pd-best'], { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'back.out(2)' }, 0.1)
        .fromTo('[data-thumbs] button', { scale: 0 }, { scale: 1, duration: 0.5, stagger: 0.06, ease: 'back.out(2.4)' }, 0.3);
      stepsIn();
      ScrollTrigger.refresh();
    } else {
      stepsIn();
    }
  }

  function heroIn() {
    if (reduce) return;
    gsap.timeline({ delay: 0.1 })
      .from('.bar', { yPercent: -160, duration: 0.9, ease: 'back.out(1.4)', clearProps: 'transform' }, 0)
      .from('.pd-title', { scale: 0.5, opacity: 0, rotation: -6, duration: 0.9, ease: 'back.out(2)' }, 0.15)
      .from(['.pd-best', '.pd-local', '.pd-price', '.pd-intro'], { y: 24, opacity: 0, duration: 0.6, stagger: 0.06 }, 0.3)
      .from('.pd-switch button', { scale: 0, opacity: 0, duration: 0.5, stagger: 0.04, ease: 'back.out(2.4)' }, 0.45)
      .from('.pd-box', { y: 40, opacity: 0, duration: 0.7, ease: 'back.out(1.6)' }, 0.6)
      .from('[data-img]', { yPercent: -60, rotation: -60, scale: 0.4, opacity: 0, duration: 1.2, ease: 'back.out(1.4)' }, 0.2)
      .from('[data-thumbs] button', { scale: 0, duration: 0.5, stagger: 0.07, ease: 'back.out(2.4)' }, 0.8)
      .add(function () { gsap.to('.pd-stage', { y: -12, rotation: 2, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1 }); });
    gsap.from('.pd-badge', { scale: 0.4, opacity: 0, y: 30, duration: 0.7, stagger: 0.08, ease: 'back.out(2)', scrollTrigger: { trigger: '.pd-badges', start: 'top 80%', once: true } });
    gsap.from('.pd-facts', { rotation: 6, y: 60, opacity: 0, duration: 0.9, ease: 'back.out(1.5)', scrollTrigger: { trigger: '.pd-facts', start: 'top 80%', once: true } });
    var tp = $('.pd-good__arc textPath');
    gsap.fromTo(tp, { attr: { startOffset: '-20%' } }, { attr: { startOffset: '50%' }, duration: 1.3, ease: 'back.out(1.1)', scrollTrigger: { trigger: '.pd-good', start: 'top 70%', once: true } });
  }

  var stepTween = null;
  function stepsIn() {
    if (reduce) return;
    if (stepTween) { if (stepTween.scrollTrigger) stepTween.scrollTrigger.kill(); stepTween.kill(); }
    stepTween = gsap.from('.pd-step', { y: 60, rotation: function (i) { return i % 2 ? 5 : -5; }, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'back.out(1.8)', scrollTrigger: { trigger: '.pd-steps', start: 'top 82%', once: true } });
  }

  /* ---------- the tear: the food splits in two as you scroll ---------- */
  function tear() {
    var sec = $('.tear');
    if (!sec || reduce) return;
    var inner = $('.tear__inner', sec);
    var flakes = [];
    for (var i = 0; i < 18; i++) {
      var f = document.createElement('span');
      f.className = 'tear__flake';
      f.style.setProperty('--w', (8 + Math.random() * 16).toFixed(0) + 'px');
      inner.appendChild(f); flakes.push(f);
    }
    var m = AAX.mobile();
    gsap.set('.tear__text', { scale: 0.5 });
    var tl = gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top top', end: '+=160%', scrub: 0.6, pin: true, anticipatePin: 1 } });
    tl.to('.tear__half--l', { xPercent: m ? -34 : -44, rotation: -16, ease: 'power2.inOut', duration: 1 }, 0.15)
      .to('.tear__half--r', { xPercent: m ? 34 : 44, rotation: 16, ease: 'power2.inOut', duration: 1 }, 0.15)
      .to('.tear__text', { opacity: 1, scale: 1, ease: 'back.out(1.6)', duration: 0.6 }, 0.55);
    flakes.forEach(function (f) {
      var ang = Math.random() * Math.PI * 2, dist = (m ? 120 : 220) + Math.random() * (m ? 140 : 320);
      tl.fromTo(f, { x: 0, y: 0, scale: 0, opacity: 1, rotation: 0 },
        { x: Math.cos(ang) * dist, y: Math.sin(ang) * dist * 0.7, scale: 1, rotation: Math.random() * 360, opacity: 0.95, ease: 'power3.out', duration: 0.9 }, 0.2 + Math.random() * 0.2);
    });
  }
})();
