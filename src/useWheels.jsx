import { useCompoundBody } from "@react-three/cannon";
import { useRef } from "react";

export const useWheels = (width, height, front, radius) => {
  const wheels = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const wheelInfo = {
    radius,
    directionLocal: [0, -1, 0], // same as Physics gravity
    axleLocal: [1, 0, 0], // wheel rotates around X-axis
    suspensionStiffness: 60,
    suspensionRestLength: 0.1,
    frictionSlip: 5,
    dampingRelaxation: 2.3,
    dampingCompression: 4.4,
    maxSuspensionForce: 100000,
    rollInfluence: 0.01,
    maxSuspensionTravel: 0.1,
    customSlidingRotationalSpeed: -30,
    useCustomSlidingRotationalSpeed: true,
  };

  const wheelYPos = -height / 3.7;
  const frontWheelXPos = -front / 1.55;
  const rearWheelXPos = front / 1.47;

  const wheelInfos = [
    {
      ...wheelInfo,
      isFrontWheel: true,
      chassisConnectionPointLocal: [-width / 2, wheelYPos, frontWheelXPos],
    },
    {
      ...wheelInfo,
      isFrontWheel: true,
      chassisConnectionPointLocal: [width / 2, wheelYPos, frontWheelXPos],
    },
    {
      ...wheelInfo,
      isFrontWheel: false,
      chassisConnectionPointLocal: [-width / 2, wheelYPos, rearWheelXPos],
    },
    {
      ...wheelInfo,
      isFrontWheel: false,
      chassisConnectionPointLocal: [width / 2, wheelYPos, rearWheelXPos],
    },
  ];

  const propsFunc = () => ({
    collisionFilterGroup: 0,
    mass: 1,
    shapes: [
      {
        args: [wheelInfo.radius, wheelInfo.radius, 0.1, 16],
        rotation: [0, 0, -Math.PI / 2],
        type: "Cylinder",
      },
    ],
    type: "Kinematic",
  });

  useCompoundBody(propsFunc, wheels[0]);
  useCompoundBody(propsFunc, wheels[1]);
  useCompoundBody(propsFunc, wheels[2]);
  useCompoundBody(propsFunc, wheels[3]);

  return [wheels, wheelInfos];
};
