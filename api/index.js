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

app.get('/user_role', function (req, res) {
  db.getNameAndRole(function (rows) {
    res.send(rows[0]);
  })
});

app.get('/roles', function (req, res) {
  db.getJobRoles(function (rows) {
    res.send(rows);
  })
});

app.get('/roleSpecification/:jobFamily/:capabilityName/:bandName', function (req, res) {
  var jobFamily = req.params.jobFamily;
  var capabilityName = req.params.capabilityName;
  var bandName = req.params.bandName;
  console.log("format(capabilityName)");
  db.getRoleSpecification(format(jobFamily), format(capabilityName), format(bandName), function (rows) {
    res.send(rows[0]);
  })
});


//Sends back array of JSON objects containing role name and capability name;
app.get('/carousel/:bandName/', function (req, res) {
  var bandName = req.params.bandName;

  db.getCarouselRoleAndCapability(format(bandName), function (rows) {
    res.send(rows);
  })
});

app.get('/keyDetails/:userID', function (req, res) {
  var userID = req.params.userID;
  db.getKeyDetails(userID, function (rows) {
    res.send(rows[0]);
  })
});

function format(string) {
  return string.replace(/-/g, " ");
}
