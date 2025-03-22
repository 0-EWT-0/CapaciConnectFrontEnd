<template>
  <div class="container mx-auto py-6 space-y-8">
    <!-- Header Skeleton -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div class="space-y-2">
        <div class="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
        <div class="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
      </div>
      <div class="flex items-center gap-2">
        <div class="h-10 bg-gray-200 rounded-md w-32 animate-pulse"></div>
        <div class="h-10 bg-gray-200 rounded-md w-40 animate-pulse"></div>
      </div>
    </div>

    <!-- Search & Filter Skeleton -->
    <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
      <div class="h-10 bg-gray-200 rounded-md w-full animate-pulse"></div>
      <div class="h-10 bg-gray-200 rounded-md w-32 animate-pulse"></div>
    </div>

    <!-- Table Skeleton -->
    <div class="border border-gray-200 rounded-lg bg-white shadow-sm">
      <div class="p-4 border-b border-gray-200">
        <div class="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th v-for="i in 6" :key="i" class="px-4 py-3">
                <div class="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200">
            <tr v-for="i in 5" :key="i" class="hover:bg-gray-50">
              <td v-for="j in 6" :key="j" class="px-4 py-3">
                <div class="space-y-2">
                  <div v-if="j === 1" class="flex items-center gap-3">
                    <div class="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
                    <div class="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                  </div>
                  <div v-else-if="j === 4" class="flex items-center gap-2">
                    <div class="w-24 h-2 bg-gray-200 rounded-full"></div>
                    <div class="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                  </div>
                  <div v-else-if="j === 6" class="flex gap-2">
                    <div class="h-8 bg-gray-200 rounded-md w-16 animate-pulse"></div>
                    <div class="h-8 bg-gray-200 rounded-md w-20 animate-pulse"></div>
                  </div>
                  <div v-else class="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination Skeleton -->
    <div class="flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
      <div class="flex gap-2">
        <div class="h-8 bg-gray-200 rounded-md w-20 animate-pulse"></div>
        <div class="h-8 bg-gray-200 rounded-md w-16 animate-pulse"></div>
      </div>
    </div>
  </div>
</template>
