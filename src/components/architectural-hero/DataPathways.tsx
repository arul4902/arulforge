import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export interface DataPathwaysHandle {
  group: THREE.Group;
  lineMaterial: THREE.LineBasicMaterial;
  pulseMaterial: THREE.MeshBasicMaterial;
}

interface DataPathwaysProps {
  onRegister?: (handle: DataPathwaysHandle) => void;
}

export const DataPathways: React.FC<DataPathwaysProps> = ({ onRegister }) => {
  const groupRef = useRef<THREE.Group>(null);
  const pulse1Ref = useRef<THREE.Mesh>(null);
  const pulse2Ref = useRef<THREE.Mesh>(null);

  const materials = useMemo(() => {
    return {
      line: new THREE.LineBasicMaterial({
        color: 0x8ddfff,
        transparent: true,
        opacity: 0,
        linewidth: 1.5,
      }),
      pulse: new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0,
      }),
    };
  }, []);

  // Pathway 1: FRONTEND -> REST API BRIDGE -> BACKEND -> MYSQL
  const path1Points = useMemo(() => {
    return [
      new THREE.Vector3(-4.0, 0.02, 0.5), // Frontend
      new THREE.Vector3(-1.5, 0.02, 0.5),
      new THREE.Vector3(0.0, 0.02, 0.5),  // Center Forge
      new THREE.Vector3(1.5, 0.02, 0.5),
      new THREE.Vector3(4.0, 0.02, 0.5),  // Backend
      new THREE.Vector3(4.0, 0.02, 1.4),
      new THREE.Vector3(3.2, 0.02, 2.2),  // Deploy
      new THREE.Vector3(-3.2, 0.02, 2.2), // Data (MySQL)
    ];
  }, []);

  // Pathway 2: APPLICATION -> GPT API -> AI TOWER
  const path2Points = useMemo(() => {
    return [
      new THREE.Vector3(0.0, 0.02, 0.5),
      new THREE.Vector3(0.0, 0.02, -1.2),
      new THREE.Vector3(0.0, 0.02, -3.2), // AI Tower
    ];
  }, []);

  const path1Curve = useMemo(() => new THREE.CatmullRomCurve3(path1Points), [path1Points]);
  const path2Curve = useMemo(() => new THREE.CatmullRomCurve3(path2Points), [path2Points]);

  const path1Geo = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(path1Curve.getPoints(80));
  }, [path1Curve]);

  const path2Geo = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(path2Curve.getPoints(50));
  }, [path2Curve]);

  // Register with parent
  React.useEffect(() => {
    if (groupRef.current && onRegister) {
      onRegister({
        group: groupRef.current,
        lineMaterial: materials.line,
        pulseMaterial: materials.pulse,
      });
    }
  }, [materials, onRegister]);

  // Animate pulse packets along curve
  useFrame(({ clock }) => {
    const t1 = (clock.getElapsedTime() * 0.45) % 1;
    const t2 = (clock.getElapsedTime() * 0.55) % 1;

    if (pulse1Ref.current) {
      const pos1 = path1Curve.getPointAt(t1);
      pulse1Ref.current.position.copy(pos1);
    }

    if (pulse2Ref.current) {
      const pos2 = path2Curve.getPointAt(t2);
      pulse2Ref.current.position.copy(pos2);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Physical Table Connection Lines */}
      <primitive object={new THREE.Line(path1Geo, materials.line)} />
      <primitive object={new THREE.Line(path2Geo, materials.line)} />

      {/* Subtle Traveling Energy Nodes */}
      <mesh ref={pulse1Ref} material={materials.pulse}>
        <sphereGeometry args={[0.04, 12, 12]} />
      </mesh>
      <mesh ref={pulse2Ref} material={materials.pulse}>
        <sphereGeometry args={[0.04, 12, 12]} />
      </mesh>
    </group>
  );
};

export default DataPathways;
