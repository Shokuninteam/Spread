var mongoose = require('mongoose');
var uri = "mongodb://127.0.0.1:27017/Spread";

mongoose.connect(uri);
var db = mongoose.connection;

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
    favs : [String],
    spreaded : [String],
    history : [String],
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

var innerFunction = {
  addHistory : function(idUser, idNote, callback){
    db.on('error', console.error.bind(console, 'connection error:'));
      var UserModel = mongoose.model('User', schemas.userSchema);

      UserModel.findById(idUser, function(err, instance){
        if(!err){
          instance.history.push(idNote);
          instance.save(function (err, instance, affected) {
            callback();
          });
        } else {
          callback();
        }
    });
  }
}
// User services
exports.getUserById = function(id, callback){
  db.on('error', console.error.bind(console, 'connection error:'));
    var UserModel = mongoose.model('User', schemas.userSchema);

    UserModel.findOne({ _id: id }, function(err, user){
      if(!err){
        callback(user);
      }
      else
        return console.log(err);
    });
}

exports.createUser = function(user, callback){

  db.on('error', console.error.bind(console, 'connection error:'));

    var UserModel = mongoose.model('User', schemas.userSchema);

    var instance = new UserModel();

    instance.nickname = user.nickname;
    instance.mail = user.mail;
    instance.pwd = user.pwd;
    instance.avatar = user.avatar;
    var pos = {
      date : new Date(),
      x : user.pos[0].x,
      y : user.pos[0].y
    }
    instance.pos.push(pos);
    instance.active = true;

    instance.save(function (err, user, affected) {
      if (err) callback(409);
      else {
        console.log(user);
        if(affected == 1) callback(201, user.id);
        else callback(409);
      }
  });
}

exports.modifyUser = function(id, instance, callback){
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function(){
    var UserModel = mongoose.model('User', schemas.userSchema);

    UserModel.findById(id, function(err, user){
      if(err) callback(404);
      else{
        if(user == 0) callback(404);
        else{
          if(instance.nickname) user.nickname = instance.nickname;
          if(instance.mail) user.mail = instance.mail;
          if(instance.pwd) user.pwd = instance.pwd;
          if(instance.avatar) user.avatar = instance.avatar;
          if(instance.pos[0].x) user.pos[0].x = instance.pos[0].x;
          if(instance.pos[0].y) user.pos[0].y = instance.pos[0].y;
          user.save(function (err, user, affected) {
            if (err) callback(404);
            else {
              if(affected == 1) callback(200);
              else callback(404);
            }
          });
        }

      }
      });
  });
}

exports.deleteUser = function(id, callback){
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function(){
    var UserModel = mongoose.model('User', schemas.userSchema);

    UserModel.findById(id, function(err, instance){
      if(err) callback(404);
      else{
        console.log(instance);
        instance.active = false;
        instance.save(function (err, instance, affected) {
          if (err) callback(404);
          else {
            console.log(instance);
            if(affected == 1) callback(204);
            else callback(404);
          }
        });
      }
    });
  });
}

// Notes Services
exports.getNoteById = function(id, callback){
  db.on('error', console.error.bind(console, 'connection error:'));

    var NoteModel = mongoose.model('Note', schemas.noteSchema);

    NoteModel.findOne({ _id: id }, function(err, note){
      if(!err){
        callback(note);
      }
      else
        return console.log(err);
  });
}

exports.createNote = function(note, callback){

  db.on('error', console.error.bind(console, 'connection error:'));

    var NoteModel = mongoose.model('Note', schemas.noteSchema);

    var instance = new NoteModel();

    instance.user = note.user;
    instance.content = note.content;
    instance.tags = note.tags;

    instance.save(function (err, note, affected) {
      if (err) {
        console.log(err);
        callback(409);
      }
      else {
        if(affected == 1){
          innerFunction.addHistory(note.user, note.id, function(){
            callback(201, note.id);
          });
        }
        else callback(409);
      }
   // });
  });
}

exports.addFav = function(id, noteId, callback){
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function(){
    var UserModel = mongoose.model('User', schemas.userSchema);

    UserModel.findById(id, function(err, instance){
      if(err) callback(404);
      else{
        console.log(instance);
        instance.favs.push(noteId);
        instance.save(function (err, instance, affected) {
          if (err) callback(404);
          else {
            console.log(instance);
            if(affected == 1) callback(200);
            else callback(404);
          }
        });
      }
    });
  });
}

exports.addSpreaded = function(id, noteId, callback){
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function(){
    var UserModel = mongoose.model('User', schemas.userSchema);

    UserModel.findById(id, function(err, instance){
      if(err) callback(404);
      else{
        console.log(instance);
        instance.spreaded.push(noteId);
        instance.save(function (err, instance, affected) {
          if (err) callback(404);
          else {
            console.log(instance);
            if(affected == 1) callback(200);
            else callback(404);
          }
        });
      }
    });
  });
}

exports.addPosition = function(user, callback){
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function(){
    var UserModel = mongoose.model('User', schemas.userSchema);

    UserModel.findById(user.id, function(err, instance){
      if(err) callback(404);
      else{
        var pos = {
          date : new Date(),
          x : user.x,
          y : user.y
        }
        instance.pos.push(pos);
        instance.save(function (err, instance, affected) {
          if (err) callback(409);
          else {
            if(affected == 1) callback(200);
            else callback(409);
          }
        });
      }
    });
  });
}
