'use client';

import React from 'react';
import { useBrainStore } from '@/store/useBrainStore';
import { Eye, Sparkles, X } from 'lucide-react';

export function OpacityControl() {
  const cerebrumOpacity = useBrainStore((state) => state.cerebrumOpacity);
  const setCerebrumOpacity = useBrainStore((state) => state.setCerebrumOpacity);
  const isXRayMode = useBrainStore((state) => state.isXRayMode);
  const toggleXRayMode = useBrainStore((state) => state.toggleXRayMode);
  const isOpacityPanelOpen = useBrainStore((state) => state.isOpacityPanelOpen);
  const setIsOpacityPanelOpen = useBrainStore((state) => state.setIsOpacityPanelOpen);
  const setIsClippingPanelOpen = useBrainStore((state) => state.setIsClippingPanelOpen);

  return (
    <>
      {/* DESKTOP VIEW (md:flex): Full persistent clinical widget */}
      <div
        className="hidden md:flex fixed bottom-16 left-3 z-30 flex-row items-center gap-3 p-3 rounded-2xl border border-slate-800/80 bg-slate-950/98 backdrop-blur-2xl glass-panel shadow-2xl pointer-events-auto"
        role="region"
        aria-label="Control de transparencia y modo Rayos X"
      >
        {/* Quick X-Ray Toggle Button */}
        <button
          onClick={toggleXRayMode}
          className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none ${
            isXRayMode
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-lg shadow-cyan-950/50'
              : 'bg-slate-900/60 text-slate-300 border-slate-700/60 hover:border-slate-500'
          }`}
          aria-pressed={isXRayMode}
          aria-label={isXRayMode ? 'Desactivar modo Rayos X' : 'Activar modo Rayos X (22% de opacidad)'}
          title="Conmutar Modo Rayos X rápido"
        >
          <Sparkles className={`w-3.5 h-3.5 ${isXRayMode ? 'text-cyan-400 animate-spin' : 'text-slate-400'}`} />
          <span>Rayos X</span>
        </button>

        {/* Opacity Slider */}
        <div className="flex items-center gap-3 w-52">
          <label htmlFor="cerebrum-opacity-slider" className="flex items-center gap-1.5 text-xs text-slate-300 font-medium shrink-0 cursor-pointer">
            <Eye className="w-3.5 h-3.5 text-slate-400" />
            <span>Corteza:</span>
          </label>

          <input
            id="cerebrum-opacity-slider"
            type="range"
            min="0.15"
            max="1.0"
            step="0.01"
            value={cerebrumOpacity}
            onChange={(e) => setCerebrumOpacity(parseFloat(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
            aria-label="Deslizador de opacidad de la corteza cerebral"
            aria-valuemin={15}
            aria-valuemax={100}
            aria-valuenow={Math.round(cerebrumOpacity * 100)}
            title={`Opacidad corteza: ${(cerebrumOpacity * 100).toFixed(0)}%`}
          />

          <span className="text-[11px] font-mono font-semibold text-cyan-400 w-9 text-right shrink-0" aria-live="polite">
            {(cerebrumOpacity * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      {/* MOBILE VIEW (md:hidden): Compact pill with popover */}
      <div className="md:hidden fixed bottom-14 left-[6.8rem] z-30 pointer-events-auto">
        <button
          onClick={() => {
            const next = !isOpacityPanelOpen;
            setIsOpacityPanelOpen(next);
            if (next) setIsClippingPanelOpen(false);
          }}
          className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-xl border transition shadow-lg flex items-center gap-1.5 ${
            isXRayMode || isOpacityPanelOpen
              ? 'bg-cyan-950/80 border-cyan-400/60 text-cyan-300 shadow-cyan-950/50'
              : 'bg-slate-950/90 border-slate-800 text-slate-300 hover:text-white'
          }`}
          aria-label="Ajustar transparencia de la corteza"
          title="Transparencia de la corteza"
        >
          <Sparkles className={`w-3.5 h-3.5 ${isXRayMode ? 'text-cyan-400' : 'text-slate-400'}`} />
          <span>Corteza</span>
          <span className="text-[10px] font-mono text-cyan-400">
            {(cerebrumOpacity * 100).toFixed(0)}%
          </span>
        </button>

        {isOpacityPanelOpen && (
          <div className="absolute left-[-5.5rem] bottom-11 w-64 p-3.5 rounded-2xl border border-slate-800/90 bg-slate-950/98 backdrop-blur-2xl shadow-2xl glass-panel text-xs animate-in fade-in slide-in-from-bottom-2 duration-150">
            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-800">
              <span className="font-bold text-slate-100 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                Opacidad Corteza
              </span>
              <button
                onClick={() => setIsOpacityPanelOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-between mb-3">
              <button
                onClick={toggleXRayMode}
                className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 border transition ${
                  isXRayMode
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-sm'
                    : 'bg-slate-900 border-slate-700 text-slate-300'
                }`}
              >
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>{isXRayMode ? 'Modo Rayos X (Activo)' : 'Activar Modo Rayos X'}</span>
              </button>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Nivel de opacidad:</span>
                <span className="font-mono text-cyan-400 font-bold">{(cerebrumOpacity * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.15"
                max="1.0"
                step="0.01"
                value={cerebrumOpacity}
                onChange={(e) => setCerebrumOpacity(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}