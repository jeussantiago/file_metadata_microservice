'use strict';

var express = require('express');
var cors = require('cors');
//reading files
var multer = require("multer");
var upload = multer({dest: "uploads/"})

// require and use "multer"...

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

var file_metadata_api = "/api/fileanalyse";
app.post(file_metadata_api, upload.single("upfile"), function(req, res, next) {
  //read uploaded file data
  var uploaded_field = req.file;
  //format it
  var json_file = {
    name: uploaded_field.originalname,
    type: uploaded_field.mimetype,
    size: uploaded_field.size
  }
  res.json(json_file)
})


app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
