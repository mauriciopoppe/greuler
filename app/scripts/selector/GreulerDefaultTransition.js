'use strict';

const d3 = window.d3;

import {colors} from '../const';
import Graph from './Graph';

var TEMP = 'temp';

function visitAfterLineAnimation(selection, options) {
  d3.timer(function () {
    selection
      .selectAll('path.base')
      .attr('opacity', 1)
      .attr('stroke', colors.ORANGE);
  }, options.duration);
}

function animateLine(edge, options) {
  options = options || {};
  edge
    .selectAll('path.traversal')
    .each(function () {
      var el = d3.select(this);
      var l = this.getTotalLength();
      el
        .attr('stroke', colors.ORANGE)
        .attr('stroke-dasharray', `${l} ${l}`)
        .attr('stroke-dashoffset', l)
        .attr('opacity', 1);
    })
    .transition('dasharray')
    .duration(options.duration)
    .attr('stroke-dashoffset', function (d) {
      var parentDatum = d3.select(this.parentNode).datum();
      var l = this.getTotalLength();

      // reverse animation
      if (options.source !== -1) {
        if (parentDatum.target.id === options.source) {
          return l * 2;
        }
      }
      return 0;
    })
    .each('end', function () {
      var el = d3.select(this);
      el.attr('stroke-dasharray', null)
        .attr('stroke-dashoffset', null)
        .attr('opacity', 0);
    });
}

export default class GreulerDefaultTransition extends Graph {

  doTemporalHighlightNode(els) {
    return els
      .selectAll('circle')
      .each(function (d) {
        d.$radius = d3.select(this).attr('r');
      })
      .transition(TEMP)
      .duration(this.getAnimationTime() / 2)
      .attr('r', (d) => d.$radius * 2)
      .transition(TEMP)
      .duration(this.getAnimationTime() / 2)
      .attr('r', (d) => d.$radius)
      .each('end', function (d) {
        delete d.$radius;
      });
  }

  doTemporalHighlightEdges(els) {
    return els
      .selectAll('path.base')
      .each(function (d) {
        d.$stroke = d3.select(this).attr('stroke');
      })
    .transition(TEMP)
      .duration(this.getAnimationTime() / 2)
      .attr('stroke', colors.RED)
    .transition(TEMP)
      .duration(this.getAnimationTime() / 2)
      .attr('stroke', (d) => d.$stroke)
      .each('end', function (d) {
        delete d.$stroke;
      });
  }

  traverseEdges(els, source = -1) {
    var options = {
      duration: this.getAnimationTime(),
      source: source
    };
    els
      .call(animateLine, options)
      .call(visitAfterLineAnimation, options);
  }

  highlightNode(id) {
    return this.doTemporalHighlightNode(
      this.select(this.graph.getNode(id))
    );
  }

  highlightIncidentEdges(id) {
    return this.doTemporalHighlightEdges(
      this.select(this.graph.getIncidentEdges(id))
    );
  }

  traverseOutgoingEdges(id) {
    return this.traverseEdges(
      this.select(this.graph.getOutgoingEdges(id)),
      id
    );
  }

  traverseIncomingEdges(id) {
    return this.traverseEdges(
      this.select(this.graph.getIncomingEdges(id)),
      id
    );
  }

  traverseIncidentEdges(id) {
    return this.traverseEdges(
      this.select(this.graph.getIncidentEdges(id)),
      id
    );
  }

  traverseEdgesBetween(u, v) {
    return this.traverseEdges(
      this.select(this.graph.getAllEdgesBetween(u, v)),
      // optional parameter telling the source
      u
    );
  }
}
