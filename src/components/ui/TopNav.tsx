'use client';

import React from 'react';
import { useBrainStore } from '@/store/useBrainStore';
import {
  RotateCw,
  Box,
  Camera,
  RotateCcw,
  Layers,
  Activity,
} from 'lucide-react';

interface TopNavProps {
  onToggleLayerPanel: () => void;
  isLayerPanelOpen: boolean;
}

export function TopNav({ onToggleLayerPanel, isLayerPanelOpen }: TopNavProps) {
  const autoRotate = useBrainStore((state) => state.autoRotate);
  const toggleAutoRotate = useBrainStore((state) => state.toggleAutoRotate);
  const wireframe = useBrainStore((state) => state.wireframe);
  const toggleWireframe = useBrainStore((state) => state.toggleWireframe);
  const resetView = useBrainStore((state) => state.resetView);

  const handleCaptureScreenshot = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    // Trigger render frame download
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `neureb-neuroanatomy-${new Date().toISOString().slice(0, 10)}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <header className="fixed top-3 left-3 right-3 z-30 flex items-center justify-between pointer-events-none">
      {/* Brand & Anatomical Identifier */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <button
          onClick={onToggleLayerPanel}
          className={`px-3 py-2 rounded-xl flex items-center gap-2 border transition-all glass-panel hover:border-cyan-500/50 ${
            isLayerPanelOpen
              ? 'text-cyan-400 border-cyan-500/40 shadow-lg shadow-cyan-950/30'
              : 'text-slate-300 border-slate-700/60'
          }`}
          title="Abrir/Cerrar panel de capas"
        >
          <Layers className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-semibold uppercase tracking-wider hidden sm:inline">
            Capas
          </span>
        </button>

        <div className="px-3.5 py-1.5 rounded-xl border border-slate-800/80 glass-panel flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold tracking-wider text-slate-100">
                NEUREB
              </span>
              <span className="text-[10px] px-1.5 py-0.2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded font-mono font-medium">
                3D PRECISION
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium hidden md:block">
              Atlas Neurovascular y Parénquima Cerebral
            </p>
          </div>
        </div>
      </div>

      {/* Model Spec Pills (Center - Hidden on small screens) */}
      <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-800/60 glass-panel-subtle pointer-events-auto text-[11px] font-mono text-slate-400">
        <span className="flex items-center gap-1">
          <Activity className="w-3 h-3 text-red-400" />
          Arterias ACM/ACA/Basilar
        </span>
        <span className="text-slate-600">|</span>
        <span className="text-sky-400">Venas Trolard/Labbé</span>
        <span className="text-slate-600">|</span>
        <span className="text-amber-300">Pares Craneales</span>
      </div>

      {/* Action Toolbar */}
      <div className="flex items-center gap-1.5 pointer-events-auto">
        {/* Auto Rotate Toggle */}
        <button
          onClick={toggleAutoRotate}
          className={`p-2.5 rounded-xl border transition-all glass-panel hover:border-slate-500 ${
            autoRotate
              ? 'text-cyan-400 border-cyan-500/50 bg-cyan-950/30 shadow-lg shadow-cyan-950/40'
              : 'text-slate-400 border-slate-800'
          }`}
          title={autoRotate ? 'Pausar rotación' : 'Rotación automática continua'}
        >
          <RotateCw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} />
        </button>

        {/* Wireframe Hologram Toggle */}
        <button
          onClick={toggleWireframe}
          className={`p-2.5 rounded-xl border transition-all glass-panel hover:border-slate-500 ${
            wireframe
              ? 'text-cyan-300 border-cyan-400/60 bg-cyan-950/40'
              : 'text-slate-400 border-slate-800'
          }`}
          title={wireframe ? 'Desactivar malla wireframe' : 'Modo malla holográfica'}
        >
          <Box className="w-4 h-4" />
        </button>

        {/* Capture Snapshot */}
        <button
          onClick={handleCaptureScreenshot}
          className="p-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-slate-100 hover:border-slate-500 transition-all glass-panel"
          title="Captura de pantalla HD (PNG)"
        >
          <Camera className="w-4 h-4" />
        </button>

        {/* Reset View */}
        <button
          onClick={resetView}
          className="p-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-slate-100 hover:border-slate-500 transition-all glass-panel"
          title="Restablecer orientación, capas y zoom"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
