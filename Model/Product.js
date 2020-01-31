const connection = require("../connection");

const Product = {
  getAll: callback => {
    return connection.query("Select * from Product", callback);
  },
  getProductById: (id, callback) => {
    return connection.query("select * from Product where id=?", [id], callback);
  },
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
  addProduct: (product, callback) => {
    return connection.query(
      "insert into Product(id,name,type,image,description,size,color,price) values(?,?,?,?,?,?,?,?)",
      [
        product.id,
        product.name,
        product.type,
        product.image,
        product.description,
        product.size,
        product.color,
        product.price
      ],
      callback
    );
  },
  deleteProduct: (id, callback) => {
    return connection.query("delete from Product where id=?", [id], callback);
  },
  updateProduct: (id, product, callback) => {
    return connection.query(
      "update Product set id =?, name = ?,type = ?,image = ?, description = ?, size = ?, color = ?, price =? where id =?",
      [
        product.id,
        product.name,
        product.type,
        product.image,
        product.description,
        product.size,
        product.color,
        product.price,
        id
      ],callback
    );
  }
};

module.exports = Product;
