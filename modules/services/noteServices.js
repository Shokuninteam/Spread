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

exports.addSpreaded = function(id, noteId, callback){
  mongooseServices.addSpreaded(id, noteId, callback);
}

exports.killNote = function(id, noteId, callback){
  mongooseServices.killNote(id, noteId, callback);
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
  var spread = new Array();
  //handle user callback
  mongooseServices.getUserById(id, function(user){
    var notesCount = user.spreaded.length;
    for(var i=0; i<user.spreaded.length; i++){
      mongooseServices.getNoteById(user.spreaded[i], function(note){
        spread.push(note);
        if (spread.length === notesCount) callback(spread);
      });
    }
  });
}

exports.getHistory = function(id, callback){
  var hist = new Array();
  //handle user callback
  mongooseServices.getUserById(id, function(user){
    var notesCount = user.history.length;
    for(var i=0; i<user.history.length; i++){
      mongooseServices.getNoteById(user.history[i], function(note){
        hist.push(note);
        if (hist.length === notesCount) callback(hist);
      });
    }
  });
}
