@echo off
echo Starting Redis using Docker...
cd /d %~dp0
docker-compose up -d redis
if %errorlevel% neq 0 (
    echo.
    echo Docker is not running or Redis container failed to start.
    echo.
    echo Please do one of the following:
    echo 1. Start Docker Desktop and run this script again
    echo 2. Install Redis for Windows from: https://github.com/microsoftarchive/redis/releases
    echo 3. Use WSL2 to run Redis
    echo.
    pause
) else (
    echo Redis started successfully!
    echo Checking connection...
    timeout /t 2 /nobreak >nul
    docker ps | findstr redis
    echo.
    echo Redis is ready on localhost:6379
)
pause

