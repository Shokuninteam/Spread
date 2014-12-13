var mongooseServices = require('./mongooseServices');

exports.getUserById = function(id,callback){
  mongooseServices.getUserById(id, function(user){
  	callback(user);
  });
};

exports.createUser = function(user){
  var user = mongooseServices.createUser(user);
}
