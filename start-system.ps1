# Start Docker Services (n8n & Evolution API)
Write-Host "Starting Docker services..." -ForegroundColor Cyan
docker-compose up -d

# Install dependencies and start Backend Server
Write-Host "Starting News API Server..." -ForegroundColor Cyan
cd server
npm install
Start-Process powershell -ArgumentList "npm start" -WindowStyle Minimized
cd ..

# Install dependencies and start Frontend Portal
Write-Host "Starting News Portal..." -ForegroundColor Cyan
cd portal
npm install
npm run dev
