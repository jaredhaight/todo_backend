'use strict';

/* Services */

angular.module('todoListSvc', ['ngResource']).
    factory('todoListClient', function($resource){
        return $resource('http://127.0.0.1:port/api/todo/:todoID/', {port:':8000', todoID:'@id'}, {
            update: {method:'PUT'}
            });
        });