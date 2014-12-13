var mongoose = require('mongoose');

var schemas = {
  userSchema : new mongoose.Schema({
    nickname : String,
    mail : String,
    pwd : String,
    avatar : String,
    pos : [{
      date : Date,
      x : Number,
      y : Number
    }],
    favs : [Number],
    spreaded : [Number],
    history : [Number],
    settings : {}
  })
}
exports.getUserById = function(id){

  mongoose.connect('mongodb://127.0.0.1:27017/Spread');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback () {

    var UserModel = mongoose.model('User', schemas.userSchema);

    UserModel.find({ _id: id }, function(err, user){
      console.log(user);
      mongoose.connection.close();
    });
  });

}

exports.createUser = function(user){

  mongoose.connect('mongodb://127.0.0.1:27017/Spread');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback () {

    var UserModel = mongoose.model('User', schemas.userSchema);

    var instance = new UserModel();

    instance.nickname = user.nickname;
    instance.mail = user.mail;
    instance.pwd = user.pwd;
    instance.avatar = user.avatar;
    var pos = {
      date : new Date(),
      x : user.x,
      y : user.y
    }
    instance.pos.push(pos);

    instance.save(function (err, user) {
      if (err) return console.log(err);
      else console.log(user);
      mongoose.connection.close();
    });

  });

}
