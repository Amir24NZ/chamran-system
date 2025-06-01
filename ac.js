function switchToLogin() {
  document.getElementById("register-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
  document.getElementById("form-container").style.display = "block"; // Make sure form-container is visible
  document.getElementById("account-info-container").style.display = "none"; // Hide account info
}

function switchToRegister() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("register-form").style.display = "block";
  document.getElementById("form-container").style.display = "block"; // Make sure form-container is visible
  document.getElementById("account-info-container").style.display = "none"; // Hide account info
}

function register() {
  const username = document.getElementById("reg-username").value.trim();
  const password = document.getElementById("reg-password").value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[username]) {
    alert("این حساب قبلاً ثبت شده! لطفاً وارد شوید.");
    switchToLogin();
    return;
  }

  if (username === "" || password === "") {
    alert("همه فیلدها رو پر کن.");
    return;
  }

  // Username validation
  if (username.length < 4) {
    alert("نام کاربری حداقل باید 4 کاراکتر باشد.");
    return;
  }

  // Password validation
  if (password.length < 6) {
    alert("رمز عبور حداقل باید 6 کاراکتر باشد.");
    return;
  }
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  if (!hasLetter || !hasNumber) {
    alert("رمز عبور باید شامل حروف (انگلیسی) و اعداد باشد.");
    return;
  }

  users[username] = { password: password };
  localStorage.setItem("users", JSON.stringify(users));
  alert("ثبت‌نام موفق بود! حالا وارد شو.");
  switchToLogin();
}

function login() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (!users[username] || users[username].password !== password) {
    alert("نام کاربری یا رمز اشتباهه.");
    return;
  }

  localStorage.setItem("loggedInUser", username);
  showAccountInfoOrForm();
}

function submitInfo() {
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const address = document.getElementById("address").value.trim();
  const phone = document.getElementById("phone").value.trim();

  // Phone number validation
  const phoneRegex = /^09\d{9}$/;
  if (!phoneRegex.test(phone)) {
    alert("شماره تلفن باید با '09' شروع شود و 11 رقم داشته باشد. مثال: 09123456789");
    return;
  }

  if (firstName && lastName && address && phone) {
    const userInfo = {
      firstName,
      lastName,
      address,
      phone
    };
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      let usersInfo = JSON.parse(localStorage.getItem("usersInfo")) || {};
      usersInfo[loggedInUser] = userInfo;
      localStorage.setItem("usersInfo", JSON.stringify(usersInfo));
      showInfo(userInfo);
    } else {
      alert("برای ثبت اطلاعات، ابتدا باید وارد شوید.");
    }
  } else {
    alert("لطفاً تمام فیلدها را پر کنید.");
  }
}

function showInfo(user) {
  const loggedInUser = localStorage.getItem("loggedInUser");
  document.getElementById("usernameInfo").innerText = `نام کاربری: ${loggedInUser}`;
  document.getElementById("nameInfo").innerText = `نام: ${user.firstName} ${user.lastName}`;
  document.getElementById("addressInfo").innerText = `آدرس: ${user.address}`;
  document.getElementById("phoneInfo").innerText = `شماره تلفن: ${user.phone}`;

  document.getElementById("formSection").classList.add("hidden");
  document.getElementById("infoDisplay").classList.remove("hidden");
  document.getElementById("ordersDisplay").classList.remove("hidden");
  displayUserOrders();
}

function editInfo() {
  const loggedInUser = localStorage.getItem("loggedInUser");
  let usersInfo = JSON.parse(localStorage.getItem("usersInfo")) || {};
  const user = usersInfo[loggedInUser];

  if (user) {
    document.getElementById("firstName").value = user.firstName;
    document.getElementById("lastName").value = user.lastName;
    document.getElementById("address").value = user.address;
    document.getElementById("phone").value = user.phone;
  } else {
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("address").value = "";
    document.getElementById("phone").value = "";
  }
  document.getElementById("infoDisplay").classList.add("hidden");
  document.getElementById("formSection").classList.remove("hidden");
  document.getElementById("ordersDisplay").classList.add("hidden");
}

