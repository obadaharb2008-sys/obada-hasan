# 🚀 БЫСТРЫЙ СТАРТ: Развернуть за 15 минут

> ⏱️ Это краткая версия. Для деталей смотрите DEPLOYMENT_GUIDE.md

## 1️⃣ Получите MongoDB Connection String (2 мин)

```
1. Откройте https://www.mongodb.com/cloud/atlas
2. Создайте/найдите ваш кластер
3. Нажмите "Connect"
4. Выберите "Drivers"
5. Скопируйте Connection String
   mongodb+srv://USERNAME:PASSWORD@cluster0...
```

## 2️⃣ Получите OpenAI API Key (1 мин)

```
1. Откройте https://platform.openai.com/account/api-keys
2. Нажмите "Create new secret key"
3. Скопируйте (начинается с sk-)
```

## 3️⃣ Push в GitHub (2 мин)

```bash
cd c:\Users\Obada\OneDrive\Desktop\py\BTEC

git add .
git commit -m "🚀 Ready for deployment"
git push origin main
```

## 4️⃣ Deploy на Render (2 мин)

```
1. Откройте https://dashboard.render.com
2. Нажмите "New" → "Blueprint"
3. Выберите ваш репозиторий
4. Нажмите "Create New"
5. Ждите...
```

## 5️⃣ Добавьте Environment Variables (5 мин)

**Backend Service:**
```
MONGO_URL = mongodb+srv://username:password@cluster0...
DB_NAME = portfolio_db
CORS_ORIGINS = https://obada-portfolio-frontend.onrender.com
OPENAI_API_KEY = sk-...
ENVIRONMENT = production
```

**Frontend Service:**
- Переменные скопируются автоматически

## 6️⃣ Дождитесь Deploy (5 мин)

Смотрите Logs в Render Dashboard

## 7️⃣ Проверьте

```bash
# В браузере откройте:
https://obada-portfolio-frontend.onrender.com

# Проверьте Backend:
curl https://obada-portfolio-backend.onrender.com/api/health
```

---

## ✅ Готово!

Ваш сайт на:
- **Frontend:** `https://obada-portfolio-frontend.onrender.com`
- **Backend:** `https://obada-portfolio-backend.onrender.com/api`

---

## 🆘 Если не работает

1. **Проверьте Render Logs** (Dashboard → Logs)
2. **Проверьте Environment Variables** (Dashboard → Environment)
3. **Проверьте MongoDB IP Whitelist** - должна быть "0.0.0.0/0"

---

**Нужны детали?** → Смотрите `DEPLOYMENT_GUIDE.md`

**Потеряли шаг?** → Смотрите `DEPLOYMENT_CHECKLIST.md`