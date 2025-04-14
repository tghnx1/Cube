import * as THREE from 'https://unpkg.com/three@0.157.0/build/three.module.js';
import { scene } from './scene.js';

// Load texture using TextureLoader
const textureLoader = new THREE.TextureLoader();
// Load textures for all six faces
const textures = [
    textureLoader.load('./Media/Playground.png'), // Front face
    textureLoader.load('./Media/Matr.png'), // Back face
    textureLoader.load('./Media/Who.png'), // Top face
    textureLoader.load('./Media/Legalisation.png'), // Bottom face
    textureLoader.load('./Media/White.png'), // Right face
    textureLoader.load('./Media/White.png'), // Left face
];

// Disable mipmaps for sharpness
textures.forEach(texture => {
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
});

// Define an array of materials, one for each face
const materials = textures.map(texture => new THREE.MeshPhongMaterial({ map: texture }));

// Define the geometry for the cube
const geometry = new THREE.BoxGeometry(4, 4, 4); // Cube dimensions (4x4x4)

// Adjust UV mapping for each face
const uvMapping = [
    [0, 0, 1, 0, 1, 1, 0, 1], // Front face
    [1, 0, 0, 0, 0, 1, 1, 1], // Back face
    [0, 1, 1, 1, 1, 0, 0, 0], // Top face
    [0, 0, 1, 0, 1, 1, 0, 1], // Bottom face
    [0, 0, 1, 0, 1, 1, 0, 1], // Right face
    [1, 0, 0, 0, 0, 1, 1, 1], // Left face
];

geometry.faceVertexUvs[0] = [];
for (let i = 0; i < 6; i++) {
    const [u1, v1, u2, v2, u3, v3, u4, v4] = uvMapping[i];
    geometry.faceVertexUvs[0].push(
        [
            new THREE.Vector2(u1, v1),
            new THREE.Vector2(u2, v2),
            new THREE.Vector2(u4, v4),
        ],
        [
            new THREE.Vector2(u2, v2),
            new THREE.Vector2(u3, v3),
            new THREE.Vector2(u4, v4),
        ]
    );
}
// Create the cube mesh
const cube = new THREE.Mesh(geometry, materials);

// Set the starting position to isometric angles
cube.rotation.y = Math.PI / 4; // 45 degrees around the Y-axis
cube.rotation.x = Math.PI / 6; // 45 degrees around the X-axis

// Set the cube position to the center
cube.position.set(0, 0, 0);

// Add the cube to the scene
scene.add(cube);

// Function to adjust cube scale based on screen size
function adjustCubeScale() {
    console.log(`Screen size: ${window.innerWidth}x${window.innerHeight}`);
    if (window.innerWidth <= 980) { // Mobile screen size
        console.log('Mobile screen detected, scaling down the cube');
        cube.scale.set(0.5, 0.5, 0.5); // Scale down the cube
    } else {
        console.log('Larger screen detected, resetting cube scale');
        cube.scale.set(1, 1, 1); // Default scale
    }
}

// Adjust cube scale on window resize and load
window.addEventListener('resize', adjustCubeScale);
window.addEventListener('load', adjustCubeScale);

// Initial call to set the correct scale
adjustCubeScale();

export { cube };