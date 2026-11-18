'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useBrainStore } from '@/store/useBrainStore';
import { HOTSPOTS_DATA, ANATOMICAL_SYSTEMS } from '@/data/hotspots';
import { Search, X, ChevronRight, CornerDownLeft, Filter } from 'lucide-react';

export function HotspotSearchFilter() {
  const isSearchOpen = useBrainStore((state) => state.isSearchOpen);
  const setIsSearchOpen = useBrainStore((state) => state.setIsSearchOpen);
  const searchQuery = useBrainStore((state) => state.searchQuery);
  const setSearchQuery = useBrainStore((state) => state.setSearchQuery);
  const activeSystemFilter = useBrainStore((state) => state.activeSystemFilter);
  const setActiveSystemFilter = useBrainStore((state) => state.setActiveSystemFilter);
  const selectHotspot = useBrainStore((state) => state.selectHotspot);
  const selectedHotspotId = useBrainStore((state) => state.selectedHotspotId);

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const cleanQuery = searchQuery.trim().toLowerCase();

  const filteredHotspots = useMemo(() => {
    return HOTSPOTS_DATA.filter((h) => {
      const matchesSystem = activeSystemFilter === 'all' || h.system === activeSystemFilter;
      const matchesSearch =
        !cleanQuery ||
        h.title.toLowerCase().includes(cleanQuery) ||
        h.latinTitle.toLowerCase().includes(cleanQuery) ||
        h.summary.toLowerCase().includes(cleanQuery) ||
        h.clinicalSignificance.toLowerCase().includes(cleanQuery) ||
        h.system.toLowerCase().includes(cleanQuery);
      return matchesSystem && matchesSearch;
    });
  }, [activeSystemFilter, cleanQuery]);

  // Auto-focus input when modal opens & reset selected index
  useEffect(() => {
    if (isSearchOpen) {
      setSelectedIndex(0);
      const timer = setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  // Keep selected index within bounds
  useEffect(() => {
    if (selectedIndex >= filteredHotspots.length) {
      setSelectedIndex(Math.max(0, filteredHotspots.length - 1));
    }
  }, [filteredHotspots.length, selectedIndex]);

  // Scroll active item into view
  useEffect(() => {
    if (!resultsContainerRef.current) return;
    const activeEl = resultsContainerRef.current.querySelector<HTMLElement>(
      `[data-index="${selectedIndex}"]`
    );
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  // Keyboard navigation inside modal
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredHotspots.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev <= 0 ? Math.max(0, filteredHotspots.length - 1) : prev - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = filteredHotspots[selectedIndex];
      if (target) {
        selectHotspot(target.id);
        setIsSearchOpen(false);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsSearchOpen(false);
    }
  };

  if (!isSearchOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-20 px-3 sm:px-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-150 pointer-events-auto"
      onClick={() => setIsSearchOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Explorador y buscador neuroanatómico"
    >
      <div
        className="w-full max-w-2xl bg-slate-950/95 border border-slate-700/80 rounded-2xl shadow-2xl glass-panel overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3 border-b border-slate-800/80 bg-slate-900/40">
          <Search className="w-5 h-5 text-cyan-400 absolute left-4 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Buscar estructura, par craneal, lóbulo, área de Broca, ictus..."
            className="w-full pl-8 pr-28 py-1 bg-transparent text-sm text-slate-100 placeholder-slate-400 focus:outline-none"
          />

          <div className="flex items-center gap-2 shrink-0">
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  inputRef.current?.focus();
                }}
                className="p-1 text-slate-400 hover:text-slate-200 transition rounded hover:bg-slate-800"
                title="Limpiar texto"
                aria-label="Limpiar texto de búsqueda"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <span className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 font-mono font-medium">
              {filteredHotspots.length} {filteredHotspots.length === 1 ? 'resultado' : 'resultados'}
            </span>

            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 transition"
              title="Cerrar (Esc)"
              aria-label="Cerrar buscador"
            >
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-400">
                ESC
              </kbd>
            </button>
          </div>
        </div>

        {/* System Category Filter Pills */}
        <div className="px-3 py-2.5 bg-slate-900/60 border-b border-slate-800/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1 mr-0.5" />
          {ANATOMICAL_SYSTEMS.map((sys) => {
            const isActive = activeSystemFilter === sys.id;
            const count =
              sys.id === 'all'
                ? HOTSPOTS_DATA.length
                : HOTSPOTS_DATA.filter((h) => h.system === sys.id).length;

            return (
              <button
                key={sys.id}
                onClick={() => {
                  setActiveSystemFilter(sys.id);
                  setSelectedIndex(0);
                }}
                className={`whitespace-nowrap px-2.5 py-1 rounded-lg text-[11px] font-medium transition flex items-center gap-1.5 shrink-0 ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm shadow-cyan-950/40 font-semibold'
                    : 'bg-slate-900/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-slate-800/80'
                }`}
              >
                <span>{sys.label}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-cyan-400/20 text-cyan-200 font-bold' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Results List */}
        <div
          ref={resultsContainerRef}
          className="max-h-[360px] overflow-y-auto divide-y divide-slate-850 p-2"
        >
          {filteredHotspots.length === 0 ? (
            <div className="py-12 px-4 text-center">
              <p className="text-sm font-medium text-slate-300">
                No se encontraron estructuras para &ldquo;{searchQuery}&rdquo;
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Prueba buscando por nombre en latín, función o patología (ej. &ldquo;Broca&rdquo;, &ldquo;ictus&rdquo;, &ldquo;trigémino&rdquo;).
              </p>
              {(searchQuery || activeSystemFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveSystemFilter('all');
                    inputRef.current?.focus();
                  }}
                  className="mt-3 px-3 py-1.5 text-xs font-semibold rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/60 transition"
                >
                  Restablecer todos los filtros
                </button>
              )}
            </div>
          ) : (
            filteredHotspots.map((hotspot, idx) => {
              const isSelected = selectedHotspotId === hotspot.id;
              const isKeyboardActive = selectedIndex === idx;

              return (
                <button
                  key={hotspot.id}
                  data-index={idx}
                  onClick={() => {
                    selectHotspot(hotspot.id);
                    setIsSearchOpen(false);
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left p-3 rounded-xl transition flex items-center justify-between group ${
                    isKeyboardActive
                      ? 'bg-cyan-950/50 border border-cyan-500/40 text-slate-100 shadow-md shadow-cyan-950/40'
                      : isSelected
                      ? 'bg-slate-900/60 border border-slate-700/50 text-cyan-200'
                      : 'hover:bg-slate-900/70 border border-transparent text-slate-300'
                  }`}
                >
                  <div className="flex flex-col min-w-0 pr-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                        style={{ backgroundColor: hotspot.categoryColor }}
                      />
                      <span className="text-xs sm:text-sm font-semibold truncate group-hover:text-cyan-300 transition">
                        {hotspot.title}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800/90 text-slate-400 shrink-0 font-medium border border-slate-700/60">
                        {hotspot.system}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 font-mono italic truncate pl-4.5 mt-0.5">
                      {hotspot.latinTitle}
                    </p>

                    <p className="text-[11px] text-slate-400 line-clamp-1 pl-4.5 mt-1 leading-snug">
                      {hotspot.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {isKeyboardActive && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 px-1.5 py-0.5 rounded font-mono">
                        <CornerDownLeft className="w-3 h-3" />
                        <span>Enfocar</span>
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition shrink-0" />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Modal Command Footer */}
        <div className="px-4 py-2 bg-slate-900/80 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.2 rounded bg-slate-800 border border-slate-700 text-slate-300 text-[10px]">
                ↑↓
              </kbd>
              <span>Navegar</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.2 rounded bg-slate-800 border border-slate-700 text-slate-300 text-[10px]">
                ↵
              </kbd>
              <span>Enfocar en 3D</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span>Clic fuera o</span>
            <kbd className="px-1.5 py-0.2 rounded bg-slate-800 border border-slate-700 text-slate-300 text-[10px]">
              ESC
            </kbd>
            <span>para cerrar</span>
          </div>
        </div>
      </div>
    </div>
  );
}
