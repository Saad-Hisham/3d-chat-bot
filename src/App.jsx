import { Suspense, useState } from 'react'

import { Canvas } from "@react-three/fiber"

import Robot from './models/Robot'

import Loader from '../../Loader'


import { EffectComposer, Bloom } from '@react-three/postprocessing';
import Chatbot from './Chatbot';
import ParticlesComponent from './partcles';
function App() {

  return (
    <>
      <div className="App">
        <ParticlesComponent id="particles" />
      </div>
      <div style={{ width: "100vw", height: "100vh", }} className='parent'>

        <Canvas camera={{ position: [0, 1, 3], rotation: [0, 0, 0], near: .1, far: 1000 }}>

          <Suspense fallback={<Loader />}>

            <ambientLight intensity={2} color={"#62297f"} />

            <Robot />

            <EffectComposer>

              <Bloom
              
                intensity={30}

                luminanceThreshold={0}

                luminanceSmoothing={.9}

                radius={20}
              />
            </EffectComposer>

          </Suspense>

        </Canvas>

        <Chatbot/>
      </div>
    </>
  )
}

export default App
