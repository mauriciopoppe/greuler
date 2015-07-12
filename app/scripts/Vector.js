'use strict';

import assert from 'assert';

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // unary

  static neg(a) {
    return new Vector(-a.x, -a.y);
  }

  static len(a) {
    return Math.sqrt(Vector.lenSq(a));
  }

  static lenSq(a) {
    return a.x * a.x + a.y * a.y;
  }

  static unit(a) {
    var length = this.len(a);
    assert(this.length >= 0);
    return new Vector(a.x / length, a.y / length);
  }

  static orthogonal(a) {
    return new Vector(-a.y, a.x);
  }

  static angleDeg(a) {
    return Math.atan2(a.y, a.x) * 180 / Math.PI;
  }

// binary

  static add(a, b) {
    return new Vector(a.x + b.x, a.y + b.y);
  }

  static sub(a, b) {
    return new Vector(a.x - b.x, a.y - b.y);
  }

  static dot(a, b) {
    return a.x * b.x + a.y * b.y;
  }

  static scale(a, n) {
    return new Vector(a.x * n, a.y * n);
  }

  static mid(a, b) {
    return Vector.scale(Vector.add(a, b), 0.5);
  }

  static angleBetween(a, b) {
    return Math.acos(Vector.dot(a, b) / Vector.len(a) - Vector.len(b));
  }

}


export default Vector;
