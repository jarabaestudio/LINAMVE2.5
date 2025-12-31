import React, { useState, useEffect } from 'react';
import { Home, Trophy, Calendar, User, Bell, LogOut, LogIn, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LinamveLogo from './LinamveLogo';
import { MOCK_ATHLETE } from '../constants'; // Usamos datos mock para previsualizar el perfil

// Componente auxiliar para Items de Navegación Inferior (Móvil)
const NavItem = ({ to, icon: Icon, label, active }: { to: string; icon: any; label: string; active: boolean }) => (
  <Link to={to} className={`flex flex-col items-center justify-end h-full pb-3 min-w-[60px] transition-colors duration-300 ${active ? 'text-linamve-secondary' : 'text-gray-500 hover:text-white'}`}>
    <motion.div
      whileTap={{ scale: 0.9 }}
      animate={active ? { y: -2 } : { y: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="flex flex-col items-center gap-1"
    >
      <Icon size={22} strokeWidth={active ? 2.5 : 2} />
      <span className="text-[9px] uppercase font-bold tracking-wider leading-none">
        {label}
      </span>
    </motion.div>
  </Link>
);

const Navbar: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  
  // Estado de Scroll
  const [scrolled, setScrolled] = useState(false);
  
  // Estado de Autenticación Simulado (Cambiar a Context en el futuro)
  const isLoggedIn = path === '/dashboard' || path === '/forum'; 

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* === 1. TOP HEADER (Identidad & Auth) - Visible en Móvil y Desktop === */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
          scrolled 
            ? 'bg-linamve-primary/90 backdrop-blur-md shadow-lg border-white/5 py-2' 
            : 'bg-transparent border-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center h-full">
            
            {/* IZQUIERDA: Identidad Visual */}
            <Link to="/" className="flex items-center gap-3 group">
               <div className={`p-1.5 rounded-lg transition-all duration-300 ${scrolled ? 'bg-transparent' : 'bg-white/5 backdrop-blur-sm'}`}>
                  <LinamveLogo className="w-8 h-8 md:w-10 md:h-10" />
               </div>
               <div className="flex flex-col">
                  <span className="font-teko text-2xl md:text-3xl font-bold tracking-widest text-white leading-none group-hover:text-linamve-accent transition-colors drop-shadow-md pt-1">
                    LINAMVE
                  </span>
                  <span className={`text-[9px] text-gray-400 font-poppins font-bold uppercase tracking-[0.2em] hidden md:block transition-opacity duration-300 ${scrolled ? 'opacity-0 h-0' : 'opacity-100'}`}>
                    Liga Nacional
                  </span>
               </div>
            </Link>

            {/* CENTRO: Navegación Principal (Solo Desktop) */}
            <nav className="hidden md:flex items-center gap-1">
               {[
                 { label: 'Inicio', path: '/' },
                 { label: 'Rankings', path: '/ranking' },
                 { label: 'Eventos', path: '/events' },
                 { label: 'Comunidad', path: '/forum' }
               ].map((item) => {
                 const isActive = path === item.path;
                 return (
                   <Link 
                     key={item.path}
                     to={item.path}
                     className={`relative px-5 py-2 font-poppins text-sm font-medium transition-all rounded-lg group ${
                       isActive ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                     }`}
                   >
                     {item.label}
                     {isActive && (
                       <motion.div 
                         layoutId="nav-underline"
                         className="absolute bottom-0 left-0 w-full h-0.5 bg-linamve-secondary shadow-[0_-2px_6px_rgba(200,84,36,0.5)]"
                       />
                     )}
                   </Link>
                 )
               })}
            </nav>

            {/* DERECHA: Acciones de Usuario */}
            <div className="flex items-center gap-4 md:gap-6">
                
                {isLoggedIn ? (
                  <>
                    <button className="relative group p-1.5 hover:bg-white/5 rounded-full transition-colors">
                       <Bell size={20} className="text-gray-300 group-hover:text-white transition-colors" />
                       <span className="absolute top-1.5 right-2 w-2 h-2 bg-linamve-secondary rounded-full border border-linamve-base animate-pulse"></span>
                    </button>

                    <div className="hidden md:block w-px h-8 bg-white/10"></div>

                    <Link to="/dashboard" className="flex items-center gap-3 group">
                       <div className="hidden md:flex flex-col items-end">
                          <span className="text-xs font-bold text-white group-hover:text-linamve-accent transition-colors">
                            {MOCK_ATHLETE.firstName} {MOCK_ATHLETE.lastName.charAt(0)}.
                          </span>
                          <span className="text-[10px] text-linamve-secondary font-bold uppercase tracking-wider">
                            CINTA {MOCK_ATHLETE.beltRank}
                          </span>
                       </div>
                       
                       <div className="relative">
                          <img 
                            src={MOCK_ATHLETE.photoUrl} 
                            alt="Profile" 
                            className="w-9 h-9 rounded-xl object-cover border-2 border-white/10 group-hover:border-linamve-secondary transition-colors shadow-lg"
                          />
                          <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-linamve-base"></div>
                       </div>
                    </Link>

                    <button className="hidden md:flex text-gray-400 hover:text-red-500 transition-colors" title="Cerrar Sesión">
                       <LogOut size={20} />
                    </button>
                  </>
                ) : (
                  <Link 
                    to="/admin" 
                    className="flex items-center gap-2 bg-white/5 hover:bg-linamve-secondary hover:text-white border border-white/10 text-white px-4 py-2 rounded-lg transition-all text-xs font-bold uppercase tracking-wider"
                  >
                    <User size={16} />
                    <span className="hidden md:inline">Ingresar</span>
                  </Link>
                )}
            </div>
        </div>
      </header>

      {/* === 2. BOTTOM NAV (Navegación Móvil) - ESTILO 5 COLUMNAS CON LOGO CENTRAL === */}
      {/* Contenedor principal con altura fija y espaciado */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 h-20 px-2 flex justify-between items-end pb-0 bg-transparent pointer-events-none">
        
        {/* Capa de fondo Glassmorphism (Pointer events auto para que sea clickeable el fondo si es necesario, pero los botones están encima) */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-[#0F0E17]/95 backdrop-blur-xl border-t border-white/10 shadow-[0_-5px_20px_rgba(0,0,0,0.5)] pointer-events-auto"></div>

        {/* Grupo Izquierda */}
        <div className="relative z-10 flex-1 flex justify-around items-end h-full pointer-events-auto pb-1">
          <NavItem to="/" icon={Home} label="Inicio" active={path === '/'} />
          <NavItem to="/ranking" icon={Trophy} label="Ranking" active={path === '/ranking'} />
        </div>

        {/* LOGO CENTRAL FLOTANTE */}
        <div className="relative z-20 -top-5 mx-1 pointer-events-auto group">
          <Link to="/">
            {/* Círculo contenedor exterior (Simula el corte en la barra) */}
            <div className="w-16 h-16 rounded-full bg-[#0F0E17] flex items-center justify-center p-1 shadow-[0_-5px_15px_rgba(0,0,0,0.3)]">
               {/* Círculo interior activo (Borde y Fondo) */}
               <motion.div 
                 whileTap={{ scale: 0.95 }}
                 className={`w-full h-full rounded-full flex items-center justify-center border-2 shadow-[0_0_20px_rgba(200,84,36,0.2)] transition-colors duration-300
                    ${path === '/' ? 'bg-[#161521] border-linamve-secondary' : 'bg-[#161521] border-white/10 hover:border-linamve-secondary/50'}`}
               >
                  <LinamveLogo className="w-9 h-9" />
               </motion.div>
            </div>
          </Link>
        </div>

        {/* Grupo Derecha */}
        <div className="relative z-10 flex-1 flex justify-around items-end h-full pointer-events-auto pb-1">
          <NavItem to="/events" icon={Calendar} label="Eventos" active={path === '/events'} />
          <NavItem to="/dashboard" icon={User} label="Perfil" active={path === '/dashboard'} />
        </div>

      </nav>
    </>
  );
};

export default Navbar;