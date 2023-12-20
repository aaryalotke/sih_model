import { meshBounds, useGLTF } from '@react-three/drei'
import React from 'react'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import Model from '../assets/3d/dark_skys.glb'

const Sky = ({isRotating}) => {
  const sky = useGLTF(Model);
  // const sky = useGLTF(skyScene);
  const skyRef = useRef();

  useFrame((_, delta)=>{
    if(isRotating){
      skyRef.current.rotation.y += 0.10 * delta;
    }
  })
  return (
    <mesh ref={skyRef}>
      <primitive object={sky.scene}/>
    </mesh>
  )
}

export default Sky