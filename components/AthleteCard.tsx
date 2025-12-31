import React from 'react';
import { Athlete } from '../types';
import { CATEGORY_MAP } from '../constants';
import { Trophy, Target, Shield } from 'lucide-react';

interface Props {
  athlete: Athlete;
}

const AthleteCard: React.FC<Props> = ({ athlete }) => {
  // Calculate total points for display summary
  const totalPoints = athlete.performances.reduce((acc, curr) => acc + curr.points, 0);

  return (
    <div className="relative w-full max-w-sm mx-auto group perspective">
      {/* Card Container - Fixed tall height for "Trading Card" feel */}
      <div className="relative glass-panel rounded-xl overflow-hidden transition-all duration-500 transform group-hover:-translate-y-2 group-hover:shadow-[0_0_20px_rgba(200,84,36,0.4)] h-[28rem] flex flex-col justify-end">
        
        {/* Background Photo */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={athlete.photoUrl} 
            alt={`${athlete.firstName} ${athlete.lastName}`} 
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
          />
          {/* Enhanced Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-linamve-base via-linamve-base/80 to-transparent via-50%"></div>
        </div>

        {/* Top Right Badges (Belt & Age) */}
        <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-1">
          <div className="bg-black/50 backdrop-blur border border-white/10 px-3 py-1 rounded text-xs font-teko uppercase tracking-widest text-white shadow-lg">
            CINTURÓN {athlete.beltRank}
          </div>
          <div className="bg-linamve-secondary/80 backdrop-blur border border-white/10 px-2 py-0.5 rounded text-[10px] font-poppins font-bold uppercase tracking-wider text-white shadow-md">
            {athlete.ageLabel}
          </div>
        </div>

        {/* Content Section */}
        <div className="relative z-10 w-full p-4">
          <div className="mb-3">
            <h2 className="font-teko text-4xl font-bold leading-none uppercase text-white drop-shadow-lg">
              {athlete.firstName} <span className="text-linamve-accent">{athlete.lastName}</span>
            </h2>
            
            {/* Team Display (Only if exists) */}
            {athlete.team && (
              <p className="font-teko text-xl text-linamve-secondary uppercase tracking-wide leading-none mb-1">
                {athlete.team}
              </p>
            )}
            
            {/* Academy removed from here as requested */}
          </div>

          {/* Performance Table - Optimized Grid (No Age Column) */}
          <div className="bg-black/60 rounded-lg p-2 border border-white/10 backdrop-blur-md shadow-lg">
            {/* Header */}
            <div className="grid grid-cols-12 text-[9px] text-gray-400 uppercase tracking-wider mb-2 px-1 border-b border-white/10 pb-1 font-bold">
              <div className="col-span-9">Categoría</div>
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-2 text-right">Pts</div>
            </div>
            
            {/* Rows */}
            <div className="space-y-1.5 max-h-[160px] overflow-y-auto no-scrollbar">
              {athlete.performances.map((perf) => {
                const cat = CATEGORY_MAP[perf.categoryCode];
                const icon = cat?.type === 'combat' ? <Shield size={10} /> : <Target size={10} />;
                
                return (
                  <div key={perf.categoryCode} className="grid grid-cols-12 items-center text-xs text-gray-200 px-1 py-1 hover:bg-white/5 rounded transition group/row">
                    
                    {/* Category Name - Expanded space */}
                    <div className="col-span-9 flex items-start gap-1.5 font-medium pr-1">
                      <span className="text-linamve-secondary mt-0.5 shrink-0">{icon}</span>
                      <span className="leading-tight text-[11px] line-clamp-2">
                        {cat ? cat.label : perf.categoryCode}
                      </span>
                    </div>

                    {/* Rank */}
                    <div className="col-span-1 text-center font-teko text-base leading-none self-center">
                      <span className={perf.rank === 1 ? 'text-yellow-400 font-bold' : perf.rank <= 3 ? 'text-gray-300' : 'text-gray-500'}>
                        {perf.rank}
                      </span>
                    </div>

                    {/* Points */}
                    <div className="col-span-2 text-right font-teko text-linamve-accent self-center">
                      {perf.points}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="mt-3 flex justify-between items-center px-1 pt-2 border-t border-white/5">
             <span className="text-[10px] text-gray-500 uppercase tracking-widest">Total Temporada</span>
             <span className="font-teko text-2xl text-white drop-shadow-md">{totalPoints} PTS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AthleteCard;