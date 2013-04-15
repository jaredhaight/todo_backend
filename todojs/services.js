'use strict';

/* Services */

angular.module('todoListSvc', ['ngResource']).
    factory('todoListClient', function($resource){
        return $resource('http://127.0.0.1:port/api/todo/?format=jsonp&callback=JSON_CALLBACK', {port:':8000'}, {
            get: {method:'JSONP', isArray:false}
        });
    });