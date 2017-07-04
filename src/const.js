'use strict'

import { scaleOrdinal, schemeCategory20 } from 'd3-scale'

var color = scaleOrdinal(schemeCategory20)
var colors = {}
var colorLiterals = ['BLUE', 'ORANGE', 'GREEN', 'RED', 'PURPLE', 'BROWN', 'PINK', 'GRAY', 'YELLOW', 'CYAN']
colorLiterals.forEach(function (c, i) {
  colors[c] = color.range()[2 * i]
  colors['LIGHT_' + c] = color.range()[2 * i + 1]
})

colors.randomFromPalette = function () {
  return color.range()[Math.floor(Math.random() * 20)]
}

export { colors }
