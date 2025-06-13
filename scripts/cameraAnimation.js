/**
 * cameraAnimation.js - Handles camera animation and bedroom floating effect
 */

// Variables for animation
let animationTime = 0
let bedroomFloating = true
let animationBedroomGroup

function getSelectedItem() {
  return null
}

function isClickAnimationInProgress() {
  // Implementation should be provided elsewhere
  return false
}

/**
 * Initialize camera animation
 * @param {THREE.Group} bedroomGroup - The bedroom group to animate
 */
function initCameraAnimation(bedroomGroup) {
  console.log("Initializing bedroom camera animation...")
  // Set initial position for the bedroom group
  animationBedroomGroup = bedroomGroup
  animationBedroomGroup.position.y = 0
}

/**
 * Update camera and bedroom animations
 * @param {THREE.Group} bedroomGroup - The bedroom group to animate
 * @param {number} elapsedTime - Time elapsed since start
 */
function updateAnimations(bedroomGroup, elapsedTime) {
  // Update time
  animationTime = elapsedTime

  // Animate bedroom floating effect (very subtle for realism)
  if (bedroomFloating && bedroomGroup) {
    bedroomGroup.position.y = Math.sin(animationTime * 0.3) * 0.05
  }

  // Animate selected item if there is one
  const selectedItem = getSelectedItem()
  if (selectedItem && !isClickAnimationInProgress()) {
    selectedItem.rotation.y = Math.sin(animationTime * 1.5) * 0.05
  }
}

/**
 * Toggle bedroom floating animation
 * @param {boolean} enabled - Whether floating should be enabled
 */
function setBedroomFloating(enabled) {
  bedroomFloating = enabled

  // Reset position if disabled
  if (!bedroomFloating && animationBedroomGroup) {
    animationBedroomGroup.position.y = 0
  }
}

// Export functions for use in other modules
export { initCameraAnimation, updateAnimations, setBedroomFloating }
