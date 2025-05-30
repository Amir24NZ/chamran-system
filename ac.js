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
  const city = document.getElementById("city").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (firstName && lastName && city && phone) {
    const userInfo = {
      firstName,
      lastName,
      city,
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
  document.getElementById("nameInfo").innerText = `نام: ${user.firstName} ${user.lastName}`;
  document.getElementById("cityInfo").innerText = `شهر: ${user.city}`;
  document.getElementById("phoneInfo").innerText = `شماره تلفن: ${user.phone}`;

  document.getElementById("formSection").classList.add("hidden");
  document.getElementById("infoDisplay").classList.remove("hidden");
}

function editInfo() {
  const loggedInUser = localStorage.getItem("loggedInUser");
  let usersInfo = JSON.parse(localStorage.getItem("usersInfo")) || {};
  const user = usersInfo[loggedInUser];

  if (user) {
    document.getElementById("firstName").value = user.firstName;
    document.getElementById("lastName").value = user.lastName;
    document.getElementById("city").value = user.city;
    document.getElementById("phone").value = user.phone;
  } else {
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("city").value = "";
    document.getElementById("phone").value = "";
  }
  document.getElementById("infoDisplay").classList.add("hidden");
  document.getElementById("formSection").classList.remove("hidden");
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
    } else {
      document.getElementById("formSection").classList.remove("hidden");
      document.getElementById("infoDisplay").classList.add("hidden");
    }
  } else { // If no user is logged in
    document.getElementById("form-container").style.display = "block";
    document.getElementById("account-info-container").style.display = "none";
    switchToRegister(); // Default to register form for new visitors
  }
}

function logout() {
  localStorage.removeItem("loggedInUser");
  alert("شما با موفقیت خارج شدید.");
  showAccountInfoOrForm();
}

window.onload = function () {
  showAccountInfoOrForm();
};