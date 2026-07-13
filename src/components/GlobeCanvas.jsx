import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function GlobeCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (window.innerWidth < 720) return

    const wrapEl = canvas.closest('.hero-visual')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = wrapEl.clientWidth
    let height = wrapEl.clientHeight

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0, 7.2)

    const group = new THREE.Group()
    scene.add(group)

    const sphereGeo = new THREE.IcosahedronGeometry(2.15, 3)
    const sphereMat = new THREE.MeshBasicMaterial({ color: 0x2f5560, wireframe: true, transparent: true, opacity: 0.55 })
    const sphere = new THREE.Mesh(sphereGeo, sphereMat)
    group.add(sphere)

    const coreGeo = new THREE.IcosahedronGeometry(0.9, 1)
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x4fb6c9, wireframe: true, transparent: true, opacity: 0.8 })
    const core = new THREE.Mesh(coreGeo, coreMat)
    group.add(core)

    const ringGeo1 = new THREE.TorusGeometry(2.7, 0.006, 8, 128)
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0xc9a05c, transparent: true, opacity: 0.65 })
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1)
    ring1.rotation.x = Math.PI / 2.4
    group.add(ring1)

    const ringGeo2 = new THREE.TorusGeometry(3.05, 0.005, 8, 128)
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x4fb6c9, transparent: true, opacity: 0.35 })
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2)
    ring2.rotation.x = Math.PI / 1.7
    ring2.rotation.y = Math.PI / 5
    group.add(ring2)

    const markerGeo = new THREE.SphereGeometry(0.035, 8, 8)
    const markerMat = new THREE.MeshBasicMaterial({ color: 0xc9a05c })
    const markerCount = 14
    for (let i = 0; i < markerCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / markerCount)
      const theta = Math.sqrt(markerCount * Math.PI) * phi
      const m = new THREE.Mesh(markerGeo, markerMat)
      m.position.setFromSphericalCoords(2.15, phi, theta)
      group.add(m)
    }

    const BASE_X = 0.35
    group.rotation.x = BASE_X

    let mouseX = 0
    let mouseY = 0
    let targetX = BASE_X
    let targetY = 0
    let autoRotY = 0

    function onPointerMove(e) {
      const rect = wrapEl.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height
      mouseX = (px - 0.5) * 2
      mouseY = (py - 0.5) * 2
      targetX = BASE_X - mouseY * 0.4
      targetY = mouseX * 1.2
    }

    function onPointerLeave() {
      targetX = BASE_X
      targetY = 0
    }

    if (!reduceMotion) {
      wrapEl.addEventListener('pointermove', onPointerMove)
      wrapEl.addEventListener('pointerleave', onPointerLeave)
    }

    let animId
    function animate() {
      animId = requestAnimationFrame(animate)
      if (!reduceMotion) {
        autoRotY += 0.0022
        group.rotation.x += (targetX - group.rotation.x) * 0.045
        group.rotation.y += (autoRotY + targetY - group.rotation.y) * 0.045
        ring1.rotation.z += 0.003
        ring2.rotation.z -= 0.002
        core.rotation.y -= 0.004
      }
      renderer.render(scene, camera)
    }
    animate()

    function handleResize() {
      if (window.innerWidth < 720) return
      width = wrapEl.clientWidth
      height = wrapEl.clientHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      if (!reduceMotion) {
        wrapEl.removeEventListener('pointermove', onPointerMove)
        wrapEl.removeEventListener('pointerleave', onPointerLeave)
      }
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} id="globe-canvas" aria-hidden="true" />
}
