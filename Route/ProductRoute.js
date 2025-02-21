const express = require("express");
const ProductRoute = express.Router();
const Product = require("../Model/Product");
const Image = require("../Model/Image");
const multer = require("multer");
const fs = require("fs");
const AWS = require("aws-sdk");
const sharp = require("sharp");
require("dotenv").config();

const storage = multer.memoryStorage();
const upload = multer({ storage });
// make keys to env
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
console.log(
  {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  }
)

// Xóa ảnh không sử dụng từ S3
const removeNotUsingImage = async () => {
  try {
    const { Contents } = await s3.listObjectsV2({
      Bucket: process.env.BUCKETEER_BUCKET_NAME,
      Prefix: "uploads/",
    }).promise();

    const imagesInS3 = Contents.map(file => file.Key);

    Image.getAll((err, rows) => {
      if (err) {
        console.error("Lỗi khi lấy danh sách ảnh:", err);
        return;
      }

      // Danh sách ảnh được sử dụng trong DB
      const usedImages = rows.flatMap(row => [
        row.img1, row.img2, row.img3, row.img4
      ]).filter(Boolean);

      // Xóa ảnh không được sử dụng
      imagesInS3.forEach(async (fileKey) => {
        if (!usedImages.includes(fileKey)) {
          await s3.deleteObject({
            Bucket: process.env.BUCKETEER_BUCKET_NAME,
            Key: fileKey,
          }).promise();
          console.log(`Đã xóa ảnh không sử dụng: ${fileKey}`);
        }
      });
    });
  } catch (error) {
    console.error("Lỗi khi xóa ảnh không sử dụng:", error);
  }
};

// API Upload ảnh lên Bucketeer (Amazon S3)
ProductRoute.post("/upload", upload.array("image", 4), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No file uploaded!" });
    }

    const uploadedImages = await Promise.all(
      req.files.map(async (file) => {
        const fileName = `${Date.now()}_${file.originalname.replace(/ /g, "-")}`;
        const params = {
          Bucket: process.env.BUCKETEER_BUCKET_NAME,
          Key: fileName,
          Body: file.buffer,
          ACL: "public-read",
          ContentType: file.mimetype,
        };

        const { Location } = await s3.upload(params).promise();
        return Location; // Trả về URL của ảnh trên S3
      })
    );

    res.json({
      success: true,
      message: "File uploaded successfully!",
      files: uploadedImages,
    });

  } catch (error) {
    console.error("Lỗi upload ảnh:", error);
    res.status(500).json({ error: "Error uploading files" });
  }
});

// API Thêm sản phẩm + lưu ảnh vào DB
ProductRoute.post("/", (req, res) => {
  const image = {
    img1: req.body.image[0] || null,
    img2: req.body.image[1] || null,
    img3: req.body.image[2] || null,
    img4: req.body.image[3] || null,
  };
  console.log(req.body);
  Product.addProduct(req.body, (err, row) => {
    if (err) return res.json(err);

    Image.addImageByProductId(row.insertId, image, (err) => {
      if (err) return res.json(err);

      res.status(201).json({ success: true, data: req.body });
    });
  });
});

// API Xóa sản phẩm + Xóa ảnh trên S3
ProductRoute.delete("/:id", (req, res) => {
  Image.getImagesByProductId(req.params.id, async (err, rows) => {
    if (err) return res.json(err);

    // Xóa ảnh trên S3
    await Promise.all(rows.flatMap((row) =>
      [row.img1, row.img2, row.img3, row.img4]
        .filter(Boolean)
        .map((fileKey) =>
          s3.deleteObject({
            Bucket: process.env.BUCKETEER_BUCKET_NAME,
            Key: fileKey,
          }).promise()
        )
    ));

    // Xóa sản phẩm khỏi DB
    Product.deleteProduct(req.params.id, (err, count) => {
      if (err) return res.json(err);

      removeNotUsingImage(); // Xóa ảnh không dùng nữa
      res.status(201).json({ success: true, count });
    });
  });
});

// API Cập nhật sản phẩm
ProductRoute.put("/:id", (req, res) => {
  Product.updateProduct(req.params.id, req.body, (err, rows) => {
    if (err) return res.json(err);

    removeNotUsingImage(); // Xóa ảnh không sử dụng
    res.status(201).json({ success: true, data: req.body });
  });
});

// API Lấy tất cả sản phẩm
ProductRoute.get("/", (req, res) => {
  Product.getAll((err, rows) => {
    if (err) return res.json(err);

    rows.forEach((row) => {
      row.bestseller = row.bestseller === 1;
      row.newarrival = row.newarrival === 1;
    });

    res.status(201).json({ success: true, data: rows });
  });
});

// API Lấy sản phẩm theo loại
ProductRoute.get("/types/:type", (req, res) => {
  Product.getProductByType(req.params.type, (err, rows) => {
    if (err) return res.json(err);

    rows.forEach((row) => {
      row.bestseller = row.bestseller === 1;
      row.newarrival = row.newarrival === 1;
    });

    res.status(201).json({ success: true, data: rows });
  });
});

// API Lấy sản phẩm theo ID
ProductRoute.get("/:id", (req, res) => {
  Product.getProductById(req.params.id, (err, row) => {
    if (err) return res.json(err);

    if (row.length > 0) {
      row[0].bestseller = row[0].bestseller === 1;
      row[0].newarrival = row[0].newarrival === 1;
    }

    res.status(201).json({ success: true, data: row });
  });
});

module.exports = ProductRoute;
