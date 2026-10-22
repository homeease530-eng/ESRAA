async function signup() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const btn = document.getElementById('signupBtn');

    if (!fullName || !email || !password) return alert("يرجى ملء البيانات الأساسية");

    btn.disabled = true;
    btn.innerText = "جاري المعالجة...";

    try {
        const res = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullName, email, phone, password })
        });
        const data = await res.json();
        if (data.success) {
            alert("تم التسجيل بنجاح!");
            window.location.href = "login.html";
        } else {
            alert("خطأ: " + data.message);
        }
    } catch (err) {
        alert("تعذر الاتصال بالسيرفر");
    } finally {
        btn.disabled = false;
        btn.innerText = "إنشاء الحساب";
    }
}