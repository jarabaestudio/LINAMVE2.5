
import React, { useEffect, useState } from 'react';
import { MOCK_ATHLETE } from '../constants';
import AthleteCard from '../components/AthleteCard';
import BentoGrid from '../components/BentoGrid';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const Dashboard: React.FC = () => {
  // Simulate loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Prevent infinite loop by running only once on mount
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = "https://via.placeholder.com/300/231F46/FFFFFF?text=ATLETA";
  };

  return (
    <div className="pt-24 pb-24 md:pb-12 px-4 max-w-7xl mx-auto min-h-screen">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loader"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="min-h-[60vh] flex items-center justify-center"
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-linamve-secondary border-t-transparent rounded-full animate-spin mb-4"></div>
              <span className="font-teko text-xl tracking-widest text-gray-400 animate-pulse">CARGANDO DOJO...</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Header Section with Avatar */}
            <motion.div variants={itemVariants} className="mb-8 flex items-center gap-4 border-b border-gray-800 pb-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-linamve-secondary rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <img 
                  src={MOCK_ATHLETE.photoUrl} 
                  alt={`${MOCK_ATHLETE.firstName} ${MOCK_ATHLETE.lastName}`} 
                  onError={handleImageError}
                  className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-linamve-secondary object-cover shadow-2xl z-10"
                />
                {/* Status Indicator */}
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-linamve-base rounded-full z-20 shadow-md" title="Atleta Activo"></div>
              </div>
              
              <div>
                <h1 className="font-teko text-4xl md:text-5xl text-white leading-none uppercase tracking-tight">
                  HOLA, <span className="text-linamve-secondary">{MOCK_ATHLETE.firstName}</span>
                </h1>
                <p className="text-gray-400 font-poppins text-sm md:text-base">Bienvenido a tu panel de control central.</p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Profile Card */}
              <motion.div variants={itemVariants} className="lg:col-span-1">
                 <h2 className="font-teko text-2xl text-white mb-4 border-l-4 border-linamve-accent pl-2">PASAPORTE DEPORTIVO</h2>
                 <AthleteCard athlete={MOCK_ATHLETE} />
                 
                 <div className="mt-6 glass-panel p-5 rounded-xl border border-white/5 bg-linamve-primary/40">
                   <h3 className="text-white font-teko text-xl mb-2 flex items-center gap-2">
                     MI ACADEMIA
                   </h3>
                   {/* Dynamic Academy Name */}
                   <p className="text-linamve-accent font-teko text-2xl leading-none mb-1">
                     {MOCK_ATHLETE.academy.toUpperCase()}
                   </p>
                   <p className="text-gray-300 text-sm mb-1 font-poppins">Instructor: Sensei Miguel Diaz</p>
                   <p className="text-gray-500 text-xs font-poppins">Ubicación: Caracas, Los Ruices</p>
                 </div>
              </motion.div>

              {/* Right Column: Bento Grid Stats */}
              <motion.div variants={itemVariants} className="lg:col-span-2">
                 <h2 className="font-teko text-2xl text-white mb-4 border-l-4 border-linamve-secondary pl-2">ESTADÍSTICAS & EVENTOS</h2>
                 <BentoGrid />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
