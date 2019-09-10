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

exports.getNameAndJob = function(callback) {
    db.query("SELECT User.firstName, Job.jobName FROM User INNER JOIN Job ON User.jobID = Job.jobID",
        function(err, rows) {
            if (err) throw err;
            callback(rows);
        }
    )
}