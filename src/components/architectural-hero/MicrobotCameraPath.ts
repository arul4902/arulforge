import * as THREE from 'three';

export interface CameraWaypointDef {
  progress: number;
  pos: [number, number, number];
  target: [number, number, number];
  stage: string;
}

/**
 * 21 Precision Microbot Waypoints defining the unbroken cinematic camera journey:
 * - Ultra-low table arrival (micro scale, 5-15cm tall)
 * - Following blueprint spark down street axis
 * - Weaving between buildings as they construct floor-by-floor
 * - Frontend street canyon (React, Next.js, TypeScript, Tailwind bridge)
 * - Under bridge to Backend industrial district (Java, Spring Boot, REST APIs)
 * - Central Data Core (MySQL)
 * - Looking up at colossal AI Tower
 * - Diving over table edge into negative Y subterranean pipeline tunnels
 * - Flying through giant pipes and real project station docks
 * - Shooting up vertical ascent conduit back to table surface
 * - Rapid pull-back to grand macro overview with complete holographic city & observer silhouette
 */
export const MICROBOT_WAYPOINTS: CameraWaypointDef[] = [
  // 0.00: MICROBOT ARRIVAL (0-8%) - Ultra low on dark table, looking forward toward silhouette in distance
  {
    progress: 0.00,
    pos: [0.0, 0.16, 4.6],
    target: [0.0, 0.22, 1.8],
    stage: '01. MICROBOT ARRIVAL // TABLE EDGE',
  },
  // 0.08: SPARK AWAKENS (8-18%) - Spark glides forward, drawing blueprint lines
  {
    progress: 0.08,
    pos: [0.0, 0.22, 3.8],
    target: [0.0, 0.20, 1.5],
    stage: '02. THE FIRST IDEA // SPARK AWAKENS',
  },
  // 0.15: BLUEPRINT STREET - Camera follows spark, blueprint lines branch outward
  {
    progress: 0.15,
    pos: [0.0, 0.26, 2.8],
    target: [0.0, 0.25, 0.5],
    stage: '03. BLUEPRINT FORMING // URBAN GRID',
  },
  // 0.22: FIRST FOUNDATIONS - Foundations emerge around camera
  {
    progress: 0.22,
    pos: [-0.2, 0.3, 2.2],
    target: [-0.4, 0.45, 0.5],
    stage: '04. FOUNDATIONS RISING',
  },
  // 0.28: BUILDINGS RISE AROUND US (18-32%) - Columns grow upward on left and right
  {
    progress: 0.28,
    pos: [-0.6, 0.35, 1.6],
    target: [-1.4, 0.9, 0.8],
    stage: '05. BUILDINGS RISE AROUND MICROBOT',
  },
  // 0.34: FRONTEND DISTRICT (32-42%) - Gliding between React & Next.js towers
  {
    progress: 0.34,
    pos: [-1.3, 0.4, 0.9],
    target: [-2.0, 1.1, 0.3],
    stage: '06. FRONTEND DISTRICT // REACT & NEXT.JS',
  },
  // 0.40: SKYBRIDGE (Tailwind) - Looking up at connecting skybridge overhead
  {
    progress: 0.40,
    pos: [-0.8, 0.44, 0.4],
    target: [0.0, 1.2, 0.4],
    stage: '07. SKYBRIDGE // TYPESCRIPT & TAILWIND',
  },
  // 0.45: PASSING UNDER BRIDGE TO BACKEND (42-50%) - Entering industrial Backend district
  {
    progress: 0.45,
    pos: [0.2, 0.42, 0.2],
    target: [1.8, 0.8, 0.3],
    stage: '08. BACKEND DISTRICT // JAVA & SPRING BOOT',
  },
  // 0.50: BACKEND CANYON - REST APIs and data bus signal
  {
    progress: 0.50,
    pos: [1.3, 0.45, 0.1],
    target: [1.8, 1.0, -0.6],
    stage: '09. REST API ENGINE // DATA BUS',
  },
  // 0.54: DATA CORE (50-56%) - Turning toward dense MySQL strata
  {
    progress: 0.54,
    pos: [0.5, 0.46, -0.7],
    target: [0.0, 0.7, -1.0],
    stage: '10. DATA CORE // MYSQL STRATA',
  },
  // 0.60: AI TOWER (56-63%) - Microbot looks up at colossal AI Tower
  {
    progress: 0.60,
    pos: [0.15, 0.55, -2.4],
    target: [0.0, 2.6, -3.8],
    stage: '11. AI TOWER // INTELLIGENCE MATRIX',
  },
  // 0.65: NOTICE CONDUIT (63-68%) - Signal dives into table surface
  {
    progress: 0.65,
    pos: [1.6, 0.48, 1.5],
    target: [2.6, 0.12, 3.2],
    stage: '12. CONDUIT TO THE DEPTHS',
  },
  // 0.69: APPROACH DIVE EDGE (68-73%) - Approaching table edge shaft
  {
    progress: 0.69,
    pos: [2.4, 0.38, 2.8],
    target: [2.8, -1.0, 3.8],
    stage: '13. APPROACHING SUBTERRANEAN SHAFT',
  },
  // 0.73: THE DIVE! - Diving under table into negative Y space
  {
    progress: 0.73,
    pos: [2.8, -1.6, 3.6],
    target: [1.5, -3.6, 2.2],
    stage: '14. DIVING BENEATH THE TABLE SURFACE',
  },
  // 0.78: PIPELINE TUNNEL WORLD (73-80%) - Flying alongside giant tunnel conduits
  {
    progress: 0.78,
    pos: [1.0, -3.6, 2.2],
    target: [-1.2, -3.8, 1.6],
    stage: '15. PIPELINE WORLD // DATA AQUEDUCTS',
  },
  // 0.83: PROJECT STATION 01 (80-91%) - AI Mock Interview Coach dock
  {
    progress: 0.83,
    pos: [-3.2, -3.8, 1.4],
    target: [-4.4, -4.0, 1.2],
    stage: '16. PROJECT DOCK // AI MOCK INTERVIEW',
  },
  // 0.87: PROJECT STATIONS 02 & 03 - HVAC & Plumbing services docks
  {
    progress: 0.87,
    pos: [-1.5, -3.9, -0.6],
    target: [-2.4, -4.2, -1.6],
    stage: '17. PROJECT DOCKS // HVAC & PLUMBING',
  },
  // 0.90: PROJECT STATIONS 04 & 05 - Summit Roofing & Black Trendz docks
  {
    progress: 0.90,
    pos: [1.6, -3.9, 0.6],
    target: [3.0, -4.0, 1.6],
    stage: '18. PROJECT DOCKS // ROOFING & APPAREL',
  },
  // 0.93: DEPLOYMENT DOCK - All pipelines converge into deployment node
  {
    progress: 0.93,
    pos: [1.2, -4.2, -0.2],
    target: [0.0, -4.5, 0.0],
    stage: '19. DEPLOYMENT CORE // VERCEL & AWS',
  },
  // 0.96: VERTICAL ASCENT (95-98%) - Entering vertical conduit looking up
  {
    progress: 0.96,
    pos: [0.0, -2.5, 0.0],
    target: [0.0, 0.5, 0.0],
    stage: '20. ASCENDING DATA CONDUIT TO SURFACE',
  },
  // 0.98: SURFACE BREAKTHROUGH - Emerging back onto table surface
  {
    progress: 0.98,
    pos: [0.0, 0.45, 1.8],
    target: [0.0, 0.9, -0.8],
    stage: '21. SURFACE BREAKTHROUGH',
  },
  // 1.00: FINAL MACRO REVEAL (98-100%) - High crane pull-back overview of complete city
  {
    progress: 1.00,
    pos: [6.8, 4.4, 9.6],
    target: [0.0, 0.9, 0.0],
    stage: '22. ARULFORGE // DIGITAL EXPERIENCES, ENGINEERED.',
  },
];

