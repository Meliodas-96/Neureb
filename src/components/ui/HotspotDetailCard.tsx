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
  Share2,
} from 'lucide-react';

export function HotspotDetailCard() {
  const selectedHotspotId = useBrainStore((state) => state.selectedHotspotId);
  const selectHotspot = useBrainStore((state) => state.selectHotspot);

  if (!selectedHotspotId) return null;

  const hotspot = HOTSPOTS_DATA.find((h) => h.id === selectedHotspotId);
  if (!hotspot) return null;

  const handleRefocus = () => {
    // Re-trigger camera focus
    selectHotspot(null);
    setTimeout(() => selectHotspot(hotspot.id), 50);
  };

  return (
    <aside className="fixed right-3 top-16 bottom-20 z-20 w-96 max-w-[calc(100vw-1.5rem)] flex flex-col rounded-2xl border border-slate-800/80 glass-panel shadow-2xl overflow-hidden pointer-events-auto transition-all animate-in fade-in slide-in-from-right duration-200">
      {/* Header with Title and System Badge */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-900/40">
        <div className="flex items-start justify-between gap-3 mb-2">
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

          <div className="flex items-center gap-1">
            <button
              onClick={handleRefocus}
              className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800/60 rounded-lg transition"
              title="Centrar cámara en esta estructura"
            >
              <Target className="w-4 h-4" />
            </button>
            <button
              onClick={() => selectHotspot(null)}
              className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 rounded-lg transition"
              title="Cerrar ficha clínica"
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
      <div className="p-3 border-t border-slate-800/80 bg-slate-900/40 flex items-center gap-2">
        <button
          onClick={handleRefocus}
          className="flex-1 py-2 px-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 font-semibold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/40"
        >
          <Target className="w-3.5 h-3.5" />
          Enfocar Estructura
        </button>
      </div>
    </aside>
  );
}
