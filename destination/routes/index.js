var express = require('express');
var router = express.Router();
var Busboy = require('busboy');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  const busboy = new Busboy({ headers: req.headers });

  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    const newFile = fs.createWriteStream('./test1.jpg');

    // Can successfully create a file
    file.on('data', function(data) {
      newFile.write(data);
    });

    file.on('end', function() {
      newFile.end();
      console.log('Finished writing file.');
      res.status(200).send(`The file was successfully uploaded!`);
    });

    file.on('error', function() {
      res.status(500).send(`The file couldn't be uploaded.`);
    });
  });

  req.pipe(busboy);
});

module.exports = router;
