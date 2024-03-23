import * as THREE from "three";

const coneGeometry = new THREE.ConeGeometry(1, 1, 6);
const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 1, 6);

const leavesMaterial = new THREE.MeshStandardMaterial({ color: "green" });
const trunkMaterial = new THREE.MeshStandardMaterial({ color: "brown" });

export default function Tree({
  position = [0, 0, 0],
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
}) {
  return (
    <group position={position} scale={scale} rotation={rotation}>
      <mesh
        geometry={coneGeometry}
        material={leavesMaterial}
        position={[0, 2.5, 0]}
        scale={[1, 3, 1]}
        castShadow
      />
      <mesh
        geometry={cylinderGeometry}
        material={trunkMaterial}
        position={[0, 0.5, 0]}
        scale={[0.25, 1, 0.25]}
        castShadow
      />
    </group>
  );
}
