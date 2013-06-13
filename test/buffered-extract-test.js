var assert = require('assert')
var fs = require('fs')
var path = require('path')
var extract = require('../index.js')
var should = require('should');
var inspect = require('eyespect').inspector()
describe('Buffered Extract', function () {
  it('should extract text', function (done) {
    process.stdout.on('data', function (data) {
      inspect(data,'data')
    })
    var desiredNumPages = 8
    var filePath = path.join(__dirname, 'data', 'multipage.pdf')
    assert.ok(fs.existsSync(filePath), 'pdf file not found at path: ' + filePath)
    extract(filePath, function (err, pages) {
      should.exist(pages)
      pages.length.should.eql(desiredNumPages)
      pages.map(function (page) {
        should.exist(page)
      })
      done()
    })
  })
})
