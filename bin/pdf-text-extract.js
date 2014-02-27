#!/usr/bin/env node

var extract = require('../index')

var path = require('path')
var fileName = process.argv[2]
if (!fileName) {
  throw new Error('file path must be specified as the argument like "pdf-text-extract /path/to/file"')
}
var filePath = path.resolve(fileName)
extract(filePath, cb)

function cb(err, pages) {
  if (err) {
    throw err
  }
  console.dir(pages)
}

