'use strict';

export default {
  id: function () {
    var letter = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    return letter + Math.random().toString(16).substr(2);
  },

  transform: function (o) {
    var str = ``;
    if ('translate' in o) {
      str += ` translate(${o.translate.x}, ${o.translate.y})`;
    }
    if ('rotate' in o) {
      str += ` rotate(${o.rotate})`;
    }
    return str;
  },

  transition: function (el, doTransition) {
    if (doTransition) {
      return el
        .transition()
        .ease('linear');
    }
    return el;
  }
};
