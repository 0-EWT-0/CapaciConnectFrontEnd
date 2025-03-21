<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Chart } from 'chart.js/auto'

const chartRef = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

const data = {
  labels: ["New Users", "Returning Users", "Inactive Users"],
  datasets: [
    {
      data: [45, 35, 20],
      backgroundColor: [
        "hsl(var(--primary))",
        "hsl(var(--secondary))",
        "hsl(var(--muted))"
      ],
      borderColor: [
        "hsl(var(--primary))",
        "hsl(var(--secondary))",
        "hsl(var(--muted))"
      ],
      borderWidth: 1,
    },
  ],
}

const options = {
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        boxWidth: 15,
      },
    },
  },
  cutout: "70%",
}

onMounted(() => {
  if (chartRef.value) {
    const ctx = chartRef.value.getContext('2d')
    if (ctx) {
      chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: options
      })
    }
  }
})

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})
</script>

<template>
  <div class="h-[250px] w-full flex items-center justify-center">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

