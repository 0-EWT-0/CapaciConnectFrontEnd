<template>
  <div class="w-screen h-screen flex">
    <div class="w-1/2">
      <img :src="img" class="object-cover w-full h-full" />
    </div>
    <div class="bg-[#040273] w-1/2 p-19 flex flex-col justify-center">
      <form action="">
        <div class="py-4">
          <h2 class="text-white">Crear cuenta</h2>
        </div>

        <div class="py-4">
          <label class="text-white"><h3 class="pb-2">Nombre(s)</h3></label>
          <input
            class="bg-white text-[#565656] rounded-lg w-full p-4 focus:outline-0"
            type="text"
            placeholder="Juan Carlos"
          />
        </div>

        <div class="pb-4">
          <label class="text-white"><h3 class="pb-2">Apellidos</h3></label>
          <input
            class="bg-white text-[#565656] rounded-lg w-full p-4 focus:outline-0"
            type="text"
            placeholder="Torrez Zapata"
          />
        </div>

        <div class="pb-4">
          <label class="text-white"><h3 class="pb-2">Correo electrónico</h3></label>
          <input
            class="bg-white text-[#565656] rounded-lg w-full p-4 focus:outline-0"
            type="email"
            placeholder="correo@gmail.com"
          />
        </div>

        <div class="pb-4">
          <label class="text-white"><h3 class="pb-2">Contraseña</h3></label>
          <input
            class="bg-white text-[#565656] rounded-lg w-full p-4 focus:outline-0"
            type="password"
            placeholder="•••••"
          />
        </div>

        <div class="pb-4 w-auto">
          <button class="bg-[#2563EB] w-full p-4 rounded-lg cursor-pointer hover:bg-[#1d4ed8]">
            <h3>Crear cuenta</h3>
          </button>
        </div>

        <div class="pb-4 text-center">
          <p class="text-white">
            ¿Ya tienes una cuenta? Inicia sesión
            <router-link :to="'/login'" class="text-[#2563EB]">aquí</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import img from '@/assets/imgs/imgRegister.jpg'
</script>
