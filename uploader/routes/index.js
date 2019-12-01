var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var request = require('request');
var fs = require('fs');
var Promise = require('bluebird');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  new formidable.IncomingForm().parse(req, (err, fields, files) => {
    if (err) {
      console.error('Error', err);
      throw err;
    }

    const file = files.file;

    Promise.promisify(request.post)({
      url: 'http://localhost:3001/',
      formData: {
        file: {
          value: fs.createReadStream(file.path),
          options: {
            filename: file.name,
          }
        }
      }
    }).then(res => {
      console.log(`The file was uploaded to the service: ${res.body}`);
    }).catch(err => {
      console.log(`There was an error uploading the file: ${err}`);
    })
  });

  res.render('upload');
});

module.exports = router;
