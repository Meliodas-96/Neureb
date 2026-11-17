'use client';

import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { HOTSPOTS_DATA } from '@/data/hotspots';
import { useBrainStore } from '@/store/useBrainStore';
import { AnatomicalLayerId } from '@/types/brain';
import { Crosshair } from 'lucide-react';

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
  const showHotspotMarkers = useBrainStore((state) => state.showHotspotMarkers);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <group name="hotspots-group">
      {HOTSPOTS_DATA.map((hotspot) => {
        const parentLayer = HOTSPOT_LAYER_MAP[hotspot.id];
        const isParentVisible = !parentLayer || layers[parentLayer];
        const isSelected = selectedHotspotId === hotspot.id;
        const isHovered = hoveredId === hotspot.id;

        // Visibility condition:
        // When a hotspot is selected: ONLY that hotspot remains visible
        // When no hotspot is selected: all hotspots belonging to visible layers are shown
        const isVisible =
          showHotspotMarkers &&
          isParentVisible &&
          (!selectedHotspotId || isSelected);

        return (
          <group
            key={hotspot.id}
            position={hotspot.position}
            visible={isVisible}
          >
            {/* 
              CRITICAL FIX FOR REACT 19 + DREI <Html> ROOT UNMOUNTING:
              We keep the <Html> component mounted permanently in the DOM tree
              and toggle display/opacity via CSS. This prevents Drei from calling
              root.unmount() during concurrent render, which resolves both:
              1) "Failed to execute 'removeChild' on 'Node'"
              2) "Attempted to synchronously unmount a root while React was already rendering"
            */}
            <Html
              center
              zIndexRange={[100, 0]}
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
              >
                {isSelected ? (
                  /* SLEEK SURGICAL FOCUS RETICLE FOR THE SELECTED HOTSPOT */
                  <div className="relative flex items-center justify-center">
                    <div
                      className="absolute w-12 h-12 rounded-full border border-dashed border-cyan-400/80 animate-spin"
                      style={{ animationDuration: '8s' }}
                    />
                    <div className="absolute w-8 h-8 rounded-full border border-cyan-400/60 bg-cyan-500/10 animate-ping-slow" />
                    <div className="relative w-6 h-6 rounded-full bg-slate-950/80 border border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-900/60">
                      <Crosshair className="w-3.5 h-3.5 text-cyan-300" />
                    </div>
                  </div>
                ) : (
                  /* COMPACT ANATOMICAL PIN (When in overview mode) */
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
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap px-2.5 py-1 rounded-lg text-[11px] font-medium backdrop-blur-md border border-slate-700/80 bg-slate-950/95 text-slate-100 shadow-xl z-50 pointer-events-none">
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
