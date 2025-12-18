# 🔧 Configuración Git en cPanel - BS Comunicaciones

## 📋 Comandos para Terminal de cPanel

### 1. Configurar Usuario Git
```bash
git config --global user.name "fercholink"
git config --global user.email "f_nis88@hotmail.com"
```

### 2. Conectar con tu repositorio
```bash
# Si creas repositorio nuevo
git remote add origin https://github.com/fercholink/Bs_comunicaciones_pagina.git

# Si ya existe, verificar
git remote -v
```

### 3. Subir cambios al hosting
```bash
# Agregar todos los archivos
git add .

# Crear commit
git commit -m "Deploy página web BS Comunicaciones con chatbot"

# Subir a GitHub
git push origin main

# Bajar cambios al hosting (si es necesario)
git pull origin main
```

## 🔑 Autenticación GitHub

### Opción 1: Token de Acceso Personal
1. Ve a GitHub.com → Settings → Developer settings → Personal access tokens
2. Genera un nuevo token con permisos de repositorio
3. Usa el token como contraseña cuando Git te la pida

### Opción 2: SSH Key (más seguro)
```bash
# Generar clave SSH en cPanel
ssh-keygen -t rsa -b 4096 -C "f_nis88@hotmail.com"

# Mostrar clave pública para agregar a GitHub
cat ~/.ssh/id_rsa.pub
```

## 📁 Estructura de archivos para deploy
```
public_html/
├── index.html
├── style.css  
├── script.js
├── manifest.json
├── robots.txt
├── sitemap.xml
├── .htaccess
├── whatsapp-verification.html
└── img/
    ├── logo-bs.png
    ├── desarrollo.png
    ├── ia.png
    ├── redes.png
    └── servidores.png
```

## ⚡ Comandos de Deploy Automático

### Deploy completo
```bash
#!/bin/bash
# Script de deploy automático

# Bajar últimos cambios
git pull origin main

# Verificar archivos
ls -la

# Reiniciar servicios si es necesario
# (depende del hosting)
```

## 🔧 Troubleshooting

### Error de autenticación
```bash
# Si falla la autenticación
git config --global credential.helper store
git pull origin main  # Te pedirá credenciales una vez
```

### Error de permisos
```bash
# Verificar permisos de archivos
chmod 644 *.html *.css *.js
chmod 755 img/
```

### URL del repositorio
- **HTTPS**: `https://github.com/fercholink/Bs_comunicaciones_pagina.git`  
- **SSH**: `git@github.com:fercholink/Bs_comunicaciones_pagina.git`

## 📞 Datos del repositorio
- **Owner**: fercholink
- **Repository**: Bs_comunicaciones_pagina  
- **Branch**: main
- **Archivos principales**: index.html, style.css, script.js