function displayUserOrders() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const orderListDiv = document.getElementById("orderList");
    orderListDiv.innerHTML = "";

    if (loggedInUser) {
        let userOrders = JSON.parse(localStorage.getItem("userOrders")) || {};
        const orders = userOrders[loggedInUser] || [];

        if (orders.length === 0) {
            orderListDiv.innerHTML = "<p style='text-align: center;'>هیچ سفارشی ثبت نشده است.</p>";
            return;
        }

        orders.forEach(order => {
            const orderDiv = document.createElement("div");
            orderDiv.className = "order-item";
            orderDiv.innerHTML = `
                <h3>سفارش شماره: ${order.orderId}</h3>
                <p>تاریخ سفارش: ${order.orderDate}</p>
                <p>گیرنده: ${order.userInfo.firstName} ${order.userInfo.lastName}</p>
                <p>آدرس: ${order.userInfo.address}</p>
                <p>تلفن: ${order.userInfo.phone}</p>
                <h4>محصولات:</h4>
                <ul>
                    ${order.items.map(item => `<li>${item.title} - ${item.price} تومان</li>`).join("")}
                </ul>
                <hr>
            `;
            orderListDiv.appendChild(orderDiv);
        });
    } else {
        orderListDiv.innerHTML = "<p style='text-align: center;'>برای مشاهده سفارشات، لطفاً وارد شوید.</p>";
    }
}


function showAccountInfoOrForm() {
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (loggedInUser) { // If a user is logged in
    document.getElementById("form-container").style.display = "none";
    document.getElementById("account-info-container").style.display = "block";

    let usersInfo = JSON.parse(localStorage.getItem("usersInfo")) || {};
    const savedUserInfo = usersInfo[loggedInUser];

    if (savedUserInfo) {
      showInfo(savedUserInfo);
      displayUserOrders();
    } else {
      document.getElementById("formSection").classList.remove("hidden");
      document.getElementById("infoDisplay").classList.add("hidden");
      document.getElementById("ordersDisplay").classList.add("hidden");
    }
  } else { // If no user is logged in
    document.getElementById("form-container").style.display = "block";
    document.getElementById("account-info-container").style.display = "none";
    switchToRegister();
  }
}

function logout() {
  localStorage.removeItem("loggedInUser");
  alert("شما با موفقیت خارج شدید.");
  showAccountInfoOrForm();
}

// New function to delete the user account
function deleteAccount() {
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
        alert("شما وارد حساب کاربری نشده‌اید.");
        return;
    }

    const confirmDelete = confirm("آیا از حذف حساب کاربری خود اطمینان دارید؟ تمام اطلاعات شما شامل اطلاعات شخصی و سفارشات حذف خواهد شد.");

    if (confirmDelete) {
        // Remove user from 'users' storage
        let users = JSON.parse(localStorage.getItem("users")) || {};
        delete users[loggedInUser];
        localStorage.setItem("users", JSON.stringify(users));

        // Remove user info from 'usersInfo' storage
        let usersInfo = JSON.parse(localStorage.getItem("usersInfo")) || {};
        delete usersInfo[loggedInUser];
        localStorage.setItem("usersInfo", JSON.stringify(usersInfo));

        // Remove user's orders from 'userOrders' storage
        let userOrders = JSON.parse(localStorage.getItem("userOrders")) || {};
        delete userOrders[loggedInUser];
        localStorage.setItem("userOrders", JSON.stringify(userOrders));

        // Clear the logged-in user session
        localStorage.removeItem("loggedInUser");

        alert("حساب کاربری شما با موفقیت حذف شد.");
        showAccountInfoOrForm(); // Redirect to login/register form
    }
}

window.onload = function () {
  showAccountInfoOrForm();
};