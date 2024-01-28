import { useTrimesh } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";

export default function Ramp({ position }) {
  const result = useGLTF("/ramp.glb");
  const geometry = result.scene.children[0].geometry;
  const vertices = geometry.attributes.position.array;
  const indices = geometry.index.array;

  const [ref] = useTrimesh(
    () => ({
      args: [vertices, indices],
      mass: 0,
      type: "Static",
      position,
    }),
    useRef(null)
  );

  return (
    <mesh ref={ref} castShadow>
      <meshBasicMaterial color="gray" />
      <bufferGeometry attach="geometry" {...geometry} />
    </mesh>
  );
}
