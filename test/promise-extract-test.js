var assert = require('assert')
var fs = require('fs')
var path = require('path')
var Extract = require('../index.js')
var should = require('should')

describe('Pdf extract', function () {
  it('should return output and no error when everything is ok', function (done) {
    var filePath = path.join(__dirname, 'data', 'multipage.pdf')
    var extractor = new Extract(filePath)
    extractor.then(function (err, pages) {
      should.not.exist(err)
      should.exists(pages)
      done()
    })
  })

  it('should accept files with space in name', function (done) {
    var filePath = path.join(__dirname, 'data', 'pdf with space in name.pdf')
    assert.ok(fs.existsSync(filePath), 'pdf file not found at path: ' + filePath)

    var extractor = new Extract(filePath)
    extractor.then(function (err, pages) {
      should.not.exist(err)
      should.exist(pages)

      done()
    })
  })

  it('should work with parallel data streams', function (done) {
    var filePath = path.join(__dirname, 'data', 'pdf with space in name.pdf')

    var streams = 10
    var complete = 0
    for (var i = 0; i < streams; i++) {
      var extractor = new Extract(filePath)
      extractor.then(function (err, pages) {
        should.not.exist(err)
        should.exists(pages[0])
        complete++
        if (complete === streams) {
          done()
        }
      })
    }
  })

  it('should allow large files', function (done) {
    this.timeout(5000)
    this.slow('4s')
    var filePath = path.join(__dirname, 'data', 'huge.pdf')

    var options = {
      cwd: null
    }
    var extractor = new Extract(filePath, options)
    extractor.then(function (err, pages) {
      should.not.exists(err)
      should.exists(pages)
      done()
    })
  })

  it('should support custom pdftotext command undefined err when everything is ok', function (done) {
    var filePath = path.join(__dirname, 'data', 'multipage.pdf')
    var options = {}
    var pdfToTextCommand = 'pdftotext'

    var extractor = new Extract(filePath, options, pdfToTextCommand)
    extractor.then(function (err, pages) {
      should.not.exist(err)
      should.exists(pages)
      done()
    })
  })
})
