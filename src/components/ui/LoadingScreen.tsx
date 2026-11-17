'use client';

import React, { useState, useEffect } from 'react';
import { useProgress } from '@react-three/drei';
import { Activity } from 'lucide-react';

export function LoadingScreen() {
  const { progress, active } = useProgress();
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    if (!active && progress === 100) {
      const timer = setTimeout(() => setMounted(false), 600);
      return () => clearTimeout(timer);
    }
  }, [active, progress]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 transition-opacity duration-700 ${
        progress === 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center max-w-sm px-6 text-center">
        {/* Glow ambient */}
        <div className="absolute w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl -top-10" />

        {/* Pulse Logo */}
        <div className="relative w-16 h-16 mb-6 rounded-2xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center shadow-lg shadow-cyan-950/50">
          <Activity className="w-8 h-8 text-cyan-400 animate-pulse" />
        </div>

        <h1 className="text-xl font-bold tracking-widest text-slate-100 uppercase mb-1">
          NEUREB <span className="text-cyan-400 font-light">3D</span>
        </h1>
        <p className="text-xs text-slate-400 font-mono tracking-wider mb-6">
          ATLAS NEUROANATÓMICO CLÍNICO
        </p>

        {/* Progress bar container */}
        <div className="w-64 h-1.5 bg-slate-800 rounded-full overflow-hidden mb-3 border border-slate-700/50">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 ease-out"
            style={{ width: `${Math.max(progress, 5)}%` }}
          />
        </div>

        {/* Status text */}
        <div className="flex justify-between w-64 text-[11px] text-slate-400 font-mono">
          <span>Reconstrucción Vascular 3D...</span>
          <span className="text-cyan-400 font-semibold">{progress.toFixed(0)}%</span>
        </div>
      </div>
    </div>
  );
}
