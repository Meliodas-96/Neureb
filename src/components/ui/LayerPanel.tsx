'use client';

import React from 'react';
import { useBrainStore } from '@/store/useBrainStore';
import { ANATOMICAL_LAYERS } from '@/data/hotspots';
import { AnatomicalLayerId } from '@/types/brain';
import {
  Eye,
  EyeOff,
  Activity,
  HeartPulse,
  Brain,
  Zap,
  CheckCheck,
  X,
} from 'lucide-react';

interface LayerPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LayerPanel({ isOpen, onClose }: LayerPanelProps) {
  const layers = useBrainStore((state) => state.layers);
  const toggleLayer = useBrainStore((state) => state.toggleLayer);
  const setLayerGroup = useBrainStore((state) => state.setLayerGroup);
  const isolateGroup = useBrainStore((state) => state.isolateGroup);
  const showAllLayers = useBrainStore((state) => state.showAllLayers);

  if (!isOpen) return null;

  const arteries = ANATOMICAL_LAYERS.filter((l) => l.category === 'arteries');
  const veins = ANATOMICAL_LAYERS.filter((l) => l.category === 'veins');
  const nerves = ANATOMICAL_LAYERS.filter((l) => l.category === 'nerves');
  const parenchyma = ANATOMICAL_LAYERS.filter((l) => l.category === 'parenchyma');

  const areAllArteriesVisible = arteries.every((l) => layers[l.id]);
  const areAllParenchymaVisible = parenchyma.every((l) => layers[l.id]);

