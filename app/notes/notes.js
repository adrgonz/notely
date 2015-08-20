'use strict';

angular.module('notely.notes', ['ngRoute'])
//  config [dependency as string, function that uses the dependency]
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/notes', {
    templateUrl: 'notes/notes.html',
    controller: 'NotesController'
  });
}])

.controller('NotesController', [function() {

}]);
