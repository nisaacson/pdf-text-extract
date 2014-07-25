var path = require('path')
var spawn = require('child_process').spawn
module.exports = function pdfTextExtract(filePath, options, cb) {
  if (typeof(options) === 'function') {
    cb = options
    options = {}
  }
  filePath = path.resolve(filePath)
  var args = [
    '-layout',
    '-enc',
    'UTF-8',
    filePath,
    //'"' + filePath + '"',
    '-'
  ]
  streamResults(args, options, splitPages)

  function splitPages(err, content) {
    if (err) {
      return cb(err)
    }
    var pages = content.split(/\f/)
    if (!pages) {
      return cb({
        message: 'pdf-text-extract failed',
        error: 'no text returned from the pdftotext command',
        filePath: filePath,
        stack: new Error().stack
      })
    }
    // sometimes there can be an extract blank page on the end
    var lastPage = pages[pages.length - 1]
    if (!lastPage) {
      pages.pop()
    }
    cb(null, pages)
  }
}
function streamResults(args, options, cb) {
  var output = ''
  var stderr = ''
  var command = 'pdftotext'
  var child = spawn(command, args, options)
  child.stdout.setEncoding('utf8')
  child.stderr.setEncoding('utf8')
  child.stdout.on('data', stdoutHandler)
  child.stderr.on('data', stderrHandler)
  child.on('exit', exitHandler)

  function stdoutHandler(data) {
    output += data
  }

  function stderrHandler(data) {
    stderr += data
  }

  function exitHandler(code) {
    if (code !== 0) {
      return cb(new Error('pdf-text-extract command failed: ' + stderr))
    }
    cb(null, output)
  }
}
