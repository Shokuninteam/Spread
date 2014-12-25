var superagent = require('superagent')
var expect = require('expect.js')

describe('Spread Express server-side : Node REST API', function(){
  var id;
  var current = {
    noteIds : []
  };

  it('it should create a user', function(done){
    superagent.post('http://ec2-54-154-80-189.eu-west-1.compute.amazonaws.com/users')
    .send({
      nickname: 'John',
      mail: 'john@test.com',
      pwd : 'UnbreakablePwd',
      avatar : '78FE6ZF8ZEfezfez00',
      x : '34.9437432',
      y : '23.4298429'
    })
    .end(function(e, res){
      expect(res.header.id).not.to.be.null;
      expect(res.status).to.be.equal(201);
      current.userId = res.header.id;
      done();
    })
  })

  it('it shouldn\'t creat a user with no password', function(done){
    superagent.post('http://ec2-54-154-80-189.eu-west-1.compute.amazonaws.com/users')
    .send({
      nickname: 'John',
      mail: 'john@test.com',
      avatar : '78FE6ZF8ZEfezfez00',
      x : '34.9437432',
      y : '23.4298429'
    })
    .end(function(e, res){
      expect(res.status).to.be.equal(400);
      done();
    })
  })

  it('it shouldn\'t creat an empty user', function(done){
    superagent.post('http://ec2-54-154-80-189.eu-west-1.compute.amazonaws.com/users')
    .send({})
    .end(function(e, res){
      expect(res.status).to.be.equal(400);
      done();
    })
  })

  it('it should get precisely the created user', function(done){
    superagent.get('http://ec2-54-154-80-189.eu-west-1.compute.amazonaws.com/users/' + current.userId)
    .send()
    .end(function(e, res){
      expect(res.body.nickname).to.be.equal('John');
      expect(res.body.mail).to.be.equal('john@test.com');
      expect(res.body.avatar).to.be.equal('78FE6ZF8ZEfezfez00');
      expect(res.body.pos[0].x).to.be.equal(34.9437432);
      expect(res.body.pos[0].y).to.be.equal(23.4298429);
      expect(res.body.pos[0].date).not.to.be.equal.null;
      expect(res.status).to.be.equal(200);
      done();
    })
  })

  it('it should create a note assigned to the previously updated user', function(done){
    superagent.post('http://ec2-54-154-80-189.eu-west-1.compute.amazonaws.com/notes')
    .send({
        user : current.userId,
        content : "My fictive note, testing my app",
        tags : "tag1 tag2",
        x : 47.48264,
        y : 82.29832
    })
    .end(function(e, res){
      expect(res.header.id).not.to.be.null;
      expect(res.status).to.be.equal(201);
      current.noteIds.push(res.header.id);
      done();
    })
  })

  it('it should create a second note assigned to the same user', function(done){
    superagent.post('http://ec2-54-154-80-189.eu-west-1.compute.amazonaws.com/notes')
    .send({
      user : current.userId,
      content : "My fictive note, testing my app",
      tags : "tag1 tag2",
      x : 47.48264,
      y : 82.29832
    })
    .end(function(e, res){
      expect(res.header.id).not.to.be.null;
      expect(res.status).to.be.equal(201);
      current.noteIds.push(res.header.id);
      done();
    })
  })

  it('it should create a third note assigned to the same user', function(done){
    superagent.post('http://ec2-54-154-80-189.eu-west-1.compute.amazonaws.com/notes')
    .send({
      user : current.userId,
      content : "My fictive Killing note, testing my app",
      tags : "tag1 tag2"
    })
    .end(function(e, res){
      expect(res.header.id).not.to.be.null;
      expect(res.status).to.be.equal(201);
      current.noteIds.push(res.header.id);
      done();
    })
  })

  it('it should get the first note created', function(done){
    superagent.get('http://ec2-54-154-80-189.eu-west-1.compute.amazonaws.com/notes/' + current.noteIds[0])
    .send()
    .end(function(e, res){
      expect(res.status).to.be.equal(200);
      done();
    })
  })

  it('it should retrieve the 2 notes as part of the user\'s history', function(done){
    superagent.get('http://ec2-54-154-80-189.eu-west-1.compute.amazonaws.com/users/' + current.userId + '/notes/history')
    .send()
    .end(function(e, res){
      expect(res.status).to.be.equal(200);
      expect(res.body.length).to.be.equal(3);
      expect(res.body[0]._id).to.be.equal(current.noteIds[0]);
      expect(res.body[1]._id).to.be.equal(current.noteIds[1]);
      done();
    })
  })

  it('it should add the first note as spreaded by the user', function(done){
    superagent.post('http://ec2-54-154-80-189.eu-west-1.compute.amazonaws.com/users/' + current.userId + '/notes/spreaded')
    .send({
      noteId : current.noteIds[0]
    })
    .end(function(e, res){
      expect(res.status).to.be.equal(200);
      done();
    })
  })

  it('it should add the second note as spreaded by the user', function(done){
    superagent.post('http://ec2-54-154-80-189.eu-west-1.compute.amazonaws.com/users/' + current.userId + '/notes/spreaded')
    .send({
      noteId : current.noteIds[1]
    })
    .end(function(e, res){
      expect(res.status).to.be.equal(200);
      done();
    })
  })

  it('it should retrieve the 2 notes as part of the user\'s spreaded', function(done){
    superagent.get('http://ec2-54-154-80-189.eu-west-1.compute.amazonaws.com/users/' + current.userId + '/notes/spreaded')
    .send()
    .end(function(e, res){
      expect(res.status).to.be.equal(200);
      expect(res.body.length).to.be.equal(2);
      expect(res.body[0]._id).to.be.equal(current.noteIds[0]);
      expect(res.body[1]._id).to.be.equal(current.noteIds[1]);
      done();
    })
  })

  it('it should add the third note as killed by the user', function(done){
    superagent.post('http://ec2-54-154-80-189.eu-west-1.compute.amazonaws.com/users/' + current.userId + '/notes/kill')
    .send({
      noteId : current.noteIds[2]
    })
    .end(function(e, res){
      expect(res.status).to.be.equal(200);
      done();
    })
  })

  it('it should add the first note as favored by the user', function(done){
    superagent.post('http://ec2-54-154-80-189.eu-west-1.compute.amazonaws.com/users/' + current.userId + '/notes/favoris')
    .send({
      noteId : current.noteIds[0]
    })
    .end(function(e, res){
      expect(res.status).to.be.equal(200);
      done();
    })
  })

  it('it should add the second note as favored by the user', function(done){
    superagent.post('http://ec2-54-154-80-189.eu-west-1.compute.amazonaws.com/users/' + current.userId + '/notes/favoris')
    .send({
      noteId : current.noteIds[1]
    })
    .end(function(e, res){
      expect(res.status).to.be.equal(200);
      done();
    })
  })

  it('it should retrieve the 2 notes as part of the user\'s favored', function(done){
    superagent.get('http://ec2-54-154-80-189.eu-west-1.compute.amazonaws.com/users/' + current.userId + '/notes/favoris')
    .send()
    .end(function(e, res){
      expect(res.status).to.be.equal(200);
      expect(res.body.length).to.be.equal(2);
      expect(res.body[0]._id).to.be.equal(current.noteIds[0]);
      expect(res.body[1]._id).to.be.equal(current.noteIds[1]);
      done();
    })
  })

  it('it should add a new position for the user', function(done){
    superagent.post('http://ec2-54-154-80-189.eu-west-1.compute.amazonaws.com/users/' + current.userId + '/positions')
    .send({
      x : 34.02832,
      y : 102.3043
    })
    .end(function(e, res){
      expect(res.status).to.be.equal(201);
      done();
    })
  })
})
