
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const multer = require('multer');
// const fs = require('fs');
// const path = require('path');

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use(express.static(path.join(__dirname, 'public')));

// // Secret key for JWT
// const JWT_SECRET = 'your_super_secret_key_change_this_in_production';

// /* ==================== DB CONNECTION ==================== */
// mongoose.connect('mongodb://127.0.0.1:27017/service_system')
//   .then(() => console.log('✅ MongoDB Connected'))
//   .catch(err => console.log('❌ MongoDB Error:', err));

// /* ==================== MODELS ==================== */

// const User = mongoose.model('User', new mongoose.Schema({
//   fullName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   phone: { type: String, default: '' },
//   password: { type: String, required: true },
//   role: { type: String, default: 'customer' },
//   resetCode: { type: String, default: '' },
//   resetCodeExpires: { type: Date, default: null },
//   createdAt: { type: Date, default: Date.now }
// }));

// const Service = mongoose.model('Service', new mongoose.Schema({
//   name: String,
//   nameAr: String,
//   category: String,
//   price: Number,
//   available: { type: Boolean, default: true }
// }));

// const Booking = mongoose.model('Booking', new mongoose.Schema({
//   userId: { type: String, default: null },
//   customerName: String,
//   customerPhone: String,
//   serviceName: String,
//   subService: { type: String, default: '' },
//   date: String,
//   time: String,
//   address: { type: String, default: '' },
//   notes: { type: String, default: '' },
//   status: { type: String, default: 'pending' },
//   price: { type: Number, default: 0 },
//   discount: { type: Number, default: 0 },
//   finalPrice: { type: Number, default: 0 },
//   isUrgent: { type: Boolean, default: false },
//   urgentFee: { type: Number, default: 0 },
//   workerId: { type: String, default: null },
//   workerName: { type: String, default: '' },
//   arrivalCode: { type: String, default: '' },
//   arrivalVerified: { type: Boolean, default: false },
//   arrivalTime: { type: Date, default: null },
//   beforeImagePath: { type: String, default: '' },
//   afterImagePath: { type: String, default: '' },
//   completionCode: { type: String, default: '' },
//   completedAt: { type: Date, default: null },
//   customerConfirmation: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now }
// }));

// const Subscription = mongoose.model('Subscription', new mongoose.Schema({
//   userId: String,
//   packageType: { type: String, enum: ['bronze', 'silver', 'gold'] },
//   packageDuration: { type: String, enum: ['monthly', 'annual'] },
//   price: Number,
//   startDate: { type: Date, default: Date.now },
//   endDate: Date,
//   status: { type: String, default: 'active' },
//   createdAt: { type: Date, default: Date.now }
// }));

// const Payment = mongoose.model('Payment', new mongoose.Schema({
//   userId: String,
//   bookingId: String,
//   subscriptionId: String,
//   amount: Number,
//   paymentMethod: String,
//   cardHolderName: String,
//   cardNumber: String,
//   expiryDate: String,
//   cvv: String,
//   status: { type: String, default: 'pending' },
//   createdAt: { type: Date, default: Date.now }
// }));

// const Discount = mongoose.model('Discount', new mongoose.Schema({
//   name: String,
//   nameAr: String,
//   type: String,
//   percentage: Number,
//   applicableFor: String,
//   description: String,
//   descriptionAr: String,
//   active: { type: Boolean, default: true }
// }));

// const Contact = mongoose.model('Contact', new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   service: { type: String, required: true },
//   message: { type: String, required: true },
//   status: { type: String, default: 'pending' },
//   createdAt: { type: Date, default: Date.now }
// }));

// const Complaint = mongoose.model('Complaint', new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   type: { type: String, required: true },
//   details: { type: String, required: true },
//   status: { type: String, default: 'pending' },
//   createdAt: { type: Date, default: Date.now }
// }));

// const SpecialNeed = mongoose.model('SpecialNeed', new mongoose.Schema({
//   userId: { type: String, default: null },
//   phone: { type: String, required: true },
//   condition: { type: String, required: true },
//   otherCondition: { type: String, default: '' },
//   serviceType: { type: String, required: true },
//   location: {
//     lat: { type: Number, default: null },
//     lng: { type: Number, default: null },
//     address: { type: String, default: '' }
//   },
//   voiceNote: { type: String, default: '' },
//   status: { type: String, default: 'pending' },
//   createdAt: { type: Date, default: Date.now }
// }));

// const QuickBooking = mongoose.model('QuickBooking', new mongoose.Schema({
//   name: { type: String, required: true },
//   phone: { type: String, required: true },
//   service: { type: String, required: true },
//   source: { type: String, default: 'homepage' },
//   status: { type: String, default: 'pending' },
//   createdAt: { type: Date, default: Date.now }
// }));

// const DiscountOffer = mongoose.model('DiscountOffer', new mongoose.Schema({
//   name: { type: String, required: true },
//   nameAr: { type: String, required: true },
//   description: { type: String, required: true },
//   descriptionAr: { type: String, required: true },
//   type: { type: String, enum: ['percentage', 'fixed'], default: 'percentage' },
//   value: { type: Number, required: true },
//   applicableFor: { type: String, enum: ['seniors', 'special-needs', 'annual', 'all'], default: 'all' },
//   minAge: { type: Number, default: null },
//   startDate: { type: Date, default: Date.now },
//   endDate: Date,
//   isActive: { type: Boolean, default: true },
//   createdAt: { type: Date, default: Date.now }
// }));

// const JobApplication = mongoose.model('JobApplication', new mongoose.Schema({
//   fullName: { type: String, required: true },
//   dob: { type: Date, required: true },
//   gender: { type: String, required: true },
//   phone: { type: String, required: true },
//   email: { type: String, default: '' },
//   address: { type: String, required: true },
//   qualification: { type: String, default: '' },
//   experience: { type: Number, default: 0 },
//   certificates: { type: String, default: '' },
//   skills: { type: String, default: '' },
//   serviceType: { type: String, required: true },
//   availability: { type: String, required: true },
//   criminalRecordPath: { type: String, required: true },
//   location: {
//     lat: { type: Number, required: true },
//     lng: { type: Number, required: true },
//     address: { type: String, default: '' }
//   },
//   notes: { type: String, default: '' },
//   status: { type: String, default: 'pending' },
//   createdAt: { type: Date, default: Date.now }
// }));

// const Worker = mongoose.model('Worker', new mongoose.Schema({
//   name: { type: String, required: true },
//   job: { type: String, required: true },
//   salary: { type: Number, required: true, default: 3000 },
//   image: { type: String, default: '' },
//   status: { type: String, enum: ['available', 'busy', 'vacation'], default: 'available' },
//   phone: { type: String, default: '' },
//   experience: { type: Number, default: 0 },
//   location: {
//     lat: { type: Number, default: null },
//     lng: { type: Number, default: null },
//     address: { type: String, default: '' }
//   },
//   createdAt: { type: Date, default: Date.now }
// }));

// const EmergencyCall = mongoose.model('EmergencyCall', new mongoose.Schema({
//   userId: { type: String, default: null },
//   phone: { type: String, default: '01000000000' },
//   callType: { type: String, enum: ['phone', 'whatsapp'], default: 'phone' },
//   timestamp: { type: Date, default: Date.now },
//   ip: { type: String, default: '' }
// }));

// /* ==================== KAFR EL-SHEIKH LOCATIONS ==================== */

// const kafrLocations = {
//   centers: [
//     { id: 'kafr-sheikh', name: 'مركز كفر الشيخ', nameAr: 'مركز كفر الشيخ', lat: 31.1119, lng: 30.9400 },
//     { id: 'desouk', name: 'دسوق', nameAr: 'مركز دسوق', lat: 31.1326, lng: 30.6474 },
//     { id: 'fowa', name: 'فوة', nameAr: 'مركز فوة', lat: 31.2050, lng: 30.5500 },
//     { id: 'metoubes', name: 'مطوبس', nameAr: 'مركز مطوبس', lat: 31.3500, lng: 30.5200 },
//     { id: 'belqas', name: 'بلقاس', nameAr: 'مركز بلقاس', lat: 31.2167, lng: 31.3667 },
//     { id: 'el-hamoul', name: 'الحامول', nameAr: 'مركز الحامول', lat: 31.3100, lng: 30.9800 },
//     { id: 'sidi-salem', name: 'سيدي سالم', nameAr: 'مركز سيدي سالم', lat: 31.2667, lng: 30.7833 },
//     { id: 'qallin', name: 'قلين', nameAr: 'مركز قلين', lat: 31.0500, lng: 30.8667 }
//   ],
//   villages: [
//     { name: 'أبو طويلة', center: 'kafr-sheikh' },
//     { name: 'أبو حامد', center: 'kafr-sheikh' },
//     { name: 'الروينة', center: 'kafr-sheikh' },
//     { name: 'الغريب', center: 'kafr-sheikh' },
//     { name: 'برية', center: 'kafr-sheikh' },
//     { name: 'ميت علوان', center: 'kafr-sheikh' },
//     { name: 'شالما', center: 'kafr-sheikh' },
//     { name: 'محلة موسي', center: 'kafr-sheikh' },
//     { name: 'أبو شوشة', center: 'desouk' },
//     { name: 'ميت خاقان', center: 'desouk' },
//     { name: 'شابة', center: 'fowa' },
//     { name: 'الزعفران', center: 'metoubes' },
//     { name: 'البرتقالة', center: 'el-hamoul' },
//     { name: 'الغربية', center: 'sidi-salem' },
//     { name: 'كفر الشيخ إبراهيم', center: 'qallin' }
//   ]
// };

// /* ==================== HELPERS ==================== */

// // دالة إرسال كود الوصول للعميل (محاكاة)
// async function sendArrivalCodeToCustomer(phone, bookingId, code) {
//   console.log(`📱 =====================================`);
//   console.log(`📱 تم إرسال كود الوصول للعميل ${phone}`);
//   console.log(`📱 رقم الحجز: ${bookingId}`);
//   console.log(`📱 كود الوصول: ${code}`);
//   console.log(`📱 =====================================`);
//   return true;
// }

// // دالة تحويل نوع الخدمة إلى مسمى وظيفي
// function getJobTitleFromService(serviceType) {
//   const jobTitles = {
//     'cleaning': 'عامل نظافة',
//     'maintenance': 'فني صيانة',
//     'medical': 'ممرض / رعاية صحية',
//     'special': 'أخصائي دعم ذوي الاحتياجات الخاصة',
//     'special-needs': 'أخصائي دعم ذوي الاحتياجات الخاصة'
//   };
//   return jobTitles[serviceType] || 'عامل';
// }

// /* ==================== EMERGENCY CONTACT ==================== */

// app.post('/api/emergency-contact', async (req, res) => {
//   try {
//     const { userId, callType } = req.body;
//     const clientIp = req.ip || req.connection?.remoteAddress || '';
    
//     const emergency = new EmergencyCall({
//       userId: userId || null,
//       callType: callType || 'phone',
//       ip: clientIp
//     });
    
//     await emergency.save();
//     res.json({ success: true, message: 'تم تسجيل محاولة الاتصال' });
//   } catch (error) {
//     res.json({ success: false, error: error.message });
//   }
// });

// /* ==================== JOB APPLICATIONS UPLOAD SETUP ==================== */

// const uploadDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const cleanName = file.originalname.replace(/[^a-zA-Z0-9.\u0600-\u06FF]/g, '_');
//     cb(null, file.fieldname + '-' + uniqueSuffix + '-' + cleanName);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('نوع الملف غير مدعوم. يرجى رفع صور أو PDF فقط'), false);
//   }
// };

// const upload = multer({ 
//   storage: storage,
//   limits: { 
//     fileSize: 50 * 1024 * 1024,
//     files: 5
//   },
//   fileFilter: fileFilter
// });

// /* ==================== SERVE FILES ==================== */
// app.get('/uploads/:filename', (req, res) => {
//   const filepath = path.join(__dirname, 'uploads', req.params.filename);
//   if (fs.existsSync(filepath)) {
//     res.sendFile(filepath);
//   } else {
//     res.status(404).json({ error: 'الملف غير موجود' });
//   }
// });

// /* ==================== LOCATIONS API ==================== */

// app.get('/api/locations/centers', (req, res) => {
//   res.json({ success: true, centers: kafrLocations.centers });
// });

// app.get('/api/locations/villages/:centerId', (req, res) => {
//   const { centerId } = req.params;
//   const villages = kafrLocations.villages.filter(v => v.center === centerId);
//   res.json({ success: true, villages });
// });

// app.get('/api/locations/search', (req, res) => {
//   const { q } = req.query;
//   if (!q || q.length < 2) {
//     return res.json({ success: true, results: [] });
//   }
  
//   const results = [];
  
//   kafrLocations.centers.forEach(center => {
//     if (center.nameAr.includes(q) || center.name.includes(q)) {
//       results.push({
//         type: 'center',
//         id: center.id,
//         name: center.nameAr,
//         lat: center.lat,
//         lng: center.lng
//       });
//     }
//   });
  
//   kafrLocations.villages.forEach(village => {
//     if (village.name.includes(q)) {
//       const center = kafrLocations.centers.find(c => c.id === village.center);
//       results.push({
//         type: 'village',
//         name: village.name,
//         centerName: center?.nameAr,
//         lat: center?.lat,
//         lng: center?.lng
//       });
//     }
//   });
  
