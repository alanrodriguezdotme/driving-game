import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const coinGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.1, 32);
coinGeometry.rotateX(Math.PI / 2);
coinGeometry.transparent = true;
const checkpointMaterial = new THREE.MeshStandardMaterial({ color: "gold" });

export default function Checkpoint({
  position = [0, 0, 0],
  number,
  isFinished = false,
  isActive = false,
  debug = false,
}) {
  const meshRef = useRef(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.066;
    }
  });

  useEffect(() => {
    if (isFinished) {
      meshRef.current.material.opacity = 0.5;
    } else if (isActive) {
      meshRef.current.material.opacity = 1;
    } else {
      meshRef.current.material.opacity = 0;
    }
  }, [isFinished, isActive]);

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        geometry={coinGeometry}
        material={checkpointMaterial}
        position={position}
        scale={[1, 1, 1]}
        castShadow
      />
    </group>
  );
}
