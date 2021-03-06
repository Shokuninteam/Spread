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
  /**
  * Seek the 10 closest users that aren't in the current spreadTab
  * Call the callback with those 10 users
  */
  getTenClothestUsers : function(spreadTab, callback){

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


/**
* Seek the user with the given id
*/
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

/**
* Create a new user
*/
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

/**
* Modify a user
*/
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

/**
* Delete a user
*/
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

/**
* Get the note with the given ID
*/
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

/**
* Create a new note
* Add this note as Spreaded by his maker
* Spread this note to the 10 closest users
* Add this note to the user's history
*/
exports.createNote = function(note, callback){

  db.on('error', console.error.bind(console, 'connection error:'));

  var NoteModel = mongoose.model('Note', schemas.noteSchema);

  var instance = new NoteModel();

  instance.user = note.user;
  instance.content = note.content;
  instance.tags = note.tags;
  instance.date = new Date();

  instance.spread.push({
    user : note.user,
    date : new Date(),
    loc : {
      type: "Point",
      coordinates: [ note.long, note.lat ]
    },
    answer : "spread"
  });

  innerFunction.getTenClothestUsers(instance.spread, function(users){

    for(var i = 0; i<users.length; i++){
      instance.spread.push({
        user : users[i].id,
        date : new Date(),
        loc : {
          type: "Point",
          coordinates: [ users[i].loc.coordinates[0], users[i].loc.coordinates[1]]
        },
        answer : "none"
      });
    }

    instance.save(function (err, note, affected) {
      if (err) {
        console.log(err);
        callback(409);
      }
      else {
        if(affected == 1){
          callback(201, note.id);
        }
        else callback(409);
      }
    });
  });
}

/**
* Add the given note as a fav of the given user
*/
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

/**
* A user chose to spread a note
* The note's spread for the given user is updated
* The note is spreaded to the 10 closests users
*/
exports.spreadNote = function(id, long, lat, noteId, callback){
  db.on('error', console.error.bind(console, 'connection error:'));

  var NoteModel = mongoose.model('Note', schemas.noteSchema);
    NoteModel.findById(noteId, function (err, note){
      if(err) {
        callback(404);
      }
      else{
        for(var i = 0; i<note.spread.length; i++){
          if(note.spread[i].user == id && note.spread[i].answer == "none"){
            note.spread[i].answer = "spread";
            note.spread[i].loc = {
              type: "Point",
              coordinates: [ long, lat ]
            }
            note.spread[i].date = new Date();
          }
        }
        innerFunction.getTenClothestUsers(note.spread, function(users){
          for(var i = 0; i<users.length; i++){
            note.spread.push({
              user : users[i].id,
              date : new Date(),
              loc : {
                type: "Point",
                coordinates: [ users[i].loc.coordinates[0], users[i].loc.coordinates[1]]
              },
              answer : "none"
            });
          }

        note.save(function (err, note, affected){
          if (err) {
            console.log("error " + err );
            callback(404);
          }
          else {
            if(affected == 1){
              callback(200);
            }
            else{
              console.log("default");
              callback(404);
            }
          }});
        });
      }
  });
}

/**
  * A user choose to discard a note
  * Note's updated
  */
exports.discardNote = function(id, long, lat, noteId,  callback){
  db.on('error', console.error.bind(console, 'connection error:'));

  var NoteModel = mongoose.model('Note', schemas.noteSchema);

  NoteModel.findById(noteId, function (err, note){
    if(err) callback(404);
    else{
      for(var i = 0; i<note.spread.length; i++){
        if(note.spread[i].user == id && note.spread[i].answer == "none"){
          note.spread[i].answer = "discard";
          note.spread[i].loc = {
            type: "Point",
            coordinates: [ long, lat ]
          }
          note.spread[i].date = new Date();
        }
      }
      note.save(function (err, instance, affected) {
        if (err) callback(404);
        else {
          if(affected == 1) callback(200);
          else callback(404);
        }
      });
    }
  });
}


/**
  * Change the position of a user
  * Change the actual loc value
  * Add to the history
  */
exports.addPosition = function(user, callback){
  db.on('error', console.error.bind(console, 'connection error:'));

  var UserModel = mongoose.model('User', schemas.userSchema);

  UserModel.findById(user.id, function(err, instance){
    if(err) callback(404);
    else{
      var pos = {
        date : new Date(),
        loc : {
          type: "Point",
          coordinates: [ user.long, user.lat ]
        }
      }
      instance.loc = pos;
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

exports.getUnansweredNotes = function(id, callback){
  db.on('error', console.error.bind(console, 'connection error:'));

  var NoteModel = mongoose.model('Note', schemas.noteSchema);

  NoteModel.find({
    spread: {
      $elemMatch: {
         user: id,
         answer: "none"
      }
    }
  }, function(err, notes){
    if(!err){
      callback(notes);
    }
    else
      return console.log(err);
  });
}

exports.getSpreaded = function(id, callback){
  db.on('error', console.error.bind(console, 'connection error:'));

  var NoteModel = mongoose.model('Note', schemas.noteSchema);

  NoteModel.find({
    spread: {
      $elemMatch: {
        user: id,
        answer: "spread"
      }
    }
  }, function(err, notes){
    if(!err){
      callback(notes);
    }
    else
      return console.log(err);
    });
}

exports.getHistory = function(id, callback){
  db.on('error', console.error.bind(console, 'connection error:'));

  var NoteModel = mongoose.model('Note', schemas.noteSchema);

  NoteModel.find({'spread.0.user' : id}, function(err, notes){
    if(!err){
      callback(notes);
    }
    else
      return console.log(err);
  });
}

exports.logInNickname = function(nickname, pwd, callback){
  db.on('error', console.error.bind(console, 'connection error:'));
  var UserModel = mongoose.model('User', schemas.userSchema);
  console.log("nickname");
  console.log(nickname);
  console.log(pwd);
  UserModel.findOne({ nickname: nickname, pwd : pwd }, function(err, user){
    if(!err && user){
      callback(user.id, 200);
    }
    else{
      if (err) console.log(err);
      callback(undefined, 404);
    }
  });
}

exports.logInMail = function(mail, pwd, callback){
  db.on('error', console.error.bind(console, 'connection error:'));
  var UserModel = mongoose.model('User', schemas.userSchema);
  console.log("mail");
  console.log(mail);
  console.log(pwd);
  UserModel.findOne({ mail: mail, pwd : pwd }, function(err, user){
    if(!err && user){
      callback(user.id, 200);
    }
    else{
      if (err) console.log(err);
      callback(undefined, 404);
    }
  });
}
