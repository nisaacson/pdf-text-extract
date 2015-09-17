var path = require('path')
var spawn = require('child_process').spawn

module.exports = function pdfTextExtract(filePath, options, cb) {

  // options is optional
  if (typeof(options) === 'function') {
    cb = options
    options = {}
  }

  filePath = path.resolve(filePath)

  // default options
  options.encoding    = options.encoding || 'UTF-8'
  options.layout      = options.layout   || 'layout'
  options.splitPages  = (options.splitPages !== false)

  // Build args based on options
  var args = []

  // First and last page to convert
  if (options.firstPage) { args.push('-f'); args.push(options.firstPage) }
  if (options.lastPage)  { args.push('-l'); args.push(options.lastPage) }

  // Resolution, in dpi. (null is pdftotext default = 72)
  if (options.resolution) { args.push('-r'); args.push(options.resolution) }

  // If defined, should be an object { x:x, y:y, w:w, h:h }
  if (typeof(options.crop) === 'object') { 
    if (options.crop.x) { args.push('-x'); args.push(options.crop.x) }
    if (options.crop.y) { args.push('-y'); args.push(options.crop.y) }
    if (options.crop.w) { args.push('-W'); args.push(options.crop.w) }
    if (options.crop.h) { args.push('-H'); args.push(options.crop.h) }
  }
  
  // One of either 'layout', 'raw' or 'htmlmeta'
  if (options.layout === 'layout')    args.push('-layout')
  if (options.layout === 'raw')       args.push('-raw')
  if (options.layout === 'htmlmeta')  args.push('-htmlmeta')

  // Output text encoding (UCS-2, ASCII7, Latin1, UTF-8, ZapfDingbats or Symbol)
  if (options.encoding) { args.push('-enc'); args.push(options.encoding) }

  // Output end of line convention (unix, dos or mac)
  if (options.eol) { args.push('-eol'); args.push(options.eol) }

  // Owner and User password (for encrypted files)
  if (options.ownerPassword) { args.push('-opw'); args.push(options.ownerPassword) }
  if (options.userPassword)  { args.push('-upw'); args.push(options.userPassword) }

  // finish up arguments
  args.push(filePath)
  args.push('-')

  streamResults(args, options, options.splitPages ? splitPages : cb)

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

/**
 * spawns pdftotext and returns its output
 */
function streamResults(args, options, cb) {
  var output = ''
  var stderr = ''
  var command = 'pdftotext'
  var child = spawn(command, args, options)
  child.stdout.setEncoding('utf8')
  child.stderr.setEncoding('utf8')
  child.stdout.on('data', stdoutHandler)
  child.stderr.on('data', stderrHandler)
  child.on('close', closeHandler)

  function stdoutHandler(data) {
    output += data
  }

  function stderrHandler(data) {
    stderr += data
  }

  function closeHandler(code) {
    if (code !== 0) {
      return cb(new Error('pdf-text-extract command failed: ' + stderr))
    }
    cb(null, output)
  }
}