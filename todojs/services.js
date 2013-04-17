'use strict';

/* Services */

angular.module('todoListSvc', ['ngResource']).
    factory('todoListClient', function($resource){
        return $resource('http://127.0.0.1:port/api/todo/?:arg1:arg2', {port:':8000'}, {});
        });