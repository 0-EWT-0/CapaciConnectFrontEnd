<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { Menu, Bell, Search } from 'lucide-vue-next'

const isSearchOpen = ref(false)
const isMobileMenuOpen = ref(false)
const isProfileMenuOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

onClickOutside(dropdownRef, () => {
  isProfileMenuOpen.value = false
})
</script>

<template>
  <header class="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6">
    <!-- Mobile Menu -->
    <button
      class="md:hidden p-2 rounded-lg border hover:bg-gray-100"
      @click="isMobileMenuOpen = true"
    >
      <Menu class="h-5 w-5" />
      <span class="sr-only">Toggle menu</span>
    </button>

    <!-- Mobile Sidebar Overlay -->
    <div
      v-if="isMobileMenuOpen"
      class="fixed inset-0 bg-black/50 z-50"
      @click="isMobileMenuOpen = false"
    >
      <div class="w-64 bg-white h-full p-4" @click.stop>
        <AdminSidebar @close="isMobileMenuOpen = false" />
      </div>
    </div>

    <!-- Logo -->
    <router-link to="/admin" class="flex items-center gap-2 font-semibold">
      <span class="hidden md:inline-block">Admin Dashboard</span>
    </router-link>

    <!-- Search -->
    <div class="flex-1">
      <div class="relative max-w-md">
        <div v-if="isSearchOpen" class="flex items-center">
          <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="search"
            placeholder="Search..."
            class="w-full rounded-lg bg-white pl-8 pr-4 py-2 border focus:outline-none"
            autofocus
            @blur="isSearchOpen = false"
          />
        </div>
        <button
          v-else
          class="ml-auto hidden md:flex p-2 rounded-lg border hover:bg-gray-100"
          @click="isSearchOpen = true"
        >
          <Search class="h-5 w-5" />
          <span class="sr-only">Search</span>
        </button>
      </div>
    </div>

    <!-- Notifications -->
    <button class="relative p-2 rounded-lg border hover:bg-gray-100">
      <Bell class="h-5 w-5" />
      <span class="sr-only">Notifications</span>
      <span class="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-blue-600"></span>
    </button>

    <!-- Profile Dropdown -->
    <div class="relative">
      <button
        class="rounded-full hover:bg-gray-100 p-1"
        @click="isProfileMenuOpen = !isProfileMenuOpen"
      >
        <div class="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
          <span class="text-sm font-medium">AD</span>
        </div>
      </button>

      <!-- Dropdown Content -->
      <div
        ref="dropdownRef"
        v-show="isProfileMenuOpen"
        class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border z-50"
      >
        <div class="p-2">
          <div class="px-3 py-2 text-sm font-semibold">My Account</div>
          <div class="border-t my-1"></div>
          <button class="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 rounded-lg">
            Profile
          </button>
          <button class="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 rounded-lg">
            Settings
          </button>
          <div class="border-t my-1"></div>
          <button
            class="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 rounded-lg text-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
