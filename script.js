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
    // تغییر اینجا: به جای display: none/block از opacity و pointer-events استفاده می‌کنیم
    if (textContent.includes(input)) {
      product.style.opacity = "1";
      product.style.pointerEvents = "auto";
      product.style.position = "static"; // مطمئن می‌شویم که عنصر در جریان عادی صفحه باشد
    } else {
      product.style.opacity = "0";
      product.style.pointerEvents = "none";
      product.style.position = "absolute"; // خارج کردن از جریان عادی صفحه
      product.style.width = "200px"; // برای حفظ عرض اولیه محصول
    }
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
    if (category === 'all' || product.classList.contains(`category-${category}`)) {
      product.style.opacity = '1';
      product.style.pointerEvents = 'auto';
      product.style.position = 'static'; // برگرداندن به حالت عادی
    } else {
      product.style.opacity = '0';
      product.style.pointerEvents = 'none';
      product.style.position = 'absolute'; // خارج کردن از جریان عادی
      product.style.width = "200px"; // حفظ عرض برای جلوگیری از بهم ریختگی
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

const slides = document.querySelectorAll(".slide");
let currentSlide = 0;
let startX = 0;
let endX = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) slide.classList.add("active");
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

// دکمه‌ها
document.querySelector(".next").addEventListener("click", nextSlide);
document.querySelector(".prev").addEventListener("click", prevSlide);

// سوایپ موبایل
const slider = document.getElementById("slider");

slider.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

slider.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  if (startX - endX > 50) {
    nextSlide();
  } else if (endX - startX > 50) {
    prevSlide();
  }
}

// اسلاید خودکار هر ۵ ثانیه
setInterval(nextSlide, 7000);

// نمایش اولین اسلاید
showSlide(currentSlide);

// تابع برای اسکرول به بالا
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// نمایش یا مخفی کردن دکمه اسکرول به بالا بر اساس موقعیت صفحه
window.onscroll = function() {
    const scrollBtn = document.getElementById("scrollToTopBtn");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
};
