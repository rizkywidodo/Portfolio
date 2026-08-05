import { Canvas } from '@react-three/fiber'
import { Float } from '@react-three/drei'

type Shape = {
  geometry: 'icosahedron' | 'octahedron' | 'box'
  color: string
  position: [number, number, number]
  scale: number
  rotation: [number, number, number]
  speed: number
}

const shapes: Shape[] = [
  {
    geometry: 'icosahedron',
    color: '#2ee6ff',
    position: [2.7, 0.5, 0],
    scale: 0.7,
    rotation: [0.4, 0.4, 0],
    speed: 1.6,
  },
  {
    geometry: 'octahedron',
    color: '#ff4fd8',
    position: [3.6, -0.5, -0.4],
    scale: 0.5,
    rotation: [0.2, 0.6, 0],
    speed: 2.1,
  },
  {
    geometry: 'box',
    color: '#ffe14d',
    position: [3.2, 1.2, 0.3],
    scale: 0.35,
    rotation: [0.6, 0.4, 0.2],
    speed: 1.3,
  },
  {
    geometry: 'octahedron',
    color: '#7dffb3',
    position: [2.2, -1, 0.2],
    scale: 0.3,
    rotation: [0.1, 0.3, 0.4],
    speed: 2.4,
  },
]

function ShapeMesh({ geometry, color, position, scale, rotation, speed }: Shape) {
  return (
    <Float speed={speed} rotationIntensity={1.4} floatIntensity={1.5}>
      <mesh position={position} scale={scale} rotation={rotation}>
        {geometry === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
        {geometry === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
        {geometry === 'box' && <boxGeometry args={[1, 1, 1]} />}
        <meshStandardMaterial color={color} flatShading roughness={0.4} metalness={0.1} />
      </mesh>
    </Float>
  )
}

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
      {shapes.map((shape, i) => (
        <ShapeMesh key={i} {...shape} />
      ))}
    </Canvas>
  )
}

export default HeroScene
