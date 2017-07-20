'use strict'

import extend from 'extend'
import { default as defined } from 'defined'
import { line, curveBundle } from 'd3-shape'
import { select } from 'd3-selection'

import { Vector } from '../Vector'
import { transform, ns } from '../utils'

export function Edge () {
  var owner

  function moveTowardsPoint (point, middle) {
    var margin = point.r
    var unit = Vector.unit(Vector.sub(middle, point))
    return Vector.add(point, Vector.scale(unit, margin))
  }

  /**
   * Computes the inner points of a loop edge
   *
   * - analyzes each adjacent vertex
   *  - for each each edge u-v move the opposite way e.g. v->u
   *  - the sum of unit vectors will give roughly a good approximation
   *
   * @param {Object} u Vertex
   * @param {number} marginBetweenEdges Defined in `createPath`
   * @param {number} count The number of u-u edges found yet
   * @returns {{path: *[], dir: *}}
   */
  function selfLoop (u, marginBetweenEdges, count) {
    var adjacent = owner.graph.getAdjacentNodes(u)
    var dir = new Vector(0, 0)
    for (var i = 0; i < adjacent.length; i += 1) {
      var v = adjacent[i]
      if (u.id !== v.id) {
        dir = Vector.unit(Vector.add(
          dir,
          Vector.unit(Vector.sub(u, v))
        ))
      }
    }

    function toRad (a) {
      return a * Math.PI / 180
    }

    // no adjacent vertices
    if (dir.x === 0 && dir.y === 0) {
      dir = Vector.unit(new Vector(0, -1))
    }

    var ort = Vector.orthogonal(dir)

    // moving u towards `dir` `u.r` units
    var uBorderOrigin = Vector.scale(dir, u.r + 4)
    // var uBorderOriginTwice = Vector.scale(dir, u.r * 2)
    // uD is now in the edge of the circle, making a little arc in the circle

    // endpoints of the edge will have a separation of 25 deg, 50 deg, 75 deg, ...
    var separation = toRad(25)
    var angle = separation + (count - 1) * separation

    // the point to the left of u + uBorder
    var uBorderLeft = Vector.add(u, Vector.rotate(uBorderOrigin, angle))
    // the point to the right of u + uBorder
    var uBorderRight = Vector.add(u, Vector.rotate(uBorderOrigin, -angle))

    // some length away from the node computed by doing random samples
    var length = (marginBetweenEdges * 0.6) * (count + 1)

    /*
     * Form the shape of a weird rhombus
     *
     *
     *            up
     *           /  \
     *          /    \
     *         /      \
     *        /        \
     *     left       right
     *       \         /
     *     border   border
     *
     */
    var up = Vector.add(u, Vector.scale(dir, u.r + length))

    var midLeft = Vector.add(uBorderLeft, Vector.scale(dir, length * 0.5))
    var midRight = Vector.add(uBorderRight, Vector.scale(dir, length * 0.5))

    var left = Vector.add(midLeft, Vector.scale(ort, length / 4))
    var right = Vector.add(midRight, Vector.scale(ort, -length / 4))

    return {
      path: [uBorderLeft, left, up, right, uBorderRight],
      dir: ort
    }
  }

  /**
   * Creates the points of the <path> that represent an edge
   *
   * @param {Object} d Edge
   * @param {Object} meta Holds the edge count between vertices,
   * unit vectors and other metadata
   * @param {number} marginBetweenEdges Used in both normal and
   * loop edges sets the separation between edges from the mid
   * point of the vertices they join
   */
  function createPath (d, meta, marginBetweenEdges) {
    var u, v
    var uBorder, vBorder
    var current

    u = d.source
    v = d.target
    if (u.id > v.id) {
      [u, v] = [v, u]
    }
    meta[u.id] = meta[u.id] || {}

    // the mid point is computed from the borders of both nodes
    // the mid point is used to determine the position of the label
    uBorder = u
    vBorder = v
    if (u.id !== v.id) {
      uBorder = moveTowardsPoint(u, v)
      vBorder = moveTowardsPoint(v, u)
    }

    current = (meta[u.id][v.id] = meta[u.id][v.id] || {
      count: 1,
      mid: Vector.mid(uBorder, vBorder),
      direction: -1
    })

    var innerJoints = []
    if (u.id === v.id) {
      // apply the following for self-loop edges
      var loop = selfLoop(u, marginBetweenEdges, current.count)
      innerJoints = loop.path
      d.unit = loop.dir
    } else {
      var unit = Vector.unit(Vector.sub(v, u))
      extend(current, {
        unit: unit,
        unitOrthogonal: Vector.orthogonal(unit)
      })
      innerJoints.push(Vector.add(
        current.mid,
        Vector.scale(
          current.unitOrthogonal,
          Math.floor(current.count / 2) * marginBetweenEdges * current.direction
        )
      ))
      d.unit = current.unit
    }

    current.count += 1
    current.direction *= -1

    // problem: the edge starts/ends in the center of some node
    //
    // real solution: render the path normally then compute the position of a point
    // with `path.getPointAtLength(t * l)` where `l` is the length of the path and
    // `t` an interpolated place = radius of each node
    //
    // simple trick: shorten the length of the edge by moving the start/end points
    // of the edges toward each other
    var source = moveTowardsPoint(d.source, innerJoints[0])
    var target = moveTowardsPoint(d.target, innerJoints[innerJoints.length - 1])

    d.path = [source]
      .concat(innerJoints)
      .concat([target])
  }

  function weightPosition (selection) {
    selection
      .attr('transform', function (d) {
        var angle = Vector.angleDeg(d.unit)
        var v = d.path[Math.floor(d.path.length / 2)]
        return transform({
          translate: v,
          rotate: angle
        })
      })
  }

  var pathCreator = line()
    .x(function (d) { return d.x })
    .y(function (d) { return d.y })
    .curve(curveBundle.beta(1))
    // .tension(1.5)
    // .interpolate('bundle')
    // .interpolate('linear')

  function inner (selection) {
    var links = selection
      .selectAll('g.edge')
      .data(d => d.links, d => d.id)

    const linksEnter = links.enter().append('g')
    linksEnter
        .attr('class', 'edge')
        // .attr('opacity', 0)
        .attr('id', d => ns(d.id))
      // .transition('enter')
        .attr('opacity', 1)
      .merge(links)
        .each(function (d) {
          var self = select(this)
          self.classed(`source-${d.source.id}`, true)
          self.classed(`target-${d.target.id}`, true)
          self.classed('directed', defined(d.directed, owner.options.directed))
        })

    const linksAll = linksEnter.merge(links)

    var meta = {}
    linksAll.each(function (d) {
      createPath(d, meta, 17)
    })

    // path enter
    var paths = linksAll.selectAll('path')
      .data(function (d) {
        // 1. real path
        // 2. stroke-dasharray helper
        return [d, d]
      })
    const pathsEnter = paths.enter().append('path')
      .attr('stroke', d => d.stroke)
      .attr('fill', 'transparent')
      .attr('stroke-width', 2)
      .each(function (d, i) {
        var el = select(this)
        el.attr('opacity', !i ? 1 : 0)
        if (i === 0) {
          el.classed('base', true)
        }
        if (i === 1) {
          el.attr('stroke-width', 5)
          el.classed('traversal', true)
        }
      })

    const pathsAll = pathsEnter.merge(paths)

    // path update
    // utils.conditionalTransition(pathsAll, !owner.nodeDragging)
    pathsAll
      .attr('d', d => pathCreator(d.path))

    pathsAll.each(function (d, i) {
      var path = select(this)
      var parent = select(this.parentNode)
      if (i === 0) {
        path.attr('marker-end',
          parent.classed('directed')
            ? 'url(#' + owner.markerId + ')'
            : null
        )
      }
    })

    var weights = linksAll.selectAll('text')
      .data(d => [d])

    // weights enter
    const weightsEnter = weights.enter().append('text')
    weightsEnter
      .attr('font-size', '9px')
      .attr('dominant-baseline', 'text-after-edge')
      .attr('text-anchor', 'middle')
      .call(weightPosition)

    const weightsAll = weightsEnter.merge(weights)

    // weights update
    // utils.conditionalTransition(weightsAll, !owner.nodeDragging)
    weightsAll
      .text(d => d.weight)
      .call(weightPosition)

    // weight exit
    weights.exit()
      .remove()

    // exit
    links.exit()
      .remove()
  }

  inner.owner = function (value) {
    if (!arguments.length) {
      return owner
    }
    owner = value
    return inner
  }

  return inner
}
