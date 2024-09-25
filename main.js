import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import starsTexture from '/stars.jpg'
import sunTexture from '/sun.jpg'
import mercuryTexture from '/mercury.jpg'
import venusTexture from '/venus.jpg'
import earthTexture from '/earth.jpg'
import marsTexture from '/mars.jpg'
import jupiterTexture from '/jupiter.jpg'
import saturnTexture from '/saturn.jpg'
import saturnRingTexture from '/saturn ring.png'
import uranusTexture from '/uranus.jpg'
import uranusRingTexture from '/uranus ring.png'
import neptuneTexture from '/neptune.jpg'

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Sets orbit control to move the camera around.
const orbit = new OrbitControls(camera, renderer.domElement);

// Camera positioning.
camera.position.set(-90, 140, 140);
// Has to be done everytime we update the camera position.
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const cubeTextLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
])

const textureLoader = new THREE.TextureLoader();


//Sun
const sunGeo = new THREE.SphereGeometry(25, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture)
})

const sun = new THREE.Mesh(sunGeo, sunMat)
scene.add(sun)


function createPlanet(size, texture, position, ring) {
        const geo = new THREE.SphereGeometry(size, 30, 30);
        const mat = new THREE.MeshStandardMaterial({
            map: textureLoader.load(texture)
        })

        const mesh = new THREE.Mesh(geo, mat);
        const obj = new THREE.Object3D(); // Created parent for mercury which is placed at the position of the sun

        obj.add(mesh);
        if(ring) {
                const ringGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 32);
                const ringMat = new THREE.MeshBasicMaterial({
                    map: textureLoader.load(ring.texture),
                    side: THREE.DoubleSide
                })

                const ringMesh = new THREE.Mesh(ringGeo, ringMat);

                obj.add(ringMesh);
                ringMesh.position.x = position;
                ringMesh.rotation.x = -0.5 * Math.PI;
        }
        scene.add(obj);
        mesh.position.x = position;

        return {mesh, obj}
}

//Mercury
const mercury = createPlanet(3.2, mercuryTexture, 35)

//Venus
const venus = createPlanet(3.4, venusTexture, 45)

//earth
const earth = createPlanet(5, earthTexture, 60)

const mars = createPlanet(5, marsTexture, 90)

const jupiter = createPlanet(15, jupiterTexture, 150)


//Saturn
const saturn = createPlanet(10, saturnTexture, 190, {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRingTexture
})

const uranus = createPlanet(6, uranusTexture, 220, {
    innerRadius: 6,
    outerRadius: 10,
    texture: uranusRingTexture
})

const neptune = createPlanet(3, neptuneTexture, 250)




//Adding point light at center of sun that emits light in all directions
const pointLight = new THREE.PointLight(0xFFFFFF, 10000, 500);
scene.add(pointLight);


function animate() {
    sun.rotateY(0.004)

    mercury.obj.rotateY(0.02)
    mercury.mesh.rotateY(0.02)

    venus.obj.rotateY(0.024)
    venus.mesh.rotateY(0.024)

    earth.obj.rotateY(0.014)
    earth.mesh.rotateY(0.014)

    mars.obj.rotateY(0.012)
    mars.mesh.rotateY(0.012)

    jupiter.obj.rotateY(0.005)
    jupiter.mesh.rotateY(0.005)

    saturn.obj.rotateY(0.004)
    saturn.mesh.rotateX(0.004)

    uranus.obj.rotateY(0.003)
    uranus.mesh.rotateY(0.003)

    neptune.obj.rotateY(0.002)
    neptune.mesh.rotateY(0.002)

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});