//   res.json({ success: true, results: results.slice(0, 10) });
// });

// /* ==================== AUTH ==================== */

// app.post('/api/auth/register', async (req, res) => {
//   try {
//     const { fullName, email, phone, password } = req.body;

//     if (!fullName || !email || !password) {
//       return res.json({ success: false, message: 'الاسم والبريد وكلمة المرور مطلوبة' });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.json({ success: false, message: 'البريد الإلكتروني مستخدم بالفعل' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({ 
//       fullName, 
//       email, 
//       phone: phone || '', 
//       password: hashedPassword,
//       role: 'customer'
//     });
    
//     await user.save();

//     const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

//     res.json({ success: true, message: 'تم إنشاء الحساب بنجاح', userId: user._id, token });

//   } catch (error) {
//     console.error('❌ خطأ في التسجيل:', error);
//     res.json({ success: false, message: 'حدث خطأ: ' + error.message });
//   }
// });

// app.post('/api/auth/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.json({ success: false, message: 'المستخدم غير موجود' });
//     }

//     const isValid = await bcrypt.compare(password, user.password);
//     if (!isValid) {
//       return res.json({ success: false, message: 'كلمة المرور خطأ' });
//     }

//     const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

//     res.json({
//       success: true,
//       message: 'تم تسجيل الدخول بنجاح',
//       token,
//       user: {
//         id: user._id,
//         fullName: user.fullName,
//         email: user.email,
//         phone: user.phone,
//         role: user.role
//       }
//     });

//   } catch (error) {
//     console.error('❌ خطأ في تسجيل الدخول:', error);
//     res.json({ success: false, message: 'حدث خطأ: ' + error.message });
//   }
// });

// /* ==================== FORGOT & RESET PASSWORD ==================== */

// app.post('/api/auth/forgot-password', async (req, res) => {
//   try {
//     const { email } = req.body;
    
//     if (!email) {
//       return res.json({ success: false, message: 'البريد الإلكتروني مطلوب' });
//     }
    
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.json({ success: false, message: 'لا يوجد حساب بهذا البريد الإلكتروني' });
//     }
    
//     const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    
//     user.resetCode = resetCode;
//     user.resetCodeExpires = new Date(Date.now() + 3600000);
//     await user.save();
    
//     console.log(`🔐 كود إعادة تعيين كلمة المرور لـ ${email}: ${resetCode}`);
    
//     res.json({ success: true, message: 'تم إرسال كود إعادة التعيين إلى بريدك الإلكتروني', resetCode });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// });

// app.post('/api/auth/reset-password', async (req, res) => {
//   try {
//     const { email, code, newPassword } = req.body;
    
//     if (!email || !code || !newPassword) {
//       return res.json({ success: false, message: 'جميع الحقول مطلوبة' });
//     }
    
//     if (newPassword.length < 6) {
//       return res.json({ success: false, message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' });
//     }
    
//     const user = await User.findOne({ 
//       email: email,
//       resetCode: code,
//       resetCodeExpires: { $gt: new Date() }
//     });
    
//     if (!user) {
//       return res.json({ success: false, message: 'الكود غير صالح أو انتهت صلاحيته' });
//     }
    
//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     user.password = hashedPassword;
//     user.resetCode = '';
//     user.resetCodeExpires = null;
//     await user.save();
    
//     res.json({ success: true, message: 'تم إعادة تعيين كلمة المرور بنجاح' });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// });

// const verifyToken = (req, res, next) => {
//   const token = req.headers['authorization'];
//   if (!token) {
//     return res.json({ success: false, message: 'غير مصرح، يرجى تسجيل الدخول' });
//   }

//   try {
//     const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
//     req.userId = decoded.userId;
//     req.userRole = decoded.role;
//     next();
//   } catch (error) {
//     return res.json({ success: false, message: 'توكن غير صالح' });
//   }
// };

// const verifyAdmin = (req, res, next) => {
//   if (req.userRole !== 'admin') {
//     return res.json({ success: false, message: 'غير مصرح، هذه الخاصية للمشرف فقط' });
//   }
//   next();
// };

// app.get('/api/auth/me', verifyToken, async (req, res) => {
//   try {
//     const user = await User.findById(req.userId).select('-password');
//     res.json({ success: true, user });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// });

// /* ==================== SERVICES ==================== */

// app.get('/api/services', async (req, res) => {
//   try {
//     let services = await Service.find();

//     if (services.length === 0) {
//       const defaultServices = [
//         { name: 'cleaning', nameAr: 'تنظيف', category: 'cleaning', price: 250, available: true },
//         { name: 'maintenance', nameAr: 'صيانة', category: 'maintenance', price: 200, available: true },
//         { name: 'medical-care', nameAr: 'رعاية طبية', category: 'medical', price: 300, available: true },
//         { name: 'special-needs', nameAr: 'دعم ذوي الاحتياجات الخاصة', category: 'special', price: 350, available: true }
//       ];

//       await Service.insertMany(defaultServices);
//       services = await Service.find();
//     }

//     res.json({ success: true, services });

//   } catch (error) {
//     console.error('❌ خطأ:', error);
//     res.json({ success: false, message: error.message });
//   }
// });

// /* ==================== CONTACT ==================== */

// app.post('/api/contact', async (req, res) => {
//   try {
//     const { name, email, service, message } = req.body;
    
//     if (!name || !email || !service || !message) {
//       return res.json({ success: false, error: 'جميع الحقول مطلوبة' });
//     }
    
//     const contact = new Contact({
//       name,
//       email,
//       service,
//       message,
//       status: 'pending'
//     });
    
//     await contact.save();
    
//     res.json({ success: true, message: 'تم إرسال رسالتك بنجاح' });
//   } catch (error) {
//     console.error('❌ خطأ:', error);
//     res.json({ success: false, error: error.message });
//   }
// });

// app.get('/api/contacts', async (req, res) => {
//   try {
//     const contacts = await Contact.find().sort({ createdAt: -1 });
//     res.json({ success: true, contacts });
//   } catch (error) {
//     res.json({ success: false, error: error.message });
//   }
// });

// /* ==================== COMPLAINTS ==================== */

// app.post('/api/complaints', async (req, res) => {
//   try {
//     const { name, email, type, details } = req.body;
    
//     console.log("📝 استلام شكوى جديدة:", { name, email, type });
    
//     if (!name || !email || !type || !details) {
//       return res.json({ success: false, error: 'جميع الحقول مطلوبة' });
//     }
    
//     const complaint = new Complaint({
//       name,
//       email,
//       type,
//       details,
//       status: 'pending'
//     });
    
//     await complaint.save();
    
//     res.json({ success: true, message: 'تم إرسال الشكوى بنجاح' });
//   } catch (error) {
//     console.error('❌ خطأ:', error);
//     res.json({ success: false, error: error.message });
//   }
// });

// app.get('/api/complaints', async (req, res) => {
//   try {
//     const complaints = await Complaint.find().sort({ createdAt: -1 });
//     res.json({ success: true, complaints });
//   } catch (error) {
//     res.json({ success: false, error: error.message });
//   }
// });

// /* ==================== SPECIAL NEEDS ==================== */

// app.post('/api/special-needs', async (req, res) => {
//   try {
//     const { userId, phone, condition, otherCondition, serviceType, location, voiceNote } = req.body;
    
//     console.log("📝 استلام طلب خاص:", { phone, condition, serviceType });
    
//     if (!phone || !condition || !serviceType) {
//       return res.json({ success: false, error: 'رقم الهاتف ونوع الإعاقة ونوع الخدمة مطلوبة' });
//     }
    
//     const specialNeed = new SpecialNeed({
//       userId: userId || null,
//       phone,
//       condition,
//       otherCondition: otherCondition || '',
//       serviceType,
//       location: location || { lat: null, lng: null, address: '' },
//       voiceNote: voiceNote || '',
//       status: 'pending'
//     });
    
//     await specialNeed.save();
    
//     res.json({ success: true, message: 'تم إرسال طلبك بنجاح، سيتم التواصل معك قريباً' });
//   } catch (error) {
//     console.error('❌ خطأ:', error);
//     res.json({ success: false, error: error.message });
//   }
// });

// app.get('/api/special-needs', async (req, res) => {
//   try {
//     const requests = await SpecialNeed.find().sort({ createdAt: -1 });
//     res.json({ success: true, requests });
//   } catch (error) {
//     console.error('❌ خطأ:', error);
//     res.json({ success: false, error: error.message });
//   }
// });

// app.get('/api/special-needs/:userId', async (req, res) => {
//   try {
//     const requests = await SpecialNeed.find({ userId: req.params.userId }).sort({ createdAt: -1 });
//     res.json({ success: true, requests });
//   } catch (error) {
//     res.json({ success: false, error: error.message });
//   }
// });

// /* ==================== QUICK BOOKING ==================== */

// app.post('/api/quick-booking', async (req, res) => {
//   try {
//     const { name, phone, service, source } = req.body;
    
//     console.log("📝 استلام طلب سريع:", { name, phone, service });
    
//     if (!name || !phone || !service) {
//       return res.json({ success: false, error: 'جميع الحقول مطلوبة' });
//     }
    
//     const booking = new QuickBooking({ 
//       name, 
//       phone, 
//       service, 
//       source: source || 'homepage' 
//     });
    
//     await booking.save();
    
//     res.json({ success: true, message: 'تم إرسال طلبك بنجاح' });
//   } catch (error) {
//     console.error('❌ خطأ:', error);
//     res.json({ success: false, error: error.message });
//   }
// });

// /* ==================== DISCOUNTS & SUBSCRIPTIONS ==================== */

// app.get('/api/discounts', async (req, res) => {
//   try {
//     const discounts = await DiscountOffer.find({ isActive: true, endDate: { $gte: new Date() } });
//     res.json({ success: true, discounts });
//   } catch (error) {
//     res.json({ success: false, error: error.message });
//   }
// });

// app.get('/api/discounts/:type', async (req, res) => {
//   try {
//     const discount = await DiscountOffer.findOne({ applicableFor: req.params.type, isActive: true });
//     res.json({ success: true, discount });
//   } catch (error) {
//     res.json({ success: false, error: error.message });
//   }
// });

// app.post('/api/subscriptions', async (req, res) => {
//   try {
//     const { userId, packageName, amount, duration } = req.body;
    
//     if (!packageName || !amount) {
//       return res.json({ success: false, error: 'بيانات ناقصة' });
//     }
    
//     const endDate = new Date();
//     if (duration === 'monthly') {
//       endDate.setMonth(endDate.getMonth() + 1);
//     } else {
//       endDate.setFullYear(endDate.getFullYear() + 1);
//     }
    
//     const subscription = new Subscription({
//       userId: userId || null,
//       packageType: packageName,
//       packageDuration: duration,
//       price: amount,
//       startDate: new Date(),
//       endDate: endDate,
//       status: 'active'
//     });
    
//     await subscription.save();
    
//     res.json({ success: true, message: 'تم الاشتراك بنجاح', subscriptionId: subscription._id });
//   } catch (error) {
//     console.error('❌ خطأ:', error);
//     res.json({ success: false, error: error.message });
//   }
// });

// app.get('/api/subscriptions/:userId', async (req, res) => {
//   try {
//     const subscriptions = await Subscription.find({ userId: req.params.userId }).sort({ createdAt: -1 });
//     res.json({ success: true, subscriptions });
//   } catch (error) {
//     res.json({ success: false, error: error.message });
//   }
// });

// /* ==================== JOB APPLICATIONS ==================== */

// app.post('/api/job-applications', upload.fields([
//   { name: 'criminalRecord', maxCount: 1 }
// ]), async (req, res) => {
//   try {
//     const { 
//       fullName, dob, gender, phone, email, address, 
//       qualification, experience, certificates, skills, 
//       serviceType, availability, notes,
//       locationLat, locationLng, locationAddress
//     } = req.body;
    
//     const files = req.files;
    
//     console.log("📝 استلام طلب توظيف:", { fullName, phone, serviceType, experience });
    
//     if (!fullName || !phone || !address || !serviceType || !availability || !experience) {
//       return res.json({ success: false, error: 'جميع الحقول المطلوبة يجب تعبئتها' });
//     }
    
//     if (!files || !files.criminalRecord) {
//       return res.json({ success: false, error: 'يرجى رفع الفيش الجنائي' });
//     }
    
//     if (!locationLat || !locationLng) {
//       return res.json({ success: false, error: 'يرجى تحديد موقعك على الخريطة' });
//     }
    
//     const application = new JobApplication({
//       fullName,
//       dob: new Date(dob),
//       gender,
//       phone,
//       email: email || '',
//       address,
//       qualification: qualification || '',
//       experience: Number(experience),
//       certificates: certificates || '',
//       skills: skills || '',
//       serviceType,
//       availability,
//       criminalRecordPath: 'uploads/' + files.criminalRecord[0].filename,
//       location: {
//         lat: Number(locationLat),
//         lng: Number(locationLng),
//         address: locationAddress || ''
//       },
//       notes: notes || '',
//       status: 'pending'
//     });
    
//     await application.save();
    
//     res.json({ success: true, message: 'تم تقديم طلبك بنجاح' });
//   } catch (error) {
//     console.error('❌ خطأ:', error);
//     res.json({ success: false, error: error.message });
//   }
// });

