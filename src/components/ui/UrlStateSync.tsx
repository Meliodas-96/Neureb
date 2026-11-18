'use client';

import { useEffect, useRef } from 'react';
import { useBrainStore } from '@/store/useBrainStore';
import { HOTSPOTS_DATA, CAMERA_PRESETS } from '@/data/hotspots';
import { CameraPreset } from '@/types/brain';

export function UrlStateSync() {
  const selectedHotspotId = useBrainStore((state) => state.selectedHotspotId);
  const selectHotspot = useBrainStore((state) => state.selectHotspot);
  const isXRayMode = useBrainStore((state) => state.isXRayMode);
  const toggleXRayMode = useBrainStore((state) => state.toggleXRayMode);
  const activeCameraPreset = useBrainStore((state) => state.activeCameraPreset);
  const setCameraPreset = useBrainStore((state) => state.setCameraPreset);

  const isInitialized = useRef(false);

  // 1. Initial URL load: parse search params and apply initial state
  useEffect(() => {
    if (typeof window === 'undefined' || isInitialized.current) return;
    isInitialized.current = true;

    try {
      const searchParams = new URLSearchParams(window.location.search);
      const hotspotParam = searchParams.get('hotspot');
      const presetParam = searchParams.get('preset');
      const xrayParam = searchParams.get('xray');

      if (xrayParam === 'true') {
        toggleXRayMode();
      }

      if (hotspotParam) {
        const found = HOTSPOTS_DATA.find((h) => h.id === hotspotParam);
        if (found) {
          selectHotspot(found.id);
        }
      } else if (presetParam) {
        const foundPreset = CAMERA_PRESETS.find((p) => p.id === presetParam);
        if (foundPreset) {
          setCameraPreset(foundPreset.id as CameraPreset);
        }
      }
    } catch (e) {
      console.warn('UrlStateSync initial read error:', e);
    }
  }, [selectHotspot, setCameraPreset, toggleXRayMode]);

  // 2. React to state changes and synchronize URL query string smoothly
  useEffect(() => {
    if (typeof window === 'undefined' || !isInitialized.current) return;

    try {
      const params = new URLSearchParams();

      if (selectedHotspotId) {
        params.set('hotspot', selectedHotspotId);
      }
      if (activeCameraPreset && activeCameraPreset !== 'isometric') {
        params.set('preset', activeCameraPreset);
      }
      if (isXRayMode) {
        params.set('xray', 'true');
      }

      const queryString = params.toString();
      const newUrl = queryString ? `?${queryString}` : window.location.pathname;

      if (window.location.search !== (queryString ? `?${queryString}` : '')) {
        window.history.replaceState(null, '', newUrl);
      }
    } catch (e) {
      console.warn('UrlStateSync update error:', e);
    }
  }, [selectedHotspotId, activeCameraPreset, isXRayMode]);

  return null;
}
