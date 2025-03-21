<script setup lang="ts">
import { ref } from 'vue'

const imageErrors = ref<Record<string, boolean>>({})

const activities = [
  // ... (mantener el mismo array de actividades)
  // Ejemplo de estructura:
  // {
  //   id: 1,
  //   user: {
  //     name: "John Doe",
  //     avatar: "/path/to/avatar.jpg",
  //     initials: "JD"
  //   },
  //   action: "created a new post",
  //   target: "Q4 Sales Report",
  //   time: "2 hours ago"
  // }
]

const handleImageError = (activityId: string) => {
  imageErrors.value[activityId] = true
}
</script>

<template>
  <div class="space-y-4">
    <div
      v-for="activity in activities"
      :key="activity.id"
      class="flex items-center gap-4"
    >
      <div class="relative h-8 w-8">
        <div class="rounded-full h-full w-full bg-gray-100 flex items-center justify-center">
          <img
            v-if="!imageErrors[activity.id]"
            :src="activity.user.avatar"
            :alt="activity.user.name"
            class="rounded-full h-full w-full object-cover"
            @error="handleImageError(activity.id)"
          />
          <span
            v-else
            class="text-xs font-medium text-gray-600"
          >
            {{ activity.user.initials }}
          </span>
        </div>
      </div>

      <div class="space-y-1">
        <p class="text-sm font-medium leading-none">
          {{ activity.user.name }} {{ activity.action }}
        </p>
        <p class="text-sm text-gray-500">{{ activity.target }}</p>
        <p class="text-xs text-gray-400">{{ activity.time }}</p>
      </div>
    </div>
  </div>
</template>
