# 💻 أوامر Terminal للتفعيل والنشر

---

## 🔧 قبل البدء

### متطلبات النظام

تأكد من تثبيت:
- **Python 3.11+**
- **Node.js 18+**
- **Git**

تحقق:
```bash
python --version
node --version
git --version
```

---

## 📦 الإعداد الأول (مرة واحدة فقط)

### 1️⃣ استخراج المشروع أو فتح Folder

```bash
# أنتقل إلى مجلد المشروع
cd path/to/py
```

### 2️⃣ تفعيل بيئة Python الافتراضية

#### على Windows (CMD):
```bash
.venv\Scripts\activate.bat
```

#### على Windows (PowerShell):
```bash
.venv\Scripts\Activate.ps1
```

#### على Mac/Linux:
```bash
source .venv/bin/activate
```

**بعدها ستريد `(venv)` في بداية السطر** ✅

### 3️⃣ تثبيت المكتبات

```bash
# تثبيت dependencies الـ Backend
pip install -r app/backend/requirements.txt

# تثبيت dependencies الـ Frontend
cd app/frontend
npm install
cd ../../
```

---

## ⚙️ إعداد متغيرات البيئة

### Backend

```bash
# تأكد من وجود .env في app/backend/
# افتح app/backend/.env وأضف:

# استخدم هذا Format:
# MONGO_URL="mongodb+srv://admin:password@cluster0.mongodb.net/portfolio_db?retryWrites=true&w=majority"
# DB_NAME="portfolio_db"
# CORS_ORIGINS="http://localhost:3000,http://localhost:5000"
# CHATBASE_CHATBOT_ID="gWvWe8QFeq_IVVm0vDONf"
# ENVIRONMENT="development"
```

### Frontend

```bash
# تأكد من وجود .env في app/frontend/
# افتح app/frontend/.env وأضف:

# REACT_APP_API_URL=http://localhost:5000/api
# WDS_SOCKET_PORT=3000
```

---

## 🚀 التشغيل المحلي (Development)

### التشغيل الكامل (Backend + Frontend)

#### Terminal 1 - Backend:
```bash
# تأكد من أنك في المجلد الرئيسي
cd path/to/py

# تفعيل البيئة الافتراضية
.venv\Scripts\activate.bat

# شغل Backend على Port 5000
cd app/backend
python -m uvicorn server:app --reload --port 5000
```

#### Terminal 2 - Frontend (جديد):
```bash
# تأكد من أنك في المجلد الرئيسي
cd path/to/py

# شغل Frontend على Port 3000
cd app/frontend
npm start
```

### النتيجة:
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:3000`

---

## ✅ اختبار الاتصال

بعد التشغيل، اختبر في Terminal جديد:

```bash
# اختبار Backend Health
curl http://localhost:5000/api/health

# يجب أن ترى:
# {"status": "healthy", "database": "connected"}

# اختبار Chat
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d "{\"message\": \"Hello\", \"language\": \"en\"}"
```

---

## 🔄 بعد كل تعديل

### لا تحتاج تفعيل البيئة مجدداً (إذا كانت مفعلة):

```bash
# Backend يعيد التحميل تلقائياً (--reload)
# Frontend يعيد البناء تلقائياً

# فقط احفظ الملف وسيحدث التغيير
```

---

## 🌐 النشر على Render

### الخطوة 1: تجهيز Git

```bash
# تأكد من كل شيء محفوظ
git status

# أضف كل التعديلات
git add -A

# اكتب رسالة
git commit -m "Configure for Render with Chatbase and MongoDB"

# ادفع إلى GitHub
git push origin main
```

### الخطوة 2: أنشئ الخدمات على Render

#### الطريقة 1: البلوبرينت (الأسهل) ✅

```bash
# لا تحتاج أوامر، افعلها على الـ Dashboard:

