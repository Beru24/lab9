const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const router = express.Router();

// 🛒 Thêm sản phẩm vào giỏ hàng
router.post("/cart", async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // 🔎 Lấy thông tin sản phẩm từ DB
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
        }

        // 🔎 Kiểm tra giỏ hàng có tồn tại chưa
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        // Kiểm tra sản phẩm đã có trong giỏ chưa
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity || 1;
        } else {
            cart.items.push({ 
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity || 1
            });
        }

        await cart.save();
        res.json({ success: true, message: "Thêm sản phẩm vào giỏ hàng thành công!", cart });
    } catch (err) {
        res.status(500).json({ error: "Lỗi khi thêm vào giỏ hàng", details: err.message });
    }
});
// 🛍 Lấy danh sách sản phẩm trong giỏ hàng của một user
router.get("/cart/:userId", async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        if (!cart) return res.json({ success: true, items: [] });

        res.json({ success: true, items: cart.items });
    } catch (err) {
        res.status(500).json({ error: "Lỗi khi lấy giỏ hàng", details: err.message });
    }
});

// ❌ Xóa sản phẩm khỏi giỏ hàng
router.delete("/cart/:userId/:productId", async (req, res) => {
    try {
        const { userId, productId } = req.params;
        const cart = await Cart.findOne({ userId });

        if (!cart) return res.json({ success: false, message: "Giỏ hàng trống" });

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();

        res.json({ success: true, cart });
    } catch (err) {
        res.status(500).json({ error: "Lỗi khi xóa sản phẩm", details: err.message });
    }
});


// 📦 API lấy toàn bộ giỏ hàng của tất cả user (chỉ dùng để debug)
router.get("/cart", async (req, res) => {
    try {
        const carts = await Cart.find().populate("items.productId");
        res.json({ success: true, carts });
    } catch (err) {
        res.status(500).json({ error: "Lỗi khi lấy toàn bộ giỏ hàng", details: err.message });
    }
});

module.exports = router;
