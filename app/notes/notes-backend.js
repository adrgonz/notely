'use strict';
//  services do not have scope.   they are just work functions for a controller
app.service('NotesBackend', ['$http', function NotesBackend($http) {
  var mine = this;
  var notes = [];

  mine.getNotes = function() {
    return notes;
  };

  mine.fetchNotes = function(callback) {
    //  gets notes from api
    $http.get(nevernoteBasePath + 'notes?api_key=' + apiKey)
       .success( function(notesData){
         notes = notesData;  //  counter to what I thought..  mine.notes is not the destination here
         callback(notes);  //  callback is basically passing the notes field back to the orig requestor
                           //  return notes will pass the same data back only one level
       });
  };

  mine.postNote = function(noteData, callback) {
    //  post a new note to the api
    $http.post(nevernoteBasePath + 'notes', {
      api_key: apiKey,
      note: noteData
    }).success( function(newNoteData) {
      notes.unshift(newNoteData.note);
      callback(notes);
    });
  };
}]);
