'use client';

import React from 'react';
import { useBrainStore } from '@/store/useBrainStore';
import { Eye, Sparkles } from 'lucide-react';

export function OpacityControl() {
  const cerebrumOpacity = useBrainStore((state) => state.cerebrumOpacity);
  const setCerebrumOpacity = useBrainStore((state) => state.setCerebrumOpacity);
  const isXRayMode = useBrainStore((state) => state.isXRayMode);
  const toggleXRayMode = useBrainStore((state) => state.toggleXRayMode);

  return (
    <div className="fixed bottom-20 left-3 z-20 flex flex-col sm:flex-row items-center gap-3 p-3 rounded-2xl border border-slate-800/80 glass-panel shadow-2xl pointer-events-auto">
      {/* Quick X-Ray Toggle Button */}
      <button
        onClick={toggleXRayMode}
        className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
          isXRayMode
            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-lg shadow-cyan-950/50'
            : 'bg-slate-900/60 text-slate-300 border-slate-700/60 hover:border-slate-500'
        }`}
        title="Conmutar Modo Rayos X rápido"
      >
        <Sparkles className={`w-3.5 h-3.5 ${isXRayMode ? 'text-cyan-400 animate-spin' : 'text-slate-400'}`} />
        <span>Rayos X</span>
      </button>

      {/* Opacity Slider */}
      <div className="flex items-center gap-3 w-48 sm:w-56">
        <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium shrink-0">
          <Eye className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">Corteza:</span>
        </div>

        <input
          type="range"
          min="0.15"
          max="1.0"
          step="0.01"
          value={cerebrumOpacity}
          onChange={(e) => setCerebrumOpacity(parseFloat(e.target.value))}
          className="w-full accent-cyan-400 cursor-pointer"
          title={`Opacidad corteza: ${(cerebrumOpacity * 100).toFixed(0)}%`}
        />

        <span className="text-[11px] font-mono font-semibold text-cyan-400 w-9 text-right shrink-0">
          {(cerebrumOpacity * 100).toFixed(0)}%
        </span>
      </div>
    </div>
  );
}
