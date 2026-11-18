'use client';

import React, { useState } from 'react';
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
  Volume2,
  Copy,
  Check,
  Share2,
} from 'lucide-react';

export function HotspotDetailCard() {
  const selectedHotspotId = useBrainStore((state) => state.selectedHotspotId);
  const selectHotspot = useBrainStore((state) => state.selectHotspot);
  const focusIsolationType = useBrainStore((state) => state.focusIsolationType);
  const setFocusIsolationType = useBrainStore((state) => state.setFocusIsolationType);

  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!selectedHotspotId) return null;

  const hotspot = HOTSPOTS_DATA.find((h) => h.id === selectedHotspotId);
  if (!hotspot) return null;

  const handleRefocus = () => {
    selectHotspot(null);
    setTimeout(() => selectHotspot(hotspot.id), 50);
  };

  const handlePronounce = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    // Prefer Latin pronunciation for Terminologia Anatomica
    const textToSpeak = `${hotspot.title}. En latín: ${hotspot.latinTitle}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;

    setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopyNotes = () => {
    const text = `# ${hotspot.title}
*${hotspot.latinTitle}*
Sistema: ${hotspot.system} ${hotspot.brodmannArea ? `| Área: ${hotspot.brodmannArea}` : ''}

## Resumen
${hotspot.summary}

## Anatomía Descriptiva
${hotspot.anatomy}

## Función Fisiológica
${hotspot.function}

## Semiología y Relevancia Clínica
${hotspot.clinicalSignificance}

## Consideraciones Neuroquirúrgicas
${hotspot.surgicalNotes}

— Fuente: Atlas Neuroanatómico 3D NEUREB`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside
      className="fixed right-3 top-16 bottom-20 z-40 w-96 max-w-[calc(100vw-1.5rem)] flex flex-col rounded-2xl border border-slate-800/80 bg-slate-950/98 backdrop-blur-2xl glass-panel shadow-2xl overflow-hidden pointer-events-auto transition-all animate-in fade-in slide-in-from-right duration-200"
      role="dialog"
      aria-label={`Ficha clínica: ${hotspot.title}`}
    >
      {/* Header with Title, Badges and Controls */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-900/50">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-1.5 flex-wrap">
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

            {hotspot.brodmannArea && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                {hotspot.brodmannArea}
              </span>
            )}

            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono font-medium flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
              ENFOCADO
            </span>
          </div>

          <div className="flex items-center gap-1">
            {/* Audio pronunciation */}
            <button
              onClick={handlePronounce}
              className={`p-1.5 rounded-lg transition ${
                isPlayingAudio
                  ? 'text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 animate-pulse'
                  : 'text-slate-400 hover:text-cyan-400 hover:bg-slate-800/60'
              }`}
              aria-label="Escuchar pronunciación anatómica"
              title="Pronunciación en audio (Terminologia Anatomica)"
            >
              <Volume2 className="w-4 h-4" />
            </button>

            {/* Copy study notes */}
            <button
              onClick={handleCopyNotes}
              className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800/60 rounded-lg transition"
              aria-label="Copiar ficha clínica en Markdown"
              title="Copiar ficha para apuntes (Notion/Anki/Obsidian)"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              onClick={handleRefocus}
              className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800/60 rounded-lg transition"
              aria-label="Centrar y reenfocar cámara"
              title="Centrar y reenfocar cámara"
            >
              <Target className="w-4 h-4" />
            </button>

            <button
              onClick={() => selectHotspot(null)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition"
              aria-label="Cerrar ficha y ver todo el cerebro"
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
          <div className="flex items-center gap-1 bg-slate-950/60 p-0.5 rounded-lg border border-slate-800" role="radiogroup" aria-label="Tipo de fondo en modo enfoque">
            <button
              onClick={() => setFocusIsolationType('ghost')}
              role="radio"
              aria-checked={focusIsolationType === 'ghost'}
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
              role="radio"
              aria-checked={focusIsolationType === 'isolate'}
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
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-300 uppercase tracking-wider">
            <Stethoscope className="w-3.5 h-3.5 text-rose-400" />
            <span>Relevancia Clínica y Fisiopatología</span>
          </div>
          <p className="text-slate-300 leading-relaxed bg-rose-950/20 p-2.5 rounded-xl border border-rose-500/20">
            {hotspot.clinicalSignificance}
          </p>
        </div>

        {/* Surgical Notes */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-300 uppercase tracking-wider">
            <Scissors className="w-3.5 h-3.5 text-amber-400" />
            <span>Consideraciones Neuroquirúrgicas</span>
          </div>
          <p className="text-slate-300 leading-relaxed bg-amber-950/20 p-2.5 rounded-xl border border-amber-500/20">
            {hotspot.surgicalNotes}
          </p>
        </div>
      </div>

      {/* Footer Copy Confirmation */}
      {copied && (
        <div className="p-2 bg-emerald-950/90 border-t border-emerald-500/40 text-center text-[11px] text-emerald-300 font-medium animate-in fade-in">
          ¡Ficha copiada al portapapeles con formato Markdown!
        </div>
      )}
    </aside>
  );
}
