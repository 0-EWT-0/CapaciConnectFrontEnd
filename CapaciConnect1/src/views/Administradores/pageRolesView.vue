<template>
  <div class="container mx-auto py-6 space-y-8">
    <RolListView />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RolListView from './rolListView.vue'

export default defineComponent({
  name: 'PageRolesView',
  components: {
    RolListView,
  },
})
</script>
