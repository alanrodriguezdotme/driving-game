import * as THREE from "three";
import Car from "./Car";
import Ground from "./Ground";
import ColliderBox from "./ColliderBox";
import Ramp from "./Ramp";

const coneGeometry = new THREE.ConeGeometry(1, 1, 6);
const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 1, 6);

const leavesMaterial = new THREE.MeshStandardMaterial({ color: "green" });
const trunkMaterial = new THREE.MeshStandardMaterial({ color: "brown" });

const treeAmount = 64;
const minScale = 0.7;
const maxScale = 1;

const carPosition = [0, 0, 0]; // Assuming the car is at the origin for simplicity
const exclusionRadius = 15; // Define the radius of the exclusion zone around the car

function Tree({
  position = [0, 0, 0],
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
}) {
  return (
    <group position={position} scale={scale} rotation={rotation}>
      <mesh
        geometry={coneGeometry}
        material={leavesMaterial}
        position={[0, 2.5, 0]}
        scale={[1, 3, 1]}
        castShadow
      />
      <mesh
        geometry={cylinderGeometry}
        material={trunkMaterial}
        position={[0, 0.5, 0]}
        scale={[0.25, 1, 0.25]}
        castShadow
      />
    </group>
  );
}

function isPositionInExclusionZone(position) {
  // Calculate the distance from the car position
  const distance = Math.sqrt(
    Math.pow(position[0] - carPosition[0], 2) +
      Math.pow(position[2] - carPosition[2], 2)
  );
  return distance < exclusionRadius;
}

function generateTreePosition() {
  let position;
  do {
    position = [Math.random() * 75 - 35, -0.25, Math.random() * 75 - 35];
  } while (isPositionInExclusionZone(position));
  return position;
}

export default function Level() {
  return (
    <>
      <Ground position={[0, -0.25, 0]} />
      {/* <Ramp position={[0, 0, -5]} /> */}
      <Car />
      {[...Array(treeAmount)].map((_, i) => {
        const scale = Math.random() * (maxScale - minScale) + minScale;
        const position = generateTreePosition();
        return (
          <group key={"tree-" + i}>
            <Tree
              position={position}
              scale={[scale, scale, scale]}
              rotation={[0, Math.random() * Math.PI * 2, 0]}
            />
            <ColliderBox
              position={[position[0], position[1] + 1, position[2]]}
              scale={[scale * 0.75, scale * 5, scale * 0.75]}
            />
          </group>
        );
      })}
    </>
  );
}
