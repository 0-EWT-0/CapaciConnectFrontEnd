<script setup lang="ts">
import { ref } from 'vue'
import AnalyticsChart from "@/views/Administradores/analytics-chart.vue"
import TopPages from "@/views/Administradores/top-pages.vue"
import UserMetrics from "@/views/Administradores/user-metrics.vue"

const activeTab = ref('overview')

const setActiveTab = (tab: string) => {
  activeTab.value = tab
}
</script>

<template>
  <div class="space-y-6 p-4">
    <!-- Header -->
    <div class="space-y-1">
      <h1 class="text-3xl font-bold">Analytics</h1>
      <p class="text-gray-600">View detailed analytics and metrics</p>
    </div>

    <!-- Tabs Navigation -->
    <nav>
      <ul class="flex gap-2 border-b border-gray-200">
        <li v-for="tab in ['overview', 'users', 'content']" :key="tab">
          <button
            @click="setActiveTab(tab)"
            class="px-4 py-2 rounded-t-lg capitalize"
            :class="{
              'bg-white border-x border-t border-gray-200 text-blue-600': activeTab === tab,
              'text-gray-500 hover:bg-gray-50': activeTab !== tab
            }"
            :aria-current="activeTab === tab ? 'page' : undefined"
          >
            {{ tab }}
          </button>
        </li>
      </ul>
    </nav>

    <!-- Tabs Content -->
    <div class="space-y-6">
      <!-- Overview Tab -->
      <template v-if="activeTab === 'overview'">
        <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div class="mb-4">
            <h2 class="text-xl font-semibold mb-2">Traffic Overview</h2>
            <p class="text-gray-600 text-sm">Website traffic over the past 30 days</p>
          </div>
          <AnalyticsChart />
        </div>

        <div class="grid gap-6 md:grid-cols-2">
          <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div class="mb-4">
              <h2 class="text-xl font-semibold mb-2">Top Pages</h2>
              <p class="text-gray-600 text-sm">Most visited pages on your site</p>
            </div>
            <TopPages />
          </div>

          <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div class="mb-4">
              <h2 class="text-xl font-semibold mb-2">User Metrics</h2>
              <p class="text-gray-600 text-sm">User engagement statistics</p>
            </div>
            <UserMetrics />
          </div>
        </div>
      </template>

      <!-- Users Tab -->
      <div v-if="activeTab === 'users'" class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div class="mb-4">
          <h2 class="text-xl font-semibold mb-2">User Analytics</h2>
          <p class="text-gray-600 text-sm">Detailed user statistics and demographics</p>
        </div>
        <p>User analytics content will go here.</p>
      </div>

      <!-- Content Tab -->
      <div v-if="activeTab === 'content'" class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div class="mb-4">
          <h2 class="text-xl font-semibold mb-2">Content Analytics</h2>
          <p class="text-gray-600 text-sm">Performance metrics for your content</p>
        </div>
        <p>Content analytics will go here.</p>
      </div>
    </div>
  </div>
</template>
