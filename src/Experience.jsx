import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import Lights from "./Lights.jsx";
import Level from "./Level.jsx";
import { Debug, Physics } from "@react-three/cannon";
import { Suspense, useEffect, useRef } from "react";
import { useControls } from "leva";

export default function Experience() {
  const { debug } = useControls({ debug: true });
  const cameraRef = useRef(null);
  const defaultCamera = {
    zoom: 60,
    position: [100, 100, 100],
    near: 1,
    far: 2000,
  };

  useEffect(() => {
    if (cameraRef.current && debug) {
      cameraRef.current.zoom = defaultCamera.zoom;
    }
  }, [debug]);

  return (
    <Suspense fallback={null}>
      {debug && <OrbitControls zoom={-5} />}
      <OrthographicCamera
        ref={cameraRef}
        makeDefault
        zoom={debug ? 10 : defaultCamera.zoom}
        position={defaultCamera.position}
        near={defaultCamera.near}
        far={defaultCamera.far}
      />
      <Physics broadphase="SAP" gravity={[0, -5, 0]}>
        {debug ? (
          <Debug>
            <Lights debug={debug} />
            <Level debug={debug} />
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
