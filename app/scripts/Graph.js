'use strict';

import _ from 'lodash';
import assert from 'assert';
import util from './utils';

export default class Graph {
  constructor(owner, data) {
    this.owner = owner;
    this.nodes = data.nodes;
    this.edges = data.links;
  }

  // nodes
  addNode() {
    for (var i = 0; i < arguments.length; i += 1) {
      var config = arguments[i];
      assert(config.id);
      if (this.getNode(config.id)) {
        throw Error('node already in store');
      }
      this.nodes.push(
        Graph.nodeDefaults(config)
      );
    }
  }

  getNode(id) {
    return _.where(this.nodes, { id: id })[0];
  }

  getNodesByFn(fn) {
    return this.nodes.filter(fn);
  }

  getAdjacentNodes(id) {
    var adjacentNodesIds = [];
    var taken = {};
    for (var i = 0; i < this.edges.length; i += 1) {
      var edge = this.edges[i];
      var nodeId;
      if (edge.source.id === id) {
        nodeId = edge.target.id;
      } else if (edge.target.id === id) {
        nodeId = edge.source.id;
      }

      if (!taken[nodeId]) {
        taken[nodeId] = true;
        adjacentNodesIds.push(nodeId);
      }
    }

    // sort the adjacent nodes
    adjacentNodesIds.sort(function (a, b) {
      return a - b;
    });

    return this.getNodesByFn(function (v) {
      return _.indexOf(adjacentNodesIds, v.id, true) !== -1;
    });
  }

  removeNode(id) {
    return this.removeNodesByFn(function (v) {
      return v.id === id;
    });
  }

  removeNodes(nodes) {
    this.removeNodesByFn(function (v) {
      return _.find(nodes, {id: v.id});
    });
  }

  removeNodesByFn(fn) {
    var i;
    for (i = 0; i < this.nodes.length; i += 1) {
      if (fn(this.nodes[i])) {
        // remove nodes
        var node = this.nodes.splice(i, 1);
        // remove incident edges
        this.removeEdges(
          this.getIncidentEdges(node[0].id)
        );
        i -= 1;
      }
    }
  }

  // edges
  addEdge() {
    for (var i = 0; i < arguments.length; i += 1) {
      var config = arguments[i];
      assert('source' in config && 'target' in config);
      var source = this.getNode(config.source);
      var target = this.getNode(config.target);
      if (!source || !target) {
        throw Error('edge does not join existing vertices');
      }
      config.source = source;
      config.target = target;
      this.edges.push(
        Graph.edgeDefaults(config)
      );
    }
  }

  getEdge(id) {
    return this.getEdgesByFn((e) => e.id === id)[0];
  }

  getEdgesBetween(u, v) {
    var incidentEdges = this.getIncidentEdges(u);
    return incidentEdges.filter(function (e) {
      return e.target.id === v;
    });
  }

  getAllEdgesBetween(u, v) {
    var incidentEdges = this.getIncidentEdges(u);
    return incidentEdges.filter(function (e) {
      return e.source.id === v || e.target.id === v;
    });
  }

  removeEdge(id) {
    this.removeEdgesByFn(function (e) {
      return e.id === id;
    });
  }

  removeEdges(edges) {
    // TODO: improve n^2 removal
    this.removeEdgesByFn(function (e) {
      return _.find(edges, {id: e.id});
    });
  }

  getEdgesByFn(fn) {
    return this.edges.filter(fn);
  }

  getOutgoingEdges(nodeId) {
    return this.getEdgesByFn((e) => e.source.id === nodeId);
  }

  getIncomingEdges(nodeId) {
    return this.getEdgesByFn((e) => e.target.id === nodeId);
  }

  getIncidentEdges(nodeId) {
    return this.getOutgoingEdges(nodeId)
      .concat(this.getIncomingEdges(nodeId));
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
