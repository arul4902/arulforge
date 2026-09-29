import * as THREE from 'three';

export interface CameraWaypoint {
  progress: number;
  pos: THREE.Vector3;
  target: THREE.Vector3;
  stage: string;
}

export const CAMERA_WAYPOINTS: CameraWaypoint[] = [
  // 0.00: SCENE 01 - Table establishing shot (empty table, person silhouette behind table)
  {
    progress: 0.00,
    pos: new THREE.Vector3(3.8, 2.2, 7.8),
    target: new THREE.Vector3(0, 0.4, 0),
    stage: 'ARRIVAL // EMPTY TABLE',
  },
  // 0.10: SCENE 02 - The First Idea (light point on table, first line starts drawing)
  {
    progress: 0.10,
    pos: new THREE.Vector3(2.4, 1.8, 5.6),
    target: new THREE.Vector3(0, 0.05, 0.5),
    stage: 'THE FIRST IDEA',
  },
  // 0.18: SCENE 03 - Blueprint floor plan forming across table
  {
    progress: 0.18,
    pos: new THREE.Vector3(3.2, 2.8, 5.8),
    target: new THREE.Vector3(0, 0.05, 0.2),
    stage: 'BLUEPRINT SYSTEM',
  },
  // 0.28: SCENE 04 - First building rising floor-by-floor
  {
    progress: 0.28,
    pos: new THREE.Vector3(2.6, 1.9, 4.4),
    target: new THREE.Vector3(0, 0.9, 0),
    stage: 'STRUCTURE CONSTRUCTION',
  },
  // 0.38: SCENE 05 - Frontend District assembling
  {
    progress: 0.38,
    pos: new THREE.Vector3(-2.4, 2.0, 4.2),
    target: new THREE.Vector3(-4.0, 1.1, 0.5),
    stage: 'FRONTEND DISTRICT',
  },
  // 0.46: SCENE 06 - Backend District assembling & connection path
  {
    progress: 0.46,
    pos: new THREE.Vector3(2.4, 2.0, 4.2),
    target: new THREE.Vector3(4.0, 1.1, 0.5),
    stage: 'BACKEND DISTRICT',
  },
  // 0.53: SCENE 07 - Data Core (MySQL) assembling
  {
    progress: 0.53,
    pos: new THREE.Vector3(-1.8, 1.9, 4.8),
    target: new THREE.Vector3(-3.2, 0.8, 2.2),
    stage: 'DATA CORE // MYSQL',
  },
  // 0.60: SCENE 08 - AI Tower rising tall
  {
    progress: 0.60,
    pos: new THREE.Vector3(1.6, 2.7, 4.8),
    target: new THREE.Vector3(0, 2.2, -2.8),
    stage: 'AI INTELLIGENCE LAB',
  },
  // 0.66: SCENE 09 - Deployment Hub & Complete Upper City
  {
    progress: 0.66,
    pos: new THREE.Vector3(4.2, 3.2, 6.8),
    target: new THREE.Vector3(0, 1.0, 0),
    stage: 'DEPLOYMENT // LIVE STATUS',
  },
  // 0.70: CAMERA APPROACHES TABLE EDGE
  {
    progress: 0.70,
    pos: new THREE.Vector3(0.0, 1.0, 5.2),
    target: new THREE.Vector3(0, 0.1, 2.0),
    stage: 'APPROACHING TABLE EDGE',
  },
  // 0.75: CAMERA GOES UNDER THE TABLE SURFACE!
  {
    progress: 0.75,
    pos: new THREE.Vector3(0.0, -1.2, 4.2),
    target: new THREE.Vector3(0, -2.0, 0.5),
    stage: 'DESCENDING BELOW TABLE',
  },
  // 0.80: SCENE 10 - Under the Table pipeline architecture
  {
    progress: 0.80,
    pos: new THREE.Vector3(-1.8, -2.2, 3.4),
    target: new THREE.Vector3(-2.5, -2.3, 0.5),
    stage: 'UNDERGROUND PIPELINES',
  },
  // 0.84: SCENE 11 - Project Station 1 & 2 (Mock Interview & HVAC)
  {
    progress: 0.84,
    pos: new THREE.Vector3(-3.4, -2.2, 2.2),
    target: new THREE.Vector3(-4.2, -2.2, 0.5),
    stage: 'PROJECT // AI INTERVIEW COACH',
  },
  // 0.88: SCENE 11 - Project Station 3 & 4 (Plumbing & Summit Roofing)
  {
    progress: 0.88,
    pos: new THREE.Vector3(0.0, -2.2, 2.4),
    target: new THREE.Vector3(0.2, -2.3, 0.0),
    stage: 'PROJECTS // INFRASTRUCTURE',
  },
  // 0.92: SCENE 11 - Project Station 5 & 6 (The Black Trendz & Basil Town)
  {
    progress: 0.92,
    pos: new THREE.Vector3(3.2, -2.2, 2.2),
    target: new THREE.Vector3(4.2, -2.3, 0.5),
    stage: 'PROJECTS // COMMERCE & BRAND',
  },
  // 0.94: SCENE 12 - Central Vertical Conduit & Energy pulse
  {
    progress: 0.94,
    pos: new THREE.Vector3(0.0, -2.6, 2.4),
    target: new THREE.Vector3(0, -1.2, 0),
    stage: 'FOLLOW THE ENERGY',
  },
  // 0.96: SCENE 12 - Energy pulse shoots UP toward table, camera follows
  {
    progress: 0.96,
    pos: new THREE.Vector3(0.0, -0.6, 3.4),
    target: new THREE.Vector3(0, 0.3, 0),
    stage: 'ASCENDING CONDUIT',
  },
  // 0.98: SCENE 13 - Emerging back above table, complete city
  {
    progress: 0.98,
    pos: new THREE.Vector3(3.4, 2.4, 6.6),
    target: new THREE.Vector3(0, 0.8, 0),
    stage: 'COMPLETE DIGITAL CITY',
  },
  // 1.00: SCENE 14 - Final ArulForge Cinematic Shot
  {
    progress: 1.00,
    pos: new THREE.Vector3(6.8, 3.8, 9.8),
    target: new THREE.Vector3(0, 0.8, 0),
    stage: 'ARULFORGE // ENGINEERED',
  },
];

export function getCameraState(progress: number): {
  position: THREE.Vector3;
  target: THREE.Vector3;
  stage: string;
} {
  const p = Math.max(0, Math.min(1, progress));

  // Find bounding waypoints
  let prevIdx = 0;
  for (let i = 0; i < CAMERA_WAYPOINTS.length - 1; i++) {
    if (p >= CAMERA_WAYPOINTS[i].progress && p <= CAMERA_WAYPOINTS[i + 1].progress) {
      prevIdx = i;
      break;
    }
  }

  const w1 = CAMERA_WAYPOINTS[prevIdx];
  const w2 = CAMERA_WAYPOINTS[Math.min(prevIdx + 1, CAMERA_WAYPOINTS.length - 1)];

  if (w1 === w2 || w2.progress === w1.progress) {
    return {
      position: w1.pos.clone(),
      target: w1.target.clone(),
      stage: w1.stage,
    };
  }

  // Smooth Hermite / Smoothstep factor
  const segmentT = (p - w1.progress) / (w2.progress - w1.progress);
  const smoothT = segmentT * segmentT * (3 - 2 * segmentT);

  const position = new THREE.Vector3().lerpVectors(w1.pos, w2.pos, smoothT);
  const target = new THREE.Vector3().lerpVectors(w1.target, w2.target, smoothT);

  return {
    position,
    target,
    stage: w1.stage,
  };
}
