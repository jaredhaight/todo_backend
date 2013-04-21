'use strict';

/* Controllers */

function todoListCtrl($scope, todoListClient, $routeParams, $http) {
    $http.defaults.headers.common['Authorization'] = 'Token 09c34730916dee2ccaa71b6c35d2eba689e554b4';
    $scope.reverseAge = 'true';
    var todoList = todoListClient.get();
    $scope.todos = todoList;
    $scope.json = 'Nothing here.';
    $scope.addTodo = function(){
        console.log('addTodo')
        $scope.todos.name = $scope.todoName;
        $scope.todos.desc = $scope.todoDesc;
        $scope.todos.$save(function(){
            $scope.todos = todoListClient.get();
        });
    };
    $scope.deleteTodo = function (todo, index) {
        console.log('deleteTodo');
        console.log(index);
        $scope.todos.$delete({todoID: todo.id}, function() {
            $scope.todos.results.splice(index, 1);
        });
    };
    $scope.getTodo = function(todo){
        console.log("getTodo");
        $scope.json = todoListClient.get({todoID: todo.id})
        };
}