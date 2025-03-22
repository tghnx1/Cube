import { camera, scene } from './scene.js';
import { cube } from './cube.js';
import * as THREE from 'three';

let isDragging = false;
export { isDragging };
let dragThreshold = 0; // Records the total movement during dragging
let targetZoom = camera.position.z; // The zoom position we want to reach
const zoomSpeed = 0.1; // Zoom sensitivity
const smoothingFactor = 0.1; // Determines how smooth the zooming is (lower is smoother)
const maxClickThreshold = 5; // Maximum movement (in pixels) to still consider as a click


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseDown() {
    isDragging = true; // Start dragging
    dragThreshold = 0;
}

function onMouseMove(event) {
    if (!isDragging) return;

    const rotationSpeed = 0.005; // Adjust rotation speed

    // Use event.movementX/movementY (mouse movement) OR default to 0 if unavailable
    const deltaX = event.movementX || event.deltaX || 0; // Horizontal movement
    const deltaY = event.movementY || event.deltaY || 0; // Vertical movement

    // Update drag threshold (track movement distance)
    dragThreshold += Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    cube.rotation.y += deltaX * rotationSpeed; // Rotate on Y-axis
    cube.rotation.x += deltaY * rotationSpeed; // Rotate on X-axis
}


function onMouseUp() {
    isDragging = false; // Stop dragging
}

function onMouseClick(event) {
    if (dragThreshold > maxClickThreshold)
        return; // It was a drag, so don't navigate.
        // Convert mouse click to normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Perform raycasting
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(cube);

    if (intersects.length > 0) {
        const faceIndex = Math.floor(intersects[0].faceIndex / 2); // Get cube face
        redirectToPage(faceIndex);
    }
}

function redirectToPage(faceIndex) {
    const pages = [
        './Pages/Playground.html',
        './Pages/page2.html',
        './Pages/About_me.html',
        './Pages/page4.html',
        './Pages/page5.html',
        './Pages/page6.html',
    ];
    window.location.href = pages[faceIndex]; // Navigate to corresponding page
}
function onMouseWheel(event) {
    // Adjust the target zoom based on the scroll wheel input (deltaY)
    targetZoom += event.deltaY * zoomSpeed;

    // Clamp the target zoom to prevent excessive zooming in or out
    targetZoom = THREE.MathUtils.clamp(targetZoom, 2, 20); // Adjust min (2) & max (20) zoom levels
}

function registerEventListeners(renderer) {
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('click', onMouseClick); // Enable raycasting
}

export { registerEventListeners };