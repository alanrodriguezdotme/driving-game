import Experience from "./Experience";
import { Canvas } from "@react-three/fiber";
import { Leva, useControls } from "leva";

export default function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const debugFromUrl = queryParams.get("debug") === "true";
  return (
    <>
      <Leva hidden={!debugFromUrl} />
      <Canvas shadows>
        <Experience />
      </Canvas>
    </>
  );
}
