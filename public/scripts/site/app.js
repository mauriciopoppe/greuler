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
