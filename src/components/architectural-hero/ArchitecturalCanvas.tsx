import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { createPersonSilhouette } from './PersonSilhouette';
import { createUndergroundSystem, type UndergroundHandles } from './UndergroundSystem';
import { getCameraState } from './CameraPath';
import { PHYSICAL_BUILDINGS, type PhysicalBuildingDef } from './buildingsConfig';
import { type ProjectItem } from '../../data/projects';

export interface FloorSignageHandle {
  mesh: THREE.Group;
  setOpacity: (op: number) => void;
}

export interface BuildingHandles {
  id: string;
  config: PhysicalBuildingDef;
  rootGroup: THREE.Group;
  foundationMesh: THREE.Mesh;
  foundationEdges: THREE.LineSegments;
  columnGroups: THREE.Group[];
  slabGroups: THREE.Group[];
  facadeMeshes: THREE.Mesh[];
  floorSigns: FloorSignageHandle[];
  roofGroup?: THREE.Group;
  glowMesh?: THREE.Mesh;
  districtLabelGroup?: THREE.Group;
}

export interface TelemetryData {
  fps: number;
  calls: number;
  triangles: number;
  geometries: number;
  textures: number;
}

export interface SceneHandles {
  buildings: Record<string, BuildingHandles>;
  blueprintFloor: {
    setLineProgress: (p: number) => void;
    setSparkOpacity: (op: number) => void;
  };
  dataPathways: {
    lineMaterial: THREE.LineBasicMaterial;
    pulseMaterial: THREE.MeshBasicMaterial;
  };
  underground: UndergroundHandles;
  setScrollProgress: (progress: number) => void;
  getTelemetry: () => TelemetryData;
}

interface ArchitecturalCanvasProps {
  onSceneReady: (handles: SceneHandles) => void;
  onProjectSelect?: (project: ProjectItem) => void;
}

function createFloorSign(
  text: string,
  width = 0.9,
  height = 0.32,
  unitPlane: THREE.PlaneGeometry,
  unitEdges: THREE.EdgesGeometry
): FloorSignageHandle {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 96;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#060f1c';
  ctx.fillRect(0, 0, 256, 96);

  ctx.strokeStyle = '#00d4ff';
  ctx.lineWidth = 3;
  ctx.strokeRect(3, 3, 250, 90);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(text, 128, 56);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;

  const group = new THREE.Group();
  const plateMat = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide,
  });
  const plate = new THREE.Mesh(unitPlane, plateMat);
  plate.scale.set(width, height, 1);
  group.add(plate);

  const edgeMat = new THREE.LineBasicMaterial({
    color: 0x00d4ff,
    transparent: true,
    opacity: 0,
  });
  const edgeMesh = new THREE.LineSegments(unitEdges, edgeMat);
  edgeMesh.scale.set(width, height, 0.01);
  group.add(edgeMesh);

  return {
    mesh: group,
    setOpacity: (op: number) => {
      plateMat.opacity = op;
      edgeMat.opacity = op * 0.9;
    },
  };
}

