'use strict';

angular.module('greuler')
  .controller('RootController', function (Utils) {
    Utils.afterRender()
  })
  .controller('ExampleController', function (Utils, $routeParams, $http) {
    var example = this
    if ($routeParams.id) {
      var id = $routeParams.id
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
