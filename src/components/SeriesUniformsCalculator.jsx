import React, { useState } from "react";

const SeriesUniformsCalculator = () => {
  const [values, setValues] = useState({
    P: "",
    F: "",
    A: "",
    i: "",
    n: "",
  });
  const [findVariable, setFindVariable] = useState("P");
  const [usePresent, setUsePresent] = useState(true); // Para A, i, n: usar P (true) o F (false)
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});

  // Funciones para calcular cada variable
  const calculateP = (A, i, n) => {
    const rate = i / 100;
    return (A * (1 - Math.pow(1 + rate, -n))) / rate;
  };

  const calculateF = (A, i, n) => {
    const rate = i / 100;
    return (A * (Math.pow(1 + rate, n) - 1)) / rate;
  };

  const calculateA_fromP = (P, i, n) => {
    const rate = i / 100;
    return (P * rate) / (1 - Math.pow(1 + rate, -n));
  };

  const calculateA_fromF = (F, i, n) => {
    const rate = i / 100;
    return (F * rate) / (Math.pow(1 + rate, n) - 1);
  };

  const calculateN_fromP = (P, A, i) => {
    const rate = i / 100;
    return -Math.log(1 - (P * rate) / A) / Math.log(1 + rate);
  };

  const calculateN_fromF = (F, A, i) => {
    const rate = i / 100;
    return Math.log(1 + (F * rate) / A) / Math.log(1 + rate);
  };

  const calculateI_iterative = (knownValues, findVar, fromPresent) => {
    let i = 0.01;
    let step = 0.001;
    let tolerance = 0.01;
    let maxIterations = 10000;

    for (let iter = 0; iter < maxIterations; iter++) {
      let calculated;

      if (fromPresent && knownValues.P && knownValues.A && knownValues.n) {
        calculated = calculateP(knownValues.A, i * 100, knownValues.n);
        if (Math.abs(calculated - knownValues.P) < tolerance) return i * 100;
        if (calculated > knownValues.P) i -= step;
        else i += step;
      } else if (
        !fromPresent &&
        knownValues.F &&
        knownValues.A &&
        knownValues.n
      ) {
        calculated = calculateF(knownValues.A, i * 100, knownValues.n);
        if (Math.abs(calculated - knownValues.F) < tolerance) return i * 100;
        if (calculated > knownValues.F) i -= step;
        else i += step;
      }

      if (i <= 0) i = 0.001;
      if (i > 1) i = 1;
    }

    return i * 100;
  };

  const handleInputChange = (field, value) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const getRequiredFields = () => {
    if (["A", "i", "n"].includes(findVariable)) {
      // Para A, i, n necesitamos 3 campos: el opuesto a findVariable + P o F + los otros
      const baseFields = ["A", "i", "n"].filter(
        (field) => field !== findVariable
      );
      const valueField = usePresent ? "P" : "F";
      return [...baseFields, valueField];
    } else {
      // Para P o F necesitamos solo A, i, n (no el otro valor P/F)
      return ["A", "i", "n"];
    }
  };

  const validateInputs = () => {
    const newErrors = {};
    const requiredFields = getRequiredFields();

    requiredFields.forEach((field) => {
      if (
        !values[field] ||
        isNaN(values[field]) ||
        parseFloat(values[field]) <= 0
      ) {
        newErrors[field] = "Este campo es requerido";
      }
    });

    // Validaciones específicas
    if (
      values.n &&
      (parseFloat(values.n) % 1 !== 0 || parseFloat(values.n) <= 0)
    ) {
      newErrors.n = "Debe ser un número entero mayor a 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validateInputs()) {
      setResult(null);
      return;
    }

    const knownValues = {};
    getRequiredFields().forEach((field) => {
      knownValues[field] = parseFloat(values[field]);
    });

    let calculatedResult;
    let formula = "";

    try {
      switch (findVariable) {
        case "P":
          calculatedResult = calculateP(
            knownValues.A,
            knownValues.i,
            knownValues.n
          );
          formula = `P = ${knownValues.A} × [1 - (1 + ${
            knownValues.i / 100
          })^(-${knownValues.n})] / ${knownValues.i / 100}`;
          break;
        case "F":
          calculatedResult = calculateF(
            knownValues.A,
            knownValues.i,
            knownValues.n
          );
          formula = `F = ${knownValues.A} × [(1 + ${knownValues.i / 100})^${
            knownValues.n
          } - 1] / ${knownValues.i / 100}`;
          break;
        case "A":
          if (usePresent) {
            calculatedResult = calculateA_fromP(
              knownValues.P,
              knownValues.i,
              knownValues.n
            );
            formula = `A = ${knownValues.P} × ${
              knownValues.i / 100
            } / [1 - (1 + ${knownValues.i / 100})^(-${knownValues.n})]`;
          } else {
            calculatedResult = calculateA_fromF(
              knownValues.F,
              knownValues.i,
              knownValues.n
            );
            formula = `A = ${knownValues.F} × ${knownValues.i / 100} / [(1 + ${
              knownValues.i / 100
            })^${knownValues.n} - 1]`;
          }
          break;
        case "n":
          if (usePresent) {
            calculatedResult = calculateN_fromP(
              knownValues.P,
              knownValues.A,
              knownValues.i
            );
            formula = `n = -ln(1 - (${knownValues.P} × ${
              knownValues.i / 100
            } / ${knownValues.A})) / ln(1 + ${knownValues.i / 100})`;
          } else {
            calculatedResult = calculateN_fromF(
              knownValues.F,
              knownValues.A,
              knownValues.i
            );
            formula = `n = ln(1 + (${knownValues.F} × ${
              knownValues.i / 100
            } / ${knownValues.A})) / ln(1 + ${knownValues.i / 100})`;
          }
          break;
        case "i":
          calculatedResult = calculateI_iterative(
            knownValues,
            findVariable,
            usePresent
          );
          formula = `i calculada por método iterativo usando ${
            usePresent ? "Valor Presente" : "Valor Futuro"
          }`;
          break;
      }

      setResult({
        variable: findVariable,
        value: calculatedResult,
        formula: formula,
      });
    } catch (error) {
      setResult({
        variable: findVariable,
        value: "Error",
        formula: "Verifique los datos ingresados",
      });
    }
  };

  const handleClear = () => {
    setValues({ P: "", F: "", A: "", i: "", n: "" });
    setResult(null);
    setErrors({});
  };

  const getVariableName = (variable) => {
    const names = {
      P: "Valor Presente",
      F: "Valor Futuro",
      A: "Anualidad",
      i: "Tasa de Interés",
      n: "Número de Períodos",
    };
    return names[variable];
  };

  const getVariableDescription = (variable) => {
    const descriptions = {
      P: "Valor presente de la serie de pagos",
      F: "Valor futuro de la serie de pagos",
      A: "Monto de cada pago periódico",
      i: "Tasa de interés por período (%)",
      n: "Cantidad total de períodos",
    };
    return descriptions[variable];
  };

  const showPresentFutureSelector = () => {
    return ["A", "i", "n"].includes(findVariable);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Fondo dinámico con gradiente animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500 animate-pulse">
        <div
          className="absolute inset-0 bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 opacity-50 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute inset-0 bg-gradient-to-bl from-green-500 via-blue-500 to-purple-600 opacity-30 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Calculadora */}
      <div
        className="relative z-10 bg-gray-900 p-6 rounded-3xl shadow-2xl max-w-lg w-full border-4 border-gray-700"
        style={{
          boxShadow:
            "0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          background: "linear-gradient(145deg, #1a1a2e, #16213e)",
        }}
      >
        {/* Título */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Calculadora Series Uniformes
          </h1>
          <p className="text-gray-400 text-sm">
            Encuentra cualquier variable de la ecuación
          </p>
        </div>

        {/* Selector de variable a encontrar */}
        <div className="mb-6">
          <label className="block text-white font-semibold mb-3 text-center">
            ¿Qué variable deseas encontrar?
          </label>
          <div className="grid grid-cols-5 gap-2">
            {["P", "F", "A", "i", "n"].map((variable) => (
              <button
                key={variable}
                onClick={() => {
                  setFindVariable(variable);
                  setResult(null);
                  setErrors({});
                }}
                className={`py-3 px-2 rounded-xl font-bold transition-all duration-200 text-center text-sm ${
                  findVariable === variable
                    ? "bg-purple-600 text-white shadow-lg transform scale-105 border-2 border-purple-400"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600 border-2 border-gray-600"
                }`}
                style={
                  findVariable === variable
                    ? { boxShadow: "0 6px 12px rgba(147, 51, 234, 0.4)" }
                    : {}
                }
              >
                <div className="text-lg">{variable}</div>
              </button>
            ))}
          </div>
          <p className="text-center text-purple-300 text-sm mt-2 font-semibold">
            Calculando: {getVariableName(findVariable)}
          </p>
        </div>

        {/* Selector P o F para A, i, n */}
        {showPresentFutureSelector() && (
          <div className="mb-6">
            <label className="block text-white font-semibold mb-3 text-center">
              ¿Usar Valor Presente o Futuro?
            </label>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setUsePresent(true);
                  setResult(null);
                  setErrors({});
                  // Limpiar el campo F si estaba usando F
                  if (!usePresent) {
                    setValues((prev) => ({ ...prev, F: "" }));
                  }
                }}
                className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all duration-200 text-sm ${
                  usePresent
                    ? "bg-blue-600 text-white shadow-lg border-2 border-blue-400"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600 border-2 border-gray-600"
                }`}
                style={
                  usePresent
                    ? { boxShadow: "0 6px 12px rgba(59, 130, 246, 0.4)" }
                    : {}
                }
              >
                Valor Presente (P)
              </button>
              <button
                onClick={() => {
                  setUsePresent(false);
                  setResult(null);
                  setErrors({});
                  // Limpiar el campo P si estaba usando P
                  if (usePresent) {
                    setValues((prev) => ({ ...prev, P: "" }));
                  }
                }}
                className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all duration-200 text-sm ${
                  !usePresent
                    ? "bg-orange-600 text-white shadow-lg border-2 border-orange-400"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600 border-2 border-gray-600"
                }`}
                style={
                  !usePresent
                    ? { boxShadow: "0 6px 12px rgba(234, 88, 12, 0.4)" }
                    : {}
                }
              >
                Valor Futuro (F)
              </button>
            </div>
          </div>
        )}

        {/* Campos de entrada */}
        <div className="space-y-4 mb-6">
          {["P", "F", "A", "i", "n"].map((variable) => {
            // No mostrar el campo que se está calculando
            if (variable === findVariable) return null;

            // Para P y F: solo mostrar A, i, n (no mostrar el otro valor P/F)
            if (findVariable === "P" && variable === "F") return null;
            if (findVariable === "F" && variable === "P") return null;

            // Para A, i, n: mostrar solo P o F según la selección
            if (showPresentFutureSelector()) {
              if (variable === "P" && !usePresent) return null;
              if (variable === "F" && usePresent) return null;
            }

            return (
              <div key={variable}>
                <label className="block text-white font-semibold mb-1 text-sm">
                  {getVariableName(variable)} ({variable}){" "}
                  <span className="text-red-400">*</span>
                </label>
                <p className="text-gray-400 text-xs mb-2">
                  {getVariableDescription(variable)}
                </p>
                <div className="relative">
                  <input
                    type="number"
                    step="any"
                    value={values[variable]}
                    onChange={(e) =>
                      handleInputChange(variable, e.target.value)
                    }
                    placeholder={
                      variable === "A"
                        ? "1000"
                        : variable === "i"
                        ? "1"
                        : variable === "n"
                        ? "7"
                        : "5500"
                    }
                    className={`w-full p-3 rounded-xl bg-gray-800 text-white border-2 transition-all duration-200 focus:outline-none text-sm ${
                      errors[variable]
                        ? "border-red-500 focus:border-red-400"
                        : "border-gray-600 focus:border-blue-400"
                    }`}
                    style={{ boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.3)" }}
                  />
                  {variable === "i" && (
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold text-sm">
                      %
                    </span>
                  )}
                </div>
                {errors[variable] && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors[variable]}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Botones */}
        <div className="flex space-x-3 mb-6">
          <button
            onClick={handleCalculate}
            className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 border-2 border-green-400"
            style={{ boxShadow: "0 6px 12px rgba(34, 197, 94, 0.4)" }}
          >
            <div className="text-base">CALCULAR {findVariable}</div>
          </button>
          <button
            onClick={handleClear}
            className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 border-2 border-red-400"
            style={{ boxShadow: "0 6px 12px rgba(220, 38, 38, 0.4)" }}
          >
            <div className="text-base">LIMPIAR</div>
          </button>
        </div>

        {/* Resultado */}
        {result && (
          <div className="bg-gradient-to-r from-green-900 to-blue-900 rounded-xl p-5 border-2 border-green-500 animate-pulse mb-4">
            <h3 className="text-white font-bold text-lg mb-3 text-center">
              🎯 Resultado
            </h3>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300 mb-2">
                {result.variable} ={" "}
                {typeof result.value === "number"
                  ? result.variable === "i"
                    ? `${result.value.toFixed(4)}%`
                    : result.value.toLocaleString("es-ES", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 4,
                      })
                  : result.value}
              </div>
              <div className="text-sm text-gray-300 mb-3">
                {getVariableName(result.variable)}
              </div>
              <div className="bg-gray-800 rounded-lg p-3 text-xs text-gray-300 font-mono break-all">
                {result.formula}
              </div>
            </div>
          </div>
        )}

        {/* Información de fórmulas */}
        <div className="p-4 bg-gray-800 rounded-xl border border-gray-600">
          <h4 className="text-white font-semibold mb-2 text-center text-sm">
            📚 Fórmulas Base
          </h4>
          <div className="text-xs text-gray-300 space-y-1 text-center">
            <div>
              <strong>Valor Presente:</strong> P = A × [1 - (1 + i)⁻ⁿ] / i
            </div>
            <div>
              <strong>Valor Futuro:</strong> F = A × [(1 + i)ⁿ - 1] / i
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesUniformsCalculator;
