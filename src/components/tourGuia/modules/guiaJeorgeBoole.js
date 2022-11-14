const steps = [
  {
    element: '#titulo-bl',
    popover: {
      title: 'Bienvenido!!',
      description: 'Estás a punto de resolver integrales definidas por el método <b>Jorge Bool</b> , para esto se aplica la fórmula, I = 2Δ / 45 [7F(X1)+32F(X2)+12F(X3)+32F(X4)+7F(X5)].',
      position: 'botton'
    }
  },
  {
    element: '#mostrarNuevaEcuacion',
    popover: {
      title: 'Previsualización de fórmula!',
      description: 'Aquí se visualizará la ecuación que se va escribiendo.',
      position: 'bottom'
    }
  },
  {
    element: '#ecuacionesBtn',
    popover: {
      title: 'Para que son estos botones?',
      description: 'Estas son los rápidos accesos para operaciones matemáticos.',
      position: 'bottom'
    }
  },
  {
    element: '#tipearFormula',
    popover: {
      title: '¡Escribe tú fórmula!',
      description: 'aqui se agrega la integral que tienes pensada con sus límites.',
      position: 'top'
    }
  },
  {
    element: '#deltaResultado',
    popover: {
      title: 'Aplicando Formula Delta!',
      description: 'Podrás mirar el resultado de Delta al aplicar Δ = b - a / 4.',
      position: 'left'
    }
  },
  {
    element: '#exportacionExcel',
    popover: {
      title: 'Obteniendo los Datos!',
      description: 'Aqui podrás exporta la tabla con los valores generados',
      position: 'left'
    }
  },
  {
    element: '#tablaParticiones',
    popover: {
      title: 'Tabla de particiones!',
      description: 'Podrás mirar la tabla con los valores aplicando el total de Delta (Δ) a X y aplicando la ecuación generando Y',
      position: 'top'
    }
  },
  {
    element: '#totalesSigma',
    popover: {
      title: 'Totales!',
      description: 'Podremos Observar los totales de la sumatoria (Σ) de X e I que es igual a: I = 2Δ / 45 [7F(X1)+32F(X2)+12F(X3)+32F(X4)+7F(X5)] aplicando esta formula.',
      position: 'top'
    }
  },
  {
    element: '#grafica1',
    popover: {
      title: 'A Graficar!',
      description: 'Podras mirar la grafica basado en la tabla de las particiones',
      position: 'top'
    }
  },
  {
    element: '#grafica2',
    popover: {
      title: 'A Graficar!',
      description: 'Podrás mirar la gráfica más de cerca y más especifica basado en la tabla de las particiones',
      position: 'top'
    }
  },
  {
    element: '#limpiarBtn',
    popover: {
      title: 'Limpia más fácil!',
      description: 'Limpia todo el tablero con un solo clic.',
      position: 'left'
    }
  },
  {
    element: '#calcularBtn',
    popover: {
      title: 'A calcular!!',
      description: 'Cuando todo este listo presiona este botón para realizar el cálculo, este botón se mantendrá desactivado cuando no se detecte fórmula.  BUENA SUERTE.',
      position: 'left'
    }
  }
]
export default steps
