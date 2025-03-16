import { camera, scene } from './scene.js';
import { cube } from './cube.js';
import * as THREE from 'three';

let isDragging = false;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseDown() {
    isDragging = true; // Start dragging
}

function onMouseMove(event) {
    if (!isDragging) return;

    const rotationSpeed = 0.005; // Adjust rotation speed
    const deltaX = event.movementX || 0; // Horizontal movement
    const deltaY = event.movementY || 0; // Vertical movement

    cube.rotation.y += deltaX * rotationSpeed; // Rotate on Y-axis
    cube.rotation.x += deltaY * rotationSpeed; // Rotate on X-axis
}

function onMouseUp() {
    isDragging = false; // Stop dragging
}

function onMouseClick(event) {
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
        './page1.html',
        './page2.html',
        './page3.html',
        './page4.html',
        './page5.html',
        './page6.html',
    ];
    window.location.href = pages[faceIndex]; // Navigate to corresponding page
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
}

export { registerEventListeners };