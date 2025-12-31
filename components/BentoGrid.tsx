import React from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip } from 'recharts';
import { Clock, TrendingUp, ShieldAlert } from 'lucide-react';
import { AVERAGE_HISTORY, MOCK_ATHLETE, CATEGORY_MAP } from '../constants';

const BentoGrid: React.FC = () => {
  // Logic to determine best ranking position to display as highlight
  // Sort performances by rank (ascending) so #1 comes first
  const sortedPerformances = [...MOCK_ATHLETE.performances].sort((a, b) => a.rank - b.rank);
  const bestPerformance = sortedPerformances[0];
  const bestCategoryLabel = CATEGORY_MAP[bestPerformance.categoryCode]?.label || bestPerformance.categoryCode;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      
      {/* Module 1: Next Tournament (Large) */}
      <div className="md:col-span-2 glass-panel rounded-2xl p-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
           <Clock size={100} />
        </div>
        <h3 className="text-linamve-accent font-teko text-2xl mb-1">PRÓXIMO EVENTO</h3>
        <h2 className="text-white font-teko text-4xl md:text-5xl font-bold mb-4">COPA COBRA 2026</h2>
        <div className="flex gap-4 mb-4">
           <div className="bg-linamve-base/50 px-4 py-2 rounded-lg border border-white/10">
              <span className="block text-2xl font-bold font-teko">15</span>
              <span className="text-xs text-gray-400 uppercase">Días</span>
           </div>
           <div className="bg-linamve-base/50 px-4 py-2 rounded-lg border border-white/10">
              <span className="block text-2xl font-bold font-teko">08</span>
              <span className="text-xs text-gray-400 uppercase">Hrs</span>
           </div>
        </div>
        <button className="bg-linamve-secondary hover:brightness-110 text-white font-teko uppercase text-xl px-6 py-2 rounded-md transition-all shadow-[0_0_15px_rgba(200,84,36,0.4)]">
          Inscribirse Ahora
        </button>
      </div>

      {/* Module 2: Current Rank (Square) - Shows Best Rank */}
      <div className="glass-panel rounded-2xl p-6 flex flex-col justify-center items-center relative">
        <div className="absolute top-2 right-2">
            <TrendingUp className="text-green-400" size={24} />
        </div>
        <h3 className="text-gray-400 text-xs font-poppins uppercase tracking-widest mb-2 text-center">MEJOR RANKING</h3>
        <div className="text-7xl font-teko font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
          #{bestPerformance.rank}
        </div>
        <span className="text-linamve-secondary font-teko text-lg text-center leading-tight mt-1 px-2 border border-linamve-secondary/30 rounded">
          {bestCategoryLabel.toUpperCase()}
        </span>
        <div className="text-[10px] text-gray-500 mt-2 font-poppins bg-white/5 px-2 rounded-full">
            Categoría {bestPerformance.ageGroup}
        </div>
      </div>

      {/* Module 3: Average Stats (Rectangular - Sparkline) */}
      <div className="md:col-span-3 glass-panel rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-linamve-accent font-teko text-2xl">AVERAGE (Rendimiento)</h3>
            <p className="text-xs text-gray-400">Eficiencia Ofensiva vs Defensiva</p>
          </div>
          <div className="text-right">
             <span className="text-3xl font-bold text-green-400 font-teko">{MOCK_ATHLETE.average}</span>
             <span className="block text-[10px] text-gray-500 uppercase">Nivel: Dominante</span>
          </div>
        </div>
        
        <div className="h-32 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={AVERAGE_HISTORY}>
              <Tooltip 
                contentStyle={{ backgroundColor: '#0F0E17', border: '1px solid #333' }}
                itemStyle={{ color: '#FF8906', fontFamily: 'Teko' }}
              />
              <YAxis hide domain={[-1, 1]} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#FF8906" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#0F0E17', strokeWidth: 2 }}
                activeDot={{ r: 6, fill: '#C85424' }} 
              />
              {/* Reference line for 0 */}
              <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#333" strokeDasharray="3 3" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default BentoGrid;