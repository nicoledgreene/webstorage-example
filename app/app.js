'use strict';

// Declare app level module which depends on views, and core components
var app = angular.module('myApp', [
  'ngRoute',
  'myApp.localStorage',
  'myApp.sessionStorage',
  'myApp.version',
  'angularMoment'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/localStorage'});

}]);


app.run(function($rootScope) {
  $rootScope.activeLink = 'localStorage';

  $rootScope.setActiveLink = function(linkName) {
    $rootScope.activeLink = linkName;
  };
})
