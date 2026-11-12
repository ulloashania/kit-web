// Barra de las demos y botón «Ver código».
// En el <body> de cada demo: data-titulo="…" y data-origen="Portfolio · Services".
// El botón enseña solo lo que hay entre los comentarios <!-- PIEZA --> y <!-- /PIEZA -->,
// que es lo que se copia a otra web. Funciona abriendo el kit desde un servidor
// (GitHub Pages, Cloudflare o `npx serve`), no con doble clic en el archivo.
(() => {
  const b = document.body;
  const raiz = document.querySelector('script[src$="kit.js"]').getAttribute('src').replace('comun/kit.js', '');
  const bar = document.createElement('div');
  bar.className = 'kit-bar';
  bar.innerHTML = `<a href="${raiz}index.html">← Kit</a><b></b><small></small><button type="button">Ver código</button>`;
  bar.querySelector('b').textContent = b.dataset.titulo || document.title;
  bar.querySelector('small').textContent = b.dataset.origen || '';
  b.prepend(bar);

  const dlg = document.createElement('dialog');
  dlg.className = 'kit-code';
  dlg.innerHTML = '<header><b>Código de la pieza</b><button type="button" data-copiar>Copiar</button><button type="button" data-cerrar>Cerrar</button></header><pre></pre>';
  b.append(dlg);
  const pre = dlg.querySelector('pre');

  const sacar = html => {
    const trozos = [...html.matchAll(/<!-- PIEZA[^>]*-->([\s\S]*?)<!-- \/PIEZA -->/g)].map(m => m[1].replace(/^\n+|\s+$/g, ''));
    return trozos.length ? trozos.join('\n\n') : html;
  };
  bar.querySelector('button').addEventListener('click', async () => {
    try {
      const html = await fetch(location.href, { cache: 'no-store' }).then(r => r.text());
      pre.textContent = sacar(html);
    } catch {
      pre.textContent = 'No se pudo leer el archivo. Abre el kit desde un servidor (GitHub Pages o `npx serve`) o mira el archivo en GitHub.';
    }
    dlg.showModal();
  });
  dlg.querySelector('[data-cerrar]').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  dlg.querySelector('[data-copiar]').addEventListener('click', async e => {
    try { await navigator.clipboard.writeText(pre.textContent); e.target.textContent = 'Copiado'; }
    catch { e.target.textContent = 'Selecciónalo a mano'; }
    setTimeout(() => { e.target.textContent = 'Copiar'; }, 1600);
  });
})();
