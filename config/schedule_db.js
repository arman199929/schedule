const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "schedule",
    password: "root"
}).promise();

module.exports = connection;