const express = require('express');
const yaml = require('js-yaml');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

let config = {};

let apiRoutes = express.Router();
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));


try {
  config = yaml.safeLoad(fs.readFileSync('config/app.yml', 'utf-8'));
} catch (e) {
  console.log(e);
}

mongoose.connect(config.database);
app.set('port', process.env.PORT || config.port);
app.set('secret', config.secret);

apiRoutes.use(function(req, res, next){
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', null);

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');


  let token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token){
    jwt.verify(token, app.get('secret'), function(err, decoded){
      if (err){
        return res.json({msg: 'Failed to authenticate token.'});
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({msg: 'No token provided.'});
  }
});

apiRoutes.post('/home', function(req, res){

});

app.use(function(req, res, next){
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', null);

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'POST');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');

  next();
});

app.use('/api', apiRoutes);

app.post('/login', function(req, res){
  User.findOne({ 'email' :  req.body.email }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      if (!user.validPassword(req.body.password)) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('secret'), {
          expiresIn: 1440 // 24 hours
        });

        res.json({
          success: true,
          message: 'Authentication successful!',
          token: token
        });
      }
    }
  });
});

app.post('/register', function(req, res){
  User.findOne({ 'email' : req.body.email }, function(err, user) {
    if (err)
      return done(err);
    if (user) {
      res.json({ success: false, message: 'That email is already taken.' });
    } else {
      hash = emailer.randomHash(256);
      var newUser = new User();
      newUser.email = req.body.email;
      newUser.username = req.body.username;
      newUser.first_name = req.body.firstname;
      newUser.last_name = req.body.lastname;
      newUser.account_type = req.body.account_type;
      newUser.password = newUser.generateHash(req.body.password);
      newUser.verified = false;
      newUser.verification_hash = hash;
      newUser.save(function(err) {
        if (err)
            throw err;
        emailer.sendVerificationEmail(req.body.email, hash);
        res.json({ success: true, message: 'Account created successfully!' });
      });

    }
  });
});

app.listen(app.get('port'), function(){
  console.log(`Started on port ${app.get('port')}`);
});
