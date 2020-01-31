const mysql = require("mysql")

const connection = mysql.createConnection({
  host: "localhost",
  user: "nguyen", //change to your user
  password: "nguyen1815", //change to your password
  database: "Product"
});

connection.connect(err => {
  // if(err) throw err;
  //  connection.query("CREATE DATABASE Product", function(err, result) {
  //    if (err) throw err;
  //    console.log("Database created");
  //  });
  if(err) console.log(err);
  else console.log("DATABASE CONNECTED")
})

module.exports = connection
