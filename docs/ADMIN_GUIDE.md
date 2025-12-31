# Guía de Administración y Backend | LINAMVE 2.6 (Hostinger Fix)

Si estás viendo el error `Failed to fetch`, sigue estos pasos exactos.

## 1. El Código PHP "Blindado"

Sustituye todo el contenido de `api-linamve/index.php` con este bloque. He añadido `ob_clean()` para eliminar cualquier basura que Hostinger pueda inyectar en la salida del servidor.

```php
<?php
/**
 * LINAMVE API - Versión 2.6 (Edición Hostinger Segura)
 */

// --- 1. CABECERAS DE SEGURIDAD (CORS) ---
// Estas cabeceras deben ir ANTES que cualquier otra cosa
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept");

// Si es una petición de pre-vuelo, terminamos aquí
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Forzamos salida JSON y evitamos caché
header('Content-Type: application/json; charset=utf-8');
header("Cache-Control: no-cache, must-revalidate");

// LIMPIEZA DE BÚFER: Evita que Hostinger inyecte código extra
if (ob_get_length()) ob_clean();

// --- 2. RUTEO ---
$action = $_GET['action'] ?? '';
$socialFile = 'social_feed.json';

switch ($action) {
    case 'status':
        echo json_encode(['status' => 'online', 'time' => time()]);
        break;

    case 'get_social':
        if (file_exists($socialFile)) {
            echo file_get_contents($socialFile);
        } else {
            // Valores iniciales por defecto
            echo json_encode([
                'accountName' => '@LINAMVEOFFICIAL',
                'posts' => [
                    'https://www.instagram.com/p/DGj8m9qTG_0/',
                    'https://www.instagram.com/p/DGlx6mAzJtW/',
                    'https://www.instagram.com/p/DGbN_lTz1e2/'
                ]
            ]);
        }
        break;

    case 'update_social':
        $jsonInput = file_get_contents('php://input');
        if ($jsonInput) {
            $decoded = json_decode($jsonInput, true);
            if ($decoded && isset($decoded['posts'])) {
                if (file_put_contents($socialFile, json_encode($decoded, JSON_PRETTY_PRINT), LOCK_EX)) {
                    echo json_encode(['success' => true, 'message' => 'Guardado con éxito']);
                } else {
                    echo json_encode(['success' => false, 'message' => 'Error: El servidor no tiene permisos para escribir el archivo.']);
                }
            } else {
                echo json_encode(['success' => false, 'message' => 'Datos inválidos']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Petición vacía']);
        }
        break;

    default:
        echo json_encode(['error' => 'Acción no válida']);
        break;
}

// Cerramos el búfer
exit();
```

## 2. Verificación de Permisos (CHMOD) en hPanel

Hostinger bloquea por defecto la escritura de archivos desde PHP si no configuras esto:

1.  Entra a tu **Administrador de Archivos**.
2.  Busca la carpeta `api-linamve`.
3.  Dale click derecho -> **Permisos**.
4.  Marca **"Aplicar recursivamente"** y pon **755** (o 777 si 755 falla).
5.  Si el archivo `social_feed.json` ya existe, asegúrate de que tenga permisos **664** o **666**.

## 3. Comprobar la URL

Asegúrate de que la URL en `services/api.ts` coincida exactamente con la ubicación en tu servidor.
Si subiste el archivo a `public_html/index.php`, la URL sería `https://tu-dominio.com/index.php`.

Si el error persiste, abre la URL de la API directamente en tu navegador. Si ves el JSON, la API funciona y el problema es la caché de tu navegador (limpia la caché y reintenta).