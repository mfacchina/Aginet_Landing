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

Guía completa paso a paso (archivos, prueba, DNS, SSL, baja de Canva): **[DEPLOY.md](DEPLOY.md)**.

Resumen: subir el contenido de `sitio-web/` a `public_html` de cPanel, apuntar el registro A del dominio al servidor y correr AutoSSL. `.cpanel.yml` permite el deploy automático desde Git Version Control.

## Cómo hacer un cambio en la página

1. Editar el archivo que corresponda (ver tabla).
2. Si tocaste `styles.css` o `main.js`, cambiar el número de `?v=` en `index.html` (dos lugares: el `<link>` del CSS y el `<script>` del JS). Puede ser la fecha, por ejemplo `?v=20261115`. Sin esto, los navegadores siguen usando la versión vieja hasta 7 días.
3. Guardar en GitHub: `git add -A`, `git commit -m "qué cambió"`, `git push`.
4. Publicar: en cPanel → File Manager → `public_html` → Upload del archivo cambiado (sobreescribe), **o** si está configurado Git Version Control: Manage → Update from Remote → Deploy HEAD Commit.
5. Abrir https://aginet.com.ar en incógnito y verificar.

| Qué querés cambiar | Dónde |
|---|---|
| Textos de secciones, tarjetas de apps, datos de contacto | `index.html` |
| Título, bajada, descripción y chips de cada servicio | `main.js`, objeto `SERVICES` |
| Links a las landings de las apps | `main.js`, objeto `APP_LINKS` |
| Número de WhatsApp | `main.js` (`WA_NUMBER`) y los `wa.me/...` de `index.html` |
| Colores, tipografía, espaciados | `styles.css`, variables en `:root` |
| Logo o favicon | `assets/logo.png`, `assets/favicon.png` |

## Cosas para ajustar antes de publicar

1. **Número de WhatsApp**: en `main.js` está `WA_NUMBER = "5491153539292"` y en `index.html` los links `wa.me/5491153539292`. Confirmar que sea el WhatsApp comercial (está armado a partir del (54 11) 5353-9292).
2. **Logo**: `assets/logo.png` es la versión blanca con fondo transparente generada a partir de `assets/logo-original.png` (que tiene fondo violeta). Si cambia el logo, reemplazar `logo.png` manteniendo fondo transparente.
3. **AgiPedidos**: no tenía documentación del producto, el texto es un borrador. Editar la tarjeta en `index.html` (buscar `<!-- AgiPedidos -->`).
4. **Links a las páginas de cada app**: en `main.js`, objeto `APP_LINKS`. Pegar la URL de la landing de AquaControl, AgiPedidos y AgiVision cuando estén publicadas. Mientras el valor esté vacío, el botón "Conocer ..." de esa tarjeta no se muestra.
5. **Textos de servicios**: están en `main.js`, objeto `SERVICES` (título, bajada, descripción y chips de cada uno).
5. **Email de contacto**: el formulario abre WhatsApp. Si preferís email real, cambiar el handler del formulario en `main.js` por un servicio tipo Formspree o un endpoint propio.
