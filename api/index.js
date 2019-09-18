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

/*
* Roles
*/
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

function pick(obj, props) {
  let picked = {};
  props.forEach((prop) => {
    if (obj[prop]) {
      picked[prop] = obj[prop];
    }
  });

  return picked;
};

app.put('/role/:id', (req, res) => {
  const id = req.params.id;
  req.body.name = req.body.roleName;
  const changes = pick(req.body, ['name', 'description', 'capabilityID', 'bandID', 'responsibilities']);
  db.updateRole(id, changes, (err, result) => {
    if (err) {
      return handleError(err, req, res);
    }
    if (result.affectedRows === 0) {
      logger.error(`404 not found`)
      return res.sendStatus(404);
    } else if (err) {
      return handleError(err, req, res);
    }
    db.getRoleDetail(id, (err, rows) => {
      if (!Array.isArray(rows) || !rows.length || err) {
        return handleError(err, req, res);
      }
      res.send(rows[0]);
    });
  });
});

/*
* Capabilities
*/
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

/*
* Bands
*/
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

/*
* Families
*/
app.get('/families', (req, res) => {
  db.getFamilies((err, rows) => {
    if (!Array.isArray(rows) || !rows.length || err) {
      return handleError(err, req, res);
    }
    res.send(rows);
  });
});

/*
* Login
*/
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

app.get('/trainings', function (req, res) {
  logger.trace('GET trainings request');
  db.getTrainings(function (err, rows) {
    if(!Array.isArray(rows) || !rows.length || err) {
      return handleError(err, req, res);
    }
    logger.info("Sending trainings results back");
    res.send(rows);
  });
});

app.post('/role', function (req, res) {
  logger.trace('POST role request');
  logger.trace(req.body);
  db.insertRole(req.body, function (err) {
    if (err) {
      return handleError(err, req, res);
    }
    logger.info("Added role");
    
    res.status(200).send({
      message: 'A new role was successfully added!'
    });
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

app.post('/training', function (req, res) {
  console.log(req);
  db.insertTraining(req.body, function (err) {
    if (err) return handleError(err, req, res);
    else {
      res.send({message: "Added training", body: req.body.bandRank});
    }
  })
});

app.post('/band', function (req, res) {
  function insertBand(){
    const bandRanks = [];
    db.getBands(function (err, rows) {
      for (let row of rows) {
        bandRanks.push(row.bandRank);
      }
    });

    db.insertBand(req.body, function (err) {
      if (err) return handleError(err, req, res);
      else {
          if (req.body.bandRank - Math.max.apply(Math, bandRanks) <= 1) {
            logger.info("Added band");
            res.status(200).send({
              message: 'Band added successfully!'
            });
          } else {
            res.status(400).send({
              message: 'Invalid rank, please refer to the range provided and try again!'
            });
          }
        }
      });
  }

  let count = 0;

  db.checkBandRank(req.body.bandRank, function (err, rows) {
    if(err) {
      return handleError(err, req, res);
    }
    for (let row of rows) {
      db.updateBandRank(row.bandRank, function (err, result) {
        if(err) {
          return handleError(err, req, res);
        }
        count++;
        if (count === rows.length) {
          insertBand();
        }
      });
    }
    if (rows.length === 0) {
      insertBand();
    }
  })
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
