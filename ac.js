function switchToLogin() {
  document.getElementById("register-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
}

function switchToRegister() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("register-form").style.display = "block";
}

function register() {
  const username = document.getElementById("reg-username").value.trim();
  const password = document.getElementById("reg-password").value.trim();

  const existingUser = JSON.parse(localStorage.getItem("user"));

  if (existingUser && existingUser.username === username) {
    alert("این حساب قبلاً ثبت شده! لطفاً وارد شوید.");
    switchToLogin();
    return;
  }

  if (username === "" || password === "") {
    alert("همه فیلدها رو پر کن.");
    return;
  }

  const userData = { username, password };
  localStorage.setItem("user", JSON.stringify(userData));
  alert("ثبت‌نام موفق بود! حالا وارد شو.");
  switchToLogin();
}

function login() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();

  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser) {
    alert("ابتدا باید ثبت‌نام کنید.");
    switchToRegister();
    return;
  }

  if (username === storedUser.username && password === storedUser.password) {
    localStorage.setItem("loggedInUser", username);
    window.location.href = "acnt.html";
  } else {
    alert("نام کاربری یا رمز اشتباهه.");
  }
}
