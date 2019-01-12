console.log("Hello world");

let loader = new THREE.OBJLoader();

// load a resource
loader.load(
  // resource URL
  "LED.obj",
  // called when resource is loaded
  function(object) {
    console.log(object);
    //scene.add(object);
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
