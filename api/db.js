const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

db.connect(function (err) {
    if (err) {
        throw err;
    }

    console.log('Connected to mysql');
});

exports.getNameAndRole = function (callback) {
    db.query("SELECT user.firstName, role.roleName FROM user INNER JOIN role ON user.roleID = role.roleID WHERE user.userID = 1",
        function (err, rows) {
            if (err) throw err;
            callback(rows);
        }
    )
}

exports.getJobRoles = function (callback) {
    db.query("SELECT role.roleName, role.capabilityName, role.bandName, capability.jobfamilyName FROM role " + 
        "JOIN (capability) ON (role.capabilityName = capability.capabilityName);",
        function (err, rows) {
            if (err) throw err;
            callback(rows);
        }
    )
}

exports.getRoleSpecification = function (family, capability, band, callback) {
    db.query("SELECT role.description, role.responsibilities, role.training FROM role JOIN capability ON (role.capabilityName=capability.capabilityName) WHERE capability.jobFamilyName=? AND role.capabilityName=? AND role.bandName=?", [family, capability, band],
        function (err, rows) {
            if (err) throw err;
            callback(rows);
        }
    )
}

exports.getCapability = function (userID, callback) {
    db.query("select role.capabilityName, role.bandName, capability.jobFamilyName FROM role, capability, user WHERE role.roleID = user.roleID AND role.capabilityName=capability.capabilityName AND userID=?", userID,
        function (err, rows) {
            if (err) throw err;
            callback(rows)
        })
}

exports.getUserByUsername = function (username, callback) {
    db.query("select user.userID, user.firstName, user.lastName, user.username, user.password, user.isAdmin, role.roleName FROM user JOIN role ON (user.roleID = role.roleID) WHERE user.username=?", username,
        function (err, rows) {
            if (err) throw err;
            callback(rows);
        });
};

