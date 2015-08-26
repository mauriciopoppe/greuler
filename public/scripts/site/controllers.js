'use strict';

var list = [{
  id: 'dfs',
  name: 'Depth First Search',
  article: 'http://maurizzzio.com/static/graphs/traversal.html'
}, {
  id: 'bfs',
  name: 'Breadth First Search',
  article: 'http://maurizzzio.com/static/graphs/traversal.html'
}, {
  id: 'eulerian-trail',
  name: 'Eulerian Trail',
  article: 'http://maurizzzio.com/static/graphs/special/eulerian-graphs.html'
}, {
  id: 'articulation-points',
  name: 'Articulation Points',
  article: 'http://maurizzzio.com/static/graphs/cut-vertices.html'
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
      example.url = '/greuler/scripts/examples/' + id + '.js'

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
      var root = location.href.split('/#')
      var newTab = 'view-source:' + root[0] + example.url
      window.open(newTab);
    }
    example.article = function () {
      window.open(example.chosen.article)
    }

  })
