export type AnatomicalLayerId =
  | 'Cerebrum'
  | 'Cerebellum'
  | 'Brainstem'
  | 'Artery_Cerebral_Media'
  | 'Artery_Cerebral_Anterior'
  | 'Artery_Vertebrobasilar'
  | 'Veins_Cerebral_Superficial'
  | 'Cranial_Nerves';

export type LayerGroup = 'arteries' | 'veins' | 'parenchyma' | 'nerves';

export interface LayerMetadata {
  id: AnatomicalLayerId;
  name: string;
  latinName: string;
  category: LayerGroup;
  color: string;
  badgeColor: string;
  description: string;
}

export type CameraPreset =
  | 'anterior'
  | 'posterior'
  | 'left'
  | 'right'
  | 'superior'
  | 'base'
  | 'isometric';

export interface CameraPresetConfig {
  id: CameraPreset;
  label: string;
  position: [number, number, number];
  target: [number, number, number];
  description: string;
}

export interface HotspotData {
  id: string;
  title: string;
  latinTitle: string;
  system: 'Arterial' | 'Venoso' | 'Tronco y Pares' | 'Corteza y Parénquima';
  targetLayer: AnatomicalLayerId;
  categoryColor: string;
  position: [number, number, number];
  cameraOffset: [number, number, number];
  summary: string;
  anatomy: string;
  function: string;
  clinicalSignificance: string;
  surgicalNotes: string;
}
