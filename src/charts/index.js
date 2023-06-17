import * as ECharts from 'echarts/core'
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
} from 'echarts/components'
import { BarChart, ScatterChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

ECharts.use([
  TitleComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  ScatterChart,
  CanvasRenderer,
  UniversalTransition,
])

export const initChart = ECharts.init
