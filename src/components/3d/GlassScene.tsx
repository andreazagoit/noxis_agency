'use client'

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'

import { Canvas, useFrame } from '@react-three/fiber'
import {
  Center,
  Environment,
  MeshTransmissionMaterial,
  PointMaterial,
  Points,
  Text3D,
} from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from '../theme-provider'

// Cached objects to avoid allocations in render loop
const TARGET_SCALE_MOBILE = new THREE.Vector3(0.55, 0.55, 0.55)
const TARGET_SCALE_DESKTOP = new THREE.Vector3(0.85, 0.85, 0.85)
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

    // Scroll interaction: rotation depends on time (continuous) AND progress (position)
    // This makes particles rotate backwards when scrolling up.
    ref.current.rotation.y = time * 0.05 + progress * 5
    ref.current.rotation.x = time * 0.02 + progress * 2
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
  const groupRef = useRef<THREE.Group>(null)
  const xGroupRef = useRef<THREE.Group>(null)

  // Material management
  const matRefs = useRef<Array<any>>([])

  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (!groupRef.current) return

    const time = state.clock.getElapsedTime()
    const progress = scrollYProgress ? scrollYProgress.get() : 0

    // Entrance Scale - smaller on mobile
    const isMobile = state.size.width < 768
    const targetScale = isMobile ? TARGET_SCALE_MOBILE : TARGET_SCALE_DESKTOP
    groupRef.current.scale.lerp(targetScale, 0.05)

    // DYNAMIC X ANIMATION
    if (xGroupRef.current) {
      // Rotates ONLY on Y axis
      // Constant rotation without scroll acceleration
      xGroupRef.current.rotation.x = 0
      xGroupRef.current.rotation.y = time * 0.2
      xGroupRef.current.rotation.z = 0
    }

    // --- MATERIAL ALCHEMY (Shared) ---
    const targetAberration = hovered ? 2 : THREE.MathUtils.lerp(0.5, 1.5, progress)
    const targetDistortion = hovered ? 0.5 : THREE.MathUtils.lerp(0, 0.8, progress)
    const targetColor = isDark ? TARGET_COLOR_DARK : TARGET_COLOR_LIGHT

    matRefs.current.forEach((mat) => {
      if (mat) {
        mat.chromaticAberration = THREE.MathUtils.lerp(mat.chromaticAberration, targetAberration, 0.1)
        mat.distortion = THREE.MathUtils.lerp(mat.distortion, targetDistortion, 0.1)
        mat.color.lerp(targetColor, 0.05)
      }
    })
  })

  // Common Props
  const commonMaterialProps = {
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
    color: "#ffffff"
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
    height: 0.5, // Extrusion depth
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  }

  return (
    <group
      ref={groupRef}
      position={[0, 0, 0]}
      scale={[0, 0, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* X - DYNAMIC CENTER */}
      <group ref={xGroupRef} position={[0, 0, 0]}>
        <Center>
          <Text3D {...textProps}>
            X
            <MeshTransmissionMaterial ref={addMatRef} {...commonMaterialProps} />
          </Text3D>
        </Center>
      </group>
    </group>
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
        camera={{ position: [0, 0, 9], fov: 45 }}
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
