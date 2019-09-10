// Load configuration from .env
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const log4js = require('log4js');

log4js.configure({
  appenders: {
    console: { type: 'stdout' },
    file: { type: 'dateFile', filename: 'logs/express_endpoint.log' }
  },
  categories: { default: { appenders: (process.env.NODE_ENV !== "test" ? ['file', 'console'] : ['file']), level: 'all' } }
});

const logger = log4js.getLogger('');

const app = express();
const port = process.env.PORT || 8002;

// Database Connection
const db = require('./db.js');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

function handleError(err, req, res) {
  logger.trace('Entered handleError');
  logger.warn('DB result contains an err');
  if (!err) {
    logger.error("SQL query has returned 0 rows or was NULL");

    res.status(404).send({
      message: 'SQL query returns 0 rows or was NULL.'
    });

    return;
  }

  if (err.errno === 3819) {
    err.code = "ER_CHECK_CONSTRAINT_VIOLATED";
  }

  logger.error(`${err.errno} (${err.code}) : ${err.sqlMessage}`);

  res.status(err.status || 500).send({
    message: 'Database error. ' + err.sqlMessage
  });
}

// Log every request to the server
app.use(function (req, res, next) {
  logger.trace(`${req.method} ${req.path}`);
  next();
});

app.get('/roles', (req, res) => {
  db.getRoles((err, rows) => {
    if (!Array.isArray(rows) || !rows.length || err) {
      return handleError(err, req, res);
    }
    res.send(rows);
  });
});

app.get('/role/:id', (req, res) => {
  const id = req.params.id;
  db.getRoleDetail(id, (err, rows) => {
    if (!Array.isArray(rows) || !rows.length || err) {
      return handleError(err, req, res);
    }
    res.send(rows[0]);
  });
});

app.get('/capabilities', (req, res) => {
  db.getCapabilities((err, rows) => {
    if (!Array.isArray(rows) || !rows.length || err) {
      return handleError(err, req, res);
    }
    res.send(rows);
  });
});

app.get('/capability/:id', (req, res) => {
  const id = req.params.id;
  db.getCapabilityDetail(id, (err, rows) => {
    if (!Array.isArray(rows) || !rows.length || err) {
      return handleError(err, req, res);
    }
    res.send(rows[0]);
  });
});

app.get('/bands', (req, res) => {
  db.getBands((err, rows) => {
    if (!Array.isArray(rows) || !rows.length || err) {
      return handleError(err, req, res);
    }
    res.send(rows);
  });
});

app.get('/band/:id', (req, res) => {
  const id = req.params.id;
  db.getBandDetail(id, (err, rows) => {
    if (!Array.isArray(rows) || !rows.length || err) {
      return handleError(err, req, res);
    }
    res.send(rows[0]);
  });
});

app.get('/families', (req, res) => {
  db.getFamilies((err, rows) => {
    if (!Array.isArray(rows) || !rows.length || err) {
      return handleError(err, req, res);
    }
    res.send(rows);
  });
});

app.get('/user_role', function (req, res) {
  logger.trace('GET user_role request');

  db.getNameAndRole(function (err, rows) {
    if (!Array.isArray(rows) || !rows.length || err) {
      return handleError(err, req, res);
    }
    logger.info("Sending user_role results back");
    res.send(rows[0]);
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
