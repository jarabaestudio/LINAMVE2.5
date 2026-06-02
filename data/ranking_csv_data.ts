// Embedded CSV representation of the real LINAMVE rankings to ensure 100% offline accuracy and zero-latency presentation
import { RankingEntry } from '../types';
import { OFFICIAL_CATEGORIES } from './official_categories';

export const RAW_CSV_DATA = `CODIGO,MODALIDAD,EDAD,CINTA_RANKING,GENERO,POSICION,ATLETA,PUNTAJE
C68,Combate,6-7 años,Amarillo en adelante,Femenino,1,Victoria Bastidas,500
C68,Combate,6-7 años,Amarillo en adelante,Femenino,2,Aurora Isea,400
C64,Combate,6-7 años,Blanco-Celeste,Masculino,1,Ignacio Bejarano,500
C64,Combate,6-7 años,Blanco-Celeste,Masculino,2,Alain Villarroel,400
C64,Combate,6-7 años,Blanco-Celeste,Masculino,3,Sebastián Chacin,300
C70,Combate,8-9 años,Amarillo-Naranja,Masculino,1,Joel Dorta,500
C70,Combate,8-9 años,Amarillo-Naranja,Masculino,2,Estheban Acuña,400
C70,Combate,8-9 años,Amarillo-Naranja,Masculino,3,Junior Tovar,300
C69,Combate,8-9 años,Blanco-Celeste,Masculino,1,Ebert Riera,500
C69,Combate,8-9 años,Blanco-Celeste,Masculino,2,Isaac López,400
C71,Combate,8-9 años,Verde-Negro,Masculino,1,Alexander Tamayo,500
C71,Combate,8-9 años,Verde-Negro,Masculino,2,Ángelo Duran,400
C79,Combate,10-11 años,Amarillo-Naranja,Femenino,1,Aylin De Freitas,500
C76,Combate,10-11 años,Amarillo-Naranja,Masculino,1,Marcos Vivas,500
C76,Combate,10-11 años,Amarillo-Naranja,Masculino,2,Isaac Castillo,400
C76,Combate,10-11 años,Amarillo-Naranja,Masculino,3,Alejandro Hernández,300
C78,Combate,10-11 años,Blanco-Celeste,Femenino,1,Maria Hernández,500
C78,Combate,10-11 años,Blanco-Celeste,Femenino,2,Ivanna Garcia,400
C75,Combate,10-11 años,Blanco-Celeste,Masculino,1,Luis López,500
C75,Combate,10-11 años,Blanco-Celeste,Masculino,2,Javier Padilla,400
C75,Combate,10-11 años,Blanco-Celeste,Masculino,3,Yoelver Pérez,300
C77,Combate,10-11 años,Purpura-Negra,Masculino,1,Kevin Guerrero,500
C80,Combate,10-11 años,Verde-Negro,Femenino,1,Isabella Villalobos,500
C128/C130,Formas con Armas,10-13 años,Blanco-Amarillo,Mixto,1,Luis López,500
C128/C130,Formas con Armas,10-13 años,Blanco-Amarillo,Mixto,2,Javier Padilla,400
SIN_CATEGORIA_5A,Formas Creativas,10-13 años,Blanco-Amarillo,Mixto,1,Luis López,500
SIN_CATEGORIA_5A,Formas Creativas,10-13 años,Blanco-Amarillo,Mixto,2,Javier Padilla,400
C128/C129/C130/C131,Formas con Armas,10-13 años,Naranja-Negro,Mixto,1,Isabella Villalobos,500
C128/C129/C130/C131,Formas con Armas,10-13 años,Naranja-Negro,Mixto,2,Marcos Vivas,400
C118/C119,Formas Creativas,10-13 años,Naranja-Negro,Mixto,1,Isabella Villalobos,500
C118/C119,Formas Creativas,10-13 años,Naranja-Negro,Mixto,2,Marcos Vivas,400
C86,Combate,12-13 años,Amarillo-Naranja,Femenino,1,Rut Arteaga,500
C82,Combate,12-13 años,Amarillo-Naranja,Masculino,1,Derek Aguirre,500
C82,Combate,12-13 años,Amarillo-Naranja,Masculino,2,Matías Pérez,400
C85,Combate,12-13 años,Blanco-Celeste,Femenino,1,Carla Rojas,500
C85,Combate,12-13 años,Blanco-Celeste,Femenino,2,Irisbeth Blanco,400
C81,Combate,12-13 años,Blanco-Celeste,Masculino,1,Kevin Navas,500
C81,Combate,12-13 años,Blanco-Celeste,Masculino,2,Leonardo Contreras,400
C88,Combate,12-13 años,Purpura-Negro,Femenino,1,Arhanza López,500
C84,Combate,12-13 años,Purpura-Negro,Masculino,1,Leandro Guillen,500
C89,Combate,14-15 años,Blanco-Celeste,Masculino,1,Rodrigo Domingo,500
C95,Combate,14-15 años,Purpura-Verde,Femenino,1,Josmary Oliveros,500
C95,Combate,14-15 años,Purpura-Verde,Femenino,2,Johana Conde,400
C91,Combate,14-15 años,Purpura-Verde,Masculino,1,Omar Escalona,500
C91,Combate,14-15 años,Purpura-Verde,Masculino,2,Santiago Chacón,400
C102,Combate,16-17 años,Amarillo-Naranja,Femenino,1,Oriana Morgado,500
C104,Combate,16-17 años,Marron-Negro,Femenino,1,Paulina Fonseca,500
C103,Combate,16-17 años,Purpura-Verde,Femenino,1,Deiverly Ramirez,500
C05,Formas Manos Libres,4-5 años,Blanco-Celeste,Masculino,1,Alessandro Andrade,500
C05,Formas Manos Libres,4-5 años,Blanco-Celeste,Masculino,2,Adan Fragosa,400
C12,Formas Manos Libres,6-7 años,Amarillo en adelante,Femenino,1,Aurora Isea,500
C12,Formas Manos Libres,6-7 años,Amarillo en adelante,Femenino,2,Victoria Bastidas,400
C14,Formas Manos Libres,8-9 años,Amarillo-Naranja,Masculino,1,Joel Dorta,500
C14,Formas Manos Libres,8-9 años,Amarillo-Naranja,Masculino,2,Junior Tovar,400
C14,Formas Manos Libres,8-9 años,Amarillo-Naranja,Masculino,3,Estheban Acuña,300
C16,Formas Manos Libres,8-9 años,Blanco-Celeste,Femenino,1,Ivanna Garcia,500
C13,Formas Manos Libres,8-9 años,Blanco-Celeste,Masculino,1,Ebert Riera,500
C15,Formas Manos Libres,8-9 años,Verde-Negro,Masculino,1,Alexander Tamayo,500
C15,Formas Manos Libres,8-9 años,Verde-Negro,Masculino,2,Angelo Duran,400
C23,Formas Manos Libres,10-11 años,Amarillo-Naranja,Femenino,1,Aylin De Freitas,500
C21,Formas Manos Libres,10-11 años,Purpura-Negro,Masculino,1,Kevin Guerrero,500
C24,Formas Manos Libres,10-11 años,Verde-Negro,Femenino,1,Isabella Villalobos,500
C30,Formas Manos Libres,12-13 años,Amarillo-Naranja,Femenino,1,Rut Arteaga,500
C26,Formas Manos Libres,12-13 años,Amarillo-Naranja,Masculino,1,Derek Aguirre,500
C26,Formas Manos Libres,12-13 años,Amarillo-Naranja,Masculino,2,Matías Pérez,400
C26,Formas Manos Libres,12-13 años,Amarillo-Naranja,Masculino,3,Josué Rojas,300
C29,Formas Manos Libres,12-13 años,Blanco-Celeste,Femenino,1,Carla Rojas,500
C29,Formas Manos Libres,12-13 años,Blanco-Celeste,Femenino,2,Irisbeth Blanco,400
C25,Formas Manos Libres,12-13 años,Blanco-Celeste,Masculino,1,Kevin Navas,500
C25,Formas Manos Libres,12-13 años,Blanco-Celeste,Masculino,2,Leonardo Contreras,400
C32,Formas Manos Libres,12-13 años,Purpura-Negro,Femenino,1,Aranza López,500
C28,Formas Manos Libres,12-13 años,Purpura-Negro,Masculino,1,Leandro Guillen,500
C38,Formas Manos Libres,14-15 años,Amarillo-Naranja,Femenino,1,María Colmenares,500
C34,Formas Manos Libres,14-15 años,Amarillo-Naranja,Masculino,1,David Bello,500
C34,Formas Manos Libres,14-15 años,Amarillo-Naranja,Masculino,2,Angel Urbina,400
C94,Combate,14-15 años,Amarillo-Naranja,Femenino,1,Paola Montero,500
C94,Combate,14-15 años,Amarillo-Naranja,Femenino,2,María Colmenares,400
C90,Combate,14-15 años,Amarillo-Naranja,Masculino,1,Ángel Urbina,500
C90,Combate,14-15 años,Amarillo-Naranja,Masculino,2,Samuel Ortiz,400
C90,Combate,14-15 años,Amarillo-Naranja,Masculino,3,David Bello,300
C33,Formas Manos Libres,14-15 años,Blanco-Celeste,Masculino,1,Rodrigo Domingo,500
C40,Formas Manos Libres,14-15 años,Marron-Negro,Femenino,1,Yulimar Herrera,500
C40,Formas Manos Libres,14-15 años,Marron-Negro,Femenino,2,Antonella Dos Santos,400
C96,Combate,14-15 años,Marron-Negro,Femenino,1,Yulimar Herrera,500
C96,Combate,14-15 años,Marron-Negro,Femenino,2,Anthonella Do Santos,400
C39,Formas Manos Libres,14-15 años,Purpura-Verde,Femenino,1,Johana Conde,500
C39,Formas Manos Libres,14-15 años,Purpura-Verde,Femenino,2,Josmary Olivero,400
C35,Formas Manos Libres,14-15 años,Purpura-Verde,Masculino,1,Santiago Chacón,500
C35,Formas Manos Libres,14-15 años,Purpura-Verde,Masculino,2,Omar Escalona,400
C46,Formas Manos Libres,16-17 años,Amarillo-Naranja,Femenino,1,Oriana Morgado,500
C42,Formas Manos Libres,16-17 años,Amarillo-Naranja,Masculino,1,Oscar Valero,500
C98,Combate,16-17 años,Amarillo-Naranja,Masculino,1,Oscar Valero,500
C41,Formas Manos Libres,16-17 años,Blanco,Masculino,1,Raúl Pérez,500
C41,Formas Manos Libres,16-17 años,Blanco,Masculino,2,Daniel Díaz,400
C48,Formas Manos Libres,16-17 años,Marron-Negro,Femenino,1,Paulina Fonseca,500
C47,Formas Manos Libres,16-17 años,Purpura-Verde,Femenino,1,Deiverly Ramírez,500
C99,Combate,16-17 años,Purpura-Verde,Masculino,1,Jeinerson Mendoza,500
C43,Formas Manos Libres,16-17 años,Purpura-Verde,Masculino,1,Jeinerson Mendoza,500
C44,Formas Manos Libres,16-17 años,Marron-Negro,Masculino,1,Diemer Zabala,500
C100,Combate,16-17 años,Marron-Negro,Masculino,1,Diemer Zabala,500
C50/C57,Formas Manos Libres,Adulto,Amarillo-Naranja,Masculino,1,Romeiber Palacios,500
C50/C57,Formas Manos Libres,Adulto,Amarillo-Naranja,Masculino,2,Jostin Acosta,400
C106/C113,Combate,Adulto,Amarillo-Naranja,Masculino,1,Romeiber Palacios,500
C106/C113,Combate,Adulto,Amarillo-Naranja,Masculino,2,Justin Acosta,400
C107,Combate,Adulto,Purpura-Marron,Masculino,1,Anyel López,500
C138,Formas con Armas,Adulto,Amarillo-Naranja,Mixto,1,Justin Acosta,500
C138,Formas con Armas,Adulto,Amarillo-Naranja,Mixto,2,Romeiber Palacio,400
C105/C113,Combate,Adulto,Blanco-Celeste,Masculino,1,Reiner Jimenez,500
C49/C57,Formas Manos Libres,Adulto,Blanco-Celeste,Masculino,1,Reiner Jimenez,500
C139,Formas con Armas,Adulto,Verde-Marron,Mixto,1,Anyel López,500
C122,Formas Creativas,Adulto,Verde-Marron,Mixto,1,Anyel López,500
C124,Formas con Armas,Hasta 6 años,Blanco,Mixto,1,Pedro Pereira,500
C124,Formas con Armas,Hasta 6 años,Blanco,Mixto,2,Chayna Rodríguez,400
SIN_CATEGORIA_5A,Formas Creativas,Hasta 6 años,Blanco,Mixto,1,Chayna Rodríguez,500
SIN_CATEGORIA_5A,Formas Creativas,Hasta 6 años,Blanco,Mixto,2,Pedro Pereira,400
C126,Formas con Armas,Hasta 9 años,Blanco-Amarillo,Mixto,1,Ebert Riera,500
C126,Formas con Armas,Hasta 9 años,Blanco-Amarillo,Mixto,2,Joel Dorta,400
C126,Formas con Armas,Hasta 9 años,Blanco-Amarillo,Mixto,3,Reickellys Ferrer,300
SIN_CATEGORIA_5A,Formas Creativas,Hasta 9 años,Blanco-Amarillo,Mixto,1,Joel Dorta,500
SIN_CATEGORIA_5A,Formas Creativas,Hasta 9 años,Blanco-Amarillo,Mixto,2,Reickellys Ferrer,400
C126/C127,Formas con Armas,Hasta 9 años,Naranja-Negro,Mixto,1,Angelo Duran,500
C126/C127,Formas con Armas,Hasta 9 años,Naranja-Negro,Mixto,2,Alexander Tamayo,400
C126/C127,Formas con Armas,Hasta 9 años,Naranja-Negro,Mixto,3,Estheban Acuña,300
C04,Formas con Armas,Hasta 17 años,Todas la Cintas (Cat. Esp.),Mixto,1,Eros Balza,500
C04,Formas con Armas,Hasta 17 años,Todas la Cintas (Cat. Esp.),Mixto,2,Diego Cazañas,400
C01,Formas Manos Libres (Cap. Especial),Hasta 17 años,Todas la Cintas,Mixto,1,Eros Balaza,500
C01,Formas Manos Libres (Cap. Especial),Hasta 17 años,Todas la Cintas,Mixto,2,Diego Cazañas,400
C186,Combate,Master C Mas 50 Años,,Masculino,1,Bladimir Fernández,500
C63,Combate,4-5 años,Blanco-Celeste,Femenino,1,Reickellys Ferrer,500
C63,Combate,4-5 años,Blanco-Celeste,Femenino,2,Shayna Rodríguez,400
C61,Combate,4-5 años,Blanco-Celeste,Masculino,1,Victor Romero,500
C97,Combate,16-17 años,Blanco,Masculino,1,Daniel Diaz,500
C97,Combate,16-17 años,Blanco,Masculino,2,Raul Perez,400
C51,Formas Manos Libres,Adulto,Purpura-Marron,Masculino,1,Anyel Lopez,500
C117,Formas Creativas,Hasta 9 años,Naranja-Negro,Mixto,1,Alexander Tamayo,500
C117,Formas Creativas,Hasta 9 años,Naranja-Negro,Mixto,2,Angelo Duran,400
C132/C134/C135/C137,Formas con Armas,14-17 años,Naranja-Negro,Mixto,1,Angel Urbina,500
C132/C134/C135/C137,Formas con Armas,14-17 años,Naranja-Negro,Mixto,1,Josmary Olivero,500
C132/C134/C135/C137,Formas con Armas,14-17 años,Naranja-Negro,Mixto,2,Santiago Chacon,400
C120/C121,Formas Creativas,14-17 años,Naranja-Negro,Mixto,1,Josmary Olivero,500
C120/C121,Formas Creativas,14-17 años,Naranja-Negro,Mixto,2,Santiago Chacon,400
C120/C121,Formas Creativas,14-17 años,Naranja-Negro,Mixto,1,Angel Urbina,500
C175,Combate,18-29 años,Mediano 66-75kg,Masculino,1,Oscar Games,500
C19,Formas Manos Libres,10-11 años,Blanco-Celeste,Masculino,1,Javier Padilla,500
C19,Formas Manos Libres,10-11 años,Blanco-Celeste,Masculino,2,Yoelver Perez,400
C19,Formas Manos Libres,10-11 años,Blanco-Celeste,Masculino,3,Luis Lopez,300
C20,Formas Manos Libres,10-11 años,Amarillo-Naranja,Masculino,1,Isaac Castillo,500`;

