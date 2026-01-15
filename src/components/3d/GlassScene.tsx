'use client'

import { useRef, Suspense, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial, Float, Environment } from '@react-three/drei'
import * as THREE from 'three' // Wait, I need to check the imports. It's 'three' correctly in previous versions.
import { useTheme } from '../theme-provider'

// Cached objects to avoid allocations in render loop
const TARGET_SCALE = new THREE.Vector3(1.2, 1.2, 1.2)
const TARGET_COLOR_LIGHT = new THREE.Color("#111111")
const TARGET_COLOR_DARK = new THREE.Color("#ffffff")

function Geometries({ isDark }: { isDark: boolean }) {
    const meshRef = useRef<THREE.Mesh>(null)
    const materialRef = useRef<any>(null)
    const [hovered, setHovered] = useState(false)

    useFrame(() => {
        if (!meshRef.current) return
        meshRef.current.rotation.x += 0.002
        meshRef.current.rotation.y += 0.005

        // Entrance animation
        meshRef.current.scale.lerp(TARGET_SCALE, 0.05)

        if (materialRef.current) {
            // Lerp chromatic aberration
            materialRef.current.chromaticAberration = THREE.MathUtils.lerp(
                materialRef.current.chromaticAberration,
                hovered ? 2 : 0.5,
                0.1
            )
            // Lerp distortion
            materialRef.current.distortion = THREE.MathUtils.lerp(
                materialRef.current.distortion,
                hovered ? 0.5 : 0,
                0.1
            )

            // Color animation (Theme switch)
            const targetColor = isDark ? TARGET_COLOR_DARK : TARGET_COLOR_LIGHT
            materialRef.current.color.lerp(targetColor, 0.05)
        }
    })

    return (
        <Float speed={1} rotationIntensity={0.5} floatIntensity={0.2}>
            <mesh
                ref={meshRef}
                scale={[0, 0, 0]}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <icosahedronGeometry args={[1, 0]} />
                <MeshTransmissionMaterial
                    ref={materialRef}
                    backside
                    backsideThickness={2}
                    thickness={2}
                    roughness={0}
                    transmission={1}
                    ior={1.5}
                    chromaticAberration={0.5}
                    anisotropy={0.5}
                    distortion={0}
                    distortionScale={0.5}
                    temporalDistortion={0.5}
                    color="#ffffff"
                />
            </mesh>
        </Float>
    )
}

export function GlassScene() {
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
        <div className="absolute inset-0">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
                <Suspense fallback={null}>
                    <Environment preset="studio" />
                    <Geometries isDark={isDark} />
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                </Suspense>
            </Canvas>
        </div>
    )
}
