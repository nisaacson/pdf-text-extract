var assert = require('assert')
var fs = require('fs')
var path = require('path')
var extract = require('../index.js')
var should = require('should');
describe('Buffered Extract', function () {
  it('should extract text', function (done) {
    var desiredNumPages = 8
    var filePath = path.join(__dirname, 'data', 'multipage.pdf')
    assert.ok(fs.existsSync(filePath), 'pdf file not found at path: ' + filePath)
    extract(filePath, function (err, pages) {
      should.not.exist(err)
      should.exist(pages, 'no pages extracted')
      pages.length.should.eql(desiredNumPages)
      pages.map(function (page) {
        should.exist(page, 'page text content should exist')
        page.length.should.be.above(0)
      })
      done()
    })
  })
})
