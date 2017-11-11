const express = require('express');
const yaml = require('js-yaml');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
//const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

let config = {};

let apiRoutes = express.Router();
app.use(bodyParser.json());



try {
  config = yaml.safeLoad(fs.readFileSync('config/app.yml', 'utf-8'));
} catch (e) {
  console.log(e);
}

app.set('port', process.env.PORT || config.port);
app.set('secret', config.secret);

app.use(function(req, res, next){
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', null);

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');

  next();
});


app.post('/login', function(req, res){
  console.log(req.body);
  res.json({'text': 'Login'});
});

app.listen(app.get('port'), function(){
  console.log(`Started on port ${app.get('port')}`);
});
