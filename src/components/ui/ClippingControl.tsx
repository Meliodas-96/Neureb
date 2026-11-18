'use client';

import React from 'react';
import { useBrainStore } from '@/store/useBrainStore';
import { Scissors, RotateCcw, Sliders, Check } from 'lucide-react';

export function ClippingControl() {
  const clippingAxis = useBrainStore((state) => state.clippingAxis);
  const setClippingAxis = useBrainStore((state) => state.setClippingAxis);
  const clippingOffset = useBrainStore((state) => state.clippingOffset);
  const setClippingOffset = useBrainStore((state) => state.setClippingOffset);
  const isClippingPanelOpen = useBrainStore((state) => state.isClippingPanelOpen);
  const setIsClippingPanelOpen = useBrainStore((state) => state.setIsClippingPanelOpen);

  const axes = [
    { id: 'none', label: 'Sin Corte' },
    { id: 'sagittal', label: 'Sagital (Medial)' },
    { id: 'coronal', label: 'Coronal (Frontal)' },
    { id: 'axial', label: 'Axial (Horizontal)' },
  ] as const;

  return (
    <div className="fixed left-3 bottom-24 z-30 pointer-events-auto">
      {/* Toggle button */}
      <button
        onClick={() => setIsClippingPanelOpen(!isClippingPanelOpen)}
        className={`px-3 py-2 rounded-xl text-xs font-semibold backdrop-blur-xl border transition shadow-lg flex items-center gap-2 ${
          clippingAxis !== 'none'
            ? 'bg-amber-950/60 border-amber-500/50 text-amber-300 shadow-amber-950/40'
            : isClippingPanelOpen
            ? 'bg-slate-900 border-cyan-500/50 text-cyan-300'
            : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-900/90'
        }`}
        aria-label="Abrir panel de planos de corte anatómicos"
        title="Planos de corte anatómicos en tiempo real"
      >
        <Scissors className={`w-3.5 h-3.5 ${clippingAxis !== 'none' ? 'text-amber-400 rotate-90' : 'text-cyan-400'}`} />
        <span>Cortes 3D</span>
        {clippingAxis !== 'none' && (
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        )}
      </button>

      {/* Popover Panel */}
      {isClippingPanelOpen && (
        <div className="absolute left-0 bottom-12 w-72 p-3.5 rounded-2xl border border-slate-800/90 bg-slate-950/98 backdrop-blur-2xl shadow-2xl glass-panel text-xs animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-1.5 font-bold text-slate-100">
              <Scissors className="w-4 h-4 text-cyan-400" />
              <span>Planos de Corte 3D</span>
            </div>
            {clippingAxis !== 'none' && (
              <button
                onClick={() => {
                  setClippingAxis('none');
                  setClippingOffset(0);
                }}
                className="text-[10px] text-amber-400 hover:text-amber-300 flex items-center gap-1 transition"
                title="Restablecer cortes"
              >
                <RotateCcw className="w-3 h-3" />
                Desactivar
              </button>
            )}
          </div>

          {/* Plane Selector Buttons */}
          <div className="grid grid-cols-2 gap-1.5 mb-3">
            {axes.map((axis) => {
              const isActive = clippingAxis === axis.id;
              return (
                <button
                  key={axis.id}
                  onClick={() => setClippingAxis(axis.id)}
                  className={`p-2 rounded-lg text-left text-[11px] font-medium transition flex items-center justify-between border ${
                    isActive
                      ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-200'
                      : 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <span>{axis.label}</span>
                  {isActive && <Check className="w-3 h-3 text-cyan-400" />}
                </button>
              );
            })}
          </div>

          {/* Depth Slider (active only when a plane is selected) */}
          {clippingAxis !== 'none' && (
            <div className="pt-2 border-t border-slate-800/60 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Sliders className="w-3 h-3 text-slate-400" />
                  Profundidad de corte:
                </span>
                <span className="font-mono text-cyan-300 text-[10px]">
                  {clippingOffset > 0 ? `+${clippingOffset.toFixed(2)}` : clippingOffset.toFixed(2)}
                </span>
              </div>

              <input
                type="range"
                min="-0.35"
                max="0.35"
                step="0.01"
                value={clippingOffset}
                onChange={(e) => setClippingOffset(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
              />

              <div className="flex justify-between items-center pt-1 text-[10px]">
                <button
                  onClick={() => setClippingOffset(0)}
                  className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
                >
                  Centrar plano (0.00)
                </button>
                <span className="text-slate-400 italic">
                  {clippingAxis === 'sagittal'
                    ? 'Cara Medial / Tronco'
                    : clippingAxis === 'coronal'
                    ? 'Corte Frontal'
                    : 'Corte Horizontal'}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
