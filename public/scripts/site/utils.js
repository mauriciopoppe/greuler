'use strict';

angular.module('greuler')
  .factory('Utils', function () {
    return {
      afterRender: function () {
        d3.selectAll('pre code')
          .each(function () {
            hljs.highlightBlock(this);
          });
      }
    }
  });
