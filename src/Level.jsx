import Car from "./Car";
import Ground from "./Ground";
import Tree from "./Tree";
import ColliderBox from "./ColliderBox";
import Checkpoint from "./Checkpoint";
import { useState } from "react";

const treeAmount = 64;
const minScale = 0.7;
const maxScale = 1;

const carPosition = [0, 0, 0]; // Assuming the car is at the origin for simplicity
const exclusionRadius = 15; // Define the radius of the exclusion zone around the car

const checkpointAmount = 5;
const checkpointPositions = generateCheckpointPositions(checkpointAmount);

function isPositionInExclusionZone(position) {
  // Calculate the distance from the car position
  const distance = Math.sqrt(
    Math.pow(position[0] - carPosition[0], 1.85) +
      Math.pow(position[2] - carPosition[2], 1.85)
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

function generateCheckpointPositions(amount) {
  const positions = [];
  const exclusionZone = 5; // Middle exclusion zone radius
  const mapSize = 50; // Total map size
  const safeZone = mapSize / 4; // Define a safe zone to ensure spread

  for (let i = 0; i < amount; i++) {
    let x, z, tooClose;
    do {
      tooClose = false;
      x = Math.random() * mapSize - mapSize / 2; // Generate x within -25 to 25
      z = Math.random() * mapSize - mapSize / 2; // Generate z within -25 to 25

      // Ensure it's outside the middle exclusion zone
      if (
        x > -exclusionZone &&
        x < exclusionZone &&
        z > -exclusionZone &&
        z < exclusionZone
      ) {
        tooClose = true;
        continue;
      }

      // Check against all other positions to ensure they're spread out
      for (let pos of positions) {
        const distance = Math.sqrt(
          Math.pow(x - pos[0], 2) + Math.pow(z - pos[2], 2)
        );
        if (distance < safeZone) {
          tooClose = true;
          break;
        }
      }
    } while (tooClose);

    positions.push([x, 0, z]); // Assuming y is 0 for simplicity
  }
  return positions;
}

export default function Level({ debug }) {
  const [currentCheckpoint, setCurrentCheckpoint] = useState(0);

  return (
    <>
      <Ground position={[0, -0.25, 0]} debug={debug} />
      {/* <Ramp position={[0, 0, -5]} /> */}
      <Car debug={debug} />
      {checkpointPositions.map((position, i) => (
        <Checkpoint
          key={"checkpoint-" + i}
          position={[position[0], position[1] + 0.35, position[2]]}
          debug={debug}
        />
      ))}
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
              debug={debug}
              position={[position[0], position[1] + 1, position[2]]}
              scale={[scale * 0.75, scale * 5, scale * 0.75]}
            />
          </group>
        );
      })}
    </>
  );
}
