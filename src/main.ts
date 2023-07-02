import "./style.css";

import * as t from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new t.Scene();

const camera = new t.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// 0.1 1000 view frustum (see everything)

const renderer = new t.WebGLRenderer({
  canvas: document.querySelector("#bg")!,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setX(-0.0016);
camera.position.setY(-0.0016);
camera.position.setZ(-0.08);

const geometry = new t.TorusGeometry(10, 3, 16, 100);
const material = new t.MeshStandardMaterial({ color: 0xff6347 });
const torus = new t.Mesh(geometry, material);

scene.add(torus);

const pointLight = new t.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new t.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// const lightHelper = new t.PointLightHelper(pointLight);
// scene.add(lightHelper);

// const gridHelper = new t.GridHelper(200, 50);
// scene.add(gridHelper);

// const controls = new OrbitControls(camera, renderer.domElement);
// scene.add(controls);

function addStar() {
  const geometry = new t.SphereGeometry(0.25, 24, 24);
  const material = new t.MeshStandardMaterial({ color: 0xffffff });
  const star = new t.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill(undefined)
    .map(() => t.MathUtils.randFloatSpread(100));
star.position.set(x,y,z);
scene.add(star);
}

function animate(): void {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  renderer.render(scene, camera);
}
animate();

const spaceTexture = new t.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

const dawinTexture = new t.TextureLoader().load('dawin.jpeg')
const dawin = new t.Mesh(
    new t.BoxGeometry(3,3,3),
    new t.MeshBasicMaterial({
        map: dawinTexture
    })
)
scene.add(dawin);

const moonTexture = new t.TextureLoader().load('moon.jpg');
const normalTexture = new t.TextureLoader().load('normal.jpg');
const moon = new t.Mesh(
    new t.SphereGeometry(3, 32, 32),
    new t.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture
    }),
)

moon.position.z = 30;
moon.position.setX(-10);

dawin.position.z = -5;
dawin.position.x = 2;
scene.add(moon);

Array(200).fill(undefined).forEach(addStar);


function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    dawin.rotation.y += 0.01;
    dawin.rotation.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;
    console.log(`t: ${t}`);
    console.log(`cam pos: ${JSON.stringify(camera.position)}`);
}
document.body.onscroll = moveCamera;