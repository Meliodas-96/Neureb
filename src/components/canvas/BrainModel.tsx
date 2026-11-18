'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
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
    roughness: 0.29,
    metalness: 0.02,
    clearcoat: 0.88,
    clearcoatRoughness: 0.14,
    convertMapLuma: true,
  },
  Cerebellum: {
    color: '#a86858', // Distinctive richer warm terracotta cerebellar folia
    roughness: 0.33,
    metalness: 0.02,
    clearcoat: 0.84,
    clearcoatRoughness: 0.16,
    convertMapLuma: true,
  },
  Brainstem: {
    color: '#ecd8c3', // Distinctive pale ivory/cream neural column
    roughness: 0.28,
    metalness: 0.02,
    clearcoat: 0.90,
    clearcoatRoughness: 0.12,
    convertMapLuma: true,
  },
  Artery_Cerebral_Media: {
    color: '#dc2626', // Vivid surgical carmine arterial
    roughness: 0.14,
    metalness: 0.06,
    clearcoat: 0.98,
    clearcoatRoughness: 0.08,
  },
  Artery_Cerebral_Anterior: {
    color: '#ef4444', // Bright scarlet arterial
    roughness: 0.14,
    metalness: 0.06,
    clearcoat: 0.98,
    clearcoatRoughness: 0.08,
  },
  Artery_Vertebrobasilar: {
    color: '#b91c1c', // Deep ruby arterial
    roughness: 0.14,
    metalness: 0.06,
    clearcoat: 0.98,
    clearcoatRoughness: 0.08,
  },
  Veins_Cerebral_Superficial: {
    color: '#1d4ed8', // Deep royal cobalt venous blue
    roughness: 0.16,
    metalness: 0.08,
    clearcoat: 0.95,
    clearcoatRoughness: 0.10,
  },
  Cranial_Nerves: {
    color: '#fffbeb', // Pristine ivory-white myelin
    roughness: 0.25,
    metalness: 0.04,
    clearcoat: 0.75,
    clearcoatRoughness: 0.18,
  },

  // Segmented Cerebral Lobes
  Lobe_Frontal: {
    color: '#d9a296',
    roughness: 0.29,
    metalness: 0.02,
    clearcoat: 0.88,
    clearcoatRoughness: 0.14,
    convertMapLuma: true,
  },
  Lobe_Parietal: {
    color: '#cca099',
    roughness: 0.29,
    metalness: 0.02,
    clearcoat: 0.88,
    clearcoatRoughness: 0.14,
    convertMapLuma: true,
  },
  Lobe_Temporal: {
    color: '#e2a89c',
    roughness: 0.29,
    metalness: 0.02,
    clearcoat: 0.88,
    clearcoatRoughness: 0.14,
    convertMapLuma: true,
  },
  Lobe_Occipital: {
    color: '#cfa59e',
    roughness: 0.29,
    metalness: 0.02,
    clearcoat: 0.88,
    clearcoatRoughness: 0.14,
    convertMapLuma: true,
  },
  Lobe_Insular: {
    color: '#e8ada1',
    roughness: 0.28,
    metalness: 0.02,
    clearcoat: 0.90,
    clearcoatRoughness: 0.12,
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
  const isLiveBiologicalAnimation = useBrainStore((state) => state.isLiveBiologicalAnimation);

  const pulsingGroupRef = useRef<THREE.Group>(null);
  const biologicalUniforms = useRef({
    uBioTime: { value: 0 },
    uBioActive: { value: 1.0 },
  });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    biologicalUniforms.current.uBioTime.value = t;
    biologicalUniforms.current.uBioActive.value = isLiveBiologicalAnimation ? 1.0 : 0.0;

    if (pulsingGroupRef.current) {
      if (isLiveBiologicalAnimation) {
        // Human cerebral hemodynamics: dual-peak arterial percussion (P1) and tidal (P2) wave (~68 bpm)
        const pulseP1 = Math.sin(t * 3.8) * 0.0035;
        const pulseP2 = Math.sin(t * 7.6 - 0.45) * 0.0014;
        const totalPulse = pulseP1 + pulseP2;

        pulsingGroupRef.current.scale.set(
          1.0 + totalPulse * 1.15,
          1.0 + totalPulse * 0.85,
          1.0 + totalPulse * 1.05
        );
      } else {
        pulsingGroupRef.current.scale.set(1.0, 1.0, 1.0);
      }
    }
  });

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

          const isArtery =
            name.startsWith('Artery_') ||
            name === 'Artery_Cerebral_Media' ||
            name === 'Artery_Cerebral_Anterior' ||
            name === 'Artery_Vertebrobasilar';

          const isVein =
            name.startsWith('Veins_') ||
            name.startsWith('Sinus_') ||
            name === 'Veins_Cerebral_Superficial';

          const isVentricles = name === 'Ventricular_System';

          const isCerebrumParenchyma = name === 'Cerebrum' || LAYER_PARENT_MAP[name] === 'Cerebrum';
          const isParenchyma =
            isCerebrumParenchyma ||
            name === 'Cerebellum' ||
            name === 'Brainstem' ||
            name.startsWith('Brainstem_') ||
            name.startsWith('Lobe_');

          newMat.customProgramCacheKey = () =>
            isArtery
              ? 'artery-bio'
              : isVein
              ? 'vein-bio'
              : isVentricles
              ? 'ventricle-bio'
              : isParenchyma
              ? 'parenchyma-bio'
              : 'standard-bio';

          newMat.onBeforeCompile = (shader) => {
            shader.uniforms.uBioTime = biologicalUniforms.current.uBioTime;
            shader.uniforms.uBioActive = biologicalUniforms.current.uBioActive;

            shader.vertexShader = shader.vertexShader.replace(
              '#include <common>',
              `
              #include <common>
              varying vec3 vAnatomicalPos;
              `
            );
            shader.vertexShader = shader.vertexShader.replace(
              '#include <begin_vertex>',
              `
              #include <begin_vertex>
              vAnatomicalPos = position;
              `
            );

            shader.fragmentShader = shader.fragmentShader.replace(
              '#include <common>',
              `
              #include <common>
              uniform float uBioTime;
              uniform float uBioActive;
              varying vec3 vAnatomicalPos;
              `
            );

            if (spec.convertMapLuma && newMat.map) {
              shader.fragmentShader = shader.fragmentShader.replace(
                '#include <map_fragment>',
                `
                #ifdef USE_MAP
                  vec4 sampledDiffuseColor = texture2D( map, vMapUv );
                  float luma = dot(sampledDiffuseColor.rgb, vec3(0.299, 0.587, 0.114));
                  // Enhance sulcal depth contrast for realistic deep shadow in anatomical sulci
                  luma = clamp(pow(luma, 1.25) * 1.5, 0.25, 1.35);
                  diffuseColor.rgb *= luma;
                #endif
                `
              );
            }

            let bioGlsl = '';
            if (isArtery) {
              bioGlsl = `
              if (uBioActive > 0.5) {
                // Realistic vascular blood flow: pressurized arterial pulse expanding smoothly along the lumen
                float flowCoord = (vAnatomicalPos.y * 14.0 - vAnatomicalPos.z * 16.0 + vAnatomicalPos.x * 10.0);
                float heartWave = sin(flowCoord - uBioTime * 5.0);
                // Organic non-linear hemodynamic pulse wave
                float systolicPulse = pow(clamp(heartWave * 0.5 + 0.5, 0.0, 1.0), 3.0);
                vec3 oxygenatedBlood = vec3(0.65, 0.08, 0.05) * systolicPulse;
                gl_FragColor.rgb += oxygenatedBlood;
              }
              `;
            } else if (isVein) {
              bioGlsl = `
              if (uBioActive > 0.5) {
                // Deoxygenated continuous laminar venous return
                float venousCoord = (vAnatomicalPos.y * 12.0 - vAnatomicalPos.z * 12.0);
                float venousWave = (sin(venousCoord + uBioTime * 2.5) * 0.5 + 0.5) * 0.20;
                gl_FragColor.rgb += vec3(0.04, 0.15, 0.40) * venousWave;
              }
              `;
            } else if (isVentricles) {
              bioGlsl = `
              if (uBioActive > 0.5) {
                // Dynamic crystalline CSF circulation shimmer
                float csfCoord = (vAnatomicalPos.y * 22.0 - vAnatomicalPos.z * 12.0);
                float csfPulse = sin(csfCoord - uBioTime * 4.2) * 0.5 + 0.5;
                gl_FragColor.rgb += vec3(0.15, 0.75, 1.0) * csfPulse * 0.40;
              }
              `;
            } else if (isParenchyma) {
              bioGlsl = `
              if (uBioActive > 0.5) {
                // Natural hemodynamic capillary perfusion: subtle organic blood oxygenation blush (no artificial lines)
                float cardiacPulse = (sin(uBioTime * 3.8) * 0.5 + 0.5);
                vec3 perfusionColor = vec3(0.035, 0.007, 0.005) * cardiacPulse;
                gl_FragColor.rgb += perfusionColor;
              }
              `;
            }

            if (bioGlsl) {
              shader.fragmentShader = shader.fragmentShader.replace(
                '#include <dithering_fragment>',
                `
                #include <dithering_fragment>
                ${bioGlsl}
                `
              );
            }
          };

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

  return (
    <group ref={pulsingGroupRef}>
      <primitive object={clonedScene} />
    </group>
  );
}

useGLTF.preload('/models/cerebro.glb');
