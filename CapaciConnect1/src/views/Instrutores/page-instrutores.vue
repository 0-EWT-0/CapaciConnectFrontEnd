<script setup lang="ts">
import { RouterLink } from "vue-router"
import { CalendarDays, Users, BookOpen, LayoutDashboard, BarChart3, Settings } from "lucide-vue-next"
</script>

<template>
  <div class="container mx-auto py-8 space-y-8">
    <header class="text-center space-y-4 mb-8">
      <h1 class="text-4xl font-bold">Instructor Portal</h1>
      <p class="text-xl text-gray-500 max-w-2xl mx-auto">
        Manage your workshops, track student progress, and access all teaching resources from one central location.
      </p>
    </header>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <!-- Tarjeta Dashboard -->
      <div class="bg-white rounded-lg border shadow-sm p-6">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="text-lg font-semibold">Dashboard</h3>
            <p class="text-sm text-gray-500">View your performance metrics</p>
          </div>
          <LayoutDashboard class="h-5 w-5 text-blue-600" />
        </div>
        <p class="text-sm text-gray-500 mb-4">
          Get a quick overview of your upcoming workshops, student attendance, and teaching hours.
        </p>
        <RouterLink
          to="/instructor/dashboard"
          class="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Go to Dashboard
        </RouterLink>
      </div>

      <!-- Tarjeta Workshops -->
      <div class="bg-white rounded-lg border shadow-sm p-6">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="text-lg font-semibold">Workshops</h3>
            <p class="text-sm text-gray-500">Manage your teaching sessions</p>
          </div>
          <BookOpen class="h-5 w-5 text-blue-600" />
        </div>
        <p class="text-sm text-gray-500 mb-4">
          Create, edit, and organize workshop content. Track progress and manage session schedules.
        </p>
        <RouterLink
          to="/instructor/workshops"
          class="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Manage Workshops
        </RouterLink>
      </div>

      <!-- Tarjeta Students -->
      <div class="bg-white rounded-lg border shadow-sm p-6">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="text-lg font-semibold">Students</h3>
            <p class="text-sm text-gray-500">Track student progress</p>
          </div>
          <Users class="h-5 w-5 text-blue-600" />
        </div>
        <p class="text-sm text-gray-500 mb-4">
          View student profiles, track attendance, and monitor learning progress across all workshops.
        </p>
        <RouterLink
          to="/instructor/students"
          class="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          View Students
        </RouterLink>
      </div>

      <!-- Tarjeta Schedule -->
      <div class="bg-white rounded-lg border shadow-sm p-6">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="text-lg font-semibold">Schedule</h3>
            <p class="text-sm text-gray-500">Manage your calendar</p>
          </div>
          <CalendarDays class="h-5 w-5 text-blue-600" />
        </div>
        <p class="text-sm text-gray-500 mb-4">
          View and manage your teaching schedule. Set availability and schedule office hours.
        </p>
        <RouterLink
          to="/instructor/schedule"
          class="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          View Schedule
        </RouterLink>
      </div>

      <!-- Tarjeta Analytics -->
      <div class="bg-white rounded-lg border shadow-sm p-6">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="text-lg font-semibold">Analytics</h3>
            <p class="text-sm text-gray-500">Understand your impact</p>
          </div>
          <BarChart3 class="h-5 w-5 text-blue-600" />
        </div>
        <p class="text-sm text-gray-500 mb-4">
          Get detailed insights on student engagement, satisfaction ratings, and teaching effectiveness.
        </p>
        <RouterLink
          to="/instructor/analytics"
          class="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          View Analytics
        </RouterLink>
      </div>

      <!-- Tarjeta Settings -->
      <div class="bg-white rounded-lg border shadow-sm p-6">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="text-lg font-semibold">Settings</h3>
            <p class="text-sm text-gray-500">Manage your account</p>
          </div>
          <Settings class="h-5 w-5 text-blue-600" />
        </div>
        <p class="text-sm text-gray-500 mb-4">
          Update your profile, notification preferences, and account settings.
        </p>
        <RouterLink
          to="/instructor/settings"
          class="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Go to Settings
        </RouterLink>
      </div>
    </div>
  </div>
</template>
