import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import Lights from "./Lights.jsx";
import Level from "./Level.jsx";
import { Debug, Physics } from "@react-three/cannon";
import { Suspense, useRef } from "react";

const debug = false;

export default function Experience() {
  const cameraRef = useRef(null);

  return (
    <Suspense fallback={null}>
      {debug && <OrbitControls />}
      <OrthographicCamera
        ref={cameraRef}
        makeDefault
        zoom={60}
        position={[100, 100, 100]}
        near={1}
        far={2000}
      />
      <Physics broadphase="SAP" gravity={[0, -4, 0]}>
        {debug ? (
          <Debug>
            <Lights />
            <Level />
          </Debug>
        ) : (
          <>
            <Lights />
            <Level />
          </>
        )}
      </Physics>
    </Suspense>
  );
}
