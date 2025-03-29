const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// 📌 Lấy danh sách sản phẩm từ MongoDB
router.get("/products", async (req, res) => {
    try {
        const products = await Product.find();  // Lấy tất cả sản phẩm
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: "Lỗi server" });
    }
});

// 📌 Lấy thông tin một sản phẩm theo giá (price)
router.get("/products/:price", async (req, res) => {
    const productPrice = req.params.price;  // Lấy price từ URL

    try {
        // Tìm tất cả sản phẩm có giá bằng price
        const products = await Product.find({ price: productPrice });

        if (products.length === 0) {
            return res.status(404).json({ message: "Không có sản phẩm nào với giá này" });
        }

        res.json(products);  // Trả về danh sách sản phẩm
    } catch (err) {
        res.status(500).json({ message: "Lỗi server" });
    }
});

// 📌 Thêm sản phẩm vào MongoDB
router.post("/products", async (req, res) => {
    const { name, price, image, category, description, stock } = req.body;

    // Tạo đối tượng sản phẩm mới
    const newProduct = new Product({
        name,
        price,
        image,
        category,
        description,
        stock
    });

    try {
        const savedProduct = await newProduct.save();  // Lưu sản phẩm vào MongoDB
        res.status(201).json(savedProduct);  // Trả về sản phẩm đã lưu
    } catch (err) {
        res.status(500).json({ message: "Lỗi server" });
    }
});

module.exports = router;  // Export routes để sử dụng trong server
