import React, { useRef, useEffect } from "react";
import { CameraHelper, DirectionalLightHelper } from "three";
import { useThree } from "@react-three/fiber";

export default function Lights() {
  const lightRef = useRef();
  const { scene } = useThree();

  useEffect(() => {
    if (lightRef.current) {
      const helper = new DirectionalLightHelper(lightRef.current, 5);
      // scene.add(helper); // Add this to visualize the shadow camera frustum
      const shadowCameraHelper = new CameraHelper(
        lightRef.current.shadow.camera
      );
      // scene.add(shadowCameraHelper);

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
        position={[15, 15, 5]}
        intensity={1}
        shadow-camera-scale={3}
        shadow-camera-near={1}
        shadow-camera-far={50}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />

      <ambientLight intensity={1.5} />
    </>
  );
}
