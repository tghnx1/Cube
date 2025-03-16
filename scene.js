import * as THREE from 'three';

const scene = new THREE.Scene();

// Create perspective camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Add ambient and directional light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // Lower intensity ambient light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Strong directional light
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

export { scene, camera };