<script setup lang="ts">
import { ref, onMounted } from 'vue'

const chartRef = ref<HTMLCanvasElement | null>(null)

const data = [1200, 1900, 1500, 1700, 2400, 2100, 1800, 2300, 2800, 2500, 2900, 3200]
const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const maxValue = Math.max(...data)

onMounted(() => {
  if (!chartRef.value) return

  const ctx = chartRef.value.getContext('2d')
  if (!ctx) return

  // Configuración del gráfico
  const barWidth = 30
  const spacing = 20
  const chartHeight = chartRef.value.height - 50
  const chartWidth = chartRef.value.width - 40

  // Dibujar barras
  data.forEach((value, index) => {
    const barHeight = (value / maxValue) * chartHeight
    const x = 40 + (index * (barWidth + spacing))
    const y = chartHeight - barHeight + 20

    ctx.fillStyle = '#3b82f6' // Color primario
    ctx.fillRect(x, y, barWidth, barHeight)
  })

  // Dibujar ejes
  ctx.beginPath()
  ctx.moveTo(30, 20)
  ctx.lineTo(30, chartHeight + 20)
  ctx.lineTo(chartWidth + 30, chartHeight + 20)
  ctx.strokeStyle = '#e5e7eb'
  ctx.stroke()

  // Etiquetas del eje Y
  ctx.fillStyle = '#888888'
  ctx.font = '12px Arial'
  for (let i = 0; i <= 5; i++) {
    const value = Math.round((maxValue / 5) * i)
    const y = chartHeight - (chartHeight / 5) * i + 20
    ctx.fillText(`${value}`, 5, y)
  }

  // Etiquetas del eje X
  labels.forEach((label, index) => {
    const x = 40 + (index * (barWidth + spacing)) + barWidth / 2
    const y = chartHeight + 35
    ctx.textAlign = 'center'
    ctx.fillText(label, x, y)
  })
})
</script>

<template>
  <div class="w-full h-[350px] p-4 border rounded-lg">
    <h3 class="text-lg font-semibold mb-4">Monthly Performance</h3>
    <canvas
      ref="chartRef"
      class="w-full h-full"
      width="1100"
      height="350"
    ></canvas>
  </div>
</template>
