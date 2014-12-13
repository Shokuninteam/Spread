var mongooseServices = require('./mongooseServices');

exports.getUserById = function(id){
  var user = mongooseServices.getUserById(id);
  return user;
};

exports.createUser = function(user){
  var user = mongooseServices.createUser(user);
}
