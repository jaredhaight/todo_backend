'use strict';

/* Controllers */

function todoListCtrl($scope, todoListClient, $routeParams) {
    var data = todoListClient.get();
    $scope.todoListData = data;
}