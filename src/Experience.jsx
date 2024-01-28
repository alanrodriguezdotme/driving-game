import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import Lights from "./Lights.jsx";
import Level from "./Level.jsx";
import { Debug, Physics } from "@react-three/cannon";
import { Suspense } from "react";

export default function Experience() {
  return (
    <Suspense fallback={null}>
      {/* <OrbitControls /> */}
      <OrthographicCamera
        makeDefault
        zoom={60}
        position={[100, 100, 100]}
        near={1}
        far={2000}
      />
      <Physics broadphase="SAP" gravity={[0, -4, 0]}>
        {/* <Debug> */}
        <Lights />
        <Level />
        {/* </Debug> */}
      </Physics>
    </Suspense>
  );
}
