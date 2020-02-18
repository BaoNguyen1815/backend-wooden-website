const connection = require("../connection");

const Product = {
  getAll: callback => {
    return connection.query("Select * from Product", callback);
  },
  getProductById: (id, callback) => {
    return connection.query("select * from Product where id=?", [id], callback);
  },
  // getImageByProductId : (id)
  getProductByName: (name, callback) => {
    return connection.query(
      "select * from Product where name=?",
      [name],
      callback
    );
  },
  getProductByType: (type, callback) => {
    return connection.query(
      "select * from Product where type=?",
      [type],
      callback
    );
  },
  getBestSellerProduct: callback => {
    return connection.query(
      "select * from Product where bestseller = 1",
      callback
    );
  },
  getNewArrivalProduct: callback => {
    return connection.query(
      "select * from Product where newarrival=1",
      callback
    );
  },
  addProduct: (product, callback) => {
    return connection.query(
      "insert into Product(code,name,type,image,description,size,color,price,note,bestseller,newarrival) values(?,?,?,?,?,?,?,?,?,?,?)",
      [
        product.code,
        product.name,
        product.type,
        product.image,
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
    return connection.query("delete from Product where id=?", [id], callback);
  },
  updateProduct: (id, product, callback) => {
    return connection.query(
      "update Product set code =?, name = ?,type = ?,image = ?, description = ?, size = ?, color = ?, price =?, note=?, bestseller=?, newarrival=? where id =?",
      [
        product.code,
        product.name,
        product.type,
        product.image,
        product.description,
        product.size,
        product.color,
        product.price,
        product.note,
        product.bestseller,
        product.newarrival,
        id
      ],
      callback
    );
  }
};

module.exports = Product;
