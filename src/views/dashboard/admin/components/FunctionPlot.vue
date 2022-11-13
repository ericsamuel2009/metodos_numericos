<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: [Object, Array],
      required: true
    },
    valorSuperior: {
      type: Number,
      default: 0
    },
    opc: {
      type: String,
      default: 'opc2'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ expectedDataX, expectedDataY } = {}) {
      this.chart.setOption((this.opc === 'opc1') ? this.option1() : this.option2())
    },
    generateData() {
      const data = []
      for (let i = -200; i <= 200; i += 0.1) {
        data.push([i, this.func(i)])
      }
      return data
    },
    func(x) {
      x /= 10
      return Math.sin(x) * Math.cos(x * 2 + 1) * Math.sin(x * 3 + 2) * 50
    },
    option1() {
      return {
        animation: false,
        grid: {
          top: 30,
          left: 30,
          right: 30,
          bottom: 30
        },
        xAxis: {
          name: 'x',
          minorTick: {
            show: true
          },
          minorSplitLine: {
            show: true
          }
        },
        yAxis: {
          name: 'y',
          // min: -200,
          // max: 200,
          minorTick: {
            show: true
          },
          minorSplitLine: {
            show: true
          }
        },
        dataZoom: [
          {
            show: false,
            // type: 'inside',
            filterMode: 'none',
            xAxisIndex: [0],
            startValue: -20000,
            endValue: 20000
          },
          {
            show: true,
            type: 'inside',
            filterMode: 'none',
            yAxisIndex: [0],
            startValue: -20000,
            endValue: 20000
          }
        ],
        series: [
          {
            type: 'line',
            showSymbol: false,
            clip: true,
            data: this.chartData // vthis.generateData()
          }
        ]
      }
    },
    option2() {
      return {
        // title: {
        //   text: 'Grafico de la ecuacion',
        //   left: 'left'
        // },
        animation: true,
        grid: {
          top: 30,
          left: 30,
          right: 30,
          bottom: 30
        },

        xAxis: {
          type: 'category',
          boundaryGap: false,
          name: 'x',
          minorTick: {
            show: true
          },
          minorSplitLine: {
            show: true
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '30%'],
          name: 'y',
          // min: -100,
          // max: 100,
          minorTick: {
            show: true
          },
          minorSplitLine: {
            show: true
          }
        },
        visualMap: {
          type: 'piecewise',
          show: false,
          dimension: 0,
          seriesIndex: 0,
          pieces: [
            {
              gt: 1,
              lt: 3,
              color: 'rgba(0, 0, 180, 0.4)'
            },
            {
              gt: 5,
              lt: 7,
              color: 'rgba(0, 0, 180, 0.4)'
            }
          ]
        },
        tooltip: {
          trigger: 'axis', // axis, item
          formatter: '{c}',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 100]
        },
        dataZoom: [
          {
            show: true,
            type: 'inside',
            filterMode: 'none',
            xAxisIndex: [0],
            startValue: -20000,
            endValue: 20000
          },
          {
            show: true,
            type: 'inside',
            filterMode: 'none',
            yAxisIndex: [0],
            startValue: -20000,
            endValue: 20000
          }
        ],
        legend: {
          data: ['Dato']
        },
        // series: [{
        //   name: 'Y',
        //   type: 'line',
        //   itemStyle: {
        //     normal: {
        //       color: '#FF005A',
        //       lineStyle: {
        //         color: '#FF005A',
        //         width: 2
        //       }
        //     }
        //   },
        //   smooth: true,
        //   type: 'line',
        //   data: expectedDataY,
        //   animationDuration: 2800,
        //   animationEasing: 'cubicInOut'
        // }]
        series: [
          {
            name: 'Dato',
            type: 'line',
            showSymbol: false,
            markLine: {
              symbol: ['none', 'none'],
              label: { show: true }
              // data: [{ xAxis: 1 }, { xAxis: 3 }, { xAxis: 5 }, { xAxis: 7 }]
            },
            itemStyle: {
              normal: {
                color: '#FF005A',
                lineStyle: {
                  color: '#FF005A',
                  width: 2
                }
              }
            },
            clip: true,
            data: this.chartData// this.generateData()
          }
        ]
      }
    }
  }
}
</script>
