<template>
  <div class="container mx-auto py-6 space-y-8">
    <user-create-form />
    <user-list />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserCreateForm from '@/views/Administradores/userCreate.vue'
import UserList from '@/views/Administradores/userListView.vue'

export default defineComponent({
  name: 'PageAdminView',
  components: {
    UserCreateForm,
    UserList,
  },
})
</script>
