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

//Query to return band name and role name for each capability
exports.getRolesForCapabilities = function (capability, callback) {
  db.query("SELECT band.bandName, role.name AS roleName, band.bandRank FROM role join band on role.bandID=band.bandID JOIN capability ON role.capabilityID=capability.capabilityID " +
    "WHERE capability.name = ? ORDER BY band.bandRank", [capability],
    function (err, rows, fields) {
      callback(err, rows);
    }
  );
}

exports.getJobRoles = function (callback) {
  db.query("SELECT role.name AS roleName, capability.name AS capabilityName, band.bandName, jobFamily.name AS jobFamilyName FROM role " +
    "JOIN capability ON role.capabilityID = capability.capabilityID JOIN band ON role.bandID = band.bandID JOIN jobFamily ON capability.jobFamilyID = jobFamily.jobFamilyID",
    function (err, rows, fields) {
      callback(err, rows);
    }
  );
}

exports.getRoleSpecification = function (family, capability, band, callback) {
  db.query("SELECT role.description AS roleDescription, role.responsibilities AS roleResponsibilities, training.description AS trainingDescription FROM role JOIN capability ON role.capabilityID=capability.capabilityID JOIN jobFamily ON " +
    "capability.jobFamilyID=jobFamily.jobFamilyID JOIN band ON role.bandID=band.bandID join training on role.trainingID=training.trainingID WHERE jobFamily.name=? AND capability.name=? AND band.bandName=?", [family, capability, band],
    function (err, rows, fields) {
      callback(err, rows);
    }
  );
}

exports.getCarouselRoleAndCapability = function (band, callback) {
  db.query("SELECT role.name AS roleName, capability.name AS capabilityName, jobFamily.name AS jobFamilyName FROM role " +
    "JOIN capability ON role.capabilityID = capability.capabilityID JOIN jobFamily ON capability.jobFamilyID=jobFamily.jobFamilyID JOIN band " +
    "ON role.bandID=band.bandID WHERE band.bandName = ?", band,
    function (err, rows, fields) {
      callback(err, rows);
    }
  );
}

exports.getKeyDetails = function (userID, callback) {
  db.query("select capability.name AS capabilityName, band.bandName, jobFamily.name AS jobFamilyName, band.bandRank AS bandRank FROM capability JOIN jobFamily ON capability.jobFamilyID=jobFamily.jobFamilyID " +
    "JOIN role ON capability.capabilityID=role.capabilityID JOIN band ON role.bandID=band.bandID JOIN user ON role.roleID=user.roleID WHERE user.userID=?", userID,
    function (err, rows, fields) {
      callback(err, rows);
    }
  );
}

exports.getBandDetails = function(bandID, callback) {
    db.query("SELECT band.bandID, band.bandName, band.commercial, band.communication, band.innovation, band.customerFocus, band.development, band.planning, band.knowledge, band.responsibilities, band.bandRank, training.trainingID, training.description AS trainingDescription from band left join training on (band.trainingID=training.trainingID) where band.bandID = ?", bandID,
        function(err, rows) {
        callback(err, rows);
    });
}
