<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <Sidebar class="w-auto bg-[#040273] flex-shrink-0" />

    <!-- Contenido de la vista -->
    <div class="flex-1 overflow-y-auto overflow-x-hidden p-16">
      <div class="max-w-full w-full">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '@/components/global/Sidebar.vue'
</script>
