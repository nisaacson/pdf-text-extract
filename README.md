# PDF Text Extract
Extract text from pdfs that contain searchable pdf text. The module calls the pdftotext command to perform the actual extraction
[![build status](https://secure.travis-ci.org/nisaacson/pdf-text-extract)](http://travis-ci.org/nisaacson/pdf-text-extract) [![Dependency Status](https://david-dm.org/nisaacson/pdf-text-extract.png)](https://david-dm.org/nisaacson/pdf-text-extract)

# Installation
```bash
npm install pdf-text-extract
```
You will need the **pdftotext** binary available on your path. There are packages available for many different operating systems

# Usage
```javascript
var filePath = path.join(__dirname, 'test/pdf')
var extract = require('pdf-text-extract')
extract(filePath, function (err, pages) {
  if (err) {
    console.dir(err)
    return
  }
  console.dir('extracted pages', pages)
})
```
The output will be an array of where each entry is a page of text. If you want just a string of all pages you can do `pages.join(' ')`



# Test
