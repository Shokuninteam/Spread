var userServices = require('../modules/services/userServices');
var noteServices = require('../modules/services/noteServices');

exports.getUser = function(req, res){
  userServices.getUserById(req.params.id, function(user){
  	res.json(user);
  });
};

exports.createUser = function(req, res){
  var user = {
    nickname : req.body.nickname,
    mail : req.body.mail,
    pwd : req.body.pwd,
    avatar : req.body.avatar,
    x : req.body.x,
    y : req.body.y
  }
  userServices.createUser(user, function(code){
    res.status(code).end();
  });
};

exports.modifyUser = function(req, res){
  var id = req.params.id;
  res.json('{}');
};

exports.deleteUser = function(req, res){
  var id = req.params.id;
  res.json('{}');
};
