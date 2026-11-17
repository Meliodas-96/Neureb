'use client';

import React from 'react';
import { useBrainStore } from '@/store/useBrainStore';
import { HOTSPOTS_DATA } from '@/data/hotspots';
import {
  X,
  Target,
  Stethoscope,
  Activity,
  Scissors,
  Bookmark,
  Sparkles,
  Layers,
} from 'lucide-react';

export function HotspotDetailCard() {
  const selectedHotspotId = useBrainStore((state) => state.selectedHotspotId);
  const selectHotspot = useBrainStore((state) => state.selectHotspot);
  const focusIsolationType = useBrainStore((state) => state.focusIsolationType);
  const setFocusIsolationType = useBrainStore((state) => state.setFocusIsolationType);

  if (!selectedHotspotId) return null;

  const hotspot = HOTSPOTS_DATA.find((h) => h.id === selectedHotspotId);
  if (!hotspot) return null;

  const handleRefocus = () => {
    selectHotspot(null);
    setTimeout(() => selectHotspot(hotspot.id), 50);
  };

  return (
    <aside className="fixed right-3 top-16 bottom-20 z-20 w-96 max-w-[calc(100vw-1.5rem)] flex flex-col rounded-2xl border border-slate-800/80 glass-panel shadow-2xl overflow-hidden pointer-events-auto transition-all animate-in fade-in slide-in-from-right duration-200">
      {/* Header with Title and System Badge */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-900/50">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span
              className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border"
              style={{
                backgroundColor: `${hotspot.categoryColor}15`,
                color: hotspot.categoryColor,
                borderColor: `${hotspot.categoryColor}40`,
              }}
            >
              {hotspot.system}
            </span>

            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono font-medium flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
              ZONA ENFOCADA
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleRefocus}
              className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800/60 rounded-lg transition"
              title="Centrar y reenfocar cámara"
            >
              <Target className="w-4 h-4" />
            </button>
            <button
              onClick={() => selectHotspot(null)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition"
              title="Cerrar y ver todo el cerebro"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <h3 className="text-base font-bold text-slate-100 leading-snug">
          {hotspot.title}
        </h3>
        <p className="text-xs text-slate-400 font-mono italic mt-0.5">
          {hotspot.latinTitle}
        </p>

        {/* Focus Mode Controls */}
        <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-[11px] font-medium">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            Fondo:
          </span>
          <div className="flex items-center gap-1 bg-slate-950/60 p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => setFocusIsolationType('ghost')}
              className={`px-2 py-0.5 rounded text-[10px] font-medium transition ${
                focusIsolationType === 'ghost'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Silueta Fantasma
            </button>
            <button
              onClick={() => setFocusIsolationType('isolate')}
              className={`px-2 py-0.5 rounded text-[10px] font-medium transition ${
                focusIsolationType === 'isolate'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Aislar Solo Esta
            </button>
          </div>
        </div>
      </div>

      {/* Medical Content Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {/* Anatomical Summary */}
        <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/60 text-slate-300 leading-relaxed">
          {hotspot.summary}
        </div>

        {/* Anatomical Description */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
            <Bookmark className="w-3.5 h-3.5 text-cyan-400" />
            <span>Descripción Anatómica</span>
          </div>
          <p className="text-slate-300 leading-relaxed bg-slate-900/30 p-2.5 rounded-xl border border-slate-800/40">
            {hotspot.anatomy}
          </p>
        </div>

        {/* Physiological Function */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Función Fisiológica y Territorio</span>
          </div>
          <p className="text-slate-300 leading-relaxed bg-slate-900/30 p-2.5 rounded-xl border border-slate-800/40">
            {hotspot.function}
          </p>
        </div>

        {/* Clinical Significance */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-red-400 uppercase tracking-wider">
            <Stethoscope className="w-3.5 h-3.5 text-red-400" />
            <span>Relevancia Clínica y Patología</span>
          </div>
          <p className="text-slate-300 leading-relaxed bg-red-950/20 p-2.5 rounded-xl border border-red-500/20">
            {hotspot.clinicalSignificance}
          </p>
        </div>

        {/* Surgical Notes */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-300 uppercase tracking-wider">
            <Scissors className="w-3.5 h-3.5 text-amber-300" />
            <span>Abordaje y Perlas Quirúrgicas</span>
          </div>
          <p className="text-slate-300 leading-relaxed bg-amber-950/20 p-2.5 rounded-xl border border-amber-400/20 font-mono text-[11px]">
            {hotspot.surgicalNotes}
          </p>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-900/50 flex items-center gap-2">
        <button
          onClick={handleRefocus}
          className="flex-1 py-2 px-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 font-semibold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/40"
        >
          <Target className="w-3.5 h-3.5" />
          Reenfocar
        </button>

        <button
          onClick={() => selectHotspot(null)}
          className="py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white font-medium text-xs transition flex items-center justify-center gap-1.5"
          title="Restablecer vista y ver todo el cerebro"
        >
          <X className="w-3.5 h-3.5" />
          Ver Todo
        </button>
      </div>
    </aside>
  );
}
