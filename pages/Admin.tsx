import React, { useState, useEffect } from 'react';
import { SocialConfig, SocialPost, Tournament } from '../types';
import { fetchSocialFeed, updateSocialFeed, createEvent, uploadResultsCSV } from '../services/api';
import { Trash2, Plus, Save, Lock, Calendar, Upload, Instagram, MapPin, Layers, ExternalLink, RefreshCw, AlertCircle, CheckCircle2, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

type Tab = 'social' | 'events' | 'results';

const DEFAULT_POSTS: SocialPost[] = [
  { id: 'def1', postUrl: 'https://www.instagram.com/p/DGj8m9qTG_0/' },
  { id: 'def2', postUrl: 'https://www.instagram.com/p/DGlx6mAzJtW/' },
  { id: 'def3', postUrl: 'https://www.instagram.com/p/DGbN_lTz1e2/' }
];

const VZLA_PREFIXES = ['0412', '0414', '0424', '0416', '0426', '0422'];

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('social');
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // --- SOCIAL STATE ---
  const [socialConfig, setSocialConfig] = useState<SocialConfig>({ accountName: '@LINAMVEOFFICIAL', posts: DEFAULT_POSTS });
  const [newPostUrl, setNewPostUrl] = useState('');

  // Event State updated with contact fields
  const [newEvent, setNewEvent] = useState<Partial<Tournament>>({
    name: '',
    date: '',
    location: '',
    type: '3A', // Default Safe Value
    phone: '',
    email: '',
    whatsapp: '',
    website: ''
  });

  // --- PHONE FORMATTING STATE ---
  const [waPrefix, setWaPrefix] = useState('0412');
  const [waBody, setWaBody] = useState('');
  const [phPrefix, setPhPrefix] = useState('0412');
  const [phBody, setPhBody] = useState('');

  const [targetTournamentId, setTargetTournamentId] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      loadSocialData();
    }
  }, [isAuthenticated]);

  // Sync Phone States to newEvent Object automatically
  useEffect(() => {
    const formatVenezuelanNumber = (prefix: string, body: string) => {
        if (!body || body.length < 7) return '';
        // Convert '0412' -> '412' and add +58
        const cleanPrefix = prefix.substring(1); 
        return `+58 ${cleanPrefix} ${body}`;
    };

    setNewEvent(prev => ({
        ...prev,
        whatsapp: formatVenezuelanNumber(waPrefix, waBody),
        phone: formatVenezuelanNumber(phPrefix, phBody)
    }));
  }, [waPrefix, waBody, phPrefix, phBody]);

  const loadSocialData = async () => {
    setLoading(true);
    try {
      const data = await fetchSocialFeed();
      if (data && data.posts && data.posts.length > 0) {
        setSocialConfig(data);
      } else {
        console.warn("Server social feed empty, staying with current/default data.");
      }
    } catch (e) {
      console.error("Error loading social feed", e);
    }
    setLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'LINAMVE2026') { 
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Contraseña incorrecta');
      if (navigator.vibrate) navigator.vibrate(200);
    }
  };

  // --- SOCIAL LOGIC ---
  const validateInstagramUrl = (url: string) => {
    const regex = /^(https?:\/\/)?(www\.)?instagram\.com\/(p|reel)\/[\w-]+\/?(\?.*)?$/;
    return regex.test(url);
  };

  const handleAddPost = () => {
    if (!newPostUrl) return;
    
    let cleanUrl = newPostUrl.split('?')[0].trim();
    if (cleanUrl.endsWith('/')) cleanUrl = cleanUrl.slice(0, -1);

    if (!validateInstagramUrl(cleanUrl)) {
        setStatusMsg("Error: La URL debe ser de Instagram (/p/ o /reel/)");
        setTimeout(() => setStatusMsg(''), 4000);
        return;
    }

    if (socialConfig.posts.length >= 3) {
        setStatusMsg("Error: Máximo 3 posts permitidos");
        setTimeout(() => setStatusMsg(''), 3000);
        return;
    }

    const post: SocialPost = {
        id: Date.now().toString(),
        postUrl: cleanUrl
    };
    
    setSocialConfig(prev => ({ ...prev, posts: [...prev.posts, post] }));
    setNewPostUrl('');
  };

  const resetToDefaults = () => {
      setSocialConfig({
          accountName: '@LINAMVEOFFICIAL',
          posts: [...DEFAULT_POSTS]
      });
      setStatusMsg("Restaurado a valores por defecto (Sin guardar aún)");
      setTimeout(() => setStatusMsg(''), 3000);
  };

  const deletePost = (id: string) => {
    setSocialConfig(prev => ({
        ...prev,
        posts: prev.posts.filter(p => p.id !== id)
    }));
  };

  const saveSocial = async () => {
    if (socialConfig.posts.length === 0) {
        if (!confirm("¿Deseas guardar una lista vacía? Esto borrará los videos de la Landing.")) return;
    }

    setLoading(true);
    try {
        const result = await updateSocialFeed(socialConfig);
        setLoading(false);
        if (result.success) {
            setStatusMsg(`Éxito: ${result.message}`);
            // Recargar datos para confirmar persistencia
            setTimeout(loadSocialData, 1000);
        } else {
            setStatusMsg(`Error: ${result.message}`);
        }
    } catch (err) {
        setLoading(false);
        setStatusMsg("Error crítico al intentar guardar.");
    }
    setTimeout(() => setStatusMsg(''), 4000);
  };

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
      // Allow only numbers and max 7 chars
      const val = e.target.value.replace(/\D/g, '').slice(0, 7);
      setter(val);
  };

  const createNewEvent = async () => {
    if (!newEvent.name || !newEvent.date || !newEvent.location) {
      setStatusMsg("Error: Nombre, Fecha y Ubicación son obligatorios");
      return;
    }
    setLoading(true);
    try {
      const result = await createEvent(newEvent);
      if (result.success) {
        setStatusMsg(`Éxito: ${result.message}`);
        setNewEvent({ 
            name: '', date: '', location: '', type: '3A',
            phone: '', email: '', whatsapp: '', website: ''
        });
        // Reset local phone states
        setWaBody('');
        setPhBody('');
        setWaPrefix('0412');
        setPhPrefix('0412');
      } else {
        setStatusMsg(`Error: ${result.message}`);
      }
    } catch (err) {
      setStatusMsg("Error al crear evento");
    } finally {
      setLoading(false);
      setTimeout(() => setStatusMsg(''), 4000);
    }
  };

  const uploadResults = async () => {
    if (!targetTournamentId || !selectedFile) {
      setStatusMsg("Error: ID de torneo y archivo CSV requeridos");
      return;
    }
    setLoading(true);
    try {
      const result = await uploadResultsCSV(Number(targetTournamentId), selectedFile);
      if (result.success) {
        setStatusMsg(`Éxito: ${result.message}`);
        setSelectedFile(null);
        setTargetTournamentId('');
      } else {
        setStatusMsg(`Error: ${result.message}`);
      }
    } catch (err) {
      setStatusMsg("Error al subir resultados");
    } finally {
      setLoading(false);
      setTimeout(() => setStatusMsg(''), 4000);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-4">
        <div className="glass-panel p-8 rounded-xl max-w-md w-full text-center">
          <Lock size={48} className="mx-auto text-linamve-secondary mb-4" />
          <h2 className="text-2xl font-teko text-white mb-6 uppercase tracking-wider">PANEL DE CONTROL</h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input 
              type="password" 
              value={password}
              onChange={(e) => {
                  setPassword(e.target.value);
                  if (loginError) setLoginError('');
              }}
              placeholder="Contraseña Maestra"
              className={`bg-black/50 border text-white px-4 py-2 rounded outline-none transition-colors ${loginError ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-linamve-secondary'}`}
            />
            {loginError && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-2 text-red-400 text-sm font-bold bg-red-900/20 p-2 rounded border border-red-900/50">
                    <AlertCircle size={16} /> {loginError}
                </motion.div>
            )}
            <button type="submit" className="bg-linamve-secondary text-white font-teko text-xl py-2 rounded hover:brightness-110 active:scale-95 transition-all">
              INGRESAR
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12 px-2 md:px-4 max-w-6xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-gray-800 pb-4 gap-4">
        <h1 className="font-teko text-4xl text-white">ADMINISTRACIÓN LINAMVE</h1>
        <div className="flex bg-black/40 p-1 rounded-lg border border-white/10">
            {(['social', 'events', 'results'] as Tab[]).map((tab) => (
                <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded flex items-center gap-2 font-teko text-lg transition-all ${activeTab === tab ? 'bg-linamve-secondary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                >
                    {tab === 'social' && <Instagram size={18} />}
                    {tab === 'events' && <Calendar size={18} />}
                    {tab === 'results' && <Upload size={18} />}
                    {tab.toUpperCase()}
                </button>
            ))}
        </div>
      </div>

      {statusMsg && (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className={`mb-6 p-4 rounded-lg flex items-center justify-center gap-3 font-bold border ${statusMsg.includes('Error') ? 'bg-red-500/20 border-red-500 text-red-300' : 'bg-green-500/20 border-green-500 text-green-300'}`}
        >
          {statusMsg.includes('Error') ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
          {statusMsg}
        </motion.div>
      )}

      <div className="min-h-[400px]">
        {activeTab === 'social' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="glass-panel p-6 rounded-xl border border-white/10">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                             <h3 className="text-white font-teko text-2xl flex items-center gap-2"><Instagram className="text-pink-500"/> Gestión de Instagram</h3>
                             <p className="text-gray-400 text-xs mt-1">Sincronización directa con el archivo JSON del servidor.</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={loadSocialData} className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1 rounded text-gray-300 flex items-center gap-1 transition-colors">
                                <RefreshCw size={12} className={loading ? 'animate-spin' : ''}/> Sincronizar
                            </button>
                            <button onClick={resetToDefaults} className="text-xs bg-red-900/10 hover:bg-red-900/20 border border-red-900/30 px-3 py-1 rounded text-red-300 flex items-center gap-1 transition-colors">
                                <RotateCcw size={12}/> Reset Defaults
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-2 mb-4">
                        <input 
                            type="text" 
                            value={newPostUrl}
                            onChange={(e) => setNewPostUrl(e.target.value)}
                            placeholder="Pega link de Post o Reel aquí..."
                            className="flex-1 bg-black/50 border border-white/10 text-white px-4 py-3 rounded outline-none focus:border-linamve-secondary transition-all"
                        />
                        <button onClick={handleAddPost} className="bg-white/10 hover:bg-white/20 text-white px-4 rounded border border-white/10 active:scale-95 transition-all">
                            <Plus />
                        </button>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                        {socialConfig.posts.map((post, idx) => (
                            <div key={post.id} className="flex justify-between items-center bg-black/30 p-3 rounded border border-white/5 group/row">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <span className="text-linamve-secondary font-teko text-xl">#{idx + 1}</span>
                                    <span className="text-xs text-gray-400 truncate max-w-[200px] md:max-w-md">{post.postUrl}</span>
                                </div>
                                <button onClick={() => deletePost(post.id)} className="text-red-500 hover:text-red-400 p-2"><Trash2 size={16} /></button>
                            </div>
                        ))}
                        {socialConfig.posts.length === 0 && (
                            <div className="text-center py-10 border border-dashed border-white/10 rounded-lg">
                                <p className="text-gray-500 text-sm">Lista vacía. Pulsa "Sincronizar" o "Reset Defaults".</p>
                            </div>
                        )}
                    </div>

                    <button onClick={saveSocial} disabled={loading} className="w-full bg-linamve-secondary py-3 rounded text-white font-teko text-xl hover:brightness-110 disabled:opacity-50 shadow-lg transition-all flex items-center justify-center gap-2">
                        {loading ? <RefreshCw size={20} className="animate-spin" /> : <Save size={20} />}
                        {loading ? 'GUARDANDO...' : 'GUARDAR CAMBIOS EN SERVIDOR'}
                    </button>
                </div>
            </motion.div>
        )}

        {activeTab === 'events' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="glass-panel p-6 rounded-xl border border-white/10">
                    <h3 className="text-white font-teko text-2xl mb-6 flex items-center gap-2"><Calendar className="text-blue-500"/> Crear Nuevo Torneo</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="text-xs text-gray-400 uppercase font-bold">Nombre del Evento *</label>
                            <input type="text" value={newEvent.name} onChange={e => setNewEvent({...newEvent, name: e.target.value})} className="w-full bg-black/50 border border-white/10 text-white p-3 rounded mt-1 outline-none focus:border-linamve-secondary"/>
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 uppercase font-bold">Fecha *</label>
                            <input type="date" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} className="w-full bg-black/50 border border-white/10 text-white p-3 rounded mt-1 outline-none focus:border-linamve-secondary"/>
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 uppercase font-bold">Ubicación *</label>
                            <input type="text" value={newEvent.location} onChange={e => setNewEvent({...newEvent, location: e.target.value})} className="w-full bg-black/50 border border-white/10 text-white p-3 rounded mt-1 outline-none focus:border-linamve-secondary"/>
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 uppercase font-bold">Tipo (Tier) *</label>
                            {/* SELECTOR SIMPLIFICADO SOLICITADO */}
                            <select 
                                value={newEvent.type} 
                                onChange={e => setNewEvent({...newEvent, type: e.target.value as any})} 
                                className="w-full bg-black/50 border border-white/10 text-white p-3 rounded mt-1 outline-none focus:border-linamve-secondary"
                            >
                                <option value="3A">3A</option>
                                <option value="4A">4A</option>
                                <option value="5A">5A</option>
                            </select>
                        </div>
                    </div>

                    {/* NUEVOS CAMPOS DE CONTACTO */}
                    <div className="mt-6 mb-2 text-xs text-linamve-secondary font-bold uppercase tracking-widest border-b border-white/10 pb-1">Información de Contacto (Opcional)</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        
                        {/* WHATSAPP CON FORMATO INTELIGENTE */}
                        <div>
                            <label className="text-xs text-gray-400 uppercase font-bold">WhatsApp</label>
                            <div className="flex gap-2 mt-1">
                                <select 
                                    value={waPrefix} 
                                    onChange={(e) => setWaPrefix(e.target.value)}
                                    className="w-24 bg-black/50 border border-white/10 text-white p-3 rounded outline-none focus:border-linamve-secondary font-mono"
                                >
                                    {VZLA_PREFIXES.map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                                <input 
                                    type="text" 
                                    placeholder="1234567" 
                                    maxLength={7}
                                    value={waBody} 
                                    onChange={(e) => handlePhoneInput(e, setWaBody)} 
                                    className="flex-1 bg-black/50 border border-white/10 text-white p-3 rounded outline-none focus:border-linamve-secondary font-mono tracking-wider"
                                />
                            </div>
                        </div>

                        {/* SITIO WEB (Sin cambios) */}
                        <div>
                            <label className="text-xs text-gray-400 uppercase font-bold">Sitio Web / Info</label>
                            <input type="url" placeholder="https://..." value={newEvent.website || ''} onChange={e => setNewEvent({...newEvent, website: e.target.value})} className="w-full bg-black/50 border border-white/10 text-white p-3 rounded mt-1 outline-none focus:border-linamve-secondary"/>
                        </div>

                         {/* EMAIL (Sin cambios) */}
                        <div>
                            <label className="text-xs text-gray-400 uppercase font-bold">Email</label>
                            <input type="email" placeholder="contacto@evento.com" value={newEvent.email || ''} onChange={e => setNewEvent({...newEvent, email: e.target.value})} className="w-full bg-black/50 border border-white/10 text-white p-3 rounded mt-1 outline-none focus:border-linamve-secondary"/>
                        </div>

                        {/* TELEFONO CON FORMATO INTELIGENTE */}
                        <div>
                            <label className="text-xs text-gray-400 uppercase font-bold">Teléfono (Llamadas)</label>
                            <div className="flex gap-2 mt-1">
                                <select 
                                    value={phPrefix} 
                                    onChange={(e) => setPhPrefix(e.target.value)}
                                    className="w-24 bg-black/50 border border-white/10 text-white p-3 rounded outline-none focus:border-linamve-secondary font-mono"
                                >
                                    {VZLA_PREFIXES.map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                                <input 
                                    type="text" 
                                    placeholder="1234567" 
                                    maxLength={7}
                                    value={phBody} 
                                    onChange={(e) => handlePhoneInput(e, setPhBody)} 
                                    className="flex-1 bg-black/50 border border-white/10 text-white p-3 rounded outline-none focus:border-linamve-secondary font-mono tracking-wider"
                                />
                            </div>
                        </div>
                    </div>

                    <button onClick={createNewEvent} disabled={loading} className="w-full bg-green-600 hover:bg-green-500 py-3 rounded text-white font-teko text-xl disabled:opacity-50 transition-all shadow-lg shadow-green-900/20">
                        {loading ? 'CREANDO...' : 'AGREGAR AL CALENDARIO'}
                    </button>
                </div>
            </motion.div>
        )}

        {activeTab === 'results' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="glass-panel p-6 rounded-xl border border-white/10">
                    <h3 className="text-white font-teko text-2xl mb-6 flex items-center gap-2"><Upload className="text-yellow-500"/> Cargar Resultados (CSV)</h3>
                    <div className="space-y-4">
                        <input type="number" placeholder="ID del Torneo" value={targetTournamentId} onChange={e => setTargetTournamentId(e.target.value)} className="w-full bg-black/50 border border-white/10 text-white p-3 rounded outline-none"/>
                        <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-linamve-secondary transition-all cursor-pointer relative">
                            <input type="file" accept=".csv" onChange={e => setSelectedFile(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
                            <Upload className="mx-auto text-gray-500 mb-2" size={32} />
                            <p className="text-gray-300">{selectedFile ? selectedFile.name : "Click para seleccionar archivo CSV"}</p>
                        </div>
                        <button onClick={uploadResults} disabled={loading} className="w-full bg-linamve-secondary py-3 rounded text-white font-teko text-xl hover:brightness-110 disabled:opacity-50 transition-all">
                            {loading ? 'PROCESANDO...' : 'SUBIR PUNTUACIONES'}
                        </button>
                    </div>
                </div>
            </motion.div>
        )}
      </div>
    </div>
  );
};

export default Admin;