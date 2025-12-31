import React, { useState } from 'react';
import { MessageSquare, Search, Flame, Clock, Hash, ChevronRight, User } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock Data for Forum Threads
const TOPICS = [
  {
    id: 1,
    title: "Análisis: Nuevas Reglas de Puntuación 2026",
    category: "Reglamento",
    author: "Sensei Miguel",
    replies: 42,
    views: 1205,
    lastActivity: "Hace 2 horas",
    isHot: true
  },
  {
    id: 2,
    title: "¿Cómo mejorar la explosividad en el Gyaku Tsuki?",
    category: "Técnica",
    author: "Alejandro V.",
    replies: 18,
    views: 850,
    lastActivity: "Hace 5 horas",
    isHot: false
  },
  {
    id: 3,
    title: "Estrategias de hidratación para corte de peso",
    category: "Nutrición",
    author: "Dr. Fit",
    replies: 56,
    views: 2100,
    lastActivity: "Hace 1 día",
    isHot: true
  },
  {
    id: 4,
    title: "Busco dojo competitivo en Valencia",
    category: "Comunidad",
    author: "NewFighter_99",
    replies: 8,
    views: 320,
    lastActivity: "Hace 2 días",
    isHot: false
  },
  {
    id: 5,
    title: "Mejores protecciones homologadas: ¿Marca A o B?",
    category: "Equipamiento",
    author: "KarateKid",
    replies: 25,
    views: 1100,
    lastActivity: "Hace 3 días",
    isHot: false
  }
];

const CATEGORIES = ["Todos", "Técnica", "Reglamento", "Nutrición", "Comunidad", "Equipamiento"];

const Forum: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");

  return (
    <div className="pt-24 pb-24 px-4 max-w-7xl mx-auto min-h-screen">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 border-b border-gray-800 pb-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h1 className="font-teko text-5xl md:text-6xl font-bold text-white mb-2 uppercase">
              EL TATAMI <span className="text-linamve-accent">DIGITAL</span>
            </h1>
            <p className="text-gray-400 font-poppins max-w-2xl">
              Espacio de debate técnico, análisis de combates y comunidad para atletas federados.
            </p>
          </div>
          
          <div className="w-full md:w-auto">
            <button className="w-full md:w-auto bg-linamve-secondary hover:brightness-110 text-white font-teko text-xl px-8 py-3 rounded shadow-[0_0_15px_rgba(200,84,36,0.3)] transition-all flex items-center justify-center gap-2">
              <MessageSquare size={20} />
              NUEVO TEMA
            </button>
          </div>
        </div>
      </motion.div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        {/* Search */}
        <div className="glass-panel px-4 py-3 rounded-lg flex items-center gap-3 flex-1">
          <Search size={20} className="text-gray-500" />
          <input 
            type="text" 
            placeholder="Buscar discusiones, técnicas o reglas..." 
            className="bg-transparent border-none outline-none text-white w-full placeholder-gray-600 font-poppins" 
          />
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0 items-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${
                activeCategory === cat 
                ? 'bg-white text-linamve-base' 
                : 'glass-panel text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Topics List */}
      <div className="space-y-4">
        {TOPICS.map((topic, index) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-panel p-6 rounded-xl border-l-4 border-transparent hover:border-linamve-accent hover:bg-white/5 transition-all group cursor-pointer"
          >
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
              
              {/* Main Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-white/10 text-gray-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-white/5">
                    {topic.category}
                  </span>
                  {topic.isHot && (
                    <span className="flex items-center gap-1 text-orange-500 text-[10px] font-bold uppercase tracking-wider animate-pulse">
                      <Flame size={12} /> Trending
                    </span>
                  )}
                </div>
                
                <h3 className="font-teko text-2xl text-white group-hover:text-linamve-accent transition-colors mb-1">
                  {topic.title}
                </h3>
                
                <div className="flex items-center gap-4 text-xs text-gray-500 font-poppins">
                  <span className="flex items-center gap-1 hover:text-gray-300">
                    <User size={12} /> {topic.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {topic.lastActivity}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 md:gap-8 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-white/5 mt-4 md:mt-0 justify-end">
                 <div className="text-center">
                    <div className="text-xl font-teko font-bold text-white">{topic.replies}</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider">Respuestas</div>
                 </div>
                 <div className="text-center hidden sm:block">
                    <div className="text-xl font-teko font-bold text-gray-400">{topic.views}</div>
                    <div className="text-[10px] text-gray-600 uppercase tracking-wider">Vistas</div>
                 </div>
                 <div className="text-gray-500 group-hover:text-white transition-colors">
                    <ChevronRight size={24} />
                 </div>
              </div>

            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
};

export default Forum;