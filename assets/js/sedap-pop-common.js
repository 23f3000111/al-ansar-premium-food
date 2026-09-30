/* Concept B — Sedap Pop: pieces shared by the home and product pages. */
window.SP = (function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = AAX.reduce;
  var cardColours = ['#FFFFFF', '#FFE6A6', '#D8F75E', '#C3F1EE', '#DDD2FF', '#FFD6B8'];

  function productHref(p) { return 'sedap-pop-product.html?p=' + p.slug; }

  function cssVars(p) {
    return '--c:' + p.b.bg + ';--c-deep:' + p.b.deep + ';--c-ink:' + p.b.ink + ';--c-tint:' + p.b.tint;
  }

  function card(p) {
    return '<article class="pcard" style="' + cssVars(p) + '">' +
      (p.bestseller ? '<span class="pcard__best" aria-label="Best seller">Best<br>seller</span>' : '') +
      '<h3>' + AAX.esc(p.name) + '</h3>' +
      '<img class="pcard__img" src="' + AAX.productImg(p) + '" alt="' + AAX.esc(p.alt) + '" loading="lazy">' +
      '<p>' + AAX.esc(p.tagline) + '</p>' +
      '<div class="pcard__btns">' +
      '<a class="pill pill--white" href="' + productHref(p) + '" data-slug="' + p.slug + '">View</a>' +
      '<a class="pill pill--deep" href="' + AA.wa("Hi Al Ansar! I'd like to order " + p.name + '.') + '" target="_blank" rel="noopener">Order</a>' +
      '</div></article>';
  }

  /* Products mega menu in the nav bar */
  function mega() {
    var btn = $('.bar__drop'), panel = $('#mega'), grid = $('[data-mega]');
    if (!btn || !panel) return;
    grid.innerHTML = AA.products.map(function (p) {
      return '<a class="mega__item" href="' + productHref(p) + '" data-slug="' + p.slug + '" style="--mc:' + p.b.bg + '">' +
        '<span class="mega__disc"><img src="' + AAX.productImg(p) + '" alt=""></span>' + AAX.esc(p.name) + '</a>';
    }).join('');
    var open = false;
    function set(o) {
      open = o;
      btn.setAttribute('aria-expanded', String(o));
      if (o) {
        panel.hidden = false;
        if (!reduce) {
          gsap.fromTo(panel, { opacity: 0, y: -14, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'back.out(1.6)' });
          gsap.fromTo($$('.mega__item', panel), { opacity: 0, y: 18, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.035, ease: 'back.out(1.8)' });
        }
      } else {
        if (reduce) { panel.hidden = true; return; }
        gsap.to(panel, { opacity: 0, y: -10, duration: 0.2, onComplete: function () { if (!open) panel.hidden = true; } });
      }
    }
    btn.addEventListener('click', function (e) { e.stopPropagation(); set(!open); });
    document.addEventListener('click', function (e) { if (open && !panel.contains(e.target)) set(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && open) { set(false); btn.focus(); } });
    panel.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
  }

  function footProducts() {
    var host = $('[data-foot-products]');
    if (!host) return;
    host.insertAdjacentHTML('beforeend', AA.products.map(function (p) {
      return '<a href="' + productHref(p) + '" data-slug="' + p.slug + '">' + AAX.esc(p.name) + '</a>';
    }).join(''));
  }

  /* Accordion with animated height */
  function faq(host, items) {
    if (!host) return;
    var colours = ['#FFB81C', '#FF6FB1', '#1FBFB8', '#8B63FF', '#4CB944', '#FF8A3D'];
    host.innerHTML = items.map(function (f, i) {
      return '<div class="faq__item" style="--qc:' + colours[i % colours.length] + '">' +
        '<button class="faq__q" type="button" aria-expanded="false" aria-controls="faq-a-' + i + '" id="faq-q-' + i + '">' +
        '<span class="faq__dot">' + AAX.icon('plus') + '</span>' + AAX.esc(f.q) + '</button>' +
        '<div class="faq__a" id="faq-a-' + i + '" role="region" aria-labelledby="faq-q-' + i + '"><p>' + AAX.esc(f.a) + '</p></div></div>';
    }).join('');
    host.addEventListener('click', function (e) {
      var q = e.target.closest('.faq__q');
      if (!q) return;
      var a = document.getElementById(q.getAttribute('aria-controls'));
      var isOpen = q.getAttribute('aria-expanded') === 'true';
      q.setAttribute('aria-expanded', String(!isOpen));
      gsap.to(a, { height: isOpen ? 0 : 'auto', duration: reduce ? 0 : 0.5, ease: isOpen ? 'power2.inOut' : 'back.out(1.2)', onComplete: function () { ScrollTrigger.refresh(); } });
    });
  }

  function reviews(host) {
    if (!host) return;
    var colours = ['#FFFFFF', '#FFE6A6', '#D8F75E', '#C3F1EE', '#DDD2FF'];
    host.innerHTML = AA.reviews.map(function (r, i) {
      return '<figure class="qcard" style="--qc:' + colours[i % colours.length] + '"><blockquote>“' + AAX.esc(r.quote) + '”</blockquote>' +
        '<figcaption><span class="qcard__av" aria-hidden="true">' + AAX.esc(r.who.charAt(0)) + '</span><span>' + AAX.esc(r.who) + ', ' + AAX.esc(r.where) + '</span></figcaption></figure>';
    }).join('');
  }

  /* Colour-strip curtain that lifts to reveal the page */
  function curtain(onReveal) {
    var c = $('.curtain');
    if (!c || reduce) { if (c) c.remove(); onReveal && onReveal(); return; }
    document.body.classList.add('is-loading');
    if (AAX.lenis) AAX.lenis.stop();
    var tl = gsap.timeline({
      onComplete: function () {
        c.remove();
        document.body.classList.remove('is-loading');
        if (AAX.lenis) AAX.lenis.start();
        ScrollTrigger.refresh();
      }
    });
    tl.from('.curtain__word', { scale: 0.3, rotation: -12, opacity: 0, duration: 0.7, ease: 'back.out(2)' })
      .to('.curtain__word', { scale: 1.15, opacity: 0, duration: 0.35, ease: 'power2.in' }, '+=0.35')
      .to($$('span', c), { yPercent: -101, duration: 0.8, ease: 'expo.inOut', stagger: { each: 0.05, from: 'center' } }, '-=0.15')
      .add(function () { onReveal && onReveal(); }, '-=0.55');
  }

  /* Sticker pop: from the parent's centre out to its CSS position */
  function popStickers(els, delay, trigger) {
    if (reduce || !els.length) return;
    els.forEach(function (s) {
      s.dataset.x = s.style.getPropertyValue('--x');
      s.dataset.y = s.style.getPropertyValue('--y');
      s.dataset.r = s.style.getPropertyValue('--r');
      gsap.set(s, { '--x': '-50%', '--y': '-50%', '--s': 0, '--r': '0deg' });
    });
    var tl = gsap.timeline({ delay: delay || 0, scrollTrigger: trigger ? { trigger: trigger, start: 'top 70%', once: true } : undefined });
    els.forEach(function (s, i) {
      tl.to(s, { '--x': s.dataset.x, '--y': s.dataset.y, '--r': s.dataset.r, '--s': 1, duration: 0.9, ease: 'back.out(1.9)' }, i * 0.09);
    });
    return tl;
  }

  /* Headlines bounce in word by word */
  function popTitles(scope) {
    if (reduce) return;
    $$('[data-pop]', scope).forEach(function (el) {
      SplitText.create(el, {
        type: 'words', autoSplit: true,
        onSplit: function (self) {
          return gsap.from(self.words, {
            yPercent: 110, rotation: function () { return gsap.utils.random(-14, 14); }, scale: 0.6, opacity: 0,
            duration: 0.8, stagger: 0.07, ease: 'back.out(2)',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true }
          });
        }
      });
    });
  }

  /* Gentle bobbing for floating bits (uses yPercent so mouse parallax x/y stays free) */
  function bob(els) {
    if (reduce) return;
    els.forEach(function (el, i) {
      gsap.to(el, { yPercent: i % 2 ? 8 : -8, rotation: '+=' + (i % 2 ? 6 : -6), duration: 2.2 + (i % 4) * 0.45, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    });
  }

  function common() {
    AAX.initSmooth();
    AAX.bindContact();
    AAX.autoHideHeader($('[data-bar]'));
    AAX.dockFloat($('.wa-bubble'), $('.foot__legal'));
    mega();
    footProducts();
    popTitles();
  }

  return { card: card, cssVars: cssVars, productHref: productHref, faq: faq, reviews: reviews, curtain: curtain, popStickers: popStickers, popTitles: popTitles, bob: bob, common: common, $: $, $$: $$ };
})();
