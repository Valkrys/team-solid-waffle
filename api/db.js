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
  db.query("SELECT band.name AS bandName, role.name AS roleName, band.bandRank FROM role join band on role.bandID=band.bandID JOIN capability ON role.capabilityID=capability.capabilityID " +
    "WHERE capability.name = ? ORDER BY band.bandRank", [capability],
    function (err, rows, fields) {
      callback(err, rows);
    }
  );
}

exports.getJobRoles = function (callback) {
  db.query("SELECT role.name AS roleName, capability.name AS capabilityName, band.name AS bandName, jobFamily.name AS jobFamilyName FROM role " +
    "JOIN capability ON role.capabilityID = capability.capabilityID JOIN band ON role.bandID = band.bandID JOIN jobFamily ON capability.jobFamilyID = jobFamily.jobFamilyID",
    function (err, rows, fields) {
      callback(err, rows);
    }
  );
}

exports.getFamily = function (callback) {
  db.query("SELECT name AS jobFamilyName, jobFamilyID FROM jobFamily",
    function (err, rows, fields) {
      callback(err, rows);
    }
  );
}

exports.getBand = function (callback) {
  db.query("SELECT name AS bandName FROM band",
    function (err, rows, fields) {
      callback(err, rows);
    }
  );
}

exports.getCapability = function (callback) {
  db.query("SELECT name AS capabilityName, capabilityID, jobFamilyID FROM capability",
    function (err, rows, fields) {
      callback(err, rows);
    }
  );
}

exports.getJobRoles = function (callback) {
  db.query("SELECT role.name AS roleName, capability.name AS capabilityName, role.capabilityID, band.name AS bandName, jobFamily.name AS jobFamilyName, jobFamily.jobFamilyID as jobFamilyID FROM role " +
    "JOIN capability ON role.capabilityID = capability.capabilityID JOIN band ON role.bandID = band.bandID JOIN jobFamily ON capability.jobFamilyID = jobFamily.jobFamilyID",
    function (err, rows, fields) {
      callback(err, rows);
    }
  );
}

exports.getRoleSpecification = function (family, capability, band, callback) {
  db.query("SELECT role.description AS roleDescription, role.responsibilities AS roleResponsibilities, training.description AS trainingDescription FROM role JOIN capability ON role.capabilityID=capability.capabilityID JOIN jobFamily ON " +
    "capability.jobFamilyID=jobFamily.jobFamilyID JOIN band ON role.bandID=band.bandID join training on role.trainingID=training.trainingID WHERE jobFamily.name=? AND capability.name=? AND band.name=?", [family, capability, band],
    function (err, rows, fields) {
      callback(err, rows);
    }
  );
}

// exports.getCapability = function (userID, callback) {
//   db.query("select capability.name AS capabilityName, band.name AS bandName, jobFamily.name AS jobFamilyName FROM capability JOIN jobFamily ON capability.jobFamilyID=jobFamily.jobFamilyID " +
//     "JOIN role ON capability.capabilityID=role.capabilityID JOIN band ON role.bandID=band.bandID JOIN user ON role.roleID=user.roleID WHERE user.userID=?", userID,
//     function (err, rows) {
//       if (err) throw err;
//       callback(rows)
//     }
//   );
// }

exports.getCarouselRoleAndCapability = function (band, callback) {
  db.query("SELECT role.name AS roleName, capability.name AS capabilityName, jobFamily.name AS jobFamilyName FROM role " +
    "JOIN capability ON role.capabilityID = capability.capabilityID JOIN jobFamily ON capability.jobFamilyID=jobFamily.jobFamilyID JOIN band " +
    "ON role.bandID=band.bandID WHERE role.name = ?", band,
    function (err, rows, fields) {
      callback(err, rows);
    }
  );
}

exports.getKeyDetails = function (userID, callback) {
  db.query("select capability.name AS capabilityName, band.name AS bandName, jobFamily.name AS jobFamilyName, band.bandRank AS bandRank FROM capability JOIN jobFamily ON capability.jobFamilyID=jobFamily.jobFamilyID " +
    "JOIN role ON capability.capabilityID=role.capabilityID JOIN band ON role.bandID=band.bandID JOIN user ON role.roleID=user.roleID WHERE user.userID=?", userID,
    function (err, rows, fields) {
      callback(err, rows);
    }
  );
}