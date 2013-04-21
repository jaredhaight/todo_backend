'use strict';

/* Controllers */

function todoListCtrl($scope, todoListClient, $routeParams, $http) {
    $http.defaults.headers.common['Authorization'] = 'Token 09c34730916dee2ccaa71b6c35d2eba689e554b4';
    $scope.reverseAge = 'true';
    var todoList = todoListClient.get();
    $scope.todos = todoList;
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
    $scope.todoCompleted = function(todo, index){
        console.log("todoCompleted");
        var todoobj = todoListClient.get({todoID: todo.id});
        console.log(todoobj);
        var now = new Date();
        todoobj.name = todo.name;
        todoobj.completed = now.toJSON();
        console.log(todoobj.completed);
        console.log(index);
        todoobj.$update({todoID: todo.id}, function(){
            $scope.todos.results[index].completed = now;
            console.log('Todo saved as completed');
        })
    }
}