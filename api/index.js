const express = require("express");
const bodyParser = require("body-parser");

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

app.get('/user_role', function(req, res) {
  db.getNameAndRole(function(rows) {
    res.send(rows[0]);
  })
});

app.get('/roles', function(req, res) {
  db.getJobRoles(function(rows) {
    res.send(rows);
  })
});

app.get('/:jobFamily/:capabilityName/:bandName', function (req, res) {
  var jobFamily = req.params.jobFamily;
  var capabilityName = req.params.capabilityName;
  var bandName = req.params.bandName;
  console.log(format(capabilityName));
  db.getRoleSpecification(jobFamily, format(capabilityName), bandName, function (rows) {
    res.send(rows);
  })
});

app.get('/keyDetails/:userID', function (req, res) {
  var userID = req.params.userID;
  db.getCapability(userID, function (rows) {
    res.send(rows[0]);
  })
});

app.get('/keyDetails/:userID', function (req, res) {
  var userID = req.params.userID;
  db.getCapability(userID, function (rows) {
    res.send(rows[0]);
  })
});

app.get('/keyDetails/:userID', function (req, res) {
  var userID = req.params.userID;
  db.getCapability(userID, function (rows) {
    res.send(rows[0]);
  })
});

function format(string){
  return string.replace(/-/g, " ");
}
