import { useGLTF } from "@react-three/drei";

export default function Tree({ position, scale, rotation }) {
  let result = useGLTF("/tree-1.glb").scene;

  return (
    <group scale={scale} rotation={rotation}>
      <primitive object={result} position={position} />
    </group>
  );
}
