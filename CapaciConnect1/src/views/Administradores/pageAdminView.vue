<template>
  <div class="container mx-auto space-y-8">
    <user-create-form />
    <user-list />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserCreateForm from '@/views/Administradores/users/userCreate.vue'
import UserList from '@/views/Administradores/users/userListView.vue'

export default defineComponent({
  name: 'PageAdminView',
  components: {
    UserCreateForm,
    UserList,
  },
})
</script>
