<template>
  <div class="card flex flex-col justify-center items-center w-full h-full z-50">
    <div
      class="bg-[#F2F5FA] p-13 flex flex-col justify-center items-center rounded-lg animate-pulse"
    >
      <ProgressSpinner
        style="width: 50px; height: 50px"
        strokeWidth="8"
        fill="transparent"
        animationDuration=".5s"
        aria-label="Custom ProgressSpinner"
      />
      <h2 class="text-[#BCCCDC] pt-4">Cargando...</h2>
    </div>
  </div>
</template>

<script setup>
import ProgressSpinner from 'primevue/progressspinner'
</script>
