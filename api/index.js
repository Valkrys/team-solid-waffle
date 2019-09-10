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
    res.send(rows);
  })
});

app.get('/capabilities_roles', function(req, res) {
  console.log(req.body);
  db.getRolesForCapabilities(req.query.capabilities, function(rows) {
    res.send(rows);
  })
});

