var superagent = require('superagent')
var expect = require('expect.js')

describe('Spread Express server-side : Node REST API', function(){
  var id;

  it('sucessfully create a user', function(done){
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
      expect(res.status).to.be.equal(201);
      done();
    })
  })

  /*it('retrieves an object', function(done){
    superagent.get('http://localhost:3000/collections/test/'+id)
    .end(function(e, res){
      // console.log(res.body)
      expect(e).to.eql(null)
      expect(typeof res.body).to.eql('object')
      expect(res.body._id.length).to.eql(24)
      expect(res.body._id).to.eql(id)
      done()
    })
  })

  it('retrieves a collection', function(done){
    superagent.get('http://localhost:3000/collections/test')
    .end(function(e, res){
      // console.log(res.body)
      expect(e).to.eql(null)
      expect(res.body.length).to.be.above(0)
      expect(res.body.map(function (item){return item._id})).to.contain(id)
      done()
    })
  })

  it('updates an object', function(done){
    superagent.put('http://localhost:3000/collections/test/'+id)
    .send({name: 'Peter'
    , email: 'peter@yahoo.com'})
    .end(function(e, res){
      // console.log(res.body)
      expect(e).to.eql(null)
      expect(typeof res.body).to.eql('object')
      expect(res.body.msg).to.eql('success')
      done()
    })
  })

  it('checks an updated object', function(done){
    superagent.get('http://localhost:3000/collections/test/'+id)
    .end(function(e, res){
      // console.log(res.body)
      expect(e).to.eql(null)
      expect(typeof res.body).to.eql('object')
      expect(res.body._id.length).to.eql(24)
      expect(res.body._id).to.eql(id)
      expect(res.body.name).to.eql('Peter')
      done()
    })
  })

  it('removes an object', function(done){
    superagent.del('http://localhost:3000/collections/test/'+id)
    .end(function(e, res){
      // console.log(res.body)
      expect(e).to.eql(null)
      expect(typeof res.body).to.eql('object')
      expect(res.body.msg).to.eql('success')
      done()
    })
  })
*/
})
