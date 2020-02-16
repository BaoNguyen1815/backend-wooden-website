const express = require("express");
const ProductRoute = express.Router();
const Product = require("../Model/Product");
const multer = require("multer")
var upload = multer({
  storage: multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, "../uploads");
    },
    filename: function(req, file, callback) {
      callback(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    }
  }),
  fileFilter: function(req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".JPG" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(/*res.end('Only images are allowed')*/ null, false);
    }

    callback(null, true);
  }
});
// API Add Product
ProductRoute.post("/",upload.single('image'), (req, res, next) => {
  console.log(req.file)
  console.log(req.body)
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


// API Get product by id
ProductRoute.get("/:id", (req, res) => {
  Product.getProductById(req.params.id,(err, rows) => {
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
ProductRoute.put("/:id",(req,res)=>{
  Product.updateProduct(req.params.id,req.body,(err,rows)=>{
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
  Product.deleteProduct(req.params.id, (err, count) => {
    if (err) res.json(err);
    else
      res.status(201).json({
        success: true,
        count: count
      });
  });
});



module.exports = ProductRoute
