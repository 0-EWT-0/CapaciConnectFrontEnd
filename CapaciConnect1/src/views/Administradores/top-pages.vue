<template>
  <div class="border rounded-lg overflow-hidden">
    <table class="w-full">
      <thead class="bg-gray-100">
        <tr>
          <th class="text-left px-4 py-3 text-sm font-medium">Page</th>
          <th class="text-right px-4 py-3 text-sm font-medium">Views</th>
          <th class="text-right px-4 py-3 text-sm font-medium">Visitors</th>
          <th class="text-right px-4 py-3 text-sm font-medium">Bounce Rate</th>
        </tr>
      </thead>
      <tbody class="divide-y">
        <tr
          v-for="page in topPages"
          :key="page.id"
          class="hover:bg-gray-50 transition-colors"
        >
          <td class="px-4 py-3 font-medium">{{ page.page }}</td>
          <td class="px-4 py-3 text-right">{{ page.views.toLocaleString() }}</td>
          <td class="px-4 py-3 text-right">{{ page.uniqueVisitors.toLocaleString() }}</td>
          <td class="px-4 py-3 text-right">{{ page.bounceRate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
