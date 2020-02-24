const express = require("express");
const ProductRoute = express.Router();
const Product = require("../Model/Product");
const Image = require("../Model/Image");
const multer = require("multer");
const fs = require("fs");
// var upload = multer({
//   storage: multer.diskStorage({
//     destination: function(req, file, callback) {
//       callback(null, "../uploads");
//     },
//     filename: function(req, file, callback) {
//       callback(
//         null,
//         file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//       );
//     }
//   }),
//   fileFilter: function(req, file, callback) {
//     var ext = path.extname(file.originalname);
//     if (ext !== ".png" && ext !== ".JPG" && ext !== ".gif" && ext !== ".jpeg") {
//       return callback(/*res.end('Only images are allowed')*/ null, false);
//     }

//     callback(null, true);
//   }
// });
const upload = multer({ dest: "images/" });
// API Add Product
ProductRoute.post("/", (req, res, next) => {
  const image = {
    img1 : req.body.image[0],
    img2 : req.body.image[1],
    img3 : req.body.image[2],
    img4 : req.body.image[3],
  }
  Product.addProduct(req.body, (err, row) => {
    if (err) res.json(err);
    else
      Image.addImageByProductId(row.insertId, image, err => {
        if (err) res.json(err);
        else
          res.status(201).json({
            success: true,
            data: req.body
          });
      });
  });
});

//API Upload
ProductRoute.post("/upload", upload.array("image", 4), (req, res, next) => {
  const processedFiles = req.files || {}; // MULTER xử lý và gắn đối tượng FILE vào req
  const arr = [];
  processedFiles.map(processedFile => {
    let orgName = processedFile.originalname || ""; // Tên gốc trong máy tính của người upload
    orgName = orgName.trim().replace(/ /g, "-");
    const fullPathInServ = processedFile.path; // Đường dẫn đầy đủ của file vừa đc upload lên server
    // Đổi tên của file vừa upload lên, vì multer đang đặt default ko có đuôi file
    const newFullPath = `${fullPathInServ}-${orgName}`;
    fs.renameSync(fullPathInServ, newFullPath);
    let data = newFullPath.replace("images/","");
    arr.push(data)
  });
  res.send({
    status: true,
    message: "file uploaded",
    fileNameInServer: arr
  });
});

// API Get all
ProductRoute.get("/", (req, res) => {
  Product.getAll((err, rows) => {
    if (err) res.json(err);
    else
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].bestseller == 1) {
          rows[i].bestseller = true;
        }
        if (rows[i].bestseller == 0) {
          rows[i].bestseller = false;
        }
        if (rows[i].newarrival == 0) {
          rows[i].newarrival = false;
        }
        if (rows[i].newarrival == 1) {
          rows[i].newarrival = true;
        }
      }
    res.status(201).json({
      success: true,
      data: rows
      // data: {
      //   product : rows;
      //   image :
      // }
    });
  });
});

//API Get By Type
ProductRoute.get("/types/:type", (req, res) => {
  Product.getProductByType(req.params.type, (err, rows) => {
    if (err) res.json(err);
    else {
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].bestseller == 1) {
          rows[i].bestseller = true;
        }
        if (rows[i].bestseller == 0) {
          rows[i].bestseller = false;
        }
        if (rows[i].newarrival == 0) {
          rows[i].newarrival = false;
        }
        if (rows[i].newarrival == 1) {
          rows[i].newarrival = true;
        }
      }
      res.status(201).json({
        success: true,
        data: rows
      });
    }
  });
});

// API Get product by id
ProductRoute.get("/:id", (req, res) => {
  Product.getProductById(req.params.id, (err, row) => {
    if (err) res.json(err);
    else {
      const data = row;
      if (row[0].bestseller == 1) {
        data[0].bestseller = true;
      }
      if (row[0].bestseller == 0) {
        data[0].bestseller = false;
      }
      if (row[0].newarrival == 0) {
        data[0].newarrival = false;
      }
      if (row[0].newarrival == 1) {
        data[0].newarrival = true;
      }
      res.status(201).json({
        success: true,
        data: data
      });
    }
  });
});

//API update product
ProductRoute.put("/:id", (req, res) => {
  Product.updateProduct(req.params.id, req.body, (err, rows) => {
    if (err) res.json(err);
    else
      res.status(201).json({
        success: true,
        data: req.body
      });
  });
});

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

module.exports = ProductRoute;
