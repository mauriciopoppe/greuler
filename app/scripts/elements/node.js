'use strict';

var d3 = window.d3;

import utils from '../utils';
import {colors} from '../const';

export default function () {

  var owner;

  function inner(selection) {
    var nodes = selection
      .selectAll('g.node')
      .data(function (d) {
        return d.nodes;
      }, function (d) {
        return d.id;
      });

    var layout = owner.layout;

    var g = nodes.enter().append('g')
      .attr('class', function (d) {
        return 'node ' + (d.class || '');
      })
      .attr('id', function (d) { return utils.ns(d.id); })
      .attr('transform', function (d) {
        return utils.transform({ translate: d });
      })
      .on('mouseover', function (d) {
        var el = d3.select(this);
        if (!el.over) {
          el.style('cursor', 'pointer');
        }
        el.over = true;
      })
      .on('mouseout', function (d) {
        var el = d3.select(this);
        el.over = false;
        el.style('cursor', null);
      })
      .attr('opacity', 0)
      .call(layout.drag);

    var dragStart = layout.drag().on('dragstart.d3adaptor');
    var dragEnd = layout.drag().on('dragend.d3adaptor');
    layout.drag()
      .on('dragstart.d3adaptor', function () {
        owner.nodeDragging = true;
        dragStart.apply(undefined, arguments);
      })
      .on('dragend.d3adaptor', function () {
        owner.nodeDragging = false;
        dragEnd.apply(undefined, arguments);
      });

    g.append('circle')
      .attr('fill', function () { return colors.BLUE; });

    // circle update
    nodes.selectAll('circle')
      .attr('r', function (d) { return d.radius; });

    g.append('text')
      .attr('fill', 'white')
      .attr('font-size', '12px')
      .attr('text-anchor', 'middle')
      .attr('y', (d) => d.height / 4);

    // text update
    nodes.selectAll('text')
      //.attr('opacity', data.labels ? 1 : 0)
      .text(function (d) {
        if ('label' in d) {
          return d.label;
        }
        return d.id;
      });

    // update
    utils.conditionalTransition(nodes, !owner.nodeDragging)
      .attr('opacity', 1)
      .attr('transform', function (d) {
        return utils.transform({
          translate: d
        });
      });

    // exit
    nodes.exit()
      .remove();
  }

  inner.owner = function (value) {
    if (!arguments.length) {
      return owner;
    }
    owner = value;
    return inner;
  };

  return inner;
}
