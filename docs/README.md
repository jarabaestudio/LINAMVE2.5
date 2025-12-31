# LINAMVE 2.0 | Technical Folder

> **Fuente Única de Verdad** para el desarrollo y mantenimiento de la plataforma oficial de la Liga Nacional de Artes Marciales de Venezuela.

## 1. Visión General
Esta plataforma gestiona el ciclo de vida del atleta de alto rendimiento, desde el registro de academias hasta el cálculo algorítmico del ranking nacional. La arquitectura está diseñada para ser escalable, modular y visualmente impactante ("Dark Sport Tech").

## 2. Stack Tecnológico
*   **Core**: React 18+ (Vite)
*   **Styling**: Tailwind CSS (Custom Config: `linamve-base`, `linamve-accent`)
*   **Routing**: React Router (HashRouter para compatibilidad estática)
*   **Charts**: Recharts (Visualización de métricas de rendimiento)
*   **Icons**: Lucide React + Custom SVG Components

## 3. Arquitectura de Directorios
```
/
├── components/      # Átomos y Moléculas UI (Atomic Design)
├── docs/            # Documentación Técnica, Manuales y Guías de Despliegue
├── pages/           # Vistas principales (Lazy loaded en producción)
├── services/        # Capa de abstracción para APIs (Gemini, MySQL Backend)
├── types/           # Definiciones TypeScript (Domain Driven Design)
└── constants.ts     # Mock Data y Configuraciones Globales
```

## 4. Documentación Disponible (Ver carpeta `/docs`)
*   **[Manual de Usuario](docs/USER_MANUAL.md)**: Guía para Atletas e Instructores.
*   **[Diccionario de Datos](docs/DATABASE_DICTIONARY.md)**: Estructura MySQL.
*   **[Guía de Instalación](docs/INSTALL.md)**: Setup local.
*   **[Despliegue Hostinger](docs/DEPLOY_HOSTINGER.md)**: Paso a paso para producción.

## 5. Principios de Diseño
1.  **Mobile First**: La navegación inferior en móviles es prioritaria.
2.  **Clean UI**: Cabeceras limpias sin logotipos intrusivos en móviles.
3.  **Aesthetics**: Tipografía `Teko` para títulos (Display) y `Poppins` para lectura.

---
*Documento aprobado por la Dirección Técnica - 2026*