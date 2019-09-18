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
    'SELECT role.roleID as roleID, role.name AS roleName, capability.capabilityID AS capabilityID, capability.name AS capabilityName, band.bandID AS bandID, band.name AS bandName, band.bandRank, jobFamily.jobFamilyID as jobFamilyID, jobFamily.name AS jobFamilyName ' +
    'FROM role ' +
    'JOIN capability ON role.capabilityID = capability.capabilityID JOIN band ON role.bandID = band.bandID JOIN jobFamily ON capability.jobFamilyID = jobFamily.jobFamilyID',
    (err, rows, fields) => {
      callback(err, rows);
    }
  );
}

exports.getRoleDetail = (id, callback) => {
  db.query(
    'SELECT role.roleID as roleID, role.name AS roleName, role.description, capability.capabilityID AS capabilityID, capability.name AS capabilityName, band.bandID AS bandID, band.name AS bandName, jobFamily.jobFamilyID as jobFamilyID, jobFamily.name AS jobFamilyName, role.responsibilities, training.description AS training ' +
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

exports.getCapabilities = (callback) => {
  db.query(
    'SELECT capability.capabilityID AS capabilityID, capability.name AS capabilityName, jobFamily.jobFamilyID as jobFamilyID, jobFamily.name AS jobFamilyName ' +
    'FROM capability ' +
    'JOIN jobFamily ON capability.jobFamilyID = jobFamily.jobFamilyID',
    (err, rows, fields) => {
      callback(err, rows);
    }
  );
}

exports.getCapabilityDetail = (id, callback) => {
  throw new Error("Not implemented");
}

exports.getBands = (callback) => {
  db.query(
    'SELECT band.bandID AS bandID, band.name AS bandName, band.bandRank ' +
    'FROM band',
    (err, rows, fields) => {
      callback(err, rows);
    }
  );
}

exports.getBandDetail = (id, callback) => {
  throw new Error("Not implemented");
}

exports.getFamilies = (callback) => {
  db.query(
    'SELECT jobFamily.jobFamilyID as jobFamilyID, jobFamily.name AS jobFamilyName ' +
    'FROM jobFamily',
    (err, rows, fields) => {
      callback(err, rows);
    }
  );
}

exports.getTrainings = function (callback) {
  db.query(
    'SELECT * FROM training',
    (err, rows, fields) => {
      callback(err, rows);
    }
  );
}
