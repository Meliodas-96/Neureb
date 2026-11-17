'use client';

import React from 'react';
import { ContactShadows } from '@react-three/drei';

export function StudioEnvironment() {
  return (
    <>
      {/* Ambient illumination - Balanced clinical fill */}
      <ambientLight intensity={0.65} color="#f8fafc" />

      {/* Primary Key Light - Soft anatomical highlight */}
      <directionalLight
        position={[5, 7, 5]}
        intensity={1.65}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Secondary Fill Light - Neutral soft contrast */}
      <directionalLight
        position={[-5, 4, -4]}
        intensity={0.95}
        color="#f1f5f9"
      />

      {/* Rim Light - Defines cortical contours and sulci boundaries */}
      <directionalLight
        position={[0, 5, -6]}
        intensity={1.1}
        color="#e2e8f0"
      />

      {/* Underside / Base Light - Illuminates the brainstem and vertebrobasilar tree */}
      <directionalLight
        position={[0, -5, 2]}
        intensity={0.75}
        color="#ffffff"
      />

      {/* Contact Shadow on surgical dark floor */}
      <ContactShadows
        position={[0, -0.48, 0]}
        opacity={0.45}
        scale={3.2}
        blur={2}
        far={2}
        color="#000000"
      />
    </>
  );
}
