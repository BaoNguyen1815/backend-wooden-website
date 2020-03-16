const mysql = require("mysql")

const connection = mysql.createConnection({
  host: "us-cdbr-iron-east-04.cleardb.net",
  user: "b7ea3af7757e72",
  password: "25c02271",
  database: "heroku_2e883eeddf71a12",
  multipleStatements: true
});

connection.connect(err => {
  // if(err) throw err;hero
  //  connection.query("CREATE DATABASE Product", function(err, result) {
  //    if (err) throw err;
  //    console.log("Database created");
  //  });
  if(err) console.log(err);
  else console.log("DATABASE CONNECTED")
})

module.exports = connection
