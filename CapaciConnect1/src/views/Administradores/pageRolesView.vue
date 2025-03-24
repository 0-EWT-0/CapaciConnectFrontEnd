<template>
  <div class="container mx-auto py-6 space-y-8">
    <RolCreate />
    <RolListView />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RolCreate from './rolCreate.vue'
import RolListView from './rolListView.vue'

export default defineComponent({
  name: 'PageRolesView',
  components: {
    RolCreate,
    RolListView,
  },
})
</script>
