/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 public/models/gameboard2.glb -o src/components/Gameboard.jsx -r public 
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { SCROLL_SPEED,GAMEBOARD_LENGTH } from '../App';

export function Gameboard(props) {
  const { nodes, materials } = useGLTF('/models/gameboard2.glb');
  const ref=useRef();

  useFrame((_,delta)=>{
      ref.current.position.z-= SCROLL_SPEED * delta;
      if (ref.current.position.z < -2 * GAMEBOARD_LENGTH) {
          ref.current.position.z=GAMEBOARD_LENGTH;
      }
  })

  return (
    <group {...props} dispose={null} ref={ref}>
      <mesh castShadow receiveShadow geometry={nodes.bone_A.geometry} material={materials.HalloweenBits} position={[5.502, 0, -5.028]} />
      <mesh castShadow receiveShadow geometry={nodes.floor_dirt.geometry} material={materials['HalloweenBits.001']} position={[-14.412, -0.251, 26.778]} />
      <mesh castShadow receiveShadow geometry={nodes.food_ingredient_ham.geometry} material={materials.restaurant} position={[-9.05, 1.311, 11.303]} rotation={[-0.633, -0.537, -0.888]} scale={2.854} />
      <mesh castShadow receiveShadow geometry={nodes.food_burger.geometry} material={materials['restaurant.001']} position={[9.398, 0.627, -10.932]} scale={2.827} />
      <mesh castShadow receiveShadow geometry={nodes.floor_kitchen.geometry} material={materials['restaurant.002']} position={[-13.882, -0.063, -26.757]} />
      <mesh castShadow receiveShadow geometry={nodes.wall_window_closed.geometry} material={materials['restaurant.030']} position={[11.324, -0.266, -1.585]} rotation={[Math.PI, -1.458, Math.PI]} />
      <mesh castShadow receiveShadow geometry={nodes.food_ingredient_bun_bottom.geometry} material={materials['restaurant.031']} position={[5.349, -1.907, 15.955]} scale={2.5} />
      <mesh castShadow receiveShadow geometry={nodes.food_ingredient_bun_top.geometry} material={materials['restaurant.032']} position={[10.424, -0.279, -2.202]} scale={2.864} />
      <mesh castShadow receiveShadow geometry={nodes.food_ingredient_carrot.geometry} material={materials['restaurant.036']} position={[12.344, 2.763, 22.72]} scale={5.388} />
      <mesh castShadow receiveShadow geometry={nodes.food_ingredient_carrot_chopped.geometry} material={materials['restaurant.037']} position={[-8.614, -0.053, 15.804]} scale={4.813} />
      <mesh castShadow receiveShadow geometry={nodes.food_ingredient_cheese.geometry} material={materials['restaurant.039']} position={[-10.89, 0.378, 20.31]} scale={4.073} />
      <mesh castShadow receiveShadow geometry={nodes.food_ingredient_cheese_chopped.geometry} material={materials['restaurant.040']} position={[-7.27, 2.931, -17.901]} scale={3.985} />
      <mesh castShadow receiveShadow geometry={nodes.food_ingredient_lettuce.geometry} material={materials['restaurant.045']} position={[-12.568, 1.618, 11.104]} scale={2.687} />
      <mesh castShadow receiveShadow geometry={nodes.food_ingredient_lettuce_chopped.geometry} material={materials['restaurant.046']} position={[12.362, -0.238, 1.466]} scale={2.683} />
      <mesh castShadow receiveShadow geometry={nodes.food_ingredient_onion.geometry} material={materials['restaurant.048']} position={[13.982, -0.328, 10.275]} scale={3.302} />
      <mesh castShadow receiveShadow geometry={nodes.food_ingredient_onion_chopped.geometry} material={materials['restaurant.049']} position={[11.476, -0.658, 22.123]} scale={4.665} />
      <mesh castShadow receiveShadow geometry={nodes.food_ingredient_onion_rings.geometry} material={materials['restaurant.050']} position={[-11.682, 1.099, -8.469]} scale={-8.207} />
      <mesh castShadow receiveShadow geometry={nodes.table_round_A_decorated.geometry} material={materials['restaurant.051']} position={[-8.713, 0.595, 7.053]} scale={1.284} />
      <mesh castShadow receiveShadow geometry={nodes.table_round_A_small.geometry} material={materials['restaurant.052']} position={[7.976, 0.941, -0.978]} />
      <mesh castShadow receiveShadow geometry={nodes.table_round_A_small_decorated.geometry} material={materials['restaurant.053']} position={[-14.34, 0.306, -2.966]} />
      <mesh castShadow receiveShadow geometry={nodes.table_round_B.geometry} material={materials['restaurant.054']} position={[9.741, 0.213, -6.535]} />
      <mesh castShadow receiveShadow geometry={nodes.wall.geometry} material={materials['restaurant.056']} position={[-10.72, 0.439, -19.973]} />
      <mesh castShadow receiveShadow geometry={nodes.wall_decorated.geometry} material={materials['restaurant.057']} position={[9.819, -0.288, 16.969]} />
      <mesh castShadow receiveShadow geometry={nodes.wall_doorway.geometry} material={materials['restaurant.058']} position={[11.91, 0.094, 12.494]} />
      <mesh castShadow receiveShadow geometry={nodes.wall_half.geometry} material={materials['restaurant.059']} position={[7.993, -1.635, -14.111]} />
      <mesh castShadow receiveShadow geometry={nodes.wall_orderwindow.geometry} material={materials['restaurant.060']} position={[-13.552, 0.17, 22.976]} />
      <mesh castShadow receiveShadow geometry={nodes.wall_orderwindow_decorated.geometry} material={materials['restaurant.061']} position={[9.5, -0.696, -26.282]} />
      <mesh castShadow receiveShadow geometry={nodes.wall_window_closed001.geometry} material={materials['restaurant.062']} position={[14.084, 0.197, -7.924]} />
      <mesh castShadow receiveShadow geometry={nodes.wall_window_open.geometry} material={materials['restaurant.063']} position={[-11.265, 0.403, -14.166]} />
      <mesh castShadow receiveShadow geometry={nodes.fridge_A.geometry} material={materials['restaurant.064']} position={[-12.1, -0.021, 2.526]}>
        <mesh castShadow receiveShadow geometry={nodes.fridge_A_door_bottom.geometry} material={materials['restaurant.064']} position={[0.85, 0.8, 0.5]} />
        <mesh castShadow receiveShadow geometry={nodes.fridge_A_door_top.geometry} material={materials['restaurant.064']} position={[0.85, 1.9, 0.5]} />
      </mesh>
      <mesh castShadow receiveShadow geometry={nodes.fridge_A_decorated.geometry} material={materials['restaurant.065']} position={[13.072, 0.204, -13.15]}>
        <mesh castShadow receiveShadow geometry={nodes.fridge_A_decorated_door_top.geometry} material={materials['restaurant.065']} position={[0.412, 0.111, -6.019]} />
      </mesh>
      <mesh castShadow receiveShadow geometry={nodes.fridge_B.geometry} material={materials['restaurant.066']} position={[10.877, -1.04, 19.345]}>
        <mesh castShadow receiveShadow geometry={nodes.fridge_B_door.geometry} material={materials['restaurant.066']} position={[5.094, 2.579, 7.043]} />
      </mesh>
      <mesh castShadow receiveShadow geometry={nodes.crate_lettuce.geometry} material={materials['restaurant.083']} position={[7.307, 0.509, -18.949]} />
      <mesh castShadow receiveShadow geometry={nodes.crate_potatoes.geometry} material={materials['restaurant.084']} position={[10.232, -0.299, 8.926]} />
      <mesh castShadow receiveShadow geometry={nodes.crate_tomatoes.geometry} material={materials['restaurant.085']} position={[-8.183, 1.031, 1.028]} />
      <mesh castShadow receiveShadow geometry={nodes.floor_kitchen001.geometry} material={materials['restaurant.003']} position={[-13.946, -0.103, -22.732]} />
      <mesh castShadow receiveShadow geometry={nodes.floor_kitchen002.geometry} material={materials['restaurant.004']} position={[-14.067, -0.153, -18.512]} />
      <mesh castShadow receiveShadow geometry={nodes.floor_kitchen003.geometry} material={materials['restaurant.005']} position={[-14.176, -0.244, -14.487]} />
      <mesh castShadow receiveShadow geometry={nodes.floor_kitchen004.geometry} material={materials['restaurant.006']} position={[-14.133, -0.06, -10.38]} />
      <mesh castShadow receiveShadow geometry={nodes.floor_kitchen005.geometry} material={materials['restaurant.007']} position={[-14.23, -0.219, -6.261]} />
      <mesh castShadow receiveShadow geometry={nodes.floor_kitchen006.geometry} material={materials['restaurant.008']} position={[-14.726, -0.091, 18.211]} />
      <mesh castShadow receiveShadow geometry={nodes.floor_kitchen007.geometry} material={materials['restaurant.009']} position={[-14.794, -0.126, 14.168]} />
      <mesh castShadow receiveShadow geometry={nodes.floor_kitchen008.geometry} material={materials['restaurant.010']} position={[-14.661, -0.172, 10.124]} />
      <mesh castShadow receiveShadow geometry={nodes.floor_kitchen009.geometry} material={materials['restaurant.011']} position={[-14.36, -0.218, 6.092]} />
      <mesh castShadow receiveShadow geometry={nodes.floor_kitchen010.geometry} material={materials['restaurant.012']} position={[-14.33, -0.244, 2.124]} />
      <mesh castShadow receiveShadow geometry={nodes.floor_kitchen011.geometry} material={materials['restaurant.013']} position={[-14.289, -0.274, -2.081]} />
      <mesh castShadow receiveShadow geometry={nodes.floor_kitchen012.geometry} material={materials['restaurant.014']} position={[-14.669, -0.308, 22.423]} />
      <mesh castShadow receiveShadow geometry={nodes.floor_kitchen013.geometry} material={materials['restaurant.015']} position={[-14.657, -0.315, 26.506]} />
      <mesh castShadow receiveShadow geometry={nodes.floor_kitchen014.geometry} material={materials['restaurant.016']} position={[14.253, -0.127, 26.426]} />
      <mesh castShadow receiveShadow geometry={nodes.floor_kitchen015.geometry} material={materials['restaurant.017']} position={[14.161, -0.071, 22.356]} />
      <mesh castShadow receiveShadow geometry={nodes.floor_kitchen016.geometry} material={materials['restaurant.018']} position={[14.481, -0.463, -2.077]} />
      <mesh castShadow receiveShadow geometry={nodes.floor_kitchen017.geometry} material={materials['restaurant.019']} position={[14.44, -0.433, 2.128]} />
      <mesh castShadow receiveShadow geometry={nodes.floor_kitchen018.geometry} material={materials['restaurant.020']} position={[14.41, -0.407, 6.096]} />
      <mesh castShadow receiveShadow geometry={nodes.floor_kitchen019.geometry} material={materials['restaurant.021']} position={[14.109, -0.361, 10.128]} />
      <mesh castShadow receiveShadow geometry={nodes.floor_kitchen020.geometry} material={materials['restaurant.022']} position={[13.976, -0.315, 14.172]} />
      <mesh castShadow receiveShadow geometry={nodes.floor_kitchen021.geometry} material={materials['restaurant.023']} position={[14.044, -0.28, 18.215]} />
      <mesh castShadow receiveShadow geometry={nodes.floor_kitchen022.geometry} material={materials['restaurant.024']} position={[14.54, -0.408, -6.257]} />
      <mesh castShadow receiveShadow geometry={nodes.floor_kitchen023.geometry} material={materials['restaurant.025']} position={[14.637, -0.249, -10.376]} />
      <mesh castShadow receiveShadow geometry={nodes.floor_kitchen024.geometry} material={materials['restaurant.026']} position={[14.594, -0.433, -14.483]} />
      <mesh castShadow receiveShadow geometry={nodes.floor_kitchen025.geometry} material={materials['restaurant.027']} position={[14.703, -0.342, -18.508]} />
      <mesh castShadow receiveShadow geometry={nodes.floor_kitchen026.geometry} material={materials['restaurant.028']} position={[14.825, -0.292, -22.728]} />
      <mesh castShadow receiveShadow geometry={nodes.floor_kitchen027.geometry} material={materials['restaurant.029']} position={[14.888, -0.252, -26.753]} />
      <mesh castShadow receiveShadow geometry={nodes.table_round_A_decorated001.geometry} material={materials['restaurant.079']} position={[8.853, -0.293, 14.647]} scale={1.284} />
      <mesh castShadow receiveShadow geometry={nodes.table_round_B001.geometry} material={materials['restaurant.080']} position={[-7.46, 2.214, -8.543]} />
      <mesh castShadow receiveShadow geometry={nodes.food_ingredient_carrot001.geometry} material={materials['restaurant.081']} position={[9.537, 2.214, -23.171]} scale={5.388} />
      <mesh castShadow receiveShadow geometry={nodes.food_ingredient_carrot002.geometry} material={materials['restaurant.082']} position={[-9.383, 2.769, -25.221]} scale={5.388} />
      <mesh castShadow receiveShadow geometry={nodes.crate_potatoes001.geometry} material={materials['restaurant.086']} position={[8.556, 0.548, -16.719]} />
      <mesh castShadow receiveShadow geometry={nodes.crate_tomatoes001.geometry} material={materials['restaurant.087']} position={[9.754, 0.875, -19.468]} />
      <mesh castShadow receiveShadow geometry={nodes.crate_potatoes002.geometry} material={materials['restaurant.088']} position={[9.681, -0.286, 5.627]} />
      <mesh castShadow receiveShadow geometry={nodes.crate_potatoes003.geometry} material={materials['restaurant.089']} position={[8.634, -0.138, 7.743]} />
    </group>
  )
}

useGLTF.preload('/models/gameboard2.glb')
