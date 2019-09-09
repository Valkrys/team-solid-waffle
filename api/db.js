const mysql = require('mysql');
const fs = require('fs');

dbprops = fs.readFileSync('dbprops.properties', 'utf-8', function(err, data) {
    console.log(data);
    return data;
});

dbprops = JSON.parse(dbprops);

const db = mysql.createConnection({
    host: dbprops.host,
    user: dbprops.user,
    password: dbprops.pass,
    database: dbprops.database
});

db.connect(function(err) {
    if (err) {
        throw err;
    }

    console.log('Connected to mysql');
});

exports.getCareers = function(callback) {
    db.query("SELECT * FROM careerLattice",
        function(err, rows) {
            if (err) throw err;
            callback(rows);
        }
    )
}