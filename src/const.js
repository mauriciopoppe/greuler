'use strict'

import { scaleOrdinal } from 'd3-scale'
import { schemeCategory10 } from 'd3-scale-chromatic'

var color = scaleOrdinal(schemeCategory10)
var colors = {}
var colorLiterals = ['BLUE', 'ORANGE', 'GREEN', 'RED', 'PURPLE', 'BROWN', 'PINK', 'GRAY', 'YELLOW', 'CYAN']
colorLiterals.forEach(function (c, i) {
  colors[c] = color.range()[2 * i]
  colors['LIGHT_' + c] = color.range()[2 * i + 1]
})

colors.randomFromPalette = function () {
  return color.range()[Math.floor(Math.random() * 20)]
}

colors.DEFAULT_NODE = '#2980B9'
colors.DEFAULT_EDGE = '#CCCCCC'

export { colors }
