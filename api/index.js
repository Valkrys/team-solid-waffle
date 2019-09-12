const express = require("express");
const bodyParser = require("body-parser");

var log4js = require('log4js');

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
