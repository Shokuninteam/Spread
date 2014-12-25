var mongoose = require('mongoose');
var tools = require('./tools');
var uri = "mongodb://127.0.0.1:27017/Spread";

mongoose.connect(uri);
var db = mongoose.connection;

var schemas = {
  userSchema : new mongoose.Schema({
    nickname : String,
    mail : String,
    pwd : String,
    avatar : String,
    loc : {
       type: { type: String },
       coordinates : [ Number ]
    },
    pos : [{
      date : Date,
      loc : {
        type: { type: String },
        coordinates: [ Number ]
      }
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
      loc : {
        type: { type: String },
        coordinates: [ Number ]
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
  },

  spreadToTenClothestUsers : function(spreadTab, callback){

    db.on('error', console.error.bind(console, 'connection error:'));
    var UserModel = mongoose.model('User', schemas.userSchema);

    var long = spreadTab[0].loc.coordinates[0];
    var lat = spreadTab[0].loc.coordinates[1];
    var idTab = [];
    for(var i = 0; i < spreadTab.length; i++) {
      idTab.push(spreadTab[i].user);
    }

    UserModel.find({ loc : { $near : { $geometry : { type : "Point" , coordinates : [long, lat] }}}, _id: { $nin: idTab }}).limit(10).exec(function(err, users){
      if(!err){
        callback(users);
      }
      else
        return console.log(err);
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
    var loc = {
      type: "Point",
      coordinates : [user.pos[0].long, user.pos[0].lat]
    };
    instance.loc = loc;
    instance.pos.push({
      date : new Date(),
      loc : {
        type : "Point",
        coordinates : [user.pos[0].long, user.pos[0].lat]
      }
    });
    instance.active = true;

    instance.save(function (err, user, affected) {
      if (err) callback(409);
      else {
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
          if(instance.pos[0].long) user.loc.coordinates[0] = instance.pos[0].long;
          if(instance.pos[0].lat) user.loc.coordinates[1] = instance.pos[0].lat;
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
        instance.active = false;
        instance.save(function (err, instance, affected) {
          if (err) callback(404);
          else {
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

  instance.spread.push({
    user : note.user,
    date : new Date(),
    loc : {
      type: "Point",
      coordinates: [ note.long, note.lat ]
    },
    answer : "spread"
  });

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
  });
}

exports.addFav = function(id, noteId, callback){
  db.on('error', console.error.bind(console, 'connection error:'));

  var UserModel = mongoose.model('User', schemas.userSchema);

  UserModel.findById(id, function(err, instance){
    if(err) callback(404);
    else{
      instance.favs.push(noteId);
      instance.save(function (err, instance, affected) {
        if (err) callback(404);
        else {
          if(affected == 1) callback(200);
          else callback(404);
        }
      });
    }
  });
}

/* exports.killNote = function(id, noteId, callback){
  db.on('error', console.error.bind(console, 'connection error:'));

  var UserModel = mongoose.model('User', schemas.userSchema);
  var NoteModel = mongoose.model('Note', schemas.noteSchema);

  UserModel.findById(id, function(err, instance){
    if(err) callback(404);
    else{
      NoteModel.findById(noteId, function (err, note){
        if(err) callback(404);
        else{
            var spread = {
              user : id,
              date : new Date(),
              answer : false,
              pos : {
                x : instance.pos[0].x,
                y : instance.pos[0].y
              }
            }
            note.spread.push(spread);
            note.save(function (err,note, affected){
              if (err) callback(404);
              else {
                console.log("Note killed : " + note);
                if(affected == 1) callback(200);
                else callback(404);
              }
            });
        }
      });
    }
  });
}
*/

exports.addSpreaded = function(id, noteId, callback){
  db.on('error', console.error.bind(console, 'connection error:'));

  var UserModel = mongoose.model('User', schemas.userSchema);
  var NoteModel = mongoose.model('Note', schemas.noteSchema);

  UserModel.findById(id, function(err, instance){
    if(err) callback(404);
    else{
      instance.spreaded.push(noteId);
      NoteModel.findById(noteId, function (err, note){
        if(err) callback(404);
        else{
            var spread = {
              user : id,
              date : new Date(),
              answer : true,
              loc : {
                type: { type: "Point" },
                coordinates: [ instance.loc.coordinates[0], instance.loc.coordinates[1] ]
              }
            }
            note.spread.push(spread);
            note.save(function (err,note, affected){
              if (err) callback(404);
              else {
                if(affected == 1){
                  innerFunction.spreadToTenClothestUsers(note.spread, function(users){
                    for(var i = 0; i<users.length; i++) console.log(users[i].nickname);
                  });
                  callback(200);
                }
                else callback(404);
              }
            });
        }
      });
      instance.save(function (err, instance, affected) {
        if (err) callback(404);
        else {
          if(affected == 1) callback(200);
          else callback(404);
        }
      });
    }
  });
}

exports.addPosition = function(user, callback){
  db.on('error', console.error.bind(console, 'connection error:'));

  var UserModel = mongoose.model('User', schemas.userSchema);

  UserModel.findById(user.id, function(err, instance){
    if(err) callback(404);
    else{
      var pos = {
        date : new Date(),
        loc : {
          type: { type: "Point" },
          coordinates: [ user.long, user.lat ]
        }
      }
      instance.pos.push(pos);
      instance.save(function (err, instance, affected) {
        if (err) callback(409);
        else {
          if(affected == 1) {
            callback(201);
          }
          else callback(409);
        }
      });
    }
  });
}
