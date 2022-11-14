const steps = [
  {
    element: '#titulo-sa',
    popover: {
      title: 'Bienvenido!!',
      description: 'Estás a punto de resolver integrales definidas por el método <b>Simpson Abierto</b>, para esto se aplica la fórmula, I = Δ / 3 [F(X1)+4F(X2)+2F(X3)+4F(X4)+2F(X5)<br/>..+F(Xn)].',
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
    element: '#valorN',
    popover: {
      title: 'Para que esto?',
      description: 'Aqui podras agregar el valor de "n" reemplazando la formula Δ = b - a / n, hay que recalcar que "n" debe ser par',
      position: 'left'
    }
  },
  {
    element: '#deltaResultado',
    popover: {
      title: 'Aplicando Formula Delta!',
      description: 'Podrás mirar el resultado de Delta al aplicar Δ = b - a / n.',
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
      description: 'Podremos Observar los totales de la sumatoria (Σ) de X e I que es igual a: I = Δ / 3 [F(X1)+4F(X2)+2F(X3)+4F(X4)+2F(X5)..+F(Xn)] aplicando esta formula.',
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
