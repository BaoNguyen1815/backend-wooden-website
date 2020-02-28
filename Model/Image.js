const connection = require("../connection");

const Image = {
  getAll: callback => {
    return connection.query(
      "Select * from Image ",
      callback
    );
  },
  getImageByProductId: (productId, callback) => {
    return connection.query(
      "select product_id,img1,img2,img3,img4 from Image where product_id = ?",
      [productId],
      callback
    );
  },
  addImageByProductId: (id, image, callback) => {
    return connection.query(
      " insert into Image(product_id,img1,img2,img3,img4) values(?,?,?,?,?)",
      [id, image.img1, image.img2, image.img3, image.img4],
      callback
    );
  }
};
module.exports = Image;
