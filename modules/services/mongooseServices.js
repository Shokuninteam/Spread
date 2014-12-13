var mongoose = require('mongoose');

var schemas = {
  userSchema : new mongoose.Schema({
    id : Number,
    nickName : String,
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

    UserModel.find({ id: id }, function(err, user){
      console.log(user)
    });

    mongoose.connection.close();
  });

}

exports.createUser = function(user){

  mongoose.connect('mongodb://127.0.0.1:27017/Spread');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback () {

    var UserModel = mongoose.model('User', schemas.userSchema);

    console.log(user);

    var instance = new UserModel();

    instance.nickname = user.nickname;
    instance.pwd = user.pwd;
    instance.avatar = user.avatar;
    instance.pos.date = user.date;
    instance.pos.x = user.x;
    instance.pos.y = user.y;

    instance.save(function (err, user) {
      if (err) return console.log(err);
      else console.log(user);
    });

    mongoose.connection.close();
  });

}
