<script setup lang="ts">
import { ref } from 'vue'
import { z } from 'zod'
import { Save } from 'lucide-vue-next'

const activeTab = ref('general')

// Esquemas de validación
const generalSchema = z.object({
  siteName: z.string().min(2, 'Site name must be at least 2 characters.'),
  siteDescription: z.string().optional(),
  supportEmail: z.string().email('Please enter a valid email address.')
})

const notificationsSchema = z.object({
  emailNotifications: z.boolean().default(false),
  marketingEmails: z.boolean().default(false),
  securityEmails: z.boolean().default(true)
})

// Datos reactivos
const generalForm = ref({
  siteName: 'Admin Dashboard',
  siteDescription: 'A comprehensive admin dashboard for your application',
  supportEmail: 'support@example.com'
})

const notificationsForm = ref({
  emailNotifications: true,
  marketingEmails: false,
  securityEmails: true
})

// Manejo de errores
const errors = ref<Record<string, string>>({})

// Validación y envío
const validateAndSubmit = async (
  formData: GeneralFormValues | NotificationsFormValues,
  schema: z.ZodSchema,
    formName: string) => {
  try {
    const result = schema.parse(formData)
    console.log(`${formName} submitted:`, result)
    showToast(`${formName} settings updated successfully`)
    errors.value = {}
  } catch (error) {
    if (error instanceof z.ZodError) {
      errors.value = error.errors.reduce((acc, curr) => {
        acc[curr.path[0]] = curr.message
        return acc
      }, {} as Record<string, string>)
    }
  }
}

const showToast = (message: string) => {
  // Implementar lógica de notificación aquí
  alert(message) // Ejemplo básico
}
</script>

<template>
  <div class="space-y-6 p-4">
    <div>
      <h1 class="text-3xl font-bold">Settings</h1>
      <p class="text-gray-500">Manage your admin dashboard settings</p>
    </div>

    <!-- Tabs Navigation -->
    <div class="flex gap-2 border-b border-gray-200">
      <button
        v-for="tab in ['general', 'notifications', 'security']"
        :key="tab"
        @click="activeTab = tab"
        class="px-4 py-2 rounded-t-lg capitalize"
        :class="{
          'bg-white border-x border-t border-gray-200 text-blue-600': activeTab === tab,
          'text-gray-500 hover:bg-gray-50': activeTab !== tab
        }"
      >
        {{ tab }}
      </button>
    </div>

    <!-- General Settings Tab -->
    <div v-if="activeTab === 'general'" class="space-y-4">
      <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div class="mb-6">
          <h2 class="text-xl font-semibold">General Settings</h2>
          <p class="text-gray-500 text-sm">Configure general settings for your application</p>
        </div>

        <form @submit.prevent="validateAndSubmit(generalForm, generalSchema, 'General')">
          <div class="space-y-4">
            <!-- Site Name -->
            <div>
              <label class="block text-sm font-medium mb-1">Site Name</label>
              <input
                v-model="generalForm.siteName"
                type="text"
                placeholder="Enter site name"
                class="w-full px-3 py-2 border rounded-md"
              />
              <p v-if="errors.siteName" class="text-red-500 text-sm mt-1">{{ errors.siteName }}</p>
              <p class="text-gray-500 text-sm mt-1">This is the name of your application.</p>
            </div>

            <!-- Site Description -->
            <div>
              <label class="block text-sm font-medium mb-1">Site Description</label>
              <textarea
                v-model="generalForm.siteDescription"
                placeholder="Enter site description"
                class="w-full px-3 py-2 border rounded-md"
              ></textarea>
              <p class="text-gray-500 text-sm mt-1">A brief description of your application.</p>
            </div>

            <!-- Support Email -->
            <div>
              <label class="block text-sm font-medium mb-1">Support Email</label>
              <input
                v-model="generalForm.supportEmail"
                type="email"
                placeholder="Enter support email"
                class="w-full px-3 py-2 border rounded-md"
              />
              <p v-if="errors.supportEmail" class="text-red-500 text-sm mt-1">{{ errors.supportEmail }}</p>
              <p class="text-gray-500 text-sm mt-1">Email address for support inquiries.</p>
            </div>

            <div class="pt-4">
              <button
                type="submit"
                class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Save class="mr-2 h-4 w-4" />
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Notifications Settings Tab -->
    <div v-if="activeTab === 'notifications'" class="space-y-4">
      <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div class="mb-6">
          <h2 class="text-xl font-semibold">Notification Settings</h2>
          <p class="text-gray-500 text-sm">Configure how you receive notifications</p>
        </div>

        <form @submit.prevent="validateAndSubmit(notificationsForm, notificationsSchema, 'Notifications')">
          <div class="space-y-4">
            <!-- Email Notifications -->
            <div class="flex items-center justify-between p-4 border rounded-lg">
              <div class="space-y-1">
                <label class="text-base font-medium">Email Notifications</label>
                <p class="text-gray-500 text-sm">Receive email notifications for important updates.</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  v-model="notificationsForm.emailNotifications"
                  type="checkbox"
                  class="sr-only peer"
                />
                <div class="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>

            <!-- Marketing Emails -->
            <div class="flex items-center justify-between p-4 border rounded-lg">
              <div class="space-y-1">
                <label class="text-base font-medium">Marketing Emails</label>
                <p class="text-gray-500 text-sm">Receive emails about new features and promotions.</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  v-model="notificationsForm.marketingEmails"
                  type="checkbox"
                  class="sr-only peer"
                />
                <div class="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>

            <!-- Security Emails -->
            <div class="flex items-center justify-between p-4 border rounded-lg">
              <div class="space-y-1">
                <label class="text-base font-medium">Security Emails</label>
                <p class="text-gray-500 text-sm">Receive emails about security updates and login attempts.</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  v-model="notificationsForm.securityEmails"
                  type="checkbox"
                  class="sr-only peer"
                />
                <div class="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>

            <div class="pt-4">
              <button
                type="submit"
                class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Save class="mr-2 h-4 w-4" />
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Security Settings Tab -->
    <div v-if="activeTab === 'security'" class="space-y-4">
      <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div class="mb-6">
          <h2 class="text-xl font-semibold">Security Settings</h2>
          <p class="text-gray-500 text-sm">Manage your security preferences</p>
        </div>
        <p>Security settings content will go here.</p>
      </div>
    </div>
  </div>
</template>
