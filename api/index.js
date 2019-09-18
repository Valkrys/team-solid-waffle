// Load configuration from .env
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken")
var log4js = require('log4js');
var md5 = require('md5');
var cookieParser = require('cookie-parser')


log4js.configure({
  appenders: { 
    console: { type: 'stdout' },
    file: { type: 'dateFile', filename: 'logs/express_endpoint.log'}
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
app.use(cookieParser())

function verifyToken(req, res, next)
{
  if(!req.headers.authorization)
  {
    console.log("fail 1 ");
    return res.sendStatus(401);
  }

  let token = req.headers.authorization.split(' ')[1];
  console.log("Tooooooken 22: ");
  console.log(token);

  if(token == 'null')
  {
    console.log("fail 2 ");
    return res.sendStatus(401);
  }

  // let payload = jwt.verify(token,'secretKey');
  // jwt.verify(token, 'secretKey', function(err, decoded) {
  //   console.log(err) // bar
  // });
  
  // if(!payload)
  // {
  //   console.log("fail 3 ");
  //   return res.sendStatus(401);
  // }

  // return res.send('it works');
  // req.userId = payload.subject;
  next();
}
// app.use(verifyToken);


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

// Log every request to the server
app.use(function (req, res, next) {
  logger.trace(`${req.method} ${req.path}`);
  next();
});

app.get('/roles',verifyToken, (req, res) => {
  db.getRoles((err, rows) => {
    if (!Array.isArray(rows) || !rows.length || err) {
      return handleError(err, req, res);
    }
    res.send(rows);
  });
});

app.get('/role/:id',verifyToken, (req, res) => {
  const id = req.params.id;
  db.getRoleDetail(id, (err, rows) => {
    if (!Array.isArray(rows) || !rows.length || err) {
      return handleError(err, req, res);
    }
    res.send(rows[0]);
  });
});

app.get('/capabilities',verifyToken, (req, res) => {
  db.getCapabilities((err, rows) => {
    if (!Array.isArray(rows) || !rows.length || err) {
      return handleError(err, req, res);
    }
    res.send(rows);
  });
});

app.get('/capability/:id',verifyToken, (req, res) => {
  const id = req.params.id;
  db.getCapabilityDetail(id, (err, rows) => {
    if (!Array.isArray(rows) || !rows.length || err) {
      return handleError(err, req, res);
    }
    res.send(rows[0]);
  });
});

app.get('/bands',verifyToken, (req, res) => {
  db.getBands((err, rows) => {
    if (!Array.isArray(rows) || !rows.length || err) {
      return handleError(err, req, res);
    }
    res.send(rows);
  });
});

app.get('/band/:id',verifyToken, (req, res) => {
  const id = req.params.id;
  db.getBandDetail(id, (err, rows) => {
    if (!Array.isArray(rows) || !rows.length || err) {
      return handleError(err, req, res);
    }
    res.send(rows[0]);
  });
});

app.get('/families',verifyToken, (req, res) => {
  db.getFamilies((err, rows) => {
    if (!Array.isArray(rows) || !rows.length || err) {
      return handleError(err, req, res);
    }
    res.send(rows);
  });
});

app.post('/login', function (req, res) {
  var username = req.body.username;
  var plainPasswrod = req.body.password;
  db.getUserByUsername(username, function (rows) {

    if(md5(plainPasswrod) == rows[0].password)
    {
      let payload = { subject: username}
      let token = jwt.sign(payload, 'secretkey', {expiresIn: 120});
      console.log("Tooooooken 11: ");
      console.log(token);
      res.cookie("SESSIONID", token, {httpOnly:true, secure:true});
      res.send({token});
    }
    else {
      res.status(403).send({
        message: 'Wrong password'
      });
    }    
  })
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
