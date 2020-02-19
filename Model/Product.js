const connection = require("../connection");

const Product = {
  getAll: callback => {
    return connection.query("Select * from Product,Image where id = product_id ", callback);
  },
  getProductById: (id, callback) => {
    return connection.query(
      "select * from Product,Image where id = product_id and id=?",
      [id],
      callback
    );
  },
  // getImageByProductId : (id)
  getProductByName: (name, callback) => {
    return connection.query(
      "select * from Product,Image where  id = product_id and  name=?",
      [name],
      callback
    );
  },
  getProductByType: (type, callback) => {
    return connection.query(
      "select * from Product,Image where  id = product_id and  type=?",
      [type],
      callback
    );
  },
  getBestSellerProduct: callback => {
    return connection.query(
      "select * from Product,Image where  id = product_id and  bestseller = 1",
      callback
    );
  },
  getNewArrivalProduct: callback => {
    return connection.query(
      "select * from Product,Image where  id = product_id and  newarrival=1",
      callback
    );
  },
  addProduct: (product, callback) => {
    return connection.query(
      "insert into Product(code,name,type,description,size,color,price,note,bestseller,newarrival) values(?,?,?,?,?,?,?,?,?,?);",
      [
        product.code,
        product.name,
        product.type,
        product.description,
        product.size,
        product.color,
        product.price,
        product.note,
        product.bestseller,
        product.newarrival
      ],
      callback
    );
  },
  deleteProduct: (id, callback) => {
    return connection.query(
      "delete from Product where id=?; delete from Image where product_id=?",
      [id, id],
      callback
    );
  },
  updateProduct: (id, product, callback) => {
    return connection.query(
      "update Product set code =?, name = ?,type = ?, description = ?, size = ?, color = ?, price =?, note=?, bestseller=?, newarrival=? where id =?; update Image set img1=?,img2=?,img3=?,img4=? where product_id=?",
      [
        product.code,
        product.name,
        product.type,
        product.description,
        product.size,
        product.color,
        product.price,
        product.note,
        product.bestseller,
        product.newarrival,
        id,
        product.img1,
        product.img2,
        product.img3,
        product.img4,
        id
      ],
      callback
    );
  }
};

module.exports = Product;
