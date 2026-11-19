import { create } from 'zustand';
import { PrimaryLayerId, LayerGroup, CameraPreset } from '@/types/brain';
import { ANATOMICAL_LAYERS } from '@/data/hotspots';

interface BrainState {
  // Layer visibility
  layers: Record<PrimaryLayerId, boolean>;
  toggleLayer: (id: PrimaryLayerId) => void;
  setLayer: (id: PrimaryLayerId, visible: boolean) => void;
  setLayerGroup: (group: LayerGroup, visible: boolean) => void;
  isolateGroup: (group: LayerGroup) => void;
  showAllLayers: () => void;
  hideAllLayers: () => void;

  // Cerebrum transparency / X-Ray mode
  cerebrumOpacity: number;
  isXRayMode: boolean;
  setCerebrumOpacity: (opacity: number) => void;
  toggleXRayMode: () => void;
  isOpacityPanelOpen: boolean;
  setIsOpacityPanelOpen: (open: boolean) => void;

  // Hotspots and Focus Mode
  selectedHotspotId: string | null;
  selectHotspot: (id: string | null) => void;
  hoveredHotspotId: string | null;
  setHoveredHotspotId: (id: string | null) => void;
  showHotspotMarkers: boolean;
  toggleHotspotMarkers: () => void;
  focusIsolationType: 'ghost' | 'isolate';
  setFocusIsolationType: (type: 'ghost' | 'isolate') => void;

  // Camera presets
  activeCameraPreset: CameraPreset | null;
  setCameraPreset: (preset: CameraPreset | null) => void;

  // Visual modes
  autoRotate: boolean;
  toggleAutoRotate: () => void;
  wireframe: boolean;
  toggleWireframe: () => void;
  isLiveBiologicalAnimation: boolean;
  toggleLiveBiologicalAnimation: () => void;

  // System filters & Search
  activeSystemFilter: string;
  setActiveSystemFilter: (filter: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Cross-section clipping planes
  clippingAxis: 'none' | 'sagittal' | 'coronal' | 'axial';
  setClippingAxis: (axis: 'none' | 'sagittal' | 'coronal' | 'axial') => void;
  clippingOffset: number;
  setClippingOffset: (offset: number) => void;
  isClippingPanelOpen: boolean;
  setIsClippingPanelOpen: (open: boolean) => void;

  // Medical Quiz & Study Modal
  isQuizOpen: boolean;
  setIsQuizOpen: (open: boolean) => void;

  // Reset
  resetView: () => void;
}

const defaultLayers: Record<PrimaryLayerId, boolean> = {
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
        nextLayers[key as PrimaryLayerId] = item ? item.category === group : false;
      });
      return { layers: nextLayers };
    }),

  showAllLayers: () => set({ layers: { ...defaultLayers } }),

  hideAllLayers: () =>
    set(() => {
      const nextLayers = { ...defaultLayers };
      Object.keys(nextLayers).forEach((k) => {
        nextLayers[k as PrimaryLayerId] = false;
      });
      return { layers: nextLayers };
    }),

  cerebrumOpacity: 1.0,
  isXRayMode: false,
  isOpacityPanelOpen: false,
  setIsOpacityPanelOpen: (open) => set({ isOpacityPanelOpen: open }),

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
  hoveredHotspotId: null,
  setHoveredHotspotId: (id) => set({ hoveredHotspotId: id }),
  selectHotspot: (id) =>
    set({
      selectedHotspotId: id,
      hoveredHotspotId: null,
      activeCameraPreset: null,
    }),

  showHotspotMarkers: true,
  toggleHotspotMarkers: () =>
    set((state) => ({ showHotspotMarkers: !state.showHotspotMarkers })),

  focusIsolationType: 'ghost',
  setFocusIsolationType: (type) => set({ focusIsolationType: type }),

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

  isLiveBiologicalAnimation: true,
  toggleLiveBiologicalAnimation: () =>
    set((state) => ({ isLiveBiologicalAnimation: !state.isLiveBiologicalAnimation })),

  activeSystemFilter: 'all',
  setActiveSystemFilter: (filter) => set({ activeSystemFilter: filter }),

  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  isSearchOpen: false,
  setIsSearchOpen: (open) => set({ isSearchOpen: open }),

  clippingAxis: 'none',
  setClippingAxis: (axis) => set({ clippingAxis: axis }),

  clippingOffset: 0,
  setClippingOffset: (offset) => set({ clippingOffset: offset }),

  isClippingPanelOpen: false,
  setIsClippingPanelOpen: (open) => set({ isClippingPanelOpen: open }),

  isQuizOpen: false,
  setIsQuizOpen: (open) => set({ isQuizOpen: open }),

  resetView: () =>
    set({
      layers: { ...defaultLayers },
      cerebrumOpacity: 1.0,
      isXRayMode: false,
      selectedHotspotId: null,
      hoveredHotspotId: null,
      activeCameraPreset: 'isometric',
      autoRotate: false,
      wireframe: false,
      isLiveBiologicalAnimation: true,
      showHotspotMarkers: true,
      focusIsolationType: 'ghost',
      activeSystemFilter: 'all',
      searchQuery: '',
      isSearchOpen: false,
      clippingAxis: 'none',
      clippingOffset: 0,
      isClippingPanelOpen: false,
      isOpacityPanelOpen: false,
      isQuizOpen: false,
    }),
}));
