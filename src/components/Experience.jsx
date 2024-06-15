import { OrbitControls, Environment} from "@react-three/drei";
import { Friesman } from "./friesman";
import { Principal } from "./Principal";
import { useGame } from "../hooks/useGame";
import {
  FRIESMAN_COLUMNS,
  FRIESMAN_SPACE_COLUMNS,
  FRIESMAN_SPACE_ROW,
  GAMEBOARD_LENGTH,
  GAMEBOARD_LENGTH_HOT,
} from "../App";
import {
  HOTDOGMAN_COLUMNS,
  HOTDOGMAN_SPACE_COLUMNS,
  HOTDOGMAN_SPACE_ROW,
} from "../App";
import { Gameboard } from "./Gameboard";
import { Hotdogman } from "./Hotdogman";
import { Final } from "./Final";
import { degToRad } from "three/src/math/MathUtils";
import { Perdio } from "./Perdio";
import { Grave } from "./Grave";
import { Suspense } from "react";

export const Experience = () => {
  const { friesman, hotdogman, status } = useGame();

  return (
    <>
      <OrbitControls />
      <Environment preset="sunset" />
      <directionalLight
        position={[10, 8, 20]}
        intensity={0.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      ></directionalLight>
      <Final 
        position-y={2}
        rotation-x={degToRad(-20)}
        visible={status === "gameover"}
       // scale={[0.5, 0.5, 0.5]} // Cambia los valores según necesites
      />
      <group visible={status === "playing"}>
        <Gameboard />
        <Gameboard position-z={GAMEBOARD_LENGTH} />
        <Gameboard position-z={-GAMEBOARD_LENGTH} />
        <Gameboard />

        {friesman.map((friesman, index) => {
          const column = index % FRIESMAN_COLUMNS;
          const row = Math.floor(index / FRIESMAN_COLUMNS);
          const xPos =
            column * FRIESMAN_SPACE_COLUMNS -
            ((FRIESMAN_COLUMNS - 1) * FRIESMAN_SPACE_COLUMNS) / 2;
          return (
            <group
              key={index}
              position-z={-1 - row * FRIESMAN_SPACE_ROW}
              position-x={xPos}
            >
              {
                friesman.dead && (
                  <Suspense fallback={null}>
                    <Grave position-y={1} position-z={-0.5} player={friesman.killedBy}/>
                  </Suspense>
                )
              }
              <Friesman friesman={friesman} />
            </group>
          );
        })}

        <Gameboard />
        <Gameboard position-z={10} />
        <Gameboard position-z={6} />
        <Gameboard />

        {hotdogman.map((hotdogman, index) => {
          const column = index % HOTDOGMAN_COLUMNS;
          const row = Math.floor(index / HOTDOGMAN_COLUMNS);
          const xPos =
            column * HOTDOGMAN_SPACE_COLUMNS -
            ((HOTDOGMAN_COLUMNS - 1) * HOTDOGMAN_SPACE_COLUMNS) / 2;
          // Ajusta la posición z para que esté más atrás que las friesman
          const zPos = -6 - row * HOTDOGMAN_SPACE_ROW; // Ajusta según tus necesidades

          return (
            <group key={index} position-z={zPos} position-x={xPos}>
              {
                hotdogman.dead && (
                  <Suspense fallback={null}>
                    <Grave position-y={1} position-z={-0.5} player={hotdogman.killedBy}/>
                  </Suspense>
                )
              }
              <Hotdogman hotdogman={hotdogman} />
            </group>
          );
        })}
        <Principal position-z={6} />
      </group>
    </>
  );
};
