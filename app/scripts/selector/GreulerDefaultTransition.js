'use strict';

const d3 = window.d3;

import {colors} from '../const';
import extend from 'extend';
import Graph from './Graph';

var HIGHLIGHT = 'highlight';

export default class GreulerDefaultTransition extends Graph {

  innerEdgeSelector(selection) {
    return selection
      .selectAll('path.base');
  }

  innerNodeSelector(selection) {
    return selection
      .selectAll('circle');
  }

  getEdges() {
    return this.innerEdgeSelector(
      this.select(this.graph.edges)
    );
  }

  getNodes() {
    return this.innerNodeSelector(
      this.select(this.graph.nodes)
    );
  }

  doTemporalHighlightNode(selection, options) {
    return this.innerNodeSelector(selection)
      .each(function (d) {
        d.$radius = d3.select(this).attr('r');
      })
      .transition(HIGHLIGHT)
      .duration(this.getAnimationTime() / 2)
      .attr('r', (d) => d.$radius * 1.5)
      .transition(HIGHLIGHT)
      .duration(this.getAnimationTime() / 2)
      .attr('r', (d) => d.$radius)
      .each('end', function (d) {
        delete d.$radius;
      });
  }

  doTemporalHighlightEdges(selection, options) {
    return this.innerEdgeSelector(selection)
      .each(function (d) {
        d.$stroke = d3.select(this).attr('stroke');
      })
    .transition(HIGHLIGHT)
      .duration(this.getAnimationTime() / 2)
      .attr('stroke', options.color)
    .transition(HIGHLIGHT)
      .duration(this.getAnimationTime() / 2)
      .attr('stroke', (d) => d.$stroke)
      .each('end', function (d) {
        delete d.$stroke;
      });
  }

  traverseEdgeWithDirection(selection, options) {
    return selection
      .selectAll('path.traversal')
      .each(function () {
        var el = d3.select(this);
        var l = this.getTotalLength();
        el
          .attr('stroke', options.stroke)
          .attr('stroke-dasharray', `${l} ${l}`)
          .attr('stroke-dashoffset', l)
          .attr('opacity', 1);
      })
      .transition('dasharray')
      .duration(options.duration)
      .attr('stroke-dashoffset', function () {
        var parentDatum = d3.select(this.parentNode).datum();
        var length = this.getTotalLength();
        var twiceLength = length * 2;
        var lengthToMove = 0;
        if (options.source !== -1) {
          if (parentDatum.target.id === options.source) {
            lengthToMove = twiceLength;
          }
        }

        if (options.reverse) {
          lengthToMove = twiceLength - lengthToMove;
        }

        return lengthToMove;
      })
      .attr('opacity', 0)
      .each('end', function () {
        var el = d3.select(this);
        el.attr('stroke-dasharray', null)
          .attr('stroke-dashoffset', null)
          .attr('opacity', 0);
      });
  }

  traverseEdges(selection, options) {
    options = this.updateOptions(options);
    options = extend({
      keepStroke: true,
      reverse: false
    }, options);

    selection.call(this.traverseEdgeWithDirection, options);
    if (options.keepStroke) {
      this.innerEdgeSelector(selection)
        .transition('update')
        .duration(options.duration)
        .attr('stroke', options.stroke);
    }
    return selection;
  }

  // the following functions are intercepted so that
  // options is augmented with the default options

  updateNode(options) {
    options = this.updateOptions(options);
    return this.innerNodeSelector(
      this.select(this.graph.getNode(options.source))
    );
  }

  highlightNode(options) {
    options = this.updateOptions(options);
    return this.doTemporalHighlightNode(
      this.select(this.graph.getNode(options.source)),
      options
    );
  }

  highlightIncidentEdges(options) {
    options = this.updateOptions(options);
    return this.doTemporalHighlightEdges(
      this.select(this.graph.getIncidentEdges(options.source)),
      options
    );
  }

  traverseOutgoingEdges(options) {
    options = this.updateOptions(options);
    return this.traverseEdges(
      this.select(this.graph.getOutgoingEdges(options.source)),
      options
    );
  }

  traverseIncomingEdges(options) {
    options = this.updateOptions(options);
    return this.traverseEdges(
      this.select(this.graph.getIncomingEdges(options.source)),
      options
    );
  }

  traverseIncidentEdges(options) {
    return this.traverseEdges(
      this.select(this.graph.getIncidentEdges(options.source)),
      options
    );
  }

  traverseEdgesBetween(options) {
    options = this.updateOptions(options);
    return this.traverseEdges(
      this.select(
        this.graph.getAllEdgesBetween(
          options.source,
          options.target
        )
      ),
      options
    );
  }
}
