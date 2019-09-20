const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

db.connect(function (err) {
  if (err) throw err;
  console.log('Connected to mysql');
});

exports.getNameAndRole = function (callback) {
  db.query("SELECT user.firstName, role.name AS roleName FROM user INNER JOIN role ON user.roleID = role.roleID WHERE user.userID = 1",
    function (err, rows, fields) {
      callback(err, rows);
    }
  );
}

exports.getRoles = (callback) => {
  db.query(
    'SELECT role.roleID as roleID, role.name AS roleName, capability.capabilityID AS capabilityID, capability.name AS capabilityName, band.bandID AS bandID, band.bandName, band.bandRank, jobFamily.jobFamilyID as jobFamilyID, jobFamily.name AS jobFamilyName ' +
    'FROM role ' +
    'JOIN capability ON role.capabilityID = capability.capabilityID JOIN band ON role.bandID = band.bandID JOIN jobFamily ON capability.jobFamilyID = jobFamily.jobFamilyID',
    (err, rows, fields) => {
      callback(err, rows);
    }
  );
}

exports.getRoleDetail = (id, callback) => {
  db.query(
    'SELECT role.roleID as roleID, role.name AS roleName, role.description, capability.capabilityID AS capabilityID, capability.name AS capabilityName, band.bandID AS bandID, band.bandName, jobFamily.jobFamilyID as jobFamilyID, jobFamily.name AS jobFamilyName, role.responsibilities, training.description AS training ' +
    'FROM role ' +
    'JOIN capability ON role.capabilityID = capability.capabilityID ' +
    'JOIN band ON role.bandID = band.bandID ' +
    'JOIN jobFamily ON capability.jobFamilyID = jobFamily.jobFamilyID ' +
    'JOIN training ON role.trainingID = training.trainingID ' +
    'WHERE role.roleID = ?',
    id,
    (err, rows, fields) => {
      callback(err, rows);
    }
  );
}

exports.updateRole = (id, changes, callback) => {
  db.query(
    'UPDATE role ' +
    'SET ? ' +
    'WHERE roleID = ?',
    [changes, id],
    (err, rows, fields) => {
      callback(err, rows);
    }
  );
}

exports.getCapabilities = (callback) => {
  db.query(
    'SELECT capability.capabilityID, capability.name AS capabilityName, jobFamily.jobFamilyID, jobFamily.name AS jobFamilyName ' +
    'FROM capability ' +
    'JOIN jobFamily ON capability.jobFamilyID = jobFamily.jobFamilyID',
    (err, rows, fields) => {
      callback(err, rows);
    }
  );
}

exports.getBands = (callback) => {
  db.query(
    'SELECT band.bandID AS bandID, band.bandName, band.bandRank ' +
    'FROM band',
    (err, rows, fields) => {
      callback(err, rows);

    }
  );
}

exports.getBandDetail = (id, callback) => {
    db.query("SELECT band.bandID, band.bandName, band.commercial, band.communication, band.innovation, band.customerFocus, band.development, band.planning, band.knowledge, band.responsibilities, band.bandRank, training.trainingID, training.description AS trainingDescription from band left join training on (band.trainingID=training.trainingID) where band.bandID = ?", id,
        function(err, rows) {
            callback(err, rows);
        });
}

exports.getFamilies = (callback) => {
  db.query(
    'SELECT jobFamily.jobFamilyID, jobFamily.name AS jobFamilyName ' +
    'FROM jobFamily',
    (err, rows, fields) => {
      callback(err, rows);
    }
  );
}

exports.getCapabilityDetail = function (capabilityID, callback) {
  db.query("SELECT capability.name AS capabilityName, jobFamily.name AS jobFamilyName, user.firstName, user.lastName, capabilityLead.picture, capabilityLead.message FROM capabilityLead " +
    "JOIN user ON capabilityLead.userID = user.userID JOIN capability ON capabilityLead.capabilityLeadID = capability.capabilityLeadID JOIN jobFamily ON capability.jobFamilyID = jobFamily.jobFamilyID WHERE capabilityID=?", capabilityID,
    (err, rows, fields) => {
      callback(err, rows);
    });
}

exports.insertBand = function (data, callback) {
  db.query('INSERT INTO band SET ?', data, function (err, results, fields) {
    if (err) return callback(err, null);
    callback(err, results.insertedKey);
  });
}

exports.checkBandRank = function (bandRank, callback) {
  db.query('select bandRank from band where bandRank >= ? order by bandRank desc', bandRank, function (err, rows, fields) {
    callback(err, rows);
  });
}

exports.updateBandRank = function (bandRank, callback) {
  db.query('update band set bandRank = ? where bandRank = ?', [bandRank + 1, bandRank], function (err, rows, fields) {
    callback(err, rows);
  });
}

exports.getTrainings = function (callback) {
  db.query('select * from training order by trainingID desc', function (err, rows, fields) {
    callback(err, rows);
  });
}

exports.insertTraining = function (data, callback) {
  db.query('INSERT INTO training SET ?', data, function (err, results, fields) {
    if (err) return callback(err, null);
    callback(err, results.insertedKey);
  });
}

exports.getBands = (callback) => {
  db.query('SELECT band.bandID AS bandID, band.bandName AS bandName, band.bandRank FROM band',
    (err, rows, fields) => {
      callback(err, rows);
    }
  );
}
exports.insertRole = (data, callback) => {
  const param = data;
  db.query('INSERT into role(name, capabilityID, description, bandID, responsibilities, trainingID) VALUES (?, ?, ?, ?, ?, ?);', 
    [param.roleName, param.capabilityID, param.roleDescription, param.bandID, param.responsibilities, param.trainingID],
    (err) => {
      callback(err);
    }
  );
}
