'use client';

import React from 'react';
import { ContactShadows } from '@react-three/drei';
import { useBrainStore } from '@/store/useBrainStore';
import { HOTSPOTS_DATA } from '@/data/hotspots';

export function StudioEnvironment() {
  const selectedHotspotId = useBrainStore((state) => state.selectedHotspotId);

  const activeHotspot = selectedHotspotId
    ? HOTSPOTS_DATA.find((h) => h.id === selectedHotspotId)
    : null;

  return (
    <>
      {/* Ambient illumination - Balanced clinical fill */}
      <ambientLight intensity={activeHotspot ? 0.45 : 0.65} color="#f8fafc" />

      {/* Primary Key Light - Soft anatomical highlight */}
      <directionalLight
        position={[5, 7, 5]}
        intensity={activeHotspot ? 1.2 : 1.65}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Secondary Fill Light - Neutral soft contrast */}
      <directionalLight
        position={[-5, 4, -4]}
        intensity={activeHotspot ? 0.6 : 0.95}
        color="#f1f5f9"
      />

      {/* Rim Light - Defines cortical contours and sulci boundaries */}
      <directionalLight
        position={[0, 5, -6]}
        intensity={activeHotspot ? 0.8 : 1.1}
        color="#e2e8f0"
      />

      {/* Underside / Base Light - Illuminates the brainstem and vertebrobasilar tree */}
      <directionalLight
        position={[0, -5, 2]}
        intensity={activeHotspot ? 0.5 : 0.75}
        color="#ffffff"
      />

      {/* Focused Surgical Spotlight when a structure is selected */}
      {activeHotspot && (
        <pointLight
          position={[
            activeHotspot.position[0] + activeHotspot.cameraOffset[0] * 0.4,
            activeHotspot.position[1] - 0.175 + activeHotspot.cameraOffset[1] * 0.4,
            activeHotspot.position[2] - 0.081 + activeHotspot.cameraOffset[2] * 0.4,
          ]}
          intensity={3.2}
          distance={2.8}
          decay={2}
          color="#ffffff"
        />
      )}

      {/* Contact Shadow on surgical dark floor */}
      <ContactShadows
        position={[0, -0.48, 0]}
        opacity={activeHotspot ? 0.25 : 0.45}
        scale={3.2}
        blur={2}
        far={2}
        color="#000000"
      />
    </>
  );
}
