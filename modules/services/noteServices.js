var mongooseServices = require('./mongooseServices');

exports.getNoteById = function(id, callback){
  mongooseServices.getNoteById(id, callback);
};

exports.createNote = function(note, callback){
  note.tags = note.tags.replace("#", "").split(" ");
  mongooseServices.createNote(note, callback);
}

exports.addFav = function(id, noteId, callback){
  mongooseServices.addFav(id, noteId, callback);
}

exports.spreadNote = function(id, long, lat, noteId, callback){
  mongooseServices.spreadNote(id, long, lat, noteId, callback);
}


exports.discardNote = function(id, long, lat, noteId, callback){
  mongooseServices.discardNote(id, long, lat, noteId, callback);
}

exports.getUnansweredNotes = function(id, callback){
  mongooseServices.getUnansweredNotes(id, callback);
}

exports.getFavs = function(id, callback){
	var favs = new Array();
	//handle user callback
	mongooseServices.getUserById(id, function(user){
    var notesCount = user.favs.length;
		for(var i=0; i<user.favs.length; i++){
			mongooseServices.getNoteById(user.favs[i], function(note){
        favs.push(note);
        if (favs.length === notesCount) callback(favs);
			});
		}
	});
}

exports.getSpreaded = function(id, callback){
  mongooseServices.getSpreaded(id, callback);
}

exports.getHistory = function(id, callback){
  mongooseServices.getHistory(id, callback);
}
