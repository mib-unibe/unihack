let bannerCanvas = document.getElementById("banner");
let computedStyle = window.getComputedStyle(bannerCanvas);

let width = window.innerWidth;
let height = parseInt(computedStyle.height.replace("px", ""));

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

const getOrientation = () => screen.orientation || window.orientation;

window.addEventListener(
  "resize",
  e => {
    width = window.innerWidth;
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
// set correct, global background to appear transparent
renderer.setClearColor(0xfafafa, 1);

var pointLight = new THREE.PointLight(0x000);
camera.add(pointLight);

let loader = new THREE.OBJLoader();

let gravity = new THREE.Vector3(0, 0, 0);

const objects = new Array();
const entities = new Array(42).fill(0).map(_ => ({
  x: Math.random() * camera.getFilmWidth() * 2 - camera.getFilmWidth(),
  y: camera.getFilmHeight() * 1 + Math.floor(Math.random() * 5),
  z: -20 + Math.floor(Math.random() * 4) - 2,
  // TODO calculate velocity
  v: new THREE.Vector3(
    0,
    -(1 / 100 + (Math.random() * 2) / 10),
    0
  ),
  // TODO calculate rotation
  rX: Math.random() / 100,
  rY: Math.random() / 120
}));

if (window.DeviceMotionEvent) {
  window.addEventListener(
    "devicemotion",
    event => {
      const orientation = getOrientation();

      if (orientation === "portrait-primary" || orientation === 0) {
        gravity = new THREE.Vector3(
          event.accelerationIncludingGravity.x,
          event.accelerationIncludingGravity.y,
          0
        );
      }

      if (orientation === "landscape-primary" || orientation === 90) {
        gravity = new THREE.Vector3(
          -event.accelerationIncludingGravity.y,
          event.accelerationIncludingGravity.x,
          0
        );
      }

      if (orientation === "landscape-secondary" || orientation === -90) {
        gravity = new THREE.Vector3(
          event.accelerationIncludingGravity.y,
          -event.accelerationIncludingGravity.x,
          0
        );
      }

      if (orientation === "portrait-secondary" || orientation === 180) {
        gravity = new THREE.Vector3(
          event.accelerationIncludingGravity.y,
          event.accelerationIncludingGravity.x,
          0
        );
      }

      gravity.divideScalar(75);
    },
    false
  );
}

window.addEventListener(
  "orientationchange",
  function() {
    width = window.innerWidth;
    height = parseInt(computedStyle.height.replace("px", ""));
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  },
  false
);

window.addEventListener(
  "deviceorientation",
  () => {
    width = window.innerWidth;
    height = parseInt(computedStyle.height.replace("px", ""));
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  },
  false
);

loader.load(
  // resource URL
  "/LED.obj",
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
  },
  function(xhr) {
    //console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
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

    if (obj.position.y < -20) {
      obj.position.x =
        Math.random() * camera.getFilmWidth() * 2 - camera.getFilmWidth();
      obj.position.y = camera.getFilmHeight() * 3;
    }
  }

  renderer.render(scene, camera);
}

window.requestAnimationFrame(loop);
