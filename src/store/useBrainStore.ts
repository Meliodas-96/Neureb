import { create } from 'zustand';
import { AnatomicalLayerId, LayerGroup, CameraPreset } from '@/types/brain';
import { ANATOMICAL_LAYERS } from '@/data/hotspots';

interface BrainState {
  // Layer visibility
  layers: Record<AnatomicalLayerId, boolean>;
  toggleLayer: (id: AnatomicalLayerId) => void;
  setLayer: (id: AnatomicalLayerId, visible: boolean) => void;
  setLayerGroup: (group: LayerGroup, visible: boolean) => void;
  isolateGroup: (group: LayerGroup) => void;
  showAllLayers: () => void;
  hideAllLayers: () => void;

  // Cerebrum transparency / X-Ray mode
  cerebrumOpacity: number;
  isXRayMode: boolean;
  setCerebrumOpacity: (opacity: number) => void;
  toggleXRayMode: () => void;

  // Hotspots
  selectedHotspotId: string | null;
  selectHotspot: (id: string | null) => void;

  // Camera presets
  activeCameraPreset: CameraPreset | null;
  setCameraPreset: (preset: CameraPreset | null) => void;

  // Visual modes
  autoRotate: boolean;
  toggleAutoRotate: () => void;
  wireframe: boolean;
  toggleWireframe: () => void;

  // Reset
  resetView: () => void;
}

const defaultLayers: Record<AnatomicalLayerId, boolean> = {
  Cerebrum: true,
  Cerebellum: true,
  Brainstem: true,
  Artery_Cerebral_Media: true,
  Artery_Cerebral_Anterior: true,
  Artery_Vertebrobasilar: true,
  Veins_Cerebral_Superficial: true,
  Cranial_Nerves: true,
};

export const useBrainStore = create<BrainState>((set, get) => ({
  layers: { ...defaultLayers },

  toggleLayer: (id) =>
    set((state) => ({
      layers: { ...state.layers, [id]: !state.layers[id] },
    })),

  setLayer: (id, visible) =>
    set((state) => ({
      layers: { ...state.layers, [id]: visible },
    })),

  setLayerGroup: (group, visible) =>
    set((state) => {
      const nextLayers = { ...state.layers };
      ANATOMICAL_LAYERS.filter((l) => l.category === group).forEach((l) => {
        nextLayers[l.id] = visible;
      });
      return { layers: nextLayers };
    }),

  isolateGroup: (group) =>
    set(() => {
      const nextLayers = { ...defaultLayers };
      Object.keys(nextLayers).forEach((key) => {
        const item = ANATOMICAL_LAYERS.find((l) => l.id === key);
        nextLayers[key as AnatomicalLayerId] = item ? item.category === group : false;
      });
      return { layers: nextLayers };
    }),

  showAllLayers: () => set({ layers: { ...defaultLayers } }),

  hideAllLayers: () =>
    set(() => {
      const nextLayers = { ...defaultLayers };
      Object.keys(nextLayers).forEach((k) => {
        nextLayers[k as AnatomicalLayerId] = false;
      });
      return { layers: nextLayers };
    }),

  cerebrumOpacity: 1.0,
  isXRayMode: false,

  setCerebrumOpacity: (opacity) =>
    set({
      cerebrumOpacity: opacity,
      isXRayMode: opacity < 0.85,
    }),

  toggleXRayMode: () =>
    set((state) => {
      const nextXRay = !state.isXRayMode;
      return {
        isXRayMode: nextXRay,
        cerebrumOpacity: nextXRay ? 0.22 : 1.0,
      };
    }),

  selectedHotspotId: null,
  selectHotspot: (id) =>
    set({
      selectedHotspotId: id,
      // If a hotspot is selected, we clear preset so they don't fight
      activeCameraPreset: null,
    }),

  activeCameraPreset: null,
  setCameraPreset: (preset) =>
    set({
      activeCameraPreset: preset,
      selectedHotspotId: null,
    }),

  autoRotate: false,
  toggleAutoRotate: () => set((state) => ({ autoRotate: !state.autoRotate })),

  wireframe: false,
  toggleWireframe: () => set((state) => ({ wireframe: !state.wireframe })),

  resetView: () =>
    set({
      layers: { ...defaultLayers },
      cerebrumOpacity: 1.0,
      isXRayMode: false,
      selectedHotspotId: null,
      activeCameraPreset: 'isometric',
      autoRotate: false,
      wireframe: false,
    }),
}));
