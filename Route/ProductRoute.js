const express = require("express");
const ProductRoute = express.Router();
const Product = require("../Model/Product");

ProductRoute.post("/", (req, res) => {
  Product.addProduct(req.body, err => {
    if (err) res.json(err);
    else
      res.status(201).json({
        success: true,
        data: req.body
      });
  });
});

ProductRoute.get("/", (req, res) => {
  Product.getAll((err, rows) => {
    if (err) res.json(err);
    else
      res.status(201).json({
        success: true,
        data: rows
      });
  });
});

ProductRoute.delete("/:id", (req, res) => {
  Product.deleteProduct(request.params.id, (err, count) => {
    if (err) res.json(err);
    else
      res.status(201).json({
        success: true,
        count: count
      });
  });
});

module.exports = ProductRoute
