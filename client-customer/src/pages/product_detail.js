import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/style1.css"; // Import file CSS
import "../styles/product_detail.css"; // Import file CSS

const ProductDetail = () => {
  const { price } = useParams(); // Lấy giá từ URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // Trạng thái loading

  useEffect(() => {
    // Thêm console.log để kiểm tra price và đường dẫn API
    console.log("Fetching product with price:", price);
    axios.get(`http://localhost:3000/api/products/${price}`)
      .then(response => {
        console.log("API Response:", response.data); // Kiểm tra phản hồi API
        setProduct(response.data[0]); // Lấy sản phẩm đầu tiên từ mảng (nếu có)
        setLoading(false); // Đổi trạng thái khi dữ liệu đã tải xong
      })
      .catch(error => {
        console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
        setLoading(false); // Dừng loading nếu có lỗi
      });
  }, [price]);

  const addToCart = () => {
    axios.post("http://localhost:3000/api/cart", {
      productId: product._id,
      userId: "user123", // Giả định userId là "user123"
    })
    .then(response => {
      alert("Sản phẩm đã được thêm vào giỏ hàng!");
    })
    .catch(error => {
      console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
    });
  };

  // Hiển thị loading khi chưa có dữ liệu
  if (loading) {
    return <div>Loading...</div>;
  }

  // Hiển thị sản phẩm khi đã tải xong
  if (!product) {
    return <div>Sản phẩm không tồn tại.</div>;
  }
  
  return (
    <div>
      <header className="navbar">
        <div className="logo">
          <a href="/">
            <img src="/static/images/logo.png" alt="Logo" />
          </a>
        </div>
        <nav className="navbar">
          <ul className="menu">
            <li><a href="/new-products">Hàng Mới</a></li>
            <li><a href="/men-products">Nam</a></li>
            <li><a href="/women-products">Nữ</a></li>
          </ul>
          <div className="search-cart">
            <input type="text" placeholder="Tìm kiếm" className="search-input" />
            <button className="search-button">🔍</button>
            <a href="/cart" className="cart-icon">🛒</a>
            <a className="favorites-icon">❤️</a>
            <a href="/login">
              <img src="#" className="dashboard" style={{ width: '24px', height: '24px' }} />
            </a>
          </div>
        </nav>
      </header>

      <section className="product-detail">
        <div className="product-images">
          <img src={product.image} alt={product.name} className="main-image" />
          <div className="thumbnail-images">
            <img src={product.image} alt="Thumbnail" className="thumbnail" />
          </div>
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="product-price">{product.price}₫</p>

          <div className="product-sizes">
            <label htmlFor="size">Size:</label>
            <select id="size">
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
            </select>
          </div>

          <button onClick={addToCart} className="add-to-cart">Thêm vào giỏ hàng</button>
          <a href="#" className="favourite">Yêu thích</a>

          <div className="product-description">
            <h3>Mô tả sản phẩm:</h3>
            <p>{product.description}</p>
          </div>
        </div>
      </section>

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

export default ProductDetail;