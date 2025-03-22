<template>
  <ErrorMessage :name="prop" class="text-[#DC2626] font-bold" />
</template>

<script lang="ts" setup>
import { ErrorMessage } from 'vee-validate'

defineProps({
  prop: {
    type: String,
    required: true,
  },
})
</script>
