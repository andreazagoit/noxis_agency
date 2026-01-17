import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, MeshTransmissionMaterial } from '@react-three/drei'
import type * as THREE from 'three'

type GeometryType =
  | 'icosahedron'
  | 'octahedron'
  | 'torus'
  | 'torusKnot'
  | 'dodecahedron'

interface WireframeShapeProps {
  geometry: GeometryType
  color?: string
  rotationSpeed?: number
}

function WireframeShape({
  geometry,
  color = '#ffffff',
  rotationSpeed = 0.003,
}: WireframeShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += rotationSpeed
    meshRef.current.rotation.y += rotationSpeed * 1.5
  })

  const getGeometry = () => {
    switch (geometry) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1, 0]} />
      case 'octahedron':
        return <octahedronGeometry args={[1, 0]} />
      case 'torus':
        return <torusGeometry args={[0.7, 0.3, 16, 32]} />
      case 'torusKnot':
        return <torusKnotGeometry args={[0.6, 0.2, 64, 8]} />
      case 'dodecahedron':
        return <dodecahedronGeometry args={[1, 0]} />
      default:
        return <icosahedronGeometry args={[1, 0]} />
    }
  }

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh ref={meshRef}>
        {getGeometry()}
        <meshBasicMaterial color={color} wireframe transparent opacity={0.15} />
      </mesh>
    </Float>
  )
}

// Glass material version for accent cards
function GlassShape({
  geometry,
  rotationSpeed = 0.003,
}: {
  geometry: GeometryType
  rotationSpeed?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += rotationSpeed
    meshRef.current.rotation.y += rotationSpeed * 1.5
  })

  const getGeometry = () => {
    switch (geometry) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1, 0]} />
      case 'octahedron':
        return <octahedronGeometry args={[1, 0]} />
      case 'torus':
        return <torusGeometry args={[0.7, 0.3, 16, 32]} />
      case 'torusKnot':
        return <torusKnotGeometry args={[0.6, 0.2, 64, 8]} />
      case 'dodecahedron':
        return <dodecahedronGeometry args={[1, 0]} />
      default:
        return <icosahedronGeometry args={[1, 0]} />
    }
  }

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={1.2}>
        {getGeometry()}
        <MeshTransmissionMaterial
          backside
          backsideThickness={1}
          thickness={1}
          roughness={0}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.3}
          anisotropy={0.3}
          distortion={0}
          distortionScale={0.3}
          color="#ffffff"
        />
      </mesh>
    </Float>
  )
}

interface BentoWireframeProps {
  geometry: GeometryType
  className?: string
  accentColor?: boolean
  useGlass?: boolean
  position?: [number, number, number]
}

export function BentoWireframe({
  geometry,
  className = '',
  accentColor = false,
  useGlass = false,
  position = [0, 0, 0],
}: BentoWireframeProps) {
  const wireColor = accentColor ? '#ffffff' : '#888888'

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <group position={position}>
            {useGlass ? (
              <>
                <Environment preset="studio" />
                <GlassShape geometry={geometry} />
                <ambientLight intensity={0.5} />
                <spotLight
                  position={[10, 10, 10]}
                  angle={0.15}
                  penumbra={1}
                  intensity={1}
                />
              </>
            ) : (
              <>
                <WireframeShape geometry={geometry} color={wireColor} />
                <ambientLight intensity={1} />
              </>
            )}
          </group>
        </Suspense>
      </Canvas>
    </div>
  )
}
