import * as THREE from "three";
import { usePlane } from "@react-three/cannon";
import { useRef } from "react";
import ColliderBox from "./ColliderBox";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const groundMaterial = new THREE.MeshStandardMaterial({ color: "limegreen" });

export default function Ground({ position = [0, 0, 0] }) {
  const [ref] = usePlane(
    () => ({
      type: "Static",
      rotation: [-Math.PI / 2, 0, 0],
    }),
    useRef(null)
  );

  const meshRef = useRef(null);

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        geometry={boxGeometry}
        material={groundMaterial}
        position={position}
        scale={[100, 1, 100]}
        receiveShadow
      />
      <ColliderBox position={[0, 2, 50.5]} scale={[100, 4, 1]} />
      <ColliderBox position={[0, 2, -50.5]} scale={[100, 4, 1]} />
      <ColliderBox position={[50.5, 2, 0]} scale={[1, 4, 100]} />
      <ColliderBox position={[-50.5, 2, 0]} scale={[1, 4, 100]} />
    </group>
  );
}
