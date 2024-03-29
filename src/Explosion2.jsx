import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const icoGeometry = new THREE.IcosahedronGeometry(1, 0);
const orangeMaterial = new THREE.MeshBasicMaterial({ color: "orange" });
const yellowMaterial = new THREE.MeshBasicMaterial({ color: "yellow" });
const lightGrayMaterial = new THREE.MeshBasicMaterial({ color: "lightgray" });
const darkGrayMaterial = new THREE.MeshBasicMaterial({ color: "darkgray" });

function Icosahedron({ material = lightGrayMaterial }) {
  const ref = useRef();

  useFrame((state, delta) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      if (t < 0.25) {
        ref.current.scale.setScalar(0);
      } else if (t < 1) {
        ref.current.scale.setScalar(t + 0.2);
      } else if (t < 2) {
        ref.current.scale.setScalar(1.5 - t);
      }
    }
  });

  return (
    <mesh
      ref={ref}
      geometry={icoGeometry}
      material={material}
      translateX={1}
      translateY={1}
    />
  );
}

export default function Explosion({ position = [0, 0, 0], scale = [1, 1, 1] }) {
  const renderIcosahedrons = (amount) => {
    const icosahedrons = [];
    for (let i = 0; i < amount; i++) {
      icosahedrons.push(
        <Icosahedron material={yellowMaterial} key={"ico-" + i} />
      );
    }
    return icosahedrons;
  };
  return (
    <group position={position} scale={scale}>
      {renderIcosahedrons(4)}
    </group>
  );
}
