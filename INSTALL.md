# Guía de Instalación y Clonado

Este documento detalla el procedimiento estándar para levantar el entorno de desarrollo local de LINAMVE 2.0.

## Prerrequisitos
*   Node.js v18.0.0 o superior.
*   NPM o Yarn.
*   Git.

## Pasos de Instalación

1.  **Clonar el Repositorio**
    ```bash
    git clone https://github.com/linamve/platform-v2.git
    cd platform-v2
    ```

2.  **Instalar Dependencias**
    ```bash
    npm install
    # o si usas yarn
    yarn install
    ```

3.  **Configuración de Variables de Entorno**
    Crea un archivo `.env` en la raíz (basado en `.env.example`):
    ```env
    VITE_API_URL=http://localhost:3000/api
    # API Key solo requerida para funciones "Smart Coach"
    VITE_GEMINI_API_KEY=your_key_here 
    ```

4.  **Ejecutar Entorno de Desarrollo**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173`.

## Solución de Problemas Comunes
*   **Error de dependencias**: Ejecuta `rm -rf node_modules && npm install`.
*   **Tailwind no carga**: Verifica que `tailwind.config.js` incluya las rutas correctas en `content`.