function analyzeProblem() {
  const input = document.getElementById("problemInput").value.trim().toLowerCase();
  const resultDiv = document.getElementById("diagnosticResult");

  const words = input.replace(/\s+/g, ' ').split(' '); // جمله رو به کلمات تبدیل کن

  const database = [
    { keywords: ["تصویر", "نداره", "نمیاد"], result: "احتمالاً مشکل از کارت گرافیک یا کابل HDMI است." },
    { keywords: ["روشن", "نمیشه"], result: "ممکن است پاور یا مادربرد مشکل داشته باشد." },
    { keywords: ["روشن", "بوت"], result: "مشکل از خرابی فایل های ویندوز است و باید ویندوز تعمیر شود." },
    { keywords: ["صدا", "بوق"], result: "بوق‌های مادربرد نشان‌دهنده خرابی رم یا کارت گرافیک هستند." },
    { keywords: ["کند", "هنگ","لگ"], result: "مشکل ممکن است از هارد یا رم باشد یا ممکن است ویروس باشد. همچنین قدیمی بودن سخت‌افزار و نبود نصب درایور هم تاثیر دارد." },
    { keywords: ["ریست", "خاموش"], result: "احتمال خرابی پاور یا داغ شدن CPU وجود دارد همچنین احتمال خرابی فایل‌های ویندوز وجود دارد." },
    { keywords: ["داغ", "گرما"], result: "خشک شدن خمیر سیلیکون و یا کار نکردن فن‌ها." },
    { keywords: ["بلو", "صفحه آّبی"], result: "مشکل از فایل های ویندوز یا خرابی اجزای سیستم است." },
    { keywords: ["سلام", "خوبی"], result: "سلام. مشکلتو بگو تا حلش کنم" }
  ];

  // همه‌ی مواردی که حداقل یک کلمه‌اش با ورودی کاربر match بشه
  const matches = database.filter(entry =>
    entry.keywords.some(keyword => words.includes(keyword))
  );

  // نمایش همه جواب‌های ممکن، یا پیام خطا
  if (matches.length > 0) {
    resultDiv.innerHTML = matches.map(entry => `🔹 ${entry.result}`).join("<br><br>");
  } else {
    resultDiv.innerHTML = "نتوانستم مشکل را شناسایی کنم. لطفاً مشکل را دقیق‌تر توضیح دهید.";
  }
}

  function matchParts() {
    const input = document.getElementById("matchInput").value.trim().toLowerCase().replace(/\s+/g, '');
    const resultDiv = document.getElementById("matchResult");
  
    const compatibilityDB = {
      "corei310105": ["مادربرد: h510", "رم: DDR4 3600MHz", "کارت گرافیک: RX580", "پاور: 500W"],
      "corei511400": ["مادربرد: h510", "رم: DDR4 3600MHz", "کارت گرافیک: RX580/RTX 2060 Super/RTX 3050/RTX 3060", "پاور: 550W"],
      "corei512400": ["مادربرد: h610", "رم: DDR4 3200MHz", "کارت گرافیک: RTX 3060", "پاور: 600W"],
      "corei712700": ["مادربرد: h610", "رم: DDR4 3600MHz", "کارت گرافیک: RTX 2060/3050/3060", "پاور: 600W"],
  
      "h510": ["پردازنده: core i3/5/7 10th/11th", "رم: DDR4", "پاور: حداقل 500W", "کارت گرافیک: RX580/RTX 2060 Super/RTX 3050/RTX 3060"],
      "h610": ["پردازنده: core i3/5/7 12th/13th", "رم: DDR4", "پاور: حداقل 550W", "کارت گرافیک: RX580/RTX 2060 Super/RTX 3050/RTX 3060"],
      "b760": ["پردازنده: core i3/5/7 12th/13th", "رم: DDR5", "پاور: حداقل 600W", "کارت گرافیک: RX580/RTX 2060 Super/RTX 3050/RTX 3060"],
  
      "rx580": ["مادربرد: h510/h610", "رم: DDR4 3600MHz", "پردازنده: core i3/i5 10th/11th/12th", "پاور: 550W"],
      "rtx2060": ["مادربرد: h510/h610", "رم: DDR4 3600MHz", "پردازنده: core i3/i5 10th/11th/12th", "پاور: 550W"],
      "rtx3060": ["مادربرد: h510/h610", "رم: DDR4 3600MHz", "پردازنده: core i3/i5 10th/11th/12th", "پاور: 600W"],
      "rtx4060": ["مادربرد: h510/h610", "رم: DDR4 3600MHz", "پردازنده: core i3/i5 10th/11th/12th", "پاور: 600W"],

      "500w": ["مادربرد: h510/h610", "رم: DDR4 3600MHz", "پردازنده: core i3/i5 10th/11th/12th", "کارت گرافیک: RX580"],
      "600w": ["مادربرد: h510/h610", "رم: DDR4 3600MHz", "پردازنده: core i3/i5 10th/11th/12th", "RX580/RTX 2060 Super/RTX 3050/RTX 3060"],
  
      "corsairram": ["سازگار با: DDR4 مادربردهای h510/h610", "فرکانس: 3200MHz", "پاور: مهم نیست", "سازگاری کامل با AMD و Intel"],
      "corsair": ["سازگار با: DDR4 مادربردهای h510/h610", "فرکانس: 3200MHz", "پاور: مهم نیست", "سازگاری کامل با AMD و Intel"],
    };
  
    let found = false;
    let resultHTML = '';
  
    for (let key in compatibilityDB) {
      if (key.includes(input)) {
        found = true;
        resultHTML += `<h3>نتیجه برای: ${key}</h3><ul>${compatibilityDB[key].map(item => `<li>${item}</li>`).join('')}</ul><br>`;
      }
    }
  
    resultDiv.innerHTML = found ? resultHTML : "متأسفانه چیزی پیدا نشد.";
  }
  