// ==================== المتغيرات ====================
let selectedService = null;
let userId = null;

// ==================== تحميل بيانات المستخدم ====================
function loadUserData() {
    const storedUserId = localStorage.getItem("userId");
    const storedUserName = localStorage.getItem("userName");
    
    if (storedUserId) {
        userId = storedUserId;
        const bookNameInput = document.getElementById("bookName");
        if (bookNameInput) {
            bookNameInput.value = storedUserName || "";
        }
    }
}

// ==================== اختيار الخدمة ====================
function selectService(element) {
    if (!element) return;
    
    document.querySelectorAll('.service-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    element.classList.add('selected');
    selectedService = element.innerText.trim();
    
    const subServiceBox = document.getElementById("subServiceBox");
    if (subServiceBox) subServiceBox.style.display = "block";
    
    loadSubServices(selectedService);
}

// ==================== تحميل الخدمات الفرعية ====================
function loadSubServices(service) {
    const subServiceSelect = document.getElementById("subService");
    if (!subServiceSelect) return;
    
    subServiceSelect.innerHTML = '<option value="">اختر التفاصيل...</option>';
    
    let options = [];
    
    switch(service) {
        case "🧹 تنظيف":
            options = ["تنظيف منازل", "تنظيف مكاتب", "تنظيف سجاد", "تعقيم"];
            break;
        case "🛠 صيانة":
            options = ["صيانة كهرباء", "صيانة سباكة", "صيانة أجهزة", "تشطيبات"];
            break;
        case "🏥 رعاية طبية":
            options = ["تمريض منزلي", "قياس ضغط وسكر", "رعاية مسنين", "علاج طبيعي"];
            break;
        default:
            options = [];
    }
    
    options.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt;
        option.textContent = opt;
        subServiceSelect.appendChild(option);
    });
    
    showSuggestions(service);
}

// ==================== عرض الاقتراحات ====================
function showSuggestions(service) {
    const suggestionsDiv = document.getElementById("suggestions");
    if (!suggestionsDiv) return;
    
    let suggestions = [];
    
    switch(service) {
        case "🧹 تنظيف":
            suggestions = ["🧼 يفضل إخلاء المكان قبل التنظيف", "⏰ مدة التنظيف: 2-4 ساعات"];
            break;
        case "🛠 صيانة":
            suggestions = ["🔧 يرجى تجهيز الأدوات المطلوبة", "⏰ مدة الصيانة: 1-3 ساعات"];
            break;
        case "🏥 رعاية طبية":
            suggestions = ["💊 يرجى تجهيز التقارير الطبية", "⏰ مدة الزيارة: 1-2 ساعات"];
            break;
    }
    
    const suggestionsBox = document.getElementById("suggestionsBox");
    if (suggestions.length > 0) {
        suggestionsDiv.innerHTML = suggestions.map(s => `<div class="suggestion-item">${s}</div>`).join('');
        if (suggestionsBox) suggestionsBox.style.display = "block";
    } else {
        if (suggestionsBox) suggestionsBox.style.display = "none";
    }
}

// ==================== إرسال الحجز ====================
async function submitBooking() {
    console.log("✅ زر تأكيد الحجز تم الضغط عليه");
    
    const subService = document.getElementById("subService")?.value;
    const customerName = document.getElementById("bookName")?.value;
    const customerPhone = document.getElementById("bookPhone")?.value;
    const bookingDate = document.getElementById("bookDate")?.value;
    const bookingTime = document.getElementById("bookTime")?.value;
    const address = document.getElementById("bookAddress")?.value;
    const notes = document.getElementById("bookNotes")?.value;
    
    if (!selectedService) {
        alert("❌ يرجى اختيار الخدمة أولاً");
        return;
    }
    
    if (!subService) {
        alert("❌ يرجى اختيار تفاصيل الخدمة");
        return;
    }
    
    if (!customerName || !customerPhone) {
        alert("❌ يرجى إدخال الاسم ورقم الهاتف");
        return;
    }
    
    if (!bookingDate || !bookingTime) {
        alert("❌ يرجى اختيار التاريخ والوقت");
        return;
    }
    
    const btn = document.querySelector(".btn-book");
    if (btn) {
        btn.innerHTML = "جاري الحجز...";
        btn.disabled = true;
    }
    
    const bookingData = {
        serviceName: selectedService.replace(/[🧹🛠🏥]/g, '').trim(),
        subService: subService,
        customerName: customerName,
        customerPhone: customerPhone,
        date: bookingDate,
        time: bookingTime,
        address: address || "",
        notes: notes || "",
        userId: userId || null
    };
    
    console.log("📤 جاري إرسال الحجز:", bookingData);
    
    try {
        const response = await fetch("/api/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookingData)
        });
        
        console.log("📦 استجابة السيرفر:", response.status);
        
        const data = await response.json();
        console.log("📦 بيانات الرد:", data);
        
        if (data.success) {
            console.log("✅ تم الحجز بنجاح، ID:", data.bookingId);
            const successMsg = document.getElementById("successMsg");
            if (successMsg) successMsg.style.display = "block";
            
            const form = document.getElementById("bookingForm");
            if (form) form.reset();
            
            selectedService = null;
            const subServiceBox = document.getElementById("subServiceBox");
            const dataBox = document.getElementById("dataBox");
            if (subServiceBox) subServiceBox.style.display = "none";
            if (dataBox) dataBox.style.display = "none";
            
            document.querySelectorAll('.service-card').forEach(card => {
                card.classList.remove('selected');
            });
            
            setTimeout(() => {
                if (successMsg) successMsg.style.display = "none";
            }, 5000);
        } else {
            console.error("❌ فشل الحجز:", data.message);
            alert("❌ فشل الحجز: " + data.message);
        }
    } catch (error) {
        console.error("❌ خطأ في الاتصال:", error);
        alert("❌ تعذر الاتصال بالسيرفر. تأكد من تشغيل الخادم.");
    } finally {
        if (btn) {
            btn.innerHTML = "تأكيد الحجز";
            btn.disabled = false;
        }
    }
}

// ==================== ربط الأحداث ====================
document.addEventListener("DOMContentLoaded", function() {
    console.log("✅ تم تحميل الصفحة");
    loadUserData();
    
    const subServiceSelect = document.getElementById("subService");
    if (subServiceSelect) {
        subServiceSelect.addEventListener("change", function() {
            if (this.value) {
                const dataBox = document.getElementById("dataBox");
                if (dataBox) dataBox.style.display = "block";
            }
        });
    }
    
    const successMsg = document.getElementById("successMsg");
    if (successMsg) successMsg.style.display = "none";
    
    const subServiceBox = document.getElementById("subServiceBox");
    const dataBox = document.getElementById("dataBox");
    if (subServiceBox) subServiceBox.style.display = "none";
    if (dataBox) dataBox.style.display = "none";
});

function showEmergencyMessage() {
    alert("🚨 رقم الطوارئ: 01000000000\n\nيرجى الاتصال على هذا الرقم في الحالات الطارئة");
}