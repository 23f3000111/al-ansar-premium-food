/* Shared helpers for both concepts: smooth scroll, reveals, contact links, small utilities. */
(function () {
  var AAX = (window.AAX = {});
  var reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)');
  AAX.reduce = reduceMq.matches;
  AAX.touch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  AAX.mobile = function () { return window.innerWidth < 768; };

  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.defaults({ ease: 'power3.out' });
  if (AAX.reduce) document.documentElement.classList.add('reduce-motion');
  else document.documentElement.classList.add('motion');

  /* ---------- smooth scroll ---------- */
  AAX.initSmooth = function () {
    if (AAX.reduce || typeof Lenis === 'undefined') return null;
    var lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    AAX.lenis = lenis;
    return lenis;
  };

  AAX.scrollTo = function (target, offset) {
    var el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) return;
    if (AAX.lenis) AAX.lenis.scrollTo(el, { offset: offset || 0, duration: 1.4 });
    else el.scrollIntoView({ behavior: AAX.reduce ? 'auto' : 'smooth' });
  };

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href');
    if (id.length < 2 || !document.querySelector(id)) return;
    e.preventDefault();
    AAX.scrollTo(id, -20);
  });

  /* ---------- tiny utils ---------- */
  AAX.icon = function (name, cls) {
    return '<svg class="icon ' + (cls || '') + '" aria-hidden="true" focusable="false"><use href="#i-' + name + '"></use></svg>';
  };
  AAX.param = function (k) { return new URLSearchParams(location.search).get(k); };
  AAX.product = function (slug) {
    for (var i = 0; i < AA.products.length; i++) if (AA.products[i].slug === slug) return AA.products[i];
    return AA.products[0];
  };
  AAX.productImg = function (p) { return 'assets/img/products/' + p.img + '.webp'; };
  AAX.esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  };

  /* Fill contact details + links from AA.company (single source of truth). */
  AAX.bindContact = function (root) {
    root = root || document;
    var c = AA.company;
    root.querySelectorAll('[data-wa]').forEach(function (a) {
      a.href = AA.wa(a.getAttribute('data-wa'));
      a.target = '_blank'; a.rel = 'noopener';
    });
    root.querySelectorAll('[data-tel]').forEach(function (a) {
      a.href = 'tel:' + (a.getAttribute('data-tel') === '2' ? c.phone2 : '+' + c.whatsapp);
    });
    root.querySelectorAll('[data-mail]').forEach(function (a) { a.href = 'mailto:' + c.email; });
    root.querySelectorAll('[data-social]').forEach(function (a) {
      a.href = c.social[a.getAttribute('data-social')]; a.target = '_blank'; a.rel = 'noopener';
    });
    root.querySelectorAll('[data-c]').forEach(function (el) { el.textContent = c[el.getAttribute('data-c')]; });
    root.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
    root.querySelectorAll('[data-map]').forEach(function (a) {
      a.href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Al Ansar Premium Food ' + c.address);
      a.target = '_blank'; a.rel = 'noopener';
    });
  };

  /* ---------- motion helpers ---------- */
  // Masked line reveal. Returns the SplitText instance (autoSplit keeps lines right after font load/resize).
  AAX.revealLines = function (el, vars, trigger) {
    if (!el || AAX.reduce) return null;
    vars = vars || {};
    return SplitText.create(el, {
      type: 'lines', mask: 'lines', autoSplit: true, linesClass: 'split-line',
      onSplit: function (self) {
        return gsap.from(self.lines, Object.assign({
          yPercent: 115, rotate: 3, transformOrigin: '0% 100%', duration: 1.1, stagger: 0.09, ease: 'expo.out',
          scrollTrigger: trigger === false ? undefined : { trigger: el, start: 'top 85%', once: true }
        }, vars));
      }
    });
  };

  AAX.magnetic = function (els, strength) {
    if (AAX.touch || AAX.reduce) return;
    strength = strength || 0.25;
    els.forEach(function (el) {
      var xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' });
      var yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' });
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * strength);
        yTo((e.clientY - r.top - r.height / 2) * strength);
      });
      el.addEventListener('pointerleave', function () { xTo(0); yTo(0); });
    });
  };

  // Mouse parallax for [data-depth] children inside a container.
  AAX.mouseParallax = function (container, selector, amount) {
    if (AAX.touch || AAX.reduce || !container) return;
    amount = amount || 28;
    var items = Array.prototype.map.call(container.querySelectorAll(selector || '[data-depth]'), function (el) {
      var d = parseFloat(el.getAttribute('data-depth')) || 1;
      return { d: d, x: gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3' }), y: gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power3' }) };
    });
    container.addEventListener('pointermove', function (e) {
      var r = container.getBoundingClientRect();
      var nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
      items.forEach(function (it) { it.x(-nx * amount * it.d); it.y(-ny * amount * it.d); });
    });
    container.addEventListener('pointerleave', function () { items.forEach(function (it) { it.x(0); it.y(0); }); });
  };

  // Infinite marquee that speeds up with scroll velocity and flips with scroll direction.
  AAX.marquee = function (track, secondsPerLoop) {
    if (!track) return;
    var inner = track.firstElementChild;
    track.appendChild(inner.cloneNode(true)).setAttribute('aria-hidden', 'true');
    if (AAX.reduce) return;
    var tween = gsap.to(track.children, { xPercent: -100, ease: 'none', duration: secondsPerLoop || 30, repeat: -1 });
    var dir = 1;
    ScrollTrigger.create({
      onUpdate: function (self) {
        if (self.direction !== dir) { dir = self.direction; }
        var v = Math.min(Math.abs(self.getVelocity()) / 400, 4);
        gsap.to(tween, { timeScale: dir * (1 + v), duration: 0.3, overwrite: true });
        gsap.to(tween, { timeScale: dir, duration: 1.2, delay: 0.3, overwrite: false });
      }
    });
    return tween;
  };

  // Hide the header when scrolling down, show it when scrolling up.
  AAX.autoHideHeader = function (header, cls) {
    if (!header) return;
    var last = 0;
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: function (self) {
        var y = self.scroll();
        header.classList.toggle(cls || 'is-scrolled', y > 40);
        if (y > 400 && y > last + 4) header.classList.add('is-hidden');
        else if (y < last - 4 || y < 400) header.classList.remove('is-hidden');
        last = y;
      }
    });
  };

  /* Round menu button that grows into a panel (clip-path circle from the button). */
  AAX.morphMenu = function (btn, panel, nav) {
    if (!btn || !panel) return;
    var open = false;
    function q(s) { return Array.prototype.slice.call(panel.querySelectorAll(s)); }
    function origin() {
      var b = btn.getBoundingClientRect(), p = panel.getBoundingClientRect();
      return (b.left + b.width / 2 - p.left) + 'px ' + (b.top + b.height / 2 - p.top) + 'px';
    }
    function set(o) {
      open = o;
      btn.setAttribute('aria-expanded', String(o));
      btn.setAttribute('aria-label', o ? 'Close menu' : 'Open menu');
      panel.setAttribute('aria-hidden', String(!o));
      if (nav) nav.classList.toggle('menu-open', o);
      var at = origin();
      if (o) {
        gsap.set(panel, { visibility: 'visible' });
        gsap.fromTo(panel, { clipPath: 'circle(0px at ' + at + ')' }, { clipPath: 'circle(160% at ' + at + ')', duration: AAX.reduce ? 0 : 0.9, ease: 'expo.inOut' });
        if (!AAX.reduce) gsap.from(q('.menu__links a, .menu__foot'), { y: 34, opacity: 0, stagger: 0.05, duration: 0.8, delay: 0.25, ease: 'expo.out' });
        setTimeout(function () { var a = panel.querySelector('a'); if (a) a.focus({ preventScroll: true }); }, 300);
      } else {
        gsap.to(panel, { clipPath: 'circle(0px at ' + at + ')', duration: AAX.reduce ? 0 : 0.7, ease: 'expo.inOut', onComplete: function () { gsap.set(panel, { visibility: 'hidden' }); } });
      }
    }
    btn.addEventListener('click', function () { set(!open); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && open) { set(false); btn.focus(); } });
    panel.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
    document.addEventListener('click', function (e) { if (open && !panel.contains(e.target) && !btn.contains(e.target)) set(false); });
  };

  // Hide the floating WhatsApp button once the footer's last row is on screen (the footer has its own links).
  AAX.dockFloat = function (btn, stop) {
    if (!btn || !stop) return;
    ScrollTrigger.create({
      trigger: stop, start: 'top bottom', refreshPriority: -1,
      onEnter: function () { btn.classList.add('is-away'); },
      onLeaveBack: function () { btn.classList.remove('is-away'); }
    });
  };

  // Triggers created before a pinned section (but sitting below it) must be measured after it.
  // Call once every ScrollTrigger on the page exists.
  AAX.settle = function () {
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  };

  AAX.ready = function (fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  };

  // Refresh ScrollTrigger once web fonts are in (layout shifts otherwise).
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
