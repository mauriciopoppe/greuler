'use strict';

var d3 = window.d3;
var cola = window.cola;

import extend from 'extend';
import util from './utils';
import node from './elements/node';
import edge from './elements/edge';

class Draw {
  constructor(id) {
    this.id = id;
    this.markerId = 'marker-' + id;

    // sub-elements that draw stuff
    this.nodeDrawer = node().owner(this);
    this.edgeDrawer = edge().owner(this);
  }

  setOptions(options) {
    options.data = extend({
      groups: [],
      constraints: []
    }, options.data);

    // data defaults
    options.data.nodes.forEach(function (v) {
      if (!v.hasOwnProperty('id')) {
        v.id = util.id();
      }
      v.radius = v.radius || 10;
      v.width = v.width || 2 * v.radius;
      v.height = v.height || 2 * v.radius;
    });
    if (options.data.edges) {
      options.data.links = options.data.edges;
    }
    options.data.links.forEach(function (e) {
      if (!e.hasOwnProperty('id')) {
        e.id = util.id();
      }
    });

    options = this.options = extend({
      width: 700,
      height: 300,
      linkDistance: 90,
      labels: true,
      //treeLayout: false,
      directed: false,
      draggable: true
    }, options);

    var hasLayout = !!this.layout;

    if (!hasLayout) {
      this.layout = cola.d3adaptor();
      //this.layout = d3.force.layout();
    //} else {
    //  this.layout.stop();
    }

    this.layout
      .linkDistance(function (d) {
        return d.linkDistance || options.linkDistance;
      })
      .avoidOverlaps(true)
      //.handleDisconnected(true)
      //.convergenceThreshold(0.1)
      .size([options.width, options.height])
      .nodes(options.data.nodes)
      .links(options.data.links)
      .constraints(options.data.constraints)
      .groups(options.data.groups);

    //if (!hasLayout) {
    //  this.layout.start();
    //} else {
    //  this.layout.start();
    //}
    this.layout.start();
  }

  /**
   *
   * @param {Object} options
   *
   * options
   *   - target {string} selector to the element to hold the graph
   *   - data {Object}
   *     - groups {Array[Objects]}
   *     - nodes {Array[Objects]}
   *     - links {Array[Objects]}
   *       - class="" {string} additional class set to the edge
   *       - directed=false {boolean} true to give an orientation to this edge
   *       - value="" {string} Label of the edge (can be the weight)
   *     - width {number}
   *     - height {number}
   *     - linkDistance=90 {number} Forced min distance between vertices that
   *     have an edge
   *     - labels=true {boolean} False to hide the vertex labels
   *     - draggable=false {boolean} True to enable node drag
   *     - tree=false {boolean} True to layout the graph as a tree
   *     - directed=false {boolean} True to give an orientation to the edges
   *     - highlightIncomingEdges=false {boolean} true to highlight the incoming
   *     edges of a vertex on mouseover
   *     - highlightOutgoingEdges=false {boolean} true to highlight the outgoing
   *     edges of a vertex on mouseover
   *
   */
  update(options) {
    this.setOptions(options);
    this.buildRoot();
    this.doLayout();
    return this;
  }

  buildRoot() {
    this.root = d3.select(this.options.target)
      .selectAll('svg.greuler')
      .data([this.options]);

    // enter
    this.root.enter = this.root.enter()
      .append('svg')
      .attr('class', 'greuler');

    // marker def
    this.root.enter
      .append('svg:defs')
      .append('svg:marker')
      .attr('id', this.markerId)
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 20)
      .attr('markerWidth', 5)
      .attr('markerHeight', 5)
      .attr('orient', 'auto')
      .append('svg:path')
      .attr('d', 'M0,-4L10,0L0,4L2,0')
      .attr('stroke-width', '0px')
      .attr('fill-opacity', .8)
      .attr('fill', 'black');

    // update
    this.root
      .attr('width', this.options.width)
      .attr('height', this.options.height);

    // wrapper for the edges
    this.edgeGroup = this.root
      .selectAll('g.edges')
      .data(function (d) { return [d.data]; });
    this.edgeGroup
      .enter().append('g')
      .attr('class', 'edges');

    // wrapper for the nodes
    this.nodeGroup = this.root
      .selectAll('g.nodes')
      .data(function (d) { return [d.data]; });
    this.nodeGroup
      .enter().append('g')
      .attr('class', 'nodes');
  }

  doLayout() {
    var self = this;

    //var layout = this.layout
    //  .linkDistance(function (d) {
    //    return d.linkDistance || options.linkDistance;
    //  })
    //  .avoidOverlaps(true)
    //  // .handleDisconnected(true)
    //  .size([options.width, options.height])
    //  // .convergenceThreshold(0.1)
    //  .nodes(options.data.nodes)
    //  .links(options.data.links)
    //  .constraints(options.data.constraints)
    //  .groups(options.data.groups);
    //if (data.tree) {
    //  layout
    //    .flowLayout('y', 50)
    //    .symmetricDiffLinkLengths(20);
    //}
    //layout.start();

    this.layout.on('tick', function () {
      self.edgeGroup.call(self.edgeDrawer);
      self.nodeGroup.call(self.nodeDrawer);
    });
    //this.layout.on('end', function () {
    //});
  }

  // public

}

export default Draw;
