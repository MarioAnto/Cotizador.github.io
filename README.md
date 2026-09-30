# Cotizador PROTEKTA

Cotizador móvil (HTML + JavaScript) listo para GitHub Pages.

## Estructura
```
index.html
manifest.json
sw.js
.nojekyll
image/logo.png        <- REEMPLAZA por tu logo real (mismo nombre)
icons/                <- iconos de la app (puedes cambiarlos por los tuyos)
```

## Publicar
1. Crea un repositorio en GitHub (p. ej. `cotizador`).
2. Sube TODO el contenido de esta carpeta a la raíz del repositorio.
3. Settings > Pages > Source: "Deploy from a branch" > rama `main`, carpeta `/ (root)` > Save.
4. Abre `https://TU-USUARIO.github.io/cotizador/` en Safari (iPhone).
5. Compartir > "Añadir a pantalla de inicio".

## Actualizar
Después de subir cambios, sube el número de `VERSION` en `sw.js` (`protekta-v2`, etc.)
para que los teléfonos descarguen la versión nueva.

## Datos
El catálogo, el historial y el tema se guardan en el teléfono (localStorage).
Usa el botón "Respaldos" para descargar un JSON de vez en cuando.
