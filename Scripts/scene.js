

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // Set background color to solid black

// Create perspective camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Add ambient and directional light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Lower intensity ambient light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Strong directional light
directionalLight.position.set(5, 10, 7.5);
directionalLight.shadow.mapSize.width = 2048; // Shadow resolution
directionalLight.shadow.mapSize.height = 2048;
directionalLight.intensity = 2; // Higher intensity for stronger shadows
//directionalLight.shadow.bias = -0.005; // Reduce shadow artifacts
scene.add(directionalLight);

// Enable shadows for the scene
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Use soft shadows

export { scene, camera };