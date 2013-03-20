var inspect = require('eyespect').inspector();
var assert = require('assert')
var fs = require('fs')
var path = require('path')
var bufferedExtract = require('../bufferedExtract.js')
var should = require('should');
describe('Buffered Extract', function () {
  it('should extract text', function (done) {
    var filePath = path.join(__dirname, 'data', 'multipage.pdf')
    assert.ok(fs.existsSync(filePath), 'pdf file not found at path: ' + filePath)
    bufferedExtract(filePath, function (err, reply) {
      should.not.exist(err)
      should.exist(reply)
      done()
    })
  })
})
