import { Canvas } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'

function HeroScene() {
  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 3, 3]} intensity={1.4} />
      <Float speed={1.6} rotationIntensity={0.7} floatIntensity={1.3}>
        <mesh position={[3, 0.3, 0]} scale={0.8}>
          <icosahedronGeometry args={[1, 4]} />
          <MeshDistortMaterial
            color="#aa3bff"
            distort={0.35}
            speed={2}
            roughness={0.15}
            metalness={0.4}
          />
        </mesh>
      </Float>
    </Canvas>
  )
}

export default HeroScene
