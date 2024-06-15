/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 public/models/grave.glb -o src/components/Grave.jsx -r public 
*/
import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { SCROLL_SPEED } from "../App";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";

export function Grave({player,...props}) {
  const { nodes, materials } = useGLTF('/models/grave.glb')
  const texture = useTexture(player.userPhotoUrl);
  //const fallbackTexture = useLoader(TextureLoader, "/public/img/logojimmy.png"); // Asegúrate de tener una imagen local para el fallback
  const ref = useRef();
  useFrame((_, delta) => {
    ref.current.position.z -= SCROLL_SPEED * delta;
  });

  return (
    <group {...props} dispose={null} ref={ref}>
      <mesh geometry={nodes.grave_A.geometry} material={materials.HalloweenBits} />    
      <mesh geometry={nodes.Plane.geometry} position={[0, 0, 1.406]}>
        <meshBasicMaterial map={texture} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/grave.glb')
