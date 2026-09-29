import * as THREE from 'three';
import { projects, type ProjectItem } from '../../data/projects';

export interface ProjectStationHandle {
  project: ProjectItem;
  group: THREE.Group;
  panelMesh: THREE.Mesh;
  dockRing: THREE.Mesh;
  light: THREE.PointLight;
  position: THREE.Vector3;
  setHighlight: (active: boolean) => void;
}

export interface UndergroundHandles {
  group: THREE.Group;
  stations: ProjectStationHandle[];
  pipes: THREE.Group;
  setUndergroundLight: (intensity: number) => void;
  updatePulses: (elapsedTime: number) => void;
}

export function createUndergroundSystem(
  textureLoader: THREE.TextureLoader,
  sharedMaterials: {
    darkMaterial: THREE.MeshStandardMaterial;
    pipeMaterial: THREE.MeshStandardMaterial;
    glassMaterial: THREE.MeshBasicMaterial;
    structureMaterial: THREE.MeshStandardMaterial;
  }
): UndergroundHandles {
  const rootGroup = new THREE.Group();
  rootGroup.position.set(0, 0, 0);

  // 1. LIGHTWEIGHT UNDERGROUND LIGHTS
  const undergroundAmbient = new THREE.AmbientLight(0x061122, 0.4);
  rootGroup.add(undergroundAmbient);

  const undergroundKey = new THREE.PointLight(0x7df9ff, 0, 25);
  undergroundKey.position.set(0, -3.0, 1.0);
  rootGroup.add(undergroundKey);

  // 2. STRUCTURAL PYLONS (Shared unit box geometry scaled)
  const unitBoxGeo = new THREE.BoxGeometry(1, 1, 1);
  const pylonEdgeMat = new THREE.LineBasicMaterial({
    color: 0x1f344d,
    transparent: true,
    opacity: 0.45,
  });

  const pylonPositions = [
    [-8.0, -3.4, -4.5],
    [8.0, -3.4, -4.5],
    [8.0, -3.4, 4.5],
    [-8.0, -3.4, 4.5],
    [-4.0, -3.4, 0.0],
    [4.0, -3.4, 0.0],
  ];

  pylonPositions.forEach(([px, py, pz]) => {
    const pMesh = new THREE.Mesh(unitBoxGeo, sharedMaterials.darkMaterial);
    pMesh.scale.set(0.65, 6.0, 0.65);
    pMesh.position.set(px, py, pz);
    rootGroup.add(pMesh);

    const pEdges = new THREE.LineSegments(new THREE.EdgesGeometry(unitBoxGeo), pylonEdgeMat);
    pEdges.scale.set(0.65, 6.0, 0.65);
    pEdges.position.set(px, py, pz);
    rootGroup.add(pEdges);
  });

  // Bedrock floor grid at Y = -6.0
  const bedrockGrid = new THREE.GridHelper(26, 14, 0x122438, 0x07111c);
  bedrockGrid.position.set(0, -6.0, 0);
  rootGroup.add(bedrockGrid);

  // 3. LOW-POLY PIPELINE TUNNELS (24 tubular segments, 6 radial per rule #10)
  const pipesGroup = new THREE.Group();
  rootGroup.add(pipesGroup);

  interface RouteDef {
    id: string;
    label: string;
    color: number;
    points: THREE.Vector3[];
    radius: number;
  }

  const routes: RouteDef[] = [
    // 1. FRONTEND DATA PIPE (Cyan)
    {
      id: 'frontend',
      label: 'FRONTEND CONDUIT',
      color: 0x00d4ff,
      radius: 0.16,
      points: [
        new THREE.Vector3(-4.0, -0.4, 0.5),
        new THREE.Vector3(-4.0, -2.4, 0.8),
        new THREE.Vector3(-2.0, -2.6, 1.2),
        new THREE.Vector3(1.5, -2.6, 1.0),
        new THREE.Vector3(4.0, -2.6, 0.8),
      ],
    },
    // 2. REST API / SPRING BOOT PIPE (Ice White)
    {
      id: 'backend',
      label: 'REST API / SPRING BOOT',
      color: 0xedf9ff,
      radius: 0.18,
      points: [
        new THREE.Vector3(4.0, -0.4, 0.5),
        new THREE.Vector3(4.0, -2.8, -0.5),
        new THREE.Vector3(1.0, -2.8, -0.6),
        new THREE.Vector3(-2.0, -2.8, -0.5),
        new THREE.Vector3(-4.2, -3.0, 0.4),
      ],
    },
    // 3. MYSQL DATABASE PIPE (Deep Blue)
    {
      id: 'mysql',
      label: 'MYSQL PERSISTENCE',
      color: 0x4ca3ff,
      radius: 0.15,
      points: [
        new THREE.Vector3(-2.6, -0.4, 2.5),
        new THREE.Vector3(-2.6, -3.2, 1.8),
        new THREE.Vector3(0.0, -3.2, 1.5),
        new THREE.Vector3(3.0, -3.2, 1.0),
      ],
    },
    // 4. AI MODEL PIPELINE (Violet/Cyan)
    {
      id: 'ai',
      label: 'AI MODEL STREAM',
      color: 0x9d7bff,
      radius: 0.15,
      points: [
        new THREE.Vector3(0.0, -0.4, -3.2),
        new THREE.Vector3(0.0, -2.6, -2.4),
        new THREE.Vector3(-2.5, -3.0, -0.8),
        new THREE.Vector3(-4.2, -3.2, 0.6),
      ],
    },
    // 5. DEPLOYMENT PIPELINE (Crisp White)
    {
      id: 'deploy',
      label: 'DEPLOYMENT PIPELINE',
      color: 0xffffff,
      radius: 0.14,
      points: [
        new THREE.Vector3(2.6, -0.4, 2.5),
        new THREE.Vector3(2.6, -3.4, 1.8),
        new THREE.Vector3(0.0, -3.4, 0.0),
        new THREE.Vector3(-3.5, -3.4, 0.0),
      ],
    },
  ];

  const pulseMeshes: { mesh: THREE.Mesh; curve: THREE.CatmullRomCurve3; speed: number }[] = [];

  routes.forEach((rDef) => {
    const curve = new THREE.CatmullRomCurve3(rDef.points);
    // OPTIMIZED: 24 tubular segments, 6 radial segments
    const tubeGeo = new THREE.TubeGeometry(curve, 24, rDef.radius, 6, false);

    const tubeMesh = new THREE.Mesh(tubeGeo, sharedMaterials.pipeMaterial);
    pipesGroup.add(tubeMesh);

    // Subtle edge rings using EdgesGeometry on low-poly tube
    const edgeMat = new THREE.LineBasicMaterial({
      color: rDef.color,
      transparent: true,
      opacity: 0.35,
    });
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(tubeGeo, 30), edgeMat);
    tubeMesh.add(edges);

    // Single pulse particle per route (Rule #11)
    const pulseMat = new THREE.MeshBasicMaterial({ color: rDef.color });
    const pMesh = new THREE.Mesh(new THREE.SphereGeometry(rDef.radius * 1.3, 8, 8), pulseMat);
    pipesGroup.add(pMesh);

    pulseMeshes.push({
      mesh: pMesh,
      curve,
      speed: 0.12 + Math.random() * 0.06,
    });
  });

  // 4. REAL PROJECT STATIONS / DOCKS ALONG THE PIPELINES
  const stationDefs: {
    id: string;
    pos: [number, number, number];
    angleY: number;
    feederPipes: [number, number, number][][];
  }[] = [
    // 1. AI Mock Interview Coach (React + API + AI lines converge!)
    {
      id: 'mock-interview-coach',
      pos: [-4.0, -3.0, 0.8],
      angleY: 0.25,
      feederPipes: [
        [
          [-4.0, -2.4, 0.8],
          [-4.0, -3.0, 0.8],
        ],
        [
          [-4.2, -3.0, 0.4],
          [-4.0, -3.0, 0.8],
        ],
      ],
    },
    // 2. HVAC Services
    {
      id: 'hvac-services',
      pos: [-2.2, -3.2, -1.2],
      angleY: -0.2,
      feederPipes: [
        [
          [-2.0, -2.8, -0.5],
          [-2.2, -3.2, -1.2],
        ],
      ],
    },
    // 3. Plumbing Services
    {
      id: 'plumbing-services',
      pos: [-0.6, -3.0, 1.4],
      angleY: 0.15,
      feederPipes: [
        [
          [-1.0, -2.6, 1.2],
          [-0.6, -3.0, 1.4],
        ],
      ],
    },
    // 4. Summit Roofing Solutions
    {
      id: 'summit-roofing',
      pos: [1.2, -3.2, -1.2],
      angleY: -0.15,
      feederPipes: [
        [
          [1.0, -2.8, -0.6],
          [1.2, -3.2, -1.2],
        ],
      ],
    },
    // 5. The Black Trendz
    {
      id: 'the-black-trendz',
      pos: [2.6, -3.0, 1.2],
      angleY: -0.25,
      feederPipes: [
        [
          [1.5, -2.6, 1.0],
          [2.6, -3.0, 1.2],
        ],
      ],
    },
    // 6. Basil Town
    {
      id: 'basil-town',
      pos: [4.2, -3.1, 0.3],
      angleY: -0.3,
      feederPipes: [
        [
          [3.5, -3.1, 0.5],
          [4.2, -3.1, 0.3],
        ],
      ],
    },
  ];

  // Shared geometry for all station docks
  const ringGeo = new THREE.TorusGeometry(0.95, 0.04, 8, 20);
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0x0a1c30,
    metalness: 0.9,
    roughness: 0.25,
    emissive: 0x00d4ff,
    emissiveIntensity: 0.1,
  });

  const screenGeo = new THREE.PlaneGeometry(1.5, 0.98);
  const frameGeo = new THREE.BoxGeometry(1.58, 1.06, 0.06);
  const frameEdgesGeo = new THREE.EdgesGeometry(frameGeo);
  const frameEdgeMat = new THREE.LineBasicMaterial({
    color: 0x7df9ff,
    transparent: true,
    opacity: 0.65,
  });

  const feederPipeMat = new THREE.MeshStandardMaterial({
    color: 0x00d4ff,
    metalness: 0.85,
    roughness: 0.2,
  });

  const stationHandles: ProjectStationHandle[] = [];

  stationDefs.forEach((sDef, idx) => {
    const projData = projects.find((p) => p.id === sDef.id) || projects[idx % projects.length];

    const sGroup = new THREE.Group();
    sGroup.position.set(...sDef.pos);
    sGroup.rotation.y = sDef.angleY;
    rootGroup.add(sGroup);

    // Circular Collar (reusing ringGeo & ringMat)
    const dockRing = new THREE.Mesh(ringGeo, ringMat);
    sGroup.add(dockRing);

    // Screen Material (Texture loaded asynchronously)
    const tex = textureLoader.load(projData.image);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;

    const screenMat = new THREE.MeshStandardMaterial({
      map: tex,
      roughness: 0.2,
      metalness: 0.15,
      emissive: 0x00d4ff,
      emissiveIntensity: 0.05,
      side: THREE.DoubleSide,
    });
    const panelMesh = new THREE.Mesh(screenGeo, screenMat);
    panelMesh.position.set(0, 0, 0.02);
    sGroup.add(panelMesh);
    panelMesh.userData = { project: projData };

    // Glass Reflection Shield (using lightweight Basic material)
    const shieldMesh = new THREE.Mesh(screenGeo, sharedMaterials.glassMaterial);
    shieldMesh.position.set(0, 0, 0.04);
    sGroup.add(shieldMesh);

    // Structural frame edges
    const frameEdges = new THREE.LineSegments(frameEdgesGeo, frameEdgeMat);
    sGroup.add(frameEdges);

    // Station Local Light
    const stationLight = new THREE.PointLight(0x7df9ff, 0.2, 4);
    stationLight.position.set(0, 0.3, 0.8);
    sGroup.add(stationLight);

    // Feeder pipes converging into station
    sDef.feederPipes.forEach((fPts) => {
      if (fPts.length >= 2) {
        const fCurve = new THREE.CatmullRomCurve3(fPts.map((p) => new THREE.Vector3(...p)));
        const fGeo = new THREE.TubeGeometry(fCurve, 8, 0.04, 5, false);
        const fMesh = new THREE.Mesh(fGeo, feederPipeMat);
        rootGroup.add(fMesh);
      }
    });

    const handle: ProjectStationHandle = {
      project: projData,
      group: sGroup,
      panelMesh,
      dockRing,
      light: stationLight,
      position: new THREE.Vector3(...sDef.pos),
      setHighlight: (active: boolean) => {
        screenMat.emissiveIntensity = active ? 0.35 : 0.05;
        stationLight.intensity = active ? 1.8 : 0.2;
      },
    };

    stationHandles.push(handle);
  });

  return {
    group: rootGroup,
    stations: stationHandles,
    pipes: pipesGroup,
    setUndergroundLight: (intensity: number) => {
      undergroundKey.intensity = intensity * 1.8;
    },
    updatePulses: (elapsedTime: number) => {
      pulseMeshes.forEach(({ mesh, curve, speed }) => {
        const u = (elapsedTime * speed) % 1;
        const pt = curve.getPointAt(u);
        mesh.position.copy(pt);
      });
    },
  };
}
