<script setup lang="ts">
import { Layers } from 'lucide-vue-next'

// Datos de ejemplo
const upcomingWorkshops = [
  {
    title: 'Web Development Fundamentals',
    time: 'Today, 10:00 AM - 12:00 PM',
    students: 24,
    colorClass: 'bg-blue-500',
  },
  {
    title: 'Advanced JavaScript Concepts',
    time: 'Tomorrow, 2:00 PM - 4:00 PM',
    students: 18,
    colorClass: 'bg-purple-500',
  },
  {
    title: 'UX Design Principles',
    time: 'Wed, 11:00 AM - 1:00 PM',
    students: 15,
    colorClass: 'bg-green-500',
  },
  {
    title: 'Mobile App Development',
    time: 'Thu, 3:00 PM - 5:00 PM',
    students: 20,
    colorClass: 'bg-orange-500',
  },
]

const messages = [
  {
    name: 'Emily Chen',
    initials: 'EC',
    time: '2h ago',
    content: "I'm having trouble with the last assignment. Could we schedule a quick call?",
  },
  {
    name: 'Marcus Johnson',
    initials: 'MJ',
    time: 'Yesterday',
    content: "Thank you for the feedback on my project. I've implemented your suggestions.",
  },
  {
    name: 'Sofia Rodriguez',
    initials: 'SR',
    time: '2 days ago',
    content: 'Will there be makeup classes for the session I missed last week?',
  },
]

const allWorkshops = [
  {
    title: 'Web Development Fundamentals',
    description: 'Introduction to HTML, CSS and JavaScript',
    status: 'Active',
    statusClass: 'bg-green-100 text-green-800',
    students: 24,
    sessions: '6/8',
    nextSession: 'Today, 10:00 AM',
  },
  {
    title: 'Advanced JavaScript Concepts',
    description: 'Deep dive into modern JS features',
    status: 'Active',
    statusClass: 'bg-green-100 text-green-800',
    students: 18,
    sessions: '4/10',
    nextSession: 'Tomorrow, 2:00 PM',
  },
  {
    title: 'UX Design Principles',
    description: 'Creating user-centered digital experiences',
    status: 'Active',
    statusClass: 'bg-green-100 text-green-800',
    students: 15,
    sessions: '2/6',
    nextSession: 'Wed, 11:00 AM',
  },
]
</script>

<template>
  <div class="container mx-auto py-6 space-y-8">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Welcome back, Anna</h1>
        <p class="text-gray-500">Manage your workshops and students from a single dashboard.</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Create Workshop
        </button>
        <button class="px-4 py-2 border rounded hover:bg-gray-50">View Schedule</button>
      </div>
    </div>

    <div class="space-y-6">
      <div class="flex gap-2 max-w-3xl">
        <button class="px-4 py-2 bg-blue-100 text-blue-800 rounded-tl rounded-tr">Overview</button>
        <button class="px-4 py-2 hover:bg-gray-100">Workshops</button>
        <button class="px-4 py-2 hover:bg-gray-100">Students</button>
        <button class="px-4 py-2 hover:bg-gray-100">Materials</button>
        <button class="px-4 py-2 hover:bg-gray-100">Analytics</button>
      </div>

      <!-- Contenido de Overview -->
      <div class="space-y-6">
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div class="p-6 border rounded-lg bg-white">
            <div class="flex items-center justify-between pb-2">
              <h3 class="text-sm font-medium">Active Workshops</h3>
              <Layers class="h-4 w-4 text-gray-400" />
            </div>
            <div class="text-2xl font-bold">6</div>
            <p class="text-xs text-gray-500">+2 from last month</p>
          </div>
        </div>

        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div class="lg:col-span-4 border rounded-lg p-6 bg-white">
            <h3 class="text-lg font-semibold">Upcoming Workshops</h3>
            <div class="space-y-4 mt-4">
              <div
                v-for="(workshop, index) in upcomingWorkshops"
                :key="index"
                class="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div class="flex items-center gap-4">
                  <div :class="workshop.colorClass" class="w-3 h-14 rounded-sm"></div>
                  <div>
                    <h3 class="font-medium">{{ workshop.title }}</h3>
                    <p class="text-sm text-gray-500">{{ workshop.time }}</p>
                  </div>
                </div>
                <div class="text-sm text-gray-500">{{ workshop.students }} students</div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-3 border rounded-lg p-6 bg-white">
            <h3 class="text-lg font-semibold">Recent Messages</h3>
            <div class="space-y-4 mt-4">
              <div
                v-for="(message, index) in messages"
                :key="index"
                class="flex items-start gap-4 hover:bg-gray-50 p-2 rounded"
              >
                <div class="flex-shrink-0">
                  <div class="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <span class="text-sm font-medium">{{ message.initials }}</span>
                  </div>
                </div>
                <div class="space-y-1">
                  <div class="flex gap-2 items-center">
                    <span class="font-medium">{{ message.name }}</span>
                    <span class="text-xs text-gray-500">{{ message.time }}</span>
                  </div>
                  <p class="text-sm text-gray-700">{{ message.content }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sección de Workshops -->
      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Your Workshops</h2>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(workshop, index) in allWorkshops"
            :key="index"
            class="border rounded-lg p-6 bg-white hover:shadow-md transition-shadow"
          >
            <div class="flex items-center justify-between">
              <h3 class="font-semibold">{{ workshop.title }}</h3>
              <span :class="workshop.statusClass" class="px-2 py-1 text-xs rounded-full">
                {{ workshop.status }}
              </span>
            </div>
            <p class="text-gray-500 mt-2">{{ workshop.description }}</p>
            <div class="space-y-2 mt-4">
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">Students</span>
                <span>{{ workshop.students }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
