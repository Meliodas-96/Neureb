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
import { HotspotSearchFilter } from '@/components/ui/HotspotSearchFilter';
import { ClippingControl } from '@/components/ui/ClippingControl';
import { StudyQuizModal } from '@/components/ui/StudyQuizModal';
import { UrlStateSync } from '@/components/ui/UrlStateSync';
import { useBrainStore } from '@/store/useBrainStore';

export default function Home() {
  const [isLayerPanelOpen, setIsLayerPanelOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const selectHotspot = useBrainStore((state) => state.selectHotspot);
  const selectedHotspotId = useBrainStore((state) => state.selectedHotspotId);
  const isQuizOpen = useBrainStore((state) => state.isQuizOpen);
  const setIsQuizOpen = useBrainStore((state) => state.setIsQuizOpen);
  const isSearchOpen = useBrainStore((state) => state.isSearchOpen);
  const setIsSearchOpen = useBrainStore((state) => state.setIsSearchOpen);

  // Open layer panel by default on desktop screens, but keep closed on mobile so 3D model is visible
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      setIsLayerPanelOpen(true);
    }
  }, []);

  // Global Keyboard shortcuts:
  // - Cmd+K / Ctrl+K / '/': opens neuroanatomy search modal
  // - Escape: closes search modal, help modal, quiz, or exits surgical focus mode
  // - '?' / 'h': toggles help modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
        return;
      }

      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        setIsSearchOpen(true);
        return;
      }

      if (e.key === 'Escape') {
        if (isSearchOpen) {
          setIsSearchOpen(false);
        } else if (isHelpOpen) {
          setIsHelpOpen(false);
        } else if (isQuizOpen) {
          setIsQuizOpen(false);
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
  }, [selectHotspot, selectedHotspotId, isHelpOpen, isQuizOpen, setIsQuizOpen, isSearchOpen, setIsSearchOpen]);

  return (
    <main className="relative w-screen h-[100dvh] overflow-hidden bg-clinical-bg select-none">
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

      {/* Real-time Neuroanatomy Search & System Filter Bar */}
      <HotspotSearchFilter />

      {/* Anatomical Layer Visibility Drawer (Left) */}
      <LayerPanel
        isOpen={isLayerPanelOpen}
        onClose={() => setIsLayerPanelOpen(false)}
      />

      {/* Real-time 3D Cross-Section Clipping Controls */}
      <ClippingControl />

      {/* Opacity and X-Ray Modes (Bottom Left) */}
      <OpacityControl />

      {/* Quick Camera Preset Dock (Bottom Center) */}
      <CameraPresetBar />

      {/* 
        Right Floating Slot:
        If Help is open, display the Help Panel.
        Otherwise, if Quiz is open, display the Quiz / Tour Academy.
        Otherwise, if a Hotspot is selected, display the Medical Info Drawer.
        Zero full-screen blackout or backdrop blur over the 3D scene!
      */}
      {isHelpOpen ? (
        <HelpModal
          isOpen={isHelpOpen}
          onClose={() => setIsHelpOpen(false)}
        />
      ) : isQuizOpen ? (
        <StudyQuizModal />
      ) : (
        <HotspotDetailCard />
      )}
    </main>
  );
}
