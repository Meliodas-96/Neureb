'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { BrainModel } from './BrainModel';
import { HotspotMarkers } from './HotspotMarkers';
import { StudioEnvironment } from './StudioEnvironment';
import { CameraController } from './CameraController';
import { CanvasErrorBoundary } from './CanvasErrorBoundary';
import { useBrainStore } from '@/store/useBrainStore';
import { MODEL_ORIGIN_OFFSET } from '@/data/hotspots';

export function BrainCanvas() {
  const selectHotspot = useBrainStore((state) => state.selectHotspot);

  return (
    <CanvasErrorBoundary>
      <div
        className="w-full h-full relative z-0 cursor-grab active:cursor-grabbing select-none"
        role="region"
        aria-label="Lienzo de interacción 3D del cerebro humano"
      >
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
            localClippingEnabled: true,
          }}
          onCreated={({ gl }) => {
            gl.localClippingEnabled = true;
          }}
          dpr={[1, 2]}
          onPointerMissed={() => {
            selectHotspot(null);
          }}
        >
          <color attach="background" args={['#030712']} />

          <Suspense fallback={null}>
            {/* Main Anatomical Group - Positioned using centralized constant */}
            <group position={[MODEL_ORIGIN_OFFSET[0], MODEL_ORIGIN_OFFSET[1], MODEL_ORIGIN_OFFSET[2]]}>
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
    </CanvasErrorBoundary>
  );
}
