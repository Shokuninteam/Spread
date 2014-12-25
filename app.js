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

app.set('port', process.env.PORT || 8080);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('X-HTTP-Method-Override'));

if ('development' == app.get('env')) {
  app.use(errorhandler());
}

app.get('/users/:id', user.getUser);
app.post('/users', user.createUser);
app.put('/users/:id', user.modifyUser);
app.delete('/users/:id', user.deleteUser);
app.post('/users/:id/positions', user.addPosition);
app.get('/users/:id/notes/favoris', note.getFavs);
app.post('/users/:id/notes/favoris', note.addFav);
app.get('/users/:id/notes/history', note.gethistory);
app.post('/users/:id/notes/spreaded', note.addSpreaded);
//app.post('/users/:id/notes/kill', note.killNote);
app.get('/users/:id/notes/spreaded', note.getSpreaded);
app.get('/notes/:id', note.getNote);
app.post('/notes', note.createNote);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Port ' + app.get('port'));
});
