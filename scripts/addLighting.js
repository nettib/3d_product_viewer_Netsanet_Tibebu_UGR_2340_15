/**
 * addLighting.js - Sets up the lighting for the 3D bedroom scene
 */

import * as THREE from "three"

/**
 * Add lighting to the bedroom scene
 * @param {THREE.Scene} scene - The Three.js scene
 */
function addLighting(scene) {
  console.log("Adding lighting to bedroom scene...")

  // Add ambient light for general illumination (softer for bedroom atmosphere)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
  scene.add(ambientLight)

  // Add main directional light (moonlight effect)
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2)
  directionalLight.position.set(10, 15, 5)
  directionalLight.castShadow = true

  // Configure shadow properties for better quality
  directionalLight.shadow.mapSize.width = 2048
  directionalLight.shadow.mapSize.height = 2048
  directionalLight.shadow.camera.near = 0.5
  directionalLight.shadow.camera.far = 50
  directionalLight.shadow.camera.left = -15
  directionalLight.shadow.camera.right = 15
  directionalLight.shadow.camera.top = 15
  directionalLight.shadow.camera.bottom = -15

  scene.add(directionalLight)

  // Add warm bedside lamp light
  const lampLight = new THREE.PointLight(0xffd700, 0.6, 10)
  lampLight.position.set(3.5, 2.8, -1.5) // Position at the lampshade
  lampLight.castShadow = true
  lampLight.shadow.mapSize.width = 1024
  lampLight.shadow.mapSize.height = 1024
  scene.add(lampLight)

  // Add subtle fill light from the opposite side
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.6)
  fillLight.position.set(-8, 8, -3)
  scene.add(fillLight)

  // Add a subtle rim light for depth
  const rimLight = new THREE.PointLight(0x87ceeb, 0.8)
  rimLight.position.set(-5, 5, 8)
  scene.add(rimLight)

  console.log("Bedroom lighting added successfully")
  return { ambientLight, directionalLight, lampLight, fillLight, rimLight }
}

// Export the addLighting function
export { addLighting }
