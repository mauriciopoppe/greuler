'use strict';

var d3 = window.d3;

import {colors} from '../const';
import extend from 'extend';
import Vector from '../Vector';
import utils from '../utils';

export default function () {

  var owner;

  function selfLoop(u, margin) {
    var adjacent = owner.graph.getAdjacentNodes(u.id);
    var dir = new Vector(0, 0);
    for (var i = 0; i < adjacent.length; i += 1) {
      var v = adjacent[i];
      if (u.id !== v.id) {
        dir = Vector.unit(Vector.add(
          dir,
          Vector.unit(Vector.sub(u, v))
        ));
      }
    }
    var k = 0.8;
    var up = Vector.add(u, Vector.scale(dir, margin * k));
    var mid = Vector.mid(u, up);
    var ort = Vector.orthogonal(dir);

    var right = Vector.add(mid, Vector.scale(ort, margin / 2 * k));
    var left = Vector.add(mid, Vector.scale(ort, -margin / 2 * k));

    return {
      path: [left, up, right],
      dir: ort
    };
  }

  function createPath(d, meta, margin) {
    var u, v;
    var current;

    u = d.source;
    v = d.target;
    if (u.id > v.id) {
      [u, v] = [v, u];
    }
    meta[u.id] = meta[u.id] || {};

    current = (meta[u.id][v.id] = meta[u.id][v.id] || {
      count: 1,
      mid: Vector.mid(u, v),
      direction: -1
    });

    var innerJoints = [];

    if (u.id === v.id) {
      // apply the following for self-loop edges
      var loop = selfLoop(u, margin * (current.count + 1));
      innerJoints = loop.path;
      d.unit = loop.dir;
    } else {
      extend(current, {
        unit: Vector.unit(Vector.sub(v, u)),
        unitInverse: Vector.orthogonal(
          Vector.unit(Vector.sub(v, u))
        )
      });
      innerJoints.push(Vector.add(
        current.mid,
        Vector.scale(
          current.unitInverse,
          Math.floor(current.count / 2) * margin * current.direction
        )
      ));
      d.unit = current.unit;
    }

    current.count += 1;
    current.direction *= -1;
    d.path = [d.source]
      .concat(innerJoints)
      .concat([d.target]);
  }

  var line = d3.svg.line()
    .x(function (d) { return d.x; })
    .y(function (d) { return d.y; })
    .tension(1.5)
    .interpolate('bundle');

  function inner(selection) {
    // edges
    var links = selection.selectAll('g.edge')
      .data(function (d) {
        return d.links;
      }, function (d) {
        return d.id;
      });
    links.enter().append('g')
      .attr('class', 'edge')
      .attr('opacity', 0)
      .attr('id', function (d) { return utils.ns(d.id); })
      .transition('enter')
      .attr('opacity', 1);

    // update
    links
      .each(function (d) {
        var self = d3.select(this);
        var cls = {
          directed: d.directed || owner.options.directed
        };
        cls['source-' + d.source.id] = true;
        cls['target-' + d.target.id] = true;
        self.classed(cls);
      });

    var meta = {};
    links.each(function (d) {
      createPath(d, meta, 17);
    });

    // path enter
    var paths = links.selectAll('path')
      .data(function (d) {
        // 1. real path
        // 2. stroke-dasharray helper
        return [d.path, d.path];
      });
    paths.enter()
      .append('path')
      .attr('stroke', function () {
        var parent = d3.select(this.parentNode).datum();
        return parent.stroke;
      })
      .attr('fill', 'transparent')
      .attr('stroke-width', 2)
      .each(function (d, i) {
        var el = d3.select(this);
        el.attr('opacity', !i ? 1 : 0);
        if (i === 0) {
          el.classed('base', true);
        }
        if (i === 1) {
          el.attr('stroke-width', 5);
          el.classed('traversal', true);
        }
      })
      .attr('d', function () {
        var parent = d3.select(this.parentNode).datum();
        return line([parent.source]);
      });

    // path update
    utils.conditionalTransition(paths, !owner.nodeDragging)
      .attr('d', line);

    paths.each(function (d, i) {
      var path = d3.select(this);
      var parent = d3.select(this.parentNode);
      if (i === 0) {
        path.attr('marker-end',
          parent.classed('directed')
            ? 'url(#' + owner.markerId + ')'
            : null
        );
      }
    });

    function weightPosition(selection) {
      selection
        .attr('transform', function (d) {
          var angle = Vector.angleDeg(d.unit);
          var v = d.path[Math.floor(d.path.length / 2)];
          return utils.transform({
            translate: v,
            rotate: angle
          });
        });
    }

    var weights = links.selectAll('text')
      .data(function (d) { return [d]; });

    // weight enter
    weights.enter()
      .append('text')
      .attr('font-size', '9px')
      .attr('dominant-baseline', 'text-after-edge')
      .attr('text-anchor', 'middle')
      .call(weightPosition);

    // weight update
    utils.conditionalTransition(weights, !owner.nodeDragging)
      .text((d) => d.weight)
      .call(weightPosition);

    // weight exit
    weights.exit()
      .remove();

    // exit
    links.exit()
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
