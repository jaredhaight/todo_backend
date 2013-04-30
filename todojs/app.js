'use strict';


// Declare app level module which depends on filters, and services
angular.module('todojs', ['todojs.filters', 'todojs.directives','todoListSvc']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/list', {templateUrl: 'partials/todolist.html', controller: todoListCtrl});
    $routeProvider.when('/user/:username', {templateUrl: 'partials/userlist.html', controller: userListCtrl});
    $routeProvider.otherwise({redirectTo: '/list'});
  }]);
