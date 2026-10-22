let condition = "", service = "", userLocation = "";
let mediaRecorder, audioChunks = [];

// طلب إذن الميكروفون عند تحميل الصفحة
async function requestMicrophonePermission() {
    try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log("✅ ميكروفون مسموح");
        return true;
    } catch (error) {
        console.log("❌ ميكروفون ممنوع:", error);
        alert("يرجى السماح باستخدام الميكروفون من إعدادات المتصفح");
        return false;
    }
}

window.onload = function() {
    document.getElementById("loginSection").style.display = "block";
    document.getElementById("specialSection").style.display = "none";
    requestMicrophonePermission();
}

function login() {
    let phone = document.getElementById("phone").value;
    let pass = document.getElementById("password").value;
    if (phone && pass) {
        localStorage.setItem("specialPhone", phone);
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("specialSection").style.display = "block";
        speak("مرحباً بك، دلوقتي ممكن تختار الخدمة أو حالتك");
    } else {
        document.getElementById("loginMsg").innerText = "رجاءً املأ جميع الحقول";
    }
}

function voiceLogin() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert("المتصفح لا يدعم التعرف على الصوت");
        return;
    }
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "ar-EG";
    recognition.onresult = function(event) {
        let words = event.results[0][0].transcript.split(" ");
        document.getElementById("phone").value = words[0] || "";
        document.getElementById("password").value = words[1] || "";
        login();
    }
    recognition.start();
}

function toggleText() { 
    document.body.classList.toggle("big-text"); 
}

function toggleButtons() { 
    document.body.classList.toggle("big-buttons"); 
}

function toggleContrast() { 
    document.body.classList.toggle("high-contrast"); 
}

function speak(text) {
    let msg = new SpeechSynthesisUtterance(text);
    msg.lang = "ar-EG";
    window.speechSynthesis.speak(msg);
}

function readPage() {
    // جلب النص من الصفحة
    const pageText = document.body.innerText;
    
    // إيقاف أي كلام شغال حالياً
    window.speechSynthesis.cancel();
    
    // تشغيل الكلام الجديد
    let msg = new SpeechSynthesisUtterance(pageText);
    msg.lang = "ar-EG";
    msg.rate = 0.9;  // سرعة القراءة (أبطأ شوية عشان واضح)
    msg.pitch = 1;   // نبرة الصوت
    
    // التأكد من السماح بالصوت
    window.speechSynthesis.speak(msg);
    
    // رسالة تأكيد للمستخدم
    document.getElementById("status").innerHTML = "🔊 جاري قراءة الصفحة...";
    
    // عند الانتهاء
    msg.onend = function() {
        document.getElementById("status").innerHTML = "✅ تم الانتهاء من القراءة";
    }
}

function startVoiceControl() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert("المتصفح لا يدعم التعرف على الصوت");
        return;
    }
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "ar-EG";
    recognition.onstart = function() {
        console.log("🎤 بدأ الاستماع...");
        speak("تحدث الآن");
    }
    recognition.onresult = function(event) {
        let v = event.results[0][0].transcript;
        console.log("📝 تم التعرف على:", v);
        if (v.includes("تنظيف")) selectService("Cleaning");
        else if (v.includes("صيانة")) selectService("Maintenance");
        else if (v.includes("طبية")) selectService("Medical");
        else if (v.includes("حركة")) selectCondition(null, "حركة");
        else if (v.includes("نظر")) selectCondition(null, "نظر");
        else if (v.includes("سمع")) selectCondition(null, "سمع");
        else if (v.includes("فهم")) selectCondition(null, "فهم");
        else if (v.includes("تأكيد")) sendData();
        else alert("أمر غير معروف: " + v);
    }
    recognition.onerror = function(event) {
        console.error("❌ خطأ في التعرف:", event.error);
        alert("حدث خطأ في التعرف على الصوت");
    }
    recognition.start();
}

function selectCondition(e, c) {
    condition = c;
    document.querySelectorAll(".card-option").forEach(el => el.classList.remove("selected"));
    if (e) e.currentTarget.classList.add("selected");
    speak("تم اختيار " + c);
}

function selectService(s) {
    service = s;
    document.querySelectorAll(".btn-primary").forEach(btn => {
        btn.classList.remove("btn-success");
    });
    if (window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.add("btn-success");
    }
    speak("تم اختيار الخدمة");
}

function getLocation() {
    if (!navigator.geolocation) {
        alert("المتصفح لا يدعم تحديد الموقع");
        return;
    }
    navigator.geolocation.getCurrentPosition(pos => {
        userLocation = pos.coords.latitude + "," + pos.coords.longitude;
        speak("تم إرسال الموقع");
        document.getElementById("status").innerHTML = "✅ تم جلب موقعك: " + userLocation;
    }, () => {
        speak("لم نتمكن من جلب الموقع");
        document.getElementById("status").innerHTML = "❌ لم نتمكن من جلب موقعك";
    });
}

