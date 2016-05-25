var THREE = require('three');
var qh = require('quickhull3d');

function polytopeGeometry(maxValue, numPoints) {
  var points = [];

  for (var i = 0; i < numPoints; i++) {
    points.push(GeneratePoint(maxValue));
  }
  var faces = [];
  var geometry = new THREE.Geometry();

  function GeneratePoint(maxValue) {
    return [Math.floor(Math.random() * maxValue), Math.floor(Math.random() * maxValue), Math.floor(Math.random() * maxValue)];
  }

  function addPoints(geometry, points) {
    for (var i = 0; i < points.length; i++) {
      geometry.vertices.push(new THREE.Vector3().fromArray(points[i]));
    }
  }


  function addFaces(geometry, points) {
    faces = qh(points);
    for (var i = 0; i < faces.length; i++) {
      geometry.faces.push(new THREE.Face3(faces[i][0], faces[i][1], faces[i][2]));
    }
  };

/*
  function addFaces(geometry, points) {
    var normal;
    for (i = 0; i < faces.length; i += 1) {
      var a = new THREE.Vector3().fromArray(points[faces[i][0]]);
      var b = new THREE.Vector3().fromArray(points[faces[i][1]]);
      var c = new THREE.Vector3().fromArray(points[faces[i][2]]);
      normal = new THREE.Vector3()
        .crossVectors(
          new THREE.Vector3().subVectors(b, a),
          new THREE.Vector3().subVectors(c, a)
        )
        .normalize();
      geometry.faces.push(new THREE.Face3(
        faces[i][0], faces[i][1], faces[i][2],
        normal
      ));
    }
  }
*/
  addPoints(geometry, points);
  addFaces(geometry, points);

  return geometry;
};

module.exports = polytopeGeometry;
