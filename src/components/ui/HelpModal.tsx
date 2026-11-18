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
} from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  if (!isOpen) return null;

  return (
    <aside
      className="fixed right-3 top-16 bottom-20 z-40 w-96 max-w-[calc(100vw-1.5rem)] flex flex-col rounded-2xl border border-slate-800/80 bg-slate-950/98 backdrop-blur-2xl glass-panel shadow-2xl overflow-hidden pointer-events-auto animate-in fade-in slide-in-from-right duration-200"
      role="region"
      aria-label="Guía de interacción y controles 3D"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800/80 bg-slate-900/50">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
              Guía de Controles 3D
            </h2>
            <p className="text-[11px] text-slate-400">
              Navegación e interacción anatómica
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 rounded-lg transition focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
          aria-label="Cerrar guía de ayuda"
          title="Cerrar guía"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Control items list - Scrollable, clean and compact */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
        <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/40 border border-slate-800/60">
          <MousePointer className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-slate-200">Rotación Orbital 360°</p>
            <p className="text-slate-400 text-[11px] leading-relaxed mt-0.5">
              Arrastra con el <strong>botón izquierdo</strong> del ratón (o 1 dedo en pantalla táctil) para examinar el encéfalo desde cualquier perspectiva.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/40 border border-slate-800/60">
          <Move className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-slate-200">Paneo y Desplazamiento</p>
            <p className="text-slate-400 text-[11px] leading-relaxed mt-0.5">
              Arrastra con el <strong>botón derecho</strong> del ratón (o 2 dedos en táctil) para reubicar libremente el centro de visión.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/40 border border-slate-800/60">
          <ZoomIn className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-slate-200">Zoom Bounded</p>
            <p className="text-slate-400 text-[11px] leading-relaxed mt-0.5">
              Gira la <strong>rueda del ratón</strong> (o pellizco táctil) para acercarte a los vasos y surcos profundos sin perder el encuadre.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/40 border border-slate-800/60">
          <Sparkles className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-slate-200">Modo Enfoque Quirúrgico</p>
            <p className="text-slate-400 text-[11px] leading-relaxed mt-0.5">
              Haz clic en cualquier <strong>marcador 3D</strong> para aislar la estructura, ocultar los demás puntos y encender el foco quirúrgico.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/40 border border-slate-800/60">
          <Layers className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-slate-200">Rayos X y Transparencia</p>
            <p className="text-slate-400 text-[11px] leading-relaxed mt-0.5">
              Ajusta el <strong>deslizador de opacidad</strong> o pulsa <em>Rayos X</em> para volver translúcida la corteza y visualizar las arterias internas y el tronco.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/40 border border-slate-800/60">
          <Keyboard className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-slate-200">Atajos de Teclado</p>
            <p className="text-slate-400 text-[11px] leading-relaxed mt-0.5">
              Pulsa <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-cyan-300 font-mono text-[10px]">Esc</kbd> o haz clic en cualquier fondo vacío para salir de cualquier enfoque y ver el cerebro completo.
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
  );
}
