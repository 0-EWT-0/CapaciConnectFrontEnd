<script setup lang="ts"></script>

<template>
  <div
    class="min-h-screen bg-gradient-to-b from-blue-100 to-purple-200 flex items-center justify-center px-4"
  >
    <div class="max-w-md w-full text-center">
      <div class="mb-8 relative">
        <div class="text-9xl font-bold text-blue-600 animate-bounce">404</div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div class="text-8xl animate-spin">🌀</div>
        </div>
      </div>

      <h1 class="text-4xl font-bold text-gray-800 mb-4">Oops! Page Not Found</h1>

      <p class="text-xl text-gray-600 mb-8">
        Looks like you've wandered into the digital wilderness. Don't worry, even the best explorers
        get lost sometimes!
      </p>

      <button
        @click="$router.push('/')"
        class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
      >
        <span class="mr-2"></span> Take Me Home
      </button>
    </div>
  </div>
</template>
