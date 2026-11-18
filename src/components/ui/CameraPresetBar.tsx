'use client';

import React from 'react';
import { useBrainStore } from '@/store/useBrainStore';
import { CAMERA_PRESETS } from '@/data/hotspots';
import { CameraPreset } from '@/types/brain';
import {
  Compass,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Eye,
  Box,
} from 'lucide-react';

export function CameraPresetBar() {
  const activeCameraPreset = useBrainStore((state) => state.activeCameraPreset);
  const setCameraPreset = useBrainStore((state) => state.setCameraPreset);

  const getPresetIcon = (id: CameraPreset) => {
    switch (id) {
      case 'anterior':
        return <Eye className="w-3.5 h-3.5" />;
      case 'posterior':
        return <Compass className="w-3.5 h-3.5" />;
      case 'left':
        return <ArrowLeft className="w-3.5 h-3.5" />;
      case 'right':
        return <ArrowRight className="w-3.5 h-3.5" />;
      case 'superior':
        return <ArrowUp className="w-3.5 h-3.5" />;
      case 'base':
        return <ArrowDown className="w-3.5 h-3.5" />;
      case 'isometric':
        return <Box className="w-3.5 h-3.5" />;
    }
  };

  return (
    <nav
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 p-1.5 rounded-2xl border border-slate-800/80 bg-slate-950/98 backdrop-blur-2xl glass-panel shadow-2xl pointer-events-auto max-w-[calc(100vw-1.5rem)] overflow-x-auto"
      role="toolbar"
      aria-label="Vistas anatómicas rápidas"
    >
      {CAMERA_PRESETS.map((preset) => {
        const isActive = activeCameraPreset === preset.id;
        return (
          <button
            key={preset.id}
            onClick={() => setCameraPreset(preset.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none ${
              isActive
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-lg shadow-cyan-950/40'
                : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800/60 border border-transparent'
            }`}
            aria-pressed={isActive}
            aria-label={`Orientar cámara a vista ${preset.label}`}
            title={preset.description}
          >
            <span className={isActive ? 'text-cyan-400' : 'text-slate-400'}>
              {getPresetIcon(preset.id)}
            </span>
            <span className="hidden sm:inline">{preset.label}</span>
            <span className="sm:hidden">{preset.label.split(' ')[0]}</span>
          </button>
        );
      })}
    </nav>
  );
}
