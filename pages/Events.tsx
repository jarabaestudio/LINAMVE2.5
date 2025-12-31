import React, { useState, useEffect } from 'react';
import { MapPin, ArrowRight, Shield, Calendar as CalendarIcon, ExternalLink, MessageCircle, Globe, Mail, Phone, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchEvents } from '../services/api'; 
import { Tournament } from '../types';
import { UPCOMING_TOURNAMENTS } from '../constants';

const Events: React.FC = () => {
  // ESTABILIDAD: Iniciamos vacíos y cargando
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const dbEvents = await fetchEvents();
        await new Promise(resolve => setTimeout(resolve, 300));

        if (dbEvents && dbEvents.length > 0) {
          setTournaments(dbEvents);
        } else {
          setTournaments(UPCOMING_TOURNAMENTS);
        }
      } catch (error) {
        console.error("Error cargando eventos, usando respaldo local.", error);
        setTournaments(UPCOMING_TOURNAMENTS);
      } finally {
        setIsLoading(false);
      }
    };
    loadEvents();
  }, []);

  // Lógica de Filtrado
  const filteredEvents = tournaments.filter(event => 
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getLocalDate = (dateStr: string) => {
    if (!dateStr) return new Date();
    const [year, month, day] = dateStr.split('-').map(Number);
    if (year && month && day) {
       return new Date(year, month - 1, day);
    }
    return new Date(dateStr);
  };

  const getWhatsAppUrl = (phone: string) => {
      const cleaned = phone.replace(/\D/g, '');
      return `https://wa.me/${cleaned}`;
  };

  const getWebUrl = (url: string) => {
      if (!url.startsWith('http')) return `https://${url}`;
      return url;
  };

  const getLevelStyle = (type: string) => {
      switch (type) {
          case '5A': return 'bg-yellow-500/10 border-yellow-500 text-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.2)]';
          case '4A': return 'bg-purple-500/10 border-purple-500 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.2)]';
          default: return 'bg-blue-500/10 border-blue-500 text-blue-400';
      }
  };

  return (
    <div className="pt-24 pb-24 md:pb-12 px-4 max-w-7xl mx-auto min-h-screen">
      
      {/* Header & Search Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 border-b border-gray-800 pb-6">
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center md:text-left flex-1"
        >
            <h1 className="font-teko text-5xl md:text-6xl font-bold text-white mb-2 uppercase tracking-wide">
            Calendario <span className="text-linamve-secondary">2026</span>
            </h1>
            <p className="text-gray-400 font-poppins max-w-2xl">
            La ruta al campeonato nacional. Selecciona tus batallas, acumula puntos y eleva tu ranking.
            </p>
        </motion.div>

        {/* Search Bar Input */}
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full md:w-auto min-w-[300px]"
        >
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-linamve-secondary transition-colors">
                    <Search size={20} />
                </div>
                <input 
                    type="text" 
                    placeholder="Buscar evento por nombre..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    disabled={isLoading}
                    className="w-full bg-black/40 border border-white/10 text-white pl-10 pr-10 py-3 rounded-lg outline-none focus:border-linamve-secondary focus:bg-black/60 transition-all font-poppins placeholder-gray-600 shadow-lg"
                />
                {searchTerm && (
                    <button 
                        onClick={() => setSearchTerm('')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white transition-colors"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>
        </motion.div>
      </div>

      {/* Events Grid */}
      <div className="grid gap-8 min-h-[50vh]">
        {isLoading ? (
           /* SKELETON LOADER */
           <div className="flex flex-col items-center justify-center py-20 gap-4 opacity-50 animate-pulse">
               <Shield size={64} className="text-gray-700" />
               <div className="h-2 w-32 bg-gray-800 rounded"></div>
               <div className="text-xl font-teko text-gray-500 tracking-widest">SINCRONIZANDO CALENDARIO...</div>
           </div>
        ) : tournaments.length === 0 ? (
           /* DB VACÍA */
           <div className="text-center text-gray-500 font-teko text-2xl py-12 border border-dashed border-gray-800 rounded-xl">
               NO HAY EVENTOS DISPONIBLES POR EL MOMENTO
           </div>
        ) : filteredEvents.length === 0 ? (
           /* SIN RESULTADOS DE BÚSQUEDA */
           <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
               <div className="bg-white/5 p-4 rounded-full mb-4">
                   <Search size={40} className="text-gray-600" />
               </div>
               <h3 className="text-white font-teko text-3xl mb-1">NO SE ENCONTRARON EVENTOS</h3>
               <p className="text-gray-500 font-poppins">No hay coincidencias para "{searchTerm}". Intenta con otro nombre.</p>
               <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-4 text-linamve-secondary text-sm font-bold uppercase tracking-wider hover:underline"
               >
                  Limpiar búsqueda
               </button>
           </div>
        ) : (
          /* LISTA DE EVENTOS FILTRADA */
          <AnimatePresence>
            {filteredEvents.map((event, index) => {
              const eventDate = getLocalDate(event.date);
              const isFinished = event.status === 'finished';
              
              return (
                <motion.div 
                  key={event.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }} 
                  className={`glass-panel rounded-2xl overflow-hidden p-0 flex flex-col transition-colors group relative ${isFinished ? 'opacity-70 grayscale-[50%]' : 'hover:border-linamve-accent/50'}`}
                >
                  
                  {/* Info Container */}
                  <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between gap-6">
                     <div className="flex-1">
                        <div className="flex items-center gap-2 mb-4">
                            <span className={`px-3 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider border ${getLevelStyle(event.type)}`}>
                                NIVEL {event.type}
                            </span>
                            {event.status === 'open' ? (
                                <span className="flex items-center gap-1 text-[10px] text-green-400 font-bold uppercase tracking-wider animate-pulse ml-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> INSCRIPCIONES ABIERTAS
                                </span>
                            ) : (
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider ml-2">
                                CERRADO
                                </span>
                            )}
                        </div>

                        <h3 className={`font-teko text-5xl md:text-6xl transition-colors mb-4 leading-none ${isFinished ? 'text-gray-400' : 'text-white group-hover:text-linamve-accent'}`}>
                            {event.name}
                        </h3>
                        
                        <div className="flex flex-col gap-3 text-sm text-gray-400 font-poppins">
                            {/* DATE */}
                            <div className="flex items-center gap-3">
                                <CalendarIcon size={20} className="text-linamve-secondary shrink-0" />
                                <span className="text-white text-lg font-teko tracking-wide">
                                    {eventDate.getDate()} de {eventDate.toLocaleString('es-ES', { month: 'long' }).toUpperCase()} {eventDate.getFullYear()}
                                </span>
                            </div>
                            
                            {/* LOCATION */}
                            <div className="flex items-center gap-3">
                                <MapPin size={20} className="text-linamve-secondary shrink-0" />
                                <span className="uppercase tracking-wide">{event.location}</span>
                            </div>
                            
                            {/* CONTACT INFO SEPARATOR */}
                            {(event.whatsapp || event.website || event.email || event.phone) && (
                                <div className="h-px w-full bg-white/5 my-3"></div>
                            )}

                            {/* WHATSAPP */}
                            {event.whatsapp && (
                                <a href={getWhatsAppUrl(event.whatsapp)} target="_blank" rel="noopener noreferrer" 
                                   className="flex items-center gap-3 group/item hover:text-white transition-colors w-fit">
                                    <MessageCircle size={20} className="text-linamve-secondary group-hover/item:text-[#25D366] transition-colors shrink-0" />
                                    <span className="uppercase tracking-wide font-bold">Chat Oficial WhatsApp</span>
                                </a>
                            )}

                            {/* WEBSITE */}
                            {event.website && (
                                <a href={getWebUrl(event.website)} target="_blank" rel="noopener noreferrer" 
                                   className="flex items-center gap-3 group/item hover:text-white transition-colors w-fit">
                                    <Globe size={20} className="text-linamve-secondary group-hover/item:text-blue-400 transition-colors shrink-0" />
                                    <span className="truncate max-w-[250px]">{event.website.replace(/^https?:\/\//, '')}</span>
                                    <ExternalLink size={12} className="opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                </a>
                            )}

                            {/* EMAIL */}
                            {event.email && (
                                <a href={`mailto:${event.email}`} 
                                   className="flex items-center gap-3 group/item hover:text-white transition-colors w-fit">
                                    <Mail size={20} className="text-linamve-secondary group-hover/item:text-yellow-500 transition-colors shrink-0" />
                                    <span className="truncate max-w-[250px]">{event.email}</span>
                                </a>
                            )}

                             {/* PHONE */}
                             {event.phone && (
                                <div className="flex items-center gap-3 w-fit">
                                    <Phone size={20} className="text-linamve-secondary shrink-0" />
                                    <span>{event.phone}</span>
                                </div>
                            )}
                        </div>
                     </div>

                     {/* Action Button */}
                     <div className="mt-6 md:mt-0 flex items-end">
                        {event.status === 'open' ? (
                            <button className="w-full md:w-auto bg-linamve-secondary hover:brightness-110 text-white font-teko text-xl px-8 py-3 rounded shadow-[0_0_15px_rgba(200,84,36,0.3)] transition-all flex items-center justify-center gap-2 group-hover:translate-x-1 whitespace-nowrap">
                                REGISTRO OFICIAL <ArrowRight size={20} />
                            </button>
                        ) : (
                            <button disabled className="w-full md:w-auto border border-gray-700 text-gray-500 font-teko text-xl px-8 py-3 rounded cursor-not-allowed bg-black/20 whitespace-nowrap">
                                RESULTADOS
                            </button>
                        )}
                     </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}

        {/* Footer Placeholder */}
        {!isLoading && filteredEvents.length > 0 && (
            <div className="border border-dashed border-gray-800 rounded-xl p-8 flex flex-col items-center justify-center text-center opacity-50">
            <Shield size={48} className="text-gray-700 mb-4" />
            <h4 className="font-teko text-2xl text-gray-500">MÁS EVENTOS POR CONFIRMAR</h4>
            <p className="text-sm text-gray-600 font-poppins">El calendario oficial se actualiza trimestralmente.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Events;