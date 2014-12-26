var userServices = require('../modules/services/userServices');
var noteServices = require('../modules/services/noteServices');


exports.getNote = function(req, res){
  noteServices.getNoteById(req.params.id, function(note){
    if(note)
     res.json(note);
    else
      res.status(404).end("Note not avalaible");
  });
};

exports.createNote = function(req, res){
  if(req.body == null) res.status(400).end("Syntax error");
  else if(!req.body.content || !req.body.tags || !req.body.user || !req.body.lat || !req.body.long ){
  res.status(400).end("Missing field");
  }else{
    userServices.getUserById(req.body.user, function(user){
      if(!user)
        res.status(400).end("User unknown :  unable to create a note");
    });
    var note = {
    user : req.body.user,
    content : req.body.content,
    tags : req.body.tags,
    lat : req.body.lat,
    long : req.body.long
  }
  noteServices.createNote(note, function(code, id){
    if(code == 201){
      res.setHeader("url", req.url);
      res.setHeader("id", id);
      res.status(code).end("Note added");
    }
    else if(code == 409)
      res.status(code).end("Conflict : Unable to add Note");
  });
  }
};

exports.addFav = function(req, res){
  noteServices.addFav(req.params.id, req.body.noteId, function(code){
    if(code == 200)
      res.status(code).end("Note added to favoris");
    else
      res.status(code).end("Unable to add note to favoris");
  });
};

exports.spreadedNote = function(req, res){
  noteServices.spreadNote(req.params.id, req.body.noteId, function(code){
    if(code == 200)
      res.status(code).end("Note spreaded");
    else
      res.status(code).end("Unable to Spread the note");
  });
};


exports.discardNote = function(req, res){
  noteServices.discardNote(req.params.id, req.body.noteId, function(code){
    if(code == 200)
      res.status(code).end("Note killed");
    else
      res.status(code).end("Unable to Kill the note");
  });
};


exports.getFavs = function(req, res){
  noteServices.getFavs(req.params.id, function(favs){
    if(favs)
      res.json(favs);
    else
      res.status(404).end("Unable to get favoris notes");
  });
};

exports.gethistory = function(req, res){
  noteServices.getHistory(req.params.id, function(history){
    if(history)
      res.json(history);
    else
      res.status(404).end("Unable to get history notes");
  });
};

exports.getSpreaded = function(req, res){
  noteServices.getSpreaded(req.params.id, function(spreaded){
    if(spreaded)
     res.json(spreaded);
    else
      res.status(404).end("Unable to get spreaded notes")
  });
};

exports.getUsersPositions = function(req, res){
  var id = req.params.id;
  res.json('{}');
};

exports.getUnansweredNotes = function(req, res){
  noteServices.getUnansweredNotes(req.params.id, function(notes){
    if(notes)
      res.json(notes);
    else
      res.status(404).end("Unable to get unanswered notes");
  });
};
