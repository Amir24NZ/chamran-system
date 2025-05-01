window.onload = function () {
  const container = document.getElementById("cartItems");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    container.innerHTML = "<p>سبد خرید شما خالی است.</p>";
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="cart-item-details">
        <strong>${item.title}</strong>
        <span>قیمت: ${item.price} تومان</span>
        <button class="remove-btn" onclick="removeFromCart(${index})">❌ حذف</button>
      </div>
    `;
    container.appendChild(div);
  });
};

function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload(); // رفرش صفحه برای نمایش تغییرات
}
