var superagent = require('superagent')
var expect = require('expect.js')

describe('Spread Express server-side : Node REST API', function(){
  var id;
  var current = {};

  it('should create a user', function(done){
    superagent.post('http://localhost:3030/users')
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

  it('shouldn\'t creat a user with no password', function(done){
    superagent.post('http://localhost:3030/users')
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

  it('shouldn\'t creat an empty user', function(done){
    superagent.post('http://localhost:3030/users')
    .send({})
    .end(function(e, res){
      expect(res.status).to.be.equal(400);
      done();
    })
  })

  it('should get precisely the created user', function(done){
    superagent.get('http://localhost:3030/users/' + current.userId)
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

  it('should create a note assigned to the previously updated user', function(done){
    superagent.post('http://localhost:3030/notes')
    .send({
        user : current.userId,
        content : "My fictive note, testing my app",
        tags : "tag1 tag2"
    })
    .end(function(e, res){
      expect(res.header.id).not.to.be.null;
      expect(res.status).to.be.equal(201);
      current.noteId = res.header.id;
      done();
    })
  })

  it('should create a second note assigned to the same user', function(done){
    superagent.post('http://localhost:3030/notes')
    .send({
      user : current.userId,
      content : "My fictive note, testing my app",
      tags : "tag1 tag2"
    })
    .end(function(e, res){
      expect(res.header.id).not.to.be.null;
      expect(res.status).to.be.equal(201);
      done();
    })
  })

  it('should get the first note created', function(done){
    superagent.get('http://localhost:3030/notes/' + current.noteId)
    .send()
    .end(function(e, res){
      expect(res.status).to.be.equal(200);
      done();
    })
  })

  it('should retrieve the 2 notes as part of the user\'s history', function(done){
    superagent.get('http://localhost:3030/users/' + current.userId + '/notes/history')
    .send()
    .end(function(e, res){
      expect(res.status).to.be.equal(200);
      expect(res.body.length).to.be.equal(2);
      done();
    })
  })

})