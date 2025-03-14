<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
      <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold text-center text-black mb-6">Registro</h2>
  
        <form class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Nombre completo</label>
            <input
              id="name"
              type="text"
              placeholder="Tu nombre"
              class="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
  
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="ejemplo@email.com"
              class="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
  
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="****"
              class="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
  
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirmar contraseña</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="****"
              class="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
  
          <button
            type="submit"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium p-2 rounded-lg"
          >
            Registrarse
          </button>
        </form>
  
      </div>
    </div>
  </template>
  
  <script setup lang="ts">

  </script>