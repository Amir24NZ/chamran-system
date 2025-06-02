// تابع کمکی برای فرمت کردن اعداد با کاما
function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

window.onload = function () {
  const container = document.getElementById("cartItems");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const loggedInUser = localStorage.getItem("loggedInUser");
  const loginPrompt = document.getElementById("login-prompt");
  const userInfoCheckout = document.getElementById("user-info-checkout");
  const placeOrderBtn = document.getElementById("place-order-btn");
  const checkoutSection = document.getElementById("checkout-section");
  let totalCartPrice = 0; // متغیر جدید برای نگهداری جمع کل سبد خرید

  if (cart.length === 0) {
    container.innerHTML = "<p style='text-align: center; margin-top: 20px;'>سبد خرید شما خالی است.</p>";
    loginPrompt.style.display = "none";
    userInfoCheckout.style.display = "none";
    checkoutSection.style.display = "none";
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    const itemPrice = parseFloat(item.price); // اطمینان از اینکه قیمت عدد است
    totalCartPrice += itemPrice; // اضافه کردن قیمت هر کالا به جمع کل

    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="cart-item-details">
        <strong>${item.title}</strong>
        <span>قیمت: ${formatNumberWithCommas(itemPrice)} تومان</span>
        <button class="remove-btn" onclick="removeFromCart(${index})">❌ حذف</button>
      </div>
    `;
    container.appendChild(div);
  });

  // نمایش جمع فاکتور در بخش تکمیل خرید
  const totalPriceParagraph = document.createElement("p");
  totalPriceParagraph.id = "total-cart-price";
  totalPriceParagraph.innerHTML = `<strong>جمع فاکتور: ${formatNumberWithCommas(totalCartPrice)} تومان</strong>`;
  // اضافه کردن پاراگراف قیمت به بخش تکمیل خرید
  // این کد را قبل از هر چیزی در userInfoCheckout یا قبل از دکمه place-order-btn اضافه کنید.
  // بهتر است این پاراگراف بلافاصله قبل از دکمه "ثبت سفارش نهایی" باشد.
  userInfoCheckout.insertBefore(totalPriceParagraph, placeOrderBtn);


  // Check if user is logged in
  if (loggedInUser) {
    loginPrompt.style.display = "none";
    userInfoCheckout.style.display = "block";
    
    let usersInfo = JSON.parse(localStorage.getItem("usersInfo")) || {};
    const currentUserInfo = usersInfo[loggedInUser];

    if (currentUserInfo) {
      document.getElementById("checkout-name").innerText = `نام: ${currentUserInfo.firstName} ${currentUserInfo.lastName}`;
      document.getElementById("checkout-address").innerText = `آدرس: ${currentUserInfo.address}`;
      document.getElementById("checkout-phone").innerText = `شماره تلفن: ${currentUserInfo.phone}`;
    } else {
      document.getElementById("checkout-name").innerText = "اطلاعات حساب کاربری شما ناقص است. لطفاً به صفحه حساب کاربری مراجعه و اطلاعات خود را تکمیل کنید.";
      document.getElementById("checkout-address").innerText = "";
      document.getElementById("checkout-phone").innerText = "";
      placeOrderBtn.disabled = true; // Disable order button if info is missing
    }

    placeOrderBtn.onclick = placeOrder; // Assign click handler for placing order

  } else {
    loginPrompt.style.display = "block";
    userInfoCheckout.style.display = "none";
  }
};

function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload(); // رفرش صفحه برای نمایش تغییرات
}

function placeOrder() {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let usersInfo = JSON.parse(localStorage.getItem("usersInfo")) || {};
  const currentUserInfo = usersInfo[loggedInUser];

  if (!loggedInUser) {
    alert("لطفاً ابتدا وارد حساب کاربری خود شوید.");
    return;
  }

  if (!currentUserInfo || !currentUserInfo.firstName || !currentUserInfo.lastName || !currentUserInfo.address || !currentUserInfo.phone) {
    alert("لطفاً اطلاعات حساب کاربری خود را در صفحه حساب کاربری تکمیل کنید.");
    return;
  }

  if (cart.length === 0) {
    alert("سبد خرید شما خالی است.");
    return;
  }

  // Create an order object
  const order = {
    user: loggedInUser,
    userInfo: currentUserInfo,
    items: cart,
    orderDate: new Date().toLocaleString("fa-IR"), // Current date and time
    orderId: Date.now() // Simple unique ID for the order
  };

  // Save the order to localStorage under 'userOrders'
  let userOrders = JSON.parse(localStorage.getItem("userOrders")) || {};
  if (!userOrders[loggedInUser]) {
    userOrders[loggedInUser] = [];
  }
  userOrders[loggedInUser].push(order);
  localStorage.setItem("userOrders", JSON.stringify(userOrders));

  // Clear the cart
  localStorage.removeItem("cart");

  alert("سفارش شما با موفقیت ثبت شد! می‌توانید جزئیات سفارش را در صفحه حساب کاربری خود مشاهده کنید.");
  location.reload(); // Reload to reflect changes in cart
}