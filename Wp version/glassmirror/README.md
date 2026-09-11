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

El sitemap está en `/wp-sitemap.xml` (incluye servicios y ciudades).

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

## Rehacer el zip

Desde la carpeta `Wp version/`:

```bash
tar -a -c -f glassmirror.zip --exclude=node_modules --exclude=package-lock.json glassmirror
```

## Notas

- El tema ya imprime title, description, canonical, Open Graph y JSON-LD. Un plugin SEO
  (Yoast, Rank Math) duplicaría esas etiquetas en las rutas del sitio.
- En nginx, si los `.txt` se sirven como estáticos, `/llms.txt` da 404: copiar `llms.txt`
  y `llms-full.txt` a la raíz web.
