/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 public/models/hotdogman.glb -o src/components/Hotdogman.jsx -r public 
*/
import React, { useRef, useEffect, useMemo } from 'react'
import { Billboard, Text, useAnimations, useGLTF } from "@react-three/drei";
import { SkeletonUtils } from 'three-stdlib';
import { useGraph } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import { lerp } from "three/src/math/MathUtils";

export function Hotdogman({hotdogman,...props}) {
  const group = useRef()
  const { scene, materials, animations } = useGLTF('/models/hotdogman.glb')
  // Skinned meshes cannot be re-used in threejs withoyt cling them 
  const clone= useMemo(()=>SkeletonUtils.clone(scene),[scene]); 
  // useGraph creates two flat object collections for nodes and meterials
  const {nodes} = useGraph(clone); 
  const { actions } = useAnimations(animations, group)

  useEffect(()=>{
    actions["Run"].time= Math.random()* actions["Run"].getClip().duration; 
    actions["Run"].play(); 
  },[])

  useFrame((_, delta)=>{
      if(hotdogman.dead){
          group.current.position.z= -40;
      }else{
        group.current.position.z= lerp(group.current.position.z,0,delta *2)
      }
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <Billboard position-y={6}>
        <Text fontSize={0.42} font="fonts/PixelifySans-Regular.ttf">
          {hotdogman.name}
          <meshStandardMaterial
            color="orange"            
          />
        </Text>
      </Billboard>      
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh name="mesh_char_88" geometry={nodes.mesh_char_88.geometry} material={materials._087_HotDog} skeleton={nodes.mesh_char_88.skeleton} morphTargetDictionary={nodes.mesh_char_88.morphTargetDictionary} morphTargetInfluences={nodes.mesh_char_88.morphTargetInfluences} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/hotdogman.glb')