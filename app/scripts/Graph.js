'use strict';

import assert from 'assert';
import extend from 'extend';
import util from './utils';

export default class Graph {
  constructor(owner, data) {
    this.owner = owner;
    this.nodes = data.nodes;
    this.edges = data.links;
  }

  // nodes
  addNode(config) {
    assert(config.id);
    if (this.getNodeIndex(config.id) !== -1) {
      throw Error('node already in store');
    }
    this.nodes.push(
      Graph.nodeDefaults(config)
    );
  }

  removeNode(id) {
    var nodeIndex = this.getNodeIndex(id);
    if (nodeIndex !== -1) {
      // remove nodes
      this.nodes.splice(nodeIndex, 1);

      // remove incident edges
      this.removeIncidentEdges(id);
    }
  }

  getNodeIndex(id) {
    var i;
    for (i = 0; i < this.nodes.length; i += 1) {
      if (this.nodes[i].id === id) {
        return i;
      }
    }
    return -1;
  }

  getNode(id) {
    var index = this.getNodeIndex(id);
    if (index !== -1) {
      return this.nodes[index];
    }
  }

  // edges
  addEdge(config) {
    assert('source' in config && 'target' in config);
    var source = this.getNodeIndex(config.source);
    var target = this.getNodeIndex(config.target);
    if (source === -1 || target === -1) {
      throw Error('edge does not join existing vertices');
    }
    config.source = this.nodes[source];
    config.target = this.nodes[target];
    this.edges.push(
      Graph.edgeDefaults(config)
    );
  }

  removeIncidentEdges(id) {
    this.removeEdgesByFn(function (e) {
      return e.source.id === id || e.target.id === id;
    });
  }

  removeEdgesByFn(fn) {
    var i;
    for (i = 0; i < this.edges.length; i += 1) {
      if (fn(this.edges[i])) {
        this.edges.splice(i, 1);
        i -= 1;
      }
    }
  }

  getEdgesByFn(fn) {
    var i;
    var indices = [];
    for (i = 0; i < this.edges.length; i += 1) {
      if (fn(this.edges[i])) {
        indices.push(i);
      }
    }
    return indices;
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
