'use strict';

var d3 = window.d3;
var cola = window.cola;

import extend from 'extend';
import node from './elements/node';
import edge from './elements/edge';
import {colors} from './const';
import GraphManager from './Graph';
import GreulerDefaultTransition from './selector/GreulerDefaultTransition';

export default class Draw {
  constructor(id, options) {
    this.markerId = 'marker-' + id;

    this.defaultOptions(options);

    // sub-elements that draw stuff
    this.nodeDrawer = node().owner(this);
    this.edgeDrawer = edge().owner(this);

    // graph handles the interactions with the drawer
    this.graph = new GraphManager(this, this.options.data);
    this.selector = new GreulerDefaultTransition(this);

    this.update();
  }

  /**
   *
   * @param {Object} options
   *
   * options
   *   - target {string} selector to the element to hold the graph
   *   - width {number}
   *   - height {number}
   *   - labels=true {boolean} False to hide the vertex labels
   *   - directed=false {boolean} True to give an orientation to the edges
   *   have an edge
   *   - data {Object}
   *     - linkDistance=90 {number} Forced min distance between vertices that
   *     - constraints {Array[Objects]}
   *     - groups {Array[Objects]}
   *     - nodes {Array[Objects]}
   *       - r=10 {number} node radius
   *     - links {Array[Objects]}
   *       - directed=false {boolean} true to give an orientation to this edge
   *       - weight="" {string} Label of the edge (can be the weight)
   *
   */
  defaultOptions(options) {
    // graph defaults
    options = this.options = extend({
      width: 700,
      height: 300,
      animationTime: 1000,
      labels: true,
      directed: false
    }, options);

    // graph node/edge defaults
    this.options.data.nodes =
      this.options.data.nodes.map(GraphManager.appendNodeDefaults, this);
    this.options.data.links =
      this.options.data.links.map(GraphManager.appendEdgeDefaults, this);

    this.options.data = extend({
      nodes: [],
      links: [],
      groups: [],
      constraints: [],
      avoidOverlaps: true,
      size: [options.width, options.height],
      linkDistance: function (d) {
        return d.linkDistance || 70;
      }
    }, this.options.data);
  }

  initLayout() {
    var options = this.options;
    var hasLayout = !!this.layout;

    if (!hasLayout) {
      this.layout = cola.d3adaptor();
      this.tick();
    }
    Object.keys(options.data).forEach(function (k) {
      var v = options.data[k];
      this.layout[k](v);
    }, this);

    this.layout.start();
  }

  tick() {
    var self = this;
    // event tick is fired async
    this.layout.on('tick', function () {
      self.edgeGroup.call(self.edgeDrawer);
      self.nodeGroup.call(self.nodeDrawer);
    });
    //this.layout.on('end', function () {
      //console.log('layout end');
    //});
  }

  update() {
    this.initLayout();
    this.build();
  }

  build() {
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
      .attr('fill-opacity', 1)
      .attr('fill', '#777');

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

}
