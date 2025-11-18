# Guía de Despliegue - BS Comunicaciones

## Información del Repositorio
- **URL del repositorio**: https://github.com/fercholink/Bs_comunicaciones_pagina.git
- **Rama principal**: main
- **Archivos principales**: index.html, style.css, script.js

## Configuración en el Panel de Hosting

### Para cPanel (más común):
1. Busca la sección **Git Version Control** o **Git Deploy**
2. Clic en "Create" o "Crear nuevo repositorio"
3. Configurar:
   - **Repository URL**: `https://github.com/fercholink/Bs_comunicaciones_pagina.git`
   - **Branch**: `main`
   - **Document Root**: `public_html` o la carpeta donde quieres el sitio
4. Clic en "Create" y luego "Deploy"

### Para Hostinger:
1. Ve a **Sitios web** → **Administrar**
2. Busca **Git** en el panel lateral
3. Clic en **Conectar repositorio**
4. Configurar:
   - **URL**: `https://github.com/fercholink/Bs_comunicaciones_pagina.git`
   - **Rama**: `main`
   - **Carpeta destino**: `public_html`
5. Activar **Auto deploy** para despliegue automático

### Para otros hostings:
1. Busca opciones como:
   - "Git Integration"
   - "Deploy from Git"
   - "Continuous Deployment"
   - "Source Control"
2. Usa siempre la URL: `https://github.com/fercholink/Bs_comunicaciones_pagina.git`

## Configuración de Webhook N8N
- **URL del webhook**: https://n8n.srv966239.hstgr.cloud/webhook/chatbot_bs
- **Método**: POST
- **Tipo**: application/json

## Archivos importantes:
- `index.html` - Página principal
- `style.css` - Estilos del sitio
- `script.js` - Funcionalidad del chatbot
- `img/` - Carpeta de imágenes

## Para actualizaciones futuras:
```bash
# Hacer cambios en los archivos localmente
git add .
git commit -m "Descripción del cambio"
git push
```

El hosting se actualizará automáticamente si tienes configurado el auto-deploy.