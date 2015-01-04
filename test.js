var superagent = require('superagent')
var expect = require('expect.js')

var avatarMale = 'iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAA\r\nABxpRE9UAAAAAgAAAAAAAABAAA'+
                  'AAKAAAAEAAAABAAAAGjFJ+4SIAAAZYSURBVHgB\r\n7FxrqBZFGNYuFlFZ5o8I8hzRCqKCjK4IWUGBJV0oAtEO2A8rIqR7Jyu'+
                  's6EJXhYqu\r\nkhERBJoRpGagZnbHoqKyOCYlVEhmYVer57Fv5GWY/XZ2z8x+O5cXnrOzO7Pvvs8z\r\ns7tz2e+MGJEtK5AV'+
                  'yArErMBuIHcwMAmYBlwG3A48DbwAPARcB8wAzgCOBPYHsgWs\r\nwAGIfTrwIrAN+LcidqD8OmAQOArIFoAC4xDjVcBK4C+gaqV3'+
                  'Kz8EfwuAU4FsLVPg\r\nEMTzBPA30K0SXeWtwXVyQ4AIvbbRCOBuYDvgqnKr+FmB654IZGtYgb1wvWuALUCV\r\nCvNVdiniGA9'+
                  'ka0ABvuc/AHxVZl2/PyGmcxrgn/QlTgP7H4C6leT7vH8Q250Ah53Z\r\nHCswB/5c9+x9NYjliHWsY/7JutsbzBcBvirLl99NiHlis'+
                  'rXmiDgfpUsAX5Xk2+/X\r\niJ0zkNlqKvAAzvNdSb79rwcHDlezVVRgNsr7rpym/K8CF77KslkqcCbKhdLhs21E\r\ni8Fpd0v+SRfjSt'+
                  'zPgK2wIZW7MematSA/EmXeibTy2VA5ZT0ByFagwCwcD+mOrhMr\r\n1w+yGRTg+v33QB1RQztnpoF/8ofmJ1L5bKw/AnmmUDR5fn'+
                  'ETW6+/7Kn0iOCffPI1\r\nKFAmWGz5v4Bz/u4QIvQDXEWLrYJt+FwJ3snbLVDARqwYy3yafO1DgA0JNwA26ilA\r\nsnYKmMd4Z1fh'+
                  'xM/Wk7XHwbyKWDGW/RMa7JdiCxgF0ls9N4Adnv27apD8NVJydiwY\r\nuxJQ+hmC38eA8wAOs24G2j7KmIsYk7NLwFhW3HDSnETiL4IO'+
                  'L1DxfBzn7NtwruHz\r\n3FcL4o768H0OK2SFhVJca3gQ4DvXZ2XW8c3fNyRnLmf/+GtfW+NT4hWgTkX5POcI\r\nWwKxlPvWUSWwo1f'+
                  'nw0t+dfSJoxhcNIxLEUsyNgZMXYhGH28OQzV+onUusBDodR+B\r\nS+F9QBJ2Fli6agBXO1KMn6BPBtg3+RJwFV8VPx/juknMCSw3CMyhG'+
                  'n9fV0Uwlh0P\r\n+DB+m/gw4Ov7xN/h28SVPy2L2k4AO504RZ4GPGPI08vK/Q9R3rfxjnwWkNd1kX4e\r\nPucZ/G7GsT2AaO0uMNMFHOywv'+
                  'deQp5eV+01OoFyB2FwOIfmTcpppNMR5i2htDZjJ\r\nStyGfc7Y0a4FZF5Zmo/pJu1sXMxVI1jdCfx0bHWeUX8tpP83j7WiBgcMYuj'+
                  'iqP3P\r\nxXlNJi/CxVz8Kxp2+Gh7Avqaxcs7cyL8Q7KqAtWW71dlU5FQx8u2fJX0ygZw4eGu\r\nL3wjgmda8n1f5EWV5HSsJMr0AsH'+
                  'weEO+Xl7tTxHn9SLJPoGKpc6WHV9lHyEhfWxU\r\nGbFt9wEh/c5ZIkj2IS2FKErzkbmvOK9Xyest4zXxoA6ce6Dpw9/hTG7977H'+
                  'Ff/XH\r\n3XoRKwX5FTAJJo9xCrctZhrVyFiL0vwqmDYa0Mss2pkT6Z9lGmH2qg8SXFdr+bo4\r\n3Od8QZuM8Zji7HZMNfwLDOfe1iZ'+
                  'yrmO5wUD4cnERLtl2E455VVb/hGtvSU7ccE2/\r\nLG6Z/1InGtM8AKfKozXe7b8BUozPsD+qw3i6lifLqfSkTtk2bdi/edsidsXh'+
                  'HpSd\r\nAOhDwE04xldh1LYQ7JQQantrh/FhhjxVhls2Hg4n22hjEdQXgIy3KM1RxDpD2Xk4\r\nFr0dB4a6MOwV3wHwcbrVkK/Kqwk'+
                  'UFGml9SOqzYCKt2irD/1Yjv2hPiAJYyfIJA4/\r\n7zKJo8ouDkCdiYhxI6Bitt0OBsDNWYh1es4U8n5nEfh1dCjc274OyGsVEP27'+
                  'X0pe\r\ndeFH3UVyxCD9tTHNMf5zgIq9aPsHyoxrIwGfMU21EMYkWIhDpKdKuL7rU+i2+u4v\r\nEcVU+TzG92totgEBF/Hh8UdDI+Q'+
                  'i3pFwYjPtK4XjMmxbh4BFmkxGhuRgSs8qOjn2\r\n429YiCMFGwpQkLLHP/kdEyAvJyFXXU1b6eSqzTnh7CCXfWUj1tPbkc+5jyTtaL'+
                  'DW\r\nBem2/2RgKs2w4PdWYJych/udhUiqUdzk/Op+Hb5uwW2u3xDa7513targsu3F7aez\r\nK8KTLXhx+rt/1xmJJk4C77KKV/lzAt'+
                  'JorQUvfiGdDQq8B6hK7rbdgnJjAlDsQks+\r\nswPg0kiIA5aCsXHMbySi+hfhPMVXQLeGzDxO/x4I9Nz+AwAA//8ykrwCAAAFu'+
                  '0lE\r\nQVTtm1uoFlUUx08Xswt0eeheHCvCiqAipZsS1YMUURQRRRTUQz0KJUKFLwVFPRgF\r\n3e3iQzciMqEIrLTIJAgMKrpohYlFZ'+
                  'IGVlZ6sfn9oYBhm9uz5PvfspbMW/JnvzF6z\r\n9lr/2WvtvWfmTEzkl+m4sAn8G4EpdE4CVmU+jsXEsdhqALn8ujKSOJG7AuyRy9FA\r\nvwfT'+
                  '9jNoGwA/oHNgwM5gm16NIK8gd4ExljQgX4n0/3pjvptx52g82RxJ4nb0Zpvx\r\nfGJiUaTf7xny2aQrZ+HV75Fkfo2ehVJ6GX78E+HzOnQOBy'+
                  '4tDMyjXRlelPvQcTl6\r\ne7fYS9l8CsZ/BSEf1bYRTAKXSAYuRO970Eas2l8Ee4G+5RA6VFa3+ag4LO9c+uYt\r\nur9D0XwDtBGs9md'+
                  'BnzsD+fY+CPmmaeEJoIHiMgYDl3DtGhAiW21LwDSQWs6ggw0g\r\n5M9a2s9N7cjQ7F9AwMqo0NTwAe3HJCTmGmxvBXU3fwvnHwdnA5cxGJ'+
                  'jBtQtBU0nX\r\n+TmgKQt/ok0LyZ0pe2LsXlB343VuJTgINIkWqrcDbXVdGhg4kfPPgCkgUm8DIRGZ\r\nnwDpVqH590kgm+PK+RhYBap9FH8'+
                  'vo21fEJK7aZT+X+BRMAlc/mfgBI7Pgb9BQaqO\r\n28DpICR6/KqHK+Xryr930PYymAW6iKrM5aBt7fE0Om07kLnoVGPTNvcpcCwYrIjk\r\n+aBpT'+
                  'tWN/BzsD0Ki7It5DPs2eppaLgXHA5X1QrR4PBlcAe4En4HyQKr+VoW5B7SJ\r\nBmjTVCWbeoZwc5uR3bFdWR/K3DLhKpkxch1KP4LytaHff6D7Mf'+
                  'gSTHW47lN0Y1f4\r\nL0TaXYHeJBiE3EKUoayvu2kqxzGiPbdW4srQOjvjnPsTm6oOqhYxcgNKXfpTNbgx\r\nxvCuqqOS+yDoQkqhq5X9UR0C'+
                  'V4bqIVJ17i3sdTnq3cRS0GVBqQoX84i4zg/tNjQ9\r\n7lZyANEsB3UBx57TvHxkR1aOQP9WsBbE9iM9VRCtGZTF8r2LHIfyN6BLf1VdLYr3\r\n6dKpZ'+
                  'V3dtI9ANchR/l6PnckRgz2V63RDF4ElQPPuV0AD63XwMFgArgKjrs5ncu1G\r\nMEps1WtWYkeLyF1aNCeL4Gpw4/z9HfbONMjKefjUZREaw8EabO5n'+
                  'MNYol6aj9S6I\r\nCbSrjub2+4EFcjRFPAR2gK5xxOi/ht22Zw2o2BItYl4CMQGOo7OOPi7OGLo+Bvm2\r\nhzgfyxjjSF3f1wMp5YGjSnPOSJ6OdtFcL'+
                  'lsNyj6k/n3HaK72f9VFdKlVdGpC6uyr\r\nXGqxl0pOw7AWjHV9pz6nac/8m0Z9o7chE0HFDdBcvBTMADtLtK9/HuQa2EVsX+CD\r\nhXVPI6/aXhXO5j5'+
                  'uwxctzg5r9La9Qc8RHgHbQe54iv4faHc7j8Y8QyQVZOn4G7gL\r\ndPmCWPtvvezZCsq2LPxWFdKW05x8iEcWCGryYTP+6amgtqdNovK6EPwCmux'+
                  'YOL8K\r\n/0yJFn4WiInxQQ+SbgLlvbW+2NFr2U0gxoYFnTn4akbewhMLpHTxQd8aXA2uBXok\r\n3OVaC7pv4rMJmY0XFggZog+zLIyAxT4AsiWAu'+
                  'M8uehw7xOyzELO4zyoz6d0CEUP2\r\nQfcgm+j9+ZDJtxC77kE20ZcrFkgYsg96RJ1N3qHnIZNvIXa9Cc0m2ktbIGHIPqzP\r\ndvfpeIsPgOwJoM/Vs'+
                  '8mQM89S7KH3G0kHhyUShuxL2z+nJhsEQybdUuw+ABjilm5I\r\n3774APABkKzKBw33PdK9v/pK5xXAK0AwUZM1ekbWZ2TfvHgF8AqQLMmDhvse6'+
                  'd5f\r\nfcXxCuAVIJioyRo9I+szsm9evAJ4BUiW5EHDfY9076++4ngF8AoQTNRkjZ6R9RnZ\r\nNy9eAbwCJEvyoOG+R7r3V19xvAJ4BQgmarJGz8j6j'+
                  'OybF68AXgGSJXnQcN8j3fur\r\nrzjZKsAyhocjPwfTgmnqjc6AM+AM1DLwH7dOzqOqGcDuAAAAAElFTkSuQmCC';

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
      avatar : avatarMale,
      lat : '48.860169',
      long : '2.186220'
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
      avatar : avatarMale,
      lat : '48.901030',
      long : '2.275050'
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
      avatar : avatarMale,
      lat : '48.936181',
      long : '2.357443'
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
      avatar : avatarMale,
      lat : '48.892423',
      long : '2.215331'
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
      avatar : avatarMale,
      lat : '48.905508',
      long : '2.268489'
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
      avatar : avatarMale,
      lat : '4.598056',
      long : '-74.075833'
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
      avatar : avatarMale,
      lat : '-21.100000',
      long : '55.600000'
    })
    .end(function(e, res){
      expect(res.header.id).not.to.be.null;
      expect(res.status).to.be.equal(201);
      current.userId[6] = res.header.id;
      done();
    })
  })

  it('it should create an height user in Sf', function(done){
    superagent.post(url + '/users')
    .send({
      nickname: 'KevinRose',
      mail: 'KevinRose@gmail.com',
      pwd : 'UnbreakablePwd',
      avatar : avatarMale,
      lat : '37.774929',
      long : '-122.419416'
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
      avatar : avatarMale,
      lat : '50.910374',
      long : '4.355640'
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
      avatar : avatarMale,
      lat : '49.494370',
      long : '0.107929'
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
      avatar : avatarMale,
      lat : '-41.286460',
      long : '174.776236'
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
      avatar : avatarMale,
      lat : '-41.286460',
      long : '174.776236'
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
      avatar : avatarMale,
      lat : '26.820553',
      long : '30.802498'
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
      avatar : avatarMale,
      lat : '12.350000',
      long : '-1.516667'
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
      avatar : avatarMale,
      lat : '55.755826',
      long : '37.617300'
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
      avatar : avatarMale,
      lat : '35.689487',
      long : '139.691706'
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
      avatar : avatarMale,
      lat : '48.860169',
      long : '2.186220'
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
      avatar : avatarMale,
      lat : '52.520007',
      long : '13.404954'
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
      avatar : avatarMale,
      lat : '34.9437432',
      long : '23.4298429'
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

  it('it should get precisely the first user created', function(done){
    superagent.get(url + '/users/' + current.userId[0])
    .send()
    .end(function(e, res){
      expect(res.body.nickname).to.be.equal('Frank');
      expect(res.body.mail).to.be.equal('f.bassard@gmail.com');
      expect(res.body.loc.coordinates[1]).to.be.equal(48.860169);
      expect(res.body.loc.coordinates[0]).to.be.equal(2.186220);
      expect(res.body.pos[0].date).not.to.be.equal.null;
      expect(res.status).to.be.equal(200);
      done();
    })
  })

  it('it should create a note assigned to the previously updated user', function(done){
    superagent.post(url + '/notes')
    .send({
        user : current.userId[0],
        content : "First note by franky ! ",
        tags : "tag1 tag2",
        lat : '48.860169',
        long : '2.186220'
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
      content : "Second note by Franky !",
      tags : "tag1 tag2",
      lat : '48.860169',
      long : '2.186220'
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
      content : "Hey, hey thir note !",
      tags : "tag1 tag2",
      lat : '48.860169',
      long : '2.186220'
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

  it('it should give 3 unanswered notes to Meiske', function(done){
    superagent.get(url + '/users/' + current.userId[16] + '/notes/unanswered')
    .send()
    .end(function(e, res){
      expect(res.status).to.be.equal(200);
      expect(res.body.length).to.be.equal(3);
      done();
    })
  })

  it('it should retrieve the 3 notes as part of the user\'s history', function(done){
    superagent.get(url + '/users/' + current.userId[0] + '/notes/history')
    .send()
    .end(function(e, res){
      expect(res.status).to.be.equal(200);
      expect(res.body.length).to.be.equal(3);
      done();
    })
  })

  it('it should add the first note as spreaded by the second user', function(done){
    superagent.post(url + '/users/' + current.userId[1] + '/notes/spreaded')
    .send({
      noteId : current.noteIds[0],
      lat : '48.901030',
      long : '2.275050'
    })
    .end(function(e, res){
      expect(res.status).to.be.equal(200);
      done();
    })
  })

  it('it should add the second note as spreaded by the second user', function(done){
    superagent.post(url + '/users/' + current.userId[1] + '/notes/spreaded')
    .send({
      noteId : current.noteIds[1],
      lat : '48.901030',
      long : '2.275050'
    })
    .end(function(e, res){
      expect(res.status).to.be.equal(200);
      done();
    })
  })

  it('it should retrieve the 2 notes as part of the second user\'s spreaded', function(done){
    superagent.get(url + '/users/' + current.userId[1] + '/notes/spreaded')
    .send()
    .end(function(e, res){
      expect(res.status).to.be.equal(200);
      expect(res.body.length).to.be.equal(2);
      expect(res.body[0]._id).to.be.equal(current.noteIds[0]);
      expect(res.body[1]._id).to.be.equal(current.noteIds[1]);
      done();
    })
  })


  it('it should add the third note as discarded by Meiske', function(done){
    superagent.post(url + '/users/' + current.userId[16] + '/notes/discard')
    .send({
      noteId : current.noteIds[2],
      lat : '48.860169',
      long : '2.186220'
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

  it('it should add a new position for the user : (Paris)', function(done){
    superagent.post(url + '/users/' + current.userId[0] + '/positions')
    .send({
      lat : 48.856614,
      long : 2.352222
    })
    .end(function(e, res){
      expect(res.status).to.be.equal(201);
      done();
    })
  })

  it('it should (mail) authentify the first user', function(done){
    superagent.put(url + '/users')
    .send({
      mail: 'f.bassard@gmail.com',
      pwd : 'UnbreakablePwd',
    })
    .end(function(e, res){
      expect(res.status).to.be.equal(200);
      expect(res.header.id).to.be.equal(current.userId[0]);
      done();
    })
  })

  it('it should (nickname) authentify the first user', function(done){
    superagent.put(url + '/users')
    .send({
      nickname: 'Frank',
      pwd : 'UnbreakablePwd',
    })
    .end(function(e, res){
      expect(res.status).to.be.equal(200);
      expect(res.header.id).to.be.equal(current.userId[0]);
      done();
    })
  })

})
