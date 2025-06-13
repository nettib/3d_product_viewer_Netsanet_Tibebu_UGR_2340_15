/**
 * createProduct.js - Creates the 3D bedroom scene using basic Three.js geometries
 */

import * as THREE from "three"

// Bedroom items data with information for each component
const bedroomItemsData = [
  // Bed Frame Base
  {
    name: "bed-frame-base",
    geometry: "box",
    args: [4, 0.3, 6],
    position: [0, 0.15, 0],
    color: 0x8b4513,
    title: "Bed Frame Base",
    description:
      "Solid wooden bed frame base providing sturdy support for the mattress. Made from premium oak wood with a natural finish.",
  },
  // Mattress
  {
    name: "mattress",
    geometry: "box",
    args: [3.8, 0.4, 5.8],
    position: [0, 0.55, 0],
    color: 0xf5f5dc,
    title: "Mattress",
    description:
      "Comfortable memory foam mattress with premium fabric cover. Provides excellent support and comfort for a good night's sleep.",
  },
  // Headboard
  {
    name: "headboard",
    geometry: "box",
    args: [4.2, 1.5, 0.2],
    position: [0, 1.2, -3.1],
    color: 0x654321,
    title: "Headboard",
    description: "Elegant wooden headboard with carved details. Adds style and comfort for reading or relaxing in bed.",
  },
  // Nightstand
  {
    name: "nightstand",
    geometry: "box",
    args: [1, 1.2, 0.8],
    position: [3.5, 0.6, -1.5],
    color: 0x8b4513,
    title: "Nightstand",
    description: "Compact wooden nightstand with storage drawer. Perfect for keeping bedside essentials within reach.",
  },
  // Lamp Base
  {
    name: "lamp-base",
    geometry: "cylinder",
    args: [0.15, 0.15, 0.1, 16],
    position: [3.5, 1.25, -1.5],
    color: 0x2c3e50,
    title: "Lamp Base",
    description: "Weighted metal lamp base providing stability. Features a modern design with brushed finish.",
  },
  // Lamp Pole
  {
    name: "lamp-pole",
    geometry: "cylinder",
    args: [0.02, 0.02, 1.2, 16],
    position: [3.5, 1.9, -1.5],
    color: 0x34495e,
    title: "Lamp Pole",
    description: "Adjustable metal pole connecting the base to the lampshade. Allows for height customization.",
  },
  // Lampshade
  {
    name: "lampshade",
    geometry: "cylinder",
    args: [0.4, 0.3, 0.6, 16],
    position: [3.5, 2.8, -1.5],
    color: 0xf8f9fa,
    title: "Lampshade",
    description: "Fabric lampshade that diffuses light beautifully. Creates warm, ambient lighting for the bedroom.",
  },
  // Bed Legs (4 legs)
  {
    name: "bed-leg-1",
    geometry: "cylinder",
    args: [0.08, 0.08, 0.3, 16],
    position: [-1.8, -0.15, -2.8],
    color: 0x654321,
    title: "Bed Leg",
    description: "Sturdy wooden bed leg providing stable support. Crafted from solid hardwood for durability.",
  },
  {
    name: "bed-leg-2",
    geometry: "cylinder",
    args: [0.08, 0.08, 0.3, 16],
    position: [1.8, -0.15, -2.8],
    color: 0x654321,
    title: "Bed Leg",
    description: "Sturdy wooden bed leg providing stable support. Crafted from solid hardwood for durability.",
  },
  {
    name: "bed-leg-3",
    geometry: "cylinder",
    args: [0.08, 0.08, 0.3, 16],
    position: [-1.8, -0.15, 2.8],
    color: 0x654321,
    title: "Bed Leg",
    description: "Sturdy wooden bed leg providing stable support. Crafted from solid hardwood for durability.",
  },
  {
    name: "bed-leg-4",
    geometry: "cylinder",
    args: [0.08, 0.08, 0.3, 16],
    position: [1.8, -0.15, 2.8],
    color: 0x654321,
    title: "Bed Leg",
    description: "Sturdy wooden bed leg providing stable support. Crafted from solid hardwood for durability.",
  },
]

