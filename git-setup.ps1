# Git Setup and Push Script for mycash+
# Run this after restarting VS Code/Terminal

Write-Host "🚀 Iniciando configuração Git..." -ForegroundColor Cyan

# Verify Git is available
try {
    $gitVersion = git --version
    Write-Host "✅ Git encontrado: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git não encontrado. Por favor, reinicie o VS Code." -ForegroundColor Red
    exit 1
}

# Initialize repository
Write-Host "`n📦 Inicializando repositório..." -ForegroundColor Cyan
git init

# Configure user
Write-Host "`n👤 Configurando usuário..." -ForegroundColor Cyan
git config user.name "Felipe Amorim"
git config user.email "felipeamorim1@users.noreply.github.com"

# Add all files (respecting .gitignore)
Write-Host "`n📁 Adicionando arquivos (.env será ignorado)..." -ForegroundColor Cyan
git add .

# Show status
Write-Host "`n📊 Status dos arquivos:" -ForegroundColor Cyan
git status --short

# Commit
Write-Host "`n💾 Fazendo commit inicial..." -ForegroundColor Cyan
git commit -m "Initial commit: mycash+ complete project

- React 18 + TypeScript + Vite
- TailwindCSS with ANTIGRAVITY design system
- Supabase integration ready
- 36 components created
- Responsive layout (mobile-first)
- Complete utility layer with JSDoc
- Global animations system
- README with full documentation"

# Rename branch to main
Write-Host "`n🌿 Renomeando branch para 'main'..." -ForegroundColor Cyan
git branch -M main

# Add remote
Write-Host "`n🔗 Configurando remote..." -ForegroundColor Cyan
git remote add origin https://github.com/felipeamorim1/dasboard-mycash.git

# Push to GitHub
Write-Host "`n🚀 Fazendo push para GitHub..." -ForegroundColor Cyan
Write-Host "⚠️  Você pode precisar autenticar via browser..." -ForegroundColor Yellow
git push -u origin main

Write-Host "`n✅ Concluído! Verifique: https://github.com/felipeamorim1/dasboard-mycash" -ForegroundColor Green
