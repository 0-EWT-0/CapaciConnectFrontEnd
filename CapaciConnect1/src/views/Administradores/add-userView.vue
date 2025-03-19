<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const formData = ref({
  name: '',
  email: '',
  role: '',
  password: ''
})

const errors = ref<Record<string, string>>({})

const validateForm = () => {
  errors.value = {}
  let isValid = true

  if (formData.value.name.length < 2) {
    errors.value.name = 'Name must be at least 2 characters.'
    isValid = false
  }

  if (!/^\S+@\S+\.\S+$/.test(formData.value.email)) {
    errors.value.email = 'Please enter a valid email address.'
    isValid = false
  }

  if (!formData.value.role) {
    errors.value.role = 'Please select a role.'
    isValid = false
  }

  if (formData.value.password.length < 8) {
    errors.value.password = 'Password must be at least 8 characters.'
    isValid = false
  }

  return isValid
}

const onSubmit = (event: Event) => {
  event.preventDefault()

  if (!validateForm()) return

  console.log('Form submitted:', formData.value)
  alert(`User ${formData.value.name} has been added as a ${formData.value.role}`)

  // Reset form
  formData.value = { name: '', email: '', role: '', password: '' }
  emit('update:open', false)
}

function onOpenChange(value: boolean) {
  emit('update:open', value)
}
</script>

<template>
  <div v-if="open" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4" @click.self="onOpenChange(false)">
    <div class="bg-white rounded-lg p-6 max-w-[425px] w-full mx-4">
      <div class="mb-5">
        <h2 class="text-lg font-semibold">Add New User</h2>
        <p class="text-sm text-gray-500">
          Create a new user account with role-based permissions.
        </p>
      </div>

      <form @submit="onSubmit">
        <div class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium mb-1">Name</label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              class="w-full px-3 py-2 border rounded-md"
              placeholder="John Doe"
            />
            <span v-if="errors.name" class="text-red-500 text-sm block mt-1">
              {{ errors.name }}
            </span>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium mb-1">Email</label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              class="w-full px-3 py-2 border rounded-md"
              placeholder="john@example.com"
            />
            <span v-if="errors.email" class="text-red-500 text-sm block mt-1">
              {{ errors.email }}
            </span>
          </div>

          <div>
            <label for="role" class="block text-sm font-medium mb-1">Role</label>
            <select
              id="role"
              v-model="formData.role"
              class="w-full px-3 py-2 border rounded-md bg-white"
            >
              <option value="" disabled>Select a role</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="user">User</option>
            </select>
            <span v-if="errors.role" class="text-red-500 text-sm block mt-1">
              {{ errors.role }}
            </span>
            <p class="text-sm text-gray-500 mt-1">
              This determines what permissions the user will have.
            </p>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium mb-1">Password</label>
            <input
              id="password"
              v-model="formData.password"
              type="password"
              class="w-full px-3 py-2 border rounded-md"
              placeholder="********"
            />
            <span v-if="errors.password" class="text-red-500 text-sm block mt-1">
              {{ errors.password }}
            </span>
            <p class="text-sm text-gray-500 mt-1">
              Must be at least 8 characters long.
            </p>
          </div>

          <div class="mt-6 flex justify-end">
            <button
              type="submit"
              class="inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Create User
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
