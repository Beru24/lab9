import React, { useEffect, useState } from "react";
import "../styles/style1.css";
import logo from "../styles/img/logo.png";
import userIcon from "../styles/img/user_icon.png";

const Navbar = ({ cartCount }) => {
  return (
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
          <a href="/cart" className="cart-icon">
            🛒 <span className="cart-count">{cartCount}</span>
          </a>
          <a href="/favorites" className="favorites-icon">❤️</a>
          <a href="/login">
            <img src={userIcon} className="dashboard" alt="User" style={{ width: 24, height: 24 }} />
          </a>
        </div>
      </nav>
    </header>
  );
};

const ProductList = ({ updateCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Lỗi tải sản phẩm:", err));
  }, []);

  const addToCart = (productId) => {
    fetch("http://localhost:3000/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, userId: "user123" }) // Giả định userId là "user123"
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        updateCart(); // Cập nhật giỏ hàng sau khi thêm
      })
      .catch((err) => console.error("Lỗi thêm vào giỏ hàng:", err));
  };

  return (
    <section className="product-section">
      <div className="product-grid">
        {products.length > 0 ? (
          products
            .filter((product) => product.category === "Product")
            .map((product) => (
              <div key={product._id} className="product-card">
                <a href={`/product/${product._id}`}>
                  <img src={product.image} alt={product.name} />
                  <p className="product-name">{product.name}</p>
                  <p className="product-price">{product.price}₫</p>
                </a>
                <button className="add-to-cart" onClick={() => addToCart(product._id)}>
                  Thêm vào giỏ hàng
                </button>
              </div>
            ))
        ) : (
          <p>Không có sản phẩm nào.</p>
        )}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
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
  );
};

const New = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/api/cart/user123") // Giả định userId = "user123"
      .then((res) => res.json())
      .then((data) => setCartCount(data.length))
      .catch((err) => console.error("Lỗi tải giỏ hàng:", err));
  }, []);

  const updateCart = () => {
    fetch("http://localhost:3000/api/cart/user123")
      .then((res) => res.json())
      .then((data) => setCartCount(data.length))
      .catch((err) => console.error("Lỗi tải giỏ hàng:", err));
  };

  return (
    <>
      <Navbar cartCount={cartCount} />
      <ProductList updateCart={updateCart} />
      <Footer />
    </>
  );
};

export default New;
