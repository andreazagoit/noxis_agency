'use client'

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Environment,
  MeshTransmissionMaterial,
  PointMaterial,
  Points,
} from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from '../theme-provider'

// Cached objects to avoid allocations in render loop
const TARGET_SCALE = new THREE.Vector3(0.85, 0.85, 0.85)
const TARGET_COLOR_LIGHT = new THREE.Color('#111111')
const TARGET_COLOR_DARK = new THREE.Color('#ffffff')

function Particles({
  isDark,
  scrollYProgress,
}: {
  isDark: boolean
  scrollYProgress: any
}) {
  const ref = useRef<THREE.Points>(null)
  const count = 5000

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
    // Get scroll progress (0 to 1)
    const progress = scrollYProgress ? scrollYProgress.get() : 0

    // Increase turbulence based on scroll
    // Base speed + scroll speed boost (reduced sensitivity to 0.02 as requested)
    const rotationSpeedY = 0.02 + progress * 0.02
    const rotationSpeedX = 0.01 + progress * 0.01

    ref.current.rotation.y = time * rotationSpeedY
    ref.current.rotation.x = time * rotationSpeedX
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={isDark ? '#ffffff' : '#111111'}
        size={0.04}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

function Geometries({
  isDark,
  scrollYProgress,
}: {
  isDark: boolean
  scrollYProgress: any
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<any>(null)
  const [hovered, setHovered] = useState(false)

  // Using ref to store latest scroll value to avoid re-renders if possible, or just direct access
  // But since we are inside Canvas, we need to bridge the value.
  // Actually, passing the MotionValue directly is fine if we read it in useFrame? No, useFrame is Three loop.
  // Better to use state or ref updated by the spring.

  // Simpler approach: We can't easily perform "useTransform" inside useFrame unless we access the .get() method of the motion value.

  useFrame(() => {
    if (!meshRef.current) return

    // Get current scroll value (0 to 1 approx)
    const progress = scrollYProgress ? scrollYProgress.get() : 0

    // Constant rotation
    meshRef.current.rotation.x += 0.002
    meshRef.current.rotation.y += 0.005

    // Smooth entrance for scale only (to reach base scale)
    meshRef.current.scale.lerp(TARGET_SCALE, 0.05)

    // MATERIAL PHYSICS ANIMATION (Alchemy Effect)
    if (materialRef.current) {
      // Chromatic Aberration: 0.5 (base) -> 1.5 (high energy)
      // Increases significantly with scroll
      const targetAberration = hovered
        ? 2
        : THREE.MathUtils.lerp(0.5, 1.5, progress)

      // Distortion: 0 (clean) -> 0.8 (liquid/warped)
      // Becomes more "fluid" deep in the page
      const targetDistortion = hovered
        ? 0.5
        : THREE.MathUtils.lerp(0, 0.8, progress)

      // Apply lerps for smooth transition
      materialRef.current.chromaticAberration = THREE.MathUtils.lerp(
        materialRef.current.chromaticAberration,
        targetAberration,
        0.1,
      )
      materialRef.current.distortion = THREE.MathUtils.lerp(
        materialRef.current.distortion,
        targetDistortion,
        0.1,
      )

      // Color animation (Theme switch)
      const targetColor = isDark ? TARGET_COLOR_DARK : TARGET_COLOR_LIGHT
      materialRef.current.color.lerp(targetColor, 0.05)
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]} // KEEP FIXED CENTER
      scale={[0, 0, 0]} // Initial 0 for entrance, then lerps to TARGET_SCALE
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <icosahedronGeometry args={[1, 0]} />
      <MeshTransmissionMaterial
        ref={materialRef}
        backside
        backsideThickness={1.5}
        thickness={2}
        roughness={0} // Clean glass
        transmission={1}
        ior={1.5}
        chromaticAberration={0.5} // Base value
        anisotropy={0.5}
        distortion={0} // Base value
        distortionScale={0.5}
        temporalDistortion={0.5}
        color="#ffffff"
      />
    </mesh>
  )
}

function SceneContent({ scrollYProgress }: { scrollYProgress: any }) {
  const { theme } = useTheme()
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
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <Environment preset="studio" />
          <Particles isDark={isDark} scrollYProgress={scrollYProgress} />
          <Geometries isDark={isDark} scrollYProgress={scrollYProgress} />
          <ambientLight intensity={0.5} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export function GlassScene({ scrollYProgress }: { scrollYProgress?: any }) {
  return <SceneContent scrollYProgress={scrollYProgress} />
}
