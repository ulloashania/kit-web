# Kit web

Animaciones, piezas y plantillas sacadas de mis webs (Portfolio y Lignum Domus) para reutilizarlas en otras.
Cada pieza es una página que funciona sola, con imágenes de prueba en lugar de las de los proyectos.

## Cómo usar una pieza

1. Abre la pieza en el catálogo y pulsa **Ver código**.
2. Copia lo que sale: son los bloques marcados con `<!-- PIEZA -->` en el archivo (estilos, HTML y script).
3. Pégalo en la web nueva y cambia los colores de prueba por imágenes de verdad.

Para verlo en local hace falta un servidor (el botón «Ver código» no funciona con doble clic en el archivo):

```bash
npx serve .
```

## Qué hay

| Carpeta | Contenido |
|---|---|
| `piezas/scroll/` | Personaje que camina, cámara que sigue, zoom por una puerta, palanca y engranajes, capas parallax, cinta métrica, mueble que se monta, logo que viaja, miniaturas que se fusionan |
| `piezas/entradas/` | Collage de fotos que se abre, tela que ondea |
| `piezas/interaccion/` | Mesa con objetos, esfera de tarjetas, discos, rueda de títulos, persiana y tambor, cajones, manómetros, carrusel curvo, vista que sigue al ratón |
| `piezas/ambiente/` | Humo, niebla, neón, farol, charcos y polvo |
| `piezas/texto/` | Letra a letra, borde pintado, frase con scroll, aparecer al entrar, contadores, cinta de texto |
| `plantillas/astro-base/` | Base de Astro (de Lignum Domus, sin contenido del cliente) |
| `plantillas/web-sin-librerias/` | Base de HTML, CSS y JS a mano (de Portfolio) |
| `comun/` | Estilos y script de las páginas de demo, y el personaje de prueba |

## Tecnologías que uso

### Base
- **HTML, CSS y JavaScript a mano, sin librerías** (Portfolio y todas las piezas del kit).
- **Astro** para webs con varias páginas y componentes que generan una web estática (Lignum Domus).

### Animación
- **Scroll con sección fija**: una sección alta con el contenido en `position: sticky`; el avance de 0 a 1 se calcula con `getBoundingClientRect()` y mueve todo.
- **`requestAnimationFrame`** con suavizado (`suave += (objetivo - suave) * 0.1`), o suavizado por tiempo para que vaya igual en equipos lentos.
- **Web Animations API** (`element.animate()`) para entradas encadenadas con `await`.
- **Canvas 2D** para humo, niebla, ondas y la tela; dibujado a media resolución para que vaya rápido.
- **Sprite sheets**: el personaje es una tira de dibujos y se cambia con `background-position`.
- **3D con CSS**: `perspective`, `preserve-3d`, `rotateX/Y` (esfera, tambor, carrusel, discos).
- **Filtros SVG** (`feTurbulence` + `feDisplacementMap`) para el borde pintado de los titulares.
- **`IntersectionObserver`** para aparecer al entrar, contadores y para no animar lo que no se ve.

### CSS moderno
- Medidas de pantalla `svh` y de contenedor `cqh` / `container-type`.
- `clamp()` para tamaños que se adaptan, `color-mix()`, `clip-path`, máscaras.
- Variables CSS como «mandos» que el JS cambia (`--pull`, `--abre`, `--tiro`).

### Accesibilidad y rendimiento
- `prefers-reduced-motion`: sin movimiento para quien lo tenga activado.
- Textos partidos en letras con `aria-label` para que se lean enteros.
- `(hover: hover)` para separar ratón y pantalla táctil.
- Evitar `filter: blur`, `mix-blend-mode` y `backdrop-filter` en capas grandes que se mueven.
- No pasar de unas 3–5 veces de zoom en imágenes grandes.

### Letras
- Portfolio: Big Shoulders (títulos) y Newsreader (texto).
- Lignum Domus: Fraunces (títulos) e Instrument Sans (texto).

### Imágenes y herramientas
- Imágenes en **WebP**; ilustraciones creadas con IA y retocadas a mano.
- **Git y GitHub** (GitHub Desktop) para el código.
- Publicación: **Cloudflare Pages** (Portfolio) y **Hostinger** conectado a GitHub (Lignum Domus).
- Medición: **Google PageSpeed** y Site Kit.
