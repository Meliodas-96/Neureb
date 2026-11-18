'use client';

import React, { useState } from 'react';
import { useBrainStore } from '@/store/useBrainStore';
import { HOTSPOTS_DATA } from '@/data/hotspots';
import {
  RotateCw,
  Box,
  Camera,
  RotateCcw,
  Layers,
  MapPin,
  MapPinOff,
  Crosshair,
  X,
  HelpCircle,
  Share2,
  Check,
  GraduationCap,
  Search,
  Activity,
} from 'lucide-react';

interface TopNavProps {
  onToggleLayerPanel: () => void;
  isLayerPanelOpen: boolean;
  onOpenHelp: () => void;
}

export function TopNav({ onToggleLayerPanel, isLayerPanelOpen, onOpenHelp }: TopNavProps) {
  const autoRotate = useBrainStore((state) => state.autoRotate);
  const toggleAutoRotate = useBrainStore((state) => state.toggleAutoRotate);
  const wireframe = useBrainStore((state) => state.wireframe);
  const toggleWireframe = useBrainStore((state) => state.toggleWireframe);
  const isLiveBiologicalAnimation = useBrainStore((state) => state.isLiveBiologicalAnimation);
  const toggleLiveBiologicalAnimation = useBrainStore((state) => state.toggleLiveBiologicalAnimation);
  const resetView = useBrainStore((state) => state.resetView);
  const showHotspotMarkers = useBrainStore((state) => state.showHotspotMarkers);
  const toggleHotspotMarkers = useBrainStore((state) => state.toggleHotspotMarkers);
  const selectedHotspotId = useBrainStore((state) => state.selectedHotspotId);
  const selectHotspot = useBrainStore((state) => state.selectHotspot);
  const isQuizOpen = useBrainStore((state) => state.isQuizOpen);
  const setIsQuizOpen = useBrainStore((state) => state.setIsQuizOpen);
  const isSearchOpen = useBrainStore((state) => state.isSearchOpen);
  const setIsSearchOpen = useBrainStore((state) => state.setIsSearchOpen);
  const activeSystemFilter = useBrainStore((state) => state.activeSystemFilter);
  const setActiveSystemFilter = useBrainStore((state) => state.setActiveSystemFilter);
  const searchQuery = useBrainStore((state) => state.searchQuery);
  const setSearchQuery = useBrainStore((state) => state.setSearchQuery);

  const [copiedLink, setCopiedLink] = useState(false);

  const activeHotspot = selectedHotspotId
    ? HOTSPOTS_DATA.find((h) => h.id === selectedHotspotId)
    : null;

  const handleCaptureScreenshot = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `neureb-neuroanatomy-${new Date().toISOString().slice(0, 10)}.png`;
    link.href = dataUrl;
    link.click();
  };

  const handleCopyShareLink = () => {
    if (typeof window === 'undefined') return;
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <header className="fixed top-3 left-3 right-3 z-40 flex items-center justify-between pointer-events-none" role="banner">
      {/* Brand & Anatomical Identifier */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <button
          onClick={onToggleLayerPanel}
          className={`px-3 py-2 rounded-xl flex items-center gap-2 border transition-all glass-panel hover:border-cyan-500/50 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none ${
            isLayerPanelOpen
              ? 'text-cyan-400 border-cyan-500/40 shadow-lg shadow-cyan-950/30'
              : 'text-slate-300 border-slate-700/60'
          }`}
          aria-label={isLayerPanelOpen ? 'Cerrar panel de capas' : 'Abrir panel de capas'}
          aria-expanded={isLayerPanelOpen}
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

      {/* Center Indicator: Surgical Focus Mode Active or Model Spec */}
      {activeHotspot ? (
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border border-cyan-500/50 bg-cyan-950/50 glass-panel pointer-events-auto shadow-lg shadow-cyan-950/60 animate-in fade-in zoom-in-95 duration-200">
          <Crosshair className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="text-xs font-bold text-cyan-300 tracking-wide">
            ENFOQUE: {activeHotspot.title}
          </span>
          <button
            onClick={() => selectHotspot(null)}
            className="flex items-center gap-1 text-[11px] font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 px-2 py-0.5 rounded-lg border border-slate-600 transition ml-1 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
            aria-label="Desactivar enfoque y ver todo el cerebro"
          >
            <X className="w-3 h-3 text-cyan-400" />
            <span>Ver Todo</span>
          </button>
        </div>
      ) : (
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-800/60 glass-panel-subtle pointer-events-auto text-[11px] font-mono text-slate-400">
          <span className="text-red-400">Arterias ACM/ACA/Basilar</span>
          <span className="text-slate-600">|</span>
          <span className="text-blue-400">Venas Corticales</span>
          <span className="text-slate-600">|</span>
          <span className="text-amber-200">Pares Craneales</span>
        </div>
      )}

      {/* Action Toolbar */}
      <div className="flex items-center gap-1.5 pointer-events-auto" role="toolbar" aria-label="Herramientas del visor 3D">
        {/* Search Modal Trigger (Lupa) */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className={`px-3 py-2 rounded-xl border transition-all glass-panel flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none ${
            isSearchOpen || activeSystemFilter !== 'all' || searchQuery
              ? 'text-cyan-300 border-cyan-500/50 bg-cyan-950/40 shadow-lg shadow-cyan-950/30'
              : 'text-slate-300 border-slate-800 hover:border-cyan-500/50 hover:text-white'
          }`}
          aria-label="Buscar estructuras neuroanatómicas (⌘K)"
          title="Buscar estructura o patología [⌘K / Ctrl+K]"
        >
          <Search className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-semibold hidden md:inline">
            {activeSystemFilter !== 'all' ? activeSystemFilter : 'Buscar'}
          </span>
          {activeSystemFilter !== 'all' && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                setActiveSystemFilter('all');
                setSearchQuery('');
              }}
              className="p-0.5 rounded hover:bg-cyan-900/50 text-cyan-400 ml-0.5"
              title="Limpiar filtro"
              role="button"
              aria-label="Limpiar filtro de sistema"
            >
              <X className="w-3 h-3" />
            </span>
          )}
          <kbd className="hidden sm:inline text-[10px] px-1.5 py-0.2 rounded bg-slate-800/90 border border-slate-700/60 text-slate-400 font-mono">
            ⌘K
          </kbd>
        </button>
        {/* Share View Link */}
        <button
          onClick={handleCopyShareLink}
          className={`p-2.5 rounded-xl border transition-all glass-panel hover:border-slate-500 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none ${
            copiedLink ? 'text-emerald-400 border-emerald-500/50 bg-emerald-950/40' : 'text-slate-400 border-slate-800'
          }`}
          aria-label={copiedLink ? 'Enlace copiado al portapapeles' : 'Copiar enlace directo con vista activa'}
          title={copiedLink ? '¡Enlace copiado!' : 'Copiar enlace directo con vista activa'}
        >
          {copiedLink ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
        </button>

        {/* Toggle Hotspot Markers on/off */}
        <button
          onClick={toggleHotspotMarkers}
          className={`p-2.5 rounded-xl border transition-all glass-panel hover:border-slate-500 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none ${
            showHotspotMarkers
              ? 'text-cyan-400 border-cyan-500/40 bg-cyan-950/30'
              : 'text-slate-500 border-slate-800'
          }`}
          aria-label={showHotspotMarkers ? 'Ocultar puntos de interés 3D' : 'Mostrar puntos de interés 3D'}
          aria-pressed={showHotspotMarkers}
          title={showHotspotMarkers ? 'Ocultar puntos de interés 3D' : 'Mostrar puntos de interés 3D'}
        >
          {showHotspotMarkers ? (
            <MapPin className="w-4 h-4" />
          ) : (
            <MapPinOff className="w-4 h-4" />
          )}
        </button>

        {/* Real-time Hemodynamics & Bio-pulse Toggle */}
        <button
          onClick={toggleLiveBiologicalAnimation}
          className={`p-2.5 rounded-xl border transition-all glass-panel hover:border-slate-500 focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:outline-none ${
            isLiveBiologicalAnimation
              ? 'text-rose-400 border-rose-500/40 bg-rose-950/40 shadow-lg shadow-rose-950/40'
              : 'text-slate-500 border-slate-800'
          }`}
          aria-label={isLiveBiologicalAnimation ? 'Pausar fisiología y flujo sanguíneo' : 'Activar flujo sanguíneo y pulsación en tiempo real'}
          aria-pressed={isLiveBiologicalAnimation}
          title={isLiveBiologicalAnimation ? 'Fisiología activa: flujo arterial/venoso y pulso cerebral' : 'Activar flujo sanguíneo y pulsación'}
        >
          <Activity className={`w-4 h-4 ${isLiveBiologicalAnimation ? 'animate-pulse' : ''}`} />
        </button>

        {/* Auto Rotate Toggle */}
        <button
          onClick={toggleAutoRotate}
          className={`p-2.5 rounded-xl border transition-all glass-panel hover:border-slate-500 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none ${
            autoRotate
              ? 'text-cyan-400 border-cyan-500/50 bg-cyan-950/30 shadow-lg shadow-cyan-950/40'
              : 'text-slate-400 border-slate-800'
          }`}
          aria-label={autoRotate ? 'Pausar rotación automática' : 'Activar rotación automática'}
          aria-pressed={autoRotate}
          title={autoRotate ? 'Pausar rotación' : 'Rotación automática continua'}
        >
          <RotateCw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} />
        </button>

        {/* Wireframe Hologram Toggle */}
        <button
          onClick={toggleWireframe}
          className={`p-2.5 rounded-xl border transition-all glass-panel hover:border-slate-500 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none ${
            wireframe
              ? 'text-cyan-300 border-cyan-400/60 bg-cyan-950/40'
              : 'text-slate-400 border-slate-800'
          }`}
          aria-label={wireframe ? 'Desactivar modo malla wireframe' : 'Activar modo malla wireframe'}
          aria-pressed={wireframe}
          title={wireframe ? 'Desactivar malla wireframe' : 'Modo malla holográfica'}
        >
          <Box className="w-4 h-4" />
        </button>

        {/* Study & Quiz Mode */}
        <button
          onClick={() => setIsQuizOpen(!isQuizOpen)}
          className={`p-2.5 rounded-xl border transition-all glass-panel focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none flex items-center gap-1.5 ${
            isQuizOpen
              ? 'text-emerald-300 border-emerald-500/50 bg-emerald-950/40 shadow-lg shadow-emerald-950/40'
              : 'text-slate-400 border-slate-800 hover:text-emerald-400 hover:border-emerald-500/40'
          }`}
          aria-label={isQuizOpen ? 'Cerrar modo estudio y quiz' : 'Abrir modo estudio y quiz neuroanatómico'}
          title="Modo Estudio & Quiz Clínico 3D"
        >
          <GraduationCap className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold hidden md:inline text-emerald-300">Quiz</span>
        </button>

        {/* Capture Snapshot */}
        <button
          onClick={handleCaptureScreenshot}
          className="p-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-slate-100 hover:border-slate-500 transition-all glass-panel focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
          aria-label="Captura de pantalla HD en formato PNG"
          title="Captura de pantalla HD (PNG)"
        >
          <Camera className="w-4 h-4" />
        </button>

        {/* Help / Controls Guide Modal */}
        <button
          onClick={onOpenHelp}
          className="p-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all glass-panel focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
          aria-label="Abrir guía de ayuda y controles de navegación"
          title="Guía de navegación y atajos [?]"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Reset View */}
        <button
          onClick={resetView}
          className="p-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-slate-100 hover:border-slate-500 transition-all glass-panel focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
          aria-label="Restablecer orientación, capas y zoom a valores predeterminados"
          title="Restablecer vista completa"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
