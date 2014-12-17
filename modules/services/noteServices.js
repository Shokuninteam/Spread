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

exports.getFavs = function(id, callback){
	var favs = new Array();
	//handle user callback
	mongooseServices.getUserById(id, function(user){
    var notesCount = user[0].favs.length;
		for(var i=0; i<user[0].favs.length; i++){
			mongooseServices.getNoteById(user[0].favs[i], function(note){
        favs.push(note[0]);
        if (favs.length === notesCount) callback(favs);
			});
		}
	});
}
