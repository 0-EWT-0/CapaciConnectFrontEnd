<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search, Download, UserPlus, Filter } from 'lucide-vue-next'

const students = ref([
  {
    name: 'Emily Chen',
    initials: 'EC',
    email: 'emily.chen@example.com',
    workshop: 'Web Development',
    progress: '75%',
    lastAttended: 'Today',
  },
  // ... más estudiantes
])

const currentPage = ref(1)
const itemsPerPage = 10

// Lógica de paginación
const totalPages = computed(() => Math.ceil(students.value.length / itemsPerPage))
const paginatedStudents = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return students.value.slice(start, end)
})

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}

const showingRange = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage + 1
  const end = Math.min(currentPage.value * itemsPerPage, students.value.length)
  return { start, end }
})
</script>

<template>
  <div class="container mx-auto py-6 space-y-8">
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Students</h1>
        <p class="text-gray-600 mt-1">Manage and track all students across your workshops.</p>
      </div>
      <div class="flex items-center gap-2">
        <button
          class="px-4 py-2 border border-gray-300 rounded-md flex items-center hover:bg-gray-50"
        >
          <Download class="mr-2 h-4 w-4" />
          <span>Export</span>
        </button>
        <button
          class="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700"
        >
          <UserPlus class="mr-2 h-4 w-4" />
          <span>Add Student</span>
        </button>
      </div>
    </div>

    <!-- Search and Filter -->
    <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
      <div class="relative flex-1 max-w-sm w-full">
        <Search class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search students..."
          class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        class="px-4 py-2 border border-gray-300 rounded-md flex items-center hover:bg-gray-50 w-full md:w-auto"
      >
        <Filter class="mr-2 h-4 w-4" />
        <span>Filter</span>
      </button>
    </div>

    <!-- Student Table -->
    <div class="border border-gray-200 rounded-lg bg-white shadow-sm">
      <div class="p-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-900">Student List</h2>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-900">Name</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-900">Email</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-900">Workshop</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-900">Progress</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-900">Last Attended</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200">
            <tr v-for="(student, index) in paginatedStudents" :key="index" class="hover:bg-gray-50">
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <div class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span class="text-sm font-medium text-blue-700">{{ student.initials }}</span>
                  </div>
                  <span class="text-gray-900">{{ student.name }}</span>
                </div>
              </td>

              <td class="px-4 py-3 text-gray-600">{{ student.email }}</td>
              <td class="px-4 py-3 text-gray-600">{{ student.workshop }}</td>

              <td class="px-4 py-3">
                <div class="flex items-center gap-2">
                  <div class="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      class="h-full bg-blue-600 rounded-full transition-all"
                      :style="{ width: student.progress }"
                    ></div>
                  </div>
                  <span class="text-gray-600">{{ student.progress }}</span>
                </div>
              </td>

              <td class="px-4 py-3 text-gray-600">{{ student.lastAttended }}</td>

              <td class="px-4 py-3">
                <div class="flex items-center gap-2">
                  <button class="px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
                    View
                  </button>
                  <button
                    class="px-2 py-1 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100"
                  >
                    Message
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex flex-col md:flex-row items-center justify-between gap-4">
      <p class="text-sm text-gray-600">
        Showing <span class="font-medium">{{ showingRange.start }}</span> to
        <span class="font-medium">{{ showingRange.end }}</span> of
        <span class="font-medium">{{ students.length }}</span> students
      </p>
      <div class="flex items-center gap-2">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-3 py-1 text-sm border border-gray-300 rounded-md bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          @click="nextPage"
          :disabled="currentPage >= totalPages"
          class="px-3 py-1 text-sm border border-gray-300 rounded-md bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
