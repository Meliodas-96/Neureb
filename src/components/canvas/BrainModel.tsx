'use client';

import React, { useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useBrainStore } from '@/store/useBrainStore';
import { AnatomicalLayerId, PrimaryLayerId } from '@/types/brain';
import { HOTSPOT_LAYER_MAP, MODEL_ORIGIN_OFFSET, LAYER_PARENT_MAP } from '@/data/hotspots';

interface AnatomyMaterialSpec {
  color: string;
  roughness: number;
  metalness: number;
  clearcoat: number;
  clearcoatRoughness: number;
  convertMapLuma?: boolean;
}

const ANATOMY_SPECS: Record<string, AnatomyMaterialSpec> = {
  // Legacy & Primary Layers
  Cerebrum: {
    color: '#d9a296', // Realistic organic living brain cortex pinkish-beige
    roughness: 0.38,
    metalness: 0.02,
    clearcoat: 0.45,
    clearcoatRoughness: 0.25,
    convertMapLuma: true,
  },
  Cerebellum: {
    color: '#a86858', // Distinctive richer warm terracotta cerebellar folia
    roughness: 0.42,
    metalness: 0.02,
    clearcoat: 0.4,
    clearcoatRoughness: 0.3,
    convertMapLuma: true,
  },
  Brainstem: {
    color: '#ecd8c3', // Distinctive pale ivory/cream neural column
    roughness: 0.35,
    metalness: 0.02,
    clearcoat: 0.5,
    clearcoatRoughness: 0.2,
    convertMapLuma: true,
  },
  Artery_Cerebral_Media: {
    color: '#dc2626', // Vivid surgical carmine arterial
    roughness: 0.18,
    metalness: 0.08,
    clearcoat: 0.9,
    clearcoatRoughness: 0.1,
  },
  Artery_Cerebral_Anterior: {
    color: '#ef4444', // Bright scarlet arterial
    roughness: 0.18,
    metalness: 0.08,
    clearcoat: 0.9,
    clearcoatRoughness: 0.1,
  },
  Artery_Vertebrobasilar: {
    color: '#b91c1c', // Deep ruby arterial
    roughness: 0.18,
    metalness: 0.08,
    clearcoat: 0.9,
    clearcoatRoughness: 0.1,
  },
  Veins_Cerebral_Superficial: {
    color: '#1d4ed8', // Deep royal cobalt venous blue
    roughness: 0.2,
    metalness: 0.1,
    clearcoat: 0.85,
    clearcoatRoughness: 0.15,
  },
  Cranial_Nerves: {
    color: '#fffbeb', // Pristine ivory-white myelin
    roughness: 0.28,
    metalness: 0.04,
    clearcoat: 0.6,
    clearcoatRoughness: 0.2,
  },

  // Segmented Cerebral Lobes
  Lobe_Frontal: {
    color: '#d9a296',
    roughness: 0.38,
    metalness: 0.02,
    clearcoat: 0.45,
    clearcoatRoughness: 0.25,
    convertMapLuma: true,
  },
  Lobe_Parietal: {
    color: '#cca099',
    roughness: 0.38,
    metalness: 0.02,
    clearcoat: 0.45,
    clearcoatRoughness: 0.25,
    convertMapLuma: true,
  },
  Lobe_Temporal: {
    color: '#e2a89c',
    roughness: 0.38,
    metalness: 0.02,
    clearcoat: 0.45,
    clearcoatRoughness: 0.25,
    convertMapLuma: true,
  },
  Lobe_Occipital: {
    color: '#cfa59e',
    roughness: 0.38,
    metalness: 0.02,
    clearcoat: 0.45,
    clearcoatRoughness: 0.25,
    convertMapLuma: true,
  },
  Lobe_Insular: {
    color: '#e8ada1',
    roughness: 0.36,
    metalness: 0.02,
    clearcoat: 0.5,
    clearcoatRoughness: 0.2,
    convertMapLuma: true,
  },

  // Segmented Brainstem
  Brainstem_Mesencephalon: {
    color: '#eddcc7',
    roughness: 0.35,
    metalness: 0.02,
    clearcoat: 0.5,
    clearcoatRoughness: 0.2,
    convertMapLuma: true,
  },
  Brainstem_Pons: {
    color: '#f2e4d2',
    roughness: 0.35,
    metalness: 0.02,
    clearcoat: 0.5,
    clearcoatRoughness: 0.2,
    convertMapLuma: true,
  },
  Brainstem_Medulla: {
    color: '#e5d4be',
    roughness: 0.35,
    metalness: 0.02,
    clearcoat: 0.5,
    clearcoatRoughness: 0.2,
    convertMapLuma: true,
  },

  // Deep Subcortical Structures
  Corpus_Callosum: {
    color: '#fef08a',
    roughness: 0.32,
    metalness: 0.02,
    clearcoat: 0.6,
    clearcoatRoughness: 0.2,
  },
  Ventricular_System: {
    color: '#38bdf8', // Cerebrospinal fluid crystalline cyan
    roughness: 0.15,
    metalness: 0.05,
    clearcoat: 0.9,
    clearcoatRoughness: 0.1,
  },
  Thalamus: {
    color: '#f59e0b', // Diencephalic warm amber
    roughness: 0.38,
    metalness: 0.02,
    clearcoat: 0.5,
    clearcoatRoughness: 0.2,
  },
  Hippocampus: {
    color: '#fb7185', // Archicortex coral-rose
    roughness: 0.35,
    metalness: 0.02,
    clearcoat: 0.5,
    clearcoatRoughness: 0.2,
  },
  Basal_Ganglia: {
    color: '#eab308', // Striatum gold
    roughness: 0.38,
    metalness: 0.02,
    clearcoat: 0.5,
    clearcoatRoughness: 0.2,
  },

  // Dural Venous Sinuses
  Sinus_Sagittal_Superior: {
    color: '#1d4ed8',
    roughness: 0.2,
    metalness: 0.1,
    clearcoat: 0.85,
    clearcoatRoughness: 0.15,
  },
  Sinus_Transverse_Sigmoid: {
    color: '#1e40af',
    roughness: 0.2,
    metalness: 0.1,
    clearcoat: 0.85,
    clearcoatRoughness: 0.15,
  },

  // 12 Cranial Nerves
  CN_I_Olfactory: { color: '#fffbeb', roughness: 0.28, metalness: 0.04, clearcoat: 0.6, clearcoatRoughness: 0.2 },
  CN_II_Optic: { color: '#fffbeb', roughness: 0.28, metalness: 0.04, clearcoat: 0.6, clearcoatRoughness: 0.2 },
  CN_III_Oculomotor: { color: '#fffbeb', roughness: 0.28, metalness: 0.04, clearcoat: 0.6, clearcoatRoughness: 0.2 },
  CN_IV_Trochlear: { color: '#fffbeb', roughness: 0.28, metalness: 0.04, clearcoat: 0.6, clearcoatRoughness: 0.2 },
  CN_V_Trigeminal: { color: '#fffbeb', roughness: 0.28, metalness: 0.04, clearcoat: 0.6, clearcoatRoughness: 0.2 },
  CN_VI_Abducens: { color: '#fffbeb', roughness: 0.28, metalness: 0.04, clearcoat: 0.6, clearcoatRoughness: 0.2 },
  CN_VII_Facial: { color: '#fffbeb', roughness: 0.28, metalness: 0.04, clearcoat: 0.6, clearcoatRoughness: 0.2 },
  CN_VIII_Vestibulocochlear: { color: '#fffbeb', roughness: 0.28, metalness: 0.04, clearcoat: 0.6, clearcoatRoughness: 0.2 },
  CN_IX_Glossopharyngeal: { color: '#fffbeb', roughness: 0.28, metalness: 0.04, clearcoat: 0.6, clearcoatRoughness: 0.2 },
  CN_X_Vagus: { color: '#fffbeb', roughness: 0.28, metalness: 0.04, clearcoat: 0.6, clearcoatRoughness: 0.2 },
  CN_XI_Accessory: { color: '#fffbeb', roughness: 0.28, metalness: 0.04, clearcoat: 0.6, clearcoatRoughness: 0.2 },
  CN_XII_Hypoglossal: { color: '#fffbeb', roughness: 0.28, metalness: 0.04, clearcoat: 0.6, clearcoatRoughness: 0.2 },
};

