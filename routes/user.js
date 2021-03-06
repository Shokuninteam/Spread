var userServices = require('../modules/services/userServices');
var noteServices = require('../modules/services/noteServices');

exports.getUser = function(req, res){
  userServices.getUserById(req.params.id, function(user){
    if(user)
  	 res.json(user);
    else{
      res.status(404).end("User not avalaible");
    }
  });
};

exports.createUser = function(req, res){
 if(req.body == null) res.status(400).end("Syntax error");
 else if(!req.body.nickname || !req.body.mail || !req.body.pwd || !req.body.avatar || !req.body.lat || !req.body.long){
  res.status(400).end("Missing field");
 }
 else{
  var user = {
    nickname : req.body.nickname,
    mail : req.body.mail,
    pwd : req.body.pwd,
    avatar : req.body.avatar,
    pos : [{
      long : req.body.long,
      lat : req.body.lat
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
        lat : req.body.lat,
        long : req.body.long
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
  if(!req.body) res.status(400).end("Syntax error");
  else{
    var user = {
      id : req.params.id,
      lat : req.body.lat,
      long : req.body.long
    };
    userServices.addPosition(user, function(code){
      if(code == 201)
        res.status(code).end("Position added");
      if(code == 409)
        res.status(code).end("Conflict : Unable to add user");
      if(code == 404)
        res.status(code).end("User unable");
    });
  }
}

exports.logIn = function(req, res){
  if(req.body.nickname && req.body.pwd){
    userServices.logInNickname(req.body.nickname, req.body.pwd,  function(id, code){
      if(code == 404) res.status(code).end("Nonexistent user");
      else{
        res.setHeader("id", id);
        res.status(code).end();
      }
    });
  } else if(req.body.mail && req.body.pwd){
    userServices.logInMail(req.body.mail, req.body.pwd, function(id, code){
      if(code == 404) res.status(code).end("Nonexistent user");
      else{
        res.setHeader("id", id);
        res.status(code).end();
      }
    });
  } else res.status(400).end('{"error" : "syntax error"}');
};
