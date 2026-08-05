import { Canvas } from '@react-three/fiber'
import { Float } from '@react-three/drei'

function HeroScene() {
  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: false, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 3]} intensity={1.6} color="#2ee6ff" />
      <directionalLight position={[-3, -2, 2]} intensity={0.8} color="#ff4fd8" />
      <Float speed={1.8} rotationIntensity={1.4} floatIntensity={1.6}>
        <mesh position={[3, 0.3, 0]} scale={0.9} rotation={[0.4, 0.4, 0]}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#2ee6ff"
            flatShading
            roughness={0.4}
            metalness={0.1}
          />
        </mesh>
      </Float>
    </Canvas>
  )
}

export default HeroScene
