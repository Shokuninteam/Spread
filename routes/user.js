var userServices = require('../modules/services/userServices');
var noteServices = require('../modules/services/noteServices');

exports.getUser = function(req, res){
  userServices.getUserById(req.params.id, function(user){
    if(user.length > 0)
  	 res.json(user);
    else{
      res.status(404).end("User not avalaible");
    }
  });
};

exports.createUser = function(req, res){
 if(req.body == null) res.status(404).end("Syntax error");
 else{
  var user = {
    nickname : req.body.nickname,
    mail : req.body.mail,
    pwd : req.body.pwd,
    avatar : req.body.avatar,
    pos : [{
      x : req.body.x,
      y : req.body.y
    }]
  }
  console.log(req.url);

  userServices.createUser(user, function(code, id){
    if(code == 201)
      res.setHeader("url", req.url + "/" + id);
      res.status(code).end("User added");
    if(code == 409)
      res.status(code).end("Conflict : Unable to add User");
  });
 }
 
};

exports.modifyUser = function(req, res){
  var id = req.params.id;
  var user = {
    nickname : req.body.nickname,
    mail : req.body.mail,
    pwd : req.body.pwd,
    avatar : req.body.avatar,
    pos : [{
      x : req.body.x,
      y : req.body.y
    }]
  }
  userServices.modifyUser(id,user,function(code){
  	res.status(code).end();
  });
};

exports.deleteUser = function(req, res){
  userServices.deleteUser(req.params.id, function(code){
    res.status(code).end();
  });
};

exports.addPosition = function(req, res){
  var user = {
    id : req.params.id,
    x : req.body.x,
    y : req.body.y
  }
  userServices.addPosition(user, function(code){
    res.status(code).end();
  });
};