// Build Catmull-Rom centripetal curves for smooth, continuous, non-jerky microbot navigation
const cameraPoints = MICROBOT_WAYPOINTS.map((w) => new THREE.Vector3(...w.pos));
const targetPoints = MICROBOT_WAYPOINTS.map((w) => new THREE.Vector3(...w.target));

export const microbotCameraCurve = new THREE.CatmullRomCurve3(
  cameraPoints,
  false,
  'centripetal',
  0.5
);

export const microbotTargetCurve = new THREE.CatmullRomCurve3(
  targetPoints,
  false,
  'centripetal',
  0.5
);

export function getMicrobotCameraState(progress: number): {
  position: THREE.Vector3;
  target: THREE.Vector3;
  stage: string;
} {
  const p = Math.max(0, Math.min(1, progress));
  const position = microbotCameraCurve.getPointAt(p);
  const target = microbotTargetCurve.getPointAt(p);

  // Find active stage name
  let activeStage = MICROBOT_WAYPOINTS[0].stage;
  for (let i = MICROBOT_WAYPOINTS.length - 1; i >= 0; i--) {
    if (p >= MICROBOT_WAYPOINTS[i].progress) {
      activeStage = MICROBOT_WAYPOINTS[i].stage;
      break;
    }
  }

  return {
    position,
    target,
    stage: activeStage,
  };
}
