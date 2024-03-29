import { Preload } from "@react-three/drei";
import Experience from "./Experience";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";

export default function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const debugFromUrl = queryParams.get("debug") === "true";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#121212",
      }}
    >
      <Leva hidden={!debugFromUrl} />
      <div
        style={{
          width: "100%",
          height: "100%",
          maxWidth: 1000,
          maxHeight: 720,
        }}
      >
        <Canvas shadows>
          <Experience />
          <Preload all />
        </Canvas>
      </div>
    </div>
  );
}
