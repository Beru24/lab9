import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/base";
import ProductDetail from "./pages/product_detail";
import Men from "./pages/men";
import Cart from "./pages/cart";
import Women from "./pages/women";
import New from "./pages/new";





const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:price" element={<ProductDetail />} />
        <Route path="/men" element={<Men />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/new" element={<New />} />
        <Route path="/women" element={<Women />} />

      </Routes>
    </Router>
  );
};

export default App;
