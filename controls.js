import { camera, scene } from './scene.js';
import { cube } from './cube.js';
import * as THREE from 'three';

let isDragging = false;
let dragThreshold = 0; // Records the total movement during dragging
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
        './Pages/page1.html',
        './Pages/page2.html',
        './Pages/page3.html',
        './Pages/page4.html',
        './Pages/page5.html',
        './Pages/page6.html',
    ];
    window.location.href = pages[faceIndex]; // Navigate to corresponding page
}
function onMouseWheel(event) {
    const zoomSpeed = 0.1; // Speed of zooming; adjust for sensitivity

    // Use deltaY for zooming out/in
    camera.position.z += event.deltaY * zoomSpeed;

    // Clamp camera position to prevent excessive zooming
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, 2, 20); // Adjust min (2) & max (20)
}

function onResize() {
    const renderer = this; // Get renderer instance
    camera.aspect = window.innerWidth / window.innerHeight; // Update camera aspect
    camera.updateProjectionMatrix(); // Recalculate projection matrix
    renderer.setSize(window.innerWidth, window.innerHeight); // Update renderer size
}

function registerEventListeners(renderer) {
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('click', onMouseClick); // Enable raycasting
    window.addEventListener('resize', onResize.bind(renderer)); // Resize listener
    window.addEventListener('wheel', onMouseWheel); // Add zoom with mouse wheel

}

export { registerEventListeners };