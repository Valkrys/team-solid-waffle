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

app.get('/job_role_details', function(req, res) {
  db.getJobRoleDetails(function(rows) {
    res.send(rows);
  })
});