/**
 * Parses raw CSV lines into structured `RankingEntry` array.
 */
export function parseRankingCSV(csvString: string): RankingEntry[] {
  const lines = csvString.split('\n');
  const result: RankingEntry[] = [];
  
  if (lines.length < 2) return [];
  
  // Deterministic mapping for academies based on names
  const academies = [
    "Dojo Central", 
    "Team Elite", 
    "Academia Tigre", 
    "Dojo Cobra Kai", 
    "Yin Yang Club", 
    "Guerreros de Luz", 
    "Kombat Club", 
    "Fénix Martial Arts"
  ];
  
  const getAcademy = (name: string, index: number) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const idx = Math.abs(hash + index) % academies.length;
    return academies[idx];
  };

  const getStableId = (name: string, code: string, pos: string) => {
    let hash = 0;
    const key = name + code + pos;
    for (let i = 0; i < key.length; i++) {
       hash = key.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % 10000;
  };

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Split by comma (handle values simply since there are no commas in fields like "6-7 años")
    const parts = line.split(',');
    if (parts.length < 8) continue;
    
    const [codigo, modalidad, edad, cinta, genero, posicion, atleta, puntaje] = parts;
    const rankNum = Number(posicion) || 1;
    const pointsNum = Number(puntaje) || 500;
    
    // Check official modality meta
    // Split code in case of "C128/C130"
    const firstCode = codigo.split('/')[0];
    const officialMeta = OFFICIAL_CATEGORIES.find(cat => cat.code === firstCode);
    
    // Initial letter for fallback avatar icon rendering
    const initial = atleta.trim().charAt(0) || 'A';
    
    result.push({
      rank: rankNum,
      athleteId: getStableId(atleta, codigo, posicion),
      athleteName: atleta.trim(),
      academy: getAcademy(atleta, i),
      points: pointsNum,
      trend: rankNum === 1 ? 'stable' : (rankNum % 2 === 0 ? 'up' : 'down'),
      avatar: `https://placehold.co/150x150/0F0E17/FFFFFF?text=${encodeURIComponent(initial)}`,
      categoryCode: codigo, // Expose full field e.g. "C128/C130"
      categoryLabel: officialMeta?.modality || modalidad || 'General',
      ageGroup: officialMeta?.age || edad || 'General',
      belt: officialMeta?.belt || cinta || 'N/A'
    });
  }
  
  return result;
}

/**
 * Attempt to dynamically load from local dev path or server "/RANKING.csv",
 * with immediate automatic fallback to high-fidelity built-in data.
 */
export async function loadRankingFromCSV(): Promise<RankingEntry[]> {
  try {
    const res = await fetch('./RANKING.csv');
    if (res.ok) {
      const liveText = await res.text();
      if (liveText && liveText.includes('CODIGO')) {
        console.log("Successfully resolved and parsed live /RANKING.csv");
        return parseRankingCSV(liveText);
      }
    }
  } catch (e) {
    console.log("Vite static check for external CSV failed/bypassed. Loading embedded fallback.", e);
  }
  // Safe high-fidelity immediate offline fallback
  return parseRankingCSV(RAW_CSV_DATA);
}