function startRecording() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("المتصفح لا يدعم التسجيل الصوتي");
        return;
    }
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];
            mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
            mediaRecorder.onstop = () => {
                let blob = new Blob(audioChunks, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(blob);
                const audio = new Audio(audioUrl);
                audio.play();
                speak("تم التسجيل الصوتي");
                // إغلاق المسار
                stream.getTracks().forEach(track => track.stop());
            };
            mediaRecorder.start();
            speak("بدأ التسجيل لمدة 5 ثواني");
            document.getElementById("status").innerHTML = "🎤 جاري التسجيل لمدة 5 ثواني...";
            setTimeout(() => {
                if (mediaRecorder && mediaRecorder.state === "recording") {
                    mediaRecorder.stop();
                    document.getElementById("status").innerHTML = "✅ تم التسجيل";
                }
            }, 5000);
        })
        .catch(err => {
            console.error("❌ خطأ:", err);
            speak("لا يمكن الوصول للميكروفون");
            document.getElementById("status").innerHTML = "❌ لا يمكن الوصول للميكروفون";
        });
}

function openOtherModal() {
    var modal = new bootstrap.Modal(document.getElementById('otherModal'));
    modal.show();
}

function saveOther() {
    let text = document.getElementById("otherInput").value;
    if (text) condition = text;
    bootstrap.Modal.getInstance(document.getElementById('otherModal')).hide();
    speak("تم حفظ الحالة");
    document.getElementById("status").innerHTML = "✅ تم حفظ الحالة: " + text;
}

function voiceOther() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert("المتصفح لا يدعم التعرف على الصوت");
        return;
    }
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "ar-EG";
    recognition.onresult = function(event) {
        document.getElementById("otherInput").value = event.results[0][0].transcript;
        speak("تم تسجيل الحالة");
    }
    recognition.start();
}

function sendData() {
    if (!condition || !service) {
        speak("اختر الحالة والخدمة قبل الإرسال");
        document.getElementById("status").innerHTML = "❌ اختر الحالة والخدمة أولاً";
        return;
    }
    
    let phone = localStorage.getItem("specialPhone") || document.getElementById("phone").value;
    
    let payload = {
        phone: phone,
        condition: condition,
        serviceType: service,
        location: userLocation || null,
        timestamp: new Date()
    };
    
    console.log("📤 جاري الإرسال:", payload);
    document.getElementById("status").innerHTML = "⏳ جاري الإرسال...";
    
    fetch("/api/special-needs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
        console.log("📦 رد السيرفر:", data);
        if (data.success) {
            speak("تم إرسال الطلب");
            document.getElementById("status").innerHTML = "✅ " + data.message + "<br>📍 الموقع: " + (userLocation || "غير مرسل");
            // تفريغ البيانات بعد الإرسال
            condition = "";
            service = "";
            userLocation = "";
            // إزالة التحديد من العناصر
            document.querySelectorAll(".card-option").forEach(el => el.classList.remove("selected"));
            document.querySelectorAll(".btn-primary").forEach(btn => btn.classList.remove("btn-success"));
        } else {
            speak("فشل الإرسال");
            document.getElementById("status").innerHTML = "❌ فشل الإرسال: " + (data.error || data.message);
        }
    })
    .catch(error => {
        console.error("❌ Error:", error);
        speak("حدث خطأ أثناء الإرسال");
        document.getElementById("status").innerHTML = "❌ تعذر الإرسال. تأكد من تشغيل الخادم.";
    });
}

// إضافة CSS للـ big-text, big-buttons, high-contrast
const style = document.createElement('style');
style.textContent = `
    .big-text, .big-text * { font-size: 1.5em !important; }
    .big-buttons button, .big-buttons .btn { padding: 15px 25px !important; font-size: 1.2em !important; }
    .high-contrast { background: #000 !important; color: #FF0 !important; }
    .high-contrast .card, .high-contrast .btn, .high-contrast .navbar { background: #000 !important; color: #FF0 !important; border-color: #FF0 !important; }
    .card-option { cursor: pointer; transition: 0.3s; padding: 20px; margin: 10px; text-align: center; background: white; border-radius: 15px; }
    .card-option:hover, .card-option.selected { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; transform: scale(1.05); }
    .login-box { background: white; padding: 30px; border-radius: 20px; max-width: 400px; margin: 50px auto; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
`;
document.head.appendChild(style);