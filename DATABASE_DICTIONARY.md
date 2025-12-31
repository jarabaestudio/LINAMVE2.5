# Diccionario de Datos | LINAMVE MySQL

Estructura relacional para el soporte del Ranking Nacional.

## Tablas Principales

### 1. `athletes`
Almacena la identidad digital del competidor.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | INT (PK) | Identificador único del atleta (LINAMVE ID). |
| `first_name` | VARCHAR(100) | Nombre. |
| `last_name` | VARCHAR(100) | Apellido. |
| `academy_id` | INT (FK) | Relación con tabla `academies`. |
| `belt_rank` | ENUM | 'White', 'Yellow', 'Green', 'Blue', 'Brown', 'Black'. |
| `points` | INT | Puntos acumulados en el ciclo anual actual. |
| `average_score` | FLOAT | Rendimiento calculado (-1.0 a 1.0) basado en win/loss ratio. |

### 2. `tournaments`
Eventos oficiales que otorgan puntaje.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | INT (PK) | ID del Torneo. |
| `name` | VARCHAR(255) | Nombre oficial (ej. "Copa Cobra 2026"). |
| `tier` | ENUM | '3A' (Regional), '4A' (Nacional), '5A' (Grand Prix). Define el multiplicador de puntos. |
| `status` | ENUM | 'open', 'ongoing', 'finished'. |

### 3. `matches`
Registro histórico de combates para cálculo de métricas.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | UUID (PK) | Identificador único del combate. |
| `tournament_id` | INT (FK) | Torneo donde ocurrió. |
| `athlete_a_id` | INT (FK) | Competidor Rojo. |
| `athlete_b_id` | INT (FK) | Competidor Azul. |
| `winner_id` | INT (FK) | Ganador. |
| `score_diff` | INT | Diferencia de puntos (usado para desempates en ranking). |

## Vistas (Views)

*   `view_ranking_live`: Agrega `points` agrupados por `athlete_id` y ordena descendente. Se actualiza vía Trigger tras cada insert en `matches`.

---
*Integridad Referencial*: Todas las FK tienen constraint `ON DELETE RESTRICT` para preservar el histórico deportivo.