// Store references to all bedroom items
const bedroomItems = []
let bedroomGroup

/**
 * Create the bedroom scene using basic Three.js geometries
 * @param {THREE.Scene} scene - The Three.js scene
 * @returns {THREE.Group} The bedroom group containing all items
 */
function createProduct(scene) {
  console.log("Creating bedroom scene...")

  // Create a group to hold all bedroom items
  bedroomGroup = new THREE.Group()

  // Create each bedroom item based on the data
  bedroomItemsData.forEach((itemData) => {
    const item = createBedroomItem(itemData)
    bedroomGroup.add(item)
    bedroomItems.push(item)
  })

  // Add the bedroom group to the scene
  scene.add(bedroomGroup)

  // Create a floor
  const floorGeometry = new THREE.PlaneGeometry(20, 20)
  const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0x2c3e50,
    roughness: 0.8,
    metalness: 0.1,
  })
  const floor = new THREE.Mesh(floorGeometry, floorMaterial)
  floor.rotation.x = -Math.PI / 2
  floor.position.y = -0.3
  floor.receiveShadow = true
  scene.add(floor)

  // Create walls
  createWalls(scene)

  console.log("Bedroom created with", bedroomItems.length, "items")
  return bedroomGroup
}

/**
 * Create bedroom walls
 * @param {THREE.Scene} scene - The Three.js scene
 */
function createWalls(scene) {
  const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0x34495e,
    roughness: 0.9,
    metalness: 0.0,
  })

  // Back wall
  const backWallGeometry = new THREE.PlaneGeometry(20, 8)
  const backWall = new THREE.Mesh(backWallGeometry, wallMaterial)
  backWall.position.set(0, 4, -10)
  backWall.receiveShadow = true
  scene.add(backWall)

  // Left wall
  const leftWallGeometry = new THREE.PlaneGeometry(20, 8)
  const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial)
  leftWall.position.set(-10, 4, 0)
  leftWall.rotation.y = Math.PI / 2
  leftWall.receiveShadow = true
  scene.add(leftWall)
}

/**
 * Create a single bedroom item based on the provided data
 * @param {Object} itemData - Data for the bedroom item
 * @returns {THREE.Mesh} The created mesh
 */
function createBedroomItem(itemData) {
  // Create geometry based on the type
  let geometry

  switch (itemData.geometry) {
    case "box":
      geometry = new THREE.BoxGeometry(...itemData.args)
      break
    case "cylinder":
      geometry = new THREE.CylinderGeometry(...itemData.args)
      break
    case "sphere":
      geometry = new THREE.SphereGeometry(...itemData.args)
      break
    default:
      geometry = new THREE.BoxGeometry(...itemData.args)
  }

  // Create material with different properties based on item type
  let material
  if (itemData.name.includes("pillow") || itemData.name === "mattress") {
    material = new THREE.MeshStandardMaterial({
      color: itemData.color,
      roughness: 0.8,
      metalness: 0.0,
    })
  } else if (itemData.name.includes("lamp")) {
    material = new THREE.MeshStandardMaterial({
      color: itemData.color,
      roughness: 0.2,
      metalness: 0.7,
    })
  } else {
    material = new THREE.MeshStandardMaterial({
      color: itemData.color,
      roughness: 0.4,
      metalness: 0.1,
    })
  }

  // Create mesh
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(...itemData.position)

  // Enable shadows
  mesh.castShadow = true
  mesh.receiveShadow = true

  // Store item data in the mesh for interaction
  mesh.userData = {
    isBedroomItem: true,
    name: itemData.name,
    title: itemData.title,
    description: itemData.description,
    originalColor: itemData.color,
    originalScale: { x: 1, y: 1, z: 1 },
  }

  return mesh
}

/**
 * Get all bedroom items
 * @returns {Array} Array of bedroom item meshes
 */
function getBedroomItems() {
  return bedroomItems
}

/**
 * Get the bedroom group
 * @returns {THREE.Group} The bedroom group
 */
function getBedroomGroup() {
  return bedroomGroup
}

// Export functions for use in other modules
export { createProduct, getBedroomItems, getBedroomGroup, createBedroomItem }
