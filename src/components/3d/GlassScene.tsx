'use client'

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Center,
  Environment,
  MeshTransmissionMaterial,
  PointMaterial,
  Points,
  Text3D,
} from '@react-three/drei'
import * as THREE from 'three'
import { useLoading } from '../../context/LoadingContext'
import { useTheme } from '../theme-provider'

// Cached objects to avoid allocations in render loop
const TARGET_SCALE_MOBILE = new THREE.Vector3(0.55, 0.55, 0.55)
const TARGET_SCALE_DESKTOP = new THREE.Vector3(0.85, 0.85, 0.85)
const ZERO_SCALE = new THREE.Vector3(0, 0, 0)
const TARGET_COLOR_LIGHT = new THREE.Color('#ffffff') // Was #111111, now white for "cangiante"
const TARGET_COLOR_DARK = new THREE.Color('#ffffff')

function Particles({
  isDark,
}: {
  isDark: boolean
}) {
  const ref = useRef<THREE.Points>(null)
  const count = 2500

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30
    }
    return pos
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const time = state.clock.getElapsedTime()

    // Scroll interaction removed for simplicity/performance in this version
    ref.current.rotation.y = time * 0.05
    ref.current.rotation.x = time * 0.02
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff" // Always white for better visibility
        size={0.04}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={isDark ? 0.6 : 0.4} // Slightly dimmer in light mode but still visible
      />
    </Points>
  )
}

function Geometries({
  isDark,
  isLoading,
}: {
  isDark: boolean
  isLoading: boolean
}) {
  const groupRef = useRef<THREE.Group>(null)
  const xGroupRef = useRef<THREE.Group>(null)
  const { size } = useThree()
  const isMobile = size.width < 768
  // Material management
  const matRefs = useRef<Array<any>>([])

  useFrame((state) => {
    if (!groupRef.current) return

    const time = state.clock.getElapsedTime()

    // Entrance Scale - smaller on mobile
    const baseScale = isMobile ? TARGET_SCALE_MOBILE : TARGET_SCALE_DESKTOP

    // Animate scale: Stay at 0 if loading, grow to baseScale if loaded
    const targetScale = isLoading ? ZERO_SCALE : baseScale
    groupRef.current.scale.lerp(targetScale, 0.05)

    if (xGroupRef.current) {
      xGroupRef.current.rotation.y = time * 0.2
    }

    // --- MATERIAL ALCHEMY (Shared) ---
    const isActuallyDark = isDark // Closure over prop

    // Different characteristics for Light (Iridescent/Pearl) vs Dark (Clean Glass)
    const targetColor = isActuallyDark ? TARGET_COLOR_DARK : TARGET_COLOR_LIGHT
    const targetIridescence = isActuallyDark ? 0.3 : 1.0

    matRefs.current.forEach((mat) => {
      if (mat) {
        if ('iridescence' in mat) {
          mat.iridescence = THREE.MathUtils.lerp(mat.iridescence, targetIridescence, 0.1)
        }
        if ('chromaticAberration' in mat) {
          mat.chromaticAberration = THREE.MathUtils.lerp(mat.chromaticAberration, isActuallyDark ? 1.5 : 5, 0.1)
        }
        mat.color.lerp(targetColor, 0.05)
      }
    })
  })

  // ... (rest of Geometries content: commonMaterialProps, addMatRef, fontUrl, textProps, return JSX) ...

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
    backsideThickness: 1.5,
    thickness: 2,
    roughness: 0,
    transmission: 1,
    ior: 1.5,
    chromaticAberration: 0.5,
    anisotropy: 0.5,
    distortion: 0,
    distortionScale: 0.5,
    temporalDistortion: 0.5,
    color: "#ffffff",
  }

  // Registry helper
  const addMatRef = (el: any) => {
    if (el && !matRefs.current.includes(el)) {
      matRefs.current.push(el)
    }
  }

  const fontUrl = "/fonts/helvetiker_bold.typeface.json"

  const textProps = {
    font: fontUrl,
    size: 2.5,
    height: 0.4, // Slightly reduced to accommodate bevel
    curveSegments: 32, // Smoother base curve
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.08,
    bevelOffset: 0,
    bevelSegments: 10, // High segments for rounding
  }

  return (
    <group
      ref={groupRef}
      position={[0, 0, 0]}
      scale={[0, 0, 0]}
    >
      <group ref={xGroupRef} position={[0, 0, 0]}>
        <Center>
          <Text3D {...textProps}>
            X
            {isDark ? (
              <MeshTransmissionMaterial
                ref={addMatRef}
                {...commonTransmissionProps}
                resolution={512}
                samples={6}
              />
            ) : (
              <meshPhysicalMaterial
                ref={addMatRef}
                {...commonPhysicalProps}
              />
            )}
          </Text3D>
        </Center>
      </group>
    </group>
  )
}

function SceneContent() {
  const { theme } = useTheme()
  const { isLoading } = useLoading()
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const checkTheme = () => {
      if (theme === 'system') {
        setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
      } else {
        setIsDark(theme === 'dark')
      }
    }
    checkTheme()

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme === 'system') checkTheme()
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        // backgroundColor: 'red' // Removed red debug background
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 9], fov: 45 }}
        dpr={[1, 1.5]} // Optimization: Lower max DPR
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <Suspense fallback={null}>
          <Environment preset="studio" />
          <Particles isDark={isDark} />
          <Geometries isDark={isDark} isLoading={isLoading} />
          <ambientLight intensity={0.5} />

          {/* Enhanced Lighting for Iridescence */}
          <pointLight position={[2, 2, 2]} intensity={2} color="#ffffff" />
          <pointLight position={[-2, -2, 2]} intensity={1.5} color="#ffffff" />
          <pointLight position={[0, 5, 0]} intensity={1} color="#ffffff" />

          <spotLight
            position={[5, 5, 5]}
            angle={0.25}
            penumbra={1}
            intensity={2}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export function GlassScene() {
  return <SceneContent />
}
