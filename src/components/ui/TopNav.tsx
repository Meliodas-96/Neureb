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
  SlidersHorizontal,
  Sparkles,
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isXRayMode = useBrainStore((state) => state.isXRayMode);
  const toggleXRayMode = useBrainStore((state) => state.toggleXRayMode);

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
        <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-cyan-500/50 bg-cyan-950/50 glass-panel pointer-events-auto shadow-lg shadow-cyan-950/60 animate-in fade-in zoom-in-95 duration-200">
          <Crosshair className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="text-xs font-bold text-cyan-300 tracking-wide truncate max-w-[130px] md:max-w-xs">
            {activeHotspot.title}
          </span>
          <button
            onClick={() => selectHotspot(null)}
            className="flex items-center gap-1 text-[11px] font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 px-2 py-0.5 rounded-lg border border-slate-600 transition ml-1 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
            aria-label="Desactivar enfoque y ver todo el cerebro"
          >
            <X className="w-3 h-3 text-cyan-400" />
            <span className="hidden md:inline">Ver Todo</span>
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
        {/* Search Modal Trigger (Always Visible) */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className={`px-2.5 sm:px-3 py-2 rounded-xl border transition-all glass-panel flex items-center gap-1.5 sm:gap-2 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none ${
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
          <kbd className="hidden lg:inline text-[10px] px-1.5 py-0.2 rounded bg-slate-800/90 border border-slate-700/60 text-slate-400 font-mono">
            ⌘K
          </kbd>
        </button>

        {/* Study & Quiz Mode (Always Visible) */}
        <button
          onClick={() => setIsQuizOpen(!isQuizOpen)}
          className={`p-2 sm:px-3 sm:py-2 rounded-xl border transition-all glass-panel focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none flex items-center gap-1.5 ${
            isQuizOpen
              ? 'text-emerald-300 border-emerald-500/50 bg-emerald-950/40 shadow-lg shadow-emerald-950/40'
              : 'text-slate-300 border-slate-800 hover:text-emerald-400 hover:border-emerald-500/40'
          }`}
          aria-label={isQuizOpen ? 'Cerrar modo estudio y quiz' : 'Abrir modo estudio y quiz neuroanatómico'}
          title="Modo Estudio & Quiz Clínico 3D"
        >
          <GraduationCap className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold hidden md:inline text-emerald-300">Quiz</span>
        </button>

        {/* --- DESKTOP TOOLBAR BUTTONS (hidden on mobile) --- */}
        <div className="hidden md:flex items-center gap-1.5">
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

        {/* --- MOBILE COMPACT TOOLS TRIGGER BUTTON (md:hidden) --- */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden p-2 rounded-xl border transition-all glass-panel flex items-center justify-center focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none ${
            isMobileMenuOpen
              ? 'text-cyan-300 border-cyan-500/50 bg-cyan-950/40 shadow-lg shadow-cyan-950/30'
              : 'text-slate-300 border-slate-800 hover:border-cyan-500/50'
          }`}
          aria-label="Abrir menú de herramientas del visor"
          title="Herramientas y ajustes"
        >
          <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
        </button>
      </div>

      {/* --- MOBILE TOOLS MODAL SHEET (md:hidden) --- */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md pointer-events-auto md:hidden flex flex-col justify-end animate-in fade-in duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="bg-slate-950/98 border-t border-slate-800 rounded-t-3xl p-5 shadow-2xl glass-panel max-h-[80dvh] overflow-y-auto animate-in slide-in-from-bottom duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle Bar */}
            <div className="w-12 h-1.5 bg-slate-700/80 rounded-full mx-auto mb-4" />

            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100">
                  Herramientas y Modos 3D
                </h3>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white bg-slate-900 rounded-xl border border-slate-800 transition"
                aria-label="Cerrar menú"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Toggle Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {/* Bio Pulse */}
              <button
                onClick={toggleLiveBiologicalAnimation}
                className={`p-3 rounded-xl border flex flex-col items-start gap-1.5 transition text-left ${
                  isLiveBiologicalAnimation
                    ? 'bg-rose-950/40 border-rose-500/50 text-rose-300'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <Activity className={`w-4 h-4 ${isLiveBiologicalAnimation ? 'text-rose-400 animate-pulse' : 'text-slate-500'}`} />
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${isLiveBiologicalAnimation ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-800 text-slate-500'}`}>
                    {isLiveBiologicalAnimation ? 'ACTIVO' : 'PAUSA'}
                  </span>
                </div>
                <span className="text-xs font-semibold text-slate-200">Pulso Fisiológico</span>
                <span className="text-[10px] text-slate-400 leading-tight">Flujo arterial y hemodinámica</span>
              </button>

              {/* X-Ray */}
              <button
                onClick={toggleXRayMode}
                className={`p-3 rounded-xl border flex flex-col items-start gap-1.5 transition text-left ${
                  isXRayMode
                    ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-300'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <Sparkles className={`w-4 h-4 ${isXRayMode ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${isXRayMode ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-500'}`}>
                    {isXRayMode ? 'ACTIVO' : 'OFF'}
                  </span>
                </div>
                <span className="text-xs font-semibold text-slate-200">Modo Rayos X</span>
                <span className="text-[10px] text-slate-400 leading-tight">Transparencia cortical (22%)</span>
              </button>

              {/* Auto Rotate */}
              <button
                onClick={toggleAutoRotate}
                className={`p-3 rounded-xl border flex flex-col items-start gap-1.5 transition text-left ${
                  autoRotate
                    ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-300'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <RotateCw className={`w-4 h-4 ${autoRotate ? 'text-cyan-400 animate-spin' : 'text-slate-500'}`} />
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${autoRotate ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-500'}`}>
                    {autoRotate ? 'GIRANDO' : 'PAUSA'}
                  </span>
                </div>
                <span className="text-xs font-semibold text-slate-200">Rotación 360°</span>
                <span className="text-[10px] text-slate-400 leading-tight">Órbita automática continua</span>
              </button>

              {/* Wireframe */}
              <button
                onClick={toggleWireframe}
                className={`p-3 rounded-xl border flex flex-col items-start gap-1.5 transition text-left ${
                  wireframe
                    ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-300'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <Box className={`w-4 h-4 ${wireframe ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${wireframe ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-500'}`}>
                    {wireframe ? 'ACTIVO' : 'OFF'}
                  </span>
                </div>
                <span className="text-xs font-semibold text-slate-200">Malla Holográfica</span>
                <span className="text-[10px] text-slate-400 leading-tight">Estructura poligonal</span>
              </button>

              {/* Hotspot Markers */}
              <button
                onClick={toggleHotspotMarkers}
                className={`p-3 rounded-xl border flex flex-col items-start gap-1.5 transition text-left ${
                  showHotspotMarkers
                    ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-300'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  {showHotspotMarkers ? <MapPin className="w-4 h-4 text-cyan-400" /> : <MapPinOff className="w-4 h-4 text-slate-500" />}
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${showHotspotMarkers ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-500'}`}>
                    {showHotspotMarkers ? 'VISIBLES' : 'OCULTOS'}
                  </span>
                </div>
                <span className="text-xs font-semibold text-slate-200">Puntos 3D</span>
                <span className="text-[10px] text-slate-400 leading-tight">Balizas y marcadores</span>
              </button>

              {/* Share link */}
              <button
                onClick={handleCopyShareLink}
                className="p-3 rounded-xl border bg-slate-900/60 border-slate-800 hover:border-slate-700 flex flex-col items-start gap-1.5 transition text-left"
              >
                <div className="flex items-center justify-between w-full">
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-slate-400" />}
                  {copiedLink && (
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">
                      ¡COPIADO!
                    </span>
                  )}
                </div>
                <span className="text-xs font-semibold text-slate-200">Compartir Vista</span>
                <span className="text-[10px] text-slate-400 leading-tight">Enlace directo con estado</span>
              </button>

              {/* Screenshot */}
              <button
                onClick={() => {
                  handleCaptureScreenshot();
                  setIsMobileMenuOpen(false);
                }}
                className="p-3 rounded-xl border bg-slate-900/60 border-slate-800 hover:border-slate-700 flex flex-col items-start gap-1.5 transition text-left"
              >
                <Camera className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-semibold text-slate-200">Captura HD</span>
                <span className="text-[10px] text-slate-400 leading-tight">Descargar imagen PNG</span>
              </button>

              {/* Help Guide */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenHelp();
                }}
                className="p-3 rounded-xl border bg-slate-900/60 border-slate-800 hover:border-slate-700 flex flex-col items-start gap-1.5 transition text-left"
              >
                <HelpCircle className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-semibold text-slate-200">Guía de Ayuda</span>
                <span className="text-[10px] text-slate-400 leading-tight">Gestos táctiles y atajos</span>
              </button>
            </div>

            {/* Reset View Button */}
            <button
              onClick={() => {
                resetView();
                setIsMobileMenuOpen(false);
              }}
              className="w-full mt-4 py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-semibold text-xs flex items-center justify-center gap-2 transition"
            >
              <RotateCcw className="w-4 h-4 text-cyan-400" />
              <span>Restablecer Toda la Vista Anatómica</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
