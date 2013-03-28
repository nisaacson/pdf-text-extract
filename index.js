var spawn = require('child_process').spawn;
module.exports = function (filePath, cb) {
  var cmd = 'pdftotext'
  var args = [
    '-layout',
    '-enc',
    'UTF-8',
    filePath,
    '-']
  var child = spawn('pdftotext', args)
  var stdout = child.stdout;
  var stderr = child.stderr;
  var text = '';
  stdout.setEncoding('utf8');
  stderr.setEncoding('utf8');

  stderr.on('data', function(data) {
    console.log(data)
    cb(data, null);
    cb = function() {}
  });
  // buffer the stdout output
  var events = 0
  stdout.on('data', function(data) {
    events += 1
    text += data;
  });
  stdout.on('close', function() {
    var pages = text.split(/\f/);
    if (!pages) {
      return cb({
        message: 'failed to extract text from your document',
        error: 'no text returned from the pdftotext command',
        stack: new Error().stack
      })
    }
    // sometimes there can be an extract blank page on the end
    var lastPage = pages[pages.length-1]
    if (!lastPage) {
      pages.pop()
    }
    cb(null, pages);
    cb = function() {}
  });
}
