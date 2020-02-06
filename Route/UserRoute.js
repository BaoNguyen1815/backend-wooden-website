const express = require("express")
const bcrypt = require("bcrypt");
const UserRoute = express.Router();
const User = require("../Model/User");

UserRoute.post("/",(req,res)=>{
  const {username,password} = req.body;
  const hashPassword =bcrypt.hashSync(password,12);
  const acc = {
    username : username,
    password : hashPassword
  }
    User.addUser(acc, err => {
      if (err) console.log(err);
      else
        res.status(201).json({
          success: true,
          data: req.body
        });
    });

})

UserRoute.get("/", (req, res) => {
  User.getAll((err, rows) => {
    if (err) res.json(err);
    else
      res.status(201).json({
        success: true,
        data: rows
      });
  });
});
// API Get User by id
UserRoute.get("/:id", (req, res) => {
  User.getUserById(req.params.id, (err, rows) => {
    if (err) res.json(err);
    else
      res.status(201).json({
        success: true,
        data: rows
      });
  });
});

//API Delete by id
UserRoute.delete("/:id",(req,res)=>{
  User.deleteUser(req.params.id, (err,rows)=>{
    if (err) res.json(err);
    else
      res.status(201).json({
        success: true,
        data: rows
      });

  })
})
module.exports = UserRoute
