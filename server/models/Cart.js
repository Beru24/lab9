const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    userId: { type: String, required: true },  // ID người dùng
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, 
        name: { type: String, required: true }, 
        price: { type: Number, required: true },
        image: { type: String, required: true },
        quantity: { type: Number, default: 1 }
    }]
}, { collection: "cart" });

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
