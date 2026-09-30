/* Concept A — Golden Leaf (product page). One template, all seven products: golden-leaf-product.html?p=slug */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = AAX.reduce;
  var current = null;

  AAX.ready(function () {
    AAX.initSmooth();
    AAX.bindContact();
    AAX.morphMenu($('.menu-btn'), $('#menu'), $('.nav'));
    AAX.autoHideHeader($('.nav'));
    AAX.dockFloat($('.wa-float'), $('.footer__bottom'));
    buildSwitch();
    buildFooterProducts();
    render(AAX.product(AAX.param('p')), false);
    heroIn();
    steps();
    AAX.magnetic($$('.pp-ctas .btn, .menu-btn'), 0.2);
    $$('.pp-cook .h2, .pp-details .h2, .pp-more .h2').forEach(function (el) { AAX.revealLines(el); });
  });

  function buildSwitch() {
    var host = $('[data-switch]');
    host.innerHTML = AA.products.map(function (p) {
      return '<button type="button" data-slug="' + p.slug + '" aria-label="' + AAX.esc(p.name) + '">' +
        '<img src="' + AAX.productImg(p) + '" alt=""><span>' + AAX.esc(p.name) + '</span></button>';
    }).join('');
    host.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-slug]');
      if (b) swap(b.getAttribute('data-slug'));
    });
  }

  function buildFooterProducts() {
    var host = $('[data-footer-products]');
    host.insertAdjacentHTML('beforeend', AA.products.map(function (p) {
      return '<a href="golden-leaf-product.html?p=' + p.slug + '" data-slug="' + p.slug + '">' + AAX.esc(p.name) + '</a>';
    }).join(''));
  }

  // In-page switching for any link that carries a product slug.
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[data-slug]');
    if (!a) return;
    e.preventDefault();
    swap(a.getAttribute('data-slug'), true);
  });

  function swap(slug, toTop) {
    if (current && slug === current.slug) return;
    var p = AAX.product(slug);
    if (toTop) AAX.scrollTo(document.body);
    if (reduce) { render(p, false); return; }
    var img = $('.pp-stage__img');
    gsap.timeline()
      .to(img, { scale: 0.8, rotation: 18, opacity: 0, duration: 0.4, ease: 'power2.in' }, 0)
      .to('.pp-seal', { scale: 0, opacity: 0, duration: 0.3, stagger: 0.04, ease: 'power2.in' }, 0)
      .to(['.pp-local', '.pp-title', '.pp-tagline', '.pp-intro', '.pp-facts', '.pp-price'], { opacity: 0, y: -12, duration: 0.3, stagger: 0.03 }, 0)
      .add(function () { render(p, true); });
  }

  function render(p, animate) {
    current = p;
    document.documentElement.style.setProperty('--accent', p.a.accent);
    document.title = p.name + ' | Al Ansar Premium Food';
    if (history.replaceState) history.replaceState(null, '', '?p=' + p.slug);

    $$('[data-f]').forEach(function (el) { el.textContent = p[el.getAttribute('data-f')]; });
    $('[data-facts]').innerHTML = p.facts.map(function (f) {
      return '<li>' + AAX.icon(f.icon) + '<div><span>' + AAX.esc(f.label) + '</span><strong>' + AAX.esc(f.value) + '</strong></div></li>';
    }).join('');
    var price = $('[data-price]');
    price.textContent = p.price ? p.price + (p.slug === 'ginger-shot' ? ' a bottle' : '') : '';
    price.hidden = !p.price;

    $$('[data-order]').forEach(function (a) {
      a.href = AA.wa("Hi Al Ansar! I'd like to order " + p.name + '.');
      a.target = '_blank'; a.rel = 'noopener';
    });
    $$('[data-wholesale]').forEach(function (a) {
      a.href = AA.wa('Hi Al Ansar! Please send me wholesale prices for ' + p.name + '. My business is: ');
      a.target = '_blank'; a.rel = 'noopener';
    });
    $$('[data-switch] button').forEach(function (b) {
      b.setAttribute('aria-current', String(b.getAttribute('data-slug') === p.slug));
    });

    var img = $('.pp-stage__img');
    img.src = AAX.productImg(p); img.alt = p.alt;
    $('[data-seals]').innerHTML = p.badges.slice(0, 4).map(function (k) {
      var b = AA.badges[k];
      return '<span class="pp-seal">' + AAX.icon(b.icon) + AAX.esc(b.label) + '</span>';
    }).join('');

    $('[data-steps]').innerHTML = '<li class="pp-steps__bar" aria-hidden="true"></li>' + p.steps.map(function (s, k) {
      return '<li class="pp-step"><span class="pp-step__n" aria-hidden="true">' + (k + 1) + '</span>' +
        '<p class="pp-step__t">' + AAX.esc(s.time) + '</p><h3>' + AAX.esc(s.title) + '</h3><p>' + AAX.esc(s.text) + '</p></li>';
    }).join('');

    $('[data-variants]').innerHTML = p.variants.map(function (v, k) {
      var src = (p.variantImgs && p.variantImgs[k]) || AAX.productImg(p);
      return '<article class="pp-variant"><img src="' + src + '" alt="" loading="lazy"><div><h3>' + AAX.esc(v.name) + '</h3><p>' + AAX.esc(v.note) + '</p></div></article>';
    }).join('');
    $('[data-pairs]').innerHTML = p.pairs.map(function (x) { return '<li>' + AAX.esc(x) + '</li>'; }).join('');
    $('[data-nutri]').innerHTML = AA.nutrition.map(function (n) {
      return '<div><dt>' + AAX.esc(n.label) + '</dt><dd>' + AAX.esc(n.value) + '</dd></div>';
    }).join('');
    $('[data-badges]').innerHTML = p.badges.map(function (k) {
      var b = AA.badges[k];
      return '<li>' + AAX.icon(b.icon) + AAX.esc(b.label) + '</li>';
    }).join('');

    $('[data-more]').innerHTML = AA.products.filter(function (x) { return x.slug !== p.slug; }).slice(0, 6).map(function (x) {
      return '<a class="pp-card" style="--c:' + x.a.accent + '" href="golden-leaf-product.html?p=' + x.slug + '" data-slug="' + x.slug + '">' +
        '<img src="' + AAX.productImg(x) + '" alt="" loading="lazy"><h3>' + AAX.esc(x.name) + '</h3><p>' + AAX.esc(x.tagline) + '</p></a>';
    }).join('');

    if (animate) {
      var tl = gsap.timeline();
      tl.fromTo(img, { scale: 0.75, rotation: -20, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.9, ease: 'expo.out' }, 0)
        .fromTo(['.pp-local', '.pp-title', '.pp-tagline', '.pp-intro', '.pp-facts', '.pp-price'], { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'expo.out' }, 0.05)
        .fromTo('.pp-seal', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, stagger: 0.07, ease: 'back.out(1.8)' }, 0.25);
      ScrollTrigger.refresh();
      steps();
    }
  }

  function heroIn() {
    if (reduce) return;
    var tl = gsap.timeline({ delay: 0.1 });
    tl.from('.nav > *', { y: -24, opacity: 0, duration: 0.8, stagger: 0.08 }, 0)
      .from('.pp-crumb, .pp-local', { opacity: 0, y: 14, duration: 0.7, stagger: 0.06 }, 0.1)
      .from('.pp-title', { yPercent: 40, opacity: 0, duration: 1.1, ease: 'expo.out' }, 0.15)
      .from(['.pp-tagline', '.pp-intro', '.pp-facts', '.pp-price', '.pp-ctas'], { opacity: 0, y: 20, duration: 0.8, stagger: 0.07 }, 0.35)
      .from('[data-switch] button', { scale: 0, opacity: 0, duration: 0.6, stagger: 0.04, ease: 'back.out(1.8)' }, 0.55)
      .from('.pp-stage__img', { scale: 0.7, rotation: -24, opacity: 0, y: 40, duration: 1.3, ease: 'expo.out' }, 0.2)
      .from('.pp-stage__ring', { scale: 0.6, opacity: 0, duration: 1.2, ease: 'expo.out' }, 0.3)
      .from('.pp-seal', { scale: 0, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'back.out(1.8)' }, 0.7);
    AAX.mouseParallax($('.pp-stage'), '.pp-stage__img, .pp-seal', 18);
  }

  var stepTweens = [];
  function steps() {
    if (reduce) return;
    stepTweens.forEach(function (t) { if (t.scrollTrigger) t.scrollTrigger.kill(); t.kill(); });
    stepTweens = [];
    stepTweens.push(gsap.fromTo('.pp-steps__bar', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.pp-steps', start: 'top 75%', end: 'bottom 55%', scrub: 0.5 } }));
    stepTweens.push(gsap.from('.pp-step', { opacity: 0, y: 30, duration: 0.8, stagger: 0.12, ease: 'expo.out', scrollTrigger: { trigger: '.pp-steps', start: 'top 80%', once: true } }));
  }
})();
