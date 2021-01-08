'use strict';

var sessionStorageModule = angular.module('myApp.sessionStorage', ['ngRoute'])

sessionStorageModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/sessionStorage', {
    templateUrl: 'sessionStorage/sessionStorage.html',
    controller: 'sessionStorageCtrl'
  });
}])

sessionStorageModule.controller('sessionStorageCtrl', ['$scope', '$window', function($scope, $window) {
  $scope.options = {
    dateOptions: ['Today', 'Last 7 days', 'All time'],
    entries: []
  };

  $scope.init = function() {
    var dateRange = $scope.getActiveDateRange();

    $scope.options.updateDateRange(dateRange);
  }

  $scope.getActiveDateRange = function() {
    var dateRange = $window.sessionStorage.getItem('dateRange');
    if(dateRange) {
      return dateRange;
    } else {
      return 'Today';
    }
  }

  $scope.setActiveDateRange = function(dateRange) {
    $window.sessionStorage.setItem('dateRange', dateRange);
  }

  $scope.options.updateDateRange = function(dateRange) {
    $scope.setActiveDateRange(dateRange);
    $scope.options.activeDateRange = dateRange;
    $scope.options.entries = [];
    $scope.seedEntries(dateRange);
  }

  $scope.seedEntries = function(dateRange) {
    for(let i=14; i > 9; i--) {
      $scope.options.entries.push(
        {date: moment().format('M/DD/YYYY'), text: `Post #${i+1}`}
      )
    }
    if(dateRange==='All time' || dateRange==='Last 7 days') {
      for(let i=9; i>4; i--) {
        $scope.options.entries.push(
          {date: moment().subtract(3, 'days').format('M/DD/YYYY'), text: `Post #${i+1}`}
        )
      }
    }
    if(dateRange==='All time') {
      for(let i=4; i>0; i--) {
        $scope.options.entries.push(
          {date: moment().subtract(20, 'days').format('M/DD/YYYY'), text: `Post #${i+1}`}
        )
      }
    }

  }
}]);

sessionStorageModule.directive("sessionStorageContent", function() {
  return {
      restrict: "EA",
      replace: true,
      scope: {
        options: '='
      },
      templateUrl: "sessionStorage/sessionStorageContent.tpl.html",
      controller: function ($scope) {
      }
  };
});
