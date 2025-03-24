<template>
  <div class="w-[20rem] h-screen bg-[#040273] text-white p-5 fixed">
    <h2 class="text-lg font-bold m-5">Navbar</h2>
    <nav class="mt-4">
      <RouterLink to="/panelCoordinador">
        <button class="flex items-center w-full px-4 py-3 text-sm rounded-md hover:bg-blue-900">
          📊 Dashboard
        </button>
      </RouterLink>
      <RouterLink to="/panelTalleres">
        <button class="flex items-center w-full px-4 py-3 text-sm rounded-md hover:bg-blue-900">
          🏫 Talleres
        </button>
      </RouterLink>
      <RouterLink to="/panelMateriales">
        <button class="flex items-center w-full px-4 py-3 text-sm rounded-md hover:bg-blue-900">
          📂 Materiales
        </button>
      </RouterLink>
      <RouterLink to="/calendario">
        <button class="flex items-center w-full px-4 py-3 text-sm rounded-md hover:bg-blue-900">
          📅 Calendario
        </button>
      </RouterLink>
    </nav>

    <div class="mt-auto">
      <button class="w-full mt-2 py-3 bg-red-500 text-white text-lg rounded-md hover:bg-red-600">
        Cerrar Sesión
      </button>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
