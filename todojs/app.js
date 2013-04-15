'use strict';


// Declare app level module which depends on filters, and services
angular.module('todojs', ['todojs.filters', 'todojs.directives','todoListSvc']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/list', {templateUrl: 'partials/list.html', controller: todoListCtrl});
    $routeProvider.otherwise({redirectTo: '/list'});
  }]);
