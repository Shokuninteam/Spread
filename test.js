var superagent = require('superagent')
var expect = require('expect.js')

describe('Spread Express server-side : Node REST API', function(){
  var id;
  var current = {
    userId : [],
    noteIds : []
  };
  var urls = {
    local : 'localhost:8080',
    server : 'http://ec2-54-154-80-189.eu-west-1.compute.amazonaws.com'
  }
  var url = urls.local;

  it('it should create a user in Rueil-Mailmaison', function(done){
    superagent.post(url + '/users')
    .send({
      nickname: 'Frank',
      mail: 'f.bassard@gmail.com',
      pwd : 'UnbreakablePwd',
      avatar : '78FE6ZF8ZEfezfez00',
      x : '48.860169',
      y : '2.186220'
    })
    .end(function(e, res){
      expect(res.header.id).not.to.be.null;
      expect(res.status).to.be.equal(201);
      current.userId[0] = res.header.id;
      done();
    })
  })

  it('it should create a second user in Courbevoie', function(done){
    superagent.post(url + '/users')
    .send({
      nickname: 'Julie',
      mail: 'juhuguet9@gmail.com',
      pwd : 'UnbreakablePwd',
      avatar : '78FE928F8ZEfezfez00',
      x : '48.901030',
      y : '2.275050'
    })
    .end(function(e, res){
      expect(res.header.id).not.to.be.null;
      expect(res.status).to.be.equal(201);
      current.userId[1] = res.header.id;
      done();
    })
  })

  it('it should create a third user in 93', function(done){
    superagent.post(url + '/users')
    .send({
      nickname: 'Mohamed',
      mail: 'Momo@gmail.com',
      pwd : 'UnbreakablePwd',
      avatar : '78FE928F8ZEfedezez00',
      x : '48.936181',
      y : '2.357443'
    })
    .end(function(e, res){
      expect(res.header.id).not.to.be.null;
      expect(res.status).to.be.equal(201);
      current.userId[2] = res.header.id;
      done();
    })
  })

  it('it should create a forth user in Nanterre', function(done){
    superagent.post(url + '/users')
    .send({
      nickname: 'Adrien',
      mail: 'Adrien@gmail.com',
      pwd : 'UnbreakablePwd',
      avatar : '78FE994F8ZEfedezez00',
      x : '48.892423',
      y : '2.215331'
    })
    .end(function(e, res){
      expect(res.header.id).not.to.be.null;
      expect(res.status).to.be.equal(201);
      current.userId[3] = res.header.id;
      done();
    })
  })

  it('it should create a fifth user in Becon les Bryères', function(done){
    superagent.post(url + '/users')
    .send({
      nickname: 'Desirée',
      mail: 'Des@gmail.com',
      pwd : 'UnbreakablePwd',
      avatar : '78FE94F8ZEfedezez00',
      x : '48.905508',
      y : '2.268489'
    })
    .end(function(e, res){
      expect(res.header.id).not.to.be.null;
      expect(res.status).to.be.equal(201);
      current.userId[4] = res.header.id;
      done();
    })
  })

  it('it should create a sixth user in Bogota', function(done){
    superagent.post(url + '/users')
    .send({
      nickname: 'MomoBrother',
      mail: 'MomoBrother@gmail.com',
      pwd : 'UnbreakablePwd',
      avatar : '78FE94F8ZEfedezez00',
      x : '4.598056',
      y : '-74.075833'
    })
    .end(function(e, res){
      expect(res.header.id).not.to.be.null;
      expect(res.status).to.be.equal(201);
      current.userId[5] = res.header.id;
      done();
    })
  })

  it('it should create a seventh user in La réunion', function(done){
    superagent.post(url + '/users')
    .send({
      nickname: 'JulieFather',
      mail: 'JulieFather@gmail.com',
      pwd : 'UnbreakablePwd',
      avatar : '78FE94fezZEfedezez00',
      x : '-21.100000',
      y : '55.600000'
    })
    .end(function(e, res){
      expect(res.header.id).not.to.be.null;
      expect(res.status).to.be.equal(201);
      current.userId[6] = res.header.id;
      done();
    })
  })

  it('it should create an height user in La réunion', function(done){
    superagent.post(url + '/users')
    .send({
      nickname: 'JulieFather',
      mail: 'JulieFather@gmail.com',
      pwd : 'UnbreakablePwd',
      avatar : '78FE94fezZEfedezez00',
      x : '-21.100000',
      y : '55.600000'
    })
    .end(function(e, res){
      expect(res.header.id).not.to.be.null;
      expect(res.status).to.be.equal(201);
      current.userId[7] = res.header.id;
      done();
    })
  })

  it('it should create an nineth user in Belgium', function(done){
    superagent.post(url + '/users')
    .send({
      nickname: 'frankOncle',
      mail: 'frankOncle@gmail.com',
      pwd : 'UnbreakablePwd',
      avatar : '78394fezZEfedezez00',
      x : '50.910374',
      y : '4.355640'
    })
    .end(function(e, res){
      expect(res.header.id).not.to.be.null;
      expect(res.status).to.be.equal(201);
      current.userId[8] = res.header.id;
      done();
    })
  })

  it('it should create a tenth user in Le Havre', function(done){
    superagent.post(url + '/users')
    .send({
      nickname: 'frankBrother',
      mail: 'frankBrother@gmail.com',
      pwd : 'UnbreakablePwd',
      avatar : '794fezZEfedezez00',
      x : '49.494370',
      y : '0.107929'
    })
    .end(function(e, res){
      expect(res.header.id).not.to.be.null;
      expect(res.status).to.be.equal(201);
      current.userId[9] = res.header.id;
      done();
    })
  })

  it('it should create an eleventh user in Wellington', function(done){
    superagent.post(url + '/users')
    .send({
      nickname: 'Frank2',
      mail: 'Frank2@gmail.com',
      pwd : 'UnbreakablePwd',
      avatar : '79422fezZEfedezez00',
      x : '-41.286460',
      y : '174.776236'
    })
    .end(function(e, res){
      expect(res.header.id).not.to.be.null;
      expect(res.status).to.be.equal(201);
      current.userId[10] = res.header.id;
      done();
    })
  })

  it('it should create an twelvth user in Wellington', function(done){
    superagent.post(url + '/users')
    .send({
      nickname: 'Julie2',
      mail: 'Julie2@gmail.com',
      pwd : 'UnbreakablePwd',
      avatar : '79D422fezZEfedezez00',
      x : '-41.286460',
      y : '174.776236'
    })
    .end(function(e, res){
      expect(res.header.id).not.to.be.null;
      expect(res.status).to.be.equal(201);
      current.userId[11] = res.header.id;
      done();
    })
  })

  it('it should create a thirteenth user in Egypt', function(done){
    superagent.post(url + '/users')
    .send({
      nickname: 'Akhenaton',
      mail: 'Akhenaton@gmail.com',
      pwd : 'UnbreakablePwd',
      avatar : '7922fezZEfedezez00',
      x : '26.820553',
      y : '30.802498'
    })
    .end(function(e, res){
      expect(res.header.id).not.to.be.null;
      expect(res.status).to.be.equal(201);
      current.userId[12] = res.header.id;
      done();
    })
  })

  it('it should create a fourteenth user in Ouagadougou', function(done){
    superagent.post(url + '/users')
    .send({
      nickname: 'MomoMother',
      mail: 'MomoMother@gmail.com',
      pwd : 'UnbreakablePwd',
      avatar : '7922fezZEfedez00',
      x : '12.350000',
      y : '-1.516667'
    })
    .end(function(e, res){
      expect(res.header.id).not.to.be.null;
      expect(res.status).to.be.equal(201);
      current.userId[13] = res.header.id;
      done();
    })
  })

  it('it should create a fifteenth user in Moscow', function(done){
    superagent.post(url + '/users')
    .send({
      nickname: 'PotoVlad',
      mail: 'PotoVlad@gmail.com',
      pwd : 'UnbreakablePwd',
      avatar : '7922fdezezZEfedez00',
      x : '55.755826',
      y : '37.617300'
    })
    .end(function(e, res){
      expect(res.header.id).not.to.be.null;
      expect(res.status).to.be.equal(201);
      current.userId[14] = res.header.id;
      done();
    })
  })

  it('it should create a sixteenth user in Tokyo', function(done){
    superagent.post(url + '/users')
    .send({
      nickname: 'ShokuninHome',
      mail: 'ShokuninHome@gmail.com',
      pwd : 'UnbreakablePwd',
      avatar : '7922fdezezZEfedez00',
      x : '35.689487',
      y : '139.691706'
    })
    .end(function(e, res){
      expect(res.header.id).not.to.be.null;
      expect(res.status).to.be.equal(201);
      current.userId[15] = res.header.id;
      done();
    })
  })

  it('it should create a seventeenth user in Rueil-malmaison', function(done){
    superagent.post(url + '/users')
    .send({
      nickname: 'Meiske',
      mail: 'ShokuninHome@gmail.com',
      pwd : 'UnbreakablePwd',
      avatar : '7922fdezezZEfedez00',
      x : '48.860169',
      y : '2.186220'
    })
    .end(function(e, res){
      expect(res.header.id).not.to.be.null;
      expect(res.status).to.be.equal(201);
      current.userId[16] = res.header.id;
      done();
    })
  })

  it('it should create a eighteenth user in Berlin', function(done){
    superagent.post(url + '/users')
    .send({
      nickname: 'pounette',
      mail: 'Pounette@gmail.com',
      pwd : 'UnbreakablePwd',
      avatar : '7922fdezezZEfedez00',
      x : '52.520007',
      y : '13.404954'
    })
    .end(function(e, res){
      expect(res.header.id).not.to.be.null;
      expect(res.status).to.be.equal(201);
      current.userId[17] = res.header.id;
      done();
    })
  })

  it('it shouldn\'t creat a user with no password', function(done){
    superagent.post(url + '/users')
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
    superagent.post(url + '/users')
    .send({})
    .end(function(e, res){
      expect(res.status).to.be.equal(400);
      done();
    })
  })

  it('it should get precisely the created user', function(done){
    superagent.get(url + '/users/' + current.userId[0])
    .send()
    .end(function(e, res){
      expect(res.body.nickname).to.be.equal('Frank');
      expect(res.body.mail).to.be.equal('f.bassard@gmail.com');
      expect(res.body.avatar).to.be.equal('78FE6ZF8ZEfezfez00');
      expect(res.body.pos[0].x).to.be.equal(48.860169);
      expect(res.body.pos[0].y).to.be.equal(2.186220);
      expect(res.body.pos[0].date).not.to.be.equal.null;
      expect(res.status).to.be.equal(200);
      done();
    })
  })

  it('it should create a note assigned to the previously updated user', function(done){
    superagent.post(url + '/notes')
    .send({
        user : current.userId[0],
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
    superagent.post(url + '/notes')
    .send({
      user : current.userId[0],
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
    superagent.post(url + '/notes')
    .send({
      user : current.userId[0],
      content : "My fictive Killing note, testing my app",
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

  it('it should get the first note created', function(done){
    superagent.get(url + '/notes/' + current.noteIds[0])
    .send()
    .end(function(e, res){
      expect(res.status).to.be.equal(200);
      done();
    })
  })

  it('it should retrieve the 2 notes as part of the user\'s history', function(done){
    superagent.get(url + '/users/' + current.userId[0] + '/notes/history')
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
    superagent.post(url + '/users/' + current.userId[0] + '/notes/spreaded')
    .send({
      noteId : current.noteIds[0]
    })
    .end(function(e, res){
      expect(res.status).to.be.equal(200);
      done();
    })
  })

  it('it should add the second note as spreaded by the user', function(done){
    superagent.post(url + '/users/' + current.userId[0] + '/notes/spreaded')
    .send({
      noteId : current.noteIds[1]
    })
    .end(function(e, res){
      expect(res.status).to.be.equal(200);
      done();
    })
  })

  it('it should retrieve the 2 notes as part of the user\'s spreaded', function(done){
    superagent.get(url + '/users/' + current.userId[0] + '/notes/spreaded')
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
    superagent.post(url + '/users/' + current.userId[0] + '/notes/kill')
    .send({
      noteId : current.noteIds[2]
    })
    .end(function(e, res){
      expect(res.status).to.be.equal(200);
      done();
    })
  })

  it('it should add the first note as favored by the user', function(done){
    superagent.post(url + '/users/' + current.userId[0] + '/notes/favoris')
    .send({
      noteId : current.noteIds[0]
    })
    .end(function(e, res){
      expect(res.status).to.be.equal(200);
      done();
    })
  })

  it('it should add the second note as favored by the user', function(done){
    superagent.post(url + '/users/' + current.userId[0] + '/notes/favoris')
    .send({
      noteId : current.noteIds[1]
    })
    .end(function(e, res){
      expect(res.status).to.be.equal(200);
      done();
    })
  })

  it('it should retrieve the 2 notes as part of the user\'s favored', function(done){
    superagent.get(url + '/users/' + current.userId[0] + '/notes/favoris')
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
    superagent.post(url + '/users/' + current.userId[0] + '/positions')
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
