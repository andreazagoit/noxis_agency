import { Suspense, useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from '../theme-provider'

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
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(true)
  }, [])

  const vec = useMemo(() => new THREE.Vector3(), [])

  useFrame((_state, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += rotationSpeed
    meshRef.current.rotation.y += rotationSpeed * 1.5

    // Smooth entrance scale
    const targetScale = active ? 1 : 0
    // Optimization: Reuse vector properly
    vec.set(targetScale, targetScale, targetScale)
    meshRef.current.scale.lerp(vec, delta * 2.5)
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
      <mesh ref={meshRef} scale={0}>
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
  const { theme } = useTheme()
  const isDark = theme === 'system'
    ? (typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : true)
    : theme === 'dark'

  const meshRef = useRef<THREE.Mesh>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(true)
  }, [])

  const vec = useMemo(() => new THREE.Vector3(), [])

  useFrame((_state, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += rotationSpeed
    meshRef.current.rotation.y += rotationSpeed * 1.5

    // Smooth entrance scale
    const targetScale = active ? 1.2 : 0
    // Optimization: Reuse vector properly
    vec.set(targetScale, targetScale, targetScale)
    meshRef.current.scale.lerp(vec, delta * 2.5)
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

  const commonPhysicalProps = {
    roughness: 0.05,
    metalness: 0.05,
    reflectivity: 1,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    iridescence: 1,
    iridescenceIOR: 1.8,
    iridescenceThicknessRange: [200, 800] as [number, number],
    sheen: 0.5,
    sheenRoughness: 0.2,
    sheenColor: new THREE.Color("#ffffff"),
    color: "#ffffff",
  }

  const commonTransmissionProps = {
    backside: true,
    backsideThickness: 1,
    thickness: 1,
    roughness: 0,
    transmission: 1,
    ior: 1.5,
    chromaticAberration: 0.3,
    anisotropy: 0.1,
    distortion: 0,
    distortionScale: 0.3,
    color: "#ffffff",
  }

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={0}>
        {getGeometry()}
        {isDark ? (
          <MeshTransmissionMaterial
            {...commonTransmissionProps}
            resolution={256}
            samples={4}
          />
        ) : (
          <meshPhysicalMaterial
            {...commonPhysicalProps}
          />
        )}
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
        dpr={[1, 1.2]} // Optimization: Lower max DPR for small elements
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <group position={position}>
            {useGlass ? (
              <>
                <Environment preset="studio" />
                <GlassShape geometry={geometry} />
                <ambientLight intensity={0.5} />
                {/* Closer lighting for iridescence reflections */}
                <pointLight position={[2, 2, 2]} intensity={2} />
                <pointLight position={[-2, -2, 2]} intensity={1} />
                <spotLight
                  position={[5, 5, 5]}
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
