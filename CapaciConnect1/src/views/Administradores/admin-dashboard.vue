<template>
  <div class="space-y-6 p-16">
    <!-- Header -->
    <div>
      <h1 class="text-[#2563EB]">Bienvenido {{ userInfo.name }} {{ userInfo.last_names }}</h1>
      <div class="text-[#565656]">
        <h2>{{ userInfo.email }}</h2>
        <h2>{{ userInfo.phone }}</h2>
      </div>
    </div>

    <!-- Main Content Grid -->
    <!-- <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
      
      <div class="col-span-4 bg-white rounded-lg border p-6 shadow-sm">
        <div class="mb-4">
          <h2 class="text-xl font-semibold text-blue-300">Overview</h2>
          <p class="text-gray-500 text-sm">System activity for the past 30 days</p>
        </div>
      </div>

      
      <div class="col-span-3 bg-white rounded-lg border p-6 shadow-sm">
        <div class="mb-4">
          <h2 class="text-xl text-blue-300 font-semibold">Recent Activity</h2>
          <p class="text-gray-500 text-sm">Latest actions in the system</p>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'

const userInfo = ref([])
const userStore = useUserStore()

onMounted(async () => {
  await userStore.getUserInfo()
  userInfo.value = userStore.user
})
</script>
