<template>
  <div class="container mx-auto py-6 space-y-8">
    <TipoTallerCreate />
    <TipoTallerListView />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TipoTallerCreate from '@/views/Administradores/workshop-types/TipoTallerCreate.vue'
import TipoTallerListView from '@/views/Administradores/workshop-types/TipoTallerListView.vue'

export default defineComponent({
  name: 'PagetiposTallerView',
  components: {
    TipoTallerCreate,
    TipoTallerListView,
  },
})
</script>
