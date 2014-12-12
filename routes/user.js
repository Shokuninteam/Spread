var userServices = require('../modules/services/userServices');
var noteServices = require('../modules/services/noteServices');

exports.getUser = function(req, res){
  var id = req.params.id;
  userServices.getUserbyID(id);
  res.json('{}');
};

exports.createUser = function(req, res){
  res.json('{}');
};

exports.modifyUser = function(req, res){
  var id = req.params.id;
  res.json('{}');
};

exports.deleteUser = function(req, res){
  var id = req.params.id;
  res.json('{}');
};
