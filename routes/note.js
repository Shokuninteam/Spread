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

exports.getFavs = function(req, res){
  var id = req.params.id;
  noteServices.getFavs(id, function(favs){
    res.json(favs);
  });
};

exports.gethistory = function(req, res){
  var id = req.params.id;
  res.json('{}');
};

exports.getSpreaded = function(req, res){
  var id = req.params.id;
  res.json('{}');
};

exports.getUsersPositions = function(req, res){
  var id = req.params.id;
  res.json('{}');
};
