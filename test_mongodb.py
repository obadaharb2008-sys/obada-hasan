import pymongo
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

# ⚠️ استبدل db_password بـ كلمة السر الحقيقية!
uri = "mongodb+srv://obadaharb2008_db_user:db_password@cluster0.ooueg66.mongodb.net/?retryWrites=true&w=majority"

# طريقة 1: اختبار سريع (Synchronous)
print("=" * 50)
print("اختبار Synchronous (السريع)")
print("=" * 50)

try:
    client = pymongo.MongoClient(uri, serverSelectionTimeoutMS=5000)
    client.admin.command('ping')
    print("✅ تم الاتصال بـ MongoDB بنجاح!")
    client.close()
except Exception as e:
    print(f"❌ خطأ في الاتصال: {e}")

print()

# طريقة 2: اختبار Async (ما يستخدمه المشروع)
print("=" * 50)
print("اختبار Async (المستخدم في المشروع)")
print("=" * 50)

async def test_async():
    try:
        client = AsyncIOMotorClient(uri)
        await client.admin.command('ping')
        print("✅ تم الاتصال بـ MongoDB بنجاح (Async)!")
        client.close()
    except Exception as e:
        print(f"❌ خطأ في الاتصال: {e}")

# شغل الـ async
asyncio.run(test_async())
