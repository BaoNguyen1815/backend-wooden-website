const express = require("express");
const ProductRoute = express.Router();
const Product = require("../Model/Product");

// API Add Product
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

// API Get all
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

//API Get By Type
ProductRoute.get("/:type",(req,res) =>{
  Product.getProductByType(req.param.id,(err,rows)=>{
    if (err) res.json(err);
    else
      res.status(201).json({
        success: true,
        data: rows
      });
  })
})

//API update product
ProductRoute.put("/",(req,res)=>{
  Product.updateProduct(req.query.id,req.body,(err,rows)=>{
     if (err) res.json(err);
     else
       res.status(201).json({
         success: true,
         data: rows
       });
  })
})

//API delete
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
