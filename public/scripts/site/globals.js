'use strict';
(function () {
  var site = window.site = {};
  site.vivusDefault = {
    type: 'oneByOne',
    duration: 50
  };

  site.fnShowcase = function (fns, ns) {
    var d3 = window.d3;
    var description = d3.select('#' + ns + '-description');
    var title = d3.select('#' + ns + '-title');
    var numbers = d3.select('#' + ns + '-numbers');

    function replaceText(d) {
      var items = d.fn.toString().split('\n')
        .map(function (d) {
          return d.replace(/^\s{6}/, '');
        });
      items.pop();
      items.shift();
      description.html(items.join('\n'));
      hljs.highlightBlock(description.node());
    }

    replaceText(fns[0]);

    numbers
      .selectAll('span')
      .data(function () { return fns; })
      .enter()
      .append('span')
      .html(function (d, i) { return i + 1; })
      .on('click', function (d) { d.fn(); })
      .on('mouseover', function (d) {
        replaceText(d);
        title.html(d.title);
      })
      .on('mouseout', function () {
        title.html(null);
      });
  }
})();
