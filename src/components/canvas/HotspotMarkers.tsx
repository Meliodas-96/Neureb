'use client';

import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { HOTSPOTS_DATA } from '@/data/hotspots';
import { useBrainStore } from '@/store/useBrainStore';
import { AnatomicalLayerId } from '@/types/brain';

const HOTSPOT_LAYER_MAP: Record<string, AnatomicalLayerId> = {
  mca_bifurcation: 'Artery_Cerebral_Media',
  aca_acom: 'Artery_Cerebral_Anterior',
  basilar_apex: 'Artery_Vertebrobasilar',
  optic_chiasm: 'Cranial_Nerves',
  pons_brainstem: 'Brainstem',
  cerebellum_hemisphere: 'Cerebellum',
  temporal_lobe: 'Cerebrum',
  superficial_veins: 'Veins_Cerebral_Superficial',
};

export function HotspotMarkers() {
  const selectedHotspotId = useBrainStore((state) => state.selectedHotspotId);
  const selectHotspot = useBrainStore((state) => state.selectHotspot);
  const layers = useBrainStore((state) => state.layers);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <group name="hotspots-group">
      {HOTSPOTS_DATA.map((hotspot) => {
        const parentLayer = HOTSPOT_LAYER_MAP[hotspot.id];
        if (parentLayer && !layers[parentLayer]) {
          return null;
        }

        const isSelected = selectedHotspotId === hotspot.id;
        const isHovered = hoveredId === hotspot.id;

        return (
          <group key={hotspot.id} position={hotspot.position}>
            <Html
              center
              zIndexRange={[100, 0]}
              style={{
                transition: 'transform 0.15s ease',
                pointerEvents: 'auto',
              }}
            >
              <div
                className="relative flex items-center justify-center cursor-pointer group"
                onClick={(e) => {
                  e.stopPropagation();
                  selectHotspot(isSelected ? null : hotspot.id);
                }}
                onMouseEnter={() => setHoveredId(hotspot.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Pulsing Radar Ring */}
                <div
                  className={`absolute rounded-full pointer-events-none transition-all duration-500 ${
                    isSelected
                      ? 'w-8 h-8 border-2 border-cyan-400 bg-cyan-400/20 animate-ping-slow'
                      : 'w-6 h-6 border border-slate-300/60 animate-radar'
                  }`}
                  style={{
                    borderColor: isSelected ? '#22d3ee' : hotspot.categoryColor,
                  }}
                />

                {/* Core Dot Pin */}
                <div
                  className={`relative flex items-center justify-center rounded-full transition-transform duration-200 shadow-md ${
                    isSelected
                      ? 'w-4 h-4 ring-2 ring-cyan-400 scale-125'
                      : 'w-3.5 h-3.5 group-hover:scale-125 ring-1.5 ring-white/80'
                  }`}
                  style={{
                    backgroundColor: hotspot.categoryColor,
                    boxShadow: `0 0 8px ${hotspot.categoryColor}`,
                  }}
                >
                  <div className="w-1 h-1 bg-white rounded-full" />
                </div>

                {/* Hover Tooltip - Only when not already selected to avoid UI collision */}
                {isHovered && !isSelected && (
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-1 rounded-md text-[11px] font-medium backdrop-blur-md border border-slate-700/80 bg-slate-950/90 text-slate-100 shadow-lg z-50 pointer-events-none">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full inline-block"
                        style={{ backgroundColor: hotspot.categoryColor }}
                      />
                      <span>{hotspot.title}</span>
                    </div>
                  </div>
                )}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
