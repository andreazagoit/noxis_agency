import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial, Float, Environment } from '@react-three/drei'
import * as THREE from 'three'

function Geometries() {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (!meshRef.current) return
        meshRef.current.rotation.x += 0.002
        meshRef.current.rotation.y += 0.005
    })

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} scale={1.2}>
                <icosahedronGeometry args={[1, 0]} /> {/* Simplified geometry for "crystal" look */}
                <MeshTransmissionMaterial
                    backside
                    backsideThickness={5}
                    thickness={2}
                    roughness={0}
                    transmission={1}
                    ior={1.5}
                    chromaticAberration={1} /* High chromatic aberration for "liquid/glass" feel */
                    anisotropy={0.5}
                    color="#ffffff"
                />
            </mesh>
        </Float>
    )
}

export function GlassScene() {
    return (
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-background to-secondary/20">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <Environment preset="studio" />
                <Geometries />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
            </Canvas>
        </div>
    )
}
