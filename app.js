var express = require('express');
var http = require('http');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorhandler = require('errorhandler');

var user = require('./routes/user');
var note = require('./routes/note');
var mongo = require('./modules/services/mongooseServices');

var app = express();

app.set('port', process.env.PORT || 3030);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('X-HTTP-Method-Override'));

if ('development' == app.get('env')) {
  app.use(errorhandler());
}

//API : user
app.get('/users/:id', user.getUser); // V0 ok
app.post('/users', user.createUser); // V0 ok
app.put('/users/:id', user.modifyUser); //V0 ok 
app.delete('/users/:id', user.deleteUser); // V0 ok
//API : note
app.get('/notes/:id', note.getNote); // V0 ok
app.post('/notes', note.createNote); // V0 ok
app.get('/users/:id/notes/favoris', note.getFavs); //V0 doing
app.get('/users/:id/notes/history', note.gethistory);
app.get('/users/:id/notes/spreaded', note.getSpreaded);
app.get('/notes/:id/users/position', note.getUsersPositions);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Port ' + app.get('port'));
});
