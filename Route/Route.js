const express = require("express")
const Route = express.Router();
const productRoute = require("./ProductRoute")
const userRoute = require("./UserRoute")
const authRoute = require("./AuthRoute")

Route.use("/product",productRoute);
Route.use("/user",userRoute);
Route.use("/auth",authRoute);
module.exports = Route;
