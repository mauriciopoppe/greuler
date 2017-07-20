'use strict'

export default function () {
  /*eslint-disable */
  (function (doc, proto) {
    try { // check if browser supports :scope natively
      doc.querySelector(':scope body')
    } catch (err) { // polyfill native methods if it doesn't
      ['querySelector', 'querySelectorAll'].forEach(function (method) {
        var native = proto[method]
        proto[method] = function (selectors) {
          if (/(^|,)\s*:scope/.test(selectors)) { // only if selectors contains :scope
            var id = this.id // remember current element id
            this.id = 'ID_' + Date.now() // assign new unique id
            selectors = selectors.replace(/((^|,)\s*):scope/g, '$1#' + this.id); // replace :scope with #ID
            var result = doc[method](selectors)
            this.id = id // restore previous id
            return result
          } else {
            return native.call(this, selectors) // use native code for other selectors
          }
        }
      })
    }
  })(window.document, Element.prototype)

  // from https://gist.github.com/joelambert/1002116
  //
  // requestAnimationFrame() shim by Paul Irish
  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function ( /* function */ callback, /* DOMElement */ element) {
      window.setTimeout(callback, 1000 / 60)
    }
  })()

  /**
   * Behaves the same as setTimeout except uses requestAnimationFrame() where possible for better performance
   * @param {function} fn The callback function
   * @param {int} delay The delay in milliseconds
   */
  window.requestTimeout = function (fn, delay) {
    if ( !window.requestAnimationFrame &&
      !window.webkitRequestAnimationFrame &&
      !(window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
      !window.oRequestAnimationFrame &&
      !window.msRequestAnimationFrame)
      return window.setTimeout(fn, delay)

    var start = new Date().getTime()
    var handle = {}

    function loop () {
      var current = new Date().getTime(),
        delta = current - start

      delta >= delay ? fn.call() : handle.value = requestAnimFrame(loop)
    }

    handle.value = requestAnimFrame(loop)
    return handle
  }

  /**
   * Behaves the same as clearTimeout except uses cancelRequestAnimationFrame() where possible for better performance
   * @param {int|object} handle The callback function
   */
  window.clearRequestTimeout = function (handle) {
    window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
      window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(handle.value) :
        window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value) : /* Support for legacy API */
          window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
            window.oCancelRequestAnimationFrame	? window.oCancelRequestAnimationFrame(handle.value) :
              window.msCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame(handle.value) :
                clearTimeout(handle)
  }
/*eslint-enable */
}