// app.get('/api/job-applications', verifyToken, verifyAdmin, async (req, res) => {
//   try {
//     const applications = await JobApplication.find().sort({ createdAt: -1 });
//     res.json({ success: true, applications });
//   } catch (error) {
//     res.json({ success: false, error: error.message });
//   }
// });

// /* ==================== USERS (ADMIN) ==================== */

// app.get('/api/users', verifyToken, verifyAdmin, async (req, res) => {
//   try {
//     const users = await User.find().select('-password');
//     res.json({ success: true, users });
//   } catch (error) {
//     res.json({ success: false, error: error.message });
//   }
// });

// /* ==================== WORKERS ROUTES ==================== */

// app.get('/api/workers', verifyToken, verifyAdmin, async (req, res) => {
//   try {
//     const workers = await Worker.find().sort({ createdAt: -1 });
//     res.json({ success: true, workers });
//   } catch (error) {
//     res.json({ success: false, error: error.message });
//   }
// });

// app.get('/api/workers/:id', verifyToken, verifyAdmin, async (req, res) => {
//   try {
//     const worker = await Worker.findById(req.params.id);
//     if (!worker) return res.json({ success: false, error: 'العامل غير موجود' });
//     res.json({ success: true, worker });
//   } catch (error) {
//     res.json({ success: false, error: error.message });
//   }
// });

// app.post('/api/workers', verifyToken, verifyAdmin, async (req, res) => {
//   try {
//     const { name, job, salary, image, status, phone, experience, location } = req.body;
//     if (!name || !job || !salary) {
//       return res.json({ success: false, error: 'الاسم والتخصص والراتب مطلوبة' });
//     }
//     const worker = new Worker({ name, job, salary, image, status, phone, experience, location });
//     await worker.save();
//     res.json({ success: true, worker });
//   } catch (error) {
//     res.json({ success: false, error: error.message });
//   }
// });

// app.put('/api/workers/:id', verifyToken, verifyAdmin, async (req, res) => {
//   try {
//     const { name, job, salary, image, status, phone, experience, location } = req.body;
//     const worker = await Worker.findByIdAndUpdate(req.params.id, 
//       { name, job, salary, image, status, phone, experience, location }, 
//       { new: true }
//     );
//     if (!worker) return res.json({ success: false, error: 'العامل غير موجود' });
//     res.json({ success: true, worker });
//   } catch (error) {
//     res.json({ success: false, error: error.message });
//   }
// });

// app.delete('/api/workers/:id', verifyToken, verifyAdmin, async (req, res) => {
//   try {
//     const worker = await Worker.findByIdAndDelete(req.params.id);
//     if (!worker) return res.json({ success: false, error: 'العامل غير موجود' });
//     res.json({ success: true });
//   } catch (error) {
//     res.json({ success: false, error: error.message });
//   }
// });

// /* ==================== WORKER AUTH & DASHBOARD ==================== */

// app.post('/api/worker/login', async (req, res) => {
//   try {
//     const { phone } = req.body;
    
//     if (!phone) {
//       return res.json({ success: false, message: 'رقم الهاتف مطلوب' });
//     }
    
//     const worker = await Worker.findOne({ phone: phone });
//     if (!worker) {
//       return res.json({ success: false, message: 'لا يوجد عامل بهذا الرقم' });
//     }
    
//     const token = jwt.sign({ 
//       workerId: worker._id, 
//       name: worker.name, 
//       role: 'worker' 
//     }, JWT_SECRET, { expiresIn: '7d' });
    
//     res.json({
//       success: true,
//       message: 'تم تسجيل الدخول بنجاح',
//       token,
//       worker: {
//         id: worker._id,
//         name: worker.name,
//         job: worker.job,
//         phone: worker.phone,
//         status: worker.status
//       }
//     });
//   } catch (error) {
//     res.json({ success: false, error: error.message });
//   }
// });

// const verifyWorker = (req, res, next) => {
//   const token = req.headers['authorization'];
//   if (!token) {
//     return res.json({ success: false, message: 'غير مصرح، يرجى تسجيل الدخول' });
//   }

//   try {
//     const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
//     if (decoded.role !== 'worker') {
//       return res.json({ success: false, message: 'غير مصرح، هذه الخاصية للعمال فقط' });
//     }
//     req.workerId = decoded.workerId;
//     req.workerName = decoded.name;
//     next();
//   } catch (error) {
//     return res.json({ success: false, message: 'توكن غير صالح' });
//   }
// };

// app.get('/api/worker/bookings', verifyWorker, async (req, res) => {
//   try {
//     const workerId = req.workerId;
    
//     const activeBookings = await Booking.find({ 
//       workerId: workerId,
//       status: { $in: ['assigned', 'pending'] }
//     }).sort({ date: 1, time: 1 });
    
//     const completedBookings = await Booking.find({ 
//       workerId: workerId,
//       status: 'completed'
//     }).sort({ createdAt: -1 }).limit(10);
    
//     res.json({
//       success: true,
//       activeBookings,
//       completedBookings
//     });
//   } catch (error) {
//     res.json({ success: false, error: error.message });
//   }
// });

// app.get('/api/worker/stats', verifyWorker, async (req, res) => {
//   try {
//     const workerId = req.workerId;
    
//     const totalBookings = await Booking.countDocuments({ workerId: workerId });
//     const completedBookings = await Booking.countDocuments({ workerId: workerId, status: 'completed' });
//     const pendingBookings = await Booking.countDocuments({ workerId: workerId, status: 'assigned' });
    
//     res.json({
//       success: true,
//       stats: {
//         total: totalBookings,
//         completed: completedBookings,
//         pending: pendingBookings
//       }
//     });
//   } catch (error) {
//     res.json({ success: false, error: error.message });
//   }
// });

// /* ==================== SERVICE VERIFICATION ROUTES ==================== */

// // العامل يؤكد وصوله باستخدام الكود اللي أخده من العميل
// app.post('/api/worker/confirm-arrival', verifyWorker, async (req, res) => {
//   try {
//     const { bookingId, code } = req.body;
//     const workerId = req.workerId;
    
//     const booking = await Booking.findOne({ _id: bookingId, workerId: workerId });
//     if (!booking) {
//       return res.json({ success: false, message: 'الحجز غير موجود أو لا يخصك' });
//     }
    
//     if (booking.arrivalVerified) {
//       return res.json({ success: false, message: 'تم تأكيد الوصول مسبقاً' });
//     }
    
//     if (booking.arrivalCode !== code) {
//       return res.json({ success: false, message: 'الكود غير صحيح' });
//     }
    
//     booking.arrivalVerified = true;
//     booking.arrivalTime = new Date();
//     await booking.save();
    
//     res.json({ 
//       success: true, 
//       message: 'تم تأكيد وصولك للخدمة',
//       arrivalTime: booking.arrivalTime
//     });
//   } catch (error) {
//     res.json({ success: false, error: error.message });
//   }
// });

// // رفع صورة قبل الخدمة
// app.post('/api/worker/upload-before-image/:bookingId', verifyWorker, upload.single('beforeImage'), async (req, res) => {
//   try {
//     const { bookingId } = req.params;
//     const workerId = req.workerId;
    
//     const booking = await Booking.findOne({ _id: bookingId, workerId: workerId });
//     if (!booking) {
//       return res.json({ success: false, message: 'الحجز غير موجود أو لا يخصك' });
//     }
    
//     if (!req.file) {
//       return res.json({ success: false, message: 'يرجى رفع الصورة' });
//     }
    
//     booking.beforeImagePath = 'uploads/' + req.file.filename;
//     await booking.save();
    
//     res.json({ 
//       success: true, 
//       message: 'تم رفع الصورة قبل الخدمة',
//       imagePath: booking.beforeImagePath
//     });
//   } catch (error) {
//     res.json({ success: false, error: error.message });
//   }
// });

// // رفع صورة بعد الخدمة
// app.post('/api/worker/upload-after-image/:bookingId', verifyWorker, upload.single('afterImage'), async (req, res) => {
//   try {
//     const { bookingId } = req.params;
//     const workerId = req.workerId;
    
//     const booking = await Booking.findOne({ _id: bookingId, workerId: workerId });
//     if (!booking) {
//       return res.json({ success: false, message: 'الحجز غير موجود أو لا يخصك' });
//     }
    
//     if (!req.file) {
//       return res.json({ success: false, message: 'يرجى رفع الصورة' });
//     }
    
//     booking.afterImagePath = 'uploads/' + req.file.filename;
//     await booking.save();
    
//     res.json({ 
//       success: true, 
//       message: 'تم رفع الصورة بعد الخدمة',
//       imagePath: booking.afterImagePath
//     });
//   } catch (error) {
//     res.json({ success: false, error: error.message });
//   }
// });

// // العامل يطلب كود الإتمام
// app.post('/api/worker/request-completion-code/:bookingId', verifyWorker, async (req, res) => {
//   try {
//     const { bookingId } = req.params;
//     const workerId = req.workerId;
    
//     const booking = await Booking.findOne({ _id: bookingId, workerId: workerId });
//     if (!booking) {
//       return res.json({ success: false, message: 'الحجز غير موجود أو لا يخصك' });
//     }
    
//     if (!booking.arrivalVerified) {
//       return res.json({ success: false, message: 'لم يتم تأكيد وصولك بعد' });
//     }
    
//     const completionCode = Math.floor(100000 + Math.random() * 900000).toString();
//     booking.completionCode = completionCode;
//     await booking.save();
    
//     res.json({ 
//       success: true, 
//       message: 'تم إنشاء كود الإتمام',
//       completionCode: completionCode
//     });
//   } catch (error) {
//     res.json({ success: false, error: error.message });
//   }
// });

// // ✅ العميل يؤكد إتمام الخدمة (مع تغيير حالة العامل تلقائياً)
// app.post('/api/customer/confirm-completion', async (req, res) => {
//   try {
//     const { bookingId, code, customerPhone } = req.body;
    
//     const booking = await Booking.findOne({ _id: bookingId });
//     if (!booking) {
//       return res.json({ success: false, message: 'الحجز غير موجود' });
//     }
    
//     if (booking.customerPhone !== customerPhone) {
//       return res.json({ success: false, message: 'رقم الهاتف غير صحيح' });
//     }
    
//     if (booking.completionCode !== code) {
//       return res.json({ success: false, message: 'الكود غير صحيح' });
//     }
    
//     if (booking.status === 'completed') {
//       return res.json({ success: false, message: 'الخدمة مكتملة بالفعل' });
//     }
    
//     // تحديث الحجز
//     booking.customerConfirmation = true;
//     booking.status = 'completed';
//     booking.completedAt = new Date();
//     await booking.save();
    
//     // ✅✅✅ تغيير حالة العامل إلى available تلقائياً ✅✅✅
//     if (booking.workerId) {
//       const worker = await Worker.findById(booking.workerId);
//       if (worker) {
//         worker.status = 'available';
//         await worker.save();
//         console.log(`✅ العامل ${worker.name} أصبح متاحاً تلقائياً بعد تأكيد العميل`);
//       }
//     }
    
//     res.json({ 
//       success: true, 
//       message: 'تم تأكيد إتمام الخدمة بنجاح',
//       completedAt: booking.completedAt
//     });
    
//   } catch (error) {
//     console.error('❌ خطأ:', error);
//     res.json({ success: false, error: error.message });
//   }
// });

// /* ==================== GET AVAILABLE WORKERS FOR CUSTOMER ==================== */

// app.get('/api/available-workers/:serviceType', async (req, res) => {
//   try {
//     const { serviceType } = req.params;
    
//     const jobMap = {
//       'cleaning': 'عامل نظافة',
//       'maintenance': 'فني صيانة',
//       'medical': 'ممرض / رعاية صحية',
//       'special-needs': 'أخصائي دعم ذوي الاحتياجات الخاصة'
//     };
    
//     const jobTitle = jobMap[serviceType] || 'عامل';
    
//     const workers = await Worker.find({ 
//       status: 'available',
//       job: jobTitle
//     }).select('name job experience phone location image status');
    
//     res.json({ success: true, workers });
//   } catch (error) {
//     res.json({ success: false, error: error.message });
//   }
// });

// // حجز مع تعيين عامل محدد (مع إنشاء كود وصول تلقائي)
// app.post('/api/book-with-worker', async (req, res) => {
//   try {
//     const { 
//       userId, serviceName, subService, customerName, 
//       customerPhone, date, time, address, notes, 
//       workerId, workerName 
//     } = req.body;
    
//     if (!serviceName || !customerName || !customerPhone || !date || !time) {
//       return res.json({ success: false, message: 'بيانات ناقصة' });
//     }
    
//     if (!workerId) {
//       return res.json({ success: false, message: 'يرجى اختيار عامل لتقديم الخدمة' });
//     }
    
//     const worker = await Worker.findById(workerId);
//     if (!worker) {
//       return res.json({ success: false, message: 'العامل غير موجود' });
//     }
    
//     if (worker.status !== 'available') {
//       return res.json({ success: false, message: 'العامل غير متاح حالياً، يرجى اختيار عامل آخر' });
//     }
    
//     // إنشاء كود وصول عشوائي (6 أرقام) - يظهر للعميل
//     const arrivalCode = Math.floor(100000 + Math.random() * 900000).toString();
    
