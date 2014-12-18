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
      current.id = res.header.id;
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


})
