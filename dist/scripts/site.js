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

var app = angular.module('greuler', ['ngRoute'])
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

angular.module('greuler')
  .controller('RootController', function (Utils) {
    Utils.afterRender()
  })
  .controller('ExampleController', function (Utils, $routeParams, $http) {
    var example = this

    example.list = [
      { id: 'dfs', name: 'Depth First Search' },
      { id: 'bfs', name: 'Breadth First Search' },
      { id: 'eulerian-trail', name: 'Eulerian Trail' }
    ]

    if ($routeParams.id) {
      var id = $routeParams.id
      example.chosen = example.list.filter(function (e) {
        return e.id === id
      })[0]
      //$http({
      //  method: 'GET',
      //  responseType: 'text',
      //  url: '/scripts/examples/' + id + '.js'
      //}).then(function (response) {
      //  example.code = response.data
      //})

      // script
      $.ajax({
        url: '/greuler/scripts/examples/' + id + '.js',
        dataType: "script"
      });
    }

    example.run = function () {
      window.site.run()
    }
  })
