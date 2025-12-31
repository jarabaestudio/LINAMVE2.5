import { RankingEntry, Tournament, SocialConfig, SocialPost } from '../types';
import { OFFICIAL_CATEGORIES } from '../data/official_categories';

// URL BASE FINAL - Confirmada operativa en Hostinger
const API_BASE = 'https://lightcoral-owl-713849.hostingersite.com/api-linamve/index.php';

// === ADAPTERS ===

const adaptRankingItem = (item: any, index: number): RankingEntry => {
  const code = item.categoryCode || item.category_code || item.codigo_categoria || 'OPEN';
  const officialMeta = OFFICIAL_CATEGORIES.find(cat => cat.code === code);

  return {
    rank: Number(item.rank || item.posicion) || (index + 1),
    athleteId: Number(item.athleteId || item.id) || Math.random(),
    athleteName: (item.athleteName || item.nombre || 'Atleta').trim(),
    academy: item.academy || item.academia || 'Independiente',
    points: Number(item.points || item.puntaje) || 0,
    trend: item.trend || 'stable',
    avatar: item.avatar || item.photo_url || 'https://via.placeholder.com/150/0F0E17/FFFFFF?text=ATLETA',
    categoryCode: code,
    categoryLabel: officialMeta?.modality || item.modalidad || 'General',
    ageGroup: officialMeta?.age || item.edad || 'General',
    belt: officialMeta?.belt || item.cinta || 'N/A'
  };
};

const adaptTournamentItem = (item: any): Tournament => {
  let flyers: string[] = [];
  try {
    if (item.flyers) {
        flyers = typeof item.flyers === 'string' ? JSON.parse(item.flyers) : item.flyers;
    }
  } catch (e) { 
    flyers = []; 
  }

  // CORRECCIÓN CRÍTICA: Mapeo exacto con columna DB 'categoria_torneo'
  // Si no encuentra 'type', busca 'categoria_torneo', si falla usa '3A'
  const rawType = item.type || item.categoria_torneo || '3A';
  
  // Normalización para asegurar que sea un tipo válido
  const normalizedType = ['3A', '4A', '5A'].includes(rawType) ? rawType : '3A';

  return {
    id: Number(item.id),
    name: item.name || item.evento || 'Torneo',
    date: item.date || item.fecha || new Date().toISOString(),
    location: item.location || item.lugar || 'TBA',
    status: (['open', 'closed', 'finished'].includes(item.status) ? item.status : 'open') as any,
    type: normalizedType as any,
    flyers: Array.isArray(flyers) ? flyers : [],
    // Mapeo de columnas DB (Español) a Frontend (Inglés)
    phone: item.telefono || item.phone || undefined,
    email: item.correo || item.email || undefined,
    whatsapp: item.whatsapp || undefined,
    website: item.pagina_web || item.website || undefined
  };
};

// === READ OPERATIONS ===

export const checkApiStatus = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE}?action=status&t=${Date.now()}`);
    return response.ok;
  } catch { return false; }
};

export const fetchRanking = async (): Promise<RankingEntry[]> => {
    try {
        const res = await fetch(`${API_BASE}?action=get_ranking&t=${Date.now()}`);
        if (!res.ok) return [];
        const data = await res.json();
        return Array.isArray(data) ? data.map(adaptRankingItem) : [];
    } catch (e) {
        return [];
    }
};

export const fetchCategoryRanking = async (categoryCode: string): Promise<RankingEntry[]> => {
    try {
        const params = new URLSearchParams({
            action: 'get_ranking_by_category',
            code: categoryCode,
            t: Date.now().toString()
        });
        const res = await fetch(`${API_BASE}?${params.toString()}`);
        if (!res.ok) return [];
        const data = await res.json();
        return Array.isArray(data) ? data.map(adaptRankingItem) : [];
    } catch (e) {
        return [];
    }
};

export const fetchEvents = async (): Promise<Tournament[]> => {
    try {
        const res = await fetch(`${API_BASE}?action=get_calendar&t=${Date.now()}`);
        if (!res.ok) return [];
        const data = await res.json();
        return Array.isArray(data) ? data.map(adaptTournamentItem) : [];
    } catch (e) {
        return [];
    }
};

// === WRITE OPERATIONS (ADMIN) ===

export const createEvent = async (eventData: Partial<Tournament>): Promise<{success: boolean, message: string}> => {
    try {
        const formData = new FormData();
        formData.append('action', 'create_event');
        formData.append('name', eventData.name || '');
        formData.append('date', eventData.date || '');
        formData.append('location', eventData.location || '');
        // Enviamos 'categoria_torneo' para consistencia con DB, aunque el backend podría esperar 'type'
        // Lo ideal es enviar ambos o lo que el PHP espere. Asumimos que el PHP procesa 'type'.
        formData.append('type', eventData.type || '3A');
        
        if (eventData.phone) formData.append('telefono', eventData.phone);
        if (eventData.email) formData.append('correo', eventData.email);
        if (eventData.whatsapp) formData.append('whatsapp', eventData.whatsapp);
        if (eventData.website) formData.append('pagina_web', eventData.website);

        if (eventData.flyers && eventData.flyers.length > 0) {
            formData.append('flyers', JSON.stringify(eventData.flyers));
        }
        
        const res = await fetch(API_BASE, { method: 'POST', body: formData });
        return await res.json();
    } catch (error: any) {
        return { success: false, message: 'Fallo de red al conectar con el servidor' };
    }
};

export const uploadResultsCSV = async (tournamentId: number, csvFile: File): Promise<{success: boolean, message: string, processed?: number}> => {
    try {
        const formData = new FormData();
        formData.append('action', 'upload_results');
        formData.append('tournament_id', tournamentId.toString());
        formData.append('csv_file', csvFile);

        const res = await fetch(API_BASE, { method: 'POST', body: formData });
        return await res.json();
    } catch (error: any) {
        return { success: false, message: 'Error al subir archivo CSV' };
    }
};

// === SOCIAL FEED (SOLUCIÓN DEFINITIVA) ===

export const fetchSocialFeed = async (): Promise<SocialConfig | null> => {
  try {
    // IMPORTANTE: ?t=Date.now() evita que el navegador use caché vieja
    const res = await fetch(`${API_BASE}?action=get_social&t=${Date.now()}`);
    if (!res.ok) throw new Error("Server Error");
    
    const data = await res.json();
    
    // ERROR CORREGIDO: El servidor devuelve ARRAY PURO ["url1", "url2"], no {posts: []}
    let rawList: string[] = [];
    if (Array.isArray(data)) {
        rawList = data;
    } else if (data && data.posts && Array.isArray(data.posts)) {
        rawList = data.posts;
    }

    const posts = rawList.map((url: string, i: number) => ({
      id: `post-${i}-${Date.now()}`,
      postUrl: url
    }));

    // Detectar si el backend envió accountName (si era objeto), sino usar default
    const accountName = (data && data.accountName) ? data.accountName : '@LINAMVEOFFICIAL';

    return { accountName, posts };
  } catch (e) {
    console.error("API Error:", e);
    return null; 
  }
};

export const updateSocialFeed = async (config: SocialConfig): Promise<{success: boolean, message: string}> => {
  try {
    const payload = { 
        accountName: config.accountName || '@LINAMVEOFFICIAL',
        posts: config.posts.map(p => p.postUrl) 
    };
    
    const res = await fetch(`${API_BASE}?action=update_social`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    return await res.json();
  } catch (e: any) {
    return { success: false, message: e.message || 'Error de red' };
  }
};