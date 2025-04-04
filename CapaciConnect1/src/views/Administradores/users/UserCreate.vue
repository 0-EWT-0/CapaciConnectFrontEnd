<template>
  <div
    class="bg-[#F2F5FA] shadow-lg rounded-xl text-[#212122] border border-gray-200 mx-4 sm:mx-6 lg:mx-8 my-6"
  >
    <div class="p-4 sm:p-6 border-b border-gray-200">
      <h2 class="text-xl sm:text-2xl font-semibold">Crear usuario</h2>
    </div>

    <Form
      :validation-schema="validationUserRegisterAdmin"
      @submit="handleSubmit"
      class="p-4 sm:p-6"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <!-- Nombre -->
        <div class="space-y-2">
          <label class="text-[#212122]"><h3 class="pb-2">Nombre(s)</h3></label>
          <Field
            name="name"
            v-model="formData.name"
            placeholder="Ej: Juan"
            class="bg-white text-[#565656] rounded-lg w-full p-4 focus:outline-0"
          />
          <ValidationMessage prop="name" />
        </div>

        <!-- Apellidos -->
        <div class="space-y-2">
          <label class="text-[#212122]"><h3 class="pb-2">Apellidos</h3></label>
          <Field
            name="last_names"
            v-model="formData.last_names"
            placeholder="Ej: Pérez García"
            class="bg-white text-[#565656] rounded-lg w-full p-4 focus:outline-0"
          />
          <ValidationMessage prop="last_names" />
        </div>

        <!-- Email -->
        <div class="space-y-2">
          <label class="text-[#212122]"><h3 class="pb-2">Correo</h3></label>
          <Field
            name="email"
            type="email"
            v-model="formData.email"
            placeholder="Ej: usuario@example.com"
            class="bg-white text-[#565656] rounded-lg w-full p-4 focus:outline-0"
          />
          <ValidationMessage prop="email" />
        </div>

        <!-- Teléfono -->
        <div class="space-y-2">
          <label class="text-[#212122]"><h3 class="pb-2">Teléfono</h3></label>
          <input
            v-model="formData.phone"
            type="tel"
            required
            placeholder="Ej: 525512345678"
            class="bg-white text-[#565656] rounded-lg w-full p-4 focus:outline-0"
            @input="handlePhoneInput"
            pattern="[0-9]*"
            title="Solo se permiten números"
          />
        </div>

        <!-- Contraseña -->
        <div class="space-y-2">
          <label class="text-[#212122]"><h3 class="pb-2">Contraseña</h3></label>
          <Field
            name="password"
            type="password"
            v-model="formData.password"
            class="bg-white text-[#565656] rounded-lg w-full p-4 focus:outline-0"
          />
          <ValidationMessage prop="password" />
        </div>

        <!-- Confirmar Contraseña -->
        <div class="space-y-2">
          <label class="text-[#212122]"><h3 class="pb-2">Confirmar contraseña</h3></label>
          <Field
            name="confirmpassword"
            type="password"
            v-model="formData.confirmpassword"
            class="bg-white text-[#565656] rounded-lg w-full p-4 focus:outline-0"
          />
          <ValidationMessage prop="confirmpassword" />
        </div>
      </div>

      <!-- Descripción -->
      <div class="mb-6 space-y-2">
        <label class="text-[#212122]"><h3 class="pb-2">Descripción</h3></label>
        <Field
          as="textarea"
          name="description"
          v-model="formData.description"
          placeholder="Escribe una descripción..."
          rows="3"
          class="bg-white text-[#565656] rounded-lg w-full p-4 focus:outline-0"
        />
        <ValidationMessage prop="description" />
      </div>

      <!-- Imagen de perfil -->
      <div class="space-y-6">
        <div class="bg-gray-50 p-4 sm:p-5 rounded-xl">
          <!-- <div class="space-y-4">
            <div class="space-y-2">
              <label class="text-[#212122]"><h3 class="pb-2">Imagen de perfil</h3></label>
              <Field
                name="img"
                @change="handleFileUpload"
                type="file"
                accept="image/*"
                class="bg-white text-[#565656] rounded-lg w-full p-4 focus:outline-0"
              />
              <ValidationMessage prop="img" />
              <h3 v-if="errorMessage" class="text-[#DC2626] font-bold">{{ errorMessage }}</h3>
              <h3 v-if="successMessage" class="text-[#059669] font-bold">{{ successMessage }}</h3>
            </div>
          </div> -->
        </div>

        <!-- Botón de envío -->
        <div class="flex justify-end mt-6 text-white">
          <BaseButton :disabled="isSubmitting" variant="green"
            ><span v-if="isSubmitting">
              <i class="fas fa-spinner fa-spin mr-2"></i> Creando...
            </span>
            <span v-else class="">Crear</span></BaseButton
          >
        </div>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAdminUserStore } from '@/stores/adminUserStore'
import { Field, Form } from 'vee-validate'
import ValidationMessage from '@/components/common/ValidationMessage.vue'
import { validationUserRegisterAdmin } from '@/schemas/validations'
import BaseButton from '@/components/common/BaseButton.vue'
import Swal from 'sweetalert2'

const userAdminStore = useAdminUserStore()

const formData = ref({
  name: '',
  last_names: '',
  email: '',
  phone: '',
  password: '',
  confirmpassword: '',
  description: '',
  profile_img: '',
})

const isSubmitting = ref(false)

const handlePhoneInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  const cleanedValue = input.value.replace(/\D/g, '') // Elimina todos los no numéricos
  formData.value.phone = cleanedValue
}

const validateForm = () => {
  if (formData.value.password !== formData.value.confirmpassword) {
    alert('Las contraseñas no coinciden')
    return false
  }
  return true
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true

  try {
    const formPayload = new FormData()
    formPayload.append('name', formData.value.name)
    formPayload.append('last_names', formData.value.last_names)
    formPayload.append('email', formData.value.email)
    formPayload.append('phone', formData.value.phone)
    formPayload.append('password', formData.value.password)
    formPayload.append('confirmpassword', formData.value.confirmpassword)
    formPayload.append('escription', formData.value.description)

    if (formData.value.profile_img) {
      formPayload.append('Profile_img', formData.value.profile_img)
    }
    console.log(formPayload)
    await userAdminStore.registerUser(formPayload)

    // Resetear formulario
    formData.value = {
      name: '',
      last_names: '',
      email: '',
      phone: '',
      password: '',
      confirmpassword: '',
      description: '',
      profile_img: '',
    }

    Swal.fire({
        icon: 'success',
        title: 'Usuario creado',
        showConfirmButton: false,
        timer: 1500,
        backdrop: 'rgba(4, 2, 115, 0.7)',
      })

      userAdminStore.fetchUsers()
  } catch (error) {
    console.error('Error al crear usuario:', error)
    Swal.fire({
        title: 'Error',
        text: 'No se pudo crear el usuario',
        icon: 'error',
        confirmButtonColor: '#2563EB',
        backdrop: 'rgba(4, 2, 115, 0.7)',
      })
  } finally {
    isSubmitting.value = false
  }
}
</script>
