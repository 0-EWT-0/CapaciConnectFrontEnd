<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-bold">Dashboard</h1>
      <p class="text-gray-500">Welcome to your admin dashboard</p>
    </div>

    <!-- Dashboard Stats -->

    <!-- Main Content Grid -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
      <!-- Overview Card -->
      <div class="col-span-4 bg-white rounded-lg border p-6 shadow-sm">
        <div class="mb-4">
          <h2 class="text-xl font-semibold">Overview</h2>
          <p class="text-gray-500 text-sm">System activity for the past 30 days</p>
        </div>
      </div>

      <!-- Recent Activity Card -->
      <div class="col-span-3 bg-white rounded-lg border p-6 shadow-sm">
        <div class="mb-4">
          <h2 class="text-xl font-semibold">Recent Activity</h2>
          <p class="text-gray-500 text-sm">Latest actions in the system</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
