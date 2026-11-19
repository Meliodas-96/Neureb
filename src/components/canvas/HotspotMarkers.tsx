'use client';

import React, { useState, useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { HOTSPOTS_DATA, HOTSPOT_LAYER_MAP, LAYER_PARENT_MAP } from '@/data/hotspots';
import { useBrainStore } from '@/store/useBrainStore';
import { Crosshair } from 'lucide-react';
import { HotspotData } from '@/types/brain';

interface HotspotPinProps {
  hotspot: HotspotData;
  isSelected: boolean;
  selectedHotspotId: string | null;
  isVisible: boolean;
  onSelect: (id: string | null) => void;
}

function HotspotPin({
  hotspot,
  isSelected,
  selectedHotspotId,
  isVisible,
  onSelect,
}: HotspotPinProps) {
  const pinGroupRef = useRef<THREE.Group>(null);
  const htmlGroupRef = useRef<THREE.Group>(null);
  const htmlWrapperRef = useRef<HTMLDivElement>(null);
  const dotMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const photonMeshRef = useRef<THREE.Mesh>(null);

  const [isHovered, setIsHovered] = useState(false);
  const currentOpacity = useRef(0);
  const { camera } = useThree();

  // Phase offset to naturally de-synchronize animations across hotspots
  const animPhase = useMemo(
    () =>
      Math.abs(
        hotspot.position[0] * 7.1 + hotspot.position[1] * 13.3 + hotspot.position[2] * 17.7
      ),
    [hotspot.position]
  );

  // Temporary vectors to avoid garbage collection inside useFrame loop (60-120 fps)
  const tempWorldPos = useMemo(() => new THREE.Vector3(), []);
  const tempCamDir = useMemo(() => new THREE.Vector3(), []);
  const tempQuat = useMemo(() => new THREE.Quaternion(), []);
  const tempNormalWorld = useMemo(() => new THREE.Vector3(), []);

  // Facing normal: custom normal > cameraOffset direction > radial from anatomical center
  const facingNormal = useMemo(() => {
    if (hotspot.normal) {
      return new THREE.Vector3(...hotspot.normal).normalize();
    }
    if (hotspot.cameraOffset) {
      return new THREE.Vector3(...hotspot.cameraOffset).normalize();
    }
    return new THREE.Vector3(
      hotspot.position[0],
      hotspot.position[1] - 0.2,
      hotspot.position[2] - 0.05
    ).normalize();
  }, [hotspot.normal, hotspot.cameraOffset, hotspot.position]);

  // Stem line calculation: projects outward along surface normal (leader line)
  const stemLength = hotspot.stemLength ?? 0.028;
  const stemTip = useMemo(() => {
    return facingNormal.clone().multiplyScalar(stemLength);
  }, [facingNormal, stemLength]);

  // 3D Leader line primitive
  const lineObject = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array([0, 0, 0, stemTip.x, stemTip.y, stemTip.z]);
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.LineBasicMaterial({
      color: hotspot.categoryColor,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });
    return new THREE.Line(geom, mat);
  }, [stemTip.x, stemTip.y, stemTip.z, hotspot.categoryColor]);

  const isLiveBiologicalAnimation = useBrainStore((state) => state.isLiveBiologicalAnimation);

  useFrame(({ clock }) => {
    if (!pinGroupRef.current || !isVisible) return;

    // Calculate world position & camera vector
    pinGroupRef.current.getWorldPosition(tempWorldPos);
    tempCamDir.subVectors(camera.position, tempWorldPos).normalize();

    // Transform facing normal by group rotation
    pinGroupRef.current.getWorldQuaternion(tempQuat);
    tempNormalWorld.copy(facingNormal).applyQuaternion(tempQuat);

    // Angle test between camera and surface normal (backface culling)
    const dot = tempNormalWorld.dot(tempCamDir);

    let targetOpacity = 0;
    if (isSelected) {
      targetOpacity = dot > -0.35 ? 1.0 : 0.3;
    } else if (selectedHotspotId) {
      // Spotlight mode: dim all unselected visible points to focus attention
      targetOpacity = dot > 0.15 ? 0.15 : 0.0;
    } else {
      // Smooth angle culling: fades out gracefully when facing away from camera
      if (dot >= 0.22) {
        targetOpacity = 1.0;
      } else if (dot <= -0.05) {
        targetOpacity = 0.0;
      } else {
        targetOpacity = (dot - -0.05) / 0.27;
      }
    }

    // Smooth lerp for liquid transitions
    currentOpacity.current = THREE.MathUtils.lerp(currentOpacity.current, targetOpacity, 0.16);
    const op = currentOpacity.current;

    // Biological pulsation in sync with cardiac hemodynamics
    const t = clock.getElapsedTime();
    const bioPulse = isLiveBiologicalAnimation ? Math.sin(t * 3.8) * 0.18 + 0.82 : 1.0;
    const lineFlow = isLiveBiologicalAnimation ? Math.sin(t * 4.6) * 0.15 + 0.85 : 1.0;

    // 3D Levitation of the floating pin
    if (htmlGroupRef.current) {
      const levitate = Math.sin(t * 2.8 + animPhase) * 0.0028;
      htmlGroupRef.current.position.set(
        stemTip.x + facingNormal.x * levitate,
        stemTip.y + facingNormal.y * levitate,
        stemTip.z + facingNormal.z * levitate
      );
    }

    // Photonic particle traveling up the 3D stem line from cortex to pin
    if (photonMeshRef.current) {
      const progress = (t * 1.5 + animPhase) % 1.0;
      photonMeshRef.current.position.set(
        stemTip.x * progress,
        stemTip.y * progress,
        stemTip.z * progress
      );
    }

    // Direct DOM and material updates (no React re-renders in useFrame!)
    if (htmlWrapperRef.current) {
      htmlWrapperRef.current.style.opacity = op.toFixed(3);
      htmlWrapperRef.current.style.pointerEvents = op > 0.25 ? 'auto' : 'none';
      htmlWrapperRef.current.style.visibility = op < 0.015 ? 'hidden' : 'visible';
    }

    if (lineObject.material) {
      (lineObject.material as THREE.LineBasicMaterial).opacity =
        op * (isHovered || isSelected ? 0.90 : 0.45) * lineFlow;
    }

    if (dotMatRef.current) {
      dotMatRef.current.opacity = op * (isHovered || isSelected ? 1.0 : 0.65) * bioPulse;
    }
  });

  if (!isVisible) return null;

  return (
    <group ref={pinGroupRef} position={hotspot.position}>
      {/* 1. Surface Contact Point (Anchored to cortical/vascular surface) */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.0035, 10, 10]} />
        <meshBasicMaterial
          ref={dotMatRef}
          color={hotspot.categoryColor}
          transparent
          opacity={0.75}
          depthWrite={false}
        />
      </mesh>

      {/* 2. 3D Leader Line (Delicate surgical stem projecting outward) */}
      <primitive object={lineObject} />

      {/* 3. Photonic signal packet traveling along stem */}
      <mesh ref={photonMeshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.0018, 8, 8]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} depthWrite={false} />
      </mesh>

      {/* 4. Floating 3D Pin with perspective distance scaling */}
      <group ref={htmlGroupRef} position={[stemTip.x, stemTip.y, stemTip.z]}>
        <Html
          center
          distanceFactor={1.8}
          zIndexRange={[5, 0]}
        >
          <div
            ref={htmlWrapperRef}
            style={{
              transition: 'transform 0.15s ease-out',
              willChange: 'opacity, transform',
            }}
            className="relative flex items-center justify-center cursor-pointer group select-none min-w-[36px] min-h-[36px]"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(isSelected ? null : hotspot.id);
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            role="button"
            tabIndex={0}
            aria-label={`Punto anatómico: ${hotspot.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect(isSelected ? null : hotspot.id);
              }
            }}
          >
            {isSelected ? (
              /* Selected Focus Reticle */
              <div className="relative flex items-center justify-center">
                <div
                  className="absolute w-14 h-14 rounded-full border border-dashed border-cyan-400/80 animate-spin"
                  style={{ animationDuration: '6s' }}
                />
                <div className="absolute w-10 h-10 rounded-full border border-cyan-400/60 bg-cyan-500/10 animate-ping-slow" />
                <div className="relative w-7 h-7 rounded-full bg-slate-950/95 border-2 border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-900/80">
                  <Crosshair className="w-4 h-4 text-cyan-300 animate-pulse" />
                </div>
              </div>
            ) : isHovered ? (
              /* Hover Active Preview */
              <>
                <div
                  className="absolute w-8 h-8 rounded-full pointer-events-none animate-radar"
                  style={{
                    borderColor: hotspot.categoryColor,
                    borderWidth: '1.5px',
                  }}
                />
                <div
                  className="absolute w-6 h-6 rounded-full pointer-events-none animate-ping-slow"
                  style={{
                    backgroundColor: hotspot.categoryColor,
                    opacity: 0.4,
                  }}
                />
                <div
                  className="relative w-4 h-4 rounded-full scale-125 shadow-xl ring-2 ring-white transition-transform duration-150 flex items-center justify-center"
                  style={{
                    backgroundColor: hotspot.categoryColor,
                    boxShadow: `0 0 12px ${hotspot.categoryColor}, 0 0 24px ${hotspot.categoryColor}80`,
                  }}
                >
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping-slow" />
                </div>

                {/* Glassmorphism Expanded Card */}
                <div className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-medium backdrop-blur-md border border-slate-700/80 bg-slate-950/95 text-slate-100 shadow-2xl z-20 pointer-events-none flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block shrink-0 shadow-sm animate-pulse"
                      style={{ backgroundColor: hotspot.categoryColor }}
                    />
                    <span className="font-bold text-slate-100 tracking-wide">{hotspot.title}</span>
                  </div>
                  {hotspot.latinTitle && (
                    <span className="text-[10px] text-slate-400 italic pl-4">
                      {hotspot.latinTitle}
                    </span>
                  )}
                </div>
              </>
            ) : (
              /* Rest State: Animated Holographic Beacon */
              <div className="relative flex items-center justify-center">
                {/* Ambient Expanding Sonar Ripple */}
                <div
                  className="absolute -inset-2.5 rounded-full pointer-events-none animate-ping-slow"
                  style={{
                    backgroundColor: hotspot.categoryColor,
                    opacity: 0.35,
                    animationDuration: '3s',
                  }}
                />
                {/* Rotating dashed techno ring */}
                <div
                  className="absolute -inset-2 rounded-full border border-dashed pointer-events-none opacity-45 animate-spin"
                  style={{
                    borderColor: hotspot.categoryColor,
                    animationDuration: '14s',
                  }}
                />
                {/* Concentric subtle radar pulse */}
                <div
                  className="absolute -inset-1 rounded-full pointer-events-none animate-radar"
                  style={{
                    borderColor: hotspot.categoryColor,
                    borderWidth: '1px',
                    animationDuration: '2.4s',
                  }}
                />
                {/* Central Glowing Beacon Core */}
                <div
                  className="relative w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-135 shadow-lg ring-1.5 ring-white/90"
                  style={{
                    backgroundColor: hotspot.categoryColor,
                    boxShadow: `0 0 10px ${hotspot.categoryColor}, 0 0 18px ${hotspot.categoryColor}70`,
                  }}
                >
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-sm" />
                </div>
              </div>
            )}
          </div>
        </Html>
      </group>
    </group>
  );
}

export function HotspotMarkers() {
  const selectedHotspotId = useBrainStore((state) => state.selectedHotspotId);
  const selectHotspot = useBrainStore((state) => state.selectHotspot);
  const layers = useBrainStore((state) => state.layers);
  const showHotspotMarkers = useBrainStore((state) => state.showHotspotMarkers);
  const activeSystemFilter = useBrainStore((state) => state.activeSystemFilter);
  const searchQuery = useBrainStore((state) => state.searchQuery);

  const cleanQuery = searchQuery.trim().toLowerCase();

  return (
    <group name="hotspots-group">
      {HOTSPOTS_DATA.map((hotspot) => {
        const targetLayer = HOTSPOT_LAYER_MAP[hotspot.id];
        const primaryLayer = targetLayer ? LAYER_PARENT_MAP[targetLayer] : null;
        const isParentVisible = !primaryLayer || layers[primaryLayer];
        const isSelected = selectedHotspotId === hotspot.id;

        const matchesSystem = activeSystemFilter === 'all' || hotspot.system === activeSystemFilter;
        const matchesSearch =
          !cleanQuery ||
          hotspot.title.toLowerCase().includes(cleanQuery) ||
          hotspot.latinTitle.toLowerCase().includes(cleanQuery) ||
          hotspot.summary.toLowerCase().includes(cleanQuery) ||
          hotspot.system.toLowerCase().includes(cleanQuery);

        const isVisible =
          showHotspotMarkers &&
          isParentVisible &&
          (isSelected || (!selectedHotspotId && matchesSystem && matchesSearch));

        return (
          <HotspotPin
            key={hotspot.id}
            hotspot={hotspot}
            isSelected={isSelected}
            selectedHotspotId={selectedHotspotId}
            isVisible={isVisible}
            onSelect={selectHotspot}
          />
        );
      })}
    </group>
  );
}
