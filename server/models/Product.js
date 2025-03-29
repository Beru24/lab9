const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },  // Tên sản phẩm
    price: { type: String, required: true },  // Giá sản phẩm
    image: { type: String, required: true },  // Đường dẫn hình ảnh
    category: { type: String, required: true },  // Loại sản phẩm (men, women, product)
    description: { type: String },  // Mô tả sản phẩm
    stock: { type: Number, default: 0 },  // Số lượng tồn kho
}, { collection: "products1" }); // 📌 Trỏ đến collection 'products1' trong MongoDB

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
