import React, { useRef, useEffect } from "react";
import { CameraHelper, DirectionalLightHelper } from "three";
import { useThree } from "@react-three/fiber";
import { useControls } from "leva";

export default function Lights({ debug = false }) {
  const lightRef = useRef();
  const { scene } = useThree();
  const { ambientLight } = useControls({
    ambientLight: {
      value: 1.5,
      min: 0,
      max: 20,
      step: 0.1,
    },
  });

  useEffect(() => {
    if (lightRef.current) {
      const helper = new DirectionalLightHelper(lightRef.current, 5); // Add this to visualize the shadow camera frustum
      const shadowCameraHelper = new CameraHelper(
        lightRef.current.shadow.camera
      );

      if (debug) {
        scene.add(helper);
        scene.add(shadowCameraHelper);
      }

      return () => {
        scene.remove(helper);
        scene.remove(shadowCameraHelper);
      };
    }
  }, [scene]);

  return (
    <>
      <directionalLight
        ref={lightRef}
        castShadow
        scale={[10, 10, 10]}
        shadow-mapSize={[1024, 1024]}
        position={[30, 30, 7]}
      >
        <orthographicCamera
          attach="shadow-camera"
          scale={5}
          args={[-10, 10, 10, -10, 0.1, 100]}
        />
      </directionalLight>

      <ambientLight intensity={ambientLight} />
    </>
  );
}
