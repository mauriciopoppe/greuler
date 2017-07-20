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

'use strict';

var app = angular.module('greuler', ['ngRoute', 'ngSanitize'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'root.html',
        controller: 'RootController as root'
      })
      .when('/api', { templateUrl: 'api.html' })
      .when('/playground', { templateUrl: 'playground.html' })
      .when('/examples', {
        redirectTo: '/examples/dfs'
      })
      .when('/examples/:id', {
        controller: 'ExampleController as example',
        templateUrl: 'example.html'
      })
      .otherwise({
        redirectTo: '/'
      })
  })
  .run(function ($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function () {
      if (window.site.generator) {
        window.site.generator.pause()
        delete window.site.generator
      }
    })
  })

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

'use strict';

var list = [{
  id: 'dfs',
  name: 'Depth First Search',
  article: 'http://maurizzzio.com/static/graphs/traversal.html'
}, {
  id: 'bfs',
  name: 'Breadth First Search',
  article: 'http://maurizzzio.com/static/graphs/traversal.html',
  annotation: '<p>Legend:</p> <p class="small">Number on the right: The distance from this node to the node with id = 0</p>'
}, {
  id: 'eulerian-trail',
  name: 'Eulerian Trail',
  article: 'http://maurizzzio.com/static/graphs/special/eulerian-graphs.html',
  annotation: '<p>Note: the edges are highlighted after preprocessing the trail</p>'
}, {
  id: 'articulation-points',
  name: 'Articulation Points',
  article: 'http://maurizzzio.com/static/graphs/cut-vertices.html',
  annotation: '<p>Legend:</p> <p class="small">Number on the left: the time a node was discovered <br />' +
    'Number on the right: the lowest time of some node that can be reached from this node</p>'
}]

angular.module('greuler')
  .controller('RootController', function (Utils) {
    Utils.afterRender()
  })
  .controller('ExampleController', function (Utils, $routeParams, $http) {
    var example = this
    var $runner = $('#runner')

    example.list = list

    if ($routeParams.id) {
      var id = $routeParams.id
      example.chosen = example.list.filter(function (e) {
        return e.id === id
      })[0]
      example.url = 'scripts/examples/' + id + '.js'

      // fetch script (the id is the filename)
      $.ajax({
        url: example.url,
        dataType: 'script'
      })
    }

    example.run = function () {
      window.site.run()
      $runner.prop('disabled', true)
    }
    example.source = function () {
      var root = location.href.split('#')
      var newTab = 'view-source:' + root[0] + example.url
      window.open(newTab);
    }
    example.article = function () {
      window.open(example.chosen.article)
    }

  })
