var mongooseServices = require('./mongooseServices');

exports.getUserById = function(id, callback){
  mongooseServices.getUserById(id, callback);
};

exports.createUser = function(user, callback){
  mongooseServices.createUser(user, callback);
}

exports.deleteUser = function(id, callback){
  mongooseServices.deleteUser(id, callback);
}

exports.modifyUser = function(id, user, callback){
  mongooseServices.modifyUser(id, user, callback);
}

exports.addPosition = function(user, callback){
  mongooseServices.addPosition(user, callback);
}

exports.logInNickname = function(nickname, pwd, callback){
  mongooseServices.logInNickname(nickname, pwd, callback);
}

exports.logInMail = function(mail, pwd, callback){
  mongooseServices.logInMail(mail, pwd, callback);
}
