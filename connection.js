const mysql = require("mysql")

const connection = mysql.createConnection({
  host: "sp6xl8zoyvbumaa2.cbetxkdyhwsb.us-east-1.rds.amazonaws.com	",
  user: "qnktfp022lo9nxoq",
  password: "pfux84dxwtgd64vx",
  database: "muklhpaf07jhdzy6",
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
