// Personaje de prueba para las demos: dibuja en un canvas una tira de dibujos (sprite sheet)
// y la devuelve como imagen. En una web de verdad se sustituye por tu propio .webp,
// con los dibujos uno al lado del otro y todos del mismo tamaño.
//
// Dibujos de la tira (12 en total):
//   0-5  andar de lado (mirando a la derecha)
//   6-8  leer un cartel: de pie, mira arriba, mano en la barbilla
//   9    de espaldas, quieta
//   10-11 de espaldas, andando
window.figuraDemo = (color = '#1d1b17') => {
  const W = 120, H = 240, N = 12;
  const c = document.createElement('canvas');
  c.width = W * N; c.height = H;
  const g = c.getContext('2d');
  g.lineCap = 'round'; g.lineJoin = 'round';
  const piernas = (x, a) => {
    [a, -a].forEach((ang, i) => {
      g.strokeStyle = i ? color : color;
      g.beginPath(); g.moveTo(x, 140);
      const kx = x + Math.sin(ang) * 46, ky = 140 + Math.cos(ang) * 46;
      g.lineTo(kx, ky);
      g.lineTo(kx + Math.sin(ang * .5) * 46, ky + 46);
      g.stroke();
    });
  };
  const cuerpo = (x, espalda) => {
    g.fillStyle = color;
    g.beginPath(); g.arc(x, 44, 22, 0, 7); g.fill();          // cabeza
    g.beginPath(); g.moveTo(x - 20, 72); g.lineTo(x + 20, 72); g.lineTo(x + 28, 150); g.lineTo(x - 28, 150); g.closePath(); g.fill(); // abrigo
    if (!espalda) { g.fillStyle = '#c8572d'; g.fillRect(x + 6, 36, 14, 6); } // gafas, para saber hacia dónde mira
  };
  for (let i = 0; i < N; i++) {
    g.save(); g.translate(i * W, 0);
    const x = W / 2;
    g.lineWidth = 12; g.strokeStyle = color;
    if (i < 6) {
      const a = Math.sin(i / 6 * Math.PI * 2) * .45;
      piernas(x, a);
      cuerpo(x);
      g.beginPath(); g.moveTo(x, 80); g.lineTo(x - Math.sin(a) * 40, 130); g.stroke();
    } else if (i < 9) {
      piernas(x, .05);
      g.save();
      if (i > 6) { g.translate(x, 72); g.rotate(-.25); g.translate(-x, -72); }
      cuerpo(x);
      g.restore();
      g.beginPath(); g.moveTo(x, 80);
      if (i === 8) { g.lineTo(x + 26, 100); g.lineTo(x + 22, 58); } else g.lineTo(x + 4, 136);
      g.stroke();
    } else {
      const a = i === 9 ? 0 : (i === 10 ? .3 : -.3);
      g.beginPath(); g.moveTo(x - 10, 140); g.lineTo(x - 10 + a * 20, 228); g.moveTo(x + 10, 140); g.lineTo(x + 10 - a * 20, 228); g.stroke();
      cuerpo(x, true);
    }
    g.restore();
  }
  return { src: c.toDataURL(), frames: N, ratio: W / H };
};
