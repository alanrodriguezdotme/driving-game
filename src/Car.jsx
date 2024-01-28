import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useEffect, useRef } from "react";
import { useBox, useRaycastVehicle } from "@react-three/cannon";
import { useWheels } from "./useWheels";
import { WheelDebug } from "./WheelDebug";
import { useControls } from "./useControls";
import { Quaternion, Vector3 } from "three";

export default function Car({}) {
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

  useControls(vehicleApi, chassisApi);

  useFrame((state) => {
    let position = new Vector3(0, 0, 0);
    position.setFromMatrixPosition(chassisBody.current.matrixWorld);
    state.camera.lookAt(position);
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
        <primitive object={result} position={[0, -1.3, -0.26]} />
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