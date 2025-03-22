<template>
  <header class="flex justify-between items-center px-19 py-4 bg-[#040273]">
    <!--  -->
    <div class="flex items-center space-x-4">
      <img src="@/assets/imgs/capacityLogo.png" class="w-13 h-13" />
      <h2 class="text-white">Capacity</h2>
    </div>
    <!--  -->
    <div class="flex items-center gap-x-11">
      <div class="flex gap-x-11">
        <RouterLink to="/Talleres"
          ><h3 class="hover:text-[#2563EB] cursor-pointer">Talleres</h3></RouterLink
        >
        <RouterLink to="/MisTalleres">
          <h3 class="hover:text-[#2563EB] cursor-pointer">Mi aprendizaje</h3></RouterLink
        >
        <!-- <RouterLink to="/calendario"><h3 class="hover:text-[#2563EB] cursor-pointer">Calendario</h3></RouterLink> -->
      </div>

      <div>
        <RouterLink to="/login">
          <BaseButton variant="blue">Iniciar sesion</BaseButton>
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup>
// import IconField from 'primevue/iconfield'
// import InputIcon from 'primevue/inputicon'
// import InputText from 'primevue/inputtext'
import BaseButton from '../common/BaseButton.vue'

// export default {
//   name: 'Navbar',
//   components: {
//     IconField,
//     InputIcon,
//     InputText,
//   },
// }
</script>
