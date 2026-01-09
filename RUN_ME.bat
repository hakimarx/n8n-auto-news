@echo off
echo -----------------------------------------
echo 🚀 Menjalankan AI News Automation System...
echo -----------------------------------------

:: 1. Cek Docker
docker ps >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ERROR: Docker Desktop belum jalan!
    echo Silakan buka Docker Desktop dulu, lalu jalankan file ini lagi.
    pause
    exit /b
)

:: 2. Jalankan Docker Services
echo 📦 Menjalankan Database, n8n, dan WhatsApp API...
docker-compose up -d

:: 3. Jalankan Backend (News API)
echo ⚙️ Menjalankan News API...
start /min cmd /c "cd server && npm start"

:: 4. Jalankan Frontend (News Portal)
echo 🌐 Menjalankan News Portal...
start /min cmd /c "cd portal && npm run dev"

echo -----------------------------------------
echo ✅ SEMUA BERHASIL DIJALANKAN!
echo -----------------------------------------
echo 📰 Portal Berita: http://localhost:5173
echo 🤖 n8n (Otomasi): http://localhost:5678
echo -----------------------------------------
echo JANGAN TUTUP JENDELA INI AGAR SISTEM TETAP JALAN.
pause
