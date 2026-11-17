'use client';

import React, { useState, useEffect } from 'react';
import { BrainCanvas } from '@/components/canvas/BrainCanvas';
import { TopNav } from '@/components/ui/TopNav';
import { LayerPanel } from '@/components/ui/LayerPanel';
import { OpacityControl } from '@/components/ui/OpacityControl';
import { CameraPresetBar } from '@/components/ui/CameraPresetBar';
import { HotspotDetailCard } from '@/components/ui/HotspotDetailCard';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { useBrainStore } from '@/store/useBrainStore';

export default function Home() {
  const [isLayerPanelOpen, setIsLayerPanelOpen] = useState(true);
  const selectHotspot = useBrainStore((state) => state.selectHotspot);

  // Keyboard shortcut: Escape exits focus mode and closes detail card
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        selectHotspot(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectHotspot]);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-clinical-bg">
      {/* 3D WebGL Canvas Layer */}
      <BrainCanvas />

      {/* Loading Progress Screen */}
      <LoadingScreen />

      {/* Floating Clinical UI Layer */}
      <TopNav
        isLayerPanelOpen={isLayerPanelOpen}
        onToggleLayerPanel={() => setIsLayerPanelOpen((prev) => !prev)}
      />

      {/* Anatomical Layer Visibility Drawer */}
      <LayerPanel
        isOpen={isLayerPanelOpen}
        onClose={() => setIsLayerPanelOpen(false)}
      />

      {/* Opacity and X-Ray Modes */}
      <OpacityControl />

      {/* Quick Camera Preset Dock */}
      <CameraPresetBar />

      {/* Medical Info Drawer for Selected Hotspot */}
      <HotspotDetailCard />
    </main>
  );
}
