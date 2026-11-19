'use client';

import React from 'react';
import {
  X,
  MousePointer,
  Sparkles,
  Move,
  ZoomIn,
  Keyboard,
  Layers,
  HelpCircle,
  Check,
  Smartphone,
} from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Mobile backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200"
        aria-hidden="true"
      />

      <aside
        className="fixed inset-x-3 top-14 bottom-4 md:inset-x-auto md:right-3 md:top-16 md:bottom-20 z-50 md:z-40 md:w-96 flex flex-col rounded-2xl border border-slate-800/80 bg-slate-950/98 backdrop-blur-2xl glass-panel shadow-2xl overflow-hidden pointer-events-auto animate-in fade-in slide-in-from-bottom md:slide-in-from-right duration-200"
        role="region"
        aria-label="Guía de interacción y controles 3D"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3.5 sm:p-4 border-b border-slate-800/80 bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
                Guía de Controles 3D
              </h2>
              <p className="text-[11px] text-slate-400">
                Navegación táctil y de ratón
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 rounded-xl transition focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
            aria-label="Cerrar guía de ayuda"
            title="Cerrar guía"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Control items list - Scrollable */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3 text-xs">
          {/* Mobile Gestures Highlight */}
          <div className="flex items-start gap-3 p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 sm:hidden">
            <Smartphone className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-cyan-300">Gestos Táctiles Móviles</p>
              <p className="text-slate-300 text-[11px] leading-relaxed mt-0.5">
                • <strong>1 Dedo:</strong> Rota el encéfalo en 360°<br />
                • <strong>Pellizco (2 dedos):</strong> Zoom in / Zoom out<br />
                • <strong>2 Dedos arrastre:</strong> Desplazar y reencuadrar
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/40 border border-slate-800/60">
            <MousePointer className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-200">Rotación Orbital 360°</p>
              <p className="text-slate-400 text-[11px] leading-relaxed mt-0.5">
                Arrastra con el botón izquierdo o un dedo sobre la pantalla para examinar el encéfalo desde cualquier perspectiva anatómica.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/40 border border-slate-800/60">
            <Move className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-200">Paneo y Desplazamiento</p>
              <p className="text-slate-400 text-[11px] leading-relaxed mt-0.5">
                Arrastra con el botón derecho o dos dedos para mover el punto focal en el espacio 3D.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/40 border border-slate-800/60">
            <ZoomIn className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-200">Zoom Bounded</p>
              <p className="text-slate-400 text-[11px] leading-relaxed mt-0.5">
                Rueda del ratón o pellizco táctil para aproximarte a los vasos y pares craneales sin perder el encuadre.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/40 border border-slate-800/60">
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-200">Enfoque Quirúrgico</p>
              <p className="text-slate-400 text-[11px] leading-relaxed mt-0.5">
                Toca cualquier marcador baliza 3D para aislar la estructura, ver su ficha clínica y ajustar el fondo.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/40 border border-slate-800/60">
            <Layers className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-200">Rayos X y Cortes 3D</p>
              <p className="text-slate-400 text-[11px] leading-relaxed mt-0.5">
                Usa los botones inferiores para seccionar cortes sagitales, coronales o axiales, o volver translúcida la corteza.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/40 border border-slate-800/60">
            <Keyboard className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-200">Atajos de Teclado (Escritorio)</p>
              <p className="text-slate-400 text-[11px] leading-relaxed mt-0.5">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-cyan-300 font-mono text-[10px]">⌘K</kbd> buscador, <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-cyan-300 font-mono text-[10px]">Esc</kbd> cerrar o desenfocar, <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-cyan-300 font-mono text-[10px]">?</kbd> ayuda.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-900/50 flex justify-end">
          <button
            onClick={onClose}
            className="w-full py-2 px-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 font-semibold text-xs transition flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-950/40 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Entendido</span>
          </button>
        </div>
      </aside>
    </>
  );
}