<template>
  <div class="container mx-auto py-6 space-y-8">
    <ReporteListView />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ReporteListView from './reporteListView.vue'

export default defineComponent({
  name: 'PageReporteView',
  components: {
    ReporteListView,
  },
})
</script>
