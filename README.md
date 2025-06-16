# 📱 Calculadora Series Uniformes - PWA

Una calculadora financiera moderna para series uniformes, desarrollada como Progressive Web App (PWA) que puede instalarse en dispositivos móviles y funcionar offline.

## ✨ Características

- 🧮 **Calculadora completa**: Calcula P, F, A, i, n para series uniformes
- 📱 **PWA**: Instalable en dispositivos móviles
- 🌐 **Offline**: Funciona sin conexión a internet
- 🎨 **Diseño moderno**: Interfaz atractiva con gradientes animados
- 📊 **Responsivo**: Se adapta a cualquier tamaño de pantalla
- ⚡ **Rápido**: Construido con React + Vite

## 🚀 Despliegue en Vercel

### Opción 1: Despliegue directo desde GitHub

1. Sube tu código a un repositorio de GitHub
2. Ve a [vercel.com](https://vercel.com) y crea una cuenta
3. Haz clic en "New Project"
4. Importa tu repositorio de GitHub
5. Vercel detectará automáticamente que es un proyecto Vite
6. Haz clic en "Deploy"

### Opción 2: Despliegue con Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Hacer login
vercel login

# Desplegar
vercel

# Para producción
vercel --prod
```

## 📱 Instalación como App Móvil

Una vez desplegado en Vercel, los usuarios podrán:

1. **En Android (Chrome/Edge)**:

   - Visitar la URL de tu app
   - Aparecerá un botón "Instalar App" en la esquina superior derecha
   - O usar el menú del navegador → "Instalar app" o "Agregar a pantalla de inicio"

2. **En iOS (Safari)**:

   - Visitar la URL de tu app
   - Tocar el botón de compartir (cuadrado con flecha hacia arriba)
   - Seleccionar "Agregar a pantalla de inicio"

3. **En Desktop**:
   - Aparecerá un ícono de instalación en la barra de direcciones
   - O usar el menú del navegador para instalar

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de la build
npm run preview
```

## 📁 Estructura del Proyecto

```
├── public/
│   ├── icons/           # Iconos PWA generados
│   ├── manifest.json    # Configuración PWA
│   ├── sw.js           # Service Worker
│   └── favicon.svg     # Favicon
├── src/
│   ├── components/
│   │   ├── SeriesUniformsCalculator.jsx
│   │   └── InstallPWA.jsx
│   ├── App.jsx
│   └── main.jsx
└── index.html          # HTML principal con meta tags PWA
```

## 🔧 Configuración PWA

La aplicación incluye:

- ✅ **Manifest.json**: Configuración de la app (nombre, iconos, colores)
- ✅ **Service Worker**: Para funcionalidad offline
- ✅ **Iconos**: Múltiples tamaños para diferentes dispositivos
- ✅ **Meta tags**: Para iOS y Android
- ✅ **Botón de instalación**: Componente React personalizado

## 🌟 Características Técnicas

- **Framework**: React 19 + Vite
- **Estilos**: Tailwind CSS
- **PWA**: Manifest + Service Worker
- **Iconos**: SVG escalables
- **Responsivo**: Mobile-first design
- **Offline**: Cache de recursos estáticos

## 📊 Fórmulas Implementadas

### Valor Presente

```
P = A × [1 - (1 + i)^(-n)] / i
```

### Valor Futuro

```
F = A × [(1 + i)^n - 1] / i
```

### Anualidad desde P

```
A = P × i / [1 - (1 + i)^(-n)]
```

### Anualidad desde F

```
A = F × i / [(1 + i)^n - 1]
```

## 🎯 Uso

1. Selecciona la variable que deseas calcular (P, F, A, i, n)
2. Para A, i, n: elige si usar Valor Presente o Futuro
3. Ingresa los valores conocidos
4. Haz clic en "CALCULAR"
5. Ve el resultado con la fórmula utilizada

## 📱 Instalación Móvil - Detalles

Cuando los usuarios visiten tu app desplegada en Vercel:

- **Detección automática**: La app detecta si puede ser instalada
- **Botón personalizado**: Aparece "Instalar App" cuando está disponible
- **Experiencia nativa**: Una vez instalada, se comporta como una app nativa
- **Icono en escritorio**: Aparece en la pantalla de inicio del dispositivo
- **Splash screen**: Pantalla de carga personalizada
- **Modo standalone**: Se ejecuta sin la barra del navegador

## 🔍 Verificación PWA

Para verificar que tu PWA está correctamente configurada:

1. Abre Chrome DevTools (F12)
2. Ve a la pestaña "Application"
3. Revisa:
   - **Manifest**: Debe mostrar toda la información
   - **Service Workers**: Debe estar registrado y activo
   - **Storage**: Debe mostrar el cache

## 🚀 ¡Listo para usar!

Tu calculadora ahora es una PWA completa que puede ser instalada en cualquier dispositivo y funcionar offline. ¡Perfecto para estudiantes y profesionales de finanzas!
