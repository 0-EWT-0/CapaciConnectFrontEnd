<template>
  <div class="relative w-full h-[350px]">
    <svg
      :viewBox="`0 0 ${width} ${height}`"
      preserveAspectRatio="xMidYMid meet"
      @mousemove="handleMouseMove"
      @mouseleave="tooltipVisible = false"
    >
      <!-- Eje Y -->
      <text
        v-for="(tick, index) in yTicks"
        :key="index"
        :x="margin"
        :y="height - margin - tick.position + 4"
        class="text-[10px] fill-gray-500"
      >
        {{ tick.value }}
      </text>

      <!-- Eje X -->
      <text
        v-for="(point, index) in data"
        :key="'x'+index"
        :x="getXPosition(index)"
        :y="height - margin + 15"
        class="text-[10px] fill-gray-500"
        text-anchor="middle"
      >
        {{ point.date }}
      </text>

      <!-- Línea de Pageviews -->
      <path
        :d="pageviewsPath"
        fill="none"
        stroke="#adfa1d"
        stroke-width="2"
      />

      <!-- Línea de Visitantes -->
      <path
        :d="visitorsPath"
        fill="none"
        stroke="#0ea5e9"
        stroke-width="2"
      />

      <!-- Puntos interactivos -->
      <g v-for="(point, index) in data" :key="'point'+index">
        <circle
          :cx="getXPosition(index)"
          :cy="getYPosition('pageviews', point.pageviews)"
          r="4"
          fill="#adfa1d"
          @mouseover="showTooltip(point, index)"
        />
        <circle
          :cx="getXPosition(index)"
          :cy="getYPosition('visitors', point.visitors)"
          r="4"
          fill="#0ea5e9"
          @mouseover="showTooltip(point, index)"
        />
      </g>

      <!-- Línea guía del tooltip -->
      <line
        v-if="tooltipVisible"
        :x1="currentX"
        :x2="currentX"
        y1="0"
        :y2="height - margin"
        stroke="#888"
        stroke-dasharray="4"
      />
    </svg>

    <!-- Tooltip -->
    <div
      v-if="tooltipVisible"
      class="absolute bg-white border rounded-lg p-3 shadow-lg"
      :style="tooltipStyle"
    >
      <div class="text-sm font-medium mb-1">{{ currentPoint?.date }}</div>
      <div class="flex items-center">
        <div class="w-2 h-2 bg-[#adfa1d] rounded-full mr-2"></div>
        <span class="text-xs">Pageviews: {{ currentPoint?.pageviews }}</span>
      </div>
      <div class="flex items-center mt-1">
        <div class="w-2 h-2 bg-[#0ea5e9] rounded-full mr-2"></div>
        <span class="text-xs">Visitors: {{ currentPoint?.visitors }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface DataPoint {
  date: string
  visitors: number
  pageviews: number
}

const props = defineProps({
  data: {
    type: Array as () => DataPoint[],
    default: () => [
      { date: "Jan 1", visitors: 1200, pageviews: 3200 },
      { date: "Jan 5", visitors: 1800, pageviews: 4800 },
      { date: "Jan 10", visitors: 1400, pageviews: 3600 },
      { date: "Jan 15", visitors: 2200, pageviews: 5800 },
      { date: "Jan 20", visitors: 2600, pageviews: 7200 },
      { date: "Jan 25", visitors: 2400, pageviews: 6400 },
      { date: "Jan 30", visitors: 3000, pageviews: 8000 },
    ]
  }
})

interface YTick {
  value: number
  position: number
}

const width = ref(800)
const height = ref(350)
const margin = 40
const tooltipVisible = ref(false)
const currentX = ref(0)
const currentPoint = ref<DataPoint | null>(null)
const tooltipStyle = ref({ left: '0px', top: '0px' })

const maxValue = computed(() => {
  const maxPageviews = Math.max(...props.data.map(d => d.pageviews))
  const maxVisitors = Math.max(...props.data.map(d => d.visitors))
  return Math.max(maxPageviews, maxVisitors)
})

const yTicks = computed<YTick[]>(() => {
  const ticks: YTick[] = []
  const step = maxValue.value / 4
  for (let i = 0; i <= 4; i++) {
    const value = Math.round(step * i)
    const position = (value / maxValue.value) * (height.value - margin * 2)
    ticks.push({ value, position })
  }
  return ticks
})

const getXPosition = (index: number): number => {
  const segmentWidth = (width.value - margin * 2) / (props.data.length - 1)
  return margin + (index * segmentWidth)
}

// Función corregida: tipo específico para parámetro 'type'
const getYPosition = (
  type: 'visitors' | 'pageviews',
  value: number
): number => {
  const yScale = (height.value - margin * 2) / maxValue.value
  return height.value - margin - (value * yScale)
}

// Función corregida: tipo específico para parámetro 'type'
const generatePath = (type: 'visitors' | 'pageviews'): string => {
  return props.data.map((point, index) => {
    const x = getXPosition(index)
    const y = getYPosition(type, point[type])
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
  }).join(' ')
}

const pageviewsPath = computed(() => generatePath('pageviews'))
const visitorsPath = computed(() => generatePath('visitors'))

const showTooltip = (point: DataPoint, index: number): void => {
  currentPoint.value = point
  currentX.value = getXPosition(index)
  tooltipVisible.value = true
}

const handleMouseMove = (event: MouseEvent): void => {
  if (!tooltipVisible.value) return

  const target = event.target as SVGSVGElement
  const rect = target.getBoundingClientRect()
  tooltipStyle.value = {
    left: `${event.clientX - rect.left + 10}px`,
    top: `${event.clientY - rect.top - 60}px`
  }
}

onMounted(() => {
  const updateWidth = () => {
    const container = document.querySelector('.relative.w-full') as HTMLElement
    width.value = container?.clientWidth || 800
  }

  updateWidth()
  window.addEventListener('resize', updateWidth)
})
</script>
