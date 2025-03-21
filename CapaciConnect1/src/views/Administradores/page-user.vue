<script setup lang="ts">
import { ref } from 'vue'
import { PlusCircle } from 'lucide-vue-next'

const isAddUserOpen = ref(false)
const searchQuery = ref('')
</script>

<template>
  <div class="space-y-6 p-4">
    <!-- Header Section -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold">Users</h1>
        <p class="text-gray-500">Manage user accounts and permissions</p>
      </div>

      <!-- Add User Button -->
      <button
        @click="isAddUserOpen = true"
        class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        <PlusCircle class="mr-2 h-4 w-4" />
        Add User
      </button>
    </div>

    <!-- Search Input -->
    <div class="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search users..."
        class="max-w-sm px-3 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        v-model="searchQuery"
      />
    </div>

    <!-- User Table -->
    <UserTable :search-query="searchQuery" />

    <!-- Add User Dialog -->
    <div
      v-if="isAddUserOpen"
      class="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
      @click.self="isAddUserOpen = false"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <!-- Aquí iría el contenido del diálogo -->
        <h2 class="text-xl font-semibold mb-4">Add New User</h2>
        <!-- ... -->
        <button
          @click="isAddUserOpen = false"
          class="mt-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>
