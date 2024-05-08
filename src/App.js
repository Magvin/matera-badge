
import React, { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls,Environment} from '@react-three/drei'
import { Model } from './Model'
export default function Viewer() {
  const ref = useRef()
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ fov: 20, position: [0,1,10] }}>
      <Suspense fallback={null}>
      <Environment preset="sunset"/>
          <Model />
      </Suspense>
      <OrbitControls ref={ref} />
    </Canvas>
  )
}