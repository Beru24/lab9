import React, { useEffect, useState } from "react";
import "../styles/style.css"; // Import file CSS

// Import ảnh từ thư mục styles/img
import logo from "../styles/img/logo.png";
import userIcon from "../styles/img/user_icon.png";
import new3 from "../styles/img/new3.png";
import new1 from "../styles/img/new1.png";
import new2 from "../styles/img/new2.jpg";

const images = [new3, new1, new2];

const Home = () => {
  const [newArrivals, setNewArrivals] = useState([]);

  // Lấy sản phẩm từ API
  useEffect(() => {
    fetch("http://localhost:3000/api/products") // Gọi API lấy sản phẩm
      .then((res) => res.json())
      .then((data) => {
        setNewArrivals(data); // Lưu toàn bộ sản phẩm vào state
      })
      .catch((err) => console.error("Lỗi tải sản phẩm:", err));
  }, []);

  return (
    <>
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

      {/* Banner */}
      <section className="banner">
        <h1>CHÀO MỪNG ĐẾN VỚI DP SHOP</h1>
        <a href="/shop" className="shop-now">Shop</a>
      </section>

      {/* Featured Section */}
      <section className="featured">
        <h2>Featured</h2>
        <div className="featured-items">
          {images.map((img, index) => (
            <div key={index} className="featured-item">
              <div className="image-container">
                <a href="/">
                  <img src={img} alt="Featured Product" />
                  <div className="overlay">
                    <button className="shop-button">Shop</button>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="new-arrivals">
        <h2>New Arrivals</h2>
        <div className="featured-items">
          {newArrivals.length > 0 ? (
            newArrivals
              .filter((product) => product.category === "Product")
              .map((product) => (
                <div key={product.id} className="featured-item">
                  <div className="image-container">
                    <a href={`/product/${product.price}`}>
                      <img src={product.image} alt={product.name} />
                      <div className="overlay">
                        <button className="shop-button">Xem chi tiết</button>
                      </div>
                    </a>
                  </div>
                  <div className="product-info">
                    <p className="product-name">{product.name}</p>
                    <p className="product-price">{product.price} VND</p>
                  </div>
                </div>
              ))
          ) : (
            <p>Không có sản phẩm nào.</p>
          )}
        </div>
      </section>

      {/* Men's Collection Section */}
      <section className="men-section">
        <h2>Men's Collection</h2>
        <div className="featured-items">
          {newArrivals.length > 0 ? (
            newArrivals
              .filter((product) => product.category === "men") // Lọc sản phẩm Nam
              .map((product) => (
                <div key={product.id} className="featured-item">
                  <div className="image-container">
                    <a href={`/product/${product.price}`}>
                      <img src={product.image} alt={product.name} />
                      <div className="overlay">
                        <button className="shop-button">Xem chi tiết</button>
                      </div>
                    </a>
                  </div>
                  <div className="product-info">
                    <p className="product-name">{product.name}</p>
                    <p className="product-price">{product.price} VND</p>
                  </div>
                </div>
              ))
          ) : (
            <p>Không có sản phẩm nào.</p>
          )}
        </div>
      </section>

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
    </>
  );
};

export default Home;
