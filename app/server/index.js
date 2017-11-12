const bluebird = require('bluebird');
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('https');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const morgan = require('morgan');
const nodemailer = require('nodemailer');
const yaml = require('js-yaml');

const Campaign = require('./models/campaign.js');
const User = require('./models/user.js');

const app = express();
const apiRoutes = express.Router();

let config = {};

try {
  config = yaml.safeLoad(fs.readFileSync('config/app.yml', 'utf-8'));
} catch (e) {
  console.log(e);
}


app.use(bodyParser.json());
app.set('port', process.env.PORT || config.port);
app.set('secret', config.secret);

// use morgan to log requests to the console
app.use(morgan('dev'));

mongoose.Promise = bluebird;

mongoose.connect(config.database, {useMongoClient: true, autoIndex: false});


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

apiRoutes.put('/users', function(req, res){
  User.findOne({ 'email' : req.decoded.email }, function(err, user) {
    if (err)
      return done(err);
    if (user) {
      user.username = req.body.username || user.username;
      user.first_name = req.body.first_name || user.first_name;
      user.last_name = req.body.last_name || user.last_name;
      if (req.body.password){
        user.password = user.generateHash(req.body.password);
      }
      user.save(function(err) {
        if (err)
            throw err;
        //emailer.sendVerificationEmail(req.body.email, hash);
        res.json({msg: 'OK' });
      });

    }
  });
});

apiRoutes.post('/campaigns', function(req, res){
  User.findOne({ 'email' : req.decoded.email }, function(err, user) {
    if (err)
      return done(err);
    if (user) {
      let campaign = new Campaign();
      campaign.name = req.body.name;
      campaign.type = req.body.type;
      campaign.save(function(err) {
        if (err)
            throw err;
      });
      user.campaigns.push(campaign);
      user.save(function(err) {
        if (err)
            throw err;
      });
      res.json({msg: 'Campaign Created' });
    }
  });
});

apiRoutes.get('/campaigns', function(req, res){
  User.findOne({ 'email' : req.decoded.email }).populate('campaigns').exec(function (err, user) {
    if (err)
      return done(err);
    if (user) {
      return res.json(user.toJSON().campaigns);
    }
  });
});

app.use('/api', apiRoutes);

app.post('/login', function(req, res){
  User.findOne({ 'email' :  req.body.email }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.status(403).send({msg: 'User not found'});
    } else if (user) {
      if (!user.validPassword(req.body.password)) {
        res.json({msg: 'Authentication failed. Wrong password.' });
      } else {
        // if user is found and password is right
        // create a token
        let userJSON = user.toJSON();
        var token = jwt.sign({
          'username': userJSON.username,
          'email': userJSON.email
        }, app.get('secret'), {
          expiresIn: 1440 // 24 hours
        });

        res.json({
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
      res.json({ msg: 'That email is already taken.' });
    } else {
      var newUser = new User();
      newUser.email = req.body.email;
      newUser.username = req.body.username;
      newUser.first_name = req.body.firstname;
      newUser.last_name = req.body.lastname;
      newUser.account_type = req.body.account_type;
      newUser.password = newUser.generateHash(req.body.password);
      newUser.verified = false;
      newUser.save(function(err) {
        if (err)
            throw err;
        //emailer.sendVerificationEmail(req.body.email, hash);
        res.json({msg: 'Account created successfully!' });
      });

    }
  });
});

app.listen(app.get('port'), function(){
  console.log(`Started on port ${app.get('port')}`);
});
