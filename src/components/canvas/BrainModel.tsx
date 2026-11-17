'use client';

import React, { useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useBrainStore } from '@/store/useBrainStore';
import { AnatomicalLayerId } from '@/types/brain';

interface AnatomyMaterialSpec {
  color: string;
  roughness: number;
  metalness: number;
  clearcoat: number;
  clearcoatRoughness: number;
  convertMapLuma?: boolean;
}

const ANATOMY_SPECS: Record<AnatomicalLayerId, AnatomyMaterialSpec> = {
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
};

export function BrainModel() {
  const { scene } = useGLTF('/models/cerebro.glb');
  const layers = useBrainStore((state) => state.layers);
  const cerebrumOpacity = useBrainStore((state) => state.cerebrumOpacity);
  const wireframe = useBrainStore((state) => state.wireframe);

  // Clone scene and convert materials into physical anatomical materials with distinctive colors
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const name = child.name as AnatomicalLayerId;
        const spec = ANATOMY_SPECS[name];

        if (spec && mesh.material) {
          const oldMat = (Array.isArray(mesh.material) ? mesh.material[0] : mesh.material) as THREE.MeshStandardMaterial;

          // Create new MeshPhysicalMaterial preserving maps (normal, roughness)
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

          // If material has an embedded texture map, convert monochromatic red to realistic biological crevice shading
          if (spec.convertMapLuma && newMat.map) {
            newMat.onBeforeCompile = (shader) => {
              shader.fragmentShader = shader.fragmentShader.replace(
                '#include <map_fragment>',
                `
                #ifdef USE_MAP
                  vec4 sampledDiffuseColor = texture2D( map, vMapUv );
                  // Convert raw red texture into balanced micro-crevice illumination
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

  // Update visibility and opacity
  useEffect(() => {
    clonedScene.traverse((child) => {
      const name = child.name as AnatomicalLayerId;

      // Layer Visibility check
      if (name in layers) {
        child.visible = layers[name];
      }

      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const mat = mesh.material as THREE.MeshPhysicalMaterial;

        if (mat) {
          mat.wireframe = wireframe;

          // Cerebrum transparency and depth configuration
          if (name === 'Cerebrum') {
            const isTransparent = cerebrumOpacity < 0.98;
            mat.transparent = isTransparent;
            mat.opacity = cerebrumOpacity;
            mat.depthWrite = !isTransparent;
            
            // In X-Ray mode, cool slightly to frosted crystal so internal vessels pop
            if (isTransparent) {
              mat.color.set('#c8b0aa');
              mat.roughness = 0.3;
              mat.clearcoat = 0.8;
            } else {
              mat.color.set(ANATOMY_SPECS.Cerebrum.color);
              mat.roughness = ANATOMY_SPECS.Cerebrum.roughness;
              mat.clearcoat = ANATOMY_SPECS.Cerebrum.clearcoat;
            }

            mesh.renderOrder = isTransparent ? 10 : 1;
          } else {
            mesh.renderOrder = 1;
          }

          mat.needsUpdate = true;
        }
      }
    });
  }, [clonedScene, layers, cerebrumOpacity, wireframe]);

  return <primitive object={clonedScene} />;
}

useGLTF.preload('/models/cerebro.glb');
