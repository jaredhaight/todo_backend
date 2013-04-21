'use strict';

/* Controllers */

function todoListCtrl($scope, todoListClient, $routeParams, $http) {
    $http.defaults.headers.common['Authorization'] = 'Token 09c34730916dee2ccaa71b6c35d2eba689e554b4';
    $scope.reverseAge = 'true';
    $scope.editing = 'false';
    var todoList = todoListClient.get();
    $scope.todos = todoList;
    console.log($scope.todos);

    $scope.addTodo = function(){
        var newTodo = new todoListClient;
        newTodo.name = $scope.todoName;
        newTodo.desc = $scope.todoDesc;
        newTodo.$save(function(){
            $scope.todos.results.push(newTodo);
            $scope.undoEdit();
        });
    };

    $scope.deleteTodo = function (todo, index) {
        console.log('deleteTodo');
        console.log(index);
        $scope.todos.$delete({todoID: todo.id}, function() {
            $scope.todos.results.splice($scope.todos.results.indexOf(todo), 1);
        });
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
            var index = $scope.todos.results.indexOf(todo);
            $scope.todos.results[index].completed = now.toJSON();
            $scope.todos.results[index].updated = now.toJSON();
            console.log('Todo saved as completed');
        });
    };

    $scope.enableEdit = function(todo) {
        $scope.todoName = todo.name;
        $scope.todoDesc = todo.desc;
        $scope.editing = 'true';
        $scope.todoEditObj = todo;
        console.log($scope.editing);
    };

    $scope.undoEdit = function() {
        $scope.todoName = '';
        $scope.todoDesc = '';
        $scope.todoEditObj = null;
        $scope.editing = 'false';
    };

    $scope.editTodo = function(todo) {
        var todoObj = todoListClient.get({todoID: todo.id});
        todoObj.name = $scope.todoName;
        todoObj.desc = $scope.todoDesc;
        todoObj.$update({todoID: todo.id}, function(){
            var index = $scope.todos.results.indexOf(todo);
            $scope.todos.results[index].name = $scope.todoName;
            $scope.todos.results[index].desc = $scope.todoDesc;
            $scope.todos.results[index].updated = new Date();
            $scope.undoEdit();
        })
    }
}