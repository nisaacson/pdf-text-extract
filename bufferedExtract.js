var inspect = require('eyespect').inspector();
var spawn = require('child_process').spawn;
module.exports = function (filePath, cb) {
  var cmd = 'pdftotext'
  var args = ['-layout', filePath, '-']
  var child = spawn('pdftotext', ['-layout', filePath, '-']);
  var stdout = child.stdout;
  var stderr = child.stderr;
  var output = '';
  stdout.setEncoding('utf8');
  stderr.setEncoding('utf8');
  stderr.on('data', function(data) {
    return cb(data, null);
  });
  // buffer the stdout output
  stdout.on('data', function(data) {
    output += data;
  });
  stdout.on('close', function(data) {
    return cb(null, output);
  });
}
