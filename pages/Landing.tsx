import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence, Variants } from 'framer-motion';
import { ArrowRight, ChevronRight, Calendar, MapPin, Trophy, ExternalLink, MessageSquare, Lock, Instagram } from 'lucide-react';
import { InstagramEmbed } from 'react-social-media-embed';
import { UPCOMING_TOURNAMENTS, RANKING_DATA } from '../constants';
import { fetchSocialFeed } from '../services/api';
import { SocialPost } from '../types';

const PostSkeleton = () => (
  <div className="w-full flex justify-center">
    <div className="w-full max-w-[328px] h-[450px] bg-linamve-primary/40 rounded-xl overflow-hidden animate-pulse border border-white/5 flex flex-col items-center justify-center">
      <Instagram className="text-white/20 mb-2" size={48} />
      <span className="text-xs text-white/20 font-poppins">Cargando contenido...</span>
    </div>
  </div>
);

export const Landing: React.FC = () => {
  const featuredTournament = UPCOMING_TOURNAMENTS[0];
  // const hasFlyer = featuredTournament.flyers && featuredTournament.flyers.length > 0; // Deshabilitado para forzar fondo estático
  const topRanking = RANKING_DATA.slice(0, 3);
  
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([]);
  const [accountName, setAccountName] = useState('@LINAMVEOFFICIAL');
  const [isLoadingSocial, setIsLoadingSocial] = useState(true);

  // POSTS POR DEFECTO (Fallback si falla el API)
  const DEFAULT_POSTS: SocialPost[] = [
    { id: 'def1', postUrl: 'https://www.instagram.com/p/DGj8m9qTG_0/' },
    { id: 'def2', postUrl: 'https://www.instagram.com/p/DGlx6mAzJtW/' },
    { id: 'def3', postUrl: 'https://www.instagram.com/p/DGbN_lTz1e2/' }
  ];

  useEffect(() => {
    setIsLoadingSocial(true);
    fetchSocialFeed().then(data => {
        if (data && data.posts && data.posts.length > 0) {
           setSocialPosts(data.posts);
           if (data.accountName) setAccountName(data.accountName);
        } else {
           setSocialPosts(DEFAULT_POSTS);
        }
        setIsLoadingSocial(false);
    }).catch(e => {
        setSocialPosts(DEFAULT_POSTS);
        setIsLoadingSocial(false);
    });
  }, []);

  const getLocalDate = (dateStr: string) => {
    if (!dateStr) return new Date();
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
  };
  
  const featuredDate = getLocalDate(featuredTournament.date);

  const { scrollY } = useScroll();
  // Ajustamos el parallax para que sea sutil dentro del 100dvh
  const heroTextY = useTransform(scrollY, [0, 400], [0, 150]);
  const heroTextOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  // --- ANIMATION VARIANTS ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25, // Retraso entre cada elemento
        delayChildren: 0.3     // Espera a que cargue un poco la imagen de fondo
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.1, 0.25, 1.0] // Curva Bezier suave tipo iOS
      } 
    }
  };

  return (
    <div className="bg-linamve-base relative">
      
      {/* FONDO FIJO (PARALLAX) - Cubre toda la pantalla base */}
      <div className="fixed inset-0 w-full h-full z-0">
        <img 
          src="https://lightcoral-owl-713849.hostingersite.com/img%20LINAMVE/frame_094_delay-0.04s.webp" 
          alt="LINAMVE Official Cover" 
          className="w-full h-full object-cover"
        />
        {/* Gradiente reforzado para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-linamve-base via-linamve-base/60 to-black/30"></div>
      </div>

      <div className="relative z-10">
        
        {/* HERO SECTION: 100dvh EXACTO - "App Native Feel" */}
        {/* Flex Column con justify-center/evenly distribuye el espacio verticalmente sin scroll */}
        <div className="h-[100dvh] w-full flex flex-col relative overflow-hidden">
          
          <motion.div 
            style={{ y: heroTextY, opacity: heroTextOpacity }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 flex flex-col justify-center items-center px-4 w-full h-full pb-20 md:pb-0" // pb-20 reserva espacio para Bottom Nav en móvil
          >
            {/* 1. BADGE - Espaciado dinámico superior */}
            <motion.div variants={itemVariants} className="mt-auto md:mt-0 mb-2 md:mb-6">
                <div className="inline-block border border-linamve-accent/50 rounded-full px-4 py-1 bg-black/40 backdrop-blur-sm shadow-[0_0_15px_rgba(255,137,6,0.15)]">
                    <span className="text-linamve-accent text-[10px] md:text-sm font-bold tracking-[0.2em] uppercase">Temporada 2026</span>
                </div>
            </motion.div>
            
            {/* 2. TÍTULO MASIVO - Escala con Viewport Width (vw) */}
            {/* text-[22vw] llena el ancho en móviles sin romperse. leading-[0.8] compacta la altura */}
            <motion.h1 variants={itemVariants} className="font-teko text-[22vw] md:text-[14rem] font-bold leading-[0.8] tracking-widest text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] select-none text-center">
              LINAMVE
            </motion.h1>
            
            {/* 3. TAGLINE NEÓN */}
            <motion.h2 variants={itemVariants} className="font-teko text-xl md:text-5xl uppercase tracking-[0.25em] md:tracking-[0.3em] text-white font-medium drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] text-center mt-2 md:mt-4 max-w-[95%]">
              DONDE LA <span className="text-linamve-accent font-bold drop-shadow-[0_0_15px_rgba(255,137,6,1)]">DISCIPLINA</span> SE HACE VICTORIA
            </motion.h2>
            
            {/* 4. DESCRIPCIÓN - RESTAURADA Y OPTIMIZADA */}
            {/* Usamos max-w limitado y texto pequeño para que no coma espacio de botones */}
            <motion.div variants={itemVariants} className="my-6 md:my-8 px-4 max-w-md mx-auto text-center">
                <p className="font-poppins text-gray-200 text-xs md:text-lg font-light leading-relaxed drop-shadow-md">
                    La plataforma oficial de gestión deportiva para atletas de alto rendimiento. Rankings en tiempo real y estadísticas avanzadas.
                </p>
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mt-4"></div>
            </motion.div>

            {/* 5. BOTONES DE ACCIÓN - Optimizados para el pulgar */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-3 w-full max-w-xs md:max-w-2xl mb-auto md:mb-12">
              <Link 
                to="/dashboard"
                className="bg-linamve-secondary hover:brightness-110 text-white font-teko text-xl md:text-2xl px-6 py-3 rounded-lg w-full shadow-[0_4px_20px_rgba(200,84,36,0.4)] transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                REGÍSTRATE AL RANKING <ArrowRight size={20} />
              </Link>
              <Link 
                to="/ranking"
                className="bg-white/5 hover:bg-white/10 border border-white/20 text-white font-teko text-xl md:text-2xl px-6 py-3 rounded-lg w-full backdrop-blur-md transition-all flex items-center justify-center active:scale-95"
              >
                VER CLASIFICACIÓN
              </Link>
            </motion.div>
            
            {/* Indicador de Scroll sutil (Solo si hay contenido abajo) */}
            <motion.div 
               animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="absolute bottom-24 md:bottom-10 text-white/40 pointer-events-none"
            >
               <div className="text-[9px] uppercase tracking-widest mb-1">Descubre Más</div>
               <ChevronRight size={20} className="rotate-90 mx-auto" />
            </motion.div>

          </motion.div>
        </div>

        {/* --- CONTENIDO SCROLLABLE (Aparece al deslizar) --- */}
        <div className="bg-linamve-base relative z-20">
            <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="px-4 md:px-8 max-w-5xl mx-auto py-12 space-y-8"
            >
            
            {/* Featured Tournament Card */}
            <div className="relative w-full min-h-[450px] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl group border border-white/10 bg-linamve-primary/80 backdrop-blur-xl">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://lightcoral-owl-713849.hostingersite.com/IMG/FONDO_EVENT.webp" 
                        alt="Background Featured Event"
                        className="w-full h-full object-cover opacity-100 transition-transform duration-700 group-hover:scale-105" 
                    />
                    {/* GRADIENTE OPTIMIZADO: Transparencia ajustada para revelar imagen */}
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
                </div>

                <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end items-start z-10">
                <div className="bg-linamve-secondary text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 shadow-lg backdrop-blur-sm bg-opacity-90">
                    Próximo Torneo
                </div>

                <h2 className="font-teko text-5xl md:text-7xl font-bold text-white uppercase leading-[0.9] mb-6 drop-shadow-lg max-w-2xl">
                    {featuredTournament.name}
                </h2>

                <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-8 w-full md:w-auto">
                    <div className="flex items-center gap-3">
                    <div className="text-linamve-accent">
                        <Calendar size={24} />
                    </div>
                    <div>
                        <span className="block text-white font-teko text-xl uppercase tracking-wide">
                        {featuredDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }).replace('.', '').toUpperCase()}, 2026
                        </span>
                    </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                    <div className="text-linamve-accent">
                        <MapPin size={24} />
                    </div>
                    <div>
                        <span className="block text-white font-teko text-xl uppercase tracking-wide">
                        {featuredTournament.location.toUpperCase()}
                        </span>
                    </div>
                    </div>
                </div>

                <Link 
                    to="/events" 
                    className="w-full md:w-auto bg-white text-linamve-base hover:bg-gray-200 font-teko font-bold text-xl uppercase px-8 py-3 rounded-full flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                    Ver Detalles <ArrowRight size={20} className="-rotate-45" strokeWidth={2.5} />
                </Link>
                </div>
            </div>

            {/* Top Ranking Section */}
            <div className="glass-panel rounded-3xl p-6 md:p-8 border border-white/10 bg-linamve-primary/60 backdrop-blur-xl shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                    <Trophy className="text-yellow-500" size={24} />
                    <h3 className="text-white font-teko text-3xl uppercase tracking-wide">Top Ranking</h3>
                    </div>
                    <Link to="/ranking" className="text-xs font-bold text-gray-400 hover:text-white uppercase tracking-widest flex items-center gap-1 transition-colors">
                    Ver Tabla <ExternalLink size={12} />
                    </Link>
                </div>

                <div className="space-y-4">
                    {topRanking.map((athlete, index) => (
                    <div key={athlete.athleteId} className="flex items-center justify-between p-3 rounded-xl bg-black/20 hover:bg-white/10 transition-colors border border-white/5">
                        <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-teko text-lg font-bold shadow-lg
                            ${index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-black' : 
                                index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-black' : 
                                'bg-gradient-to-br from-amber-700 to-amber-900 text-white'}`}>
                            {athlete.rank}
                            </div>
                            <img src={athlete.avatar} alt={athlete.athleteName} className="w-12 h-12 rounded-full object-cover border-2 border-white/10" />
                            <div>
                            <h4 className="text-white font-teko text-xl uppercase leading-none">{athlete.athleteName}</h4>
                            <span className="text-xs text-gray-400 uppercase tracking-wider font-poppins">{athlete.points} PTS</span>
                            </div>
                        </div>
                        <div className="text-gray-500">
                        <ChevronRight size={20} />
                        </div>
                    </div>
                    ))}
                </div>
            </div>
            
            {/* Forum CTA Section */}
            <div className="glass-panel rounded-3xl p-8 border border-white/10 bg-gradient-to-br from-linamve-primary/70 to-black/70 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
                <div className="absolute right-0 top-0 w-64 h-64 bg-linamve-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-linamve-accent/20 transition-all duration-700"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                    <h3 className="font-teko text-4xl md:text-5xl text-white font-bold uppercase leading-none mb-2">
                    EL TATAMI <span className="text-linamve-accent">DIGITAL</span>
                    </h3>
                    <p className="text-gray-300 font-poppins text-sm md:text-base max-w-lg">
                    Discute técnicas, analiza las nuevas reglas WKF y conecta con atletas de todo el país.
                    </p>
                </div>
                
                <Link to="/forum" className="shrink-0 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-linamve-accent text-white font-teko text-xl px-8 py-4 rounded-lg transition-all flex items-center gap-3 group/btn">
                    <MessageSquare className="text-linamve-accent group-hover/btn:scale-110 transition-transform" />
                    ENTRAR AL FORO
                    <ArrowRight size={20} className="opacity-50 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                </Link>
                </div>
            </div>

            </motion.div>

            {/* Social Feed - Versión 5.0 */}
            <div className="py-20 px-6 bg-[#0B0A11] border-t border-white/5 pb-32 md:pb-20">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                <div>
                    <h3 className="font-teko text-5xl text-white uppercase leading-none">TATAMI <span className="text-linamve-secondary">SOCIAL</span></h3>
                    <p className="text-gray-500 font-poppins text-sm max-w-md mt-2">La acción no se detiene. Contenido actualizado dinámicamente desde el panel de control.</p>
                </div>
                <a 
                    href={`https://instagram.com/${accountName.replace('@','')}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-3 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:brightness-110 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-orange-500/20 active:scale-95"
                >
                    <Instagram size={18} /> {accountName.toUpperCase()}
                </a>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12 justify-items-center min-h-[450px]">
                <AnimatePresence mode="popLayout">
                    {isLoadingSocial ? (
                    Array(3).fill(0).map((_, i) => <PostSkeleton key={i} />)
                    ) : (
                    socialPosts.map((post, index) => (
                        <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="w-full flex justify-center"
                        >
                            <div className="rounded-xl overflow-hidden shadow-2xl bg-[#0F0E17] border border-white/10 w-full max-w-[328px] min-h-[450px]">
                                <div className="w-full h-full">
                                    <InstagramEmbed 
                                        url={post.postUrl} 
                                        width="100%"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))
                    )}
                </AnimatePresence>
                </div>

                <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col items-center md:items-start">
                    <span className="text-[11px] text-gray-500 font-poppins uppercase tracking-[0.2em] mb-1">
                        Plataforma Oficial LINAMVE
                    </span>
                    <div className="flex flex-col md:flex-row items-center gap-1 md:gap-3">
                        <span className="text-[10px] text-gray-700 font-poppins uppercase tracking-widest">
                        &copy; 2026. Todos los derechos reservados.
                        </span>
                    </div>
                </div>
                
                <div className="flex items-center gap-8">
                    <Link to="/legal" className="text-[10px] text-gray-700 hover:text-gray-400 transition-colors uppercase tracking-widest">Aviso Legal</Link>
                    <Link 
                    to="/admin" 
                    className="text-gray-800 hover:text-linamve-secondary transition-colors" 
                    title="Acceso Administrativo"
                    >
                        <Lock size={16} />
                    </Link>
                </div>
                </div>
            </div>
            </div>
        </div>
      
    </div>
  );
};

export default Landing;