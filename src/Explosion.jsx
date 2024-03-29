import * as THREE from "three";
import { useEffect, useRef } from "react";
import { act, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useAnimations, useGLTF } from "@react-three/drei";

export default function Explosion({ position = [0, 0, 0], scale = [1, 1, 1] }) {
  const { nodes, animations } = useGLTF("/explosion.glb");
  const { ref, actions, names } = useAnimations(animations);

  useEffect(() => {
    console.log({ actions, names, nodes, animations });
    actions[names[0]].play();
    actions[names[1]].play();
    actions[names[2]].play();
  }, [actions, names]);

  const renderSkinnedMeshes = () => {
    const skinnedMeshes = [];
    nodes.Scene.children.forEach((child) => {
      if (child.isMesh) {
        skinnedMeshes.push(
          <mesh
            key={child.uuid}
            geometry={child.geometry}
            material={child.material}
            position={child.position}
          />
        );
      }
    });
    return skinnedMeshes;
  };

  return (
    <group ref={ref} position={position} scale={scale}>
      <primitive object={nodes.Scene} />
      {nodes && renderSkinnedMeshes()}
    </group>
  );
}
