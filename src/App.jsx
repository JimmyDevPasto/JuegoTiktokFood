import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { GameProvider } from "./hooks/useGame";
import { UI } from "./components/UI";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

export const DEBBUG_MODE = true;

export const FRIESMAN_COLUMNS =4;
export const FRIESMAN_SPACE_COLUMNS =2.5;
export const FRIESMAN_SPACE_ROW=4;
export const HOTDOGMAN_COLUMNS =4;
export const HOTDOGMAN_SPACE_COLUMNS =2.5;
export const HOTDOGMAN_SPACE_ROW=4;
export const SCROLL_SPEED= 10;
export const GAMEBOARD_LENGTH=56;   
export const GAMEBOARD_LENGTH_HOT=4;   

function App() {
  return (
    <GameProvider>      
      <Canvas shadows camera={{ position: [0, 8, 12], fov: 90 }}>
        <color attach="background" args={["#333"]} />
         <fog attach="fog" args={["#333", 14, 35]} /> 
        <Experience />
        <EffectComposer>
           <Bloom mipmapBlur intensity={1.2} luminanceThreshold={1} />
        </EffectComposer> 
      </Canvas>
      <UI/>
    </GameProvider>
  );
}

export default App;
