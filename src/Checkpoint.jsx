import * as THREE from "three";
import { useEffect, useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useBox } from "@react-three/cannon";

const coinGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.1, 32);
coinGeometry.rotateX(Math.PI / 2);

export default function Checkpoint({
  position = [0, 0, 0],
  number,
  currentCheckpoint = 1,
  debug = false,
  onCollide,
}) {
  const meshRef = useRef(null);
  const [isActive, setIsActive] = useState(currentCheckpoint === number);
  const [isFinished, setIsFinished] = useState(false);
  const [colliderRef] = useBox(
    () => ({
      position,
      collisionResponse: false,
      onCollide: (e) => {
        if (e.body.name === "chassisBody" && isActive) {
          onCollide && onCollide(number);
        }
      },
    }),
    undefined,
    [isActive]
  );

  const getOpacity = () => {
    if (isActive) {
      return 1;
    } else if (isFinished) {
      return 0.5;
    }
    return 0;
  };

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.1;
    }
  });

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.material.opacity = getOpacity();
    }

    if (currentCheckpoint === number) {
      setIsActive(true);
    } else if (currentCheckpoint > number) {
      setIsActive(false);
      setIsFinished(true);
    } else {
      setIsFinished(false);
      setIsActive(false);
    }
  }, [currentCheckpoint]);

  return (
    <group>
      <mesh
        ref={meshRef}
        scale={[1, 1, 1]}
        rotateX={Math.PI / 3}
        castShadow
        position={position}
        geometry={coinGeometry}
      >
        <meshStandardMaterial
          color={"gold"}
          transparent
          opacity={getOpacity()}
        />
      </mesh>
      {debug && (
        <mesh ref={colliderRef} scale={[1.2, 1.2, 1.2]} position={position}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial transparent opacity={0.25} />
        </mesh>
      )}
    </group>
  );
}
