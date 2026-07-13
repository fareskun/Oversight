import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function BackgroundStars() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (window.innerWidth < 720) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = window.innerWidth
    let height = window.innerHeight

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 0.1, 100)
    camera.position.z = 10

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)

    const starCount = 180
    const starGeo = new THREE.BufferGeometry()
    const positions = new Float32Array(starCount * 3)
    const sizes = new Float32Array(starCount)
    const alphas = new Float32Array(starCount)
    const speeds = new Float32Array(starCount)

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * width * 1.4
      positions[i * 3 + 1] = (Math.random() - 0.5) * height * 1.4
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60
      sizes[i] = 0.8 + Math.random() * 1.5
      alphas[i] = 0.15 + Math.random() * 0.35
      speeds[i] = 0.15 + Math.random() * 0.35
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    starGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    starGeo.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1))
    starGeo.setAttribute('speed', new THREE.BufferAttribute(speeds, 1))

    const starMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(0x4fb6c9) },
        uColor2: { value: new THREE.Color(0xc9a05c) },
        uResolution: { value: new THREE.Vector2(width, height) },
      },
      vertexShader: `
        attribute float size;
        attribute float alpha;
        attribute float speed;
        varying float vAlpha;
        varying float vSpeed;
        void main() {
          vAlpha = alpha;
          vSpeed = speed;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (200.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        varying float vAlpha;
        varying float vSpeed;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float circle = 1.0 - smoothstep(0.0, 0.5, dist);
          vec3 color = mix(uColor1, uColor2, vSpeed * 0.5 + 0.5);
          gl_FragColor = vec4(color, circle * vAlpha * 0.5);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const stars = new THREE.Points(starGeo, starMat)
    scene.add(stars)

    let animId
    function animate() {
      animId = requestAnimationFrame(animate)
      if (!reduceMotion) {
        const positions = stars.geometry.attributes.position.array
        const speeds = stars.geometry.attributes.speed.array
        for (let i = 0; i < starCount; i++) {
          positions[i * 3] -= speeds[i] * 0.5
          if (positions[i * 3] < -width / 2 - 50) {
            positions[i * 3] = width / 2 + 50
            positions[i * 3 + 1] = (Math.random() - 0.5) * height * 1.2
          }
        }
        stars.geometry.attributes.position.needsUpdate = true
      }
      starMat.uniforms.uTime.value += 1/60
      renderer.render(scene, camera)
    }
    animate()

    function onResize() {
      width = window.innerWidth
      height = window.innerHeight
      renderer.setSize(width, height)
      camera.left = width / -2
      camera.right = width / 2
      camera.top = height / 2
      camera.bottom = height / -2
      camera.updateProjectionMatrix()
      starMat.uniforms.uResolution.value.set(width, height)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      starGeo.dispose()
      starMat.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="bg-canvas" aria-hidden="true" />
}