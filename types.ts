
export enum UserRole {
  GUEST = 'guest',
  SPECTATOR = 'spectator',
  ATHLETE = 'athlete',
  INSTRUCTOR = 'instructor',
  ADMIN = 'admin'
}

// Definition for Category Metadata
export interface CategoryDefinition {
  code: string;
  label: string;
  type: 'combat' | 'form' | 'weapon';
}

// New interface to link an athlete to a specific category performance
export interface AthletePerformance {
  categoryCode: string; // Foreign Key to Category Dictionary
  points: number;       // Points specific to this category
  rank: number;         // Current rank in this category
  ageGroup: string;     // e.g., "+18", "14-17", "Adulto"
}

export interface Athlete {
  id: number;
  firstName: string;
  lastName: string;
  beltRank: string; 
  ageLabel: string; // Global age label (e.g. "Adulto +18")
  academy: string;
  team?: string; // New optional field for competition team
  performances: AthletePerformance[]; // Array of detailed performances
  photoUrl: string;
  average: number; // -1.0 to 1.0 (calculated efficiency across all categories)
}

export interface Tournament {
  id: number;
  name: string;
  date: string;
  location: string;
  status: 'open' | 'closed' | 'finished';
  type: '3A' | '4A' | '5A';
  flyers?: string[]; // Array of URLs for event flyers (Max 3)
  // Nuevos campos de contacto (Backend Sync)
  phone?: string;    // 'telefono' en DB
  email?: string;    // 'correo' en DB
  whatsapp?: string; // 'whatsapp' en DB
  website?: string;  // 'pagina_web' en DB
}

export interface RankingEntry {
  rank: number;
  athleteId: number;
  athleteName: string;
  academy: string;
  points: number;
  trend: 'up' | 'down' | 'stable';
  avatar: string;
  categoryCode: string;
  categoryLabel?: string; // Nombre de la categoría (ej. Combate)
  ageGroup: string; // Edad (ej. 16-17 años)
  belt?: string;    // Cinta (ej. Negro)
}

export interface ChartData {
  name: string;
  value: number;
}

// Nuevo tipo simplificado para Instagram (Fase 1)
export interface SocialPost {
  id: string;      // ID Temporal para React keys
  postUrl: string; // Único dato real
}

export interface SocialConfig {
  accountName: string; // Mantenido para UI local, aunque el backend no lo guarde
  posts: SocialPost[];
}
