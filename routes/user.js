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
 if(req.body == null) res.status(400).end("Syntax error");
 else if(!req.body.nickname || !req.body.mail || !req.body.pwd || !req.body.avatar || !req.body.x || !req.body.y){
  res.status(400).end("Missing field");
 }
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

  userServices.createUser(user, function(code, id){
    if(code == 201){
      res.setHeader("url", req.url);
      res.setHeader("id", id);
      res.status(code).end("User added");
    }
    else if(code == 409)
      res.status(code).end("Conflict : Unable to add User");
  });
 }

};

exports.modifyUser = function(req, res){
  var id = req.params.id;
  if(req.body == null) res.status(400).end("Syntax error");
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
    userServices.modifyUser(id,user,function(code){
      if(code == 404)
        res.status(code).end("Unable to modify user");
      else
        res.status(code).end("User modified");
    });
}
};

exports.deleteUser = function(req, res){
  if(!req.params.id) res.status(400).end("Syntax error");
  userServices.deleteUser(req.params.id, function(code){
    if(code == 204)
     res.status(code).end("User deleted");
    else
      res.status(code).end("Unable to delete");
  });
};

exports.addPosition = function(req, res){
  if(req.body == null) res.status(400).end("Syntax error");
  else{
    var user = {
      id : req.params.id,
      x : req.body.x,
      y : req.body.y
    }
    userServices.addPosition(user, function(code){
      if(code == 200)
        res.status(code).end("Position added");
      if(code == 409)
        res.status(code).end("Conflict : Unable to add user");
      if(code == 404)
        res.status(code).end("User unable");
    });
}
};
