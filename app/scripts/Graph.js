'use strict';

import assert from 'assert';
import extend from 'extend';
import util from './utils';

export default class Graph {
  constructor(owner, data) {
    this.owner = owner;
    this.data = data;
  }

  // nodes
  addNode(config) {
    assert(config.id);
    if (this.getNodeIndex(config.id) !== -1) {
      throw Error('node already in store');
    }
    this.data.nodes.push(
      Graph.nodeDefaults(config)
    );
  }

  removeNode(id) {
    var nodeIndex = this.getNodeIndex(id);
    if (nodeIndex !== -1) {
      this.data.nodes.splice(nodeIndex, 1);
    }
  }

  getNodeIndex(id) {
    var i;
    for (i = 0; i < this.data.nodes.length; i += 1) {
      if (this.data.nodes[i].id === id) {
        return i;
      }
    }
    return -1;
  }

  getNode(id) {
    var index = this.getNodeIndex(id);
    if (index !== -1) {
      return this.data.nodes[index];
    }
  }

  getNodeSelection(id) {
    return this.owner.nodeGroup
      .selectAll('#' + util.ns(id));
  }

  static nodeDefaults(v) {
    if (!v.hasOwnProperty('id')) {
      v.id = util.id();
    }
    v.radius = v.radius || 10;
    v.width = v.width || 2 * v.radius;
    v.height = v.height || 2 * v.radius;
    return v;
  }

  static edgeDefaults(e) {
    if (!e.hasOwnProperty('id')) {
      e.id = util.id();
    }
    return e;
  }
}
