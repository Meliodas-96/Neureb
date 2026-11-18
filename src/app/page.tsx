'use client';

import React, { useState, useEffect } from 'react';
import { BrainCanvas } from '@/components/canvas/BrainCanvas';
import { TopNav } from '@/components/ui/TopNav';
import { LayerPanel } from '@/components/ui/LayerPanel';
import { OpacityControl } from '@/components/ui/OpacityControl';
import { CameraPresetBar } from '@/components/ui/CameraPresetBar';
import { HotspotDetailCard } from '@/components/ui/HotspotDetailCard';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { HelpModal } from '@/components/ui/HelpModal';
import { UrlStateSync } from '@/components/ui/UrlStateSync';
import { useBrainStore } from '@/store/useBrainStore';

export default function Home() {
  const [isLayerPanelOpen, setIsLayerPanelOpen] = useState(true);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const selectHotspot = useBrainStore((state) => state.selectHotspot);
  const selectedHotspotId = useBrainStore((state) => state.selectedHotspotId);

  // Global Keyboard shortcuts:
  // - Escape: closes help modal first, or exits surgical focus mode
  // - '?' / 'h': toggles help modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isHelpOpen) {
          setIsHelpOpen(false);
        } else if (selectedHotspotId) {
          selectHotspot(null);
        }
      } else if (e.key === '?' || (e.key === 'h' && !e.ctrlKey && !e.metaKey)) {
        if (document.activeElement?.tagName !== 'INPUT') {
          e.preventDefault();
          setIsHelpOpen((prev) => !prev);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectHotspot, selectedHotspotId, isHelpOpen]);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-clinical-bg">
      {/* URL Query Params Synchronizer (?hotspot=...&preset=...&xray=...) */}
      <UrlStateSync />

      {/* 3D WebGL Canvas Layer with Error Boundary */}
      <BrainCanvas />

      {/* Loading Progress Screen */}
      <LoadingScreen />

      {/* Floating Clinical UI Layer */}
      <TopNav
        isLayerPanelOpen={isLayerPanelOpen}
        onToggleLayerPanel={() => setIsLayerPanelOpen((prev) => !prev)}
        onOpenHelp={() => setIsHelpOpen((prev) => !prev)}
      />

      {/* Anatomical Layer Visibility Drawer (Left) */}
      <LayerPanel
        isOpen={isLayerPanelOpen}
        onClose={() => setIsLayerPanelOpen(false)}
      />

      {/* Opacity and X-Ray Modes (Bottom Left) */}
      <OpacityControl />

      {/* Quick Camera Preset Dock (Bottom Center) */}
      <CameraPresetBar />

      {/* 
        Right Floating Slot:
        If Help is open, display the Help Panel.
        Otherwise, if a Hotspot is selected, display the Medical Info Drawer.
        Zero full-screen blackout or backdrop blur over the 3D scene!
      */}
      {isHelpOpen ? (
        <HelpModal
          isOpen={isHelpOpen}
          onClose={() => setIsHelpOpen(false)}
        />
      ) : (
        <HotspotDetailCard />
      )}
    </main>
  );
}
