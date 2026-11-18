'use client';

import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { HOTSPOTS_DATA, HOTSPOT_LAYER_MAP, LAYER_PARENT_MAP } from '@/data/hotspots';
import { useBrainStore } from '@/store/useBrainStore';
import { Crosshair } from 'lucide-react';

export function HotspotMarkers() {
  const selectedHotspotId = useBrainStore((state) => state.selectedHotspotId);
  const selectHotspot = useBrainStore((state) => state.selectHotspot);
  const layers = useBrainStore((state) => state.layers);
  const showHotspotMarkers = useBrainStore((state) => state.showHotspotMarkers);
  const activeSystemFilter = useBrainStore((state) => state.activeSystemFilter);
  const searchQuery = useBrainStore((state) => state.searchQuery);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const cleanQuery = searchQuery.trim().toLowerCase();

  return (
    <group name="hotspots-group">
      {HOTSPOTS_DATA.map((hotspot) => {
        const targetLayer = HOTSPOT_LAYER_MAP[hotspot.id];
        const primaryLayer = targetLayer ? LAYER_PARENT_MAP[targetLayer] : null;
        const isParentVisible = !primaryLayer || layers[primaryLayer];
        const isSelected = selectedHotspotId === hotspot.id;
        const isHovered = hoveredId === hotspot.id;

        const matchesSystem = activeSystemFilter === 'all' || hotspot.system === activeSystemFilter;
        const matchesSearch = !cleanQuery ||
          hotspot.title.toLowerCase().includes(cleanQuery) ||
          hotspot.latinTitle.toLowerCase().includes(cleanQuery) ||
          hotspot.summary.toLowerCase().includes(cleanQuery) ||
          hotspot.system.toLowerCase().includes(cleanQuery);

        const isVisible =
          showHotspotMarkers &&
          isParentVisible &&
          (isSelected || (!selectedHotspotId && matchesSystem && matchesSearch));

        return (
          <group
            key={hotspot.id}
            position={hotspot.position}
            visible={isVisible}
          >
            {/*
              zIndexRange is strictly set to [5, 0] so 3D HTML pins stay in the 3D layer (z <= 5)
              and NEVER bleed over UI panels (which are at z-40 and z-50).
            */}
            <Html
              center
              zIndexRange={[5, 0]}
              style={{
                display: isVisible ? 'flex' : 'none',
                pointerEvents: isVisible ? 'auto' : 'none',
                transition: 'opacity 0.2s ease',
                opacity: isVisible ? 1 : 0,
              }}
            >
              <div
                className="relative flex items-center justify-center cursor-pointer group select-none"
                onClick={(e) => {
                  e.stopPropagation();
                  selectHotspot(isSelected ? null : hotspot.id);
                }}
                onMouseEnter={() => setHoveredId(hotspot.id)}
                onMouseLeave={() => setHoveredId(null)}
                role="button"
                tabIndex={isVisible ? 0 : -1}
                aria-label={`Punto anatómico: ${hotspot.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectHotspot(isSelected ? null : hotspot.id);
                  }
                }}
              >
                {isSelected ? (
                  <div className="relative flex items-center justify-center">
                    <div
                      className="absolute w-12 h-12 rounded-full border border-dashed border-cyan-400/80 animate-spin"
                      style={{ animationDuration: '8s' }}
                    />
                    <div className="absolute w-8 h-8 rounded-full border border-cyan-400/60 bg-cyan-500/10 animate-ping-slow" />
                    <div className="relative w-6 h-6 rounded-full bg-slate-950/90 border border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-900/60">
                      <Crosshair className="w-3.5 h-3.5 text-cyan-300" />
                    </div>
                  </div>
                ) : (
                  <>
                    <div
                      className="absolute w-5 h-5 rounded-full pointer-events-none animate-radar"
                      style={{
                        borderColor: hotspot.categoryColor,
                        borderWidth: '1px',
                      }}
                    />

                    <div
                      className="relative w-3 h-3 rounded-full transition-transform duration-200 group-hover:scale-135 shadow-md ring-1 ring-white/70"
                      style={{
                        backgroundColor: hotspot.categoryColor,
                        boxShadow: `0 0 6px ${hotspot.categoryColor}`,
                      }}
                    >
                      <div className="w-1 h-1 bg-white rounded-full m-auto mt-0.5" />
                    </div>

                    {isHovered && (
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap px-2.5 py-1 rounded-lg text-[11px] font-medium backdrop-blur-md border border-slate-700/80 bg-slate-950/95 text-slate-100 shadow-xl z-10 pointer-events-none">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-1.5 h-1.5 rounded-full inline-block"
                            style={{ backgroundColor: hotspot.categoryColor }}
                          />
                          <span>{hotspot.title}</span>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
