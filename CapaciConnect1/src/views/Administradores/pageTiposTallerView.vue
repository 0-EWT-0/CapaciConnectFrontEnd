<template>
  <div class="container mx-auto py-6 space-y-8">
    <TipoTallerCreate />
    <TipoTallerListView />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TipoTallerCreate from './tipoTallerCreate.vue'
import TipoTallerListView from './tipoTallerListView.vue'

export default defineComponent({
  name: 'PagetiposTallerView',
  components: {
    TipoTallerCreate,
    TipoTallerListView,
  },
})
</script>
