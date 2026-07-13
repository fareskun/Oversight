import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function BackgroundCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = window.innerWidth
    let height = window.innerHeight

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100)
    camera.position.set(0, 0, 30)

    const group = new THREE.Group()
    scene.add(group)

    // Subtle floating particles
    const particleCount = 180
    const particleGeo = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)
    const alphas = new Float32Array(particleCount)
    const velocities = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const radius = 12 + Math.random() * 18
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
      sizes[i] = 0.5 + Math.random() * 1.2
      alphas[i] = 0.15 + Math.random() * 0.25
      // Slow drift velocities
      velocities[i * 3] = (Math.random() - 0.5) * 0.0008
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.0008
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.0008
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    particleGeo.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1))

    const particleMat = new THREE.PointsMaterial({
      color: 0x4fb6c9,
      size: 1,
      transparent: true,
      vertexColors: false,
      opacity: 0.4,
      sizeAttenuation: true,
      depthWrite: false,
    })

    // Custom shader for per-particle alpha and subtle color variation
    const particleShaderMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(0x4fb6c9) },
        uColor2: { value: new THREE.Color(0xc9a05c) },
      },
      vertexShader: `
        attribute float size;
        attribute float alpha;
        varying float vAlpha;
        varying vec3 vPosition;
        void main() {
          vAlpha = alpha;
          vPosition = position;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uTime;
        varying float vAlpha;
        varying vec3 vPosition;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float circle = 1.0 - smoothstep(0.0, 0.5, dist);
          float pulse = 0.85 + 0.15 * sin(uTime * 0.5 + vPosition.x * 0.1);
          vec3 color = mix(uColor1, uColor2, sin(uTime * 0.15 + vPosition.y * 0.05) * 0.5 + 0.5);
          gl_FragColor = vec4(color, circle * vAlpha * pulse * 0.6);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(particleGeo, particleShaderMat)
    group.add(particles)

    // Very subtle wireframe sphere (like a distant echo of the hero globe)
    const sphereGeo = new THREE.IcosahedronGeometry(22, 2)
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x1a3a40,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    })
    const sphere = new THREE.Mesh(sphereGeo, sphereMat)
    group.add(sphere)

    // Subtle rotating ring
    const ringGeo = new THREE.TorusGeometry(26, 0.02, 16, 100)
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x4fb6c9,
      transparent: true,
      opacity: 0.08,
      side: THREE.DoubleSide,
    })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 2.2
    group.add(ring)

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(29, 0.015, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0xc9a05c, transparent: true, opacity: 0.05, side: THREE.DoubleSide })
    )
    ring2.rotation.x = Math.PI / 1.8
    ring2.rotation.y = Math.PI / 4
    group.add(ring2)

    group.rotation.x = 0.15

    let time = 0
    let animId
    function animate() {
      animId = requestAnimationFrame(animate)
      time += 1/60
      if (!reduceMotion) {
        group.rotation.y += 0.00015
        ring.rotation.z += 0.0002
        ring2.rotation.z -= 0.00015
        sphere.rotation.y -= 0.00008
      }
      particleShaderMat.uniforms.uTime.value = time
      renderer.render(scene, camera)
    }
    animate()

    function handleResize() {
      width = window.innerWidth
      height = window.innerHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      particleGeo.dispose()
      particleShaderMat.dispose()
      sphereGeo.dispose()
      sphereMat.dispose()
      ringGeo.dispose()
      ringMat.dispose()
      ring2.geometry.dispose()
      ring2.material.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="bg-canvas" aria-hidden="true" />
}