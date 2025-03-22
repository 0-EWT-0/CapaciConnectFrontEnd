<template>
  <div class="container mx auto py-6 space-y-8">
    <TallerCreateForm/>
    <TallerListView/>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import TallerCreateForm from '@/views/Administradores/tallerCreate.vue';
import TallerListView from '@/views/Administradores/tallerListView.vue';

export default defineComponent({
  name: 'PageTalleresView',
  components:{
    TallerCreateForm,
    TallerListView
  },
})
</script>