//     const booking = new Booking({
//       userId: userId || null,
//       serviceName,
//       subService,
//       customerName,
//       customerPhone,
//       date,
//       time,
//       address: address || '',
//       notes: notes || '',
//       status: 'assigned',
//       workerId: workerId,
//       workerName: workerName || worker.name,
//       arrivalCode: arrivalCode
//     });
    
//     await booking.save();
    
//     // إرسال كود الوصول للعميل
//     await sendArrivalCodeToCustomer(customerPhone, booking._id, arrivalCode);
    
//     worker.status = 'busy';
//     await worker.save();
    
//     console.log(`✅ تم حجز الخدمة وتعيين العامل ${worker.name} (${worker.job}) وأصبح مشغولاً`);
//     console.log(`🔑 كود الوصول للعميل ${customerPhone}: ${arrivalCode}`);
    
//     res.json({ 
//       success: true, 
//       message: `تم الحجز بنجاح، سيتم تقديم الخدمة بواسطة ${worker.name}`,
//       bookingId: booking._id,
//       arrivalCode: arrivalCode,
//       worker: { id: worker._id, name: worker.name, status: worker.status }
//     });
    
//   } catch (error) {
//     console.error('❌ خطأ في الحجز:', error);
//     res.json({ success: false, message: 'حدث خطأ: ' + error.message });
//   }
// });

// app.get('/api/check-worker-availability/:workerId', async (req, res) => {
//   try {
//     const { workerId } = req.params;
//     const worker = await Worker.findById(workerId);
    
//     if (!worker) {
//       return res.json({ success: false, available: false, message: 'العامل غير موجود' });
//     }
    
//     const isAvailable = worker.status === 'available';
//     res.json({ 
//       success: true, 
//       available: isAvailable,
//       worker: {
//         id: worker._id,
//         name: worker.name,
//         status: worker.status
//       }
//     });
//   } catch (error) {
//     res.json({ success: false, error: error.message });
//   }
// });

// /* ==================== ADMIN ROUTES ==================== */

// // جلب كل الحجوزات (للأدمن)
// app.get('/api/admin/bookings', verifyToken, verifyAdmin, async (req, res) => {
//   try {
//     const bookings = await Booking.find().sort({ createdAt: -1 });
//     res.json({ success: true, bookings });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// });

// app.get('/api/admin/contacts', verifyToken, verifyAdmin, async (req, res) => {
//   try {
//     const contacts = await Contact.find().sort({ createdAt: -1 });
//     res.json({ success: true, contacts });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// });

// app.get('/api/admin/complaints', verifyToken, verifyAdmin, async (req, res) => {
//   try {
//     const complaints = await Complaint.find().sort({ createdAt: -1 });
//     res.json({ success: true, complaints });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// });

// app.get('/api/admin/special-needs', verifyToken, verifyAdmin, async (req, res) => {
//   try {
//     const requests = await SpecialNeed.find().sort({ createdAt: -1 });
//     res.json({ success: true, requests });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// });

// app.put('/api/admin/bookings/:id/status', verifyToken, verifyAdmin, async (req, res) => {
//   try {
//     const { status } = req.body;
//     const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
//     res.json({ success: true, booking });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// });

// /* ==================== ADMIN REQUESTS ROUTES ==================== */

// app.get('/api/admin/stats', verifyToken, verifyAdmin, async (req, res) => {
//   try {
//     const [
//       contactsCount,
//       complaintsCount,
//       specialNeedsCount,
//       quickBookingsCount,
//       jobApplicationsCount,
//       bookingsCount,
//       usersCount
//     ] = await Promise.all([
//       Contact.countDocuments(),
//       Complaint.countDocuments(),
//       SpecialNeed.countDocuments(),
//       QuickBooking.countDocuments(),
//       JobApplication.countDocuments(),
//       Booking.countDocuments(),
//       User.countDocuments()
//     ]);

//     res.json({
//       success: true,
//       stats: {
//         contacts: contactsCount,
//         complaints: complaintsCount,
//         specialNeeds: specialNeedsCount,
//         quickBookings: quickBookingsCount,
//         jobApplications: jobApplicationsCount,
//         bookings: bookingsCount,
//         users: usersCount
//       }
//     });
//   } catch (error) {
//     res.json({ success: false, error: error.message });
//   }
// });

// app.get('/api/admin/all-requests', verifyToken, verifyAdmin, async (req, res) => {
//   try {
//     const [
//       contacts,
//       complaints,
//       specialNeeds,
//       quickBookings,
//       jobApplications,
//       bookings
//     ] = await Promise.all([
//       Contact.find().sort({ createdAt: -1 }),
//       Complaint.find().sort({ createdAt: -1 }),
//       SpecialNeed.find().sort({ createdAt: -1 }),
//       QuickBooking.find().sort({ createdAt: -1 }),
//       JobApplication.find().sort({ createdAt: -1 }),
//       Booking.find().sort({ createdAt: -1 })
//     ]);

//     const allRequests = [];

//     contacts.forEach(item => {
//       allRequests.push({
//         id: item._id,
//         type: 'contact',
//         typeAr: 'اتصال بنا',
//         name: item.name,
//         email: item.email,
//         service: item.service,
//         message: item.message,
//         status: item.status,
//         createdAt: item.createdAt
//       });
//     });

//     complaints.forEach(item => {
//       allRequests.push({
//         id: item._id,
//         type: 'complaint',
//         typeAr: 'شكوى',
//         name: item.name,
//         email: item.email,
//         complaintType: item.type,
//         details: item.details,
//         status: item.status,
//         createdAt: item.createdAt
//       });
//     });

//     specialNeeds.forEach(item => {
//       allRequests.push({
//         id: item._id,
//         type: 'special-need',
//         typeAr: 'احتياجات خاصة',
//         phone: item.phone,
//         condition: item.condition,
//         otherCondition: item.otherCondition,
//         serviceType: item.serviceType,
//         location: item.location,
//         voiceNote: item.voiceNote,
//         status: item.status,
//         createdAt: item.createdAt
//       });
//     });

//     quickBookings.forEach(item => {
//       allRequests.push({
//         id: item._id,
//         type: 'quick-booking',
//         typeAr: 'حجز سريع',
//         name: item.name,
//         phone: item.phone,
//         service: item.service,
//         source: item.source,
//         status: item.status,
//         createdAt: item.createdAt
//       });
//     });

//     jobApplications.forEach(item => {
//       allRequests.push({
//         id: item._id,
//         type: 'job-application',
//         typeAr: 'طلب توظيف',
//         fullName: item.fullName,
//         phone: item.phone,
//         email: item.email,
//         serviceType: item.serviceType,
//         availability: item.availability,
//         qualification: item.qualification,
//         experience: item.experience,
//         criminalRecordPath: item.criminalRecordPath,
//         location: item.location,
//         status: item.status,
//         createdAt: item.createdAt
//       });
//     });

//     bookings.forEach(item => {
//       allRequests.push({
//         id: item._id,
//         type: 'booking',
//         typeAr: 'حجز خدمة',
//         customerName: item.customerName,
//         customerPhone: item.customerPhone,
//         serviceName: item.serviceName,
//         workerName: item.workerName,
//         date: item.date,
//         time: item.time,
//         address: item.address,
//         status: item.status,
//         createdAt: item.createdAt
//       });
//     });

//     allRequests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//     res.json({ success: true, requests: allRequests });
//   } catch (error) {
//     console.error('❌ خطأ:', error);
//     res.json({ success: false, error: error.message });
//   }
// });

// app.put('/api/admin/request/:type/:id/status', verifyToken, verifyAdmin, async (req, res) => {
//   try {
//     const { type, id } = req.params;
//     const { status } = req.body;
    
//     let model;
//     switch (type) {
//       case 'contact':
//         model = Contact;
//         break;
//       case 'complaint':
//         model = Complaint;
//         break;
//       case 'special-need':
//         model = SpecialNeed;
//         break;
//       case 'quick-booking':
//         model = QuickBooking;
//         break;
//       case 'job-application':
//         model = JobApplication;
//         break;
//       case 'booking':
//         model = Booking;
//         break;
//       default:
//         return res.json({ success: false, error: 'نوع الطلب غير صحيح' });
//     }
    
//     const updated = await model.findByIdAndUpdate(id, { status }, { new: true });
//     if (!updated) {
//       return res.json({ success: false, error: 'الطلب غير موجود' });
//     }
    
//     if (type === 'job-application' && status === 'approved') {
//       const application = updated;
      
//       const existingWorker = await Worker.findOne({ 
//         $or: [
//           { phone: application.phone },
//           { name: application.fullName }
//         ]
//       });
      
//       if (!existingWorker) {
//         const newWorker = new Worker({
//           name: application.fullName,
//           job: getJobTitleFromService(application.serviceType),
//           salary: 3000,
//           phone: application.phone,
//           experience: application.experience || 0,
//           status: 'available',
//           location: application.location || { lat: null, lng: null, address: '' },
//           image: '',
//           createdAt: new Date()
//         });
        
//         await newWorker.save();
//         console.log(`✅ تم إضافة العامل ${application.fullName} تلقائياً بعد الموافقة على طلبه`);
        
//         return res.json({ 
//           success: true, 
//           message: 'تمت الموافقة على الطلب وتم إضافة العامل بنجاح',
//           workerAdded: true,
//           worker: newWorker
//         });
//       } else {
//         return res.json({ 
//           success: true, 
//           message: 'تمت الموافقة على الطلب ولكن العامل موجود مسبقاً',
//           workerAdded: false
//         });
//       }
//     }
    
//     res.json({ success: true, message: 'تم تحديث الحالة بنجاح', data: updated });
    
//   } catch (error) {
//     console.error('❌ خطأ:', error);
//     res.json({ success: false, error: error.message });
//   }
// });

// app.delete('/api/admin/request/:type/:id', verifyToken, verifyAdmin, async (req, res) => {
//   try {
//     const { type, id } = req.params;
    
//     let model;
//     switch (type) {
//       case 'contact':
//         model = Contact;
//         break;
//       case 'complaint':
//         model = Complaint;
//         break;
//       case 'special-need':
//         model = SpecialNeed;
//         break;
//       case 'quick-booking':
//         model = QuickBooking;
//         break;
//       case 'job-application':
//         model = JobApplication;
//         break;
//       case 'booking':
//         model = Booking;
//         break;
//       default:
//         return res.json({ success: false, error: 'نوع الطلب غير صحيح' });
//     }
    
//     const deleted = await model.findByIdAndDelete(id);
//     if (!deleted) {
//       return res.json({ success: false, error: 'الطلب غير موجود' });
//     }
    
//     res.json({ success: true, message: 'تم حذف الطلب بنجاح' });
//   } catch (error) {
//     console.error('❌ خطأ:', error);
//     res.json({ success: false, error: error.message });
//   }
// });

// app.get('/api/admin/request/:type/:id', verifyToken, verifyAdmin, async (req, res) => {
//   try {
//     const { type, id } = req.params;
    
//     let model;
//     switch (type) {
//       case 'contact':
//         model = Contact;
//         break;
//       case 'complaint':
//         model = Complaint;
//         break;
//       case 'special-need':
//         model = SpecialNeed;
//         break;
//       case 'quick-booking':
//         model = QuickBooking;
//         break;
//       case 'job-application':
//         model = JobApplication;
//         break;
//       case 'booking':
//         model = Booking;
//         break;
//       default:
//         return res.json({ success: false, error: 'نوع الطلب غير صحيح' });
//     }
    
//     const request = await model.findById(id);
//     if (!request) {
//       return res.json({ success: false, error: 'الطلب غير موجود' });
//     }
    
//     res.json({ success: true, request });
//   } catch (error) {
//     console.error('❌ خطأ:', error);
//     res.json({ success: false, error: error.message });
//   }
// });

// /* ==================== ADMIN WORKERS MANAGEMENT ROUTES ==================== */

// app.get('/api/admin/workers/stats', verifyToken, verifyAdmin, async (req, res) => {
//   try {
//     const totalWorkers = await Worker.countDocuments();
//     const availableWorkers = await Worker.countDocuments({ status: 'available' });
//     const busyWorkers = await Worker.countDocuments({ status: 'busy' });
//     const vacationWorkers = await Worker.countDocuments({ status: 'vacation' });
    
//     const totalSalary = await Worker.aggregate([
//       { $group: { _id: null, total: { $sum: '$salary' } } }
//     ]);
    
//     res.json({
//       success: true,
//       stats: {
//         total: totalWorkers,
//         available: availableWorkers,
//         busy: busyWorkers,
//         vacation: vacationWorkers,
//         totalSalary: totalSalary[0]?.total || 0
//       }
//     });
//   } catch (error) {
//     res.json({ success: false, error: error.message });
//   }
// });

// app.get('/api/admin/workers/all', verifyToken, verifyAdmin, async (req, res) => {
//   try {
//     const { status, search } = req.query;
//     let filter = {};
    
//     if (status && status !== 'all') {
//       filter.status = status;
//     }
    
//     if (search) {
//       filter.$or = [
//         { name: { $regex: search, $options: 'i' } },
//         { job: { $regex: search, $options: 'i' } },
//         { phone: { $regex: search, $options: 'i' } }
//       ];
//     }
    
//     const workers = await Worker.find(filter).sort({ createdAt: -1 });
//     res.json({ success: true, workers });
//   } catch (error) {
//     res.json({ success: false, error: error.message });
//   }
// });

