/**
 * interaction.js - Handles user interaction with the 3D bedroom items
 */

// Import necessary modules
import * as THREE from "three"

// Variables for raycasting and interaction
let raycaster, mouse
let selectedItem = null
let hoveredItem = null
let clickAnimationInProgress = false
let currentCamera, currentGetBedroomItems

/**
 * Initialize interaction functionality
 * @param {THREE.Camera} camera - The Three.js camera
 * @param {HTMLElement} canvas - The canvas element
 * @param {function} getBedroomItems - Function to get the bedroom items
 */
function initInteraction(camera, canvas, getBedroomItems) {
  console.log("Initializing bedroom interaction...")

  // Store camera reference
  currentCamera = camera
  currentGetBedroomItems = getBedroomItems

  // Create raycaster and mouse vector
  raycaster = new THREE.Raycaster()
  mouse = new THREE.Vector2()

  // Add event listeners for mouse interaction
  canvas.addEventListener("mousemove", onMouseMove)
  canvas.addEventListener("click", onClick)

  // Add event listener for info panel close button
  const closeInfoButton = document.getElementById("close-info")
  closeInfoButton.addEventListener("click", closeInfoPanel)

  console.log("Bedroom interaction initialized")
}

/**
 * Handle mouse move events for hover effects
 * @param {Event} event - Mouse event
 */
function onMouseMove(event) {
  // Calculate mouse position in normalized device coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

  // Update the raycaster
  raycaster.setFromCamera(mouse, currentCamera)

  // Find intersections with bedroom items
  const bedroomItems = currentGetBedroomItems()
  const intersects = raycaster.intersectObjects(bedroomItems)

  // Reset cursor style
  document.body.style.cursor = "default"

  // Reset previously hovered item if it's not the selected item
  if (hoveredItem && hoveredItem !== selectedItem) {
    resetItemAppearance(hoveredItem)
    hoveredItem = null
  }

  // Handle new hover
  if (intersects.length > 0) {
    const intersectedObject = intersects[0].object

    // Check if it's a bedroom item and not the currently selected item
    if (intersectedObject.userData.isBedroomItem && intersectedObject !== selectedItem) {
      // Set hover effect
      document.body.style.cursor = "pointer"
      hoveredItem = intersectedObject
      setHoverEffect(hoveredItem)
    }
  }
}

/**
 * Handle click events for item selection
 * @param {Event} event - Mouse event
 */
function onClick(event) {
  // Calculate mouse position in normalized device coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

  // Update the raycaster
  raycaster.setFromCamera(mouse, currentCamera)

  // Find intersections with bedroom items
  const bedroomItems = currentGetBedroomItems()
  const intersects = raycaster.intersectObjects(bedroomItems)

  // Reset previously selected item
  if (selectedItem) {
    resetItemAppearance(selectedItem)
    selectedItem = null
  }

  // Close info panel if no new item is selected
  if (intersects.length === 0) {
    closeInfoPanel()
    return
  }

  // Handle new selection
  const intersectedObject = intersects[0].object

  // Check if it's a bedroom item
  if (intersectedObject.userData.isBedroomItem) {
    selectedItem = intersectedObject
    setClickEffect(selectedItem)
    showInfoPanel(selectedItem)
  }
}

/**
 * Apply hover effect to a bedroom item
 * @param {THREE.Mesh} item - The bedroom item mesh
 */
function setHoverEffect(item) {
  if (!item) return

  // Change material color to a warm orange
  item.material.color.setHex(0xff6b35)
  item.material.emissive.setHex(0x331100)

  // Slightly scale up the item
  item.scale.set(1.05, 1.05, 1.05)
}

/**
 * Apply click effect to a bedroom item
 * @param {THREE.Mesh} item - The bedroom item mesh
 */
function setClickEffect(item) {
  if (!item) return

  // Change material color to bright gold
  item.material.color.setHex(0xffd700)
  item.material.emissive.setHex(0x444400)

  // Scale up the item
  item.scale.set(1.1, 1.1, 1.1)

  // Add click animation
  clickAnimationInProgress = true

  // Quick scale down and up animation
  const originalScale = { x: 1.1, y: 1.1, z: 1.1 }
  item.scale.set(0.95, 0.95, 0.95)

  setTimeout(() => {
    item.scale.set(originalScale.x, originalScale.y, originalScale.z)
    clickAnimationInProgress = false
  }, 150)
}

/**
 * Reset a bedroom item to its original appearance
 * @param {THREE.Mesh} item - The bedroom item mesh
 */
function resetItemAppearance(item) {
  if (!item) return

  // Reset material color
  item.material.color.setHex(item.userData.originalColor)
  item.material.emissive.setHex(0x000000)

  // Reset scale
  item.scale.set(1, 1, 1)
}

/**
 * Show the info panel with item details
 * @param {THREE.Mesh} item - The bedroom item mesh
 */
function showInfoPanel(item) {
  if (!item) return

  const infoPanel = document.getElementById("info-panel")
  const itemTitle = document.getElementById("part-title")
  const itemDescription = document.getElementById("part-description")

  // Set panel content
  itemTitle.textContent = item.userData.title
  itemDescription.textContent = item.userData.description

  // Show the panel
  infoPanel.classList.remove("hidden")
}

/**
 * Close the info panel
 */
function closeInfoPanel() {
  const infoPanel = document.getElementById("info-panel")
  infoPanel.classList.add("hidden")

  // Reset selected item if there is one
  if (selectedItem) {
    resetItemAppearance(selectedItem)
    selectedItem = null
  }
}

/**
 * Check if click animation is in progress
 * @returns {boolean} True if animation is in progress
 */
function isClickAnimationInProgress() {
  return clickAnimationInProgress
}

/**
 * Get the currently selected item
 * @returns {THREE.Mesh|null} The selected item or null
 */
function getSelectedItem() {
  return selectedItem
}

// Export functions for use in other modules
export { initInteraction, getSelectedItem, isClickAnimationInProgress }
