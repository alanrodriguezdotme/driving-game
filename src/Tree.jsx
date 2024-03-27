import { useBox } from "@react-three/cannon";
import * as THREE from "three";

const leavesGeometry = new THREE.ConeGeometry(1, 1, 4);
const trunkGeometry = new THREE.CylinderGeometry(1, 1, 1, 4);

const leavesMaterial = new THREE.MeshStandardMaterial({ color: "green" });
const trunkMaterial = new THREE.MeshStandardMaterial({ color: "brown" });

const colliderMaterial = new THREE.MeshBasicMaterial({
  transparent: true,
  opacity: 0,
});

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
      rotation,
      material: colliderMaterial,
      type: "Static",
      onCollide: (e) => {
        onCollide && onCollide();
      },
    }),
    undefined,
    [position]
  );

  return (
    <group
      ref={colliderRef}
      scale={scale}
      position={position}
      rotation={rotation}
    >
      <mesh
        geometry={leavesGeometry}
        material={leavesMaterial}
        rotation={rotation}
        position={[0, 2.5, 0]}
        scale={[1, 3, 1]}
        castShadow
      />
      <mesh
        geometry={trunkGeometry}
        material={trunkMaterial}
        position={[0, 0.5, 0]}
        scale={[0.25, 1, 0.25]}
        rotation={rotation}
        castShadow
      />
    </group>
  );
}
