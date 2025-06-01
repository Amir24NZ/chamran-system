// تابع کمکی برای افزودن پیام به صفحه چت
function addMessage(sender, message) {
    const messagesDisplay = document.getElementById("messages-display");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message");
    if (sender === 'user') {
        messageDiv.classList.add("user-message");
    } else {
        messageDiv.classList.add("bot-message");
    }
    messageDiv.innerHTML = `<p>${message}</p>`;
    messagesDisplay.appendChild(messageDiv);
    messagesDisplay.scrollTop = messagesDisplay.scrollHeight; // اسکرول به پایین
}

function analyzeProblem() {
  const inputRaw = document.getElementById("problemInput").value.trim();
  const problemInput = document.getElementById("problemInput");

  // دریافت نام کاربری از Local Storage
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (inputRaw === '') {
    problemInput.value = "";
    return;
  }

  // نمایش پیام کاربر با استفاده از تابع کمکی
  addMessage('user', inputRaw);


  const inputLower = inputRaw.toLowerCase();
  const inputLowerNoSpace = inputLower.replace(/\s+/g, '');

  const database = [
    //مشکلات سیستم
    { keywords: ["تصویر", "صفحه"], result: "احتمالاً مشکل از کارت گرافیکه یا کابل HDMI خرابه." },
    { keywords: ["روشن", "بالا", "بوت"], result: "ممکنه پاور یا مادربرد مشکل داشته باشه، یا ویندوزت خراب شده و باید درست بشه." },
    { keywords: ["صدا", "بوق"], result: "این بوق‌ها معمولاً می‌گن رم یا کارت گرافیک مشکل داره." },
    { keywords: ["کند", "هنگ", "لگ"], result: "ممکنه مشکل از هارد یا رم باشه، یا ویروس گرفته باشه. گاهی هم سیستم ضعیفه یا درایورها نصب نیستن." },
    { keywords: ["ریست", "خاموش"], result: "ممکنه پاور خراب باشه یا CPU زیادی داغ کرده باشه. شاید هم ویندوزت مشکل پیدا کرده." },
    { keywords: ["داغ", "گرما", "داغی"], result: "احتمالاً خمیر سیلیکون خشک شده یا فن‌ها خوب کار نمی‌کنن." },
    { keywords: ["بلو", "صفحه آّبی"], result: "یا ویندوز قاطی کرده یا یه قطعه از سیستم خرابه." },
    { keywords: ["اینترنت"], result: "ممکنه مودم یا کارت شبکه مشکل داشته باشه، یا تنظیمات شبکه اشتباه باشه." },
    { keywords: ["نصب", "ویندوز", "فلش", "فلشم"], result: "احتمال داره فلش درست بوتیبل نشده باشه یا BIOS درست تنظیم نشده باشه." },
    { keywords: ["فن", "صدای زیاد", "چرخش زیاد"], result: "احتمالاً سیستم داغ کرده یا فن‌ها خاک گرفتن. شاید هم یه برنامه سنگین در حال اجراست." },
    { keywords: ["usb", "شناخته"], result: "ممکنه پورت USB خراب شده باشه، یا درایورش نصب نباشه، یا خود دستگاه مشکل داشته باشه." },
    { keywords: ["خط", "رنگی", "تصویر عجیب"], result: "ممکنه کارت گرافیک خراب شده باشه یا کابل تصویر مشکل داشته باشه." },
    { keywords: ["کیبورد", "ماوس"], result: "ممکنه پورت USB مشکل داشته باشه یا درایور نصب نباشه. شاید هم خود کیبورد یا ماوس خراب شده." },
    { keywords: ["تاریخ", "زمان"], result: "احتمالاً باتری مادربرد (CMOS) تموم شده." },
    { keywords: ["ویندوز", "ریست", "خودکار"], result: "ممکنه سیستم داغ می‌کنه یا پاور خرابه یا یه درایور با سیستم نمی‌سازه." },
    { keywords: ["مانیتور", "خاموش", "کیس", "روشن"], result: "کابل تصویر شاید دراومده یا کارت گرافیک مشکل داره." },
    { keywords: ["درایور", "نصب", "ارور"], result: "درایور ممکنه با ویندوز سازگار نباشه، یا باید تو حالت Safe Mode نصب بشه." },

    //نکات
    // تغییر این دو خط در دیتابیس شما
    { keywords: ["سلام"], result: "سلام [USER_PLACEHOLDER]! چطور می‌تونم کمکت کنم؟" },
    { keywords: ["خوبی"], result: "مرسی [USER_PLACEHOLDER]، خودت خوبی؟ مشکلی داری بتونم حلش کنم؟" },
    // کلمات خاص که باید دقیقا وارد شوند
    { keywords: ["پردازنده", "مادربورد", "مادربرد", "پاور", "رم", "کارت گرافیک"], result: "لطفا مدل دقیقش رو نام ببر", exactMatch: true },

    //پردازنده
    { keywords: ["corei310105"], result: "Core i3-10105 یک پردازنده 4 هسته‌ای نسل دهم اینتل با فرکانس تا 4.4 گیگاهرتز و سوکت LGA 1200 است. برای کارهای روزمره و بازی‌های سبک مناسب است. با مادربردهای سری 400 و 500 اینتل و رم DDR4 سازگار است. گرافیک داخلی Intel UHD 630 دارد اما برای بازی بهتر است کارت گرافیک مجزا مثل GTX 1650 یا بهتر داشته باشید. پاور حداقل 300-350 وات برای سیستم‌های معمولی کافی است. توان مصرفی پردازنده 65 وات است.", exactMatch: true },
    { keywords: ["corei511400"], result: "Core i5-11400 یک پردازنده 6 هسته‌ای نسل یازدهم اینتل با فرکانس تا 4.4 گیگاهرتز و سوکت LGA 1200 است. مناسب کارهای نیمه‌سنگین و بازی‌های متوسط است. با مادربردهای سری 400 و 500 و رم DDR4 سازگار است. گرافیک داخلی Intel UHD 730 دارد اما برای بازی بهتر است کارت گرافیک RTX 2060 یا مشابه داشته باشید. پاور حداقل 400 وات مناسب است. توان مصرفی 65 وات.", exactMatch: true },
    { keywords: ["corei512400"], result: "Core i5-12400 یک پردازنده 6 هسته‌ای نسل دوازدهم اینتل با فرکانس تا 4.4 گیگاهرتز و سوکت LGA 1700 است. مناسب کارهای سنگین‌تر و بازی‌های پیشرفته است. با مادربردهای سری 600 و 700 و رم DDR4 و DDR5 سازگار است. گرافیک داخلی Intel UHD 730 دارد اما برای بازی بهتر است کارت گرافیک RTX 3060 یا مشابه داشته باشید. پاور حداقل 450 وات توصیه می‌شود. توان مصرفی 65 وات.", exactMatch: true },
    { keywords: ["corei712700"], result: "Core i7-12700 یک پردازنده 12 هسته‌ای نسل دوازدهم اینتل با سوکت LGA 1700 است. مناسب کارهای سنگین، بازی‌های حرفه‌ای و ویرایش ویدئو است. با مادربردهای سری 600 و 700 و رم DDR4 و DDR5 سازگار است. گرافیک داخلی Intel UHD 770 دارد اما برای بازی بهتر است کارت گرافیک RTX 3070 یا بهتر داشته باشید. پاور حداقل 550 وات مناسب است. توان مصرفی پایه 65 وات و تا 190 وات در حالت توربو.", exactMatch: true },
    { keywords: ["corei513100"], result: "Core i5-13100 یک پردازنده 4 هسته‌ای نسل سیزدهم اینتل با سوکت LGA 1700 است. مناسب کارهای روزمره و بازی‌های سبک تا متوسط است. با مادربردهای سری 600 و 700 و رم DDR4 و DDR5 سازگار است. گرافیک داخلی Intel UHD 730 دارد اما برای بازی بهتر است کارت گرافیک GTX 1660 یا مشابه داشته باشید. پاور حداقل 350 وات کافی است. توان مصرفی 60 وات.", exactMatch: true },
    { keywords: ["corei713700"], result: "Core i7-13700 یک پردازنده 16 هسته‌ای نسل سیزدهم اینتل با سوکت LGA 1700 است. مناسب کارهای سنگین، بازی‌های حرفه‌ای و تولید محتوا است. با مادربردهای سری 600 و 700 و رم DDR4 و DDR5 سازگار است. گرافیک داخلی Intel UHD 770 دارد اما برای بازی بهتر است کارت گرافیک RTX 4070 یا بهتر داشته باشید. پاور حداقل 650 وات توصیه می‌شود. توان مصرفی پایه 65 وات و تا 219 وات در حالت توربو.", exactMatch: true },
    { keywords: ["ryzen5600"], result: "Ryzen 5 5600X یک پردازنده 6 هسته‌ای 12 رشته‌ای AMD با سوکت AM4 است. مناسب بازی‌های حرفه‌ای و مالتی‌تسکینگ است. با مادربردهای سری 400 و 500 و رم DDR4 سازگار است. فاقد گرافیک داخلی است و نیاز به کارت گرافیک مجزا دارد. پاور حداقل 450 وات توصیه می‌شود. توان مصرفی 65 وات.", exactMatch: true },

    //مادربورد
    { keywords: ["h510"], result: "مادربرد H510 اینتل برای پردازنده‌های نسل دهم و یازدهم با سوکت LGA 1200 طراحی شده است. مناسب سیستم‌های اقتصادی با امکانات پایه و رم DDR4 است. قابلیت اورکلاک ندارد و برای کارهای معمولی و اداری مناسب است.", exactMatch: true },
    { keywords: ["h610"], result: "مادربرد H610 اینتل برای پردازنده‌های نسل دوازدهم و سیزدهم با سوکت LGA 1700 است. برای سیستم‌های اقتصادی با امکانات پایه و رم DDR4 و DDR5 مناسب است. قابلیت اورکلاک ندارد و بیشتر برای کاربران عادی و اداری کاربرد دارد.", exactMatch: true },
    { keywords: ["b760"], result: "مادربرد B760 اینتل برای پردازنده‌های نسل دوازدهم و سیزدهم با سوکت LGA 1700 است. مناسب کاربران نیمه حرفه‌ای با پشتیبانی از رم DDR4 و DDR5. امکانات متعادل و برخی قابلیت‌های پیشرفته‌تر نسبت به سری H دارد، اما اورکلاک پردازنده را پشتیبانی نمی‌کند.", exactMatch: true },
    { keywords: ["b660"], result: "مادربرد B660 اینتل برای پردازنده‌های نسل دوازدهم و سیزدهم با سوکت LGA 1700 است. گزینه‌ای مناسب برای کاربران نیمه حرفه‌ای و گیمینگ متوسط. پشتیبانی از رم DDR4 و DDR5 و امکانات خوب برای ارتقاء سیستم، اما بدون پشتیبانی اورکلاک پردازنده.", exactMatch: true },
    { keywords: ["b550"], result: "مادربرد B550 ای‌ام‌دی برای پردازنده‌های Ryzen با سوکت AM4 است. مناسب گیمرها و کاربران حرفه‌ای با پشتیبانی از PCIe 4.0 و رم DDR4. امکانات مناسبی برای اورکلاک و گیمینگ ارائه می‌دهد و گزینه‌ای اقتصادی برای سیستم‌های میان‌رده است.", exactMatch: true },
    { keywords: ["z790"], result: "مادربرد Z790 اینتل برای پردازنده‌های نسل دوازدهم و سیزدهم با سوکت LGA 1700 است. مناسب اورکلاکرها و کاربران حرفه‌ای با پشتیبانی از رم DDR4 و DDR5, PCIe 5.0 و امکانات کامل برای گیمینگ و تولید محتوا. بهترین گزینه برای سیستم‌های رده‌بالا.", exactMatch: true },

    //کارت گرافیک
    { keywords: ["rx580"], result: "کارت گرافیک AMD Radeon RX 580 با 8 گیگابایت حافظه GDDR5 مناسب بازی‌های فول‌اچ‌دی و کارهای گرافیکی متوسط است. از DirectX 12 پشتیبانی می‌کند و برای سیستم‌های میان‌رده با پاور حداقل 450 وات توصیه می‌شود.", exactMatch: true },
    { keywords: ["rtx2060"], result: "کارت گرافیک NVIDIA GeForce RTX 2060 با 6 گیگابایت حافظه GDDR6 مناسب بازی‌های فول‌اچ‌دی و ردیابی پرتو (Ray Tracing) است. برای بازی‌های متوسط و سنگین مناسب است و به پاور حداقل 500 وات نیاز دارد.", exactMatch: true },
    { keywords: ["rtx3060"], result: "کارت گرافیک NVIDIA GeForce RTX 3060 با 12 گیگابایت حافظه GDDR6 برای بازی‌های فول‌اچ‌دی و گیمینگ حرفه‌ای مناسب است. از Ray Tracing و DLSS پشتیبانی می‌کند و نیازمند پاور حداقل 550 وات است.", exactMatch: true },
    { keywords: ["rtx4060"], result: "کارت گرافیک NVIDIA GeForce RTX 4060 نسل جدید با 8 گیگابایت حافظه GDDR6 برای بازی‌های فول‌اچ‌دی و گیمینگ روان و مصرف انرژی بهینه طراحی شده است. به پاور حداقل 450 وات نیاز دارد.", exactMatch: true },
    { keywords: ["rtx4070"], result: "کارت گرافیک NVIDIA GeForce RTX 4070 با 12 گیگابایت حافظه GDDR6X مناسب بازی‌های 1440p و گیمینگ حرفه‌ای است. از Ray Tracing پیشرفته و DLSS پشتیبانی می‌کند و نیازمند پاور حداقل 650 وات است.", exactMatch: true },
    { keywords: ["rx6600"], result: "کارت گرافیک AMD Radeon RX 6600 با 8 گیگابایت حافظه GDDR6 برای بازی‌های فول‌اچ‌دی و کارهای گرافیکی مناسب است. مصرف انرژی بهینه و نیازمند پاور حداقل 450 وات می‌باشد.", exactMatch: true },

    //پاور
    { keywords: ["460"], result: "پاور 460 وات مناسب سیستم‌های میان‌رده با مصرف انرژی متوسط است. معمولاً برای سیستم‌هایی با کارت گرافیک‌های سبک و پردازنده‌های کم‌مصرف مناسب است. بهتر است از برندهای معتبر استفاده شود.", exactMatch: true },
    { keywords: ["500"], result: "پاور 500 وات برای سیستم‌های میان‌رده و گیمینگ سبک مناسب است. توان کافی برای کارت گرافیک‌هایی مثل GTX 1660 و پردازنده‌های متوسط دارد. توصیه می‌شود از پاورهای با گواهی 80 Plus استفاده شود.", exactMatch: true },
    { keywords: ["600"], result: "پاور 600 وات مناسب سیستم‌های گیمینگ متوسط تا حرفه‌ای است. قابلیت پشتیبانی از کارت گرافیک‌های قوی‌تر و پردازنده‌های چند هسته‌ای را دارد. مناسب برای استفاده از RTX 3060 یا مشابه.", exactMatch: true },
    { keywords: ["650"], result: "پاور 650 وات برای سیستم‌های حرفه‌ای و گیمینگ قوی مناسب است. توانایی تامین انرژی پایدار برای کارت‌های گرافیک قدرتمند مانند RTX 3070 و پردازنده‌های چند هسته‌ای را دارد. توصیه می‌شود با گواهی 80 Plus Gold یا بهتر.", exactMatch: true },
    { keywords: ["750"], result: "پاور 750 وات مناسب سیستم‌های رده‌بالا و اورکلاک شده است. مناسب کارت گرافیک‌های بسیار قدرتمند مانند RTX 4080 یا RTX 4090 و پردازنده‌های نسل جدید با مصرف بالا. گواهی 80 Plus Gold یا Platinum بهترین گزینه است.", exactMatch: true },

    //رم
    { keywords: ["DDR4" , "کروشیال"], result: "رم DDR4 نسل فعلی با سرعت‌های متنوع از 2133 تا 4000 مگاهرتز. مصرف انرژی کمتر نسبت به نسل قبل دارد و با اکثر مادربردهای نسل 8 تا 12 اینتل و نسل‌های قبل AMD سازگار است. گزینه‌ای مقرون به صرفه و پایدار برای بیشتر سیستم‌ها." },
    { keywords: ["DDR5" , "کروشیال"], result: "رم DDR5 نسل جدید با سرعت‌های بالاتر از 4800 مگاهرتز به بالا و بهبود پهنای باند. مصرف انرژی کمتر و تکنولوژی‌های پیشرفته‌تر دارد. با مادربردهای جدید نسل 12 و 13 اینتل و برخی پردازنده‌های AMD سازگار است. مناسب سیستم‌های رده‌بالا و آینده‌نگر." }
  ];

  let matches = [];

  // فاز اول: جستجو برای تطابق دقیق
  const exactMatches = database.filter(entry =>
    entry.exactMatch && entry.keywords.some(keyword => {
      const keywordLower = keyword.toLowerCase();
      return inputLower === keywordLower || inputLowerNoSpace === keywordLower.replace(/\s+/g, '');
    })
  );

  if (exactMatches.length > 0) {
    matches = exactMatches;
  } else {
    // فاز دوم: اگر تطابق دقیق پیدا نشد، جستجو برای شامل شدن (includes) کلمات کلیدی
    matches = database.filter(entry =>
      !entry.exactMatch && entry.keywords.some(keyword => {
        const keywordLower = keyword.toLowerCase();
        return inputLower.includes(keywordLower) || inputLowerNoSpace.includes(keywordLower.replace(/\s+/g, ''));
      })
    );

    // استثنا برای کلمه "رم"
    if (inputLower === "رم" && database.some(m => m.keywords.includes("رم") && m.exactMatch)) {
        matches = database.filter(m => m.keywords.includes("رم") && m.exactMatch);
    }
  }

  let resultHtml = "";
  if (matches.length > 0) {
    resultHtml = matches.map(entry => {
        let finalResult = entry.result;
        // جایگذاری نام کاربری در پیام‌های خوشامدگویی یا حذف Placeholder
        if (entry.result.includes("[USER_PLACEHOLDER]")) { // اگر پیام دارای Placeholder است
            if (loggedInUser) {
                finalResult = finalResult.replace("[USER_PLACEHOLDER]", loggedInUser);
            } else {
                finalResult = finalResult.replace("[USER_PLACEHOLDER]", ""); // خالی برای ناشناس
            }
        }
        return `🔹 ${finalResult}`;
    }).join("<br><br>");
  } else {
    resultHtml = "نتوانستم مشکل را شناسایی کنم. لطفاً مشکل را دقیق‌تر توضیح دهید.";
  }

  // نمایش پاسخ هوش مصنوعی با استفاده از تابع کمکی
  addMessage('bot', resultHtml);

  // پاک کردن ورودی
  problemInput.value = "";
}

// برای ارسال پیام با Enter
document.getElementById("problemInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    analyzeProblem();
  }
});

// تابع جدید برای نمایش پیام اولیه هوش مصنوعی
function displayInitialBotMessage() {
    const loggedInUser = localStorage.getItem("loggedInUser"); // دریافت نام کاربری
    let welcomeMessage;

    if (loggedInUser) {
        welcomeMessage = `سلام ${loggedInUser} عزیز! چطور می‌تونم کمکت کنم؟`;
    } else {
        welcomeMessage = `سلام! چطور می‌تونم کمکت کنم؟`; // پیام عمومی
    }
    addMessage('bot', welcomeMessage);
}

// اجرای تابع پیام اولیه هنگام بارگذاری صفحه
window.onload = function() {
    displayInitialBotMessage();
};