console.log("Hello world");

let bannerCanvas = document.getElementById("banner");
let computedStyle = window.getComputedStyle(bannerCanvas);

let width = parseInt(computedStyle.width.replace("px", ""));
let height = parseInt(computedStyle.height.replace("px", ""));



console.log(width, height);

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

window.addEventListener("resize", () => {
  width = parseInt(computedStyle.width.replace("px", ""));
  height = parseInt(computedStyle.height.replace("px", ""));
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}, false);

let renderer = new THREE.WebGLRenderer({
  canvas: bannerCanvas,
  antialias: true
});
renderer.setSize(width, height);
renderer.setClearColor(0xfafafa, 1);

var pointLight = new THREE.PointLight(0x0, 0.9);
camera.add(pointLight);

let loader = new THREE.OBJLoader();

const objects = new Array();
const entities = new Array(20).fill(0).map(_ => ({
  x: Math.random() * 100 - 50,
  y: 20,
  z: -20 + Math.floor(Math.random() * 4) - 2,
  vY: (Math.random() * 2) / 10,
  rX: Math.random() / 100,
  rY: Math.random() / 100
}));

/*if (window.DeviceMotionEvent) {
  window.addEventListener("devicemotion", motion, false);
} else {
  console.log("DeviceMotionEvent is not supported");
}

function motion(event){
  console.log("Accelerometer: "
    + event.accelerationIncludingGravity.x + ", "
    + event.accelerationIncludingGravity.y + ", "
    + event.accelerationIncludingGravity.z
  );
}*/

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
    obj.position.y -= e.vY;
    obj.position.z = -20;

    if (obj.position.y <= -20) {
      obj.position.x = Math.random() * 100 - 50;
      obj.position.y = 20;
    }
  }

  renderer.render(scene, camera);
}

window.requestAnimationFrame(loop);
