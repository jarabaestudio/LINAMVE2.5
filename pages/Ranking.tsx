import React, { useEffect, useState, useMemo } from 'react';
import { Search, RefreshCw, ChevronDown, Trophy, Medal, Shield, User, SlidersHorizontal, X } from 'lucide-react';
import { fetchCategoryRanking } from '../services/api';
import { RankingEntry } from '../types';
import { OFFICIAL_CATEGORIES } from '../data/official_categories';
import { motion, AnimatePresence } from 'framer-motion';

const Ranking: React.FC = () => {
  const [rankingData, setRankingData] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(false);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [searchLabel, setSearchLabel] = useState("");
  
  // UI State for Filters visibility
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(true);

  // --- SMART FILTERS STATE ---
  const [selectedModality, setSelectedModality] = useState<string>("");
  const [selectedAge, setSelectedAge] = useState<string>("");
  const [selectedBelt, setSelectedBelt] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("");

  // --- DERIVED OPTIONS (Cascading Logic) ---
  const availableModalities = useMemo(() => {
    return Array.from(new Set(OFFICIAL_CATEGORIES.map(c => c.modality)));
  }, []);

  useEffect(() => {
    if (!selectedModality && availableModalities.length > 0) {
      setSelectedModality(availableModalities[0]);
    }
  }, [availableModalities]);

  const availableAges = useMemo(() => {
    return Array.from(new Set(
      OFFICIAL_CATEGORIES
        .filter(c => c.modality === selectedModality)
        .map(c => c.age)
    ));
  }, [selectedModality]);

  useEffect(() => {
    if (availableAges.length > 0) {
      if (!availableAges.includes(selectedAge)) setSelectedAge(availableAges[0]);
    } else {
      setSelectedAge("");
    }
  }, [availableAges, selectedModality]);

  const availableBelts = useMemo(() => {
    return Array.from(new Set(
      OFFICIAL_CATEGORIES
        .filter(c => c.modality === selectedModality && c.age === selectedAge)
        .map(c => c.belt)
    ));
  }, [selectedModality, selectedAge]);

  useEffect(() => {
    if (availableBelts.length > 0) {
      if (!availableBelts.includes(selectedBelt)) setSelectedBelt(availableBelts[0]);
    } else {
      setSelectedBelt("");
    }
  }, [availableBelts, selectedAge]);

  const availableGenders = useMemo(() => {
    return Array.from(new Set(
      OFFICIAL_CATEGORIES
        .filter(c => c.modality === selectedModality && c.age === selectedAge && c.belt === selectedBelt)
        .map(c => c.gender)
    ));
  }, [selectedModality, selectedAge, selectedBelt]);

  useEffect(() => {
    if (availableGenders.length > 0) {
      if (!availableGenders.includes(selectedGender)) setSelectedGender(availableGenders[0]);
    } else {
      setSelectedGender("");
    }
  }, [availableGenders, selectedBelt]);


  // --- DATA LOADING ---
  const handleSearch = async () => {
    const matchedCategory = OFFICIAL_CATEGORIES.find(c => 
      c.modality === selectedModality &&
      c.age === selectedAge &&
      c.belt === selectedBelt &&
      c.gender === selectedGender
    );

    if (!matchedCategory) {
      alert("No se encontró una categoría válida con esa combinación.");
      return;
    }

    setLoading(true);
    setError(false);
    setSearchTriggered(true);
    // Auto-collapse filters on search to show results
    setIsFiltersExpanded(false); 
    setSearchLabel(`${matchedCategory.modality} • ${matchedCategory.age}`);
    
    try {
      const data = await fetchCategoryRanking(matchedCategory.code);
      setRankingData(data || []);
    } catch (err) {
      console.error("Fallo búsqueda categoría", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const getRankStyle = (rank: number) => {
    switch(rank) {
      case 1: return 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-black shadow-[0_0_15px_rgba(234,179,8,0.4)] border-yellow-300';
      case 2: return 'bg-gradient-to-br from-gray-300 to-gray-400 text-black shadow-[0_0_15px_rgba(209,213,219,0.3)] border-gray-200';
      case 3: return 'bg-gradient-to-br from-amber-700 to-amber-800 text-white shadow-[0_0_15px_rgba(180,83,9,0.3)] border-amber-600';
      default: return 'bg-white/5 text-gray-400 border-white/10';
    }
  };

  return (
    <div className="pt-20 pb-24 md:pb-12 px-2 md:px-4 max-w-7xl mx-auto min-h-screen flex flex-col">
      
      {/* HEADER - Compact & Animated */}
      <AnimatePresence>
        {isFiltersExpanded && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            // Added py-4 to prevent font clipping by overflow-hidden
            className="flex flex-col items-center text-center mb-2 overflow-hidden py-4"
          >
            {/* Adjusted leading-tight and increased desktop size to 8xl */}
            <h1 className="font-teko text-6xl md:text-8xl font-bold text-white uppercase tracking-wide drop-shadow-2xl leading-tight">
              RANKING <span className="text-linamve-secondary">NACIONAL</span>
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FILTER PANEL CONTAINER */}
      {/* Updated: Increased top margin when collapsed (mt-8) and adjusted sticky top position */}
      <div className={`sticky top-8 md:top-24 z-40 transition-all duration-300 ${isFiltersExpanded ? 'mb-4' : 'mb-6 mt-8'}`}>
        
        {/* COLLAPSED SUMMARY BAR (Visible when results are shown) */}
        {!isFiltersExpanded && searchTriggered && (
           <motion.div 
             initial={{ y: -20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             className="glass-panel p-3 rounded-xl border-linamve-secondary/50 shadow-xl bg-[#161521]/95 backdrop-blur-md flex items-center justify-between gap-4"
           >
             <div className="flex-1 min-w-0">
               <div className="flex items-center gap-2 text-linamve-secondary text-[10px] font-bold uppercase tracking-widest mb-0.5">
                  <Shield size={10} /> CATEGORÍA ACTIVA
               </div>
               <div className="text-white font-teko text-xl leading-none truncate">
                 {searchLabel}
               </div>
               <div className="text-gray-400 text-xs truncate">
                  {selectedBelt} • {selectedGender}
               </div>
             </div>
             
             <button 
               onClick={() => setIsFiltersExpanded(true)}
               className="shrink-0 bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors border border-white/10"
             >
                <SlidersHorizontal size={20} className="text-linamve-accent" />
             </button>
           </motion.div>
        )}

        {/* EXPANDED FILTER FORM */}
        <AnimatePresence>
          {isFiltersExpanded && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              className="glass-panel p-4 md:p-6 rounded-xl border border-linamve-secondary/30 shadow-2xl backdrop-blur-xl bg-[#161521]/95"
            >
              {/* Close Button (Mobile Only) */}
              {searchTriggered && (
                <div className="flex justify-end md:hidden mb-2">
                  <button onClick={() => setIsFiltersExpanded(false)} className="text-gray-400 hover:text-white">
                    <X size={20} />
                  </button>
                </div>
              )}

              <div className="grid grid-cols-2 lg:grid-cols-9 gap-3 items-end">
                
                {/* Modalidad (Full width mobile) */}
                <div className="col-span-2 lg:col-span-2 flex flex-col gap-1">
                  <label className="text-[9px] uppercase font-bold text-linamve-secondary tracking-widest pl-1">Modalidad</label>
                  <div className="relative">
                    <select 
                      className="w-full bg-black/50 border border-white/10 text-white text-sm rounded-lg px-3 py-2.5 appearance-none focus:border-linamve-secondary outline-none font-poppins truncate"
                      value={selectedModality}
                      onChange={(e) => setSelectedModality(e.target.value)}
                    >
                      {availableModalities.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <ChevronDown className="absolute right-2 top-3 text-gray-500 pointer-events-none" size={14} />
                  </div>
                </div>

                {/* Edad (Full width mobile) */}
                <div className="col-span-2 lg:col-span-2 flex flex-col gap-1">
                  <label className="text-[9px] uppercase font-bold text-gray-400 tracking-widest pl-1">Edad</label>
                  <div className="relative">
                    <select 
                      className="w-full bg-black/50 border border-white/10 text-white text-sm rounded-lg px-3 py-2.5 appearance-none focus:border-linamve-secondary outline-none font-poppins truncate"
                      value={selectedAge}
                      onChange={(e) => setSelectedAge(e.target.value)}
                      disabled={availableAges.length === 0}
                    >
                      {availableAges.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                    <ChevronDown className="absolute right-2 top-3 text-gray-500 pointer-events-none" size={14} />
                  </div>
                </div>

                {/* Cinturon (1 col mobile) */}
                <div className="col-span-1 lg:col-span-2 flex flex-col gap-1">
                  <label className="text-[9px] uppercase font-bold text-gray-400 tracking-widest pl-1">Cinturón</label>
                  <div className="relative">
                    <select 
                      className="w-full bg-black/50 border border-white/10 text-white text-sm rounded-lg px-3 py-2.5 appearance-none focus:border-linamve-secondary outline-none font-poppins truncate"
                      value={selectedBelt}
                      onChange={(e) => setSelectedBelt(e.target.value)}
                      disabled={availableBelts.length === 0}
                    >
                      {availableBelts.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                    <ChevronDown className="absolute right-2 top-3 text-gray-500 pointer-events-none" size={14} />
                  </div>
                </div>

                {/* Genero (1 col mobile) */}
                <div className="col-span-1 lg:col-span-2 flex flex-col gap-1">
                  <label className="text-[9px] uppercase font-bold text-gray-400 tracking-widest pl-1">Género</label>
                  <div className="relative">
                    <select 
                      className="w-full bg-black/50 border border-white/10 text-white text-sm rounded-lg px-3 py-2.5 appearance-none focus:border-linamve-secondary outline-none font-poppins truncate"
                      value={selectedGender}
                      onChange={(e) => setSelectedGender(e.target.value)}
                      disabled={availableGenders.length === 0}
                    >
                      {availableGenders.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                    <ChevronDown className="absolute right-2 top-3 text-gray-500 pointer-events-none" size={14} />
                  </div>
                </div>

                {/* Botón (Full width mobile) */}
                <div className="col-span-2 lg:col-span-1">
                  <button 
                    onClick={handleSearch}
                    disabled={loading || !selectedModality}
                    className="w-full h-[42px] bg-linamve-secondary hover:brightness-110 text-white font-teko text-xl uppercase tracking-wide rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95"
                  >
                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "BUSCAR"}
                  </button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* RESULTS AREA */}
      <div className="flex-1">
        {loading ? (
           <div className="flex flex-col items-center justify-center h-64 text-gray-500 gap-6 animate-pulse mt-4">
              <Trophy size={50} className="text-gray-700" />
              <div className="text-center">
                <span className="block font-teko text-2xl tracking-widest text-white">CARGANDO...</span>
              </div>
           </div>
        ) : error ? (
           <div className="glass-panel p-6 rounded-xl flex flex-col items-center justify-center h-48 text-red-400 gap-4 border-red-900/30 text-center">
              <Shield size={32} />
              <p className="font-teko text-2xl">ERROR DE CONEXIÓN</p>
              <button onClick={handleSearch} className="bg-red-900/20 px-4 py-1.5 rounded text-sm hover:bg-red-900/40">Reintentar</button>
           </div>
        ) : rankingData.length === 0 ? (
           <div className={`glass-panel p-8 rounded-2xl flex flex-col items-center justify-center text-center border border-dashed border-white/10 bg-black/20 transition-all duration-500 ${isFiltersExpanded ? 'mt-0' : 'mt-12'}`}>
              <div className="bg-white/5 p-4 rounded-full mb-4">
                <Search size={32} className="text-gray-600" />
              </div>
              <h3 className="font-teko text-3xl text-white mb-1">
                {searchTriggered ? "SIN REGISTROS" : "BUSCAR ATLETAS"}
              </h3>
              <p className="font-poppins text-gray-400 text-sm max-w-xs mx-auto">
                {searchTriggered 
                  ? "No se encontraron resultados para esta categoría."
                  : "Usa los filtros superiores para encontrar el ranking."}
              </p>
           </div>
        ) : (
          <div className="pb-10">
            {/* --- MOBILE CARD VIEW (Visible on < md) --- */}
            <div className="md:hidden space-y-3">
              {rankingData.map((entry) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={entry.athleteId} 
                  className="glass-panel p-4 rounded-xl border border-white/5 relative overflow-hidden group active:scale-[0.99] transition-transform"
                >
                  {/* Rank Badge - Smaller */}
                  <div className={`absolute top-0 left-0 w-10 h-10 rounded-br-xl flex items-center justify-center font-teko text-xl font-bold border-r border-b z-10 ${getRankStyle(entry.rank)}`}>
                    {entry.rank}
                  </div>

                  <div className="flex items-center gap-3 pl-8"> 
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <img 
                        src={entry.avatar} 
                        alt={entry.athleteName}
                        onError={(e) => {(e.target as HTMLImageElement).src = 'https://via.placeholder.com/150/0F0E17/FFFFFF?text=ATLETA'}}
                        className="w-16 h-16 rounded-lg object-cover border-2 border-white/10 shadow-lg bg-gray-800"
                      />
                      {entry.rank <= 3 && (
                        <div className="absolute -bottom-1.5 -right-1.5 bg-linamve-base rounded-full p-0.5 border border-white/10">
                           <Medal size={14} className={entry.rank === 1 ? 'text-yellow-500' : entry.rank === 2 ? 'text-gray-400' : 'text-amber-700'} />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-teko text-xl leading-none uppercase truncate mb-0.5">{entry.athleteName}</h3>
                      <p className="text-linamve-secondary text-[10px] font-bold uppercase tracking-wider truncate mb-1">{entry.academy}</p>
                      
                      {/* Compact Details Tags */}
                      <div className="flex items-center gap-2 text-[10px] text-gray-400">
                         <span className="bg-white/5 px-1.5 py-0.5 rounded border border-white/5">{entry.belt || selectedBelt}</span>
                         <span className="text-gray-600">|</span>
                         <span className="text-linamve-accent font-teko text-lg leading-none">{entry.points} PTS</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* --- DESKTOP TABLE VIEW (Visible on >= md) --- */}
            <div className="hidden md:block glass-panel rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#1A1926] border-b border-white/10">
                    <th className="p-4 text-center w-20 text-gray-500 font-teko text-lg tracking-wider">RANK</th>
                    <th className="p-4 text-gray-500 font-teko text-lg tracking-wider">ATLETA</th>
                    <th className="p-4 text-gray-500 font-teko text-lg tracking-wider">ACADEMIA</th>
                    <th className="p-4 text-center text-gray-500 font-teko text-lg tracking-wider">DETALLES</th>
                    <th className="p-4 text-right text-gray-500 font-teko text-lg tracking-wider">PUNTOS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {rankingData.map((entry) => (
                    <tr key={entry.athleteId} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="p-4 text-center">
                        <div className={`w-10 h-10 mx-auto flex items-center justify-center rounded-lg font-teko text-xl font-bold border ${getRankStyle(entry.rank)}`}>
                          {entry.rank}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img 
                             src={entry.avatar} 
                             className="w-12 h-12 rounded-lg object-cover border border-white/10 group-hover:border-linamve-secondary/50 transition-colors"
                             onError={(e) => {(e.target as HTMLImageElement).src = 'https://via.placeholder.com/150/0F0E17/FFFFFF?text=ATLETA'}}
                          />
                          <div>
                            <div className="text-white font-teko text-2xl uppercase leading-none group-hover:text-linamve-accent transition-colors">
                              {entry.athleteName}
                            </div>
                            <span className="text-[10px] text-gray-500 font-poppins uppercase tracking-wide">ID: {entry.athleteId}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                         <span className="text-linamve-secondary font-bold text-base uppercase tracking-wide font-teko">
                           {entry.academy}
                         </span>
                      </td>
                      <td className="p-4 text-center">
                         <div className="flex justify-center gap-2">
                           <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-gray-300 font-bold uppercase tracking-wider">
                             {entry.belt || selectedBelt}
                           </span>
                           <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-gray-300 font-bold uppercase tracking-wider">
                             {entry.ageGroup || selectedAge}
                           </span>
                         </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="font-teko text-4xl text-white font-bold tracking-tight drop-shadow-md">
                          {entry.points}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}
      </div>
      
      <div className="mt-auto text-center border-t border-gray-800 pt-6">
        <p className="text-gray-600 text-[10px] font-poppins uppercase tracking-widest">
           LINAMVE &copy; 2026
        </p>
      </div>
    </div>
  );
};

export default Ranking;