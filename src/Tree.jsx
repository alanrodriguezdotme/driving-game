import { useBox } from "@react-three/cannon";
import * as THREE from "three";

const coneGeometry = new THREE.ConeGeometry(1, 1, 4);
const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 1, 6);

const leavesMaterial = new THREE.MeshStandardMaterial({ color: "green" });
const trunkMaterial = new THREE.MeshStandardMaterial({ color: "brown" });

export default function Tree({
  position = [0, 0, 0],
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
  debug = true,
  onCollide,
}) {
  const [colliderRef] = useBox(
    () => ({
      position,
      type: "Static",
      onCollide: (e) => {
        onCollide && onCollide();
      },
    }),
    [position]
  );

  return (
    <group scale={scale} position={position} rotation={rotation}>
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
