/**
 * initScene.js - Handles the initialization of the Three.js scene, camera, renderer, and controls
 */

// Import necessary Three.js modules
import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"

// Global variables for scene components
let scene, camera, renderer, controls, canvas
let autoRotate = true

/**
 * Initialize the Three.js scene, camera, renderer, and controls
 * @returns {Object} Object containing scene, camera, renderer, and controls
 */
function initScene() {
  console.log("Initializing bedroom scene...")

  // Get the canvas element
  canvas = document.getElementById("product-canvas")

  // Create the scene
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf0f8ff)

  // Create the camera
  const aspectRatio = window.innerWidth / window.innerHeight
  camera = new THREE.PerspectiveCamera(60, aspectRatio, 0.1, 1000)
  camera.position.set(8, 6, 8)

  // Create the renderer
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  // Create orbit controls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.minDistance = 5
  controls.maxDistance = 20
  controls.maxPolarAngle = Math.PI / 1.8
  controls.autoRotate = autoRotate
  controls.autoRotateSpeed = 0.8

  // Add event listener for window resize
  window.addEventListener("resize", onWindowResize)

  // Add event listener for auto-rotate toggle button
  const autoRotateToggle = document.getElementById("auto-rotate-toggle")
  autoRotateToggle.addEventListener("click", toggleAutoRotate)

  // Add event listener to disable auto-rotate when user interacts
  controls.addEventListener("start", () => {
    if (autoRotate) {
      autoRotate = false
      controls.autoRotate = false
      autoRotateToggle.textContent = "Auto Rotate: OFF"
      autoRotateToggle.classList.add("off")
    }
  })

  console.log("Bedroom scene initialized successfully")
  return { scene, camera, renderer, controls }
}

/**
 * Handle window resize events
 */
function onWindowResize() {
  // Update camera aspect ratio
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  // Update renderer size
  renderer.setSize(window.innerWidth, window.innerHeight)
}

/**
 * Toggle auto-rotation on/off
 */
function toggleAutoRotate() {
  autoRotate = !autoRotate
  controls.autoRotate = autoRotate

  const autoRotateToggle = document.getElementById("auto-rotate-toggle")
  if (autoRotate) {
    autoRotateToggle.textContent = "Auto Rotate: ON"
    autoRotateToggle.classList.remove("off")
  } else {
    autoRotateToggle.textContent = "Auto Rotate: OFF"
    autoRotateToggle.classList.add("off")
  }
}

// Export functions for use in other modules
export { initScene, onWindowResize, toggleAutoRotate }
