
import { Athlete, RankingEntry, Tournament, CategoryDefinition } from './types';

// MASTER DICTIONARY
export const CATEGORY_MAP: Record<string, CategoryDefinition> = {
  'K01': { code: 'K01', label: 'Kata Tradicional', type: 'form' },
  'K02': { code: 'K02', label: 'Kata Creativa', type: 'form' },
  'C107': { code: 'C107', label: 'Combate', type: 'combat' }, // Corrected Official Code
  'C06': { code: 'C06', label: 'Combate Open Weight', type: 'combat' },
  'W01': { code: 'W01', label: 'Kata con Armas', type: 'weapon' },
};

export const MOCK_ATHLETE: Athlete = {
  id: 101,
  firstName: "Alejandro",
  lastName: "Velasquez",
  beltRank: "Verde",
  ageLabel: "Adulto (+18)",
  academy: "Dojo Cobra Kai",
  team: "Team DKS", // Added team
  // Fotografía profesional de alta calidad (Martial Arts Portrait)
  photoUrl: "https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?q=80&w=800&auto=format&fit=crop",
  average: 0.75,
  performances: [
    {
      categoryCode: 'K01', // Kata Tradicional
      points: 570,
      rank: 3,
      ageGroup: '+18'
    },
    {
      categoryCode: 'C107', // Corrected to C107
      points: 1000,
      rank: 1,
      ageGroup: '+18'
    },
    {
      categoryCode: 'W01', // Kata con Armas
      points: 300,
      rank: 5,
      ageGroup: '+18'
    }
  ]
};

export const UPCOMING_TOURNAMENTS: Tournament[] = [
  {
    id: 1,
    name: "COPA COBRA DO",
    date: "2026-02-28",
    location: "Dtto Capital",
    status: "open",
    type: "4A",
    flyers: [
      "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=600&auto=format&fit=crop"
    ]
  },
  {
    id: 2,
    name: "BATALLA DE ARAGUA",
    date: "2026-03-21",
    location: "Aragua",
    status: "open",
    type: "3A",
    flyers: ["https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=600&auto=format&fit=crop"]
  },
  {
    id: 3,
    name: "BATALLA DE GUERREROS",
    date: "2026-05-02",
    location: "Aragua",
    status: "open",
    type: "5A"
  },
  {
    id: 4,
    name: "FURIA DE DRAGONES",
    date: "2026-05-30",
    location: "Dtto Capital",
    status: "open",
    type: "5A"
  },
  {
    id: 5,
    name: "KARIKAN",
    date: "2026-06-27",
    location: "Dtto Capital",
    status: "open",
    type: "3A"
  },
  {
    id: 6,
    name: "VARGA STAR",
    date: "2026-07-25",
    location: "Dtto Capital",
    status: "open",
    type: "4A"
  },
  {
    id: 7,
    name: "BATALLA DE VENEZUELA",
    date: "2026-08-29",
    location: "Dtto Capital",
    status: "open",
    type: "5A"
  },
  {
    id: 8,
    name: "DK",
    date: "2026-09-26",
    location: "Dtto Capital",
    status: "open",
    type: "3A"
  },
  {
    id: 9,
    name: "CCS OPEN MARTIAL ARTS",
    date: "2026-10-17",
    location: "Dtto Capital",
    status: "open",
    type: "4A"
  },
  {
    id: 10,
    name: "UTV",
    date: "2026-11-21",
    location: "Dtto Capital",
    status: "open",
    type: "5A"
  }
];

export const RANKING_DATA: RankingEntry[] = [
  { rank: 1, athleteId: 201, athleteName: "Alejandro Vargas", academy: "Dojo Central", points: 1550, trend: "stable", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop", categoryCode: 'C107', ageGroup: '+18' },
  { rank: 2, athleteId: 202, athleteName: "Daniel Pérez", academy: "Team Elite", points: 1450, trend: "up", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop", categoryCode: 'C107', ageGroup: '+18' },
  { rank: 3, athleteId: 102, athleteName: "Sofia Mendez", academy: "Academia Tigre", points: 1250, trend: "up", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop", categoryCode: 'C107', ageGroup: '+18' },
  { rank: 4, athleteId: 101, athleteName: "Alejandro Velasquez", academy: "Dojo Cobra Kai", points: 570, trend: "up", avatar: "https://images.unsplash.com/photo-1583476348300-2c20842a8819?q=80&w=150&auto=format&fit=crop", categoryCode: 'K01', ageGroup: '+18' },
  { rank: 5, athleteId: 105, athleteName: "Juan Perez", academy: "Dojo Cobra Kai", points: 900, trend: "up", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop", categoryCode: 'K01', ageGroup: '+18' },
];

export const AVERAGE_HISTORY = [
  { name: 'T1', value: 0.2 },
  { name: 'T2', value: 0.5 },
  { name: 'T3', value: 0.4 },
  { name: 'T4', value: 0.8 },
  { name: 'T5', value: 0.7 },
];
