'use strict'

import utils from '../utils'
import extend from 'extend'

export default class ElementSelector {
  constructor (owner) {
    this.owner = owner
    this.graph = owner.graph
    this.defaultStyleOptions = {}
  }

  getDefaultStyleOptions () {
    return extend({
      duration: this.getAnimationTime(),
      stroke: '#E74C3C'
    }, this.defaultStyleOptions)
  }

  getStyleOptions (options) {
    return extend({}, this.getDefaultStyleOptions(), options)
  }

  getAnimationTime () {
    return this.owner.options.animationTime
  }

  /**
   * Given a collection of elements returned by the Graph class this methods returns
   * the d3 selection that for all those objects
   *
   * @param {Object[]|Object} els An array of edges/nodes or a single edge/node
   * @return {d3_selection}
   */
  select (els) {
    if (!Array.isArray(els)) {
      els = [els]
    }
    if (!els.length) {
      els.push({ id: -1 })
    }
    els = els.filter(Boolean)
    return this.owner.root.selectAll(
      els.map(function (e) {
        return '#' + utils.ns(e.id)
      }).join(', ')
    )
  }

  /**
   * Selects the path inside the tag <g> that represents an edge
   *
   * @param {d3_selection} selection
   */
  innerEdgeSelector (selection) {
    return selection
      .selectAll('path.base')
  }

  /**
   * Selects the circle inside the tag <g> that represents a node
   *
   * @param {d3_selection} selection
   */
  innerNodeSelector (selection) {
    return selection
      .selectAll('circle')
  }

}