# 1. اذهب إلى: https://dashboard.render.com
# 2. اضغط "New" → "Blueprint"
# 3. ربط مستودعك على GitHub
# 4. اضغط "Create"
# Render سيقرأ render.yaml تلقائياً وسينشئ كل شيء
```

#### الطريقة 2: يدوي (للتحكم الكامل)

```bash
# 1. اذهب إلى: https://dashboard.render.com
# 2. اضغط "New" → "Web Service"
# 3. ربط GitHub
# 4. اختر Repository
# 5. أضف الإعدادات:

# للـ Backend:
# Name: obada-portfolio-backend
# Runtime: Python 3.11
# Build Command: pip install -r app/backend/requirements.txt
# Start Command: cd app && uvicorn backend.server:app --host 0.0.0.0 --port $PORT --workers 4

# للـ Frontend:
# Name: obada-portfolio-frontend
# Runtime: Node
# Build Command: cd app/frontend && npm install && npm run build
# Start Command: cd app/frontend && npm install -g serve && serve -s build -l 3000
```

### الخطوة 3: أضف متغيرات البيئة (Environment Variables)

#### في لوحة تحكم Backend على Render:

```
اضغط على Service → Environment

أضف:

PYTHONUNBUFFERED = 1
ENVIRONMENT = production
CORS_ORIGINS = *
MONGO_URL = (انسخ من MongoDB Atlas)
DB_NAME = portfolio_db
CHATBASE_CHATBOT_ID = gWvWe8QFeq_IVVm0vDONf
```

#### في لوحة تحكم Frontend على Render:

```
NODE_ENV = production
REACT_APP_API_URL = (سيكون اسم Backend service + /api)
```

---

## 🧪 التحقق من النشر

```bash
# بعد انتهاء النشر (يستغرق 5-10 دقائق)

# اختبر Backend Health
curl https://your-backend-service.onrender.com/api/health

# يجب أن ترى:
# {"status": "healthy", "database": "connected"}

# اختبر القائمة الأمامية
# افتح: https://your-frontend-service.onrender.com
```

---

## 🔍 فحص السجلات (Logs)

### محلياً:
```bash
# السجلات تظهر مباشرة في Terminal
# ابحث عن الأخطاء (ERROR)
```

### على Render:
```bash
# في لوحة التحكم:
# Service → Logs
# ستريد كل الرسائل (معلومات + أخطاء)
```

---

## 🛑 إيقاف الخوادم

### Stop Backend:
```bash
# في Terminal 1
Ctrl + C
```

### Stop Frontend:
```bash
# في Terminal 2
Ctrl + C
```

### إلغاء تفعيل البيئة الافتراضية:
```bash
deactivate
```

---

## 🔄 إعادة التشغيل

```bash
# إذا حدثت مشاكل، أعد التشغيل:

# 1. أيقف كل شيء (Ctrl+C)
# 2. تفعيل البيئة مجدداً
.venv\Scripts\activate.bat

# 3. شغل مرة أخرى
cd app/backend
python -m uvicorn server:app --reload --port 5000
```

---

## 📋 قائمة سريعة

| المهمة | الأمر |
|------|------|
| تفعيل البيئة | `.venv\Scripts\activate.bat` |
| تثبيت المكتبات | `pip install -r app/backend/requirements.txt` |
| تشغيل Backend | `python -m uvicorn app.backend.server:app --reload` |
| تشغيل Frontend | `cd app/frontend && npm start` |
| دفع إلى GitHub | `git push origin main` |
| اختبار Backend | `curl http://localhost:5000/api/health` |

---

## ✨ كل شيء جاهز!

اتبع هذه الأوامر وسيكون مشروعك يعمل بنجاح! 🎉

```bash
# الملخص:
1. .venv\Scripts\activate.bat
2. pip install -r app/backend/requirements.txt
3. (في Terminal آخر) cd app/frontend && npm install
4. شغل Backend و Frontend
5. اختبر على localhost
6. git push origin main
7. انشر على Render
```

---

**احتج بهذا الملف أي وقت تحتاج الأوامر!** 📚
