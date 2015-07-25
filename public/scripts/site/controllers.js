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
        url: '/scripts/examples/' + id + '.js',
        dataType: "script"
      });
    }

    example.run = function () {
      window.site.run()
    }
  })
