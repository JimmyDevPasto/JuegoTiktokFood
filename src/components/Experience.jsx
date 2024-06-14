import { OrbitControls, Environment } from "@react-three/drei";
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
export const Experience = () => {
  const { friesman, hotdogman, status } = useGame();

  return (
    <>
      <OrbitControls />
      <Environment preset="sunset" />
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
              <Hotdogman hotdogman={hotdogman} />
            </group>
          );
        })}
        <Principal position-z={6} />
      </group>
    </>
  );
};
