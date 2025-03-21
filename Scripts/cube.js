import * as THREE from 'three';
import { scene } from './scene.js';

// Load texture using TextureLoader
const textureLoader = new THREE.TextureLoader();
// Load textures for all six faces
const textures = [
    textureLoader.load('./Media/2.png'), // Front face
    textureLoader.load('./Media/2.png'), // Back face
    textureLoader.load('./Media/2.png'), // Top face
    textureLoader.load('./Media/1.png'), // Bottom face
    textureLoader.load('./Media/1.png'), // Right face
    textureLoader.load('./Media/1.png'), // Left face
];

textures.minFilter = THREE.NearestFilter; // Disable mipmaps; prioritize sharpness
textures.magFilter = THREE.NearestFilter; // For magnifying the texture

// Define an array of materials, one for each face
const materials = textures.map(texture => new THREE.MeshPhongMaterial({ map: texture }));


// Define the geometry for the cube
const geometry = new THREE.BoxGeometry(4, 4, 4); // Cube dimensions (1x1x1)

// Create the cube mesh
const cube = new THREE.Mesh(geometry, materials);

// Set the starting position to isometric angles
cube.rotation.y = Math.PI / 4; // 45 degrees around the Y-axis
cube.rotation.x = Math.PI / 6; // 45 degrees around the X-axis

// Add the cube to the scene
scene.add(cube);

export { cube};