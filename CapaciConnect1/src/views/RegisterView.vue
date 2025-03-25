<template>
  <div class="w-screen h-screen flex overflow-hidden">
    <div class="w-1/2">
      <img :src="img" class="object-cover w-full h-full" />
    </div>
    <div class="bg-[#040273] w-1/2 p-19 flex flex-col justify-center">
      <Form v-bind:validation-schema="validationUser" @submit="handleRegister">
        <div class="py-4">
          <h2 class="text-white">Crear cuenta</h2>
        </div>

        <div class="flex gap-2">
          <div class="py-4 w-1/2">
            <label class="text-white"><h3 class="pb-2">Nombre(s)</h3></label>
            <Field
              v-model="name"
              name="name"
              class="bg-white text-[#565656] rounded-lg w-full p-4 focus:outline-0"
              type="text"
              placeholder="Juan Carlos"
            />
            <ValidationMessage prop="name" />
          </div>

          <div class="py-4 w-1/2">
            <label class="text-white"><h3 class="pb-2">Apellidos</h3></label>
            <Field
              v-model="last_names"
              name="last_names"
              class="bg-white text-[#565656] rounded-lg w-full p-4 focus:outline-0"
              type="text"
              placeholder="Torrez Zapata"
            />
            <ValidationMessage prop="last_names" />
          </div>
        </div>

        <div class="flex gap-2">
          <div class="pb-4 w-1/2">
            <label class="text-white"><h3 class="pb-2">Correo</h3></label>
            <Field
              v-model="email"
              name="email"
              class="bg-white text-[#565656] rounded-lg w-full p-4 focus:outline-0"
              type="email"
              placeholder="correo@gmail.com"
            />
            <ValidationMessage prop="email" />
          </div>
          <div class="pb-4 w-1/2">
            <label class="text-white"><h3 class="pb-2">Teléfono</h3></label>
            <input
              class="bg-white text-[#565656] rounded-lg w-full p-4 focus:outline-0"
              v-model="phone"
              type="tel"
              name="phone"
              id="phone"
              aria-describedby="phone-description"
            />
            <h3 class="text-[#DC2626] font-bold" id="phone-description" v-if="phoneError">
              {{ phoneError }}
            </h3>
          </div>
        </div>

        <div class="pb-4">
          <label class="text-white"><h3 class="pb-2">Contraseña</h3></label>
          <Field
            v-model="password"
            name="password"
            class="bg-white text-[#565656] rounded-lg w-full p-4 focus:outline-0"
            type="password"
            placeholder="••••••••"
          />
          <ValidationMessage prop="password" />
        </div>

        <div class="pb-4">
          <label class="text-white"><h3 class="pb-2">Confirmar contraseña</h3></label>
          <Field
            v-model="confirmpassword"
            name="confirmpassword"
            class="bg-white text-[#565656] rounded-lg w-full p-4 focus:outline-0"
            type="password"
            placeholder="••••••••"
          />
          <ValidationMessage prop="confirmpassword" />
        </div>

        <div class="pb-4 w-auto">
          <BaseButton variant="blue" @click="validatePhone">Crear cuenta</BaseButton>
        </div>

        <div class="pb-4 text-center">
          <p class="text-white">
            ¿Ya tienes una cuenta? Inicia sesión
            <router-link :to="'/login'" class="text-[#2563EB]">aquí</router-link>
          </p>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import img from '@/assets/imgs/imgRegister.jpg'
import ValidationMessage from '@/components/common/ValidationMessage.vue'
import { validationUser } from '@/schemas/validations'
import { Form, Field } from 'vee-validate'
import 'intl-tel-input/build/css/intlTelInput.css'
import intlTelInput from 'intl-tel-input'
// import { useToast } from "primevue/usetoast";
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import BaseButton from '@/components/common/BaseButton.vue'

// const toast = useToast();

const name = ref('')
const last_names = ref('')
const phone = ref('')
const email = ref('')
const password = ref('')
const confirmpassword = ref('')

const authStore = useAuthStore()

const iti = ref({})
const phoneError = ref('')
const error = ref('')

const handleRegister = async () => {
  try {
    await authStore.register(
      name.value,
      last_names.value,
      phone.value,
      email.value,
      password.value,
      confirmpassword.value,
    )
  } catch (error) {
    console.error('Error during register:', error)
  }
}

onMounted(() => {
  const input = document.querySelector('#phone')
  iti.value = intlTelInput(input, {
    loadUtils: () => import('../../node_modules/intl-tel-input/build/js/utils.js'),
    initialCountry: 'MX',
    containerClass: 'w-full text-[#565656]',
  })
})

const validatePhone = () => {
  phoneError.value = ''
  error.value = ''

  if (!iti.value.isValidNumber()) {
    error.value = iti.value.getValidationError()

    if (error.value == 2) {
      phoneError.value = 'Demasaido corto'
    } else if (error.value == 3) {
      phoneError.value = 'Demasiado largo'
    } else {
      phoneError.value = 'Número inválido'
    }
  }
}
</script>

<style scoped>
.iti {
  --iti-path-flags-1x: url('../../node_modules/intl-tel-input/build/img/flags.webp');
  --iti-path-flags-2x: url('../../node_modules/intl-tel-input/build/img/flags@2x.webp');
  --iti-path-globe-1x: url('../../node_modules/intl-tel-input/build/img/globe.webp');
  --iti-path-globe-2x: url('../../node_modules/intl-tel-input/build/img/globe@2x.webp');
}
</style>
