import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export interface BlueprintFloorHandle {
  setLineProgress: (progress: number) => void;
  setInitialPointOpacity: (opacity: number) => void;
}

interface BlueprintFloorProps {
  onRegister?: (handle: BlueprintFloorHandle) => void;
}

export const BlueprintFloor: React.FC<BlueprintFloorProps> = ({ onRegister }) => {
  const lineMeshRef = useRef<THREE.LineSegments>(null);
  const pointMeshRef = useRef<THREE.Mesh>(null);
  const ringMeshRef = useRef<THREE.Mesh>(null);
  const progressRef = useRef(0);

  // Initial Point of Light Materials
  const pointMat = useMemo(() => new THREE.MeshBasicMaterial({ color: 0xffffff }), []);
  const ringMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0x8ddfff,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide,
      }),
    []
  );

  // Line Material for Blueprint on table
  const lineMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: 0x8ddfff,
        transparent: true,
        opacity: 0.65,
        linewidth: 1.2,
      }),
    []
  );

  // Generate blueprint street grid & footprints on table (y = 0.01)
  const { geometry, totalVertices } = useMemo(() => {
    const coords: number[] = [];

    // 1. Street Grid lines across 18x10 table
    for (let x = -8; x <= 8; x += 2) {
      coords.push(x, 0.01, -4.5, x, 0.01, 4.5);
    }
    for (let z = -4; z <= 4; z += 2) {
      coords.push(-8.5, 0.01, z, 8.5, 0.01, z);
    }

    // 2. Building Footprints
    const footprints = [
      // Central Forge [0, 0] w: 2.2, d: 2.2
      { cx: 0, cz: 0, hw: 1.15, hd: 1.15 },
      // Frontend [-4.0, 0.5] w: 1.8, d: 1.8
      { cx: -4.0, cz: 0.5, hw: 0.95, hd: 0.95 },
      // Backend [4.0, 0.5] w: 1.8, d: 1.8
      { cx: 4.0, cz: 0.5, hw: 0.95, hd: 0.95 },
      // AI [0, -3.2] w: 1.6, d: 1.6
      { cx: 0, cz: -3.2, hw: 0.85, hd: 0.85 },
      // Data [-3.2, 2.2] w: 1.6, d: 1.4
      { cx: -3.2, cz: 2.2, hw: 0.85, hd: 0.75 },
      // Deploy [3.2, 2.2] w: 1.6, d: 1.4
      { cx: 3.2, cz: 2.2, hw: 0.85, hd: 0.75 },
      // Tools [0, 2.8] w: 3.2, d: 1.2
      { cx: 0, cz: 2.8, hw: 1.65, hd: 0.65 },
    ];

    footprints.forEach(({ cx, cz, hw, hd }) => {
      // Box footprint lines
      coords.push(cx - hw, 0.012, cz - hd, cx + hw, 0.012, cz - hd);
      coords.push(cx + hw, 0.012, cz - hd, cx + hw, 0.012, cz + hd);
      coords.push(cx + hw, 0.012, cz + hd, cx - hw, 0.012, cz + hd);
      coords.push(cx - hw, 0.012, cz + hd, cx - hw, 0.012, cz - hd);

      // Dimension ticks at corners
      coords.push(cx - hw - 0.1, 0.012, cz - hd, cx - hw + 0.1, 0.012, cz - hd);
      coords.push(cx + hw - 0.1, 0.012, cz - hd, cx + hw + 0.1, 0.012, cz - hd);
      coords.push(cx - hw - 0.1, 0.012, cz + hd, cx - hw + 0.1, 0.012, cz + hd);
      coords.push(cx + hw - 0.1, 0.012, cz + hd, cx + hw + 0.1, 0.012, cz + hd);
    });

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(coords, 3));
    // Start with 0 lines drawn!
    geo.setDrawRange(0, 0);

    return { geometry: geo, totalVertices: coords.length / 3 };
  }, []);

  useEffect(() => {
    if (onRegister) {
      onRegister({
        setLineProgress: (p: number) => {
          progressRef.current = p;
          if (lineMeshRef.current) {
            const count = Math.floor(p * totalVertices);
            lineMeshRef.current.geometry.setDrawRange(0, count);
          }
        },
        setInitialPointOpacity: (op: number) => {
          pointMat.opacity = op;
          pointMat.transparent = op < 1;
          ringMat.opacity = op * 0.8;
          if (pointMeshRef.current) pointMeshRef.current.visible = op > 0.01;
          if (ringMeshRef.current) ringMeshRef.current.visible = op > 0.01;
        },
      });
    }
  }, [geometry, totalVertices, onRegister, pointMat, ringMat]);

  // Pulse initial point gently
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (pointMeshRef.current && ringMeshRef.current) {
      const s = 1 + Math.sin(t * 4) * 0.2;
      pointMeshRef.current.scale.set(s, s, s);
      ringMeshRef.current.scale.set(s * 1.2, s * 1.2, s * 1.2);
    }
  });

  return (
    <group>
      {/* Table Blueprint Lines */}
      <lineSegments ref={lineMeshRef} geometry={geometry} material={lineMat} />

      {/* Initial White-Blue Point of Light at Table Center (0% Scroll) */}
      <mesh ref={pointMeshRef} position={[0, 0.05, 0]} material={pointMat}>
        <sphereGeometry args={[0.05, 16, 16]} />
      </mesh>
      <mesh
        ref={ringMeshRef}
        position={[0, 0.02, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={ringMat}
      >
        <ringGeometry args={[0.07, 0.11, 32]} />
      </mesh>
    </group>
  );
};

export default BlueprintFloor;
