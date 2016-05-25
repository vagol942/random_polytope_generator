var THREE = require('three');
var OrbitControls = require('three-orbit-controls')(THREE)

//set up scene variables
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
var renderer = new THREE.WebGLRenderer({
  antialias: true
});
var clock = new THREE.Clock();

renderer.setClearColor(0x212121, 1);

//scene.add(camera);

//rendered configuration
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//here goes the code for the lights
var ambientLight = new THREE.AmbientLight(0x000000);
scene.add(ambientLight);

var lights = [];
lights[0] = new THREE.PointLight(0xffffff, 1, 0);
lights[1] = new THREE.PointLight(0xffffff, 1, 0);
lights[2] = new THREE.PointLight(0xffffff, 1, 0);
lights[3] = new THREE.PointLight(0xffffff, 1, 0);

lights[0].position.set(0, 200, 0);
lights[1].position.set(100, 200, 100);
lights[2].position.set(-100, -200, -100);
lights[3].position.set(0, 0, -200);

scene.add(lights[0]);
scene.add(lights[1]);
scene.add(lights[2]);

//here goes the code for the polytope generator
var MAX_VALUE = 20;
var MAX_POINTS = 50;

var polytopeGeometry = require('./polytopeGeometry');
var material = new THREE.MeshLambertMaterial({
  color: 0x29B6F6,
  transparent : true,
  opacity : 0.5
});

var vertexSphereGeometry = new THREE.SphereGeometry(0.5,8,6);
var vertexMaterial = new THREE.MeshLambertMaterial({
  color: 0xffffff
});
var polytopes = [];

//put a polytope in 0,0,0
var geometry = polytopeGeometry(MAX_VALUE, MAX_POINTS);
geometry.computeFaceNormals();
var polytope = new THREE.Mesh(geometry, material);
polytope.position.x = Math.floor(-10);
polytope.position.y = Math.floor(-10);
polytope.position.z = Math.floor(-10);
polytope.randomRotation = ((Math.random() * 12) - 6) * 0.01;
polytopes.push(polytope);
scene.add(polytope);
for (var i = 0; i < polytope.geometry.vertices.length; i ++) {
  var verticeSphere = new THREE.Mesh(vertexSphereGeometry, vertexMaterial);
  verticeSphere.position.x = polytope.position.x + polytope.geometry.vertices[i].x;
  verticeSphere.position.y = polytope.position.y + polytope.geometry.vertices[i].y;
  verticeSphere.position.z = polytope.position.z + polytope.geometry.vertices[i].z;
  scene.add(verticeSphere);
};

//populate the scene with polytopes
for (var i = -10; i < 10; i++) {
  for (var j = -10; j < 10; j++) {
    for (var k = -10; k < 10; k++) {
      //populate the scene with polytopes
      if (Math.random() > 0.9) {
        if (i == 0 && j == 0 && k == 0) {} else {
          var geometry = polytopeGeometry(MAX_VALUE, MAX_POINTS);
          geometry.computeFaceNormals();
          var polytope = new THREE.Mesh(geometry, material);
          polytope.position.x = Math.floor(MAX_VALUE * 4 * i - (MAX_VALUE / 2));
          polytope.position.y = Math.floor(MAX_VALUE * 4 * j - (MAX_VALUE / 2));
          polytope.position.z = Math.floor(MAX_VALUE * 4 * k - (MAX_VALUE / 2));
          polytope.randomRotation = ((Math.random() * 12) - 6) * 0.01;
          polytopes.push(polytope);
          scene.add(polytope);
        }
      }
    }
  }
}

//animate the polytopes
function animatePolitopes() {
  for (var i = 0; i < polytopes.length; i++) {
    polytopes[i].rotation.x += polytopes[i].randomRotation;
    polytopes[i].rotation.y += polytopes[i].randomRotation;
  }
}

//here goes the code for the camera
camera.position.x = 100;
camera.position.y = 100;
camera.position.z = 100;
controls = new OrbitControls(camera);

//the resize controls
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function mixMatchPolytopes() {
  var otherPolytopes = [];
  var otherOtherPolytopes = Object.assign([], polytopes);
  for (var i = 0; i < polytopes.length; i++) {
    var j = Math.round(Math.random() * otherOtherPolytopes.length);
    otherPolytopes.push(otherOtherPolytopes[j]);
    otherOtherPolytopes.splice(j, 1);
  }

  polytopes = otherPolytopes;
}

//render function, duh
function render() {
  requestAnimationFrame(render);

  //input processing and animation code goes here...

  //animatePolitopes();

  //mixMatchPolytopes();

  console.log(camera.position);
  renderer.render(scene, camera);
}

//call the renderer
render();
