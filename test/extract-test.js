var assert = require('assert')
var fs = require('fs')
var path = require('path')
var extract = require('../index.js')
var should = require('should')

describe('Pdf extract', function () {

  it('should return undefined err when everything is ok', function (done) {
    var filePath = path.join(__dirname, 'data', 'multipage.pdf')

    extract(filePath, function (err, pages) {
      should.not.exist(err)
      should.exists(pages)
      done()
    })
  })

  it('should accept files with space in name', function (done) {

    var filePath = path.join(__dirname, 'data', 'pdf with space in name.pdf')
    assert.ok(fs.existsSync(filePath), 'pdf file not found at path: ' + filePath)

    extract(filePath, function (err, pages) {

      should.not.exist(err)
      should.exist(pages)

      done()
    })
  })

  it('should allow large files', function (done) {
    this.timeout(5000)
    this.slow('4s')
    var filePath = path.join(__dirname, 'data', 'huge.pdf')

    var options = {
      cwd: null
    }
    extract(filePath, options, function (err, pages) {
      should.not.exists(err)
      should.exists(pages)

      done()
    })
  })
})
