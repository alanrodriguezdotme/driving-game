import React, { useRef, useEffect } from "react";
import { CameraHelper, DirectionalLightHelper } from "three";
import { useThree } from "@react-three/fiber";
import { useControls } from "leva";

export default function Lights({ debug = false }) {
  const lightRef = useRef();
  const { scene } = useThree();

  // const { top, bottom, left, right, near, far, posX, posY, posZ } = useControls(
  //   "Shadow Camera",
  //   {
  //     top: {
  //       value: 10,
  //       min: 1,
  //       max: 100,
  //     },
  //     bottom: {
  //       value: -10,
  //       min: -100,
  //       max: -1,
  //     },
  //     left: {
  //       value: -10,
  //       min: -100,
  //       max: -1,
  //     },
  //     right: {
  //       value: 10,
  //       min: 1,
  //       max: 100,
  //     },
  //     near: {
  //       value: 0.1,
  //       min: 0.1,
  //       max: 100,
  //     },
  //     far: {
  //       value: 100,
  //       min: 1,
  //       max: 1000,
  //     },
  //     posX: {
  //       value: 15,
  //       min: 1,
  //       max: 100,
  //     },
  //     posY: {
  //       value: 15,
  //       min: 1,
  //       max: 100,
  //     },
  //     posZ: {
  //       value: 5,
  //       min: 1,
  //       max: 100,
  //     },
  //   }
  // );

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

      <ambientLight intensity={1} />
    </>
  );
}
