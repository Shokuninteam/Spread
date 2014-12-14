var mongooseServices = require('./mongooseServices');

exports.createNote = function(note, callback){
  note.tags = note.tags.split(" ");
  mongooseServices.createNote(note, callback);
}
