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

exports.getSpreaded = function(id, callback){
  var spread = new Array();
  //handle user callback
  mongooseServices.getUserById(id, function(user){
    var notesCount = user[0].spreaded.length;
    for(var i=0; i<user[0].spreaded.length; i++){
      mongooseServices.getNoteById(user[0].spreaded[i], function(note){
        spread.push(note[0]);
        if (spread.length === notesCount) callback(spread);
      });
    }
  });
}

exports.getHistory = function(id, callback){
  var hist = new Array();
  //handle user callback
  mongooseServices.getUserById(id, function(user){
    var notesCount = user[0].history.length;
    for(var i=0; i<user[0].history.length; i++){
      mongooseServices.getNoteById(user[0].history[i], function(note){
        hist.push(note[0]);
        if (hist.length === notesCount) callback(hist);
      });
    }
  });
}
