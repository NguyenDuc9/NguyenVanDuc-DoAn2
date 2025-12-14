function addToCart(maSanPham, name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Ép kiểu price sang số
  price = Number(price);

  // Kiểm tra xem sản phẩm đã tồn tại chưa
  const existingIndex = cart.findIndex((item) => item.maSanPham === maSanPham);

  if (existingIndex !== -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({ maSanPham, name, price, image, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("✅ Đã thêm sản phẩm vào giỏ hàng!");
  loadCart();
}
