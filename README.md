# Sitio web Aginet SA (nuevo)

Sitio estático, sin dependencias ni build. Tres archivos y una carpeta de assets:

- `index.html` — contenido y estructura.
- `styles.css` — diseño (paleta, tipografía, responsive).
- `main.js` — interacciones: red de nodos del hero, explorador de servicios, tilt de las apps, mapa de calor, formulario a WhatsApp.
- `assets/logo.png` — logo blanco con fondo transparente (header y footer).
- `assets/logo-original.png` — logo original con fondo violeta, por si hace falta.
- `assets/favicon.png` — ícono generado a partir del isotipo del logo.

## Ver en local

```bash
python -m http.server 8765 --directory sitio-web
```

Abrir http://localhost:8765

## Publicar

Subir el contenido de `sitio-web/` a la raíz del hosting (cPanel → `public_html`). No hace falta nada más.

## Cosas para ajustar antes de publicar

1. **Número de WhatsApp**: en `main.js` está `WA_NUMBER = "5491153539292"` y en `index.html` los links `wa.me/5491153539292`. Confirmar que sea el WhatsApp comercial (está armado a partir del (54 11) 5353-9292).
2. **Logo**: `assets/logo.png` es la versión blanca con fondo transparente generada a partir de `assets/logo-original.png` (que tiene fondo violeta). Si cambia el logo, reemplazar `logo.png` manteniendo fondo transparente.
3. **AgiPedidos**: no tenía documentación del producto, el texto es un borrador. Editar la tarjeta en `index.html` (buscar `<!-- AgiPedidos -->`).
4. **Textos de servicios**: están en `main.js`, objeto `SERVICES` (título, bajada, descripción y chips de cada uno).
5. **Email de contacto**: el formulario abre WhatsApp. Si preferís email real, cambiar el handler del formulario en `main.js` por un servicio tipo Formspree o un endpoint propio.
