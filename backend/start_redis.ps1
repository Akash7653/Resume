Write-Host "Starting Redis using Docker..." -ForegroundColor Cyan
Set-Location $PSScriptRoot

docker-compose up -d redis

if ($LASTEXITCODE -ne 0) {
    Write-Host "`nDocker is not running or Redis container failed to start." -ForegroundColor Red
    Write-Host "`nPlease do one of the following:" -ForegroundColor Yellow
    Write-Host "1. Start Docker Desktop and run this script again"
    Write-Host "2. Install Redis for Windows from: https://github.com/microsoftarchive/redis/releases"
    Write-Host "3. Use WSL2 to run Redis"
    Write-Host "`nOr manually start Redis with: docker-compose up -d redis" -ForegroundColor Green
} else {
    Write-Host "Redis started successfully!" -ForegroundColor Green
    Start-Sleep -Seconds 2
    docker ps | Select-String "redis"
    Write-Host "`nRedis is ready on localhost:6379" -ForegroundColor Green
}

