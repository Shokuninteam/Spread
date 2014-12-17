var mongooseServices = require('./mongooseServices');

exports.getNoteById = function(id, callback){
  mongooseServices.getNoteById(id, callback);
};

exports.createNote = function(note, callback){
  note.tags = note.tags.replace("#", "").split(" ");
  mongooseServices.createNote(note, callback);
}

exports.getFavs = function(id, callback){
	var favs = new Array();
	//handle user callback
	mongooseServices.getUserById(id, function(user){
		for(var i in user.favs){
			//Handle note callback
			mongooseServices.getNoteById(favs[i], function(note){
				favs.push(note);
			});
		}
	});
	callback(favs);
}
