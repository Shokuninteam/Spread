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
    settings : {},
    active : Boolean
  }),

  noteSchema : new mongoose.Schema({
    user : String,
    date : Date,
    content : String,
    tags : [String],
    spread : [{
      user : String,
      date : Date,
      pos : {
        x : Number,
        y : Number
      },
      answer : String
    }]
  })
}
// User services
exports.getUserById = function(id, callback){

  mongoose.connect('mongodb://127.0.0.1:27017/Spread');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {

    var UserModel = mongoose.model('User', schemas.userSchema);

    UserModel.find({ _id: id }, function(err, user){
      if(!err){
        mongoose.connection.close();
        callback(user);
      }
      else
        return console.log(err);
    });
  });
}

exports.createUser = function(user, callback){

  mongoose.connect('mongodb://127.0.0.1:27017/Spread');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {

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
    instance.active = true;

    instance.save(function (err, user, affected) {
      if (err) callback(500);
      else {
        console.log(user);
        if(affected == 1) callback(201);
        else callback(500);
      }
      mongoose.connection.close();
    });
  });
}

exports.modifyUser = function(id, instance, callback){
  mongoose.connect('mongodb://127.0.0.1:27017/Spread');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function(){
    var UserModel = mongoose.model('User', schemas.userSchema);

    UserModel.findById(id, function(err, user){
      if(err) callback(204);
      else{
        console.log(instance);
        if(instance.nickname) user.nickname = instance.nickname;
        if(instance.mail) user.mail = instance.mail;
        if(instance.pwd) user.pwd = instance.pwd;
        if(instance.avatar) user.avatar = instance.avatar;
        if(instance.pos[0].x) user.pos[0].x = instance.pos[0].x;
        if(instance.pos[0].y) user.pos[0].y = instance.pos[0].y;
        user.save(function (err, user, affected) {
          if (err) callback(204);
          else {
            console.log(user);
            if(affected == 1) callback(200);
            else callback(204);
          }
        mongoose.connection.close();
        });
      }
      });
  });
}

exports.deleteUser = function(id, callback){
  mongoose.connect('mongodb://127.0.0.1:27017/Spread');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {

    var UserModel = mongoose.model('User', schemas.userSchema);

    UserModel.findByIdAndRemove(id , function(err){
      if (err){
        callback(204);
      } else {
        console.log("removed" );
        callback(200);
      }
      mongoose.connection.close();
    });
  });
}

// Notes Services
exports.getNoteById = function(id, callback){

  mongoose.connect('mongodb://127.0.0.1:27017/Spread');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {

    var NoteModel = mongoose.model('Note', schemas.noteSchema);

    NoteModel.find({ _id: id }, function(err, note){
      if(!err){
        mongoose.connection.close();
        callback(note);
      }
      else
        return console.log(err);
    });
  });
}

exports.createNote = function(note, callback){

  mongoose.connect('mongodb://127.0.0.1:27017/Spread');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {

    var NoteModel = mongoose.model('Note', schemas.noteSchema);

    var instance = new NoteModel();

    instance.user = note.user;
    instance.content = note.content;
    instance.tags = note.tags;

    instance.save(function (err, user, affected) {
      if (err) {
        console.log(err);
        callback(500);
      }
      else {
        console.log(note);
        if(affected == 1) callback(201);
        else callback(500);
      }
      mongoose.connection.close();
    });
  });
}

exports.addPosition = function(user, callback){

}
