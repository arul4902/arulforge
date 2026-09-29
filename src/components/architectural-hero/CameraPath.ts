import * as THREE from 'three';

export interface CameraState {
  position: THREE.Vector3;
  target: THREE.Vector3;
  phase: string;
}

/**
 * DETERMINISTIC CINEMATIC CAMERA SYSTEM
 * Strict timeline mapping per user specification:
 * 0–8%    EMPTY TABLE (Stationary low angle)
 * 8–15%   BLUEPRINT DRAWS (Stationary observing table)
 * 15–20%  FOUNDATIONS (Stationary observing foundation slabs forming)
 * 20–62%  TECHNOLOGY BUILDINGS RISE (Main experience: gentle subtle elevation)
 * 62–70%  COMPLETE CITY HOLD (5-10% gentle pullback to frame metropolis)
 * 70–78%  CAMERA DESCENDS BELOW TABLE (Approaches table edge and dives to Y < 0)
 * 78–88%  UNDERGROUND PIPELINES (Explores under-table data conduits)
 * 88–100% REAL PROJECTS (Glides through 6 real project station docks)
 */
export function getCameraState(progress: number): CameraState {
  const p = THREE.MathUtils.clamp(progress, 0, 1);

  const position = new THREE.Vector3();
  const target = new THREE.Vector3();
  let phase = 'PHASE 1 // EMPTY TABLE';

  if (p < 0.08) {
    // 0–8%: EMPTY TABLE
    position.set(0.0, 1.8, 7.2);
    target.set(0.0, 0.6, 0.0);
    phase = 'PHASE 1 // EMPTY TABLE';
  } else if (p < 0.15) {
    // 8–15%: BLUEPRINT DRAWS
    position.set(0.0, 1.8, 7.2);
    target.set(0.0, 0.6, 0.0);
    phase = 'PHASE 2 // BLUEPRINT SYSTEM';
  } else if (p < 0.20) {
    // 15–20%: FOUNDATIONS
    position.set(0.0, 1.8, 7.2);
    target.set(0.0, 0.6, 0.0);
    phase = 'PHASE 2.5 // FOUNDATION GRID';
  } else if (p < 0.62) {
    // 20–62%: TECHNOLOGY BUILDINGS RISE (MAIN EXPERIENCE)
    const t = THREE.MathUtils.clamp((p - 0.20) / 0.42, 0, 1);
    position.set(0.0, 1.8 + t * 0.35, 7.2 + t * 0.5);
    target.set(0.0, 0.6 + t * 0.35, 0.0);
    phase = 'PHASE 3 // TECHNOLOGY SKYLINE';
  } else if (p < 0.70) {
    // 62–70%: COMPLETE CITY HOLD / CONNECTIONS
    const t = THREE.MathUtils.clamp((p - 0.62) / 0.08, 0, 1);
    position.set(0.0, 2.15 + t * 0.2, 7.7 + t * 0.4);
    target.set(0.0, 0.95, 0.0);
    phase = 'PHASE 4 // COMPLETE CITY';
  } else if (p < 0.78) {
    // 70–78%: CAMERA DESCENDS BELOW TABLE
    const t = THREE.MathUtils.clamp((p - 0.70) / 0.08, 0, 1);
    const smoothT = t * t * (3 - 2 * t);

    if (smoothT < 0.5) {
      const segT = smoothT * 2;
      position.set(0.0, 2.35 - segT * 1.6, 8.1 - segT * 2.5);
      target.set(0.0, 0.95 - segT * 0.6, 0.0 + segT * 0.8);
    } else {
      const segT = (smoothT - 0.5) * 2;
      position.set(0.0, 0.75 - segT * 3.15, 5.6 - segT * 1.2);
      target.set(0.0, 0.35 - segT * 2.55, 0.8 - segT * 0.4);
    }
    phase = 'PHASE 5 // DESCENDING BELOW TABLE';
  } else if (p < 0.88) {
    // 78–88%: PIPELINE INFRASTRUCTURE
    const t = THREE.MathUtils.clamp((p - 0.78) / 0.10, 0, 1);
    const smoothT = t * t * (3 - 2 * t);
    position.set(
      -1.4 * smoothT,
      -2.4 - smoothT * 0.7,
      4.4 - smoothT * 1.5
    );
    target.set(
      -1.6 * smoothT,
      -2.2 - smoothT * 0.6,
      0.4 - smoothT * 0.2
    );
    phase = 'PHASE 6 // PIPELINES WORLD';
  } else {
    // 88–100%: REAL PROJECT STATIONS ALONG PIPELINES
    const t = THREE.MathUtils.clamp((p - 0.88) / 0.12, 0, 1);
    const smoothT = t * t * (3 - 2 * t);
    position.set(
      -1.8 + smoothT * 4.2,
      -3.1,
      2.4 - smoothT * 0.6
    );
    target.set(
      -2.5 + smoothT * 5.0,
      -3.0,
      0.1
    );
    phase = 'PHASE 7 // PROJECT INFRASTRUCTURE';
  }

  return { position, target, phase };
}
