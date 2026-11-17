'use client';

import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useBrainStore } from '@/store/useBrainStore';
import { CAMERA_PRESETS, HOTSPOTS_DATA } from '@/data/hotspots';

export function CameraController() {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();

  const activeCameraPreset = useBrainStore((state) => state.activeCameraPreset);
  const selectedHotspotId = useBrainStore((state) => state.selectedHotspotId);
  const autoRotate = useBrainStore((state) => state.autoRotate);

  const targetCameraPos = useRef(new THREE.Vector3(-1.2, 0.9, -1.3));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const isTransitioning = useRef(false);

  // Group offset applied to the brain model
  const GROUP_OFFSET = new THREE.Vector3(0, -0.175, -0.081);

  // React to Camera Preset triggers
  useEffect(() => {
    if (!activeCameraPreset) return;
    const preset = CAMERA_PRESETS.find((p) => p.id === activeCameraPreset);
    if (preset) {
      targetCameraPos.current.set(...preset.position);
      targetLookAt.current.set(...preset.target);
      isTransitioning.current = true;
    }
  }, [activeCameraPreset]);

  // React to Hotspot selection
  useEffect(() => {
    if (!selectedHotspotId) return;
    const hotspot = HOTSPOTS_DATA.find((h) => h.id === selectedHotspotId);
    if (hotspot) {
      // Hotspot position in world coordinates (adding group offset)
      const worldHotspot = new THREE.Vector3(...hotspot.position).add(GROUP_OFFSET);
      
      // Calculate eye position based on camera offset
      const eye = new THREE.Vector3(
        worldHotspot.x + hotspot.cameraOffset[0],
        worldHotspot.y + hotspot.cameraOffset[1],
        worldHotspot.z + hotspot.cameraOffset[2]
      );

      targetLookAt.current.copy(worldHotspot);
      targetCameraPos.current.copy(eye);
      isTransitioning.current = true;
    }
  }, [selectedHotspotId]);

  useFrame((_, delta) => {
    if (isTransitioning.current && controlsRef.current) {
      const step = Math.min(delta * 4.5, 0.15);
      camera.position.lerp(targetCameraPos.current, step);
      controlsRef.current.target.lerp(targetLookAt.current, step);
      controlsRef.current.update();

      const distCam = camera.position.distanceTo(targetCameraPos.current);
      const distTarget = controlsRef.current.target.distanceTo(targetLookAt.current);

      if (distCam < 0.01 && distTarget < 0.01) {
        camera.position.copy(targetCameraPos.current);
        controlsRef.current.target.copy(targetLookAt.current);
        controlsRef.current.update();
        isTransitioning.current = false;
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      rotateSpeed={0.8}
      zoomSpeed={1.0}
      panSpeed={0.8}
      minDistance={0.5}
      maxDistance={4.5}
      maxPolarAngle={Math.PI - 0.05}
      minPolarAngle={0.05}
      autoRotate={autoRotate && !isTransitioning.current}
      autoRotateSpeed={1.2}
      onStart={() => {
        // User manually intervened, interrupt smooth programmatic transition
        isTransitioning.current = false;
      }}
    />
  );
}