export const ArchitecturalCanvas: React.FC<ArchitecturalCanvasProps> = ({
  onSceneReady,
  onProjectSelect,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. SCENE SETUP (ONE COORDINATE SYSTEM: Y=0 Table, Y>0 City, Y<0 Underground)
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#05070a');

    const camera = new THREE.PerspectiveCamera(
      48,
      container.clientWidth / container.clientHeight,
      0.1,
      120
    );

    const initialCam = getCameraState(0);
    const cameraTarget = initialCam.target.clone();
    const currentCamPos = initialCam.position.clone();
    const desiredCamPos = initialCam.position.clone();
    const desiredTarget = initialCam.target.clone();

    camera.position.copy(currentCamPos);
    camera.lookAt(cameraTarget);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();

    // 2. SHARED GEOMETRIES (Created ONCE - Rule #4)
    const unitBoxGeo = new THREE.BoxGeometry(1, 1, 1);
    const unitEdgesGeo = new THREE.EdgesGeometry(unitBoxGeo);
    const unitPlaneGeo = new THREE.PlaneGeometry(1, 1);

    // 3. SHARED MATERIALS (Rule #5 & Rule #6)
    const darkMaterial = new THREE.MeshStandardMaterial({
      color: 0x070b14,
      roughness: 0.7,
      metalness: 0.2,
    });

    const structureMaterial = new THREE.MeshStandardMaterial({
      color: 0xe8faff,
      roughness: 0.25,
      metalness: 0.8,
      emissive: 0x7df9ff,
      emissiveIntensity: 0.12,
    });

    // LIGHTWEIGHT HOLOGRAPHIC GLASS (MeshBasicMaterial replaces expensive MeshPhysicalMaterial - Rule #6)
    const glassMaterial = new THREE.MeshBasicMaterial({
      color: 0x7df9ff,
      transparent: true,
      opacity: 0.12,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    const pipeMaterial = new THREE.MeshStandardMaterial({
      color: 0x091424,
      roughness: 0.35,
      metalness: 0.85,
    });

    const colEdgeMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.85,
    });

    const slabEdgeMaterial = new THREE.LineBasicMaterial({
      color: 0x7df9ff,
      transparent: true,
      opacity: 0.65,
    });

    const sharedMaterials = {
      darkMaterial,
      structureMaterial,
      glassMaterial,
      pipeMaterial,
    };

    // 3. CINEMATIC LIGHTING
    const ambientLight = new THREE.AmbientLight(0x0a1422, 0.35);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight(0xe8faff, 1.8, 30);
    keyLight.position.set(0, 7.5, 2.5);
    scene.add(keyLight);

    // Warm Amber Studio Backlight (Behind table & person silhouette)
    const warmBackLight = new THREE.PointLight(0xffa447, 1.8, 25);
    warmBackLight.position.set(0, 2.5, -6.5);
    scene.add(warmBackLight);

    const frontFill = new THREE.DirectionalLight(0x7df9ff, 0.35);
    frontFill.position.set(4, 6, 8);
    scene.add(frontFill);

    // 4. PHYSICAL 3D TABLE (Y = -0.35 to 0.0)
    const tableMesh = new THREE.Mesh(unitBoxGeo, darkMaterial);
    tableMesh.scale.set(18, 0.35, 11);
    tableMesh.position.set(0, -0.175, 0);
    scene.add(tableMesh);

    const tableEdge = new THREE.LineSegments(
      unitEdgesGeo,
      new THREE.LineBasicMaterial({ color: 0x1f344d, transparent: true, opacity: 0.6 })
    );
    tableEdge.scale.set(18, 0.35, 11);
    tableEdge.position.set(0, -0.175, 0);
    scene.add(tableEdge);

    // 5. OBSERVER SILHOUETTE (Standing behind table at Z = -5.2)
    const personFigure = createPersonSilhouette();
    personFigure.position.set(0, 0, -5.2);
    scene.add(personFigure);

    // 6. BLUEPRINT SYSTEM (Drawn on Table at y = 0.01)
    const lineCoords: number[] = [];
    for (let x = -8; x <= 8; x += 2) {
      lineCoords.push(x, 0.01, -5.0, x, 0.01, 5.0);
    }
    for (let z = -4.5; z <= 4.5; z += 2) {
      lineCoords.push(-8.5, 0.01, z, 8.5, 0.01, z);
    }

    PHYSICAL_BUILDINGS.forEach((b) => {
      const cx = b.position[0];
      const cz = b.position[2];
      const hw = b.width / 2 + 0.06;
      const hd = b.depth / 2 + 0.06;
      lineCoords.push(cx - hw, 0.012, cz - hd, cx + hw, 0.012, cz - hd);
      lineCoords.push(cx + hw, 0.012, cz - hd, cx + hw, 0.012, cz + hd);
      lineCoords.push(cx + hw, 0.012, cz + hd, cx - hw, 0.012, cz + hd);
      lineCoords.push(cx - hw, 0.012, cz + hd, cx - hw, 0.012, cz - hd);
    });

    const blueprintGeo = new THREE.BufferGeometry();
    blueprintGeo.setAttribute('position', new THREE.Float32BufferAttribute(lineCoords, 3));
    blueprintGeo.setDrawRange(0, 0);

    const blueprintMat = new THREE.LineBasicMaterial({
      color: 0x8ddfff,
      transparent: true,
      opacity: 0.75,
      linewidth: 1.2,
    });
    const blueprintLineSegments = new THREE.LineSegments(blueprintGeo, blueprintMat);
    scene.add(blueprintLineSegments);

    // Spark at Center (0–10% Empty Table)
    const sparkMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const sparkMesh = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 16), sparkMat);
    sparkMesh.position.set(0, 0.05, 0);
    scene.add(sparkMesh);

    const sparkRing = new THREE.Mesh(
      new THREE.RingGeometry(0.07, 0.12, 32),
      new THREE.MeshBasicMaterial({ color: 0x00d4ff, side: THREE.DoubleSide, transparent: true, opacity: 0.85 })
    );
    sparkRing.rotation.x = -Math.PI / 2;
    sparkRing.position.set(0, 0.02, 0);
    scene.add(sparkRing);

    // 7. 6 PHYSICAL BUILDINGS WITH FLOOR-BY-FLOOR STRUCTURES
    const buildingsHandles: Record<string, BuildingHandles> = {};

    PHYSICAL_BUILDINGS.forEach((bData) => {
      const bGroup = new THREE.Group();
      bGroup.position.set(...bData.position);
      scene.add(bGroup);

      const { width, depth, floors, floorHeight, isSpire, floorLabels } = bData;
      const halfW = width / 2;
      const halfD = depth / 2;
      const totalH = floors * floorHeight;

      // Foundation (reusing unitBoxGeo and unitEdgesGeo - Rule #4)
      const foundationMesh = new THREE.Mesh(unitBoxGeo, darkMaterial);
      foundationMesh.scale.set(width * 1.05, 0.04, depth * 1.05);
      foundationMesh.position.set(0, 0.02, 0);
      bGroup.add(foundationMesh);

      const foundationEdges = new THREE.LineSegments(
        unitEdgesGeo,
        new THREE.LineBasicMaterial({ color: 0x7df9ff, transparent: true, opacity: 0, linewidth: 1.5 })
      );
      foundationEdges.scale.set(width * 1.05, 0.04, depth * 1.05);
      foundationMesh.add(foundationEdges);

      const columnGroups: THREE.Group[] = [];
      const slabGroups: THREE.Group[] = [];
      const facadeMeshes: THREE.Mesh[] = [];
      const floorSigns: FloorSignageHandle[] = [];

      const colInset = 0.05;
      const colPositions = [
        [-halfW + colInset, -halfD + colInset],
        [halfW - colInset, -halfD + colInset],
        [halfW - colInset, halfD - colInset],
        [-halfW + colInset, halfD - colInset],
      ];

      for (let f = 0; f < floors; f++) {
        const floorBaseY = f * floorHeight + 0.04;
        const colThickness = 0.05;

        // Columns group
        const cGroup = new THREE.Group();
        cGroup.position.set(0, floorBaseY, 0);
        cGroup.scale.set(1, 0.0001, 1);
        bGroup.add(cGroup);
        columnGroups.push(cGroup);

        colPositions.forEach(([cx, cz]) => {
          const colMesh = new THREE.Mesh(unitBoxGeo, structureMaterial);
          colMesh.scale.set(colThickness, floorHeight, colThickness);
          colMesh.position.set(cx, floorHeight / 2, cz);
          cGroup.add(colMesh);

          const colEdge = new THREE.LineSegments(unitEdgesGeo, colEdgeMaterial);
          colEdge.scale.set(colThickness, floorHeight, colThickness);
          colMesh.add(colEdge);
        });

        // Floor Slab group
        const sGroup = new THREE.Group();
        sGroup.position.set(0, floorBaseY + floorHeight, 0);
        sGroup.scale.set(0.001, 1, 0.001);
        bGroup.add(sGroup);
        slabGroups.push(sGroup);

        const slabMesh = new THREE.Mesh(unitBoxGeo, darkMaterial);
        slabMesh.scale.set(width, 0.03, depth);
        sGroup.add(slabMesh);

        const slabEdge = new THREE.LineSegments(unitEdgesGeo, slabEdgeMaterial);
        slabEdge.scale.set(width, 0.03, depth);
        slabMesh.add(slabEdge);

        // Glass Facade mesh (MeshBasicMaterial + unitBoxGeo)
        const facadeMesh = new THREE.Mesh(unitBoxGeo, glassMaterial);
        facadeMesh.scale.set(width * 0.98, floorHeight * 0.95, depth * 0.98);
        facadeMesh.position.set(0, floorBaseY + floorHeight / 2, 0);
        bGroup.add(facadeMesh);
        facadeMeshes.push(facadeMesh);

        // Floor tech label physically mounted on the facade
        if (floorLabels[f]) {
          const signHandle = createFloorSign(
            floorLabels[f],
            width * 0.75,
            0.28,
            unitPlaneGeo,
            unitEdgesGeo
          );
          signHandle.mesh.position.set(0, floorBaseY + floorHeight * 0.5, halfD + 0.02);
          bGroup.add(signHandle.mesh);
          floorSigns.push(signHandle);
        }
      }

      // Roof
      const roofGroup = new THREE.Group();
      roofGroup.position.set(0, totalH + 0.04, 0);
      roofGroup.scale.set(0.001, 0.001, 0.001);
      bGroup.add(roofGroup);

      if (isSpire) {
        const cone = new THREE.LineSegments(
          new THREE.EdgesGeometry(new THREE.ConeGeometry(width * 0.28, 1.4, 4)),
          new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.95, linewidth: 2 })
        );
        cone.position.set(0, 0.7, 0);
        roofGroup.add(cone);

        const beacon = new THREE.Mesh(
          new THREE.SphereGeometry(0.05, 12, 12),
          new THREE.MeshBasicMaterial({ color: 0x00d4ff })
        );
        beacon.position.set(0, 1.4, 0);
        roofGroup.add(beacon);
      } else {
        const crown = new THREE.LineSegments(
          unitEdgesGeo,
          new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 })
        );
        crown.scale.set(width * 0.85, 0.25, depth * 0.85);
        crown.position.set(0, 0.125, 0);
        roofGroup.add(crown);
      }

      // Glow Mesh for activation (55–65%)
      const glowMesh = new THREE.Mesh(
        unitBoxGeo,
        new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0, wireframe: true })
      );
      glowMesh.scale.set(width, totalH, depth);
      glowMesh.position.set(0, totalH / 2 + 0.04, 0);
      bGroup.add(glowMesh);

      buildingsHandles[bData.id] = {
        id: bData.id,
        config: bData,
        rootGroup: bGroup,
        foundationMesh,
        foundationEdges,
        columnGroups,
        slabGroups,
        facadeMeshes,
        floorSigns,
        roofGroup,
        glowMesh,
      };
    });

    // 8. UPPER DATA PATHWAYS (Active 62–70% Complete City)
    const pathPoints = [
      new THREE.Vector3(-5.2, 0.04, -0.9), // React Tower
      new THREE.Vector3(-3.2, 0.04, -1.0), // Next.js
      new THREE.Vector3(0.0, 0.04, 0.4),   // REST API Interchange Bridge
      new THREE.Vector3(3.5, 0.04, -1.0),  // Java Enterprise Core
      new THREE.Vector3(5.4, 0.04, -0.8),  // Spring Boot
      new THREE.Vector3(4.5, 0.04, 1.2),   // MySQL Relational Vault
      new THREE.Vector3(5.0, 0.04, 3.2),   // Vercel / Deploy Hub
      new THREE.Vector3(3.2, 0.04, 3.0),   // GitHub
      new THREE.Vector3(0.0, 0.04, -2.6),  // GPT API Spire
      new THREE.Vector3(-1.7, 0.04, -2.2), // Prompt Eng
      new THREE.Vector3(-5.2, 0.04, -0.9), // Loop back to React
    ];
    const pathCurve = new THREE.CatmullRomCurve3(pathPoints);
    const pathGeo = new THREE.BufferGeometry().setFromPoints(pathCurve.getPoints(80));
    const pathLineMat = new THREE.LineBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0,
      linewidth: 1.5,
    });
    const pathLine = new THREE.Line(pathGeo, pathLineMat);
    scene.add(pathLine);

    const pulseMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
    const pulseMesh = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 12), pulseMat);
    scene.add(pulseMesh);

    // 9. UNDERGROUND INFRASTRUCTURE & 6 REAL PROJECT STATIONS
    const underground = createUndergroundSystem(textureLoader, sharedMaterials);
    scene.add(underground.group);

    // 10. ASSEMBLE SCENE HANDLES & NOTIFY
    const handles: SceneHandles = {
      buildings: buildingsHandles,
      blueprintFloor: {
        setLineProgress: (p: number) => {
          const count = Math.floor(p * (lineCoords.length / 3));
          blueprintGeo.setDrawRange(0, count);
        },
        setSparkOpacity: (op: number) => {
          sparkMat.opacity = op;
          sparkMesh.visible = op > 0.01;
          sparkRing.visible = op > 0.01;
        },
      },
      dataPathways: {
        lineMaterial: pathLineMat,
        pulseMaterial: pulseMat,
      },
      underground,
      setScrollProgress: (progress: number) => {
        const camState = getCameraState(progress);
        desiredCamPos.copy(camState.position);
        desiredTarget.copy(camState.target);

        // Control Underground Illumination smoothly:
        // Turns on as camera descends (70% - 78%) and remains active throughout (78% - 100%)
        if (progress >= 0.70) {
          const lightFadeIn = Math.min(1, (progress - 0.70) / 0.08);
          underground.setUndergroundLight(lightFadeIn);
        } else {
          underground.setUndergroundLight(0);
        }

        // Sequential Project Station Highlights based on camera focus (88% - 100%)
        const stationRanges = [
          { idx: 0, start: 0.88, end: 0.90 }, // AI Mock Interview
          { idx: 1, start: 0.90, end: 0.92 }, // HVAC
          { idx: 2, start: 0.92, end: 0.94 }, // Plumbing
          { idx: 3, start: 0.94, end: 0.96 }, // Roofing
          { idx: 4, start: 0.96, end: 0.98 }, // Black Trendz
          { idx: 5, start: 0.98, end: 1.00 }, // Basil Town
        ];

        stationRanges.forEach(({ idx, start, end }) => {
          const st = underground.stations[idx];
          if (st) {
            const isNear = progress >= start && progress <= end;
            st.setHighlight(isNear);
          }
        });
      },
      getTelemetry: () => ({
        fps: currentFps,
        calls: renderer.info.render.calls,
        triangles: renderer.info.render.triangles,
        geometries: renderer.info.memory.geometries,
        textures: renderer.info.memory.textures,
      }),
    };

    onSceneReady(handles);

    // 11. RAYCASTING ON PROJECT PANELS
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerDown = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const panels = underground.stations.map((s) => s.panelMesh);
      const intersects = raycaster.intersectObjects(panels, false);
      if (intersects.length > 0) {
        const proj = intersects[0].object.userData?.project as ProjectItem | undefined;
        if (proj) {
          if (onProjectSelect) {
            onProjectSelect(proj);
          } else if (proj.liveUrl) {
            window.open(proj.liveUrl, '_blank', 'noopener,noreferrer');
          }
        }
      }
    };

    const onPointerMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const panels = underground.stations.map((s) => s.panelMesh);
      const intersects = raycaster.intersectObjects(panels, false);
      if (intersects.length > 0) {
        document.body.style.cursor = 'pointer';
      } else {
        document.body.style.cursor = 'default';
      }
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointermove', onPointerMove);

    // 12. RENDER LOOP (Direct Smooth Camera Lerp)
    let animId: number;
    let frameCount = 0;
    let lastFpsTime = performance.now();
    let currentFps = 60;

    const render = () => {
      const now = performance.now();
      frameCount++;
      if (now - lastFpsTime >= 500) {
        currentFps = Math.round((frameCount * 1000) / (now - lastFpsTime));
        frameCount = 0;
        lastFpsTime = now;
      }

      const t = now * 0.001;

      // Spark pulsation
      if (sparkMesh.visible) {
        const s = 1 + Math.sin(t * 5) * 0.2;
        sparkMesh.scale.set(s, s, s);
        sparkRing.scale.set(s * 1.2, s * 1.2, s * 1.2);
      }

      // Upper data pulse
      const pt = (t * 0.35) % 1;
      const pos = pathCurve.getPointAt(pt);
      pulseMesh.position.copy(pos);

      // Underground pipeline pulses
      underground.updatePulses(t);

      // Smooth camera interpolation
      currentCamPos.lerp(desiredCamPos, 0.08);
      cameraTarget.lerp(desiredTarget, 0.08);

      camera.position.copy(currentCamPos);
      camera.lookAt(cameraTarget);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(render);
    };

    render();

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
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      document.body.style.cursor = 'default';
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onSceneReady, onProjectSelect]);

  return <div ref={containerRef} className="relative w-full h-full" />;
};

export default ArchitecturalCanvas;
