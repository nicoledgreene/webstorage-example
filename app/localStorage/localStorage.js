'use strict';

var localStorageModule = angular.module('myApp.localStorage', ['ngRoute'])

localStorageModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/localStorage', {
    templateUrl: 'localStorage/localStorage.html',
    controller: 'localStorageCtrl'
  });
}])

localStorageModule.controller('localStorageCtrl', ["$scope", "$window", function($scope, $window) {
  $scope.options = {};
  $scope.welcomeMessages = {
    'English': 'Welcome to the app',
    'Español': 'Bienvenida a la aplicación',
    'Français': `Bienvenue sur l'appli`,
    'Deutsch': 'Willkommen in der App'
  };

  $scope.init = function() {
    var preferredLanguage = $scope.getActiveLanguage();

    $scope.options.languages = ['English', 'Español', 'Français', 'Deutsch'];
    
    $scope.options.updateLanguage(preferredLanguage);
  }

  $scope.options.updateLanguage = function(language) {
    $scope.setActiveLanguage(language);
    $scope.options.activeLanguage = language;
    $scope.options.welcomeMessage = $scope.welcomeMessages[language];
  };

  $scope.getActiveLanguage = function() {
    var language = $window.localStorage.getItem('lang');
    if(language) {
      return language;
    } else {
      return 'English';
    }
  }

  $scope.setActiveLanguage = function(language) {
    $window.localStorage.setItem('lang', language);
  }
}]);

localStorageModule.directive("localStorageContent", function() {
  return {
      restrict: "EA",
      replace: true,
      scope: {
        options: '='
      },
      templateUrl: "localStorage/localStorageContent.tpl.html",
      controller: function ($scope) {
        
      }
  };
});
