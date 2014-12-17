var userServices = require('../modules/services/userServices');
var noteServices = require('../modules/services/noteServices');


exports.getNote = function(req, res){
  noteServices.getNoteById(req.params.id, function(note){
    res.json(note);
  });
};

exports.createNote = function(req, res){
  var note = {
    user : req.body.user,
    content : req.body.content,
    tags : req.body.tags
  }
  noteServices.createNote(note, function(code){
    res.status(code).end();
  });
};

exports.addFav = function(req, res){
  noteServices.addFav(req.params.id, req.body.noteId, function(code){
    res.status(code).end();
  });
};

exports.addSpreaded = function(req, res){
  noteServices.addSpreaded(req.params.id, req.body.noteId, function(code){
    res.status(code).end();
  });
};

exports.getFavs = function(req, res){
  noteServices.getFavs(req.params.id, function(favs){
    res.json(favs);
  });
};

exports.gethistory = function(req, res){
  noteServices.getHistory(req.params.id, function(history){
    res.json(history);
  });
};

exports.getSpreaded = function(req, res){
  noteServices.getSpreaded(req.params.id, function(spreaded){
    res.json(spreaded);
  });
};

exports.getUsersPositions = function(req, res){
  var id = req.params.id;
  res.json('{}');
};
