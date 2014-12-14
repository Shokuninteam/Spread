var mongooseServices = require('./mongooseServices');

exports.getUserById = function(id, callback){
  mongooseServices.getUserById(id, callback);
};

exports.createUser = function(user, callback){
  mongooseServices.createUser(user, callback);
}
