import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { projects } from '../../data/projects';

interface ArchitecturalBlueprintSceneProps {
  scrollProgress: number; // 0.0 to 1.0 across 500vh
  onSelectProject?: (url: string) => void;
  activeProjectIndex?: number;
}

export const ArchitecturalBlueprintScene: React.FC<ArchitecturalBlueprintSceneProps> = ({
  scrollProgress,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(scrollProgress);
  progressRef.current = scrollProgress;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- THREE.JS SETUP ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x02050b);
    scene.fog = new THREE.FogExp2(0x02050b, 0.065);

    const camera = new THREE.PerspectiveCamera(
      46,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    // Initial low-angle camera looking across the dark table
    camera.position.set(0, 1.85, 6.8);
    camera.lookAt(0, 0.45, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // --- LIGHTING ---
    // Warm ambient studio light from background/ceiling
    const ambientLight = new THREE.AmbientLight(0x1a2638, 1.2);
    scene.add(ambientLight);

    // Warm tungsten backlight (architectural studio rim)
    const warmBacklight = new THREE.DirectionalLight(0xffa447, 1.5);
    warmBacklight.position.set(4, 5, -6);
    scene.add(warmBacklight);

    // Soft ice-blue table fill
    const tableFillLight = new THREE.DirectionalLight(0x7df9ff, 0.8);
    tableFillLight.position.set(-3, 4, 3);
    scene.add(tableFillLight);

    // Central Blueprint Emitter Light on Table
    const centerPointLight = new THREE.PointLight(0xe2f9ff, 2.5, 8);
    centerPointLight.position.set(0, 0.2, 0);
    scene.add(centerPointLight);

    // --- TEXTURE LOADER ---
    const textureLoader = new THREE.TextureLoader();
    const projectTextures: Record<string, THREE.Texture> = {};
    projects.forEach((p) => {
      if (p.image) {
        textureLoader.load(p.image, (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.minFilter = THREE.LinearFilter;
          projectTextures[p.id] = tex;
        });
      }
    });

    // --- 1. THE DARK CONFERENCE TABLE ---
    const tableGeometry = new THREE.PlaneGeometry(16, 12, 32, 32);
    const tableMaterial = new THREE.MeshStandardMaterial({
      color: 0x040813,
      roughness: 0.25,
      metalness: 0.65,
    });
    const tableMesh = new THREE.Mesh(tableGeometry, tableMaterial);
    tableMesh.rotation.x = -Math.PI / 2;
    tableMesh.position.y = 0;
    scene.add(tableMesh);

    // Subtle table rim outline
    const tableEdgeGeo = new THREE.EdgesGeometry(tableGeometry);
    const tableEdgeMat = new THREE.LineBasicMaterial({
      color: 0x224263,
      transparent: true,
      opacity: 0.4,
    });
    const tableEdgeLines = new THREE.LineSegments(tableEdgeGeo, tableEdgeMat);
    tableEdgeLines.rotation.x = -Math.PI / 2;
    tableEdgeLines.position.y = 0.002;
    scene.add(tableEdgeLines);

    // --- 2. THE INITIAL WHITE-BLUE LIGHT POINT (0% Scroll) ---
    const lightDotGeo = new THREE.SphereGeometry(0.045, 16, 16);
    const lightDotMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });
    const initialLightDot = new THREE.Mesh(lightDotGeo, lightDotMat);
    initialLightDot.position.set(0, 0.04, 0);
    scene.add(initialLightDot);

    // Halo ring around the point
    const haloRingGeo = new THREE.RingGeometry(0.06, 0.08, 32);
    const haloRingMat = new THREE.MeshBasicMaterial({
      color: 0x7df9ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });
    const haloRing = new THREE.Mesh(haloRingGeo, haloRingMat);
    haloRing.rotation.x = -Math.PI / 2;
    haloRing.position.set(0, 0.02, 0);
    scene.add(haloRing);

    // --- 3. BLUEPRINT DRAWINGS ON TABLE SURFACE (0 - 10% Scroll) ---
    // Physical lines following table perspective: Roads, building plots, foundation outlines
    const blueprintGroup = new THREE.Group();
    scene.add(blueprintGroup);

    const roadLineMaterial = new THREE.LineBasicMaterial({
      color: 0xaee4ff,
      transparent: true,
      opacity: 0,
    });

    const blueprintLines: { line: THREE.LineSegments; maxOpacity: number }[] = [];

    // Create Main Street Axes across Table
    const streetCoords: number[] = [];
    // North-South longitudinal avenues
    for (let x = -4.5; x <= 4.5; x += 1.5) {
      streetCoords.push(x, 0.01, -4.5, x, 0.01, 4.5);
    }
    // East-West transverse streets
    for (let z = -4.5; z <= 4.5; z += 1.5) {
      streetCoords.push(-4.5, 0.01, z, 4.5, 0.01, z);
    }

    const streetGeo = new THREE.BufferGeometry();
    streetGeo.setAttribute('position', new THREE.Float32BufferAttribute(streetCoords, 3));
    const streetLines = new THREE.LineSegments(streetGeo, roadLineMaterial);
    blueprintGroup.add(streetLines);
    blueprintLines.push({ line: streetLines, maxOpacity: 0.55 });

    // --- 4. ARCHITECTURAL BUILDINGS (8-12 Major Structures) ---
    interface BuildingDef {
      id: string;
      label: string;
      subLabel: string;
      position: [number, number, number];
      width: number;
      depth: number;
      height: number;
      floors: number;
      district: 'core' | 'frontend' | 'backend' | 'data' | 'ai' | 'deploy' | 'project' | 'social';
      projectId?: string;
      isSpire?: boolean;
    }

    const buildingDefinitions: BuildingDef[] = [
      // 01 Central Core Monolith: ARULFORGE
      {
        id: 'core',
        label: 'ARULFORGE',
        subLabel: 'STUDIO CORE // 00',
        position: [0, 0, 0],
        width: 1.1,
        depth: 1.1,
        height: 3.2,
        floors: 8,
        district: 'core',
        isSpire: true,
      },
      // 02 Frontend District: React Pavilion
      {
        id: 'react',
        label: 'REACT',
        subLabel: 'FRONTEND / 01',
        position: [-2.2, 0, 0.9],
        width: 0.9,
        depth: 0.9,
        height: 1.8,
        floors: 4,
        district: 'frontend',
      },
      // 03 Frontend District: Next.js Tower
      {
        id: 'nextjs',
        label: 'NEXT.JS',
        subLabel: 'WEB FRAMEWORK',
        position: [-3.3, 0, -0.4],
        width: 0.95,
        depth: 0.95,
        height: 2.3,
        floors: 6,
        district: 'frontend',
      },
      // 04 Backend Tower: Spring Boot
      {
        id: 'springboot',
        label: 'SPRING BOOT',
        subLabel: 'BACKEND / 02',
        position: [2.2, 0, 0.9],
        width: 0.95,
        depth: 0.95,
        height: 2.4,
        floors: 6,
        district: 'backend',
      },
      // 05 Backend: Java Engine
      {
        id: 'java',
        label: 'JAVA',
        subLabel: 'ENTERPRISE ENGINE',
        position: [3.3, 0, -0.4],
        width: 0.85,
        depth: 0.85,
        height: 1.9,
        floors: 5,
        district: 'backend',
      },
      // 06 Data Vault: MySQL
      {
        id: 'mysql',
        label: 'MYSQL',
        subLabel: 'DATA LAYER / 04',
        position: [2.6, 0, -2.1],
        width: 1.1,
        depth: 0.85,
        height: 1.5,
        floors: 3,
        district: 'data',
      },
      // 07 AI Lab: GPT Intelligence
      {
        id: 'ai-lab',
        label: 'AI LAB',
        subLabel: 'INTELLIGENCE / 05',
        position: [0, 0, -2.5],
        width: 1.2,
        depth: 1.0,
        height: 2.6,
        floors: 6,
        district: 'ai',
        isSpire: true,
      },
      // 08 Deployment Hub: Vercel / AWS
      {
        id: 'deploy-hub',
        label: 'DEPLOYMENT HUB',
        subLabel: 'VERCEL / AWS / GIT',
        position: [-2.5, 0, -2.2],
        width: 1.0,
        depth: 0.85,
        height: 1.6,
        floors: 3,
        district: 'deploy',
      },
      // 09 Real Project Structure: HVAC Services
      {
        id: 'project-hvac',
        label: 'HVAC SERVICES',
        subLabel: 'BUSINESS WEBSITE',
        position: [-1.4, 0, 2.1],
        width: 1.15,
        depth: 0.95,
        height: 2.1,
        floors: 5,
        district: 'project',
        projectId: 'hvac-services',
      },
      // 10 Real Project Structure: Plumbing Services
      {
        id: 'project-plumbing',
        label: 'PLUMBING SERVICES',
        subLabel: 'SERVICE PORTAL',
        position: [1.4, 0, 2.1],
        width: 1.2,
        depth: 0.9,
        height: 1.7,
        floors: 4,
        district: 'project',
        projectId: 'plumbing-services',
      },
      // 11 Real Project Structure: AI Mock Interview Coach
      {
        id: 'project-interview',
        label: 'AI MOCK COACH',
        subLabel: 'AI WEB APPLICATION',
        position: [0, 0, 1.3],
        width: 1.05,
        depth: 1.05,
        height: 2.4,
        floors: 5,
        district: 'project',
        projectId: 'mock-interview-coach',
        isSpire: true,
      },
      // 12 Instagram Transform Plot
      {
        id: 'social-plot',
        label: 'DIGITAL HEADQUARTERS',
        subLabel: 'INSTA ➜ WEB',
        position: [2.8, 0, 2.2],
        width: 0.85,
        depth: 0.85,
        height: 1.8,
        floors: 4,
        district: 'social',
      },
    ];

    interface BuiltBuilding {
      def: BuildingDef;
      group: THREE.Group;
      foundationLines: THREE.LineLoop;
      columnsGroup: THREE.Group;
      floorSlabs: THREE.Mesh[];
      wallShellLeft?: THREE.Group;
      wallShellRight?: THREE.Group;
      screenshotMesh?: THREE.Mesh;
      spireMesh?: THREE.Mesh;
      buildStart: number;
      buildEnd: number;
    }

    const builtBuildings: BuiltBuilding[] = [];

    // Building Materials: CAD Architectural Blueprint (White / Ice-Blue / Subtle Cyan)
    const foundationMat = new THREE.LineBasicMaterial({
      color: 0xaee4ff,
      transparent: true,
      opacity: 0,
      linewidth: 1.5,
    });

    const columnMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,
    });

    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x08172c,
      roughness: 0.3,
      metalness: 0.8,
      transparent: true,
      opacity: 0,
    });

    const wallWireMat = new THREE.LineBasicMaterial({
      color: 0xd7f8ff,
      transparent: true,
      opacity: 0,
    });

    const glassMat = new THREE.MeshBasicMaterial({
      color: 0x7df9ff,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    // Stagger construction between 10% and 45% scroll
    buildingDefinitions.forEach((def, index) => {
      const bGroup = new THREE.Group();
      bGroup.position.set(...def.position);
      scene.add(bGroup);

      // Stagger window based on building hierarchy
      let bStart = 0.10 + (index / buildingDefinitions.length) * 0.22;
      let bEnd = bStart + 0.12;

      // Special overrides for narrative sequence
      if (def.district === 'core') {
        bStart = 0.10;
        bEnd = 0.25;
      } else if (def.district === 'social') {
        bStart = 0.85; // Built during Instagram transformation phase
        bEnd = 0.92;
      }

      const halfW = def.width / 2;
      const halfD = def.depth / 2;

      // 1. Foundation Footprint Loop on Table
      const footPts = [
        new THREE.Vector3(-halfW, 0.015, -halfD),
        new THREE.Vector3(halfW, 0.015, -halfD),
        new THREE.Vector3(halfW, 0.015, halfD),
        new THREE.Vector3(-halfW, 0.015, halfD),
      ];
      const footGeo = new THREE.BufferGeometry().setFromPoints(footPts);
      const foundationLine = new THREE.LineLoop(footGeo, foundationMat.clone());
      bGroup.add(foundationLine);

      // 2. Vertical Structural Columns (Growing upward from height: 0)
      const colsGroup = new THREE.Group();
      bGroup.add(colsGroup);

      const colPositions = [
        [-halfW, -halfD],
        [halfW, -halfD],
        [halfW, halfD],
        [-halfW, halfD],
      ];

      colPositions.forEach(([cx, cz]) => {
        const colGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(cx, 0, cz),
          new THREE.Vector3(cx, def.height, cz),
        ]);
        const colLine = new THREE.Line(colGeo, columnMat.clone());
        colsGroup.add(colLine);
      });

      // 3. Horizontal Floor Slabs
      const floorMeshes: THREE.Mesh[] = [];
      const floorInterval = def.height / def.floors;

      for (let f = 1; f <= def.floors; f++) {
        const floorGeo = new THREE.BoxGeometry(def.width * 0.96, 0.02, def.depth * 0.96);
        const floorMesh = new THREE.Mesh(floorGeo, floorMat.clone());
        floorMesh.position.set(0, f * floorInterval, 0);
        bGroup.add(floorMesh);
        floorMeshes.push(floorMesh);

        // Floor Perimeter Wireframe Edge
        const edgeGeo = new THREE.EdgesGeometry(floorGeo);
        const edgeLine = new THREE.LineSegments(edgeGeo, wallWireMat.clone());
        floorMesh.add(edgeLine);
      }

      // 4. Exterior Wireframe Walls / Opening Shells for Projects
      let wallShellLeft: THREE.Group | undefined;
      let wallShellRight: THREE.Group | undefined;
      let screenshotMesh: THREE.Mesh | undefined;

      if (def.projectId) {
        // Project Building with Separating Shells
        wallShellLeft = new THREE.Group();
        wallShellRight = new THREE.Group();
        bGroup.add(wallShellLeft);
        bGroup.add(wallShellRight);

        // Left Half Shell
        const leftWallBox = new THREE.BoxGeometry(def.width / 2, def.height, def.depth);
        const leftWire = new THREE.LineSegments(new THREE.EdgesGeometry(leftWallBox), wallWireMat.clone());
        const leftGlass = new THREE.Mesh(leftWallBox, glassMat.clone());
        leftGlass.position.set(-def.width / 4, def.height / 2, 0);
        leftWire.position.copy(leftGlass.position);
        wallShellLeft.add(leftGlass);
        wallShellLeft.add(leftWire);

        // Right Half Shell
        const rightWallBox = new THREE.BoxGeometry(def.width / 2, def.height, def.depth);
        const rightWire = new THREE.LineSegments(new THREE.EdgesGeometry(rightWallBox), wallWireMat.clone());
        const rightGlass = new THREE.Mesh(rightWallBox, glassMat.clone());
        rightGlass.position.set(def.width / 4, def.height / 2, 0);
        rightWire.position.copy(rightGlass.position);
        wallShellRight.add(rightGlass);
        wallShellRight.add(rightWire);

        // Internal Screenshot Plane (Revealed when shells open)
        const screenGeo = new THREE.PlaneGeometry(def.width * 0.85, def.height * 0.7);
        const screenMat = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0,
          side: THREE.DoubleSide,
        });
        screenshotMesh = new THREE.Mesh(screenGeo, screenMat);
        screenshotMesh.position.set(0, def.height * 0.45, 0.02);
        bGroup.add(screenshotMesh);
      } else {
        // Standard CAD Translucent Exterior Glass Walls
        const wallBoxGeo = new THREE.BoxGeometry(def.width, def.height, def.depth);
        const wallEdges = new THREE.EdgesGeometry(wallBoxGeo);
        const wallWireLines = new THREE.LineSegments(wallEdges, wallWireMat.clone());
        wallWireLines.position.set(0, def.height / 2, 0);
        bGroup.add(wallWireLines);

        const glassMesh = new THREE.Mesh(wallBoxGeo, glassMat.clone());
        glassMesh.position.set(0, def.height / 2, 0);
        bGroup.add(glassMesh);
      }

      // 5. Spire / Roof Architecture
      let spireMesh: THREE.Mesh | undefined;
      if (def.isSpire) {
        const coneGeo = new THREE.ConeGeometry(def.width * 0.25, 0.8, 4);
        const coneMat = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true,
          transparent: true,
          opacity: 0,
        });
        spireMesh = new THREE.Mesh(coneGeo, coneMat);
        spireMesh.position.set(0, def.height + 0.4, 0);
        bGroup.add(spireMesh);
      }

      builtBuildings.push({
        def,
        group: bGroup,
        foundationLines: foundationLine,
        columnsGroup: colsGroup,
        floorSlabs: floorMeshes,
        wallShellLeft,
        wallShellRight,
        screenshotMesh,
        spireMesh,
        buildStart: bStart,
        buildEnd: bEnd,
      });
    });

    // --- 5. TECH PATHWAYS: ROAD ENERGY STREAMS (45% - 60% Scroll) ---
    // Physical lines connecting: React -> REST API Bridge -> Spring Boot -> MySQL
    const pathwayGroup = new THREE.Group();
    scene.add(pathwayGroup);

    const pathwayPoints = [
      new THREE.Vector3(-2.2, 0.02, 0.9), // React
      new THREE.Vector3(0, 0.02, 0.9),    // REST API Center
      new THREE.Vector3(2.2, 0.02, 0.9),  // Spring Boot
      new THREE.Vector3(2.6, 0.02, -2.1), // MySQL
    ];

    const pathwayGeo = new THREE.BufferGeometry().setFromPoints(pathwayPoints);
    const pathwayMat = new THREE.LineBasicMaterial({
      color: 0x7df9ff,
      transparent: true,
      opacity: 0,
      linewidth: 2,
    });
    const pathwayLine = new THREE.Line(pathwayGeo, pathwayMat);
    pathwayGroup.add(pathwayLine);

    // Glowing Pulse Particle traveling along pathway
    const pulseParticleGeo = new THREE.SphereGeometry(0.04, 12, 12);
    const pulseParticleMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,
    });
    const pulseParticle = new THREE.Mesh(pulseParticleGeo, pulseParticleMat);
    pathwayGroup.add(pulseParticle);

    // --- 6. ANIMATION & RENDER LOOP ---
    let animId: number;
    const startTime = performance.now();

    const renderScene = () => {
      const p = progressRef.current;
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // ==========================================
      // PHASE 0: 0% INITIAL EMPTY TABLE POINT
      // ==========================================
      if (p < 0.02) {
        initialLightDot.visible = true;
        haloRing.visible = true;
        const pulse = 1 + Math.sin(elapsedTime * 4) * 0.18;
        initialLightDot.scale.set(pulse, pulse, pulse);
        (haloRing.material as THREE.MeshBasicMaterial).opacity = 0.5 + Math.sin(elapsedTime * 4) * 0.3;
      } else {
        const fade = Math.max(0, 1 - (p - 0.02) * 20);
        (initialLightDot.material as THREE.MeshBasicMaterial).opacity = fade;
        (haloRing.material as THREE.MeshBasicMaterial).opacity = fade;
        if (fade <= 0.01) {
          initialLightDot.visible = false;
          haloRing.visible = false;
        }
      }

      // ==========================================
      // PHASE 1: 0% - 10% THE BLUEPRINT DRAWN ON TABLE
      // ==========================================
      const blueprintProgress = Math.min(1, Math.max(0, p / 0.10));
      streetLines.material.opacity = blueprintProgress * 0.45;

      // ==========================================
      // PHASE 2 & 3: 10% - 45% PHYSICAL BUILDING CONSTRUCTION
      // Foundation -> Columns -> Floors -> Walls -> Spire
      // ==========================================
      builtBuildings.forEach((b) => {
        // Local construction progress for this specific building
        const localProgress = Math.min(
          1,
          Math.max(0, (p - b.buildStart) / (b.buildEnd - b.buildStart))
        );

        if (localProgress <= 0) {
          b.group.visible = false;
          return;
        }
        b.group.visible = true;

        // Step 1: Foundation (0.00 - 0.25 local)
        const foundationAlpha = Math.min(1, localProgress * 4);
        (b.foundationLines.material as THREE.LineBasicMaterial).opacity = foundationAlpha * 0.75;

        // Step 2: Columns grow upward from height: 0 (0.15 - 0.65 local)
        const columnProgress = Math.min(1, Math.max(0, (localProgress - 0.15) / 0.50));
        b.columnsGroup.scale.set(1, columnProgress, 1);
        b.columnsGroup.children.forEach((c) => {
          ((c as THREE.Line).material as THREE.LineBasicMaterial).opacity = columnProgress * 0.85;
        });

        // Step 3 & 4: Floor Slabs Draw Horizontally (0.35 - 0.85 local)
        b.floorSlabs.forEach((slab, fIndex) => {
          const slabTargetProgress = 0.35 + (fIndex / b.floorSlabs.length) * 0.45;
          const slabAlpha = localProgress >= slabTargetProgress ? Math.min(1, (localProgress - slabTargetProgress) * 5) : 0;
          (slab.material as THREE.MeshStandardMaterial).opacity = slabAlpha * 0.8;
          slab.children.forEach((child) => {
            if ((child as THREE.LineSegments).material) {
              ((child as THREE.LineSegments).material as THREE.LineBasicMaterial).opacity = slabAlpha * 0.65;
            }
          });
        });

        // Step 5 & 6: Exterior Wireframe Walls / Glass (0.60 - 1.0 local)
        const wallAlpha = Math.min(1, Math.max(0, (localProgress - 0.60) / 0.40));
        b.group.children.forEach((child) => {
          if (child instanceof THREE.LineSegments) {
            (child.material as THREE.LineBasicMaterial).opacity = wallAlpha * 0.65;
          } else if (child instanceof THREE.Mesh && !b.floorSlabs.includes(child)) {
            (child.material as THREE.MeshBasicMaterial).opacity = wallAlpha * 0.10;
          }
        });

        // Spire assembly
        if (b.spireMesh) {
          (b.spireMesh.material as THREE.MeshBasicMaterial).opacity = wallAlpha * 0.75;
          b.spireMesh.rotation.y = elapsedTime * 0.5;
        }

        // Project Texture loading sync
        if (b.def.projectId && b.screenshotMesh && projectTextures[b.def.projectId]) {
          const mat = b.screenshotMesh.material as THREE.MeshBasicMaterial;
          if (mat.map !== projectTextures[b.def.projectId]) {
            mat.map = projectTextures[b.def.projectId];
            mat.needsUpdate = true;
          }
        }
      });

      // ==========================================
      // PHASE 4: 45% - 60% TECH STACK CITY & DATA PATHWAYS
      // ==========================================
      const pathwayProgress = Math.min(1, Math.max(0, (p - 0.45) / 0.15));
      pathwayMat.opacity = pathwayProgress * 0.85;
      pulseParticleMat.opacity = pathwayProgress > 0 ? 0.95 : 0;

      if (pathwayProgress > 0) {
        // Animate pulse along the points
        const t = (elapsedTime * 0.8) % 1;
        const segmentCount = pathwayPoints.length - 1;
        const currentSegment = Math.min(segmentCount - 1, Math.floor(t * segmentCount));
        const segT = (t * segmentCount) - currentSegment;

        const pA = pathwayPoints[currentSegment];
        const pB = pathwayPoints[currentSegment + 1];
        pulseParticle.position.lerpVectors(pA, pB, segT);
      }

      // ==========================================
      // PHASE 5: 60% - 75% PROJECT SHELL SEPARATION
      // Outer wireframe shells slide open -> reveal real screenshot
      // ==========================================

      builtBuildings.forEach((b) => {
        if (b.def.projectId && b.wallShellLeft && b.wallShellRight && b.screenshotMesh) {
          // Check if this project is currently focused
          let openAmount = 0;

          if (b.def.projectId === 'hvac-services') {
            const openT = Math.min(1, Math.max(0, (p - 0.60) / 0.05));
            const closeT = Math.min(1, Math.max(0, (p - 0.65) / 0.05));
            openAmount = Math.max(0, openT - closeT);
          } else if (b.def.projectId === 'plumbing-services') {
            const openT = Math.min(1, Math.max(0, (p - 0.65) / 0.05));
            const closeT = Math.min(1, Math.max(0, (p - 0.70) / 0.05));
            openAmount = Math.max(0, openT - closeT);
          } else if (b.def.projectId === 'mock-interview-coach') {
            const openT = Math.min(1, Math.max(0, (p - 0.70) / 0.05));
            openAmount = openT; // Stays slightly open into finale
          }

          // Slide shells apart laterally
          b.wallShellLeft.position.x = -openAmount * 0.65;
          b.wallShellRight.position.x = openAmount * 0.65;

          // Reveal screenshot opacity inside
          (b.screenshotMesh.material as THREE.MeshBasicMaterial).opacity = openAmount * 0.95;
        }
      });

      // ==========================================
      // CAMERA RIG: SCROLL-CONTROLLED CINEMATIC MOTION
      // Low angle across table -> forward push -> district rise -> final pull-back
      // ==========================================
      if (p <= 0.45) {
        // Initial low-angle camera watching construction rise on table
        const t = p / 0.45;
        camera.position.set(0, 1.85 - t * 0.2, 6.8 - t * 0.6);
        camera.lookAt(0, 0.45 + t * 0.35, 0);
      } else if (p > 0.45 && p <= 0.60) {
        // Push forward through the constructed city (Tech Stack City)
        const t = (p - 0.45) / 0.15;
        camera.position.set(
          Math.sin(t * Math.PI) * 0.35,
          1.65 - t * 0.15,
          6.2 - t * 2.2
        );
        camera.lookAt(0, 0.8, -0.5);
      } else if (p > 0.60 && p <= 0.75) {
        // Moving alongside project buildings
        const t = (p - 0.60) / 0.15;
        // Travel between HVAC (left) and Plumbing (right)
        const camX = t < 0.5 ? -1.2 * Math.sin(t * Math.PI) : 1.2 * Math.sin((t - 0.5) * Math.PI);
        camera.position.set(camX, 1.5, 4.0 - t * 0.8);
        camera.lookAt(0, 0.9, 0.5);
      } else if (p > 0.75 && p <= 0.85) {
        // Camera rises slightly to inspect capability districts
        const t = (p - 0.75) / 0.10;
        camera.position.set(0, 1.5 + t * 1.2, 3.2 + t * 1.5);
        camera.lookAt(0, 0.6, -0.5);
      } else if (p > 0.85 && p <= 0.92) {
        // Focus on Instagram to Website transform plot
        camera.position.set(1.5, 2.2, 4.5);
        camera.lookAt(2.8, 0.8, 2.2);
      } else {
        // 92% - 100%: Pull upward and backward to reveal COMPLETE GLOWING CITY
        const t = (p - 0.92) / 0.08;
        camera.position.set(
          0,
          2.2 + t * 1.6, // Y from 2.2 to 3.8
          4.5 + t * 3.6  // Z from 4.5 to 8.1
        );
        camera.lookAt(0, 0.7, 0);
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(renderScene);
    };

    renderScene();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
      {/* 
        Background Architectural Studio:
        Realistic human environment, dark warm conference room with twilight windows,
        architect leaning over table in background, volumetric lighting and 35mm grain.
      */}
      <div 
        className="absolute inset-0 w-full h-full bg-[#02050b]"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 85% 25%, rgba(255, 164, 71, 0.12) 0%, rgba(3, 6, 15, 0) 55%),
            radial-gradient(ellipse at 15% 30%, rgba(255, 189, 115, 0.08) 0%, rgba(3, 6, 15, 0) 50%),
            linear-gradient(180deg, #02050b 0%, #060e1d 45%, #03060f 100%)
          `,
        }}
      >
        {/* Architect in background silhouette (subtle, non-distracting) */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 bottom-[46%] w-[260px] h-[340px] pointer-events-none opacity-45 mix-blend-screen"
          style={{
            backgroundImage: 'url(/arul_portrait.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 20%',
            filter: 'brightness(0.65) contrast(1.2) drop-shadow(0 0 25px rgba(0, 212, 255, 0.15))',
            maskImage: 'radial-gradient(ellipse at 50% 40%, black 50%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, black 50%, transparent 85%)',
          }}
        />

        {/* Studio Window Mullions (Right twilight atmosphere) */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none flex justify-around">
          <div className="w-[1px] h-full bg-[#7df9ff]" />
          <div className="w-[1px] h-full bg-[#7df9ff]" />
          <div className="w-[1px] h-full bg-[#7df9ff]" />
        </div>
      </div>

      {/* THREE.JS WebGL Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-auto" />

      {/* 35mm Film Grain & Atmospheric Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(2, 5, 11, 0) 40%, rgba(2, 5, 11, 0.6) 80%, rgba(2, 5, 11, 0.95) 100%)',
        }}
      />
    </div>
  );
};

export default ArchitecturalBlueprintScene;
