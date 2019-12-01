var express = require('express');
var router = express.Router();
var Busboy = require('busboy');
var Service = require('../scripts/service');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  var busboy = new Busboy({ headers: req.headers });

  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    // PASSES TO DESTINATION BUT DOESN'T SEEM USABLE
    // file.pipe(request.post('http://localhost:3002/'));

    // NEED TO PASS CONTENT LENGTH
    const contentLength = req.headers['content-length'];
    return Service.uploadToDestination(file, contentLength)
      .then(data => {
        res.status(200).send(data);
      }).catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  });

  req.pipe(busboy);
});

module.exports = router;