// app.post('/api/admin/workers', verifyToken, verifyAdmin, async (req, res) => {
//   try {
//     const { name, job, salary, image, status, phone, experience, location } = req.body;
    
//     if (!name || !job || !salary) {
//       return res.json({ success: false, error: 'الاسم والمسمى الوظيفي والراتب مطلوبة' });
//     }
    
//     const worker = new Worker({
//       name,
//       job,
//       salary: Number(salary),
//       image: image || '',
//       status: status || 'available',
//       phone: phone || '',
//       experience: experience || 0,
//       location: location || { lat: null, lng: null, address: '' }
//     });
    
//     await worker.save();
//     res.json({ success: true, message: 'تم إضافة العامل بنجاح', worker });
//   } catch (error) {
//     res.json({ success: false, error: error.message });
//   }
// });

// app.put('/api/admin/workers/:id', verifyToken, verifyAdmin, async (req, res) => {
//   try {
//     const { name, job, salary, image, status, phone, experience, location } = req.body;
    
//     const worker = await Worker.findByIdAndUpdate(
//       req.params.id,
//       {
//         name,
//         job,
//         salary: Number(salary),
//         image: image || '',
//         status: status || 'available',
//         phone: phone || '',
//         experience: experience || 0,
//         location: location || { lat: null, lng: null, address: '' }
//       },
//       { new: true }
//     );
    
//     if (!worker) {
//       return res.json({ success: false, error: 'العامل غير موجود' });
//     }
    
//     res.json({ success: true, message: 'تم تحديث بيانات العامل', worker });
//   } catch (error) {
//     res.json({ success: false, error: error.message });
//   }
// });

// app.delete('/api/admin/workers/:id', verifyToken, verifyAdmin, async (req, res) => {
//   try {
//     const worker = await Worker.findByIdAndDelete(req.params.id);
//     if (!worker) {
//       return res.json({ success: false, error: 'العامل غير موجود' });
//     }
//     res.json({ success: true, message: 'تم حذف العامل بنجاح' });
//   } catch (error) {
//     res.json({ success: false, error: error.message });
//   }
// });

// app.get('/api/admin/workers/:id', verifyToken, verifyAdmin, async (req, res) => {
//   try {
//     const worker = await Worker.findById(req.params.id);
//     if (!worker) {
//       return res.json({ success: false, error: 'العامل غير موجود' });
//     }
//     res.json({ success: true, worker });
//   } catch (error) {
//     res.json({ success: false, error: error.message });
//   }
// });

// /* ==================== TEMPORARY FIX ROUTE ==================== */

// // TEMPORARY: تصحيح حالة كل العمال (مرة واحدة)
// app.get('/fix-all-workers-status', async (req, res) => {
//   try {
//     const result = await Worker.updateMany(
//       { status: 'busy' },
//       { $set: { status: 'available' } }
//     );
    
//     res.json({
//       success: true,
//       message: `تم تحديث ${result.modifiedCount} عامل إلى متاح`,
//       modifiedCount: result.modifiedCount
//     });
//   } catch (error) {
//     res.json({ success: false, error: error.message });
//   }
// });

// /* ==================== CREATE ADMIN USER (AUTO) ==================== */
// (async function initAdmin() {
//   try {
//     const adminExists = await User.findOne({ email: 'admin@example.com' });
//     if (!adminExists) {
//       const hashedPassword = await bcrypt.hash('admin123', 10);
//       const admin = new User({
//         fullName: 'System Administrator',
//         email: 'admin@example.com',
//         phone: '01000000000',
//         password: hashedPassword,
//         role: 'admin'
//       });
//       await admin.save();
//       console.log('✅ Admin user created successfully!');
//       console.log('📧 Email: admin@example.com');
//       console.log('🔑 Password: admin123');
//     } else {
//       console.log('✅ Admin user already exists');
//     }
//   } catch (error) {
//     console.error('❌ Error creating admin:', error.message);
//   }
// })();

// /* ==================== SETUP TEST WORKER ==================== */
// (async function initTestWorker() {
//   try {
//     const workerExists = await Worker.findOne({ phone: '01000000000' });
//     if (!workerExists) {
//       const worker = new Worker({
//         name: 'أحمد محمد',
//         job: 'عامل نظافة',
//         salary: 3000,
//         phone: '01000000000',
//         experience: 5,
//         status: 'available',
//         location: { lat: 31.1119, lng: 30.9400, address: 'كفر الشيخ' }
//       });
//       await worker.save();
//       console.log('✅ Test worker created successfully!');
//       console.log('👷 Worker Phone: 01000000000');
//     } else {
//       console.log('✅ Test worker already exists');
//     }
//   } catch (error) {
//     console.error('❌ Error creating test worker:', error.message);
//   }
// })();

// /* ==================== TEST ROUTE ==================== */

// app.get('/api/test', (req, res) => {
//   res.json({ message: '✅ السيرفر شغال يا باشا!' });
// });

// // Serve HTML pages
// app.get('/admin-requests', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'admin-requests.html'));
// });

// app.get('/admin-workers', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'admin-workers.html'));
// });

// app.get('/booking', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'booking-with-worker.html'));
// });

// app.get('/worker-dashboard', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'worker-dashboard.html'));
// });

// app.get('/customer-confirm', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'customer-confirm.html'));
// });

// app.get('/admin-bookings', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'admin-bookings.html'));
// });

// /* ==================== START SERVER ==================== */

// const PORT = 3000;

// app.listen(PORT, '0.0.0.0', () => {
//   console.log('========================================');
//   console.log('✅ Server running on port ' + PORT);
//   console.log('🌐 http://localhost:' + PORT);
//   console.log('📋 Admin requests: http://localhost:' + PORT + '/admin-requests');
//   console.log('👷 Admin workers: http://localhost:' + PORT + '/admin-workers');
//   console.log('📝 Booking page: http://localhost:' + PORT + '/booking');
//   console.log('👨‍🔧 Worker dashboard: http://localhost:' + PORT + '/worker-dashboard');
//   console.log('✅ Customer confirm: http://localhost:' + PORT + '/customer-confirm');
//   console.log('📋 Admin bookings: http://localhost:' + PORT + '/admin-bookings');
//   console.log('========================================');
//   console.log('🔑 Admin Login: admin@example.com / admin123');
//   console.log('👷 Worker Login: 01000000000');
//   console.log('========================================');
// });




const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// Secret key for JWT
const JWT_SECRET = 'your_super_secret_key_change_this_in_production';

/* ==================== DB CONNECTION ==================== */
mongoose.connect('mongodb://127.0.0.1:27017/service_system')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err));

/* ==================== MODELS ==================== */

const User = mongoose.model('User', new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, default: '' },
  password: { type: String, required: true },
  role: { type: String, default: 'customer' },
  resetCode: { type: String, default: '' },
  resetCodeExpires: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now }
}));

const Service = mongoose.model('Service', new mongoose.Schema({
  name: String,
  nameAr: String,
  category: String,
  price: Number,
  available: { type: Boolean, default: true }
}));

const Booking = mongoose.model('Booking', new mongoose.Schema({
  userId: { type: String, default: null },
  customerName: String,
  customerPhone: String,
  serviceName: String,
  subService: { type: String, default: '' },
  date: String,
  time: String,
  address: { type: String, default: '' },
  notes: { type: String, default: '' },
  status: { type: String, default: 'pending' },
  price: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  finalPrice: { type: Number, default: 0 },
  isUrgent: { type: Boolean, default: false },
  urgentFee: { type: Number, default: 0 },
  workerId: { type: String, default: null },
  workerName: { type: String, default: '' },
  arrivalCode: { type: String, default: '' },
  arrivalVerified: { type: Boolean, default: false },
  arrivalTime: { type: Date, default: null },
  beforeImagePath: { type: String, default: '' },
  afterImagePath: { type: String, default: '' },
  completionCode: { type: String, default: '' },
  completedAt: { type: Date, default: null },
  customerConfirmation: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
}));

const Subscription = mongoose.model('Subscription', new mongoose.Schema({
  userId: String,
  packageType: { type: String, enum: ['bronze', 'silver', 'gold'] },
  packageDuration: { type: String, enum: ['monthly', 'annual'] },
  price: Number,
  startDate: { type: Date, default: Date.now },
  endDate: Date,
  status: { type: String, default: 'active' },
  createdAt: { type: Date, default: Date.now }
}));

const Payment = mongoose.model('Payment', new mongoose.Schema({
  userId: String,
  bookingId: String,
  subscriptionId: String,
  amount: Number,
  paymentMethod: String,
  cardHolderName: String,
  cardNumber: String,
  expiryDate: String,
  cvv: String,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
}));

const Discount = mongoose.model('Discount', new mongoose.Schema({
  name: String,
  nameAr: String,
  type: String,
  percentage: Number,
  applicableFor: String,
  description: String,
  descriptionAr: String,
  active: { type: Boolean, default: true }
}));

const Contact = mongoose.model('Contact', new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  service: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
}));

const Complaint = mongoose.model('Complaint', new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  type: { type: String, required: true },
  details: { type: String, required: true },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
}));

const SpecialNeed = mongoose.model('SpecialNeed', new mongoose.Schema({
  userId: { type: String, default: null },
  phone: { type: String, required: true },
  condition: { type: String, required: true },
  otherCondition: { type: String, default: '' },
  serviceType: { type: String, required: true },
  location: {
    lat: { type: Number, default: null },
    lng: { type: Number, default: null },
    address: { type: String, default: '' }
  },
  voiceNote: { type: String, default: '' },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
}));

const QuickBooking = mongoose.model('QuickBooking', new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  source: { type: String, default: 'homepage' },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
}));

const DiscountOffer = mongoose.model('DiscountOffer', new mongoose.Schema({
  name: { type: String, required: true },
  nameAr: { type: String, required: true },
  description: { type: String, required: true },
  descriptionAr: { type: String, required: true },
  type: { type: String, enum: ['percentage', 'fixed'], default: 'percentage' },
  value: { type: Number, required: true },
  applicableFor: { type: String, enum: ['seniors', 'special-needs', 'annual', 'all'], default: 'all' },
  minAge: { type: Number, default: null },
  startDate: { type: Date, default: Date.now },
  endDate: Date,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
}));

const JobApplication = mongoose.model('JobApplication', new mongoose.Schema({
  fullName: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, default: '' },
  address: { type: String, required: true },
  qualification: { type: String, default: '' },
  experience: { type: Number, default: 0 },
  certificates: { type: String, default: '' },
  skills: { type: String, default: '' },
  serviceType: { type: String, required: true },
  availability: { type: String, required: true },
  criminalRecordPath: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    address: { type: String, default: '' }
  },
  notes: { type: String, default: '' },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
}));

const Worker = mongoose.model('Worker', new mongoose.Schema({
  name: { type: String, required: true },
  job: { type: String, required: true },
  salary: { type: Number, required: true, default: 3000 },
  image: { type: String, default: '' },
  status: { type: String, enum: ['available', 'busy', 'vacation'], default: 'available' },
  phone: { type: String, default: '' },
  experience: { type: Number, default: 0 },
  location: {
    lat: { type: Number, default: null },
    lng: { type: Number, default: null },
    address: { type: String, default: '' }
  },
  createdAt: { type: Date, default: Date.now }
}));

const EmergencyCall = mongoose.model('EmergencyCall', new mongoose.Schema({
  userId: { type: String, default: null },
  phone: { type: String, default: '01000000000' },
  callType: { type: String, enum: ['phone', 'whatsapp'], default: 'phone' },
  timestamp: { type: Date, default: Date.now },
  ip: { type: String, default: '' }
}));

/* ==================== KAFR EL-SHEIKH LOCATIONS ==================== */

const kafrLocations = {
  centers: [
    { id: 'kafr-sheikh', name: 'مركز كفر الشيخ', nameAr: 'مركز كفر الشيخ', lat: 31.1119, lng: 30.9400 },
    { id: 'desouk', name: 'دسوق', nameAr: 'مركز دسوق', lat: 31.1326, lng: 30.6474 },
    { id: 'fowa', name: 'فوة', nameAr: 'مركز فوة', lat: 31.2050, lng: 30.5500 },
    { id: 'metoubes', name: 'مطوبس', nameAr: 'مركز مطوبس', lat: 31.3500, lng: 30.5200 },
    { id: 'belqas', name: 'بلقاس', nameAr: 'مركز بلقاس', lat: 31.2167, lng: 31.3667 },
    { id: 'el-hamoul', name: 'الحامول', nameAr: 'مركز الحامول', lat: 31.3100, lng: 30.9800 },
    { id: 'sidi-salem', name: 'سيدي سالم', nameAr: 'مركز سيدي سالم', lat: 31.2667, lng: 30.7833 },
    { id: 'qallin', name: 'قلين', nameAr: 'مركز قلين', lat: 31.0500, lng: 30.8667 }
  ],
  villages: [
    { name: 'أبو طويلة', center: 'kafr-sheikh' },
    { name: 'أبو حامد', center: 'kafr-sheikh' },
    { name: 'الروينة', center: 'kafr-sheikh' },
    { name: 'الغريب', center: 'kafr-sheikh' },
    { name: 'برية', center: 'kafr-sheikh' },
    { name: 'ميت علوان', center: 'kafr-sheikh' },
    { name: 'شالما', center: 'kafr-sheikh' },
    { name: 'محلة موسي', center: 'kafr-sheikh' },
    { name: 'أبو شوشة', center: 'desouk' },
    { name: 'ميت خاقان', center: 'desouk' },
    { name: 'شابة', center: 'fowa' },
    { name: 'الزعفران', center: 'metoubes' },
    { name: 'البرتقالة', center: 'el-hamoul' },
    { name: 'الغربية', center: 'sidi-salem' },
    { name: 'كفر الشيخ إبراهيم', center: 'qallin' }
  ]
};