export function BrainModel() {
  const { scene } = useGLTF('/models/cerebro.glb');
  const layers = useBrainStore((state) => state.layers);
  const cerebrumOpacity = useBrainStore((state) => state.cerebrumOpacity);
  const wireframe = useBrainStore((state) => state.wireframe);
  const selectedHotspotId = useBrainStore((state) => state.selectedHotspotId);
  const focusIsolationType = useBrainStore((state) => state.focusIsolationType);
  const clippingAxis = useBrainStore((state) => state.clippingAxis);
  const clippingOffset = useBrainStore((state) => state.clippingOffset);

  // Clipping plane calculation taking scene group offset into account
  const clippingPlanes = useMemo(() => {
    if (clippingAxis === 'none') return null;

    if (clippingAxis === 'sagittal') {
      return [new THREE.Plane(new THREE.Vector3(1, 0, 0), -(MODEL_ORIGIN_OFFSET[0] + clippingOffset))];
    }
    if (clippingAxis === 'coronal') {
      return [new THREE.Plane(new THREE.Vector3(0, 0, 1), -(MODEL_ORIGIN_OFFSET[2] + clippingOffset))];
    }
    if (clippingAxis === 'axial') {
      return [new THREE.Plane(new THREE.Vector3(0, 1, 0), -(MODEL_ORIGIN_OFFSET[1] + clippingOffset))];
    }
    return null;
  }, [clippingAxis, clippingOffset]);

  // Target layer currently in focus (if any)
  const focusedLayer: AnatomicalLayerId | null = selectedHotspotId
    ? HOTSPOT_LAYER_MAP[selectedHotspotId] || null
    : null;

  // Clone scene and convert materials into physical anatomical materials with distinctive colors
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const name = child.name;
        const spec = ANATOMY_SPECS[name] || (LAYER_PARENT_MAP[name] ? ANATOMY_SPECS[LAYER_PARENT_MAP[name]] : null);

        if (spec && mesh.material) {
          const oldMat = (Array.isArray(mesh.material)
            ? mesh.material[0]
            : mesh.material) as THREE.MeshStandardMaterial;

          const newMat = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(spec.color),
            roughness: spec.roughness,
            metalness: spec.metalness,
            clearcoat: spec.clearcoat,
            clearcoatRoughness: spec.clearcoatRoughness,
            normalMap: oldMat.normalMap || null,
            roughnessMap: oldMat.roughnessMap || null,
            metalnessMap: oldMat.metalnessMap || null,
            map: oldMat.map || null,
          });

          if (spec.convertMapLuma && newMat.map) {
            newMat.onBeforeCompile = (shader) => {
              shader.fragmentShader = shader.fragmentShader.replace(
                '#include <map_fragment>',
                `
                #ifdef USE_MAP
                  vec4 sampledDiffuseColor = texture2D( map, vMapUv );
                  float luma = dot(sampledDiffuseColor.rgb, vec3(0.299, 0.587, 0.114));
                  luma = clamp(pow(luma, 1.15) * 1.45, 0.35, 1.25);
                  diffuseColor.rgb *= luma;
                #endif
                `
              );
            };
          }

          mesh.material = newMat;
        }
      }
    });

    return clone;
  }, [scene]);

  // Update visibility, focus isolation, and opacity
  useEffect(() => {
    clonedScene.traverse((child) => {
      const name = child.name;
      const spec = ANATOMY_SPECS[name] || (LAYER_PARENT_MAP[name] ? ANATOMY_SPECS[LAYER_PARENT_MAP[name]] : null);

      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const mat = mesh.material as THREE.MeshPhysicalMaterial;

        if (!mat || !spec) return;

        mat.wireframe = wireframe;

        // Apply cross-section clipping plane to parenchyma layers (Cerebral lobes & Cerebellum)
        const isCerebrumParenchyma = name === 'Cerebrum' || LAYER_PARENT_MAP[name] === 'Cerebrum';
        const shouldClip = isCerebrumParenchyma || name === 'Cerebellum';
        mat.clippingPlanes = shouldClip && clippingPlanes ? clippingPlanes : null;
        mat.clipShadows = true;
        mat.side = THREE.DoubleSide;

        const parentLayer = LAYER_PARENT_MAP[name] || (name as PrimaryLayerId);
        const isParentVisible = parentLayer in layers ? layers[parentLayer as PrimaryLayerId] : true;

        // --- CASE 1: SURGICAL FOCUS MODE (A hotspot is selected) ---
        if (focusedLayer) {
          const isTarget = name === focusedLayer || (LAYER_PARENT_MAP[name] && LAYER_PARENT_MAP[name] === focusedLayer);

          if (isTarget) {
            // Target structure: 100% full opacity, vibrant spec color + surgical emissive glow
            child.visible = true;
            mat.transparent = false;
            mat.opacity = 1.0;
            mat.depthWrite = true;
            mat.color.set(spec.color);
            mat.emissive.set(spec.color).multiplyScalar(0.25);
            mat.roughness = spec.roughness * 0.85;
            mat.clearcoat = 1.0;
            mesh.renderOrder = 20;
          } else {
            // Unrelated structures:
            if (focusIsolationType === 'isolate') {
              child.visible = false;
            } else {
              child.visible = isParentVisible;
              mat.transparent = true;
              mat.opacity = 0.06;
              mat.depthWrite = false;
              mat.color.set('#334155');
              mat.emissive.set(0x000000);
              mat.roughness = 0.85;
              mat.clearcoat = 0.05;
              mesh.renderOrder = 1;
            }
          }
        } else {
          // --- CASE 2: NORMAL OVERVIEW MODE ---
          child.visible = isParentVisible;

          mat.emissive.set(0x000000);

          if (isCerebrumParenchyma) {
            const isTransparent = cerebrumOpacity < 0.98;
            mat.transparent = isTransparent;
            mat.opacity = cerebrumOpacity;
            mat.depthWrite = !isTransparent;

            if (isTransparent) {
              mat.color.set('#c8b0aa');
              mat.roughness = 0.3;
              mat.clearcoat = 0.8;
            } else {
              mat.color.set(spec.color);
              mat.roughness = spec.roughness;
              mat.clearcoat = spec.clearcoat;
            }

            mesh.renderOrder = isTransparent ? 10 : 1;
          } else {
            mat.transparent = false;
            mat.opacity = 1.0;
            mat.depthWrite = true;
            mat.color.set(spec.color);
            mat.roughness = spec.roughness;
            mat.clearcoat = spec.clearcoat;
            mesh.renderOrder = 1;
          }
        }

        mat.needsUpdate = true;
      }
    });
  }, [clonedScene, layers, cerebrumOpacity, wireframe, focusedLayer, focusIsolationType, clippingPlanes]);

  return <primitive object={clonedScene} />;
}

useGLTF.preload('/models/cerebro.glb');
