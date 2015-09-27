# PDF Text Extract

Extract text from pdfs that contain searchable pdf text. The module is wrapper that calls the `pdftotext` command to perform the actual extraction

[![Build Status](https://travis-ci.org/nisaacson/pdf-text-extract.png?branch=master)](https://travis-ci.org/nisaacson/pdf-text-extract) [![Dependency Status](https://david-dm.org/nisaacson/pdf-text-extract.png)](https://david-dm.org/nisaacson/pdf-text-extract)

# Installation
```bash
npm install pdf-text-extract
```


You will need the `pdftotext` binary available on your path. There are packages available for many different operating systems

See [https://github.com/nisaacson/pdf-extract#osx](https://github.com/nisaacson/pdf-extract#osx) for how to install the `pdftotext` command


# Usage

## As a module

```javascript
var path = require('path')
var filePath = path.join(__dirname, 'test/data/multipage.pdf')
var extract = require('pdf-text-extract')
extract(filePath, function (err, pages) {
  if (err) {
    console.dir(err)
    return
  }
  console.dir(pages)
})
```
The output will be an array of where each entry is a page of text. If you want just a string of all pages you can set the option to `splitPages: false`.

```javascript
var filePath = path.join(__dirname, 'test/data/multipage.pdf')
var extract = require('pdf-text-extract')
extract(filePath, { splitPages: false }, function (err, text) {
  if (err) {
    console.dir(err)
    return
  }
  console.dir(text)
})
```

You can set the following options:
- `firstPage`: First page to extract
- `lastPage`: Last page to extract
- `resolution`: in dpi, as is specified by pdftotext -r
- `crop`: Should be an object { x:x, y:y, w:w, h:h }
- `layout`: Should be either `layout`, `raw` or `htmlmeta`. Default: `layout`
- `encoding`: Should be either `UCS-2`, `ASCII7`, `Latin1`, `UTF-8`, `ZapfDingbats` or `Symbol`. Default: `UTF-8`
- `eol`: End of line convention. One of either: `unix`, `dos` or `mac`
- `ownerPassword`: Owner password (for encrypted files)
- `userPassword`: User password (for encrypted files)
- `splitPages`: If true, the result will be and array of pages. Default: true.


If needed you can pass an optional arguments to the extract function. These will be passed to the `child_process.spawn` call.

```javascript
var filePath = path.join(__dirname, 'test/data/multipage.pdf')
var extract = require('pdf-text-extract')
var options = {
  cwd: "./"
}
extract(filePath, options, function (err, pages) {
  if (err) {
    console.dir(err)
    return
  }
  console.dir('extracted pages', pages)
})
```



## As a command line tool

```bash
npm install -g pdf-text-extract
```

Execute with the filePath as an argument. Output will be json-formatted array of pages

```bash
pdf-text-extract ./test/data/multipage.pdf
# outputs
# ['<page 1 content...>', '<page 2 content...>']
```

# Test

```bash
# install dev dependencies
npm install
# run tests
npm test
