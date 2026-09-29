import * as THREE from 'three';

export function createPersonSilhouette(): THREE.Group {
  const group = new THREE.Group();
  group.position.set(0, 0, -4.6);

  const silhouetteMat = new THREE.MeshStandardMaterial({
    color: 0x080b12,
    roughness: 0.85,
    metalness: 0.15,
  });

  const rimEdgeMat = new THREE.LineBasicMaterial({
    color: 0xffa447,
    transparent: true,
    opacity: 0.25,
  });

  // 1. Lower Body / Legs (Shadowed behind table)
  const lowerGeo = new THREE.BoxGeometry(0.7, 1.4, 0.45);
  const lowerMesh = new THREE.Mesh(lowerGeo, silhouetteMat);
  lowerMesh.position.set(0, -0.4, -0.2);
  group.add(lowerMesh);

  // 2. Torso (Leaning slightly forward toward the table)
  const torsoGroup = new THREE.Group();
  torsoGroup.position.set(0, 0.35, -0.15);
  torsoGroup.rotation.x = 0.18; // Lean forward
  group.add(torsoGroup);

  const torsoGeo = new THREE.CylinderGeometry(0.38, 0.32, 0.85, 16);
  const torsoMesh = new THREE.Mesh(torsoGeo, silhouetteMat);
  torsoMesh.position.set(0, 0.42, 0);
  torsoGroup.add(torsoMesh);

  // 3. Shoulders & Upper Back
  const shoulderGeo = new THREE.BoxGeometry(0.95, 0.25, 0.42);
  const shoulderMesh = new THREE.Mesh(shoulderGeo, silhouetteMat);
  shoulderMesh.position.set(0, 0.78, 0);
  torsoGroup.add(shoulderMesh);

  const shoulderEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(shoulderGeo),
    rimEdgeMat
  );
  shoulderMesh.add(shoulderEdges);

  // 4. Neck & Head (Looking toward the center of the table)
  const neckGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.22, 12);
  const neckMesh = new THREE.Mesh(neckGeo, silhouetteMat);
  neckMesh.position.set(0, 0.95, 0.04);
  torsoGroup.add(neckMesh);

  const headGeo = new THREE.SphereGeometry(0.22, 16, 16);
  headGeo.scale(0.85, 1.15, 0.95);
  const headMesh = new THREE.Mesh(headGeo, silhouetteMat);
  headMesh.position.set(0, 1.16, 0.08);
  headMesh.rotation.x = 0.12; // tilted slightly down toward table
  torsoGroup.add(headMesh);

  // 5. Arms Leaning on Table Surface
  // Left Arm
  const leftArmGroup = new THREE.Group();
  leftArmGroup.position.set(-0.46, 0.76, 0);
  leftArmGroup.rotation.z = -0.12;
  leftArmGroup.rotation.x = 0.55; // Angle forward toward table
  torsoGroup.add(leftArmGroup);

  const armGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.55, 12);
  const leftUpperArm = new THREE.Mesh(armGeo, silhouetteMat);
  leftUpperArm.position.set(0, -0.25, 0);
  leftArmGroup.add(leftUpperArm);

  const forearmGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.52, 12);
  const leftForearm = new THREE.Mesh(forearmGeo, silhouetteMat);
  leftForearm.position.set(0, -0.65, 0.12);
  leftForearm.rotation.x = -0.45;
  leftArmGroup.add(leftForearm);

  // Right Arm
  const rightArmGroup = new THREE.Group();
  rightArmGroup.position.set(0.46, 0.76, 0);
  rightArmGroup.rotation.z = 0.12;
  rightArmGroup.rotation.x = 0.55;
  torsoGroup.add(rightArmGroup);

  const rightUpperArm = new THREE.Mesh(armGeo, silhouetteMat);
  rightUpperArm.position.set(0, -0.25, 0);
  rightArmGroup.add(rightUpperArm);

  const rightForearm = new THREE.Mesh(forearmGeo, silhouetteMat);
  rightForearm.position.set(0, -0.65, 0.12);
  rightForearm.rotation.x = -0.45;
  rightArmGroup.add(rightForearm);

  return group;
}
