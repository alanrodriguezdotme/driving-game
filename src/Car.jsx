import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useEffect, useRef } from "react";
import { useBox, useRaycastVehicle } from "@react-three/cannon";
import { useWheels } from "./useWheels";
import { WheelDebug } from "./WheelDebug";
import { useKeyboardControls } from "./useKeyboardControls";
import { Vector3 } from "three";

export default function Car({ debug }) {
  let result = useLoader(GLTFLoader, "/car-chassis.glb").scene;

  const position = [0, 1, 0];
  const width = 0.8;
  const height = 0.75;
  const front = 0.9;
  const wheelRadius = 0.16;

  const chassisBodyArgs = [width, height, front * 2];
  const [chassisBody, chassisApi] = useBox(
    () => ({
      allowSleep: false,
      args: chassisBodyArgs,
      mass: 100,
      position,
    }),
    useRef(null)
  );

  const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius);

  const [vehicle, vehicleApi] = useRaycastVehicle(
    () => ({
      chassisBody,
      wheels,
      wheelInfos,
    }),
    useRef(null)
  );

  useKeyboardControls(vehicleApi, chassisApi);

  useFrame((state) => {
    let chassisPosition = new Vector3();
    chassisPosition.setFromMatrixPosition(chassisBody.current.matrixWorld);

    let cameraPosition = new Vector3();
    const x = chassisPosition.x + 100;
    const y = 100;
    const z = chassisPosition.z + 100;
    if (!debug) {
      state.camera.lookAt(chassisPosition);
      state.camera.position.lerp(cameraPosition.set(x, y, z), 0.1);
    }
  });

  useEffect(() => {
    if (!result) return;
    let mesh = result;
    mesh.scale.set(1, 1, 1);
    mesh.children[0].position.set(0, 0, 0);
  }, [result]);

  return (
    <group ref={vehicle} name="vehicle" castShadow>
      <group
        ref={chassisBody}
        name="chassisBody"
        castShadow
        scale={[0.2, 0.2, 0.2]}
      >
        <primitive object={result} position={[0, -1.3, -0.26]} castShadow />
      </group>
      {/* <mesh ref={chassisBody}>
        <meshBasicMaterial transparent opacity={0.3} />
        <boxGeometry args={chassisBodyArgs} />
      </mesh> */}
      <WheelDebug wheelRef={wheels[0]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[1]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[2]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[3]} radius={wheelRadius} />
    </group>
  );
}
