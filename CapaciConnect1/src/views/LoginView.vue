<template>
  <!-- <div class="bg-red-400 w-screen h-screen flex"> -->
  <div class="w-screen h-screen flex">
    <div class="w-1/2">
      <img :src="img" class="object-cover w-full h-full" />
    </div>
    <div class="bg-[#040273] w-1/2 p-19 flex flex-col justify-center">
      <Form :validation-schema="validationUser">
        <div class="py-4">
          <h2 class="text-white">Iniciar sesión</h2>
        </div>

        <div class="pb-4">
          <label class="text-white"><h3 class="pb-2">Correo electrónico</h3></label>
          <Field
            name="email"
            class="bg-white text-[#565656] rounded-lg w-full p-4 focus:outline-0"
            type="email"
            placeholder="correo@gmail.com"
          />
          <ValidationMessage prop="email" />
        </div>

        <div class="pb-4">
          <label class="text-white"><h3 class="pb-2">Contraseña</h3></label>
          <Field
            name="password"
            class="bg-white text-[#565656] rounded-lg w-full p-4 focus:outline-0"
            type="password"
            placeholder="••••••••"
          />
          <ValidationMessage prop="password" />
        </div>

        <div class="pb-4 w-auto">
          <button class="bg-[#2563EB] w-full p-4 rounded-lg cursor-pointer hover:bg-[#1d4ed8]">
            <h3>Crear cuenta</h3>
          </button>
        </div>

        <div class="pb-4 text-center">
          <p class="text-white">
            ¿No tienes una cuenta? Crea una
            <router-link :to="'/register'" class="text-[#2563EB]">aquí</router-link>
          </p>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import img from '@/assets/imgs/imgLogin.jpg'
import ValidationMessage from '@/components/common/ValidationMessage.vue'
import { validationUser } from '@/schemas/validations'
import { Field, Form } from 'vee-validate'
</script>
