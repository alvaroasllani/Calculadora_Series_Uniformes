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




