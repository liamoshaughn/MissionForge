import React from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export function Model(props) {
  const { nodes, materials } = useGLTF('/models/card.glb')
  
  // Adjust material properties if necessary
  const material = materials.Material;
  material.metalness = 1
  material.envMapIntensity = 1.5

  return (
      <mesh  {...props} geometry={nodes.Cube.geometry} material={material} position={[0, 0, 0]} />
  )
}

useGLTF.preload('/models/card.glb')