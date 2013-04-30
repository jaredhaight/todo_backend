'use strict';

/* Controllers */
function userListCtrl($scope, userListClient, todoListClient, $routeParams, $http) {
    $http.defaults.headers.common['Authorization'] = 'Token 09c34730916dee2ccaa71b6c35d2eba689e554b4';
    $scope.reverseAge = 'true';
    $scope.editing = 'false';
    $scope.mode = 'Add';
    $scope.user = userListClient.get({username: $routeParams.username});
    console.log($scope.user);

    $scope.addTodo = function(){
        var newTodo = new todoListClient;
        newTodo.name = $scope.todoName;
        newTodo.desc = $scope.todoDesc;
        newTodo.$save(function(){
            $scope.user.todos.push(newTodo);
            $scope.undoEdit();
        }, function(data){
            console.log(data);
            $scope.alertPop('Could not add todo', data);
        });
    };

    $scope.deleteTodo = function (todo, index) {
        console.log('deleteTodo');
        console.log(index);
        $scope.user.todos.$delete({todoID: todo.id}, function() {
            $scope.user.todos.splice($scope.todos.results.indexOf(todo), 1);
        }, function(data){
            $scope.alertPop('Could not delete todo', data);
        });
    };

    $scope.todoCompleted = function(todo, index){
        console.log("todoCompleted");
        var todoobj = new todoListClient;
        console.log(todoobj);
        var now = new Date();
        todoobj.name = todo.name;
        todoobj.completed = now.toJSON();
        console.log(todoobj.completed);
        console.log(index);
        todoobj.$update({todoID: todo.id}, function(){
            var index = $scope.user.todos.indexOf(todo);
            $scope.user.todos[index].completed = now.toJSON();
            $scope.user.todos[index].updated = now.toJSON();
            console.log('Todo saved as completed');
        }, function(data){
            $scope.alertPop('Could not complete todo', data);
        });
    };

    $scope.enableEdit = function(todo) {
        $scope.todoName = todo.name;
        $scope.todoDesc = todo.desc;
        $scope.editing = 'true';
        $scope.mode = 'Edit';
        $scope.todoEditObj = todo;
        console.log($scope.editing);
    };

    $scope.undoEdit = function() {
        $scope.todoName = '';
        $scope.todoDesc = '';
        $scope.todoEditObj = null;
        $scope.editing = 'false';
        $scope.mode = 'Add';
    };

    $scope.editTodo = function(todo) {
        var updateTodo = new todoListClient;
        updateTodo.name = $scope.todoName;
        updateTodo.desc = $scope.todoDesc;
        updateTodo.$update({todoID: todo.id}, function(){
            var index = $scope.user.todos.indexOf(todo);
            $scope.user.todos[index].name = $scope.todoName;
            $scope.user.todos[index].desc = $scope.todoDesc;
            $scope.user.todos[index].updated = new Date();
            $scope.undoEdit();
        }, function(data){
            $scope.alertPop('Could not edit todo', data);
        });
    };

    $scope.alertPop = function(message, data){
        var error = 'An unknown error has occurred.';
        if (data.status == 0|| data.status == 404){
           var error = 'The API endpoint for this request was not found.';
        }
        else if (data.status == 400){
            var error = 'There was a problem with the data sent to server.'
        }
        else if (data.status == 500){
            var error = 'There was a server or data error.';
        }
        $scope.alertMessage = message+': '+error;
        $scope.alert = true;
    };

    $scope.alertClear = function(){
        $scope.alertMessage = null;
        $scope.alert = false;
    }
}

function todoListCtrl($scope, todoListClient, $routeParams, $http) {
    $http.defaults.headers.common['Authorization'] = 'Token 09c34730916dee2ccaa71b6c35d2eba689e554b4';
    $scope.reverseAge = 'true';
    $scope.editing = 'false';
    $scope.mode = 'Add';
    $scope.todos = todoListClient.get();

    $scope.addTodo = function(){
        var newTodo = new todoListClient;
        newTodo.name = $scope.todoName;
        newTodo.desc = $scope.todoDesc;
        newTodo.$save(function(){
            $scope.todos.results.push(newTodo);
            $scope.undoEdit();
        }, function(data){
            console.log(data);
            $scope.alertPop('Could not add todo', data);
        });
    };

    $scope.deleteTodo = function (todo, index) {
        console.log('deleteTodo');
        console.log(index);
        $scope.todos.$delete({todoID: todo.id}, function() {
            $scope.todos.results.splice($scope.todos.results.indexOf(todo), 1);
        }, function(data){
            $scope.alertPop('Could not delete todo', data);
        });
    };

    $scope.todoCompleted = function(todo, index){
        console.log("todoCompleted");
        var todoobj = new todoListClient;
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
        }, function(data){
            $scope.alertPop('Could not complete todo', data);
        });
    };

    $scope.enableEdit = function(todo) {
        $scope.todoName = todo.name;
        $scope.todoDesc = todo.desc;
        $scope.editing = 'true';
        $scope.mode = 'Edit';
        $scope.todoEditObj = todo;
        console.log($scope.editing);
    };

    $scope.undoEdit = function() {
        $scope.todoName = '';
        $scope.todoDesc = '';
        $scope.todoEditObj = null;
        $scope.editing = 'false';
        $scope.mode = 'Add';
    };

    $scope.editTodo = function(todo) {
        var updateTodo = new todoListClient;
        updateTodo.name = $scope.todoName;
        updateTodo.desc = $scope.todoDesc;
        updateTodo.$update({todoID: todo.id}, function(){
            var index = $scope.todos.results.indexOf(todo);
            $scope.todos.results[index].name = $scope.todoName;
            $scope.todos.results[index].desc = $scope.todoDesc;
            $scope.todos.results[index].updated = new Date();
            $scope.undoEdit();
        }, function(data){
            $scope.alertPop('Could not edit todo', data);
        });
    };

    $scope.alertPop = function(message, data){
        var error = 'An unknown error has occurred.';
        if (data.status == 0|| data.status == 404){
           var error = 'The API endpoint for this request was not found.';
        }
        else if (data.status == 400){
            var error = 'There was a problem with the data sent to server.'
        }
        else if (data.status == 500){
            var error = 'There was a server or data error.';
        }
        $scope.alertMessage = message+': '+error;
        $scope.alert = true;
    };

    $scope.alertClear = function(){
        $scope.alertMessage = null;
        $scope.alert = false;
    }
}