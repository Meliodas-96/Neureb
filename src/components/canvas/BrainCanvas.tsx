'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { BrainModel } from './BrainModel';
import { HotspotMarkers } from './HotspotMarkers';
import { StudioEnvironment } from './StudioEnvironment';
import { CameraController } from './CameraController';

export function BrainCanvas() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing select-none">
      <Canvas
        camera={{
          position: [-1.2, 0.9, -1.3],
          fov: 42,
          near: 0.05,
          far: 50,
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]} // High DPI crisp rendering
      >
        <color attach="background" args={['#030712']} />
        
        <Suspense fallback={null}>
          {/* Main Anatomical Group - Centered at coordinates origin */}
          <group position={[0, -0.175, -0.081]}>
            <BrainModel />
            <HotspotMarkers />
          </group>

          {/* Clinical studio lighting and shadow floor */}
          <StudioEnvironment />

          {/* Controls and cinematic camera interpolation */}
          <CameraController />
        </Suspense>
      </Canvas>
    </div>
  );
}
