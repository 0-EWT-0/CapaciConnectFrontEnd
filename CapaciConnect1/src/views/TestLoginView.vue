<template>
  <div class="flex flex-col">
    <div class="w-1/2">
      <img :src="img" class="object-cover rounded-t-lg" />
    </div>
    <div class="w-1/2 p-4 rounded-b-lg bg-red-300">
      <h3>Titulo del taller</h3>
      <p>Descripcion del taller de manera resumida</p>
      <div class="pt-4">
        <h3 class="text-[#2563EB]">Tipo de taller</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import img from '@/assets/imgs/banner1.jpg'
</script>
