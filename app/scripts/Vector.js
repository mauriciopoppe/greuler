'use strict';

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// unary

Vector.neg = function (a) {
  return new Vector(-a.x, -a.y);
};

Vector.len = function (a) {
  return Math.sqrt(Vector.lenSq(a));
};

Vector.lenSq = function (a) {
  return a.x * a.x + a.y * a.y;
};

Vector.unit = function (a) {
  var length = Vector.len(a);
  return new Vector(a.x / length, a.y / length);
};

Vector.orthogonal = function (a) {
  return new Vector(-a.y, a.x);
};

Vector.angleDeg = function (a) {
  return Math.atan2(a.y, a.x) * 180 / Math.PI;
};

// binary

Vector.add = function (a, b) {
  return new Vector(a.x + b.x, a.y + b.y);
};

Vector.sub = function (a, b) {
  return new Vector(a.x - b.x, a.y - b.y);
};

Vector.dot = function (a, b) {
  return a.x * b.x + a.y * b.y;
};

Vector.scale = function (a, n) {
  return new Vector(a.x * n, a.y * n);
};

Vector.mid = function (a, b) {
  return Vector.scale(Vector.add(a, b), 0.5);
};

Vector.angleBetween = function (a, b) {
  return Math.acos(Vector.dot(a, b) / Vector.len(a) - Vector.len(b));
};

export default Vector;
