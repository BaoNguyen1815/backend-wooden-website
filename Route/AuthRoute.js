const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AuthRouter = express.Router();

const jwtSecret = "sadu&^123i897au&Y*&";

const userModel = require("../Model/User");

AuthRouter.post("/login", (req, res) => {
  // TODO:
  // - Get username, password from request
  // - Check if user with username exist
  // - Compare password
  // -
  const { username, password } = req.body;

  if (!username || !password) {
    res.json({ success: 0, message: "Thiếu username hoặc password!" });
  }
else
  userModel.getUserByName(username, (err, rows) => {
    if (err) {
      res.json({ success: 0, message: "Đã có lỗi xảy ra!" });
    } else {
      if (!rows)
        res.json({
          success: 0,
          message: "Không tồn tại người dùng có username này!"
        });
      else {
        if (bcrypt.compareSync(password, rows[0].password)) {
          const access_token = jwt.sign(
            { username, id: rows[0].id },
            jwtSecret
          );
          res.json({
            success: 1,
            message: "Đăng nhập thành công!",
            access_token,
            user: {
              username,
              id: rows.id
            }
          });
        } else {
          res.json({ success: 0, message: "Sai mật khẩu!" });
        }
      }
    }
  });
});

AuthRouter.post("/check", (req, res) => {
  const access_token = req.body.access_token;
  if (access_token && jwt.verify(access_token, jwtSecret)) {
    res.send({
      success: 1,
      message: "Người dùng đã đăng nhập",
      user: jwt.verify(access_token, jwtSecret)
    });
  } else {
    res.send({
      success: 0,
      message: "Người dùng chưa đăng nhập"
    });
  }
  // if (req.session.user) {
  //     res.send({
  //         success: 1,
  //         message: 'Người dùng đã đăng nhập',
  //         user: req.session.user
  //     });
  // } else {
  //     res.send({
  //         success: 0,
  //         message: 'Người dùng chưa đăng nhập'
  //     });
  // }
});

module.exports = AuthRouter;
