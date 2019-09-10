const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

db.connect(function(err) {
    if (err) {
        throw err;
    }

    console.log('Connected to mysql');
});

exports.getNameAndRole = function(callback) {
    db.query("SELECT user.firstName, role.roleName FROM user INNER JOIN role ON user.roleID = role.roleID WHERE role.roleID = 1",
        function(err, rows) {
            if (err) throw err;
            callback(rows);
        }
    )
}