  return (
    <aside className="fixed left-3 top-16 bottom-20 z-20 w-80 max-w-[calc(100vw-1.5rem)] flex flex-col rounded-2xl border border-slate-800/80 glass-panel shadow-2xl overflow-hidden pointer-events-auto transition-all animate-in fade-in slide-in-from-left duration-200">
      {/* Panel Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/80 bg-slate-900/40">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-100">
            Capas Anatómicas
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 rounded-lg transition"
          title="Cerrar panel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Filter Actions */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-800/60 bg-slate-950/30">
        <button
          onClick={() => {
            // Isolate vascular network (arteries + veins)
            showAllLayers();
            useBrainStore.getState().setLayer('Cerebrum', false);
            useBrainStore.getState().setLayer('Cerebellum', false);
            useBrainStore.getState().setLayer('Brainstem', false);
          }}
          className="flex-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium bg-red-950/40 border border-red-500/30 text-red-300 hover:bg-red-900/50 hover:border-red-400/50 transition flex items-center justify-center gap-1.5"
        >
          <HeartPulse className="w-3.5 h-3.5 text-red-400" />
          Solo Vasos
        </button>

        <button
          onClick={showAllLayers}
          className="px-2.5 py-1.5 rounded-lg text-[11px] font-medium bg-slate-800/60 border border-slate-700/50 text-slate-200 hover:bg-slate-700/60 transition flex items-center justify-center gap-1.5"
        >
          <CheckCheck className="w-3.5 h-3.5 text-cyan-400" />
          Mostrar Todo
        </button>
      </div>

      {/* Layers List Scrollable */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4 text-xs">
        {/* ARTERIES GROUP */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-1.5 py-1 text-[11px] font-semibold text-red-400 tracking-wider uppercase">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444]" />
              Red Arterial Cerebral
            </span>
            <button
              onClick={() => setLayerGroup('arteries', !areAllArteriesVisible)}
              className="text-[10px] text-slate-400 hover:text-red-300 font-mono transition"
            >
              {areAllArteriesVisible ? 'Ocultar' : 'Activar'}
            </button>
          </div>

          <div className="space-y-1">
            {arteries.map((layer) => {
              const isVisible = layers[layer.id];
              return (
                <LayerItem
                  key={layer.id}
                  id={layer.id}
                  name={layer.name}
                  latinName={layer.latinName}
                  color={layer.color}
                  isVisible={isVisible}
                  onToggle={() => toggleLayer(layer.id)}
                />
              );
            })}
          </div>
        </div>

        {/* VEINS GROUP */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-1.5 py-1 text-[11px] font-semibold text-sky-400 tracking-wider uppercase">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_6px_#38bdf8]" />
              Sistema Venoso Cortical
            </span>
          </div>

          <div className="space-y-1">
            {veins.map((layer) => {
              const isVisible = layers[layer.id];
              return (
                <LayerItem
                  key={layer.id}
                  id={layer.id}
                  name={layer.name}
                  latinName={layer.latinName}
                  color={layer.color}
                  isVisible={isVisible}
                  onToggle={() => toggleLayer(layer.id)}
                />
              );
            })}
          </div>
        </div>

        {/* CRANIAL NERVES GROUP */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-1.5 py-1 text-[11px] font-semibold text-amber-300 tracking-wider uppercase">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_6px_#fde047]" />
              Pares Craneales y Quiasma
            </span>
          </div>

          <div className="space-y-1">
            {nerves.map((layer) => {
              const isVisible = layers[layer.id];
              return (
                <LayerItem
                  key={layer.id}
                  id={layer.id}
                  name={layer.name}
                  latinName={layer.latinName}
                  color={layer.color}
                  isVisible={isVisible}
                  onToggle={() => toggleLayer(layer.id)}
                />
              );
            })}
          </div>
        </div>

        {/* PARENCHYMA GROUP */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-1.5 py-1 text-[11px] font-semibold text-slate-300 tracking-wider uppercase">
            <span className="flex items-center gap-1.5">
              <Brain className="w-3.5 h-3.5 text-slate-400" />
              Parénquima y Tronco
            </span>
            <button
              onClick={() => setLayerGroup('parenchyma', !areAllParenchymaVisible)}
              className="text-[10px] text-slate-400 hover:text-slate-200 font-mono transition"
            >
              {areAllParenchymaVisible ? 'Ocultar' : 'Activar'}
            </button>
          </div>

          <div className="space-y-1">
            {parenchyma.map((layer) => {
              const isVisible = layers[layer.id];
              return (
                <LayerItem
                  key={layer.id}
                  id={layer.id}
                  name={layer.name}
                  latinName={layer.latinName}
                  color={layer.color}
                  isVisible={isVisible}
                  onToggle={() => toggleLayer(layer.id)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}

interface LayerItemProps {
  id: AnatomicalLayerId;
  name: string;
  latinName: string;
  color: string;
  isVisible: boolean;
  onToggle: () => void;
}

function LayerItem({ id, name, latinName, color, isVisible, onToggle }: LayerItemProps) {
  return (
    <div
      onClick={onToggle}
      className={`group flex items-center justify-between px-2.5 py-2 rounded-xl cursor-pointer border transition-all ${
        isVisible
          ? 'bg-slate-900/60 border-slate-800 text-slate-200 hover:border-slate-700'
          : 'bg-slate-950/40 border-slate-900/50 text-slate-500 hover:border-slate-800'
      }`}
    >
      <div className="flex items-center gap-2.5 min-w-0 pr-2">
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0 transition-opacity"
          style={{
            backgroundColor: color,
            opacity: isVisible ? 1 : 0.25,
            boxShadow: isVisible ? `0 0 8px ${color}80` : 'none',
          }}
        />
        <div className="truncate">
          <p className="text-xs font-medium truncate">{name}</p>
          <p className="text-[10px] text-slate-400 font-mono italic truncate">
            {latinName}
          </p>
        </div>
      </div>

      <button
        type="button"
        className={`p-1 rounded-lg shrink-0 transition ${
          isVisible
            ? 'text-cyan-400 group-hover:bg-cyan-950/30'
            : 'text-slate-600 group-hover:bg-slate-900'
        }`}
        title={isVisible ? 'Ocultar capa' : 'Mostrar capa'}
      >
        {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}
