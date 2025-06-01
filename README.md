# 📊 Calculadora de Series Uniformes

Una calculadora web moderna e interactiva para cálculos financieros de series uniformes, desarrollada con React y TailwindCSS.

## ✨ Características

- **Cálculos completos**: Calcula cualquier variable (P, F, A, i, n) conociendo las demás
- **Interfaz moderna**: Diseño futurista con gradientes animados
- **Validación en tiempo real**: Verificación de datos de entrada
- **Fórmulas visibles**: Muestra la fórmula utilizada en cada cálculo
- **Responsive**: Se adapta a cualquier dispositivo
- **Método iterativo**: Cálculo preciso de tasas de interés

## 🧮 Variables que calcula

- **P (Valor Presente)**: Valor actual de la serie de pagos
- **F (Valor Futuro)**: Valor futuro de la serie de pagos
- **A (Anualidad)**: Monto de cada pago periódico
- **i (Tasa de Interés)**: Tasa de interés por período (%)
- **n (Períodos)**: Número total de períodos

## 🚀 Instalación y uso

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/alvaroasllani/Calculadora_Series_Uniformes.git

# Navegar al directorio
cd Calculadora_Series_Uniformes

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🔧 Tecnologías utilizadas

- **React 19**: Biblioteca de JavaScript para la interfaz de usuario
- **TailwindCSS 3.3**: Framework de CSS para el diseño
- **Vite**: Herramienta de construcción y desarrollo
- **PostCSS**: Procesamiento de CSS

## 📐 Fórmulas implementadas

### Valor Presente

```
P = A × [1 - (1 + i)⁻ⁿ] / i
```

### Valor Futuro

```
F = A × [(1 + i)ⁿ - 1] / i
```

### Anualidad desde Valor Presente

```
A = P × i / [1 - (1 + i)⁻ⁿ]
```

### Anualidad desde Valor Futuro

```
A = F × i / [(1 + i)ⁿ - 1]
```

## 🎯 Casos de uso

- Cálculo de préstamos y financiamientos
- Análisis de inversiones periódicas
- Planificación de ahorros
- Evaluación de rentas y anualidades
- Estudios de ingeniería económica

## 🛠️ Comandos disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Construcción para producción
npm run preview  # Vista previa de la construcción
npm run lint     # Verificación de código
```

## 📱 Capturas de pantalla

La calculadora presenta una interfaz moderna con:

- Fondo dinámico con gradientes animados
- Selector intuitivo de variables
- Campos de entrada validados
- Resultados con fórmulas explicativas

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Álvaro Asllani**

- GitHub: [@alvaroasllani](https://github.com/alvaroasllani)

---

⭐ ¡Si este proyecto te fue útil, no olvides darle una estrella!
