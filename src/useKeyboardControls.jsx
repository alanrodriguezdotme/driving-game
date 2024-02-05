import { useEffect, useState } from "react";

const debug = false;

const forwardForce = 120;
const backwardForce = -200;

export const useKeyboardControls = (vehicleApi, chassisApi) => {
  let [controls, setControls] = useState({});

  useEffect(() => {
    const keyDownPressHandler = (e) => {
      setControls((controls) => ({ ...controls, [e.key.toLowerCase()]: true }));
    };

    const keyUpPressHandler = (e) => {
      setControls((controls) => ({
        ...controls,
        [e.key.toLowerCase()]: false,
      }));
    };

    window.addEventListener("keydown", keyDownPressHandler);
    window.addEventListener("keyup", keyUpPressHandler);
    return () => {
      window.removeEventListener("keydown", keyDownPressHandler);
      window.removeEventListener("keyup", keyUpPressHandler);
    };
  }, []);

  useEffect(() => {
    // control forward/backward acceleration
    if (controls.w) {
      vehicleApi.applyEngineForce(forwardForce, 2);
      vehicleApi.applyEngineForce(forwardForce, 3);
    } else if (controls.s) {
      vehicleApi.applyEngineForce(backwardForce, 2);
      vehicleApi.applyEngineForce(backwardForce, 3);
    } else {
      vehicleApi.applyEngineForce(0, 2);
      vehicleApi.applyEngineForce(0, 3);
    }

    // control left/right steering
    if (controls.a) {
      vehicleApi.setSteeringValue(0.35, 0);
      vehicleApi.setSteeringValue(0.35, 1);
      vehicleApi.setSteeringValue(-0.1, 2);
      vehicleApi.setSteeringValue(-0.1, 3);
    } else if (controls.d) {
      vehicleApi.setSteeringValue(-0.35, 0);
      vehicleApi.setSteeringValue(-0.35, 1);
      vehicleApi.setSteeringValue(0.1, 2);
      vehicleApi.setSteeringValue(0.1, 3);
    } else {
      for (let i = 0; i < 4; i++) {
        vehicleApi.setSteeringValue(0, i);
      }
    }

    // control tilting
    if (controls.arrowdown)
      chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, +2]);
    if (controls.arrowup) chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, -2]);
    if (controls.arrowleft)
      chassisApi.applyLocalImpulse([0, -5, 0], [-2, 0, 0]);
    if (controls.arrowright)
      chassisApi.applyLocalImpulse([0, -5, 0], [+2, 0, 0]);

    // reset position
    if (debug && controls.r) {
      // chassisApi.position.set(0, 1, 0);
      chassisApi.velocity.set(0, 0, 0);
      chassisApi.angularVelocity.set(0, 0, 0);
      chassisApi.rotation.set(0, 0, 0);
    }

    const brakePower = 3.5;
    if (controls[" "]) {
      vehicleApi.setBrake(brakePower, 0);
      vehicleApi.setBrake(brakePower, 1);
    } else {
      vehicleApi.setBrake(0, 0);
      vehicleApi.setBrake(0, 1);
    }
  }, [controls, vehicleApi, chassisApi]);

  return useKeyboardControls;
};
