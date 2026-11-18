export type PrimaryLayerId =
  | 'Cerebrum'
  | 'Cerebellum'
  | 'Brainstem'
  | 'Artery_Cerebral_Media'
  | 'Artery_Cerebral_Anterior'
  | 'Artery_Vertebrobasilar'
  | 'Veins_Cerebral_Superficial'
  | 'Cranial_Nerves';

export type SegmentedStructureId =
  // Subdivisión de Lóbulos
  | 'Lobe_Frontal'
  | 'Lobe_Parietal'
  | 'Lobe_Temporal'
  | 'Lobe_Occipital'
  | 'Lobe_Insular'
  // Subdivisión del Tronco
  | 'Brainstem_Mesencephalon'
  | 'Brainstem_Pons'
  | 'Brainstem_Medulla'
  // 12 Pares Craneales
  | 'CN_I_Olfactory'
  | 'CN_II_Optic'
  | 'CN_III_Oculomotor'
  | 'CN_IV_Trochlear'
  | 'CN_V_Trigeminal'
  | 'CN_VI_Abducens'
  | 'CN_VII_Facial'
  | 'CN_VIII_Vestibulocochlear'
  | 'CN_IX_Glossopharyngeal'
  | 'CN_X_Vagus'
  | 'CN_XI_Accessory'
  | 'CN_XII_Hypoglossal'
  // Estructuras Subcorticales
  | 'Corpus_Callosum'
  | 'Ventricular_System'
  | 'Thalamus'
  | 'Hippocampus'
  | 'Basal_Ganglia'
  // Senos Venosos Durales
  | 'Sinus_Sagittal_Superior'
  | 'Sinus_Transverse_Sigmoid';

export type AnatomicalLayerId = PrimaryLayerId | SegmentedStructureId;

export type LayerGroup = 'arteries' | 'veins' | 'parenchyma' | 'nerves';

export interface LayerMetadata {
  id: PrimaryLayerId;
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

export type AnatomicalSystem =
  | 'Pares Craneales'
  | 'Lóbulos y Giros'
  | 'Áreas de Brodmann'
  | 'Tronco Encefálico'
  | 'Surcos y Cisuras'
  | 'Estructuras Profundas'
  | 'Arterial'
  | 'Venoso'
  | 'Corteza y Parénquima';

export type ClippingAxis = 'none' | 'sagittal' | 'coronal' | 'axial';

export interface QuizQuestion {
  id: string;
  category: string;
  type: 'clinical' | 'anatomical';
  question: string;
  clinicalVignette?: string;
  targetHotspotId: string;
  hint: string;
  explanation: string;
}

export interface HotspotData {
  id: string;
  title: string;
  latinTitle: string;
  system: AnatomicalSystem;
  targetLayer: AnatomicalLayerId;
  categoryColor: string;
  position: [number, number, number];
  cameraOffset: [number, number, number];
  summary: string;
  anatomy: string;
  function: string;
  clinicalSignificance: string;
  surgicalNotes: string;
  brodmannArea?: string;
  relatedHotspotIds?: string[];
}
