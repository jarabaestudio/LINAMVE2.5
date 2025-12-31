# Protocolo de Despliegue: Hostinger

Guía para desplegar la versión de producción (Build) en entornos de hosting compartido o VPS Hostinger.

## 1. Generación del Build
Antes de subir, compila el código para producción. Esto optimiza los assets y minifica el JS/CSS.

```bash
npm run build
```
*Output esperado*: Carpeta `/dist` generada en la raíz.

## 2. Configuración en hPanel (File Manager)

1.  Accede a tu cuenta de Hostinger -> Administrar Hosting.
2.  Ve a **Archivos** -> **Administrador de Archivos**.
3.  Navega a la carpeta `public_html`.
4.  Si existe contenido previo, haz un backup y luego limpia el directorio.
5.  **Subida**: Arrastra todo el contenido **dentro** de la carpeta local `/dist` (index.html, assets/, vite.svg, etc.) hacia `public_html`.
    *   *Nota*: No subas la carpeta `dist` completa, sino su contenido.

## 3. Configuración de Rutas (SPA)
Como usamos React Router en modo SPA (Single Page Application), debemos asegurar que todas las rutas redirijan a `index.html` si no estamos usando HashRouter.

Crea un archivo `.htaccess` en `public_html`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## 4. Verificación Post-Deploy
*   Verificar carga de fuentes (Google Fonts).
*   Verificar que la versión móvil no tenga elementos superpuestos en la cabecera (Header Limpio).
*   Probar navegación profunda (Deep Linking).