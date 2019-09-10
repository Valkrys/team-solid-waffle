const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken")
var log4js = require('log4js');
var md5 = require('md5');
var cookieParser = require('cookie-parser')


log4js.configure({
  appenders: { express_endpoint: { type: 'dateFile', filename: 'logs/express_endpoint.log'} },
  categories: { default: { appenders: ['express_endpoint'], level: 'all' } }
});

const logger = log4js.getLogger('express_endpoint');

// Load configuration from .env
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8002;

// Database Connection
const db = require('./db.js');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cookieParser())

function verifyToken(req, res, next)
{
  if(!req.cookies.SESSIONID)
  {
    return res.send('Unathorized request');
  }

  let token = req.cookies.SESSIONID;

  if(token == 'null')
  {
    return res.send('Unathorized request');
  }

  let payload = jwt.verify(token,'secretKey');

  if(!payload)
  {
    return res.send('Unathorized request');
  }

  // return res.send('it works');
  req.userId = payload.subject;
  next();
}
app.use(verifyToken);


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


function handleError(err, req, res) {
  logger.trace('Entered handleError');
  logger.warn('DB result contains an err');
  if(!err) {
    logger.error("SQL query has returned 0 rows or was NULL");

    res.status(404).send({
      message: 'SQL query returns 0 rows or was NULL.'
    });

    return;
  }

  if (err.errno === 3819){
    err.code = "ER_CHECK_CONSTRAINT_VIOLATED";
  } 

  logger.error(`${err.errno} (${err.code}) : ${err.sqlMessage}`);

  res.status(err.status || 500).send({
      message: 'Database error. ' + err.sqlMessage
  });
}

app.get('/user_role', function(req, res) {
  logger.trace('GET user_role request');

  db.getNameAndRole(function(err, rows) {
    if(!Array.isArray(rows) || !rows.length || err) { 
      return handleError(err, req, res);
    }
    logger.info("Sending user_role results back");
    res.send(rows[0]);
  });

});

app.get('/roles', function(req, res) {
  logger.trace('GET role request');

  db.getJobRoles(function(err, rows) {
    if(!Array.isArray(rows) || err) { 
      return handleError(err, req, res); 
    }
    logger.info("Sending roles results back");
    res.send(rows);
  })
});

app.get('/roleSpecification/:jobFamily/:capabilityName/:bandName', function (req, res) {
  logger.trace('GET roleSpecification request');

  var jobFamily = req.params.jobFamily;
  var capabilityName = req.params.capabilityName;
  var bandName = req.params.bandName;

  logger.debug('/roleSpecification/ params: jobFamily-' + jobFamily + 
  ', capabilityName- ' + capabilityName + ', bandName- ' + bandName);

  db.getRoleSpecification(format(jobFamily), format(capabilityName), format(bandName), function (err, rows) {
    if(!Array.isArray(rows) || !rows.length || err) { 
      return handleError(err, req, res); 
    }
    logger.info("Sending roleSpecification results back");
    res.send(rows[0]);
  })
});

app.get('/capabilities_roles/:capability', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  logger.trace('GET carousel request');

  var capabilityName = req.params.capability;

  logger.debug('/carousel/ params: capabilityName- ' + capabilityName);

  db.getRolesForCapabilities(format(capabilityName), function(err, rows) {
    if(!Array.isArray(rows) || err) {
      return handleError(err, req, res);
    }
    logger.info("Sending capabilities_roles back");
    res.send(rows);
  })
});

//Sends back array of JSON objects containing role name and capability name;
app.get('/carousel/:bandName/', function (req, res) {
  logger.trace('GET carousel request');

  var bandName = req.params.bandName;
  
  logger.debug('/carousel/ params: bandName- ' + bandName);

  db.getCarouselRoleAndCapability(format(bandName), function (err, rows) {
    if(!Array.isArray(rows) || err) {
      return handleError(err, req, res);
    }
    logger.info("Sending carousel results back");
    res.send(rows);
  })
});

app.get('/capability/:userID', function (req, res) {
  var userID = req.params.userID;
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  db.getCapability(userID, function (rows) {
    res.send(rows[0]);
  })
});

app.post('/login', function (req, res) {
  var username = req.body.username;
  var plainPasswrod = req.body.password;
  db.getUserByUsername(username, function (rows) {

    if(md5(plainPasswrod) == rows[0].password)
    {
      let payload = { subject: username}
      let token = jwt.sign(payload, 'secretkey', {expiresIn: 120});
      res.cookie("SESSIONID", token, {httpOnly:true, secure:true});
      res.send({token});
    }
    else {
      res.send({
        message: 'Wrong password'
      });
    }

    
  })
});

app.get('/keyDetails/:userID', function (req, res) {
  logger.trace('GET keyDetails request');

  var userID = req.params.userID;

  logger.debug('/keyDetails/ params: userID- ' + userID);

  db.getKeyDetails(userID, function (err, rows) {
    if(!Array.isArray(rows) || !rows.length || err) {
      return handleError(err, req, res);
    }
    logger.info("Sending keyDetails results back");
    res.send(rows[0]);
  })
});

function format(string) {
  return string.replace(/-/g, " ");
}


