import * as THREE from 'three';
import { scene, camera } from './scene.js';
import { animate } from './animate.js';
import { registerEventListeners } from './controls.js';

// Initialize the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Import and initialize objects (cube and edges)
import './cube.js'; // No need to rename this file, as it's just updated with the cube logic

// Register controls and event listeners
registerEventListeners(renderer);

// Animation loop
renderer.setAnimationLoop(() => animate(renderer, scene, camera));