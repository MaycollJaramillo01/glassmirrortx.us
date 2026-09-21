# Tema WordPress — Martinez Orlyn Glass & Mirror

Port del sitio Next.js (raíz del repo) a un tema clásico de WordPress: mismo diseño,
mismo texto y mismas URLs. Al activarlo, todo el sitio funciona sin crear páginas.

## Instalar

1. WordPress → Apariencia → Temas → Añadir nuevo → Subir tema → `Wp version/glassmirror.zip` → Activar.
2. Ajustes → Enlaces permanentes: cualquier opción menos "Simple".
3. Apariencia → Personalizar → **Glass & Mirror settings**: email que recibe las citas
   (vacío = martinezorlyn@yahoo.com), Google Tag Manager, GA4 y verificación de Search Console.
4. Instalar un plugin SMTP (WP Mail SMTP, FluentSMTP…): el formulario envía con `wp_mail()`
   y muchos hostings no entregan correo sin SMTP.

## Rutas

`/`, `/about`, `/services`, `/services/{slug}`, `/service-areas`, `/service-areas/{slug}`,
`/gallery`, `/contact`, `/privacy-policy`, `/llms.txt`, `/llms-full.txt`. Las define
`inc/routes.php` y tienen prioridad sobre páginas de WordPress con el mismo slug.
Las páginas y entradas creadas en wp-admin siguen funcionando con el estilo del sitio.

El sitemap del tema está en `/glassmirror-sitemap.xml` y se anuncia en `robots.txt`.
Rank Math sustituye el del núcleo (`/wp-sitemap.xml` redirige a `/sitemap_index.xml`)
y no ve estas rutas, así que el tema publica el suyo con las 26 URLs definitivas.

Las URLs del sitio anterior (`/houston-tx/`, `/custom-showers/`,
`/about-martinez-orlyn-glass-mirror/`…) devuelven un 301 a la página que las
reemplaza. `Wp version/check-redirects.php` comprueba el mapa:

```bash
php "Wp version/check-redirects.php"
```

## Contenido

`inc/content.json` se genera desde `data/*.ts` con `Wp version/export-content.ts`:

```bash
npm run content
```

También se puede editar el JSON directamente.

## Estilos

Las plantillas usan las mismas clases Tailwind que el sitio Next.js. Tras cambiar un `.php`
o `assets/js/theme.js`:

```bash
npm install
npm run build
```

## Pendientes en wp-admin

El código ya redirige y etiqueta lo que puede. Estos pasos son del panel:

1. **Papelera a las páginas del sitio viejo**: las diez `/{ciudad}-tx/`,
   `/custom-showers/`, `/custom-shower-enclosures/`, `/glass-mirror/`,
   `/glass-mirror-services/`, `/residential-glass-mirror/`,
   `/about-martinez-orlyn-glass-mirror/` y las viejas `/contact/`, `/gallery/`
   y `/service-areas/` que las rutas ya tapan. Los 301 siguen funcionando con
   las páginas en la papelera, y así Rank Math deja de listarlas en
   `/sitemap_index.xml`.
2. **Borrar la categoría "Sin categoría"** (Entradas → Categorías). Mientras
   exista, el tema la marca `noindex`.
3. **Search Console**: enviar `https://glassmirrortx.us/glassmirror-sitemap.xml`
   y revisar Páginas → Duplicados y Redirecciones después del despliegue.
4. **Perfil de Negocio**: confirmar que teléfono, dirección, horario, licencia
   T189489 y las reseñas del schema (4.9 / 158) coinciden con Google.

## Rehacer el zip

Desde la carpeta `Wp version/`:

```bash
tar -a -c -f glassmirror.zip --exclude=node_modules --exclude=package-lock.json glassmirror
```

## Notas

- Elementor: el tema usa siempre su propia portada, cabecera y pie, aunque la página de
  inicio esté hecha con Elementor o haya cabecera/pie en el Creador de temas.
- Rank Math: en las páginas del tema, sus etiquetas se quitan y quedan las del tema
  (title, description, canonical, Open Graph y JSON-LD). Rank Math desengancha el
  `<title>` del núcleo para poner el suyo, así que el tema vuelve a engancharlo:
  sin eso las páginas salían sin `<title>`.
- Los plugins de las páginas antiguas (Elementor, ElementsKit, EAE, Newfold) ya no
  cargan su CSS/JS en las rutas del tema; en las páginas antiguas siguen igual.
- Tras reemplazar el tema, borrar la caché de Bluehost.
- En nginx, si los `.txt` se sirven como estáticos, `/llms.txt` da 404: copiar `llms.txt`
  y `llms-full.txt` a la raíz web.
