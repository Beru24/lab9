import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/style.css";
import "../styles/cart.css";
import logo from "../styles/img/logo.png";
import userIcon from "../styles/img/user_icon.png";

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const userId = "user123";

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get(`/api/cart/${userId}`);
                console.log("API Response:", response.data);
                if (response.data.success && response.data.items) {
                    setCart(response.data.items);
                }
            } catch (error) {
                console.error("Lỗi khi tải giỏ hàng:", error);
            }
        };
        fetchCart();
    }, []);

    useEffect(() => {
        const newTotal = cart.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
        setTotal(newTotal);
    }, [cart]);

    const removeFromCart = async (productId) => {
        console.log("📌 ID sản phẩm cần xóa:", productId);
        try {
            const response = await axios.delete(`/api/cart/${userId}/${productId}`);
            if (response.status === 200) {
                console.log("✅ Xóa thành công, ID:", productId);
                setCart(prevCart => prevCart.filter(item => item.productId !== productId));
            } else {
                console.error("❌ Lỗi khi xóa:", response.data.message);
            }
        } catch (error) {
            console.error("🔥 Lỗi khi gửi request xóa:", error);
        }
    };

    const handleCheckout = () => {
        navigate("/checkout");
    };

    return (
        <div>
            {/* Header */}
            <header className="navbar">
                <div className="logo">
                    <a href="/">
                        <img src={logo} alt="Logo" />
                    </a>
                </div>
                <nav className="navbar">
                    <ul className="menu">
                        <li><a href="/new">Hàng Mới</a></li>
                        <li><a href="/men">Nam</a></li>
                        <li><a href="/women">Nữ</a></li>
                    </ul>
                    <div className="search-cart">
                        <input type="text" placeholder="Tìm kiếm" className="search-input" />
                        <button className="search-button">🔍</button>
                        <a href="/cart" className="cart-icon">🛒</a>
                        <a href="/favorites" className="favorites-icon">❤️</a>
                        <a href="/login">
                            <img src={userIcon} className="dashboard" alt="User" style={{ width: 24, height: 24 }} />
                        </a>
                    </div>
                </nav>
            </header>
            
            {/* Cart Section */}
            <div className="container">
                <h1>Giỏ Hàng</h1>
                {cart.length > 0 ? (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>Sản phẩm</th>
                                    <th>Số lượng</th>
                                    <th>Giá</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item) => (
                                    <tr key={item.productId}>
                                        <td>{item.name || "Không có tên"}</td>
                                        <td>{item.quantity}</td>
                                        <td>${(item.price || 0).toFixed(2)}</td>
                                        <td>
                                            <button className="remove-btn" onClick={() => removeFromCart(item.productId)}>
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p className="total">Tổng: ${total.toFixed(2)}</p>
                        <button className="checkout-btn" onClick={handleCheckout}>
                            Thanh toán
                        </button>
                    </>
                ) : (
                    <p className="empty-cart">Giỏ hàng đang trống</p>
                )}
            </div>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <h3>Về Chúng Tôi</h3>
                    <p>Chúng tôi cung cấp những sản phẩm chất lượng tốt nhất cho mọi lứa tuổi.</p>
                    <p>Khám phá bộ sưu tập mới nhất của chúng tôi để tìm kiếm những sản phẩm phù hợp nhất cho bạn.</p>
                    <h3>Liên Hệ</h3>
                    <p>Email: DP_SHOP@gmail.com</p>
                    <p>Hotline: +84 332 390 280</p>
                    <h3>Kết Nối Với Chúng Tôi</h3>
                    <div className="social-links">
                        <a href="#" className="social-link">Facebook</a>
                        <a href="#" className="social-link">Instagram</a>
                        <a href="#" className="social-link">Twitter</a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 DP SHOP. Đã đăng ký bản quyền.</p>
                </div>
            </footer>
        </div>
    );
};

export default Cart;
