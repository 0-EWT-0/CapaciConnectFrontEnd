<script setup lang="ts">
import { ref } from 'vue'
import { Search, Download, UserPlus, Filter } from "lucide-vue-next"

const students = ref([
  {
    name: "Emily Chen",
    initials: "EC",
    email: "emily.chen@example.com",
    workshop: "Web Development",
    progress: "75%",
    lastAttended: "Today",
  },
  {
    name: "Marcus Johnson",
    initials: "MJ",
    email: "marcus.j@example.com",
    workshop: "Advanced JavaScript",
    progress: "60%",
    lastAttended: "Yesterday",
  },
  {
    name: "Sofia Rodriguez",
    initials: "SR",
    email: "sofia.r@example.com",
    workshop: "UX Design",
    progress: "40%",
    lastAttended: "2 days ago",
  },
])
</script>

<template>
  <div class="container mx-auto py-6 space-y-8">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Students</h1>
        <p class="text-gray-500 mt-1">Manage and track all students across your workshops.</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="px-4 py-2 border border-gray-300 rounded-md flex items-center hover:bg-gray-50 transition-colors">
          <Download class="mr-2 h-4 w-4 text-gray-700" />
          <span class="text-gray-700">Export</span>
        </button>
        <button class="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 transition-colors">
          <UserPlus class="mr-2 h-4 w-4" />
          <span>Add Student</span>
        </button>
      </div>
    </div>

    <!-- Search and Filter Section -->
    <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
      <div class="relative flex-1 max-w-sm w-full">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search class="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search students..."
          class="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button class="px-4 py-2 border border-gray-300 rounded-md flex items-center hover:bg-gray-50 transition-colors w-full md:w-auto">
        <Filter class="mr-2 h-4 w-4 text-gray-700" />
        <span class="text-gray-700">Filter</span>
      </button>
    </div>

    <!-- Students Table Section -->
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
            <tr
              v-for="(student, index) in students"
              :key="index"
              class="hover:bg-gray-50 transition-colors"
            >
              <!-- Name Column -->
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <div class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span class="text-sm font-medium text-blue-700">{{ student.initials }}</span>
                  </div>
                  <span class="text-gray-900">{{ student.name }}</span>
                </div>
              </td>

              <!-- Email Column -->
              <td class="px-4 py-3 text-gray-600">{{ student.email }}</td>

              <!-- Workshop Column -->
              <td class="px-4 py-3 text-gray-600">{{ student.workshop }}</td>

              <!-- Progress Column -->
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

              <!-- Last Attended Column -->
              <td class="px-4 py-3 text-gray-600">{{ student.lastAttended }}</td>

              <!-- Actions Column -->
              <td class="px-4 py-3">
                <div class="flex items-center gap-2">
                  <button class="px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                    View
                  </button>
                  <button class="px-2 py-1 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
                    Message
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination Section -->
    <div class="flex flex-col md:flex-row items-center justify-between gap-4">
      <p class="text-sm text-gray-600">
        Showing <span class="font-medium">1</span> to <span class="font-medium">10</span> of
        <span class="font-medium">{{ students.length }}</span> students
      </p>
      <div class="flex items-center gap-2">
        <button
          class="px-3 py-1 text-sm border border-gray-300 rounded-md bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled
        >
          Previous
        </button>
        <button class="px-3 py-1 text-sm border border-gray-300 rounded-md bg-white text-gray-600 hover:bg-gray-50">
          Next
        </button>
      </div>
    </div>
  </div>
</template>
