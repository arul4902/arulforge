import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';

export interface BuildingData {
  id: string;
  name: string;
  subLabel: string;
  techStack: string[];
  position: [number, number, number];
  width: number;
  depth: number;
  floors: number;
  floorHeight: number;
  isSpire?: boolean;
}

export interface BuildingRefHandle {
  id: string;
  rootGroup: THREE.Group;
  foundationMesh: THREE.Mesh;
  foundationEdges: THREE.LineSegments;
  columnGroups: THREE.Group[];
  slabGroups: THREE.Group[];
  facadeMeshes: THREE.Mesh[];
  roofGroup?: THREE.Group;
  glowMesh?: THREE.Mesh;
}

interface BuildingProps {
  data: BuildingData;
  onRegister?: (handle: BuildingRefHandle) => void;
}

export const Building: React.FC<BuildingProps> = ({ data, onRegister }) => {
  const rootRef = useRef<THREE.Group>(null);
  const foundationRef = useRef<THREE.Mesh>(null);
  const foundationEdgesRef = useRef<THREE.LineSegments>(null);
  const roofRef = useRef<THREE.Group>(null);
  const glowMeshRef = useRef<THREE.Mesh>(null);

  const columnGroupsRef = useRef<THREE.Group[]>([]);
  const slabGroupsRef = useRef<THREE.Group[]>([]);
  const facadeMeshesRef = useRef<THREE.Mesh[]>([]);

  const { width, depth, floors, floorHeight, isSpire } = data;
  const halfW = width / 2;
  const halfD = depth / 2;
  const totalHeight = floors * floorHeight;

  // CAD Blueprint Materials (White / Pale Ice-Blue / Subtle Cyan)
  const materials = useMemo(() => {
    return {
      foundation: new THREE.MeshStandardMaterial({
        color: 0x060f1c,
        roughness: 0.5,
        metalness: 0.5,
        transparent: true,
        opacity: 0,
      }),
      foundationEdge: new THREE.LineBasicMaterial({
        color: 0x8ddfff,
        transparent: true,
        opacity: 0,
        linewidth: 1.5,
      }),
      column: new THREE.MeshStandardMaterial({
        color: 0xe8faff,
        roughness: 0.2,
        metalness: 0.8,
        emissive: 0x8ddfff,
        emissiveIntensity: 0.15,
      }),
      columnEdge: new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9,
      }),
      slab: new THREE.MeshStandardMaterial({
        color: 0x081628,
        roughness: 0.4,
        metalness: 0.8,
        transparent: true,
        opacity: 0,
      }),
      slabEdge: new THREE.LineBasicMaterial({
        color: 0x8ddfff,
        transparent: true,
        opacity: 0,
      }),
      facade: new THREE.MeshPhysicalMaterial({
        color: 0x7df9ff,
        transparent: true,
        opacity: 0,
        roughness: 0.1,
        metalness: 0.1,
        transmission: 0.6,
        thickness: 0.2,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
      spireEdge: new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0,
        linewidth: 2,
      }),
      glow: new THREE.MeshBasicMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0,
        wireframe: true,
      }),
    };
  }, []);

  // Floor Geometries & Edge Lines
  const columnPositions = useMemo(() => {
    const inset = 0.04;
    return [
      [-halfW + inset, -halfD + inset],
      [halfW - inset, -halfD + inset],
      [halfW - inset, halfD - inset],
      [-halfW + inset, halfD - inset],
    ];
  }, [halfW, halfD]);

  // Register handles with parent controller
  useEffect(() => {
    if (rootRef.current && foundationRef.current && foundationEdgesRef.current && onRegister) {
      onRegister({
        id: data.id,
        rootGroup: rootRef.current,
        foundationMesh: foundationRef.current,
        foundationEdges: foundationEdgesRef.current,
        columnGroups: columnGroupsRef.current,
        slabGroups: slabGroupsRef.current,
        facadeMeshes: facadeMeshesRef.current,
        roofGroup: roofRef.current || undefined,
        glowMesh: glowMeshRef.current || undefined,
      });
    }
  }, [data.id, onRegister]);

  return (
    <group ref={rootRef} position={data.position}>
      {/* 1. FOUNDATION SLAB (y = 0 to y = 0.04) */}
      <mesh
        ref={foundationRef}
        position={[0, 0.02, 0]}
        scale={[1, 0.001, 1]}
        material={materials.foundation}
      >
        <boxGeometry args={[width * 1.05, 0.04, depth * 1.05]} />
        {/* Footprint Wireframe Edge on table */}
        <lineSegments ref={foundationEdgesRef} material={materials.foundationEdge}>
          <edgesGeometry args={[new THREE.BoxGeometry(width * 1.05, 0.04, depth * 1.05)]} />
        </lineSegments>
      </mesh>

      {/* 2. FLOORS CONSTRUCTION STACK (Floor-by-Floor) */}
      {Array.from({ length: floors }).map((_, fIndex) => {
        const floorBaseY = fIndex * floorHeight + 0.04;
        const colThickness = 0.045;

        return (
          <group key={fIndex}>
            {/* Columns Group for this floor — Scaled from y: 0 with pivot at bottom */}
            <group
              ref={(el) => {
                if (el) columnGroupsRef.current[fIndex] = el;
              }}
              position={[0, floorBaseY, 0]}
              scale={[1, 0.0001, 1]}
            >
              {columnPositions.map(([cx, cz], cIdx) => (
                <mesh
                  key={cIdx}
                  position={[cx, floorHeight / 2, cz]}
                  material={materials.column}
                >
                  <boxGeometry args={[colThickness, floorHeight, colThickness]} />
                  <lineSegments material={materials.columnEdge}>
                    <edgesGeometry args={[new THREE.BoxGeometry(colThickness, floorHeight, colThickness)]} />
                  </lineSegments>
                </mesh>
              ))}
            </group>

            {/* Horizontal Floor Slab & Wireframe Edge */}
            <group
              ref={(el) => {
                if (el) slabGroupsRef.current[fIndex] = el;
              }}
              position={[0, floorBaseY + floorHeight, 0]}
              scale={[0.001, 1, 0.001]}
            >
              <mesh material={materials.slab}>
                <boxGeometry args={[width, 0.03, depth]} />
                <lineSegments material={materials.slabEdge}>
                  <edgesGeometry args={[new THREE.BoxGeometry(width, 0.03, depth)]} />
                </lineSegments>
              </mesh>
            </group>

            {/* Transparent CAD Facade Panel for this floor */}
            <mesh
              ref={(el) => {
                if (el) facadeMeshesRef.current[fIndex] = el;
              }}
              position={[0, floorBaseY + floorHeight / 2, 0]}
              material={materials.facade}
            >
              <boxGeometry args={[width * 0.98, floorHeight * 0.95, depth * 0.98]} />
            </mesh>
          </group>
        );
      })}

      {/* 3. ROOF ARCHITECTURE / SPIRE */}
      {isSpire ? (
        <group
          ref={roofRef}
          position={[0, totalHeight + 0.04, 0]}
          scale={[0.001, 0.001, 0.001]}
        >
          {/* Spire Tower */}
          <lineSegments material={materials.spireEdge}>
            <edgesGeometry args={[new THREE.ConeGeometry(width * 0.28, 1.2, 4)]} />
          </lineSegments>
          {/* Beacon Point */}
          <mesh position={[0, 1.2, 0]}>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
      ) : (
        <group
          ref={roofRef}
          position={[0, totalHeight + 0.04, 0]}
          scale={[0.001, 0.001, 0.001]}
        >
          {/* Architectural Parapet Crown */}
          <lineSegments material={materials.spireEdge}>
            <edgesGeometry args={[new THREE.BoxGeometry(width * 0.85, 0.25, depth * 0.85)]} />
          </lineSegments>
        </group>
      )}

      {/* 4. ACTIVE HIGHLIGHT CROWN / GLOW BOX (For Stage 05 Activation) */}
      <mesh
        ref={glowMeshRef}
        position={[0, totalHeight / 2 + 0.04, 0]}
        scale={[1.05, 1.02, 1.05]}
        material={materials.glow}
      >
        <boxGeometry args={[width, totalHeight, depth]} />
      </mesh>
    </group>
  );
};

export default Building;
