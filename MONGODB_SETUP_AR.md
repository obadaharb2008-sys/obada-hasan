# 🗄️ شرح MongoDB Atlas - الطريقة الاحترافية

## ❓ ما هو MongoDB؟

قاعدة بيانات سحابية تخزن البيانات بصيغة JSON. تماماً كما تحفظ البيانات في ملفات، لكنها احترافية وموثوقة.

---

## 📝 الخطوات العملية

### الخطوة 1️⃣: إنشاء حساب MongoDB Atlas

1. اذهب إلى: **https://www.mongodb.com/cloud/atlas**

2. اضغط على **"Sign up"** (التسجيل)
   - أدخل بريدك الإلكتروني
   - ضع كلمة المرور
   - اختر "Create Account"

3. تأكيد البريد الإلكتروني
   - ستصل رسالة تأكيد
   - اضغط على رابط التأكيد

---

### الخطوة 2️⃣: إنشاء Organization و Project

بعد التسجيل:

1. **إنشاء Organization**
   - اترك الاسم الافتراضي أو غيره
   - اضغط "Create Organization"

2. **إنشاء Project**
   - اضغط "Create Project"
   - الاسم مثل: `portfolio` أو `my-app`
   - اضغط "Next"
   - اضغط "Create Project"

---

### الخطوة 3️⃣: إنشاء Cluster (السيرفر)

1. اضغط **"Build a Database"** أو **"Create"**

2. اختر **Free Tier** (المجاني)
   - اضغط "Create"

3. اختر الإعدادات:
   - **Provider**: AWS
   - **Region**: اختر الأقرب لك (مثلاً `eu-west-1` للشرق الأوسط أو `us-east-1`)
   - اضغط "Create Cluster"

4. **انتظر 2-3 دقائق** حتى ينتهي الإنشاء

---

### الخطوة 4️⃣: إنشاء Database User

بعد الانتهاء من الـ Cluster:

1. اضغط على **"Database Access"** (من القائمة اليسارية)

2. اضغط **"Add New Database User"**

3. اختر **"Username and Password"**

4. أدخل:
   - **Username**: `admin` (أو أي اسم تختاره)
   - **Password**: `Strong_Password_123!` (اختر كلمة قوية)
   - **Role**: `Atlas admin`

5. اضغط **"Add User"**

---

### الخطوة 5️⃣: إضافة IP Address

1. اضغط على **"Network Access"** (من القائمة اليسارية)

2. اضغط **"Add IP Address"**

3. اختر **"Allow access from anywhere"** (للاختبار)
   - أدخل: `0.0.0.0/0`
   - اضغط "Confirm"

---

### الخطوة 6️⃣: الحصول على Connection String

1. اضغط على **"Clusters"** (من القائمة اليسارية)

2. اضغط على زر **"Connect"** بجانب اسم الـ Cluster

3. اختر **"Connect your application"**

4. اختر:
   - **Driver**: Python
   - **Version**: 3.12 or later

5. سترى String مشابه لهذا:
   ```
   mongodb+srv://admin:YOUR_PASSWORD@cluster0.mongodb.net/?retryWrites=true&w=majority
   ```

6. **استبدل**:
   - `admin` بـ Username الخاص بك
   - `YOUR_PASSWORD` بـ Password الخاص بك

**مثال النهائي:**
```
mongodb+srv://admin:Strong_Password_123@cluster0.mongodb.net/portfolio_db?retryWrites=true&w=majority
```

---

## 🔑 معلومات الوصول (حفظها في مكان آمن!)

بعد الانتهاء، احفظ:

```
Username: admin
Password: Strong_Password_123!
Connection String: mongodb+srv://admin:Strong_Password_123@cluster0.mongodb.net/portfolio_db?retryWrites=true&w=majority
Database Name: portfolio_db
```

---

## 🚀 استخدام MongoDB في مشروعك

### محلياً (للاختبار والتطوير)

في ملف `.env`:
```
MONGO_URL="mongodb+srv://admin:Strong_Password_123@cluster0.mongodb.net/portfolio_db?retryWrites=true&w=majority"
DB_NAME="portfolio_db"
```

### على Render (للإنتاج)

في لوحة تحكم Render:
```
MONGO_URL = mongodb+srv://admin:Strong_Password_123@cluster0.mongodb.net/portfolio_db?retryWrites=true&w=majority
DB_NAME = portfolio_db
```

---

## ✅ اختبار الاتصال

بعد إضافة `MONGO_URL` في `.env`:

```bash
# تشغيل السيرفر
python -m uvicorn app.backend.server:app --reload

# في متصفح آخر أو Terminal آخر:
curl http://localhost:5000/api/health
```

ستحصل على:
```json
{"status": "healthy", "database": "connected"}
```

إذا رأيت `connected` ✅ فالاتصال نجح!

---

## 🛡️ نصائح أمان

⚠️ **لا تشارك معلومات الوصول!**

1. ضع Password قوي (أحرف + أرقام + رموز)
2. لا تكتب Password مباشرة في الكود
3. استخدم `.env` و أضفه إلى `.gitignore`
4. في Render، استخدم "Secrets" أو Environment Variables

---

## 🐛 استكشاف الأخطاء

### "Connection refused"
- تحقق من Connection String
- تأكد من إضافة IP Address

### "Authentication failed"
- تحقق من Username و Password
- تأكد من تطابق الأحرف الكبيرة والصغيرة

### "Cluster not found"
- انتظر قليلاً بعد الإنشاء
- أعد تحميل الصفحة

---

## 📊 مراقبة البيانات

للمسح على قاعدتك:

1. اضغط على **"Collections"** في Dashboard
2. ستريد جميع البيانات المخزنة
3. يمكنك حذف أو إضافة البيانات مباشرة

---

## 🎯 ملخص سريع

| الخطوة | ماذا تفعل |
|------|---------|
| 1 | اذهب إلى MongoDB.com وسجل |
| 2 | أنشئ Organization و Project |
| 3 | أنشئ Cluster مجاني |
| 4 | أنشئ Database User (admin + password) |
| 5 | أضف IP Address |
| 6 | انسخ Connection String |
| 7 | أضفها في `.env` |
| 8 | شغل المشروع واختبره |

---

**تهانينا! MongoDB جاهز الآن!** 🎉
