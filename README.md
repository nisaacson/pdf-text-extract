# PDF Text Extract
Extract text from pdfs that contain searchable pdf text. The module calls the pdftotext command to perform the actual extraction

# Installation
```bash
npm install pdf-text-extract
```
You will need the **pdftotext** binary available on your path. There are packages available for many different operating systems

# Usage
```javascript
var inspect = require('eyespect').inspector();
var filePath = path.join(__dirname, 'test/pdf')
var extract = require('pdf-text-extract')
extract(filePath, function (err, pages) {
  if (err) {
    inspect(err, 'error extracting text from file')
    return
  }
  inspect(pages, 'extracted pages')
})
```
The output will be an array of where each entry is a page of text. If you want just a string of all pages you can do `pages.join(' ')`



# Test
