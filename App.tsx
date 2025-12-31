import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Landing } from './pages/Landing';
import Ranking from './pages/Ranking';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Forum from './pages/Forum';
import Admin from './pages/Admin';

// Helper to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="bg-linamve-base min-h-screen text-white selection:bg-linamve-secondary selection:text-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/events" element={<Events />} />
            <Route path="/forum" element={<Forum />} />
            {/* Ruta oculta de Administración */}
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;