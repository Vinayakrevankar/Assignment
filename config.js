const mysql = require('mysql');
let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "posts",
  });
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

module.exports= connection;
