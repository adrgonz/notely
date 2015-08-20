'use strict';

var nevernoteBasePath = "https://nevernote-1150.herokuapp.com/api/v1/",
    apiKey = "$2a$10$HetPeznqUDxdbb4mkUwto.EKcOPETSmfl4Kigxc4i4V1rVnf4S7qm";

var noteApp = angular.module('notely.notes', ['ngRoute']);
//  config [dependency as string, function that uses the dependency]
noteApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/notes', {
    templateUrl: 'notes/notes.html'
  });
}]);

noteApp.controller('NotesController', ['$scope','NotesBackend',function($scope, NotesBackend) {
  var self = this
  $scope.note = {};  //  created an empty object so note from notes.html is not undefined
  $scope.notes = [];
// //  this block is great for the initial display, but commit needs the same logic..  make it a f(x)
//   $scope.notes = NotesBackend.fetchNotes(function(notesData) {
//     $scope.notes = notesData;
//   });

  self.assignNotes = function(notes) {
    $scope.notes = notes;
  };

  self.findNoteById = function(noteId) {
    for(var i=0; i < $scope.notes.length; i++) {
      if ($scope.notes[i].id === noteId) {
        return $scope.notes[i];
      }
    }
  };

  self.copyNote = function(note) {
    return JSON.parse(JSON.stringify(note));
  };

  $scope.commit = function() {
    NotesBackend.postNote($scope.note, self.assignNotes);
  };

  $scope.hasNotes = function() {
    return $scope.notes.length > 0;
    // if (notes.length > 0) {    //  old school check is not needed
    //   return true              //  JS is cool enough to know what we want
    // } else { return false}
  };

  $scope.loadNote = function(note) {
    $scope.note = self.copyNote(note);
  };

  NotesBackend.fetchNotes(self.assignNotes);
}]);
