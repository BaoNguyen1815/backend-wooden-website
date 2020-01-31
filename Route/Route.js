const express = require("express")
const Route = express.Router();
const productRoute = require("./ProductRoute")

Route.use("/product",productRoute);
module.exports = Route;
