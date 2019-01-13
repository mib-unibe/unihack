console.log("Hello world");

let bannerCanvas = document.getElementById("banner");
let computedStyle = window.getComputedStyle(bannerCanvas);

let width = parseInt(computedStyle.width.replace("px", ""));
let height = parseInt(computedStyle.height.replace("px", ""));

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

window.addEventListener(
  "resize",
  e => {
    width = parseInt(computedStyle.width.replace("px", ""));
    height = parseInt(computedStyle.height.replace("px", ""));
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  },
  false
);

let renderer = new THREE.WebGLRenderer({
  canvas: bannerCanvas,
  antialias: true
});
renderer.setSize(width, height);
renderer.setClearColor(0xfafafa, 1);

var pointLight = new THREE.PointLight(0x0, 0.9);
camera.add(pointLight);

let loader = new THREE.OBJLoader();

let gravity = new THREE.Vector3(0, 0, 0);

const objects = new Array();
const entities = new Array(42).fill(0).map(_ => ({
  x: Math.random() * 100 - 50,
  y: 20,
  z: -20 + Math.floor(Math.random() * 4) - 2,
  v: new THREE.Vector3(0, -(0.05 + (Math.random() * 2) / 10), 0),
  rX: Math.random() / 100,
  rY: Math.random() / 100
}));

if (window.DeviceMotionEvent) {
  window.addEventListener(
    "devicemotion",
    event => {
      gravity = new THREE.Vector3(
        event.accelerationIncludingGravity.x,
        event.accelerationIncludingGravity.y,
        event.accelerationIncludingGravity.z
      );
    },
    false
  );
}

loader.load(
  // resource URL
  "LED.obj",
  // called when resource is loaded
  function(object) {
    for (let i = 0; i < entities.length; i++) {
      const e = entities[i];
      const obj = object.clone();
      scene.add(obj);

      obj.position.x = e.x;
      obj.position.y = e.y;
      obj.position.z = e.z;
      obj.updateMatrix();
      objects.push(obj);
    }

    //object.updateMatrix();
  },
  // called when loading is in progresses
  function(xhr) {
    //console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  // called when loading has errors
  function(error) {
    console.error("An error happened");
  }
);

function loop() {
  window.requestAnimationFrame(loop);

  for (let i = 0; i < objects.length; i++) {
    const obj = objects[i];
    const e = entities[i];

    obj.rotation.x += e.rX;
    obj.rotation.y = e.rY;
    obj.position.add(e.v).add(gravity);

    if (obj.position.y <= -20) {
      obj.position.x = Math.random() * 100 - 50;
      obj.position.y = 20;
    }
  }

  renderer.render(scene, camera);
}

window.requestAnimationFrame(loop);
