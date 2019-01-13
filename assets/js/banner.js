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
      const orientation = getOrientation();

      if (orientation === "portrait-primary" || orientation === 0) {
        gravity = new THREE.Vector3(
          event.accelerationIncludingGravity.x / 75,
          event.accelerationIncludingGravity.y / 75,
          0
        );
      }

      if (orientation === "landscape-primary" || orientation === 90) {
        //TODO
      }

      if (orientation === "landscape-secondary" || orientation === -90) {
        //TODO
      }

      if (orientation === "portrait-secondary" || orientation === 180) {
        //TODO
      }
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
