'use strict'

var d3 = window.d3

import utils from '../utils'
import { colors } from '../const'

export default function () {
  var owner

  function inner (selection) {
    var nodes = selection
      .selectAll('g.node')
      .data(function (d) {
        return d.nodes
      }, function (d) {
        return d.id
      })

    var layout = owner.layout

    var g = nodes.enter().append('g')
      .attr('class', function (d) {
        return 'node ' + (d.class || '')
      })
      .attr('id', function (d) { return utils.ns(d.id) })
      .attr('transform', function (d) {
        return utils.transform({ translate: d })
      })
      .on('mouseover', function () {
        var el = d3.select(this)
        if (!el.over) {
          el.style('cursor', 'pointer')
        }
        el.over = true
      })
      .on('mouseout', function () {
        var el = d3.select(this)
        el.over = false
        el.style('cursor', null)
      })
      .attr('opacity', 0)
    g.transition('enter')
      .attr('opacity', 1)
    g.call(layout.drag)

    var dragStart = layout.drag().on('dragstart.d3adaptor')
    var dragEnd = layout.drag().on('dragend.d3adaptor')
    layout.drag()
      .on('dragstart.d3adaptor', function () {
        owner.nodeDragging = true
        dragStart.apply(undefined, arguments)
      })
      .on('dragend.d3adaptor', function () {
        owner.nodeDragging = false
        dragEnd.apply(undefined, arguments)
      })

    g.append('circle')
      .attr('fill', d => d.fill)
      .attr('r', d => d.r)

    // inner label
    g.append('text')
      .classed('label', true)
      .attr('fill', 'white')
      .attr('font-size', '12px')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
    nodes.selectAll('text.label')
      .text(function (d) {
        if ('label' in d) {
          return d.label
        }
        return d.id
      })

    // top-right label
    g.append('text')
      .classed('outer-top-right', true)
      .attr('fill', colors.BLUE)
      .attr('font-size', '9px')
      .attr('text-anchor', 'start')
      .attr('x', d => d.width / 2 - 2)
      .attr('y', d => -d.height / 2 + 3)
    nodes.selectAll('text.outer-top-right')
      .text(function (d) {
        if ('topRightLabel' in d) {
          return d.topRightLabel
        }
      })

    // top-left label
    g.append('text')
      .classed('outer-top-left', true)
      .attr('fill', colors.BLUE)
      .attr('font-size', '9px')
      .attr('text-anchor', 'end')
      .attr('x', d => -d.width / 2 - 2)
      .attr('y', d => -d.height / 2 + 3)
    nodes.selectAll('text.outer-top-left')
      .text(function (d) {
        if ('topLeftLabel' in d) {
          return d.topLeftLabel
        }
      })

    // update
    utils.conditionalTransition(nodes, !owner.nodeDragging)
      .attr('transform', function (d) {
        return utils.transform({
          translate: d
        })
      })

    // exit
    nodes.exit()
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