/* ==================== HELPERS ==================== */

// دالة إرسال كود الوصول للعميل (محاكاة)
async function sendArrivalCodeToCustomer(phone, bookingId, code) {
  console.log(`📱 =====================================`);
  console.log(`📱 تم إرسال كود الوصول للعميل ${phone}`);
  console.log(`📱 رقم الحجز: ${bookingId}`);
  console.log(`📱 كود الوصول: ${code}`);
  console.log(`📱 =====================================`);
  return true;
}

// دالة تحويل نوع الخدمة إلى مسمى وظيفي
function getJobTitleFromService(serviceType) {
  const jobTitles = {
    'cleaning': 'عامل نظافة',
    'maintenance': 'فني صيانة',
    'medical': 'ممرض / رعاية صحية',
    'special': 'أخصائي دعم ذوي الاحتياجات الخاصة',
    'special-needs': 'أخصائي دعم ذوي الاحتياجات الخاصة'
  };
  return jobTitles[serviceType] || 'عامل';
}

/* ==================== EMERGENCY CONTACT ==================== */

app.post('/api/emergency-contact', async (req, res) => {
  try {
    const { userId, callType } = req.body;
    const clientIp = req.ip || req.connection?.remoteAddress || '';
    
    const emergency = new EmergencyCall({
      userId: userId || null,
      callType: callType || 'phone',
      ip: clientIp
    });
    
    await emergency.save();
    res.json({ success: true, message: 'تم تسجيل محاولة الاتصال' });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

/* ==================== JOB APPLICATIONS UPLOAD SETUP ==================== */

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9.\u0600-\u06FF]/g, '_');
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + cleanName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('نوع الملف غير مدعوم. يرجى رفع صور أو PDF فقط'), false);
  }
};

const upload = multer({ 
  storage: storage,
  limits: { 
    fileSize: 50 * 1024 * 1024,
    files: 5
  },
  fileFilter: fileFilter
});

/* ==================== SERVE FILES ==================== */
app.get('/uploads/:filename', (req, res) => {
  const filepath = path.join(__dirname, 'uploads', req.params.filename);
  if (fs.existsSync(filepath)) {
    res.sendFile(filepath);
  } else {
    res.status(404).json({ error: 'الملف غير موجود' });
  }
});

/* ==================== LOCATIONS API ==================== */

app.get('/api/locations/centers', (req, res) => {
  res.json({ success: true, centers: kafrLocations.centers });
});

app.get('/api/locations/villages/:centerId', (req, res) => {
  const { centerId } = req.params;
  const villages = kafrLocations.villages.filter(v => v.center === centerId);
  res.json({ success: true, villages });
});

app.get('/api/locations/search', (req, res) => {
  const { q } = req.query;
  if (!q || q.length < 2) {
    return res.json({ success: true, results: [] });
  }
  
  const results = [];
  
  kafrLocations.centers.forEach(center => {
    if (center.nameAr.includes(q) || center.name.includes(q)) {
      results.push({
        type: 'center',
        id: center.id,
        name: center.nameAr,
        lat: center.lat,
        lng: center.lng
      });
    }
  });
  
  kafrLocations.villages.forEach(village => {
    if (village.name.includes(q)) {
      const center = kafrLocations.centers.find(c => c.id === village.center);
      results.push({
        type: 'village',
        name: village.name,
        centerName: center?.nameAr,
        lat: center?.lat,
        lng: center?.lng
      });
    }
  });
  
  res.json({ success: true, results: results.slice(0, 10) });
});

/* ==================== AUTH ==================== */

app.post('/api/auth/register', async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;

    if (!fullName || !email || !password) {
      return res.json({ success: false, message: 'الاسم والبريد وكلمة المرور مطلوبة' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: 'البريد الإلكتروني مستخدم بالفعل' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ 
      fullName, 
      email, 
      phone: phone || '', 
      password: hashedPassword,
      role: 'customer'
    });
    
    await user.save();

    const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ success: true, message: 'تم إنشاء الحساب بنجاح', userId: user._id, token });

  } catch (error) {
    console.error('❌ خطأ في التسجيل:', error);
    res.json({ success: false, message: 'حدث خطأ: ' + error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'المستخدم غير موجود' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.json({ success: false, message: 'كلمة المرور خطأ' });
    }

    const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      success: true,
      message: 'تم تسجيل الدخول بنجاح',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });

  } catch (error) {
    console.error('❌ خطأ في تسجيل الدخول:', error);
    res.json({ success: false, message: 'حدث خطأ: ' + error.message });
  }
});

/* ==================== FORGOT & RESET PASSWORD ==================== */

app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.json({ success: false, message: 'البريد الإلكتروني مطلوب' });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'لا يوجد حساب بهذا البريد الإلكتروني' });
    }
    
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    user.resetCode = resetCode;
    user.resetCodeExpires = new Date(Date.now() + 3600000);
    await user.save();
    
    console.log(`🔐 كود إعادة تعيين كلمة المرور لـ ${email}: ${resetCode}`);
    
    res.json({ success: true, message: 'تم إرسال كود إعادة التعيين إلى بريدك الإلكتروني', resetCode });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    
    if (!email || !code || !newPassword) {
      return res.json({ success: false, message: 'جميع الحقول مطلوبة' });
    }
    
    if (newPassword.length < 6) {
      return res.json({ success: false, message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' });
    }
    
    const user = await User.findOne({ 
      email: email,
      resetCode: code,
      resetCodeExpires: { $gt: new Date() }
    });
    
    if (!user) {
      return res.json({ success: false, message: 'الكود غير صالح أو انتهت صلاحيته' });
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetCode = '';
    user.resetCodeExpires = null;
    await user.save();
    
    res.json({ success: true, message: 'تم إعادة تعيين كلمة المرور بنجاح' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.json({ success: false, message: 'غير مصرح، يرجى تسجيل الدخول' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    return res.json({ success: false, message: 'توكن غير صالح' });
  }
};

const verifyAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.json({ success: false, message: 'غير مصرح، هذه الخاصية للمشرف فقط' });
  }
  next();
};

app.get('/api/auth/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

/* ==================== SERVICES ==================== */

app.get('/api/services', async (req, res) => {
  try {
    let services = await Service.find();

    if (services.length === 0) {
      const defaultServices = [
        { name: 'cleaning', nameAr: 'تنظيف', category: 'cleaning', price: 250, available: true },
        { name: 'maintenance', nameAr: 'صيانة', category: 'maintenance', price: 200, available: true },
        { name: 'medical-care', nameAr: 'رعاية طبية', category: 'medical', price: 300, available: true },
        { name: 'special-needs', nameAr: 'دعم ذوي الاحتياجات الخاصة', category: 'special', price: 350, available: true }
      ];

      await Service.insertMany(defaultServices);
      services = await Service.find();
    }

    res.json({ success: true, services });

  } catch (error) {
    console.error('❌ خطأ:', error);
    res.json({ success: false, message: error.message });
  }
});

/* ==================== CONTACT ==================== */

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, service, message } = req.body;
    
    if (!name || !email || !service || !message) {
      return res.json({ success: false, error: 'جميع الحقول مطلوبة' });
    }
    
    const contact = new Contact({
      name,
      email,
      service,
      message,
      status: 'pending'
    });
    
    await contact.save();
    
    res.json({ success: true, message: 'تم إرسال رسالتك بنجاح' });
  } catch (error) {
    console.error('❌ خطأ:', error);
    res.json({ success: false, error: error.message });
  }
});

app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, contacts });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

/* ==================== COMPLAINTS ==================== */

app.post('/api/complaints', async (req, res) => {
  try {
    const { name, email, type, details } = req.body;
    
    console.log("📝 استلام شكوى جديدة:", { name, email, type });
    
    if (!name || !email || !type || !details) {
      return res.json({ success: false, error: 'جميع الحقول مطلوبة' });
    }
    
    const complaint = new Complaint({
      name,
      email,
      type,
      details,
      status: 'pending'
    });
    
    await complaint.save();
    
    res.json({ success: true, message: 'تم إرسال الشكوى بنجاح' });
  } catch (error) {
    console.error('❌ خطأ:', error);
    res.json({ success: false, error: error.message });
  }
});

