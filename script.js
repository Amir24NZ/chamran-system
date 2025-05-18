function addToCart(title, price, image) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ title, price, image });
  localStorage.setItem("cart", JSON.stringify(cart));

  // انتقال به سبد خرید
  window.location.href = "sab.html";
}

function searchProducts() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const products = document.querySelectorAll(".product");

  products.forEach(product => {
    const textContent = product.textContent.toLowerCase();
    product.style.display = textContent.includes(input) ? "block" : "none";
  });
}


function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function toggleMenu() {
  const menu = document.getElementById("menuContent");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function toggleSubmenu() {
  const submenu = document.getElementById("submenu-systems");
  submenu.style.display = submenu.style.display === "block" ? "none" : "block";
}

function filterProducts(category) {
  const products = document.querySelectorAll('.product');

  // فیلتر محصولات
  products.forEach(product => {
    if (category === 'all') {
      product.style.display = 'block';
    } else if (product.classList.contains(`category-${category}`)) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });

  // اسکرول نرم به بخش محصولات
  const section = document.getElementById('productsSection');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }

  // بستن منو بعد از کلیک (اختیاری)
  const menu = document.getElementById("menuContent");
  if (menu.style.display === "block") {
    menu.style.display = "none";
  }
}

const slider = document.getElementById("slider");
let index = 0;

function autoSlide() {
  index = (index + 1) % slider.children.length;
  slider.scrollTo({
    left: slider.clientWidth * index,
    behavior: "smooth"
  });
}

setInterval(autoSlide, 3000);

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const productsSection = document.getElementById("productsSection");

  function handleSearchScroll() {
    searchProducts(); // فیلتر محصولات
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      handleSearchScroll();
    }
  });

  searchBtn.addEventListener("click", function () {
    handleSearchScroll();
  });
});
