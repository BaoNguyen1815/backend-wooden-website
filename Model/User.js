const connection = require("../connection");

const User = {
  getAll: callback => {
    return connection.query("Select * from User", callback);
  },
  getUserById: (id, callback) => {
    return connection.query("select * from User where id=?", [id], callback);
  },
  getUserByName: (username, callback) => {
    return connection.query(
      "select * from User where username=?",
      [username],
      callback
    );
  },
  addUser: (User, callback) => {
    return connection.query(
      "insert into User(username,password) values(?,?)",
      [ User.username, User.password],
      callback
    );
  },
  deleteUser: (id, callback) => {
    return connection.query("delete from User where id=?", [id], callback);
  },
};
module.exports = User
