var spawn = require('child_process').spawn
var bufferExtract = require('./bufferExtract')
var streamingExtract = require('./bufferExtract')
module.exports = function (filePath, outStream, cb) {
  // allow the user to either accept streaming output or buffer everything and read it back all at once
  if (!cb) {
    cb = outStream
    bufferExtract(filePath, cb)
    return
  }
  streamingExtract(filePath, outStream)
}
