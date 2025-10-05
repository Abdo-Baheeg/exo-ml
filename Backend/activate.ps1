# Activate Virtual Environment - Windows PowerShell
# Run this script with: .\activate.ps1

Write-Host "🐍 Activating Python Virtual Environment..." -ForegroundColor Cyan

# Activate the virtual environment
& "$PSScriptRoot\venv\Scripts\Activate.ps1"

Write-Host "✅ Virtual environment activated!" -ForegroundColor Green
Write-Host ""
Write-Host "📦 Installed packages:" -ForegroundColor Yellow
python -m pip list | Select-Object -First 10

Write-Host ""
Write-Host "🚀 To start the backend server, run:" -ForegroundColor Cyan
Write-Host "   python app.py" -ForegroundColor White
Write-Host ""
Write-Host "💡 To deactivate, run:" -ForegroundColor Cyan
Write-Host "   deactivate" -ForegroundColor White
