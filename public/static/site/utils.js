'use strict';

angular.module('greuler')
  .factory('Utils', function () {
    return {
      afterRender: function () {
        Array.from(document.querySelectorAll('pre code'))
          .forEach(function (el) {
            hljs.highlightBlock(el);
          });
      }
    }
  });
