import Car from "./Car";
import Ground from "./Ground";
import Tree from "./Tree";
import ColliderBox from "./ColliderBox";
import Checkpoint from "./Checkpoint";
import { useEffect, useState } from "react";

const treeAmount = 80;
const minScale = 0.7;
const maxScale = 1;

const carPosition = [0, 0, 0]; // Assuming the car is at the origin for simplicity
const exclusionRadius = 15; // Define the radius of the exclusion zone around the car

const checkpointAmount = 5;
const checkpointPositions = generateCheckpointPositions(checkpointAmount);

function isPositionInExclusionZone(position) {
  // Calculate the distance from the car position
  const distance = Math.sqrt(
    Math.pow(position[0] - carPosition[0], 2) +
      Math.pow(position[2] - carPosition[2], 2)
  );
  return distance < exclusionRadius;
}

function generateTree() {
  const outer = 90;
  const inner = 45;

  let position;
  do {
    position = [
      Math.random() * outer - inner,
      -0.25,
      Math.random() * outer - inner,
    ];
  } while (isPositionInExclusionZone(position));

  const scale = Math.random() * (maxScale - minScale) + minScale;
  const rotation = [0, Math.random() * Math.PI * 2, 0];

  return { position, scale, rotation };
}
const treePositions = [...Array(treeAmount)].map(generateTree);

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
  const [currentCheckpoint, setCurrentCheckpoint] = useState(1);
  const [checkpoints, setCheckpoints] = useState([checkpointPositions[0]]);

  useEffect(() => {
    setCheckpoints(checkpointPositions.slice(0, currentCheckpoint));
  }, [currentCheckpoint]);

  const handleCollide = (number) => {
    if (
      number === currentCheckpoint &&
      checkpoints.length <= checkpointAmount
    ) {
      setCurrentCheckpoint(number + 1);
    }
  };

  return (
    <>
      <Ground position={[0, -0.25, 0]} debug={debug} />
      <Car
        debug={debug}
        currentCheckpointPosition={checkpoints[currentCheckpoint - 1]}
      />
      {checkpoints.map((cp, i) => (
        <Checkpoint
          key={"checkpoint-" + i}
          position={[cp[0], cp[1] + 0.7, cp[2]]}
          debug={debug}
          number={i + 1}
          currentCheckpoint={currentCheckpoint}
          onCollide={handleCollide}
        />
      ))}
      {treePositions.map((tree, i) => {
        return (
          <group key={"tree-" + i}>
            <Tree
              position={tree.position}
              scale={tree.scale}
              rotation={tree.rotation}
              debug={debug}
            />
            <ColliderBox
              debug={debug}
              position={[
                tree.position[0],
                tree.position[1] + 1,
                tree.position[2],
              ]}
              scale={[tree.scale * 0.75, tree.scale * 5, tree.scale * 0.75]}
            />
          </group>
        );
      })}
    </>
  );
}
