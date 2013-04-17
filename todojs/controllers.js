'use strict';

/* Controllers */

function todoListCtrl($scope, todoListClient, $routeParams, $http) {
    $http.defaults.headers.post['Authorization'] = 'Token 09c34730916dee2ccaa71b6c35d2eba689e554b4';
    $scope.reverseAge = 'true';
    $scope.todoListData = todoListClient.get();
    $scope.addTodo = function(){
        $scope.todoListData.name = $scope.todoName;
        $scope.todoListData.desc = $scope.todoDesc;
        $scope.todoListData.$save(function(){
            $scope.todoListData = todoListClient.get();
        });
    };
}