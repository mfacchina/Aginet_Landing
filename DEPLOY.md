# Cómo publicar el sitio en cPanel y dar de baja Canva

Situación de partida (verificada el 7/10/2026):

| Qué | Dónde está |
|---|---|
| Servidor cPanel (cpanel, webmail, correo) | 205.234.134.73 |
| Nameservers del dominio | ns1 a ns4 .aginet.com.ar (la zona DNS la manejás vos) |
| Registro A de aginet.com.ar y www hoy | 103.169.142.0 (Canva, vía Cloudflare) |
| Correo (MX) | mail.aginet.com.ar → 205.234.134.73. **No se toca.** |

El plan es: subir los archivos, probar sin tocar DNS, cambiar el DNS, emitir SSL y recién después dar de baja Canva.

---

## Paso 1 — Subir los archivos a cPanel

Elegí una de las dos opciones.

### Opción A: zip por File Manager (más rápida)

1. Entrá a cPanel (https://cpanel.aginet.com.ar:2083) → **File Manager** → carpeta `public_html`.
2. Si hay archivos viejos ahí (un `index.html`, `index.php`, carpetas de un sitio anterior), movelos a una carpeta `public_html_viejo` fuera de `public_html` por si acaso. Dejá `cgi-bin` y `.well-known` si existen.
3. Botón **Upload** → subí `aginet-sitio-web.zip` (está en la carpeta Aginet, al lado de `sitio-web`).
4. Volvé a File Manager, click derecho sobre el zip → **Extract** → extraer en `public_html`.
5. Borrá el zip. Tiene que quedar así:

```
public_html/
  .htaccess
  index.html
  styles.css
  main.js
  assets/
    logo.png
    logo-original.png
    favicon.png
```

Si `.htaccess` no aparece, en File Manager → **Settings** (arriba a la derecha) → tildá "Show Hidden Files".

### Opción B: Git (para que se actualice solo cuando pusheás)

1. cPanel → **Git Version Control** → **Create**.
2. Clone URL: `https://github.com/mfacchina/Aginet_Landing.git`
3. Repository Path: `/home/TU_USUARIO/repos/aginet-landing` (cualquier carpeta fuera de `public_html`).
4. Create. Después → **Manage** → pestaña **Pull or Deploy** → **Deploy HEAD Commit**.
5. Para que el deploy copie a `public_html`, el repo tiene un archivo `.cpanel.yml` que ya hace eso. Cada vez que subas cambios a GitHub: Git Version Control → Manage → Update from Remote → Deploy HEAD Commit.

---

## Paso 2 — Probar antes de cambiar el DNS

Así ves el sitio en tu servidor mientras el público sigue viendo Canva.

1. Abrí el Bloc de notas **como administrador**.
2. Archivo → Abrir → `C:\Windows\System32\drivers\etc\hosts` (elegí "Todos los archivos").
3. Agregá al final esta línea y guardá:

```
205.234.134.73 aginet.com.ar www.aginet.com.ar
```

4. Abrí https://aginet.com.ar en una ventana de incógnito. Vas a ver el sitio nuevo. El navegador va a avisar que el certificado no coincide: es normal en esta etapa, aceptá y seguí.
5. Revisá que cargue todo (logo, animaciones, botón de WhatsApp, formulario).
6. **Borrá la línea del archivo hosts** cuando termines, si no tu PC va a seguir forzando esa IP.

---

## Paso 3 — Cambiar el DNS

1. Entrá a **WHM** → **DNS Functions** → **DNS Zone Manager** → zona `aginet.com.ar` → **Manage**.
   (Si no tenés WHM y la zona vive en tu cuenta cPanel, es cPanel → **Zone Editor** → Manage.)
2. Buscá estos registros y cambialos:

| Nombre | Tipo | Valor actual | Valor nuevo |
|---|---|---|---|
| `aginet.com.ar.` | A | 103.169.142.0 | **205.234.134.73** |
| `www.aginet.com.ar.` | A (o CNAME hacia Canva) | 103.169.142.0 | **A → 205.234.134.73** |

   Si `www` es un CNAME apuntando a algo de Canva, borralo y creá un registro A con la IP.
3. Si hay registros TXT o CNAME que Canva te pidió crear para verificar el dominio (suelen empezar con `_canva` o similar), podés borrarlos.
4. **No toques**: `mail`, `cpanel`, `webmail`, `ns1`-`ns4`, el MX, SPF/DKIM.
5. Guardá. Como los nameservers son tuyos, el cambio se ve en minutos (depende del TTL del registro; si era 14400, hasta 4 horas para algunos usuarios).

Para verificar desde tu PC (después de borrar la línea del archivo hosts):

```bash
nslookup aginet.com.ar
```

Tiene que responder 205.234.134.73.

---

## Paso 4 — Certificado SSL

1. cPanel → **SSL/TLS Status**.
2. Tildá `aginet.com.ar` y `www.aginet.com.ar` → **Run AutoSSL**. Tarda unos minutos. Solo funciona cuando el DNS ya apunta a tu servidor (Paso 3).
3. Cuando aparezca el candado verde, forzá HTTPS. Dos formas, usá una sola:
   - cPanel → **Domains** → activá el switch **Force HTTPS Redirect** del dominio, **o**
   - en `public_html/.htaccess` descomentá las 5 líneas del bloque "Forzar HTTPS" (sacá el `# ` del principio).

---

## Paso 5 — Dar de baja Canva

Recién cuando https://aginet.com.ar ya muestre el sitio nuevo con candado:

1. Entrá a Canva → el diseño del sitio → **Publicar sitio web** → configuración → **Anular publicación** (Unpublish). Hacelo con el sitio principal y con el de `/ia/`.
2. En Canva, si el dominio aginet.com.ar figura como dominio conectado, desconectalo.
3. Si tenés el plan Pro solo por el sitio, ahí podés cancelarlo.

La URL vieja `aginet.com.ar/ia/` ya redirige a la sección de apps del sitio nuevo (está en el `.htaccess`), así nadie cae en un error 404.

---

## Paso 6 — Verificación final

- [ ] https://aginet.com.ar carga con candado.
- [ ] https://www.aginet.com.ar redirige a la versión sin www.
- [ ] http://aginet.com.ar redirige a https.
- [ ] Probar desde el celular con datos móviles (no wifi) para ver el DNS público.
- [ ] Botón de WhatsApp y formulario abren el chat correcto.
- [ ] El correo sigue funcionando (mandate un mail de prueba).
- [ ] Si usás Google Search Console, pedí la reindexación de la URL principal.

---

## Para actualizar el sitio más adelante

- Editás los archivos en `sitio-web`, hacés commit y push a GitHub.
- Opción A (zip): volvés a subir el zip y extraés sobre `public_html`.
- Opción B (Git): cPanel → Git Version Control → Manage → Update from Remote → Deploy HEAD Commit.