app.get('/api/complaints', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json({ success: true, complaints });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

/* ==================== SPECIAL NEEDS ==================== */

app.post('/api/special-needs', async (req, res) => {
  try {
    const { userId, phone, condition, otherCondition, serviceType, location, voiceNote } = req.body;
    
    console.log("📝 استلام طلب خاص:", { phone, condition, serviceType });
    
    if (!phone || !condition || !serviceType) {
      return res.json({ success: false, error: 'رقم الهاتف ونوع الإعاقة ونوع الخدمة مطلوبة' });
    }
    
    const specialNeed = new SpecialNeed({
      userId: userId || null,
      phone,
      condition,
      otherCondition: otherCondition || '',
      serviceType,
      location: location || { lat: null, lng: null, address: '' },
      voiceNote: voiceNote || '',
      status: 'pending'
    });
    
    await specialNeed.save();
    
    res.json({ success: true, message: 'تم إرسال طلبك بنجاح، سيتم التواصل معك قريباً' });
  } catch (error) {
    console.error('❌ خطأ:', error);
    res.json({ success: false, error: error.message });
  }
});

app.get('/api/special-needs', async (req, res) => {
  try {
    const requests = await SpecialNeed.find().sort({ createdAt: -1 });
    res.json({ success: true, requests });
  } catch (error) {
    console.error('❌ خطأ:', error);
    res.json({ success: false, error: error.message });
  }
});

app.get('/api/special-needs/:userId', async (req, res) => {
  try {
    const requests = await SpecialNeed.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json({ success: true, requests });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

/* ==================== QUICK BOOKING ==================== */

app.post('/api/quick-booking', async (req, res) => {
  try {
    const { name, phone, service, source } = req.body;
    
    console.log("📝 استلام طلب سريع:", { name, phone, service });
    
    if (!name || !phone || !service) {
      return res.json({ success: false, error: 'جميع الحقول مطلوبة' });
    }
    
    const booking = new QuickBooking({ 
      name, 
      phone, 
      service, 
      source: source || 'homepage' 
    });
    
    await booking.save();
    
    res.json({ success: true, message: 'تم إرسال طلبك بنجاح' });
  } catch (error) {
    console.error('❌ خطأ:', error);
    res.json({ success: false, error: error.message });
  }
});

/* ==================== DISCOUNTS & SUBSCRIPTIONS ==================== */

app.get('/api/discounts', async (req, res) => {
  try {
    const discounts = await DiscountOffer.find({ isActive: true, endDate: { $gte: new Date() } });
    res.json({ success: true, discounts });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.get('/api/discounts/:type', async (req, res) => {
  try {
    const discount = await DiscountOffer.findOne({ applicableFor: req.params.type, isActive: true });
    res.json({ success: true, discount });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.post('/api/subscriptions', async (req, res) => {
  try {
    const { userId, packageName, amount, duration } = req.body;
    
    if (!packageName || !amount) {
      return res.json({ success: false, error: 'بيانات ناقصة' });
    }
    
    const endDate = new Date();
    if (duration === 'monthly') {
      endDate.setMonth(endDate.getMonth() + 1);
    } else {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }
    
    const subscription = new Subscription({
      userId: userId || null,
      packageType: packageName,
      packageDuration: duration,
      price: amount,
      startDate: new Date(),
      endDate: endDate,
      status: 'active'
    });
    
    await subscription.save();
    
    res.json({ success: true, message: 'تم الاشتراك بنجاح', subscriptionId: subscription._id });
  } catch (error) {
    console.error('❌ خطأ:', error);
    res.json({ success: false, error: error.message });
  }
});

app.get('/api/subscriptions/:userId', async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json({ success: true, subscriptions });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

/* ==================== JOB APPLICATIONS ==================== */

app.post('/api/job-applications', upload.fields([
  { name: 'criminalRecord', maxCount: 1 }
]), async (req, res) => {
  try {
    const { 
      fullName, dob, gender, phone, email, address, 
      qualification, experience, certificates, skills, 
      serviceType, availability, notes,
      locationLat, locationLng, locationAddress
    } = req.body;
    
    const files = req.files;
    
    console.log("📝 استلام طلب توظيف:", { fullName, phone, serviceType, experience });
    
    if (!fullName || !phone || !address || !serviceType || !availability || !experience) {
      return res.json({ success: false, error: 'جميع الحقول المطلوبة يجب تعبئتها' });
    }
    
    if (!files || !files.criminalRecord) {
      return res.json({ success: false, error: 'يرجى رفع الفيش الجنائي' });
    }
    
    if (!locationLat || !locationLng) {
      return res.json({ success: false, error: 'يرجى تحديد موقعك على الخريطة' });
    }
    
    const application = new JobApplication({
      fullName,
      dob: new Date(dob),
      gender,
      phone,
      email: email || '',
      address,
      qualification: qualification || '',
      experience: Number(experience),
      certificates: certificates || '',
      skills: skills || '',
      serviceType,
      availability,
      criminalRecordPath: 'uploads/' + files.criminalRecord[0].filename,
      location: {
        lat: Number(locationLat),
        lng: Number(locationLng),
        address: locationAddress || ''
      },
      notes: notes || '',
      status: 'pending'
    });
    
    await application.save();
    
    res.json({ success: true, message: 'تم تقديم طلبك بنجاح' });
  } catch (error) {
    console.error('❌ خطأ:', error);
    res.json({ success: false, error: error.message });
  }
});

app.get('/api/job-applications', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const applications = await JobApplication.find().sort({ createdAt: -1 });
    res.json({ success: true, applications });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

/* ==================== USERS (ADMIN) ==================== */

app.get('/api/users', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, users });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

/* ==================== WORKERS ROUTES ==================== */

app.get('/api/workers', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const workers = await Worker.find().sort({ createdAt: -1 });
    res.json({ success: true, workers });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.get('/api/workers/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (!worker) return res.json({ success: false, error: 'العامل غير موجود' });
    res.json({ success: true, worker });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.post('/api/workers', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { name, job, salary, image, status, phone, experience, location } = req.body;
    if (!name || !job || !salary) {
      return res.json({ success: false, error: 'الاسم والتخصص والراتب مطلوبة' });
    }
    const worker = new Worker({ name, job, salary, image, status, phone, experience, location });
    await worker.save();
    res.json({ success: true, worker });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.put('/api/workers/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { name, job, salary, image, status, phone, experience, location } = req.body;
    const worker = await Worker.findByIdAndUpdate(req.params.id, 
      { name, job, salary, image, status, phone, experience, location }, 
      { new: true }
    );
    if (!worker) return res.json({ success: false, error: 'العامل غير موجود' });
    res.json({ success: true, worker });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.delete('/api/workers/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const worker = await Worker.findByIdAndDelete(req.params.id);
    if (!worker) return res.json({ success: false, error: 'العامل غير موجود' });
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

/* ==================== WORKER AUTH & DASHBOARD ==================== */

app.post('/api/worker/login', async (req, res) => {
  try {
    const { phone } = req.body;
    
    if (!phone) {
      return res.json({ success: false, message: 'رقم الهاتف مطلوب' });
    }
    
    const worker = await Worker.findOne({ phone: phone });
    if (!worker) {
      return res.json({ success: false, message: 'لا يوجد عامل بهذا الرقم' });
    }
    
    const token = jwt.sign({ 
      workerId: worker._id, 
      name: worker.name, 
      role: 'worker' 
    }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({
      success: true,
      message: 'تم تسجيل الدخول بنجاح',
      token,
      worker: {
        id: worker._id,
        name: worker.name,
        job: worker.job,
        phone: worker.phone,
        status: worker.status
      }
    });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

const verifyWorker = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.json({ success: false, message: 'غير مصرح، يرجى تسجيل الدخول' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
    if (decoded.role !== 'worker') {
      return res.json({ success: false, message: 'غير مصرح، هذه الخاصية للعمال فقط' });
    }
    req.workerId = decoded.workerId;
    req.workerName = decoded.name;
    next();
  } catch (error) {
    return res.json({ success: false, message: 'توكن غير صالح' });
  }
};

app.get('/api/worker/bookings', verifyWorker, async (req, res) => {
  try {
    const workerId = req.workerId;
    
    const activeBookings = await Booking.find({ 
      workerId: workerId,
      status: { $in: ['assigned', 'pending'] }
    }).sort({ date: 1, time: 1 });
    
    const completedBookings = await Booking.find({ 
      workerId: workerId,
      status: 'completed'
    }).sort({ createdAt: -1 }).limit(10);
    
    res.json({
      success: true,
      activeBookings,
      completedBookings
    });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.get('/api/worker/stats', verifyWorker, async (req, res) => {
  try {
    const workerId = req.workerId;
    
    const totalBookings = await Booking.countDocuments({ workerId: workerId });
    const completedBookings = await Booking.countDocuments({ workerId: workerId, status: 'completed' });
    const pendingBookings = await Booking.countDocuments({ workerId: workerId, status: 'assigned' });
    
    res.json({
      success: true,
      stats: {
        total: totalBookings,
        completed: completedBookings,
        pending: pendingBookings
      }
    });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

/* ==================== SERVICE VERIFICATION ROUTES ==================== */

// العامل يؤكد وصوله باستخدام الكود اللي أخده من العميل
app.post('/api/worker/confirm-arrival', verifyWorker, async (req, res) => {
  try {
    const { bookingId, code } = req.body;
    const workerId = req.workerId;
    
    const booking = await Booking.findOne({ _id: bookingId, workerId: workerId });
    if (!booking) {
      return res.json({ success: false, message: 'الحجز غير موجود أو لا يخصك' });
    }
    
    if (booking.arrivalVerified) {
      return res.json({ success: false, message: 'تم تأكيد الوصول مسبقاً' });
    }
    
    if (booking.arrivalCode !== code) {
      return res.json({ success: false, message: 'الكود غير صحيح' });
    }
    
    booking.arrivalVerified = true;
    booking.arrivalTime = new Date();
    await booking.save();
    
    res.json({ 
      success: true, 
      message: 'تم تأكيد وصولك للخدمة',
      arrivalTime: booking.arrivalTime
    });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// رفع صورة قبل الخدمة
app.post('/api/worker/upload-before-image/:bookingId', verifyWorker, upload.single('beforeImage'), async (req, res) => {
  try {
    const { bookingId } = req.params;
    const workerId = req.workerId;
    
    const booking = await Booking.findOne({ _id: bookingId, workerId: workerId });
    if (!booking) {
      return res.json({ success: false, message: 'الحجز غير موجود أو لا يخصك' });
    }
    
    if (!req.file) {
      return res.json({ success: false, message: 'يرجى رفع الصورة' });
    }
    
    booking.beforeImagePath = 'uploads/' + req.file.filename;
    await booking.save();
    
    res.json({ 
      success: true, 
      message: 'تم رفع الصورة قبل الخدمة',
      imagePath: booking.beforeImagePath
    });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// رفع صورة بعد الخدمة
app.post('/api/worker/upload-after-image/:bookingId', verifyWorker, upload.single('afterImage'), async (req, res) => {
  try {
    const { bookingId } = req.params;
    const workerId = req.workerId;
    
    const booking = await Booking.findOne({ _id: bookingId, workerId: workerId });
    if (!booking) {
      return res.json({ success: false, message: 'الحجز غير موجود أو لا يخصك' });
    }
    
    if (!req.file) {
      return res.json({ success: false, message: 'يرجى رفع الصورة' });
    }
    
    booking.afterImagePath = 'uploads/' + req.file.filename;
    await booking.save();
    
    res.json({ 
      success: true, 
      message: 'تم رفع الصورة بعد الخدمة',
      imagePath: booking.afterImagePath
    });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// العامل يطلب كود الإتمام
app.post('/api/worker/request-completion-code/:bookingId', verifyWorker, async (req, res) => {
  try {
    const { bookingId } = req.params;
    const workerId = req.workerId;
    
    const booking = await Booking.findOne({ _id: bookingId, workerId: workerId });
    if (!booking) {
      return res.json({ success: false, message: 'الحجز غير موجود أو لا يخصك' });
    }
    
    if (!booking.arrivalVerified) {
      return res.json({ success: false, message: 'لم يتم تأكيد وصولك بعد' });
    }
    
    const completionCode = Math.floor(100000 + Math.random() * 900000).toString();
    booking.completionCode = completionCode;
    await booking.save();
    
    res.json({ 
      success: true, 
      message: 'تم إنشاء كود الإتمام',
      completionCode: completionCode
    });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// العميل يؤكد إتمام الخدمة (مع تغيير حالة العامل تلقائياً)
app.post('/api/customer/confirm-completion', async (req, res) => {
  try {
    const { bookingId, code, customerPhone } = req.body;
    
    const booking = await Booking.findOne({ _id: bookingId });
    if (!booking) {
      return res.json({ success: false, message: 'الحجز غير موجود' });
    }
    
    if (booking.customerPhone !== customerPhone) {
      return res.json({ success: false, message: 'رقم الهاتف غير صحيح' });
    }
    
    if (booking.completionCode !== code) {
      return res.json({ success: false, message: 'الكود غير صحيح' });
    }
    
    if (booking.status === 'completed') {
      return res.json({ success: false, message: 'الخدمة مكتملة بالفعل' });
    }
    
    // تحديث الحجز
    booking.customerConfirmation = true;
    booking.status = 'completed';
    booking.completedAt = new Date();
    await booking.save();
    
    // ✅ تغيير حالة العامل إلى available تلقائياً
    if (booking.workerId) {
      const worker = await Worker.findById(booking.workerId);
      if (worker) {
        worker.status = 'available';
        await worker.save();
        console.log(`✅ العامل ${worker.name} أصبح متاحاً تلقائياً بعد تأكيد العميل`);
      }
    }
    
    res.json({ 
      success: true, 
      message: 'تم تأكيد إتمام الخدمة بنجاح',
      completedAt: booking.completedAt
    });
    
  } catch (error) {
    console.error('❌ خطأ:', error);
    res.json({ success: false, error: error.message });
  }
});

/* ==================== GET AVAILABLE WORKERS FOR CUSTOMER ==================== */

app.get('/api/available-workers/:serviceType', async (req, res) => {
  try {
    const { serviceType } = req.params;
    
    const jobMap = {
      'cleaning': 'عامل نظافة',
      'maintenance': 'فني صيانة',
      'medical': 'ممرض / رعاية صحية',
      'special-needs': 'أخصائي دعم ذوي الاحتياجات الخاصة'
    };
    
    const jobTitle = jobMap[serviceType] || 'عامل';
    
    const workers = await Worker.find({ 
      status: 'available',
      job: jobTitle
    }).select('name job experience phone location image status');
    
    res.json({ success: true, workers });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// حجز مع تعيين عامل محدد (مع إنشاء كود وصول تلقائي)
app.post('/api/book-with-worker', async (req, res) => {
  try {
    const { 
      userId, serviceName, subService, customerName, 
      customerPhone, date, time, address, notes, 
      workerId, workerName 
    } = req.body;
    
    if (!serviceName || !customerName || !customerPhone || !date || !time) {
      return res.json({ success: false, message: 'بيانات ناقصة' });
    }
    
    if (!workerId) {
      return res.json({ success: false, message: 'يرجى اختيار عامل لتقديم الخدمة' });
    }
    
    const worker = await Worker.findById(workerId);
    if (!worker) {
      return res.json({ success: false, message: 'العامل غير موجود' });
    }
    
    if (worker.status !== 'available') {
      return res.json({ success: false, message: 'العامل غير متاح حالياً، يرجى اختيار عامل آخر' });
    }
    
    // إنشاء كود وصول عشوائي (6 أرقام) - يظهر للعميل
    const arrivalCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    const booking = new Booking({
      userId: userId || null,
      serviceName,
      subService,
      customerName,
      customerPhone,
      date,
      time,
      address: address || '',
      notes: notes || '',
      status: 'assigned',
      workerId: workerId,
      workerName: workerName || worker.name,
      arrivalCode: arrivalCode
    });
    
    await booking.save();
    
    // إرسال كود الوصول للعميل
    await sendArrivalCodeToCustomer(customerPhone, booking._id, arrivalCode);
    
    worker.status = 'busy';
    await worker.save();
    
    console.log(`✅ تم حجز الخدمة وتعيين العامل ${worker.name} (${worker.job}) وأصبح مشغولاً`);
    console.log(`🔑 كود الوصول للعميل ${customerPhone}: ${arrivalCode}`);
    
    res.json({ 
      success: true, 
      message: `تم الحجز بنجاح، سيتم تقديم الخدمة بواسطة ${worker.name}`,
      bookingId: booking._id,
      arrivalCode: arrivalCode,
      worker: { id: worker._id, name: worker.name, status: worker.status }
    });
    
  } catch (error) {
    console.error('❌ خطأ في الحجز:', error);
    res.json({ success: false, message: 'حدث خطأ: ' + error.message });
  }
});

app.get('/api/check-worker-availability/:workerId', async (req, res) => {
  try {
    const { workerId } = req.params;
    const worker = await Worker.findById(workerId);
    
    if (!worker) {
      return res.json({ success: false, available: false, message: 'العامل غير موجود' });
    }
    
    const isAvailable = worker.status === 'available';
    res.json({ 
      success: true, 
      available: isAvailable,
      worker: {
        id: worker._id,
        name: worker.name,
        status: worker.status
      }
    });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

/* ==================== ADMIN ROUTES ==================== */

// جلب كل الحجوزات (للأدمن)
app.get('/api/admin/bookings', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

app.get('/api/admin/contacts', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, contacts });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

app.get('/api/admin/complaints', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json({ success: true, complaints });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

app.get('/api/admin/special-needs', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const requests = await SpecialNeed.find().sort({ createdAt: -1 });
    res.json({ success: true, requests });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

app.put('/api/admin/bookings/:id/status', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json({ success: true, booking });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

/* ==================== ADMIN REQUESTS ROUTES ==================== */

app.get('/api/admin/stats', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const [
      contactsCount,
      complaintsCount,
      specialNeedsCount,
      quickBookingsCount,
      jobApplicationsCount,
      bookingsCount,
      usersCount
    ] = await Promise.all([
      Contact.countDocuments(),
      Complaint.countDocuments(),
      SpecialNeed.countDocuments(),
      QuickBooking.countDocuments(),
      JobApplication.countDocuments(),
      Booking.countDocuments(),
      User.countDocuments()
    ]);

    res.json({
      success: true,
      stats: {
        contacts: contactsCount,
        complaints: complaintsCount,
        specialNeeds: specialNeedsCount,
        quickBookings: quickBookingsCount,
        jobApplications: jobApplicationsCount,
        bookings: bookingsCount,
        users: usersCount
      }
    });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.get('/api/admin/all-requests', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const [
      contacts,
      complaints,
      specialNeeds,
      quickBookings,
      jobApplications,
      bookings
    ] = await Promise.all([
      Contact.find().sort({ createdAt: -1 }),
      Complaint.find().sort({ createdAt: -1 }),
      SpecialNeed.find().sort({ createdAt: -1 }),
      QuickBooking.find().sort({ createdAt: -1 }),
      JobApplication.find().sort({ createdAt: -1 }),
      Booking.find().sort({ createdAt: -1 })
    ]);

    const allRequests = [];

    contacts.forEach(item => {
      allRequests.push({
        id: item._id,
        type: 'contact',
        typeAr: 'اتصال بنا',
        name: item.name,
        email: item.email,
        service: item.service,
        message: item.message,
        status: item.status,
        createdAt: item.createdAt
      });
    });

    complaints.forEach(item => {
      allRequests.push({
        id: item._id,
        type: 'complaint',
        typeAr: 'شكوى',
        name: item.name,
        email: item.email,
        complaintType: item.type,
        details: item.details,
        status: item.status,
        createdAt: item.createdAt
      });
    });

    specialNeeds.forEach(item => {
      allRequests.push({
        id: item._id,
        type: 'special-need',
        typeAr: 'احتياجات خاصة',
        phone: item.phone,
        condition: item.condition,
        otherCondition: item.otherCondition,
        serviceType: item.serviceType,
        location: item.location,
        voiceNote: item.voiceNote,
        status: item.status,
        createdAt: item.createdAt
      });
    });

    quickBookings.forEach(item => {
      allRequests.push({
        id: item._id,
        type: 'quick-booking',
        typeAr: 'حجز سريع',
        name: item.name,
        phone: item.phone,
        service: item.service,
        source: item.source,
        status: item.status,
        createdAt: item.createdAt
      });
    });

    jobApplications.forEach(item => {
      allRequests.push({
        id: item._id,
        type: 'job-application',
        typeAr: 'طلب توظيف',
        fullName: item.fullName,
        phone: item.phone,
        email: item.email,
        serviceType: item.serviceType,
        availability: item.availability,
        qualification: item.qualification,
        experience: item.experience,
        criminalRecordPath: item.criminalRecordPath,
        location: item.location,
        status: item.status,
        createdAt: item.createdAt
      });
    });

    bookings.forEach(item => {
      allRequests.push({
        id: item._id,
        type: 'booking',
        typeAr: 'حجز خدمة',
        customerName: item.customerName,
        customerPhone: item.customerPhone,
        serviceName: item.serviceName,
        workerName: item.workerName,
        date: item.date,
        time: item.time,
        address: item.address,
        status: item.status,
        createdAt: item.createdAt
      });
    });

    allRequests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({ success: true, requests: allRequests });
  } catch (error) {
    console.error('❌ خطأ:', error);
    res.json({ success: false, error: error.message });
  }
});

app.put('/api/admin/request/:type/:id/status', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { type, id } = req.params;
    const { status } = req.body;
    
    let model;
    switch (type) {
      case 'contact':
        model = Contact;
        break;
      case 'complaint':
        model = Complaint;
        break;
      case 'special-need':
        model = SpecialNeed;
        break;
      case 'quick-booking':
        model = QuickBooking;
        break;
      case 'job-application':
        model = JobApplication;
        break;
      case 'booking':
        model = Booking;
        break;
      default:
        return res.json({ success: false, error: 'نوع الطلب غير صحيح' });
    }
    
    const updated = await model.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) {
      return res.json({ success: false, error: 'الطلب غير موجود' });
    }
    
    if (type === 'job-application' && status === 'approved') {
      const application = updated;
      
      const existingWorker = await Worker.findOne({ 
        $or: [
          { phone: application.phone },
          { name: application.fullName }
        ]
      });
      
      if (!existingWorker) {
        const newWorker = new Worker({
          name: application.fullName,
          job: getJobTitleFromService(application.serviceType),
          salary: 3000,
          phone: application.phone,
          experience: application.experience || 0,
          status: 'available',
          location: application.location || { lat: null, lng: null, address: '' },
          image: '',
          createdAt: new Date()
        });
        
        await newWorker.save();
        console.log(`✅ تم إضافة العامل ${application.fullName} تلقائياً بعد الموافقة على طلبه`);
        
        return res.json({ 
          success: true, 
          message: 'تمت الموافقة على الطلب وتم إضافة العامل بنجاح',
          workerAdded: true,
          worker: newWorker
        });
      } else {
        return res.json({ 
          success: true, 
          message: 'تمت الموافقة على الطلب ولكن العامل موجود مسبقاً',
          workerAdded: false
        });
      }
    }
    
    res.json({ success: true, message: 'تم تحديث الحالة بنجاح', data: updated });
    
  } catch (error) {
    console.error('❌ خطأ:', error);
    res.json({ success: false, error: error.message });
  }
});

app.delete('/api/admin/request/:type/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { type, id } = req.params;
    
    let model;
    switch (type) {
      case 'contact':
        model = Contact;
        break;
      case 'complaint':
        model = Complaint;
        break;
      case 'special-need':
        model = SpecialNeed;
        break;
      case 'quick-booking':
        model = QuickBooking;
        break;
      case 'job-application':
        model = JobApplication;
        break;
      case 'booking':
        model = Booking;
        break;
      default:
        return res.json({ success: false, error: 'نوع الطلب غير صحيح' });
    }
    
    const deleted = await model.findByIdAndDelete(id);
    if (!deleted) {
      return res.json({ success: false, error: 'الطلب غير موجود' });
    }
    
    res.json({ success: true, message: 'تم حذف الطلب بنجاح' });
  } catch (error) {
    console.error('❌ خطأ:', error);
    res.json({ success: false, error: error.message });
  }
});

app.get('/api/admin/request/:type/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { type, id } = req.params;
    
    let model;
    switch (type) {
      case 'contact':
        model = Contact;
        break;
      case 'complaint':
        model = Complaint;
        break;
      case 'special-need':
        model = SpecialNeed;
        break;
      case 'quick-booking':
        model = QuickBooking;
        break;
      case 'job-application':
        model = JobApplication;
        break;
      case 'booking':
        model = Booking;
        break;
      default:
        return res.json({ success: false, error: 'نوع الطلب غير صحيح' });
    }
    
    const request = await model.findById(id);
    if (!request) {
      return res.json({ success: false, error: 'الطلب غير موجود' });
    }
    
    res.json({ success: true, request });
  } catch (error) {
    console.error('❌ خطأ:', error);
    res.json({ success: false, error: error.message });
  }
});

/* ==================== ADMIN WORKERS MANAGEMENT ROUTES ==================== */

app.get('/api/admin/workers/stats', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const totalWorkers = await Worker.countDocuments();
    const availableWorkers = await Worker.countDocuments({ status: 'available' });
    const busyWorkers = await Worker.countDocuments({ status: 'busy' });
    const vacationWorkers = await Worker.countDocuments({ status: 'vacation' });
    
    const totalSalary = await Worker.aggregate([
      { $group: { _id: null, total: { $sum: '$salary' } } }
    ]);
    
    res.json({
      success: true,
      stats: {
        total: totalWorkers,
        available: availableWorkers,
        busy: busyWorkers,
        vacation: vacationWorkers,
        totalSalary: totalSalary[0]?.total || 0
      }
    });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.get('/api/admin/workers/all', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { status, search } = req.query;
    let filter = {};
    
    if (status && status !== 'all') {
      filter.status = status;
    }
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { job: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }
    
    const workers = await Worker.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, workers });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.post('/api/admin/workers', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { name, job, salary, image, status, phone, experience, location } = req.body;
    
    if (!name || !job || !salary) {
      return res.json({ success: false, error: 'الاسم والمسمى الوظيفي والراتب مطلوبة' });
    }
    
    const worker = new Worker({
      name,
      job,
      salary: Number(salary),
      image: image || '',
      status: status || 'available',
      phone: phone || '',
      experience: experience || 0,
      location: location || { lat: null, lng: null, address: '' }
    });
    
    await worker.save();
    res.json({ success: true, message: 'تم إضافة العامل بنجاح', worker });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.put('/api/admin/workers/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { name, job, salary, image, status, phone, experience, location } = req.body;
    
    const worker = await Worker.findByIdAndUpdate(
      req.params.id,
      {
        name,
        job,
        salary: Number(salary),
        image: image || '',
        status: status || 'available',
        phone: phone || '',
        experience: experience || 0,
        location: location || { lat: null, lng: null, address: '' }
      },
      { new: true }
    );
    
    if (!worker) {
      return res.json({ success: false, error: 'العامل غير موجود' });
    }
    
    res.json({ success: true, message: 'تم تحديث بيانات العامل', worker });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.delete('/api/admin/workers/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const worker = await Worker.findByIdAndDelete(req.params.id);
    if (!worker) {
      return res.json({ success: false, error: 'العامل غير موجود' });
    }
    res.json({ success: true, message: 'تم حذف العامل بنجاح' });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.get('/api/admin/workers/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (!worker) {
      return res.json({ success: false, error: 'العامل غير موجود' });
    }
    res.json({ success: true, worker });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

/* ==================== TEMPORARY FIX ROUTE ==================== */

// TEMPORARY: تصحيح حالة كل العمال (مرة واحدة)
app.get('/fix-all-workers-status', async (req, res) => {
  try {
    const result = await Worker.updateMany(
      { status: 'busy' },
      { $set: { status: 'available' } }
    );
    
    res.json({
      success: true,
      message: `تم تحديث ${result.modifiedCount} عامل إلى متاح`,
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

/* ==================== CREATE ADMIN USER (AUTO) ==================== */
(async function initAdmin() {
  try {
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const admin = new User({
        fullName: 'System Administrator',
        email: 'admin@example.com',
        phone: '01000000000',
        password: hashedPassword,
        role: 'admin'
      });
      await admin.save();
      console.log('✅ Admin user created successfully!');
      console.log('📧 Email: admin@example.com');
      console.log('🔑 Password: admin123');
    } else {
      console.log('✅ Admin user already exists');
    }
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
  }
})();

/* ==================== SETUP TEST WORKER ==================== */
(async function initTestWorker() {
  try {
    const workerExists = await Worker.findOne({ phone: '01000000000' });
    if (!workerExists) {
      const worker = new Worker({
        name: 'أحمد محمد',
        job: 'عامل نظافة',
        salary: 3000,
        phone: '01000000000',
        experience: 5,
        status: 'available',
        location: { lat: 31.1119, lng: 30.9400, address: 'كفر الشيخ' }
      });
      await worker.save();
      console.log('✅ Test worker created successfully!');
      console.log('👷 Worker Phone: 01000000000');
    } else {
      console.log('✅ Test worker already exists');
    }
  } catch (error) {
    console.error('❌ Error creating test worker:', error.message);
  }
})();

/* ==================== TEST ROUTE ==================== */

app.get('/api/test', (req, res) => {
  res.json({ message: '✅ السيرفر شغال يا باشا!' });
});

// Serve HTML pages
app.get('/admin-login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin-login.html'));
});

app.get('/admin-requests', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin-requests.html'));
});

app.get('/admin-workers', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin-workers.html'));
});

app.get('/booking', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'booking-with-worker.html'));
});

app.get('/worker-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'worker-dashboard.html'));
});

app.get('/customer-confirm', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'customer-confirm.html'));
});

app.get('/admin-bookings', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin-bookings.html'));
});

/* ==================== START SERVER ==================== */

const PORT = 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log('========================================');
  console.log('✅ Server running on port ' + PORT);
  console.log('🌐 http://localhost:' + PORT);
  console.log('🔐 Admin Login: http://localhost:' + PORT + '/admin-login');
  console.log('📋 Admin requests: http://localhost:' + PORT + '/admin-requests');
  console.log('👷 Admin workers: http://localhost:' + PORT + '/admin-workers');
  console.log('📝 Booking page: http://localhost:' + PORT + '/booking');
  console.log('👨‍🔧 Worker dashboard: http://localhost:' + PORT + '/worker-dashboard');
  console.log('✅ Customer confirm: http://localhost:' + PORT + '/customer-confirm');
  console.log('📋 Admin bookings: http://localhost:' + PORT + '/admin-bookings');
  console.log('========================================');
  console.log('🔑 Admin Login: admin@example.com / admin123');
  console.log('👷 Worker Login: 01000000000');
  console.log('========================================');
});