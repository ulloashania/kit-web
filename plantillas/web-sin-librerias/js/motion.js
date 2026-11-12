// Animaciones comunes a todas las páginas. Cada pieza del kit se puede añadir aquí
// o en su propio archivo js/<pieza>.js cargado solo en la página que la usa.
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

  // Cuánto se ha recorrido de una sección alta con contenido fijo (sticky): de 0 a 1.
  // Es la base de todas las animaciones con scroll del kit.
  window.progress = el => {
    const r = el.getBoundingClientRect();
    return clamp(-r.top / Math.max(1, r.height - innerHeight));
  };

  // Titulares letra a letra (el texto entero queda para lectores de pantalla)
  let i = 0;
  $$('[data-kinetic]').forEach(h => {
    const text = h.textContent;
    h.setAttribute('aria-label', text);
    h.innerHTML = text.split(' ').map(w => `<span class="w" aria-hidden="true">${[...w].map(ch => `<span class="k" style="--i:${i++}">${ch}</span>`).join('')}</span>`).join(' ');
  });

  // Aparecer al entrar en pantalla
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -8% 0px' });
  $$('[data-r],[data-kinetic]').forEach(el => io.observe(el));

  // Números que cuentan
  const ease = t => 1 - Math.pow(1 - t, 3);
  const counter = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    counter.unobserve(e.target);
    if (reduce) return;
    const end = +e.target.dataset.count, suffix = e.target.textContent.replace(/\d/g, ''), start = performance.now();
    const tick = now => { const t = clamp((now - start) / 1100); e.target.textContent = Math.round(ease(t) * end) + suffix; if (t < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }), { threshold: .6 });
  $$('[data-count]').forEach(el => counter.observe(el));

  // La página actual se marca en el menú
  const here = location.pathname.split('/').pop() || 'index.html';
  $$('.cabecera nav a').forEach(a => { if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page'); });
})();
