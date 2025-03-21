<script setup lang="ts">
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { MoreHorizontal, ArrowUpDown, UserCog, Trash, Ban } from 'lucide-vue-next'

interface User {
  id: string
  name: string
  email: string
  role: string
  status: 'Active' | 'Inactive' | 'Suspended'
  lastActive: string
  avatar: string
  initials: string
}

const props = defineProps<{
  searchQuery: string
}>()

type SortColumn = 'name' | 'role' | 'status' | 'lastActive'
type SortDirection = 'asc' | 'desc'

const sorting = ref<SortColumn>('name')
const sortDirection = ref<SortDirection>('asc')
const openDropdownId = ref<string | null>(null)
const dropdownRef = ref<HTMLElement | null>(null)

// Datos de ejemplo
const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    lastActive: '2023-07-20',
    avatar: '/user-avatar.jpg',
    initials: 'JD'
  },
  // Agrega más usuarios según sea necesario
]

const filteredUsers = computed(() => {
  return users.filter(user =>
    user.name.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(props.searchQuery.toLowerCase())
  )
})

const sortedUsers = computed(() => {
  return [...filteredUsers.value].sort((a, b) => {
    const modifier = sortDirection.value === 'asc' ? 1 : -1
    return a[sorting.value].localeCompare(b[sorting.value]) * modifier
  })
})

const toggleSort = (column: SortColumn) => {
  if (sorting.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sorting.value = column
    sortDirection.value = 'asc'
  }
}

onClickOutside(dropdownRef, () => {
  openDropdownId.value = null
})

const toggleDropdown = (userId: string) => {
  openDropdownId.value = openDropdownId.value === userId ? null : userId
}
</script>

<template>
  <div class="rounded-md border overflow-hidden">
    <div class="w-full">
      <!-- Encabezado -->
      <div class="bg-gray-100">
        <div class="flex divide-x">
          <div class="flex-1 p-4 w-[300px]">
            <button
              @click="toggleSort('name')"
              class="flex items-center gap-1 hover:bg-gray-200 px-2 py-1 rounded"
            >
              Name
              <ArrowUpDown class="h-4 w-4" />
            </button>
          </div>

          <div class="flex-1 p-4">
            <button
              @click="toggleSort('role')"
              class="flex items-center gap-1 hover:bg-gray-200 px-2 py-1 rounded"
            >
              Role
              <ArrowUpDown class="h-4 w-4" />
            </button>
          </div>

          <div class="flex-1 p-4">
            <button
              @click="toggleSort('status')"
              class="flex items-center gap-1 hover:bg-gray-200 px-2 py-1 rounded"
            >
              Status
              <ArrowUpDown class="h-4 w-4" />
            </button>
          </div>

          <div class="flex-1 p-4">
            <button
              @click="toggleSort('lastActive')"
              class="flex items-center gap-1 hover:bg-gray-200 px-2 py-1 rounded"
            >
              Last Active
              <ArrowUpDown class="h-4 w-4" />
            </button>
          </div>

          <div class="flex-1 p-4 text-right">Actions</div>
        </div>
      </div>

      <!-- Cuerpo -->
      <div class="divide-y">
        <template v-if="sortedUsers.length > 0">
          <div
            v-for="user in sortedUsers"
            :key="user.id"
            class="flex divide-x items-center hover:bg-gray-50 transition-colors"
          >
            <!-- Columna Name -->
            <div class="flex-1 p-4 w-[300px]">
              <div class="flex items-center gap-3">
                <div class="relative h-8 w-8">
                  <div class="rounded-full h-full w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                      :src="user.avatar"
                      :alt="user.name"
                      class="h-full w-full object-cover"
                      @error="e => (e.target as HTMLImageElement).style.display = 'none'"
                    >
                    <span class="text-xs font-medium text-gray-600">
                      {{ user.initials }}
                    </span>
                  </div>
                </div>
                <div>
                  <p class="font-medium">{{ user.name }}</p>
                  <p class="text-sm text-gray-500">{{ user.email }}</p>
                </div>
              </div>
            </div>

            <!-- Columna Role -->
            <div class="flex-1 p-4">{{ user.role }}</div>

            <!-- Columna Status -->
            <div class="flex-1 p-4">
              <span
                class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                :class="{
                  'bg-blue-100 text-blue-800': user.status === 'Active',
                  'bg-gray-100 text-gray-800': user.status === 'Inactive',
                  'bg-red-100 text-red-800': user.status === 'Suspended'
                }"
              >
                {{ user.status }}
              </span>
            </div>

            <!-- Columna Last Active -->
            <div class="flex-1 p-4">{{ user.lastActive }}</div>

            <!-- Columna Actions -->
            <div class="flex-1 p-4 text-right relative">
              <button
                @click="toggleDropdown(user.id)"
                class="hover:bg-gray-200 p-1 rounded"
              >
                <MoreHorizontal class="h-4 w-4" />
              </button>

              <!-- Menú desplegable -->
              <div
                v-if="openDropdownId === user.id"
                ref="dropdownRef"
                class="absolute right-4 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
              >
                <div class="py-1">
                  <div class="px-4 py-2 text-sm font-medium text-gray-900">Actions</div>
                  <button class="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100">
                    <UserCog class="mr-2 h-4 w-4" />
                    Edit User
                  </button>
                  <button class="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100">
                    <Ban class="mr-2 h-4 w-4" />
                    {{ user.status === 'Suspended' ? 'Unsuspend' : 'Suspend' }}
                  </button>
                  <div class="border-t my-1"></div>
                  <button class="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                    <Trash class="mr-2 h-4 w-4" />
                    Delete User
                  </button>
                </div>
              </div>
            </div>
          </div>
        </template>

        <div v-else class="p-6 text-center text-gray-500">
          No users found.
        </div>
      </div>
    </div>
  </div>
</template>
